---
layout: post
type: post
title: "Python Config Management: Dynaconf, Docker & .env — The Complete Guide"
date: 2025-04-25
published: true
labels:
  - Python
  - Dynaconf
  - Docker
  - Configuration
  - DevOps
---

<img width="80px" class="rounded float-left pe-4" src="https://www.dynaconf.com/img/logo_400.svg" alt="Dynaconf logo" onerror="this.src='../img/post/django.jpg'">

## Introduction

Hardcoded configuration is a security vulnerability. Environment-specific settings scattered across the codebase are a maintenance burden. Secrets committed to version control are a breach waiting to happen. These are not edge cases — they are the default outcome when configuration management is treated as an afterthought.

Professional Python applications require a configuration strategy that separates concerns cleanly: structured defaults in version-controlled files, environment-specific overrides in `.env` files that never touch the repository, and runtime overrides injected by Docker Compose or Kubernetes. The result is a single application that runs identically across development, testing, staging, and production — with zero code changes and zero hardcoded values.

This guide presents the complete pattern: `.env` files for secrets, Dynaconf for hierarchical YAML configuration, pydantic-settings for type-safe validation, and Docker Compose for runtime injection. Every example is drawn from a real production Django application.

## Key Benefits

| Approach | Type Safety | Hierarchical Config | Secret Management | Docker Integration | Validation |
|----------|-------------|--------------------|--------------------|-------------------|------------|
| **Dynaconf** | ✅ With pydantic | ✅ YAML + env layers | ✅ `.secrets.yml` | ✅ Native | ✅ With pydantic |
| python-decouple | ❌ Manual casting | ❌ Flat only | ⚠️ `.env` only | ⚠️ Manual | ❌ None |
| django-environ | ⚠️ Limited | ❌ Flat only | ⚠️ `.env` only | ⚠️ Manual | ❌ None |
| `os.environ` | ❌ Strings only | ❌ None | ❌ None | ✅ Native | ❌ None |
| pydantic-settings | ✅ Full | ❌ Flat only | ⚠️ `.env` only | ✅ Native | ✅ Full |
| **Dynaconf + pydantic** | ✅ Full | ✅ YAML + env + Docker | ✅ Layered | ✅ Native | ✅ Full |

---

## The Problem: Configuration Without a Strategy

Every application needs configuration. The naive approach — hardcoding values or reading directly from `os.environ` — creates three compounding problems:

**1. Security exposure.** Secrets hardcoded in source code or committed in `.env` files are accessible to anyone with repository access. A single leaked token can compromise an entire production system.

**2. Environment fragility.** Settings that work in development break in production. Database hosts, Redis URLs, allowed hosts, and debug flags all differ across environments — and managing these differences without a strategy means manual edits before every deployment.

**3. Validation gaps.** `os.environ.get('DEBUG', 'false')` returns a string. Whether that string is `'false'`, `'False'`, `'0'`, or `'no'` depends on who set it. Without validation, configuration errors surface as runtime failures rather than startup errors.

The solution is a layered configuration strategy with clear precedence rules.

---

## The .env File Pattern

The `.env` file is the standard mechanism for injecting environment-specific secrets and overrides into a running process. It is never committed to version control — only `.env.example` is.

### The Three-File Pattern

A production-ready project maintains three `.env` variants:

```
.env.example      # Committed — documents all required variables with placeholder values
.env              # Not committed — local development values
.env.production   # Not committed — production secrets
.env.testing      # Not committed — test environment values
```

### .env.example — The Contract

The `.env.example` file is the configuration contract between the codebase and its operators. It documents every required variable, explains its purpose, and provides safe placeholder values:

```dotenv
# ============================================
# CTC Research — Environment Configuration Example
# Copy to .env and fill in values
# ============================================

# Core Environment
SERVER_ENV=production
RUNNING_ENV=docker
MODULE=LMS

# Django
DEBUG=false
DJANGO_SECRET_KEY=change-me-to-a-long-random-secret

# Domain & Hosts
ALLOWED_HOSTS=ctc-research.com,www.ctc-research.com
CSRF_TRUSTED_ORIGINS=https://ctc-research.com,https://www.ctc-research.com
CORS_ALLOWED_ORIGINS=https://ctc-research.com,https://www.ctc-research.com

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=change-me
REDIS_URL=redis://:change-me@redis:6379/3

# Django Superuser (initial setup)
SUPERUSER_USERNAME=admin
SUPERUSER_EMAIL=admin@ctc-research.com
SUPERUSER_PASSWORD=change-me

# Feature Flags
VAULT_ENABLED_FOR_DYNACONF=false

# Email (SMTP)
EMAIL_STRATEGY=smtp
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=true
EMAIL_SENDER_1=your-primary-sender@gmail.com
EMAIL_SENDER_1_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=your-primary-sender@gmail.com

# Database (PostgreSQL)
DB_ENGINE=django.db.backends.postgresql
DB_HOST=postgres
DB_PORT=5432
DB_NAME=db_ctc
DB_USER=postgres
DB_PASSWORD=change-me
```

### Environment-Specific Files

Each environment gets its own `.env` file with values appropriate to that context:

```dotenv
# .env.testing
SERVER_ENV=testing
RUNNING_ENV=docker
DEBUG=true
DJANGO_SECRET_KEY=test-secret-key-for-testing-only
DB_NAME=db_ctc_test
ALLOWED_HOSTS=localhost,127.0.0.1,testserver
EMAIL_STRATEGY=console
```

```dotenv
# .env.production
SERVER_ENV=production
RUNNING_ENV=docker
DEBUG=false
DJANGO_SECRET_KEY=kEUOOJTyCJLaLY7MQItOI5qQZ6BRgEoiXaZrRBtpVfHzV641lbtysRUnX48i
DB_HOST=postgres
DB_NAME=db_ctc
ALLOWED_HOSTS=*
```

---

## Dynaconf — Hierarchical Configuration

Dynaconf is a configuration management library that loads settings from multiple sources in a defined precedence order. It eliminates the flat, single-source limitation of `os.environ` and `python-decouple` by supporting YAML files, `.env` files, environment variables, and secrets files — all merged into a single settings object.

### Installation

```bash
pip install dynaconf
# With extras for YAML support
pip install dynaconf[yaml]
```

### YAML Config Files Per Environment

The power of Dynaconf is its per-environment YAML configuration. A single file defines defaults and environment-specific overrides:

```yaml
# configs/settings/ENV/_core.yml
default:
  APP_NAME: "CTC Hub"
  APP_VERSION: "1.0.0"
  MODULE: "LMS"
  DJANGO_SETTINGS_MODULE: "configs.settings"
  LANGUAGE_CODE: "en-us"
  TIME_ZONE: "UTC"
  USE_I18N: true
  USE_TZ: true
  DEBUG: false
  ENABLE_DEBUG_TOOLBAR: false
  ENABLE_SWAGGER: false

development:
  DEBUG: true
  ENABLE_DEBUG_TOOLBAR: true
  ENABLE_SWAGGER: true

testing:
  DEBUG: true
  ENABLE_DEBUG_TOOLBAR: false

production:
  APP_NAME: "CTC Research"
  DEBUG: false
  ENABLE_DEBUG_TOOLBAR: false
  ENABLE_SWAGGER: false
```

```yaml
# configs/settings/ENV/database.yml
default: &db_default
  DATABASES:
    default:
      ENGINE: "django.db.backends.sqlite3"
      NAME: "@jinja {{ env.get('DB_NAME', 'db.sqlite3') }}"

production:
  <<: *db_default
  DATABASES:
    default:
      ENGINE: "@jinja {{ env.get('DB_ENGINE', 'django.db.backends.postgresql') }}"
      HOST: "@jinja {{ env.get('DB_HOST', 'postgres') }}"
      PORT: "@jinja {{ env.get('DB_PORT', '5432') }}"
      NAME: "@jinja {{ env.get('DB_NAME', 'db_ctc') }}"
      USER: "@jinja {{ env.get('DB_USER', 'postgres') }}"
      PASSWORD: "@jinja {{ env.get('DB_PASSWORD', '') }}"
      CONN_MAX_AGE: 600
      ATOMIC_REQUESTS: true
```

```yaml
# configs/settings/ENV/security.yml
default:
  SECURITY:
    ALLOWED_HOSTS:
      - "localhost"
      - "127.0.0.1"
    CORS_ALLOW_ALL_ORIGINS: false
    SECURE_SSL_REDIRECT: false
    SESSION_COOKIE_SECURE: false
    RATE_LIMIT_ENABLED: false

production:
  SECURITY:
    ALLOWED_HOSTS:
      - "ctc-research.com"
      - "www.ctc-research.com"
      - "*.ctc-research.com"
    CORS_ALLOW_ALL_ORIGINS: false
    SECURE_SSL_REDIRECT: false
    SECURE_HSTS_SECONDS: 31536000
    RATE_LIMIT_ENABLED: true
    LOG_SECURITY_EVENTS: true
```

### Initializing Dynaconf

```python
from dynaconf import Dynaconf
from pathlib import Path

CONFIG_DIR = Path(__file__).parent / "ENV"

settings_files = [
    CONFIG_DIR / "_core.yml",
    CONFIG_DIR / "database.yml",
    CONFIG_DIR / "security.yml",
    CONFIG_DIR / "storage.yml",
    CONFIG_DIR / "email.yml",
    CONFIG_DIR / "logging.yml",
    CONFIG_DIR / ".secrets.yml",  # Never committed
]

dynaconf_settings = Dynaconf(
    envvar_prefix="DJANGO",
    settings_files=[str(f) for f in settings_files if f.exists()],
    environments=True,
    default_env="default",
    env="production",       # Set from SERVER_ENV
    merge_enabled=True,
    load_dotenv=True,
)
```

---

## The MainSettings Class — Dynaconf + pydantic-settings

The most robust pattern combines Dynaconf's hierarchical loading with pydantic-settings' type validation. The `MainSettings` class provides typed access to all configuration values, validates them on startup, and detects the runtime environment automatically:

```python
import os
from pathlib import Path
from typing import Any, Optional

from dynaconf import Dynaconf
from pydantic import Field, validator
from pydantic_settings import BaseSettings, SettingsConfigDict

CONFIG_DIR = Path(__file__).parent / "ENV"


class MainSettings(BaseSettings):
    """
    Unified Configuration with Dynaconf + pydantic-settings.
    Loads from: YAML defaults → .env file → environment variables → Docker overrides.
    """

    # Core environment
    SERVER_ENV: str = Field(default="development")
    RUNNING_ENV: str = Field(default="local")
    MODULE: str = Field(default="LMS")
    DEBUG: bool = Field(default=True)
    DJANGO_SECRET_KEY: str = Field(default="dev-secret-key-change-me")
    HOST: str = Field(default="0.0.0.0")
    PORT: int = Field(default=5070)

    # Dynaconf instance (populated in __init__)
    dynaconf_settings: Optional[Dynaconf] = None

    model_config = SettingsConfigDict(
        env_file=Path(__file__).parent.parent.parent / ".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="allow",
    )

    def __init__(self, **kwargs):
        self._detect_runtime_environment(kwargs)
        super().__init__(**kwargs)
        self._init_dynaconf()

    def _detect_runtime_environment(self, kwargs: dict) -> None:
        """Auto-detect Docker/Kubernetes runtime from environment indicators."""
        runtime_from_env = os.environ.get("RUNNING_ENV", "").lower()

        docker_indicators = [
            os.path.exists("/.dockerenv"),
            os.path.exists("/run/.containerenv"),
            "DOCKER" in os.environ,
            "KUBERNETES_SERVICE_HOST" in os.environ,
        ]

        if runtime_from_env:
            kwargs.setdefault("RUNNING_ENV", runtime_from_env)
        elif any(docker_indicators):
            kwargs["RUNNING_ENV"] = "docker"
        else:
            kwargs.setdefault("RUNNING_ENV", "local")

    def _init_dynaconf(self) -> None:
        """Initialize Dynaconf with per-environment YAML files."""
        settings_files = [
            CONFIG_DIR / "_core.yml",
            CONFIG_DIR / "database.yml",
            CONFIG_DIR / "security.yml",
            CONFIG_DIR / "email.yml",
            CONFIG_DIR / "logging.yml",
            CONFIG_DIR / f"_{self.SERVER_ENV}.yml",  # Environment-specific overrides
            CONFIG_DIR / ".secrets.yml",              # Never committed
        ]

        self.dynaconf_settings = Dynaconf(
            envvar_prefix="DJANGO",
            settings_files=[str(f) for f in settings_files if f.exists()],
            environments=True,
            default_env="default",
            env=self.SERVER_ENV,
            merge_enabled=True,
            load_dotenv=True,
        )

    def get(self, key: str, default: Any = None) -> Any:
        """Get a configuration value, checking pydantic fields then Dynaconf."""
        if hasattr(self, key) and key in self.model_fields:
            value = getattr(self, key)
            if value:
                return value
        if self.dynaconf_settings:
            return self.dynaconf_settings.get(key, default)
        return default

    @validator("DEBUG", pre=True)
    def validate_bool(cls, v):
        if isinstance(v, str):
            return v.lower() in ("true", "1", "yes", "on")
        return v

    @property
    def is_production(self) -> bool:
        return self.SERVER_ENV == "production"

    @property
    def is_docker(self) -> bool:
        return self.RUNNING_ENV == "docker"


# Singleton instance
settings = MainSettings()
```

---

## Docker Compose Integration

Docker Compose is the final layer in the configuration chain. It loads the `.env` file for secrets, then applies service-level environment overrides that take precedence over `.env` values.

### The x-django-base Anchor Pattern

The `x-django-base` YAML anchor eliminates duplication across services. Define the base configuration once, then extend it for each service:

```yaml
# docker-compose.yml
x-django-base: &django-base
  build:
    context: .
    dockerfile: ./compose/django/Dockerfile
  restart: unless-stopped
  env_file:
    - .env                    # Load all secrets from .env
  environment:
    - RUNNING_ENV=docker      # Override: always docker in containers
  networks:
    - traefik-net
  healthcheck:
    test: ["CMD-SHELL", "curl -sf http://127.0.0.1:${PORT:-5070}/health/ || exit 1"]
    interval: 30s
    timeout: 10s
    retries: 3
    start_period: 40s

services:
  website:
    <<: *django-base           # Inherit all base config
    image: website
    container_name: website
    ports:
      - "5070:5070"
    environment:
      - RUNNING_ENV=docker
      - SERVER_ENV=production
      - DEBUG=False
      - PORT=5070
      - DB_HOST=postgres
      - DB_NAME=db_ctc
      - REDIS_URL=redis://:${REDIS_PASSWORD:-redis_password}@redis:6379/3
      - DJANGO_SETTINGS_MODULE=configs.settings
      - ALLOWED_HOSTS=${ALLOWED_HOSTS:-*}

  website-worker:
    <<: *django-base           # Same base, different command
    image: website-worker
    container_name: website-worker
    environment:
      - RUNNING_ENV=docker
      - SERVER_ENV=production
      - PORT=5075
      - DB_HOST=postgres
      - REDIS_URL=redis://:${REDIS_PASSWORD:-redis_password}@redis:6379/3
    command: /rqworker-start
    healthcheck:
      test: ["CMD-SHELL", "python manage.py rqworker --help > /dev/null 2>&1 || exit 1"]
      interval: 60s
      timeout: 10s
      retries: 3
```

### Development Override Pattern

The `docker-compose.override.yml` file extends the base for local development — enabling hot reload, mounting source code, and relaxing production constraints:

```yaml
# docker-compose.override.yml
services:
  website:
    environment:
      - DEBUG=${DEBUG:-true}
      - SERVER_ENV=${SERVER_ENV:-development}
      - RELOAD=${RELOAD:-true}
      - LOG_LEVEL=${LOG_LEVEL:-debug}
    volumes:
      - ./:/app:rw              # Mount source for hot reload
      - website_static:/app/assets/staticfiles:rw

  website-worker:
    volumes:
      - ./:/app:rw
    environment:
      - LOG_LEVEL=${LOG_LEVEL:-debug}

volumes:
  website_static:
  website_media:
```

---

## The Precedence Chain

Configuration values are resolved in a strict precedence order. Higher layers override lower layers:

```
1. YAML defaults (_core.yml, database.yml, security.yml, ...)
        ↓ overridden by
2. Environment-specific YAML (_production.yml, _testing.yml, ...)
        ↓ overridden by
3. .env file (loaded by pydantic-settings and Dynaconf)
        ↓ overridden by
4. Docker Compose environment: block
        ↓ overridden by
5. Runtime environment variables (shell exports, CI/CD injection)
```

This means:
- YAML files provide structured defaults and environment-specific settings
- `.env` files inject secrets that never appear in YAML
- Docker Compose overrides inject container-specific values (`DB_HOST=postgres`, `RUNNING_ENV=docker`)
- CI/CD pipelines can inject final overrides without touching any file

### Practical Example

For the `DB_HOST` setting:

| Layer | Value | Source |
|-------|-------|--------|
| YAML default | `localhost` | `database.yml` |
| `.env` file | `localhost` | `.env` (local dev) |
| Docker Compose | `postgres` | `environment:` block |
| **Resolved** | **`postgres`** | Docker wins |

---

## RUNNING_ENV Detection

The `RUNNING_ENV` variable enables runtime-specific behavior without environment-specific code branches. The `MainSettings` class detects it automatically:

```python
# Auto-detection in MainSettings._detect_runtime_environment()
docker_indicators = [
    os.path.exists("/.dockerenv"),          # Docker container marker
    os.path.exists("/run/.containerenv"),   # Podman container marker
    "KUBERNETES_SERVICE_HOST" in os.environ, # Kubernetes pod
]

# In Docker Compose, always set explicitly:
environment:
  - RUNNING_ENV=docker
```

Application code can then branch on runtime without touching environment-specific logic:

```python
from configs.settings.conf import settings

if settings.is_docker:
    # Use container service names (postgres, redis)
    db_host = "postgres"
else:
    # Use localhost for local development
    db_host = "localhost"

# Or use the validated setting directly:
db_host = settings.get("DB_HOST", "localhost")
```

---

## Best Practices

### 1. Never Commit .env

Add `.env` to `.gitignore` immediately. Only `.env.example` belongs in version control:

```gitignore
# .gitignore
.env
.env.production
.env.testing
.env.local
*.secrets.yml
secret.key.txt
```

### 2. Validate Configuration on Startup

Use pydantic validators to catch configuration errors before the application starts serving requests:

```python
from pydantic import validator, Field
from pydantic_settings import BaseSettings

class MainSettings(BaseSettings):
    DJANGO_SECRET_KEY: str = Field(default="dev-secret-key-change-me")
    PORT: int = Field(default=5070)
    DEBUG: bool = Field(default=True)

    @validator("DJANGO_SECRET_KEY")
    def validate_secret_key(cls, v, values):
        if values.get("SERVER_ENV") == "production" and v == "dev-secret-key-change-me":
            raise ValueError("DJANGO_SECRET_KEY must be changed in production")
        return v

    @validator("PORT", pre=True)
    def validate_port(cls, v):
        port = int(v)
        if not (1 <= port <= 65535):
            raise ValueError(f"Port {port} is out of valid range")
        return port
```

### 3. Use .env.example as Documentation

Every variable in `.env.example` should have a comment explaining its purpose, valid values, and whether it is required or optional:

```dotenv
# SERVER_ENV: Application environment
# Values: development | testing | staging | production
# Required: yes
SERVER_ENV=production

# DEBUG: Enable Django debug mode
# Values: true | false
# Required: yes — must be false in production
DEBUG=false

# DJANGO_SECRET_KEY: Django cryptographic signing key
# Required: yes — generate with: python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
DJANGO_SECRET_KEY=change-me-to-a-long-random-secret
```

### 4. Separate Secrets from Configuration

Dynaconf supports a `.secrets.yml` file that is loaded last and never committed:

```yaml
# configs/settings/ENV/.secrets.yml — never committed
default:
  DJANGO_SECRET_KEY: "your-actual-secret-key"
  DB_PASSWORD: "your-actual-db-password"
  REDIS_PASSWORD: "your-actual-redis-password"
  EMAIL_SENDER_1_PASSWORD: "your-app-password"
```

```gitignore
# .gitignore
configs/settings/ENV/.secrets.yml
```

### 5. Print Configuration Summary on Startup

Validate and display the active configuration when the application starts — catching misconfiguration before it causes runtime failures:

```python
def print_summary(settings: MainSettings) -> None:
    print(f"Environment: {settings.SERVER_ENV}")
    print(f"Runtime:     {settings.RUNNING_ENV}")
    print(f"Debug:       {settings.DEBUG}")
    print(f"Port:        {settings.PORT}")

    warnings = []
    if settings.is_production and settings.DEBUG:
        warnings.append("WARNING: DEBUG=True in production")
    if settings.DJANGO_SECRET_KEY == "dev-secret-key-change-me":
        warnings.append("WARNING: Using default DJANGO_SECRET_KEY")

    for warning in warnings:
        print(warning)

# In settings/__init__.py or setup.py:
if os.getenv("DJANGO_PRINT_ENV", "true").lower() == "true":
    print_summary(settings)
```

---

## Complete Integration Example

The following shows how all layers work together in the ctc-research.com production setup:

```
Project structure:
├── .env                          # Not committed — local secrets
├── .env.example                  # Committed — documents all variables
├── .env.production               # Not committed — production secrets
├── .env.testing                  # Not committed — test secrets
├── docker-compose.yml            # Base services with x-django-base anchor
├── docker-compose.override.yml   # Development overrides
└── configs/
    └── settings/
        ├── __init__.py           # Django settings entry point
        ├── conf.py               # MainSettings class
        ├── setup.py              # Startup validation and summary
        └── ENV/
            ├── _core.yml         # App-wide defaults
            ├── database.yml      # Database config per environment
            ├── security.yml      # Security settings per environment
            ├── email.yml         # Email config per environment
            ├── logging.yml       # Logging config per environment
            ├── storage.yml       # Static/media storage config
            └── .secrets.yml      # Not committed — runtime secrets
```

The resolution order for any setting:

```python
# 1. YAML default (database.yml → default → DATABASES.default.ENGINE)
#    "django.db.backends.sqlite3"

# 2. YAML production override (database.yml → production → DATABASES.default.ENGINE)
#    "@jinja {{ env.get('DB_ENGINE', 'django.db.backends.postgresql') }}"

# 3. .env file
#    DB_ENGINE=django.db.backends.postgresql

# 4. Docker Compose environment block
#    - DB_HOST=postgres

# 5. Final resolved value in container:
#    ENGINE=django.db.backends.postgresql, HOST=postgres
```

---

## Conclusion

Configuration management is not a feature — it is the foundation that every deployment, every environment, and every secret management decision rests on. Applications that hardcode values or read directly from `os.environ` are fragile, insecure, and difficult to operate across environments.

The layered strategy presented here — YAML defaults with Dynaconf, type-validated settings with pydantic-settings, secrets in `.env` files that never touch version control, and Docker Compose for runtime injection — eliminates every configuration failure mode:

- **Hardcoded values** are replaced by YAML defaults with environment-specific overrides
- **Insecure secrets** are isolated in `.env` files and `.secrets.yml`, never committed
- **Environment fragility** is eliminated by the precedence chain: YAML → `.env` → Docker → runtime
- **Validation gaps** are closed by pydantic validators that catch misconfiguration at startup

Teams that adopt this pattern deploy with confidence. Configuration errors surface at startup, not in production. Secrets are never in the repository. Every environment runs the same code with the right values — automatically.

👉 Read more on [Medium](https://medium.com/@mammhoud/python-config-management-dynaconf)

## References

- [Dynaconf Documentation](https://dynaconf.com/) - Official docs
- [Dynaconf GitHub](https://github.com/dynaconf/dynaconf) - Source code
- [Python-dotenv](https://pypi.org/project/python-dotenv/) - .env file support
