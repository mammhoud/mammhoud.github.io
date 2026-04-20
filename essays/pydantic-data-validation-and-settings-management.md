---
layout: essay
type: essay
title: "Pydantic: Data Validation & Settings Management"
date: 2025-04-15
published: true
labels:
  - Python
  - Pydantic
  - Data Validation
---

<img width="80px" class="rounded float-start pe-4" src="https://docs.pydantic.dev/latest/logo-white.svg" alt="Pydantic logo" onerror="this.src='../img/essay/django.jpg'">

Bad data is the silent killer of Python applications — invalid inputs, missing fields, and type mismatches that only surface at runtime. Pydantic eliminates that entire class of bugs by enforcing data contracts at the boundary, using nothing more than Python type annotations you already write.

```bash
pip install pydantic
```

## The Problem It Solves

Without a validation layer, Python code is fragile at every data boundary — API requests, config files, database results, and inter-service messages all become potential sources of silent corruption.

- **Runtime type safety**: Catch `"abc"` where an `int` was expected before it reaches your business logic
- **Zero-boilerplate validation**: Declare constraints with `Field(gt=0)` instead of writing `if price <= 0: raise ...`
- **Automatic serialization**: Convert models to dicts, JSON, or ORM objects with a single method call
- **Settings management**: Load environment variables with type coercion and validation out of the box
- **FastAPI's backbone**: Every FastAPI request/response schema is a Pydantic model — mastering Pydantic means mastering FastAPI

## Key Benefits at a Glance

| Capability | Pydantic | dataclasses | marshmallow |
|---|---|---|---|
| Runtime validation | ✅ Built-in | ❌ Manual | ✅ Built-in |
| Type coercion | ✅ Automatic | ❌ None | ⚠️ Partial |
| JSON serialization | ✅ Native | ❌ Manual | ✅ Built-in |
| Settings / env vars | ✅ BaseSettings | ❌ None | ❌ None |
| ORM integration | ✅ `from_attributes` | ❌ None | ⚠️ Partial |
| Performance (v2) | ✅ Rust core | ✅ Fast | ⚠️ Slower |
| FastAPI support | ✅ Native | ❌ None | ❌ None |

---

## Getting Started in 60 Seconds

### Basic Models

```python
from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    id: int
    name: str
    email: str
    age: Optional[int] = None

user = User(id=1, name="John", email="john@example.com")
print(user.model_dump())       # → dict
print(user.model_dump_json())  # → JSON string
```

### Enforcing Field Constraints

```python
from pydantic import BaseModel, Field, validator

class Product(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    price: float = Field(gt=0, description="Must be positive")
    stock: int = Field(ge=0)

    @validator('name')
    def title_case(cls, v):
        return v.title()

product = Product(name="laptop", price=999.99, stock=10)
print(product.name)  # "Laptop"
```

### Composing Nested Models

```python
from pydantic import BaseModel
from typing import List

class Address(BaseModel):
    street: str
    city: str
    country: str

class Person(BaseModel):
    name: str
    addresses: List[Address]

person = Person(name="John", addresses=[
    {"street": "123 Main St", "city": "NYC", "country": "USA"}
])
```

### Cross-Field Validation Without Boilerplate

```python
from pydantic import BaseModel, root_validator
from datetime import datetime

class Event(BaseModel):
    name: str
    start_date: datetime
    end_date: datetime

    @root_validator
    def end_after_start(cls, values):
        start, end = values.get('start_date'), values.get('end_date')
        if start and end and end <= start:
            raise ValueError('end_date must be after start_date')
        return values
```

---

## Winning Patterns: Real-World Use Cases

### 1. API Request Validation (FastAPI)

```python
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI()

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    age: int

@app.post("/users/")
def create_user(user: UserCreate):
    return {"email": user.email, "age": user.age}
```

### 2. Type-Safe Settings Management

```python
from pydantic import BaseModel, Field
from typing import Optional

class Settings(BaseModel):
    database_url: str
    debug: bool = False
    max_connections: int = Field(default=10, ge=1)
    api_key: Optional[str] = None

    class Config:
        env_file = ".env"

settings = Settings()
```

### 3. Data Transformation at the Boundary

```python
from pydantic import BaseModel, validator
from datetime import datetime

class BlogPost(BaseModel):
    title: str
    content: str
    published_at: datetime

    @validator('title')
    def strip_title(cls, v):
        return v.strip()

    @validator('content')
    def min_length(cls, v):
        if len(v) < 10:
            raise ValueError('Content too short')
        return v

post = BlogPost(
    title="  My Post  ",
    content="This is a blog post about Python",
    published_at="2025-04-15T10:00:00"
)
```

### 4. ORM Integration Without Extra Adapters

```python
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserDB(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True  # enables ORM mode

# With SQLAlchemy
def get_user(db, user_id: int) -> UserDB:
    user = db.query(User).filter(User.id == user_id).first()
    return UserDB.from_orm(user)
```

---

## Advanced Capabilities

### Custom Types for Domain Validation

```python
import re
from pydantic import BaseModel

class PhoneNumber(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not re.fullmatch(r'\d{3}-\d{3}-\d{4}', v):
            raise ValueError('invalid phone format: use 000-000-0000')
        return cls(v)

class Contact(BaseModel):
    name: str
    phone: PhoneNumber

contact = Contact(name="John", phone="123-456-7890")
```

### Computed Fields

```python
from pydantic import BaseModel, computed_field

class Rectangle(BaseModel):
    width: float
    height: float

    @computed_field
    @property
    def area(self) -> float:
        return self.width * self.height

rect = Rectangle(width=5, height=10)
print(rect.area)  # 50.0
```

### Custom JSON Serialization

```python
from pydantic import BaseModel
from datetime import datetime

class Post(BaseModel):
    title: str
    created_at: datetime

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

post = Post(title="Test", created_at=datetime.now())
print(post.model_dump_json())
```

---

## How to Win with Pydantic

- **Validate at the boundary** — catch bad data at entry points, not deep in business logic
- **Use `Field(...)` for constraints** instead of custom validators when possible — it's faster and self-documenting
- **Use `model_validate`** over `__init__` for performance-sensitive paths
- **Use `model_copy(update={...})`** for efficient partial updates without mutation
- **Always test edge cases and invalid inputs** — Pydantic's error messages are your first line of debugging

Pydantic is not just a validation library — it is the foundation of type-safe Python. Adopt it at every data boundary and your codebase becomes dramatically easier to reason about, test, and maintain.

👉 Read more on [Medium](https://medium.com/@mammhoud/pydantic-data-validation)

## References

- [Pydantic Documentation](https://docs.pydantic.dev/) - Official docs
- [Pydantic GitHub](https://github.com/pydantic/pydantic) - Source code
- [Python typing module](https://docs.python.org/3/library/typing.html) - Type hints
