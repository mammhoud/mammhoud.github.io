---
layout: post
type: post
title: "FastAPI vs Django Ninja: Modern Python API Frameworks"
date: 2025-04-21
published: true
labels:
  - Python
  - FastAPI
  - Django Ninja
  - API
---

<img width="80px" class="rounded float-left pe-4" src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" alt="FastAPI logo" onerror="this.src='../img/post/django.jpg'">

## Introduction

Modern Python API development has converged on two frameworks that share the same foundation — Pydantic validation, automatic OpenAPI documentation, and type-safe request handling — but diverge sharply in architecture and ecosystem fit. **FastAPI** is a standalone, async-first ASGI framework built for greenfield services and maximum performance. **Django Ninja** is a FastAPI-inspired API layer that integrates directly into Django, preserving every investment in the ORM, admin, auth, and middleware.

The right choice is not about which framework is superior — it is about which framework eliminates friction for your specific stack. FastAPI unlocks maximum async performance and architectural freedom. Django Ninja unlocks type-safe APIs with zero migration cost for teams already operating in the Django ecosystem. Both generate production-grade OpenAPI documentation automatically and validate requests through Pydantic v2.

## FastAPI

FastAPI is a standalone ASGI framework built on Starlette and Pydantic.

```bash
pip install fastapi uvicorn
```

### Basic Example

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    description: str = None

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/items/")
def create_item(item: Item):
    return item

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

```bash
uvicorn main:app --reload
# Docs at http://localhost:8000/docs
```

### Async Support

```python
import httpx
from fastapi import FastAPI

app = FastAPI()

@app.get("/external-data/")
async def get_external():
    async with httpx.AsyncClient() as client:
        r = await client.get("https://api.example.com/data")
        return r.json()
```

### Dependencies

```python
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    if not user:
        raise HTTPException(status_code=401)
    return user

@app.get("/me/")
def read_me(user = Depends(get_current_user)):
    return user
```

---

## Django Ninja

Django Ninja adds a FastAPI-style API layer on top of Django — you keep the ORM, auth, admin, and middleware.

```bash
pip install django-ninja
```

### Basic Example

```python
# api.py
from ninja import NinjaAPI, Schema

api = NinjaAPI()

class ItemSchema(Schema):
    name: str
    price: float

@api.get("/items/{item_id}")
def get_item(request, item_id: int):
    return {"item_id": item_id}

@api.post("/items/")
def create_item(request, item: ItemSchema):
    return item
```

```python
# urls.py
from django.urls import path
from .api import api

urlpatterns = [
    path("api/", api.urls),
]
```

### Using Django ORM Directly

```python
from ninja import NinjaAPI, Schema
from myapp.models import Post

api = NinjaAPI()

class PostOut(Schema):
    id: int
    title: str
    content: str

@api.get("/posts/", response=list[PostOut])
def list_posts(request):
    return Post.objects.filter(status="published")

@api.get("/posts/{post_id}", response=PostOut)
def get_post(request, post_id: int):
    return get_object_or_404(Post, id=post_id)
```

### Django Auth Integration

```python
from ninja import NinjaAPI
from ninja.security import django_auth

api = NinjaAPI(auth=django_auth)

@api.get("/profile/")
def profile(request):
    return {"username": request.user.username}
```

### Async in Django Ninja

```python
@api.get("/async-posts/")
async def async_posts(request):
    posts = await Post.objects.filter(status="published").aall()
    return posts
```

---

## Side-by-Side Comparison

The table below captures the decisive differences across the dimensions that determine framework fit for real production systems:

| Feature | FastAPI | Django Ninja |
|---------|---------|--------------|
| Base framework | Starlette (ASGI) | Django |
| ORM | SQLAlchemy / Tortoise | Django ORM ✅ |
| Auth | Custom / OAuth2 | Django auth ✅ |
| Admin panel | ❌ | Django admin ✅ |
| Async | Native | Via Django async |
| OpenAPI docs | ✅ Auto | ✅ Auto |
| Pydantic | ✅ v2 | ✅ v2 |
| Middleware | Starlette | Django ✅ |
| Learning curve | Low | Low (if Django known) |
| Migrations | Alembic / manual | Django migrations ✅ |
| WebSockets | ✅ | ✅ |
| Testing | pytest + httpx | Django test client |

---

## Code Comparison: Same Endpoint

**FastAPI:**
```python
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

app = FastAPI()

class UserOut(BaseModel):
    id: int
    name: str
    email: str

@app.get("/users/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Not found")
    return user
```

**Django Ninja:**
```python
from ninja import NinjaAPI, Schema
from django.shortcuts import get_object_or_404
from myapp.models import User

api = NinjaAPI()

class UserOut(Schema):
    id: int
    name: str
    email: str

@api.get("/users/{user_id}", response=UserOut)
def get_user(request, user_id: int):
    return get_object_or_404(User, id=user_id)
```

Django Ninja is noticeably less boilerplate when you already have Django models.

---

## When to Choose FastAPI

- Greenfield project with no Django dependency
- Need maximum async performance
- Building a standalone microservice
- Team prefers SQLAlchemy or Tortoise ORM
- Want full control over the stack

## When to Choose Django Ninja

- Already have a Django project
- Want to add an API alongside existing views
- Need Django ORM, admin, and auth out of the box
- Migrating from DRF to a type-safe API layer
- Want minimal new dependencies

---

## Conclusion

Both frameworks are production-ready and actively maintained. FastAPI wins on raw async performance, architectural flexibility, and ecosystem breadth — it is the right choice for greenfield microservices and teams that want full control over their stack. Django Ninja wins when you are already in the Django ecosystem: it delivers type-safe, auto-documented APIs with zero friction against existing models, auth, and admin, transforming a Django project into a modern API platform without a rewrite.

The decision is not about which framework is better. It is about which framework eliminates the most friction for your team's specific context.

👉 Read more on [Medium](https://medium.com/@mammhoud/fastapi-vs-django-ninja)

## References

- [FastAPI Documentation](https://fastapi.tiangolo.com/) - Official docs
- [Django Ninja GitHub](https://github.com/vitalik/django-ninja) - Source code
- [Pydantic](https://docs.pydantic.dev/) - Data validation used by both
