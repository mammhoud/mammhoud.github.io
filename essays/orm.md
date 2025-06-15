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

## Using Django ORM Outside Web Projects

You know that feeling when you’re working on a project, and you want to keep things simple, but still powerful? That’s exactly where I found myself recently. I was building a data analysis tool and realized I needed a quick, reliable way to store, manage, and interact with data. Sure, pandas and SQLAlchemy are great, but I wanted to lean into something I already knew well: Django.

But here’s the fun part — I didn’t want the whole Django web framework. I just wanted the ORM. And not just for data storage — I wanted to build a **sync tool** to connect two different database worlds: relational (SQL) and document-based (NoSQL).

It’s funny how often we think we need new tools for every new challenge. Sometimes, what we already know can take us much further than we expect.

### Why Django ORM?
Django’s ORM is well-documented, actively maintained, and familiar to many web developers. It provides an intuitive interface for database models, migrations, and queries. So, rather than switching to another tool, I chose to isolate and use just the ORM part of Django.

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

## Final Thoughts
Sometimes, the tools we already know can do more than we think. By decoupling Django's ORM from the full framework, introducing MongoDB for data sync, and using Mongoz for MongoDB management, I managed to streamline my workflow and build flexible, multi-database solutions.

Have you ever used Django outside of a web app or synced SQL to NoSQL? I'd love to hear your experience!