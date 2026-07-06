---
layout: post
type: post
title: "Typer vs Fire: Building Python CLI Apps"
published: true
labels:
  - Python
  - CLI
  - Typer
  - Fire
---

<img width="80px" class="rounded float-left pe-4" src="https://typer.tiangolo.com/img/logo-margin/logo-margin-vector.svg" alt="Typer logo" onerror="this.src='../img/post/django.jpg'">

## Introduction

Every Python script eventually needs a command-line interface. The question is not whether to build one — it is which framework delivers the right balance of power, ergonomics, and maintainability for your use case. Two frameworks dominate modern Python CLI development: **Typer**, which leverages Python type hints to generate validated, self-documenting interfaces; and **Google Fire**, which eliminates boilerplate entirely by exposing any Python object as a CLI with zero configuration.

The choice between them is a choice between professional-grade tooling and rapid prototyping velocity. Typer powers production CLIs that ship with complete help documentation, type validation, and interactive prompts. Fire powers scripts that need a CLI interface in under five minutes. Understanding the tradeoffs unlocks the right tool for every context.

## What is Typer?

Typer is a modern CLI framework built on top of Click that uses Python type hints for automatic argument parsing and documentation generation.

### Typer Example

```python
import typer

app = typer.Typer()

@app.command()
def hello(name: str = "World"):
    """Say hello to someone."""
    print(f"Hello {name}!")

@app.command()
def add(a: int, b: int):
    """Add two numbers."""
    print(f"Sum: {a + b}")

if __name__ == "__main__":
    app()
```

### Running Typer

```bash
python app.py hello John
# Output: Hello John!

python app.py add 5 3
# Output: Sum: 8

python app.py --help
# Shows help with type information
```

## What is Google Fire?

Google Fire is a library that automatically generates CLIs from Python objects with minimal code.

### Fire Example

```python
import fire

def hello(name="World"):
    """Say hello to someone."""
    return f"Hello {name}!"

def add(a, b):
    """Add two numbers."""
    return a + b

if __name__ == '__main__':
    fire.Fire({
        'hello': hello,
        'add': add,
    })
```

### Running Fire

```bash
python app.py hello --name=John
# Output: Hello John!

python app.py add --a=5 --b=3
# Output: 8

python app.py -- --help
# Shows help
```

## Comparison

### 1. Type Hints

**Typer:**
```python
@app.command()
def process(count: int, name: str = "default"):
    """Process with count and name."""
    pass
```

**Fire:**
```python
def process(count, name="default"):
    """Process with count and name."""
    pass
```

Typer uses type hints for validation and documentation. Fire infers types from default values.

### 2. Argument Parsing

**Typer:**
```python
@app.command()
def create(
    name: str = typer.Argument(..., help="Name of item"),
    count: int = typer.Option(1, help="Number of items")
):
    pass

# Usage: python app.py create "MyItem" --count 5
```

**Fire:**
```python
def create(name, count=1):
    pass

# Usage: python app.py create MyItem --count=5
```

Typer provides more explicit control over arguments and options.

### 3. Subcommands

**Typer:**
```python
app = typer.Typer()

@app.command()
def init():
    """Initialize project."""
    pass

@app.command()
def run():
    """Run project."""
    pass

if __name__ == "__main__":
    app()

# Usage: python app.py init
#        python app.py run
```

**Fire:**
```python
class CLI:
    def init(self):
        """Initialize project."""
        pass

    def run(self):
        """Run project."""
        pass

if __name__ == '__main__':
    fire.Fire(CLI)

# Usage: python app.py init
#        python app.py run
```

### 4. Help Documentation

**Typer:**
```bash
$ python app.py --help
Usage: app.py [OPTIONS] COMMAND [ARGS]...

Commands:
  add      Add two numbers.
  hello    Say hello to someone.

$ python app.py hello --help
Usage: app.py hello [OPTIONS]

  Say hello to someone.

Options:
  --name TEXT  [default: World]
  --help       Show this message and exit.
```

**Fire:**
```bash
$ python app.py -- --help
NAME
    app.py

SYNOPSIS
    app.py COMMAND

COMMANDS
    HELLO
    ADD
```

Typer generates more detailed and user-friendly help.

### 5. Error Handling

**Typer:**
```python
@app.command()
def divide(a: int, b: int):
    """Divide two numbers."""
    if b == 0:
        typer.echo("Error: Cannot divide by zero", err=True)
        raise typer.Exit(code=1)
    print(f"Result: {a / b}")
```

**Fire:**
```python
def divide(a, b):
    """Divide two numbers."""
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
```

Typer provides better error handling with exit codes.

## Feature Comparison Table

The table below captures the decisive differences between the two frameworks across the dimensions that matter most in production CLI development:

| Feature | Typer | Fire |
|---------|-------|------|
| Type Hints | ✅ Full support | ⚠️ Limited |
| Validation | ✅ Built-in | ❌ Manual |
| Help Generation | ✅ Excellent | ⚠️ Basic |
| Subcommands | ✅ Easy | ✅ Easy |
| Options/Flags | ✅ Explicit | ⚠️ Implicit |
| Error Handling | ✅ Rich | ⚠️ Basic |
| Learning Curve | ⚠️ Moderate | ✅ Easy |
| Flexibility | ✅ High | ✅ High |
| Documentation | ✅ Excellent | ⚠️ Good |

## When to Use Typer

- Building professional CLI applications
- Need type validation and documentation
- Complex argument parsing required
- Want interactive prompts and confirmations
- Need rich error messages

### Typer Example: Professional CLI

```python
import typer
from typing import Optional

app = typer.Typer()

@app.command()
def create(
    name: str = typer.Argument(..., help="Project name"),
    template: str = typer.Option("basic", help="Project template"),
    force: bool = typer.Option(False, help="Overwrite existing")
):
    """Create a new project."""
    if not force and project_exists(name):
        typer.echo(f"Project {name} already exists", err=True)
        raise typer.Exit(code=1)

    typer.echo(f"Creating {name} with {template} template...")
    # Create project logic

@app.command()
def delete(
    name: str = typer.Argument(..., help="Project name"),
    confirm: bool = typer.Option(False, "--yes", help="Skip confirmation")
):
    """Delete a project."""
    if not confirm:
        if not typer.confirm(f"Delete {name}?"):
            typer.echo("Cancelled")
            return

    typer.echo(f"Deleting {name}...")
    # Delete logic

if __name__ == "__main__":
    app()
```

## When to Use Fire

- Quick prototyping
- Simple scripts that need CLI interface
- Minimal dependencies preferred
- Learning Python CLI development
- Exposing Python functions as CLI

### Fire Example: Quick Script

```python
import fire

class Calculator:
    def add(self, a, b):
        return a + b

    def subtract(self, a, b):
        return a - b

    def multiply(self, a, b):
        return a * b

if __name__ == '__main__':
    fire.Fire(Calculator)

# Usage:
# python calc.py add 5 3
# python calc.py multiply 4 7
```

## Conclusion

The decision between Typer and Fire is a decision about the lifecycle of your CLI. Fire eliminates friction for scripts that need a command-line interface immediately — zero configuration, zero boilerplate, instant results. Typer powers CLIs that need to last: validated inputs, professional help documentation, interactive prompts, and the kind of user experience that earns adoption.

**Choose Typer when:**
- Building production CLI applications
- Need professional help documentation
- Want type safety and validation
- Require complex argument handling

**Choose Fire when:**
- Building quick scripts
- Want minimal boilerplate
- Prefer simplicity over features
- Prototyping CLI interfaces

Both are excellent tools. Typer is more powerful and feature-rich, while Fire is simpler and more lightweight. Your choice depends on your project's complexity and requirements.

👉 Read more on [Medium](https://medium.com/@mammhoud/typer-vs-fire-cli)

## References

- [Typer Documentation](https://typer.tiangolo.com/) - Official docs
- [Google Fire GitHub](https://github.com/google/python-fire) - Source code
- [Click](https://click.palletsprojects.com/) - Another popular CLI framework
