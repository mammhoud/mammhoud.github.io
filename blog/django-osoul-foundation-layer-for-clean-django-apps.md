---
layout: post
type: post
title: "Django-Osoul: Foundation Layer for Clean Django Apps"
date: 2025-04-18
published: true
labels:
  - Python
  - Django
  - HTMX
  - Architecture
  - Components
---

<img width="80px" class="rounded float-left pe-4" src="https://static.djangoproject.com/img/logos/django-logo-negative.svg" alt="Django-Osoul logo" onerror="this.src='../img/post/django.jpg'">

## What is Django-Osoul?

Every Django project starts clean. Six months later, views are 300 lines long, tests are impossible to write, and every new feature takes twice as long as the last. The problem is not Django — it is the absence of enforced architectural boundaries. Django's "batteries included" philosophy gives you everything you need to build, but nothing to prevent the patterns that make codebases unmaintainable.

Django-Osoul is the foundation layer that eliminates this trajectory. It is a pure Django library — models, managers, mixins, components, routing, and access control — that enforces Clean Architecture boundaries from day one. Zero Wagtail dependencies. Zero Celery dependencies. Just the structural patterns that keep Django projects maintainable as they scale.

## Key Benefits

| Feature | Django-Osoul | Plain Django | DRF |
|---------|-------------|--------------|-----|
| HTMX component system | ✅ Built-in `FragmentComponent` | ❌ Manual | ❌ None |
| Auto CRUD generation | ✅ `ModelViewset` | ❌ Manual | ⚠️ ViewSets |
| Role hierarchy | ✅ `RoleHierarchyManager` | ❌ Manual | ❌ Manual |
| OOB fragment updates | ✅ Built-in | ❌ Manual | ❌ None |
| Base models (UUID, soft-delete) | ✅ `BaseModel` | ❌ Manual | ❌ Manual |
| Error tracking middleware | ✅ Zero-config | ❌ Manual | ❌ Manual |
| App registration system | ✅ `App` class | ❌ None | ❌ None |
| Clean Architecture enforcement | ✅ Structural | ❌ Convention only | ❌ Convention only |

```bash
pip install django-osoul
# or
uv add django-osoul
```

```python
INSTALLED_APPS = [
    "django_osoul",
    "django_osoul.comp",
    "django_osoul.contrib",
]
```

---

## The Problem Django Doesn't Solve

Standard Django views become dumping grounds. A typical "simple" view ends up doing authentication, ORM queries, business logic, serialization, and rendering — all in one function. Adding HTMX makes it worse: you end up with duplicate endpoints, manual `HX-Request` header checks, and copy-pasted templates.

```python
# The "Django spaghetti" pattern
def blog_post_list(request):
    if request.headers.get('HX-Request'):
        posts = BlogPost.objects.filter(status='published')
        if request.GET.get('q'):
            posts = posts.filter(title__icontains=request.GET['q'])
        return render(request, 'blog/fragments/post_list.html', {'posts': posts})
    else:
        posts = BlogPost.objects.filter(status='published')
        return render(request, 'blog/list.html', {'posts': posts})
```

Django-Osoul replaces this with a component model that handles both cases automatically.

---

## Component System

### FragmentComponent — HTMX Partial Updates

The core building block. Handles both HTMX fragment requests and full-page renders from a single class.

```python
from django_osoul.routes import FragmentComponent

class BlogPostListFragment(FragmentComponent):
    """
    Blog post list as HTMX fragment with pagination and search.
    URL: /app/blog/posts/list-fragment/
    """
    route_name = "post-list-fragment"
    route_path = "posts/list-fragment/"
    fragment_template = "blog/fragments/post_list.html"
    htmx_only = True
    paginate_by = 10
    show_in_menu = False

    def has_permission(self, user):
        return True  # Public

    def get_queryset(self):
        from apps.blog.models import BlogPost
        from django.db.models import Q

        qs = BlogPost.objects.filter(
            status="published"
        ).select_related("author", "category")

        q = self.request.GET.get("q", "").strip()
        if q:
            qs = qs.filter(Q(title__icontains=q) | Q(body__icontains=q))

        category = self.request.GET.get("category")
        if category:
            qs = qs.filter(category__slug=category)

        return qs.order_by("-published_date")

    def get_fragment_context(self, **kwargs):
        context = super().get_fragment_context(**kwargs)
        from apps.blog.models import BlogCategory

        context["categories"] = BlogCategory.objects.all()
        context["search_query"] = self.request.GET.get("q", "")
        context["selected_category"] = self.request.GET.get("category", "")
        return context
```

**HTMX template usage:**

{% raw %}
```html
<!-- blog/fragments/post_list.html -->
<div id="post-list" data-fragment>
  <input type="search"
         name="q"
         value="{{ search_query }}"
         hx-get="{% url 'blog:post-list-fragment' %}"
         hx-trigger="keyup changed delay:300ms"
         hx-target="#post-list"
         hx-swap="innerHTML"
         hx-push-url="true">

  {% for post in page_obj %}
    <article>
      <h3>{{ post.title }}</h3>
      <p>{{ post.excerpt }}</p>
    </article>
  {% empty %}
    <p>No posts found.</p>
  {% endfor %}

  {% include "partials/pagination.html" %}
</div>
```
{% endraw %}

### OOB Fragments — Out-of-Band Updates

Components can push updates to multiple page regions in a single response:

```python
class BlogPostListFragment(FragmentComponent):
    # ...

    def get_oob_fragments(self):
        """Return OOB fragments to update other page regions."""
        from django.template.loader import render_to_string
        from apps.blog.models import BlogPost

        oob = []
        post_count = BlogPost.objects.filter(status="published").count()
        count_html = render_to_string(
            "blog/fragments/post_count.html",
            {"post_count": post_count},
            request=self.request,
        )
        oob.append(self.render_oob_fragment("post-count", count_html))
        return oob
```

### FragmentComponent with Form Handling

```python
class BlogPostCreateFragment(FragmentComponent):
    """
    Blog post creation form as HTMX fragment.
    On success, returns OOB fragments to refresh the post list.
    """
    route_name = "post-create-fragment"
    route_path = "posts/create-fragment/"
    fragment_template = "blog/fragments/post_create_form.html"
    htmx_only = True

    def has_permission(self, user):
        return user.is_staff

    def get_fragment_context(self, **kwargs):
        context = super().get_fragment_context(**kwargs)
        context["form"] = BlogPostForm()
        return context

    def post(self, request, *args, **kwargs):
        form = BlogPostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            return self._render_success_response(post)

        context = self.get_fragment_context()
        context["form"] = form
        return self.render_to_response(context)

    def _render_success_response(self, post):
        from django.http import HttpResponse
        from django.template.loader import render_to_string

        success_html = render_to_string(
            "blog/fragments/post_create_success.html",
            {"post": post},
            request=self.request,
        )
        response = HttpResponse(success_html)
        response["HX-Reswap"] = "innerHTML"
        response["HX-Retarget"] = "#post-list"
        return response
```

### RoutableComponent — Full-Page Dashboard

```python
from django_osoul.routes import RoutableComponent

class DashboardComponent(RoutableComponent):
    """LMS Dashboard — full-page routable component."""
    route_name = "dashboard"
    route_path = "dashboard/"
    title = "Dashboard"
    icon = "dashboard"
    menu_order = 1
    template_name = "lms/dashboard.html"

    def has_permission(self, user):
        return user.is_staff

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update({
            "stats": self._get_stats(),
            "recent_enrollments": self._get_recent_enrollments(),
        })
        return context

    def _get_stats(self):
        from apps.lms.models.courses import Course
        from apps.lms.models.enrollment import Enrollment
        return {
            "total_courses": Course.objects.count(),
            "total_enrollments": Enrollment.objects.count(),
            "published_courses": Course.objects.filter(published=True).count(),
        }

    def _get_recent_enrollments(self):
        from apps.lms.models.enrollment import Enrollment
        return (
            Enrollment.objects
            .select_related("student", "course")
            .order_by("-enrolled_at")[:10]
        )
```

### ModelViewset — Auto-Generated CRUD

```python
from django_osoul.routes import ModelViewset

class BlogPostViewset(ModelViewset):
    """
    Full CRUD interface for blog posts.
    Generates:
      GET  /app/blog/posts/              → list
      GET  /app/blog/posts/add/          → create form
      GET  /app/blog/posts/<pk>/detail/  → detail
      GET  /app/blog/posts/<pk>/change/  → update form
      GET  /app/blog/posts/<pk>/delete/  → delete confirm
    """
    from apps.blog.models import BlogPost

    model = BlogPost
    icon = "article"
    list_columns = ("title", "author", "category", "published_date", "status")
    list_filter_fields = ("category", "status")
    list_search_fields = ("title", "body")

    def has_view_permission(self, user, obj=None):
        return True  # Public list/detail

    def has_add_permission(self, user):
        return user.has_perm("blog.add_blogpost")

    def has_change_permission(self, user, obj=None):
        return user.has_perm("blog.change_blogpost")

    def has_delete_permission(self, user, obj=None):
        return user.has_perm("blog.delete_blogpost")
```

---

## Base Models

```python
from django_osoul.models import BaseModel

class Enrollment(BaseModel):
    """
    Inherits: id (UUID), created_at, updated_at, soft-delete support.
    """
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="enrollments"
    )
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    status = models.CharField(
        max_length=20,
        choices=[
            ('active', 'Active'),
            ('completed', 'Completed'),
            ('dropped', 'Dropped'),
            ('expired', 'Expired'),
        ],
        default='active'
    )
    progress = models.FloatField(default=0.0)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    last_accessed_at = models.DateTimeField(auto_now=True)

    objects = EnrollmentsManager()

    class Meta:
        unique_together = ["student", "course"]
        ordering = ["-created_at"]
```

---

## Access Control

### RoleHierarchyManager

```python
from django_osoul.managers import RoleHierarchyManager

class SiteRoleManager(RoleHierarchyManager):
    ROLE_HIERARCHY = {
        "admin": ["supervisor", "instructor", "student"],
        "supervisor": ["instructor", "student"],
        "instructor": ["student"],
        "student": [],
    }
    ROLE_PERMISSIONS = {
        "admin": ["auth.add_user", "auth.change_user", "lms.manage_courses"],
        "supervisor": ["auth.view_user", "lms.view_reports"],
        "instructor": ["lms.add_course", "lms.change_course"],
        "student": ["lms.view_course"],
    }

mgr = SiteRoleManager()

# Assign user to role (includes all inherited roles)
mgr.assign_user_to_role(request.user, "instructor")

# Get all permissions including inherited
perms = mgr.get_all_permissions_for_role("supervisor")
# {"auth.view_user", "lms.view_reports", "lms.view_course"}
```

### GroupAccessControl

```python
from django_osoul.managers import GroupAccessControl

# Check if user belongs to any of the required groups
if GroupAccessControl.check_group_access(request.user, ["editors", "admins"]):
    # allow access

# Filter queryset to user's accessible groups
qs = GroupAccessControl.filter_by_group(Article.objects.all(), request.user)
```

---

## Middleware

```python
# settings.py
MIDDLEWARE = [
    ...
    "django_osoul.middlewares.error_tracker.ErrorTrackerMiddleware",
]
```

Logs every 4xx/5xx with method, path, status, user email, user agent, and IP — zero configuration.

---

## App Registration

```python
from django_osoul.site.routes import App

class BlogApp(App):
    name = "blog"
    verbose_name = "Blog"
    icon = "article"

    viewsets = [
        BlogPostViewset,
        BlogCategoryViewset,
    ]

    fragments = [
        BlogPostListFragment,
        BlogPostCreateFragment,
    ]
```

---

## Use Cases

- HTMX-powered Django apps without JavaScript fatigue
- Reusable UI component libraries shared across projects
- Role-based access control with permission inheritance
- Auto-generated CRUD interfaces via `ModelViewset`
- Clean Architecture with enforced layer boundaries

## Conclusion

The cost of architectural debt in Django projects is not paid upfront — it compounds. Every view that grows beyond its responsibility, every permission check duplicated across endpoints, every HTMX fragment handled with manual header inspection: these are the patterns that make Django projects expensive to maintain and impossible to test.

Django-Osoul eliminates these patterns structurally. `FragmentComponent` handles HTMX and full-page rendering from a single class. `ModelViewset` generates complete CRUD interfaces from a model definition. `RoleHierarchyManager` enforces permission inheritance without manual duplication. `BaseModel` provides UUID primary keys and soft-delete support to every model that inherits it.

The result is a Django project that stays clean as it scales — where adding a new feature means writing a new component, not untangling an existing view.

👉 Read more on [Medium](https://medium.com/@mammhoud/django-osoul-clean-architecture)

## References

- [Django-Osoul GitHub](https://github.com/mammhoud/django-osoul) - Official repository
- [HTMX Documentation](https://htmx.org/) - HTMX library
- [Django Documentation](https://docs.djangoproject.com/) - Django framework
