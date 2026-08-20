---
layout: project
type: project
image: img/django-telegram.webp
title: "Django Fusion: Component Framework for Django and Wagtail"
date: 2026
published: true
summary: "A Django + Wagtail helper library providing a component system, declarative routing, form/table mixins, allauth integration, health checks, and an optional Bolt API plugin — the toolkit Structa Cloud sites are built on."
projecturl: https://github.com/mammhoud/django-fusion
labels:
  - Python
  - Django
  - Components
  - Wagtail
  - Architecture
---

## Overview

Django Fusion fills the gaps Django leaves open: component boundaries, application-level routing, form-table integration, authentication boilerplate, and health checks. It is the canonical `django_fusion` package — import framework symbols from `django_fusion.*` directly.

## Key Features

- **{% comp %} template tag** with `{% prop %}`, `{% slot %}`, `{% var %}`, `{{ props.* }}`, `{{ attrs }}`, and `fragment_name=` for HTMX scoping
- **Routing helpers** — Site, Application, Viewset, ModelViewset (CRUD from one class), RoutableComponent, FragmentComponent
- **Forms and tables** — FormMixin, TableMixin, FormTableMixin with template-resolution cascade
- **Component analyzer** — scan templates for `{% comp %}` usage and emit JSON tracking
- **Allauth auth layer** — adapters, mixins, social signup
- **Wagtail integration** — StreamField blocks, snippets, viewsets
- **Health checks** — `/health/`, `/health/db/`, `/health/assets/`
- **Dynaconf config** — multi-environment YAML config with privacy/cache/middleware helpers
- **Optional Bolt API plugin** — `pip install 'django-fusion[bolt]'` for msgspec.Struct schemas, async CRUD, JWT tokens

## Quick Start

```bash
pip install django-fusion
```

Add to `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    "django_fusion.comp",
    "django_fusion.core",
    "django_fusion.health",
    "django_fusion.analyzer",
    "django_fusion.config",
]
```

Render your first component:

```django
{% load comp %}
{% comp "components/button.html" label="Save" variant="primary" / %}
```

## Status

- **Version:** 0.2.0
- **Tests:** 63+ (pytest + hypothesis property-based testing)
- **Compatibility:** Django 4.2/5.0, Python 3.11/3.12
- **License:** MIT
