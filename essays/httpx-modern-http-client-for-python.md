---
layout: essay
type: essay
title: "HTTPX: Modern HTTP Client for Python"
date: 2025-04-16
published: true
labels:
  - Python
  - HTTPX
  - HTTP
  - Async
---

<img width="80px" class="rounded float-start pe-4" src="https://www.python-httpx.org/img/logo.svg" alt="HTTPX logo" onerror="this.src='../img/essay/django.jpg'">

## Introduction

The `requests` library built Python's HTTP ecosystem. It set the standard for ergonomic API clients and remains the most-installed Python package. HTTPX inherits that legacy and extends it with async-first design — delivering a drop-in replacement that unlocks concurrent HTTP operations, HTTP/2 support, and first-class `asyncio` and `trio` compatibility without sacrificing the familiar `requests`-style API.

For modern Python applications — FastAPI services, async data pipelines, microservice clients — HTTPX transforms HTTP communication from a synchronous bottleneck into a high-throughput, non-blocking operation. A single `AsyncClient` with `asyncio.gather` replaces sequential request loops and eliminates the latency that compounds across dozens of API calls.

## Key Benefits

| Feature | HTTPX | requests | aiohttp |
|---------|-------|----------|---------|
| Sync support | ✅ Full | ✅ Full | ❌ Async only |
| Async support | ✅ Native | ❌ None | ✅ Native |
| HTTP/2 | ✅ Built-in | ❌ None | ❌ None |
| Type hints | ✅ Complete | ⚠️ Partial | ⚠️ Partial |
| requests-compatible API | ✅ Drop-in | ✅ Original | ❌ Different |
| Connection pooling | ✅ Auto | ✅ Session | ✅ Session |
| Streaming | ✅ Sync + Async | ✅ Sync | ✅ Async |
| Timeout control | ✅ Granular | ⚠️ Basic | ✅ Granular |
| Retry support | ✅ Transport | ❌ Manual | ❌ Manual |
| Test client | ✅ Built-in | ❌ None | ❌ None |

```bash
pip install httpx
```

## Synchronous Requests

```python
import httpx

# GET
response = httpx.get("https://api.example.com/users")
print(response.status_code)
print(response.json())

# GET with params and headers
response = httpx.get(
    "https://api.example.com/users",
    params={"page": 1, "limit": 10},
    headers={"Authorization": "Bearer token123"}
)

# POST JSON
response = httpx.post(
    "https://api.example.com/users",
    json={"name": "John", "email": "john@example.com"}
)

# PUT / PATCH / DELETE
httpx.put("https://api.example.com/users/1", json={"name": "Jane"})
httpx.patch("https://api.example.com/users/1", json={"email": "jane@example.com"})
httpx.delete("https://api.example.com/users/1")
```

## Async Requests

```python
import httpx
import asyncio

# Single async request
async def fetch_user(user_id):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://api.example.com/users/{user_id}")
        return response.json()

# Multiple concurrent requests
async def fetch_many(user_ids):
    async with httpx.AsyncClient() as client:
        tasks = [client.get(f"https://api.example.com/users/{uid}") for uid in user_ids]
        responses = await asyncio.gather(*tasks)
        return [r.json() for r in responses]

users = asyncio.run(fetch_many([1, 2, 3, 4, 5]))
```

## Client Configuration

```python
import httpx

# Reusable configured client
with httpx.Client(
    base_url="https://api.example.com",
    headers={"Authorization": "Bearer token123"},
    timeout=30.0
) as client:
    r1 = client.get("/users")
    r2 = client.post("/users", json={"name": "John"})

# Async version
async with httpx.AsyncClient(base_url="https://api.example.com") as client:
    r = await client.get("/users")
```

## Error Handling

```python
import httpx

try:
    response = httpx.get("https://api.example.com/users", timeout=10.0)
    response.raise_for_status()  # raises on 4xx / 5xx
    data = response.json()
except httpx.HTTPStatusError as e:
    print(f"HTTP {e.response.status_code}: {e.response.text}")
except httpx.TimeoutException:
    print("Request timed out")
except httpx.RequestError as e:
    print(f"Network error: {e}")
```

## Retries

```python
import httpx

client = httpx.Client(
    mounts={"https://": httpx.HTTPTransport(retries=3)}
)
response = client.get("https://api.example.com/users")
```

## Use Cases

### 1. Typed API Client

```python
import httpx
from dataclasses import dataclass

@dataclass
class GitHubClient:
    token: str
    _client: httpx.Client = None

    def __post_init__(self):
        self._client = httpx.Client(
            base_url="https://api.github.com",
            headers={"Authorization": f"token {self.token}"}
        )

    def get_user(self, username: str) -> dict:
        return self._client.get(f"/users/{username}").json()

    def get_repos(self, username: str) -> list:
        return self._client.get(f"/users/{username}/repos").json()

    def close(self):
        self._client.close()

client = GitHubClient(token="your-token")
user = client.get_user("mammhoud")
client.close()
```

### 2. Microservice Communication

```python
import httpx
import asyncio

async def aggregate_data(order_id: int):
    async with httpx.AsyncClient() as client:
        user_task = client.get(f"http://user-service/users/{order_id}")
        order_task = client.get(f"http://order-service/orders/{order_id}")
        user_r, order_r = await asyncio.gather(user_task, order_task)
        return {"user": user_r.json(), "order": order_r.json()}
```

### 3. File Download (Streaming)

```python
import httpx

def download_file(url: str, dest: str):
    with httpx.stream("GET", url) as response:
        with open(dest, "wb") as f:
            for chunk in response.iter_bytes(chunk_size=8192):
                f.write(chunk)

download_file("https://example.com/large-file.zip", "file.zip")
```

### 4. Web Scraping

```python
import httpx
from bs4 import BeautifulSoup

def scrape_titles(url: str) -> list[str]:
    response = httpx.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    return [h1.text.strip() for h1 in soup.find_all("h1")]
```

## Best Practices

- Always use `with` / `async with` — ensures connections are closed
- Reuse a single `Client` across requests — shares connection pool
- Set explicit timeouts — never let requests hang indefinitely
- Use `raise_for_status()` — don't silently swallow HTTP errors
- Prefer async for concurrent I/O — massive throughput gains

## Conclusion

HTTP communication is at the core of every modern Python application — API integrations, microservice calls, data ingestion, and webhook delivery all depend on it. HTTPX powers all of these use cases from a single, consistent interface: synchronous for scripts and Django views, asynchronous for FastAPI services and concurrent pipelines.

The migration from `requests` is frictionless — the API is intentionally compatible. The gains are immediate: async concurrency eliminates sequential latency, HTTP/2 reduces connection overhead, and the built-in test client makes integration testing straightforward. For any Python project that makes HTTP calls, HTTPX is the professional standard.

👉 Read more on [Medium](https://medium.com/@mammhoud/httpx-modern-http-client)

## References

- [HTTPX Documentation](https://www.python-httpx.org/) - Official docs
- [HTTPX GitHub](https://github.com/encode/httpx) - Source code
- [ASGI Specification](https://asgi.readthedocs.io/) - Async Server Gateway Interface
