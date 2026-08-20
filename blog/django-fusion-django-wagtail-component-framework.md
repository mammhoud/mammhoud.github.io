---
layout: post
type: post
title: "Django Fusion: A Component-Driven Framework for Django and Wagtail"
date: 2026-08-20
published: true
labels:
  - Django
  - Python
  - Components
  - Wagtail
  - Architecture
---

<img width="80px" class="rounded float-left pe-4" src="https://static.djangoproject.com/img/logos/django-logo-negative.svg" alt="Django Fusion" onerror="this.src='../img/post/django.jpg'">

## Introduction

Django gives you everything you need to build a web application — models, views, templates, admin, authentication — but it does not give you a component system. Every project reinvents the same patterns: partial templates that accept inconsistent arguments, routing logic scattered across `urls.py` files, forms that duplicate table logic, and health checks bolted on as an afterthought.

**Django Fusion** is a Django and Wagtail helper library that fills these gaps. It provides a `{% raw %}{% comp %}{% endraw %}` template tag with prop, slot, and var declarations; declarative routing helpers (Site, Application, Viewset, ModelViewset); form and table mixins with template-resolution cascades; an allauth authentication layer; a Wagtail integration layer; and health checks — all designed to work together as a coherent toolkit.

This is the library that powers Structa Cloud sites. It is available as `pip install django-fusion` and is tested with pytest (63+ tests), hypothesis property-based testing, Django 4.2/5.0, and Python 3.11/3.12.

## The Problem It Solves

Every Django project eventually hits the same friction points:

1. **No component boundary.** Templates accept loose keyword arguments. Two developers rendering the same "button" partial pass different keys. There is no compile-time or runtime contract between the template and its caller.

2. **Routing fragmentation.** Complex applications split routing across multiple `urls.py` files with manual `include()` chains. There is no way to express "this application owns these routes" as a single object.

3. **Form-table duplication.** Every form that displays tabular data requires manually wiring up form validation, table rendering, and template selection. The same pattern repeats in every CRUD view.

4. **Auth boilerplate.** Social login, adapter configuration, and profile creation require dozens of lines of boilerplate that rarely change between projects.

5. **No health checks.** Most Django projects add health check endpoints as an afterthought, often with inconsistent response formats and no database or asset verification.

Django Fusion addresses each of these with a single, integrated toolkit.

## Core Architecture

Django Fusion is organized as a set of Django apps that can be installed independently:

```
django_fusion
├── comp/          # comp template tag and component system
├── core/          # Routing helpers, Viewset, ModelViewset
├── health/        # Health check endpoints
├── analyzer/      # Component usage scanner
├── config/        # Dynaconf multi-environment YAML config
├── contrib/       # Privacy, cache, middleware helpers
└── plugins/
    └── apis/      # Optional django-bolt bridge
```

The key design principle is **import from `django_fusion.*` directly**. The former standalone compatibility packages are no longer part of the supported runtime.

## The `{% raw %}{% comp %}{% endraw %}` Template Tag

The `{% raw %}{% comp %}{% endraw %}` tag is the centerpiece. It renders a component template with explicit prop declarations, named slots, and local variables — comparable to django-bird or django-cotton, but pure Django template syntax.

```django
{% raw %}{% load comp %}

{% comp "components/button.html" label="Save" variant="primary" %}
  {% slot "icon" %}
    <svg><!-- icon markup --></svg>
  {% endslot %}
{% endcomp %}{% endraw %}
```

Inside `components/button.html`:

```django
<button class="btn btn--{% raw %}{{ variant }}{% endraw %}">
  {% raw %}{% if icon %}{{ icon }}{% endif %}
  {{ label }}{% endraw %}
</button>
```

### Prop, Slot, and Var

- **`{% raw %}{% prop %}{% endraw %}`** declares a typed input that the parent must provide.
- **`{% raw %}{% slot %}{% endraw %}`** declares a named block that the parent can override.
- **`{% raw %}{% var %}{% endraw %}`** declares a local variable scoped to the component.
- **`{% raw %}{{ props.* }}{% endraw %}`** accesses all props as a dictionary.
- **`{% raw %}{{ attrs }}{% endraw %}`** passes through extra attributes for HTMX scoping.
- **`fragment_name=`** enables HTMX fragment targeting.

This gives you a component contract that is auditable, testable, and self-documenting.

## Declarative Routing

Django Fusion replaces manual `urls.py` wiring with Python objects:

```python
from django_fusion.core import Site, Application, Viewset, ModelViewset

class ProductsApp(Application):
    prefix = "products"
    viewsets = [ProductViewset]

class ProductViewset(ModelViewset):
    model = Product
    fields = ["name", "price", "category"]
    table_columns = ["name", "price", "actions"]

site = Site(applications=[ProductsApp])
urlpatterns = site.urlpatterns()
```

`ModelViewset` generates list, detail, create, update, and delete views from a single class definition. The template-resolution cascade automatically finds the right template for each operation based on the model name and action.

## Forms and Tables Mixins

`FormMixin`, `TableMixin`, and `FormTableMixin` combine form validation with table rendering through a template-resolution cascade:

1. Check for `{model}_{action}_form_table.html`
2. Fall back to `{app}_form_table.html`
3. Fall back to `fusion/form_table.html`

This eliminates the "which template do I use?" decision and ensures consistent rendering across the application.

```python
from django_fusion.core import FormTableMixin

class ProductFormTable(FormTableMixin):
    model = Product
    fields = ["name", "price"]
    table_columns = ["name", "price", "actions"]
```

## Wagtail Integration

For Wagtail-based projects, Django Fusion provides:

- **StreamField blocks** that use the `{% raw %}{% comp %}{% endraw %}` tag internally
- **Snippet registration** with automatic viewset generation
- **Viewset classes** that extend Wagtail's built-in viewset with Fusion's routing

```python
from django_fusion.core import WagtailViewset

class ProductViewset(WagtailViewset):
    model = Product
    menu_label = "Products"
    menu_icon = "cart"
```

This keeps the Wagtail admin experience intact while adding component-level reusability.

## Optional Bolt API Plugin

For projects that need a high-performance API layer, Django Fusion includes an optional `django-bolt` bridge:

```python
pip install 'django-fusion[bolt]'

from django_fusion.plugins.apis import build_bolt_api
from django_fusion.plugins.apis.bolt import mount_model_crud, mount_token_endpoint

api = build_bolt_api(prefix="/bolt", title="Workspace API")
if api is not None:
    mount_token_endpoint(api, user_required=True)
    mount_model_crud(api, Product, prefix="/products")
```

The plugin generates `msgspec.Struct` response schemas from Django models, mounts async CRUD routes, and handles JWT token issuance and verification. When django-bolt is not installed, `build_bolt_api()` returns `None` — the plugin is conditional and never breaks existing Django routes.

## Health Checks

Django Fusion includes three health check endpoints:

- **`/health/`** — returns 200 if the application is running
- **`/health/db/`** — verifies database connectivity
- **`/health/assets/`** — confirms static asset collection

These are production-ready endpoints that work with load balancers and container orchestration platforms without additional configuration.

## Configuration with Dynaconf

Django Fusion uses Dynaconf for multi-environment YAML configuration:

```yaml
# settings.yaml
default:
  FUSION_COMPONENT_PATH: "components/"
  FUSION_TABLE_PAGE_SIZE: 25

production:
  FUSION_TABLE_PAGE_SIZE: 50
```

Environment-specific overrides are loaded automatically based on `ENV_FOR_DYNACONF`.

## Quick Start

```bash
pip install django-fusion
```

Add to `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    # ...
    "django_fusion.comp",
    "django_fusion.core",
    "django_fusion.health",       # optional
    "django_fusion.analyzer",     # optional
    "django_fusion.config",
]
```

Render your first component:

```django
{% raw %}{% load comp %}
{% comp "components/button.html" label="Save" variant="primary" / %}{% endraw %}
```

The full walkthrough — including middleware ordering and template-tag builtins — is documented under `DF-001 Getting Started` in the repository.

## Documentation

The complete library documentation is organized under stable `DF-0NN` IDs:

| ID | Topic |
|---|---|
| DF-001 | Getting started |
| DF-002 | Architecture overview |
| DF-003 | Component system (Python) |
| DF-004 | `{% raw %}{% comp %}{% endraw %}` template tag |
| DF-005 | Routing and viewsets |
| DF-006 | Forms and tables |
| DF-007 | Settings and configuration |
| DF-008 | API reference |
| DF-009 | Health checks |
| DF-010 | Wagtail integration |
| DF-011 | Best practices |
| DF-012 | Integration examples |
| DF-013 | Troubleshooting |
| DF-014 | FAQ |
| DF-015 | Viewflow / django-material mapping |
| DF-016 | Asset pipeline and webpack |
| DF-017 | Integration modes and project organization |

## Conclusion

Django Fusion is not a rewrite of Django. It is a set of focused helpers that solve the patterns Django leaves to the developer. The `{% raw %}{% comp %}{% endraw %}` template tag gives you component boundaries. The routing helpers give you application-level organization. The form-table mixins eliminate duplication. The health checks give you production readiness. And the Wagtail integration keeps your CMS workflow intact.

If your Django project has grown beyond simple CRUD and you need architectural boundaries without leaving the Django ecosystem, Django Fusion is worth evaluating.

**Repository:** [github.com/mammhoud/django-fusion](https://github.com/mammhoud/django-fusion)
**License:** MIT
**Status:** v0.2.0 — 63+ tests, hypothesis property-based testing, Django 4.2/5.0, Python 3.11/3.12
