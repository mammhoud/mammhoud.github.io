---
layout: essay
type: essay
title: "Using Django ORM Outside Web Projects"
date: 2025-06-14
published: true
labels:
  - Django
  - Data Analysis
  - Python
  - Database Sync
---

<img width="80px" class="rounded float-left pe-4" src="https://static.djangoproject.com/img/logos/django-logo-negative.svg" alt="Django logo" onerror="this.src='../img/essay/django.jpg'">

## Using Django ORM Outside Web Projects

Django’s ORM is one of the most productive database interfaces in any language — expressive model definitions, automatic migrations, a powerful query API, and a mature ecosystem of tooling. Yet most developers treat it as inseparable from the full Django web framework, reaching for SQLAlchemy or raw SQL the moment they step outside a web context.

That assumption is wrong. Django’s ORM is a standalone library. With a minimal two-file setup, you can use it in data analysis tools, ETL pipelines, synchronization utilities, and any Python script that needs a reliable, well-documented database layer — without a single HTTP request handler, URL pattern, or template in sight.

The value proposition is compelling: if your team already knows Django, you already know the ORM. Reusing that knowledge in non-web contexts eliminates the learning curve of a new tool and delivers the full power of migrations, relationships, and query optimization to every Python project in your stack.

### Why Django ORM?
Django’s ORM is well-documented, actively maintained, and familiar to many web developers. It provides an intuitive interface for database models, migrations, and queries — and it is entirely decoupled from the web layer. Isolating just the ORM gives you a production-grade database toolkit with zero additional dependencies beyond Django itself.

---

## The Setup
I created a minimal setup with just two files:
- `manage.py` to configure Django manually.
- `models.py` to define my data structures and logic.

### manage.py
```python
#!/usr/bin/env python

def init_django():
    import django
    from django.conf import settings
    from pathlib import Path

    BASE_DIR = Path(__file__).resolve().parent

    if settings.configured:
        return

    settings.configure(
        INSTALLED_APPS=["db"],
        DATABASES={
            "default": {
                "ENGINE": "django.db.backends.sqlite3",
                "NAME": BASE_DIR / "db.sqlite3",
            }
        },
        TIME_ZONE="UTC",
        USE_TZ=True
    )
    django.setup()
    print("Database created:", BASE_DIR / "db.sqlite3")

if __name__ == "__main__":
    from django.core.management import execute_from_command_line
    init_django()
    execute_from_command_line()
```

### models.py
```python
from manage import init_django
init_django()

from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} - {self.price}"
```

---

## The Outcome
This setup allowed me to:

- Create and run migrations
- Interact with the database using Django’s ORM
- Avoid the overhead of a full Django app

It’s a simple yet effective way to keep things consistent and leverage Django’s strengths in non-web projects.

---

## Adding MongoDB for Data Sync

As I expanded this project, I introduced **MongoDB** as a secondary database to create a simple **synchronization tool** between two types of databases: SQL (using Django ORM) and NoSQL (MongoDB).

Using libraries like `pymongo`, I was able to pull data from the Django SQLite database and sync it to a MongoDB collection for quick access and flexible document storage.

This made it possible to:
- Sync relational data to a document-based database
- Keep both databases updated for different use cases
- Use MongoDB as a fast, scalable read layer

---

## Introducing Mongoz: Django-Like MongoDB ORM

To make the sync process even smoother and more Pythonic, I discovered **Mongoz** — a Django-style ORM for MongoDB.

Mongoz lets you define MongoDB collections using class-based models with almost identical syntax to Django models. This makes it incredibly easy to work with MongoDB if you’re already familiar with Django ORM.

With Mongoz, I can write database queries, define fields, and structure my MongoDB collections just like I do with Django’s ORM. It simplifies the learning curve and brings a unified coding style when working with both SQL and NoSQL databases.

---

## Conclusion

The tools you already know can do more than you think. Django's ORM is not a web framework component — it is a standalone database toolkit that happens to ship with Django. Decoupling it from the web layer unlocks its full power for data analysis, ETL pipelines, synchronization tools, and any Python project that needs a reliable, well-documented database interface.

The pattern is straightforward: two files, a `settings.configure()` call, and you have access to migrations, relationships, query optimization, and the entire Django ORM ecosystem. For teams already invested in Django, this eliminates the need to learn a new tool every time a non-web database project arises.

Extend the pattern with MongoDB via Mongoz for document storage, and you have a unified, Pythonic interface across both relational and document databases — built on tools your team already knows.
