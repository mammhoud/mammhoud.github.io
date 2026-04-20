---
layout: essay
type: essay
title: "Rich: Beautiful Terminal Output in Python"
published: true
labels:
  - Python
  - Rich
  - CLI
medium_url: https://medium.com/@mammhoud/rich-beautiful-terminal
---

<img width="80px" class="rounded float-start pe-4" src="https://raw.githubusercontent.com/Textualize/rich/master/imgs/logo.svg" alt="Rich logo" onerror="this.src='../img/essay/django.jpg'">

## Introduction

First impressions matter — even in the terminal. A wall of plain `print()` output communicates nothing about structure, priority, or progress. Rich transforms plain Python output into professional, readable interfaces — with syntax-highlighted code, formatted tables, real-time progress bars, and structured panels — using nothing but standard Python and a single library.

For CLI tools, data pipelines, and developer utilities, Rich eliminates the gap between "script that works" and "tool that communicates." It powers production-grade terminal UIs that developers trust, operators read, and users actually understand.

## Key Benefits

| Feature | Rich | colorama | termcolor | blessed |
|---------|------|----------|-----------|---------|
| Markup syntax | ✅ `[bold red]text[/]` | ❌ ANSI codes | ❌ ANSI codes | ⚠️ Limited |
| Tables | ✅ Full-featured | ❌ None | ❌ None | ❌ None |
| Progress bars | ✅ Multi-task | ❌ None | ❌ None | ⚠️ Basic |
| Syntax highlighting | ✅ 500+ languages | ❌ None | ❌ None | ❌ None |
| Logging integration | ✅ `RichHandler` | ❌ None | ❌ None | ❌ None |
| Markdown rendering | ✅ Built-in | ❌ None | ❌ None | ❌ None |
| JSON pretty-print | ✅ Built-in | ❌ None | ❌ None | ❌ None |
| Tree structures | ✅ Built-in | ❌ None | ❌ None | ❌ None |
| Tracebacks | ✅ Beautiful | ❌ None | ❌ None | ❌ None |
| Windows support | ✅ Full | ✅ Full | ⚠️ Partial | ⚠️ Partial |

## Installation

```bash
pip install rich
```

## Basic Usage

### Simple Output

```python
from rich import print

# Colored text
print("[bold red]Error:[/bold red] Something went wrong")
print("[green]Success![/green]")
print("[blue]Information[/blue]")

# Styled text
print("[bold]Bold text[/bold]")
print("[italic]Italic text[/italic]")
print("[underline]Underlined text[/underline]")
```

### Console Object

```python
from rich.console import Console

console = Console()

# Print with console
console.print("[bold cyan]Hello[/bold cyan] World!")

# Print to file
with open("output.txt", "w") as f:
    console.print("This goes to file", file=f)

# Get console width
console.print(f"Console width: {console.width}")
```

## Tables

### Basic Table

```python
from rich.table import Table
from rich.console import Console

console = Console()

# Create table
table = Table(title="Star Wars Movies")
table.add_column("Film", style="cyan")
table.add_column("Year", style="magenta")
table.add_column("Director", style="green")

# Add rows
table.add_row("A New Hope", "1977", "George Lucas")
table.add_row("The Empire Strikes Back", "1980", "Irvin Kershner")
table.add_row("Return of the Jedi", "1983", "Richard Marquardt")

console.print(table)
```

### Advanced Table Features

```python
from rich.table import Table
from rich.console import Console

console = Console()

table = Table(title="Sales Report")
table.add_column("Product", style="cyan", no_wrap=True)
table.add_column("Q1", justify="right", style="magenta")
table.add_column("Q2", justify="right", style="magenta")
table.add_column("Q3", justify="right", style="magenta")
table.add_column("Total", justify="right", style="green")

table.add_row("Laptop", "$1000", "$1200", "$1100", "$3300")
table.add_row("Phone", "$500", "$600", "$550", "$1650")
table.add_row("Tablet", "$300", "$350", "$320", "$970")

console.print(table)
```

## Progress Bars

### Simple Progress

```python
from rich.progress import track
import time

# Track loop progress
for item in track(range(100), description="Processing..."):
    time.sleep(0.1)
```

### Advanced Progress

```python
from rich.progress import Progress
import time

with Progress() as progress:
    task1 = progress.add_task("[red]Downloading...", total=100)
    task2 = progress.add_task("[green]Processing...", total=100)
    task3 = progress.add_task("[cyan]Uploading...", total=100)

    while not progress.finished:
        progress.update(task1, advance=0.5)
        progress.update(task2, advance=0.3)
        progress.update(task3, advance=0.9)
        time.sleep(0.02)
```

## Panels and Boxes

### Panels

```python
from rich.panel import Panel
from rich.console import Console

console = Console()

# Simple panel
console.print(Panel("Hello, World!"))

# Styled panel
console.print(Panel(
    "[bold cyan]Important Message[/bold cyan]",
    title="Alert",
    style="red"
))
```

### Boxes

```python
from rich.panel import Panel
from rich.box import Box
from rich.console import Console

console = Console()

# Different box styles
console.print(Panel("Box ROUNDED", box=Box.ROUNDED))
console.print(Panel("Box SQUARE", box=Box.SQUARE))
console.print(Panel("Box DOUBLE", box=Box.DOUBLE))
console.print(Panel("Box HEAVY", box=Box.HEAVY))
```

## Syntax Highlighting

### Code Highlighting

```python
from rich.syntax import Syntax
from rich.console import Console

console = Console()

code = '''
def hello(name):
    print(f"Hello {name}!")

hello("World")
'''

syntax = Syntax(code, "python", theme="monokai", line_numbers=True)
console.print(syntax)
```

## Logging

### Rich Logging

```python
import logging
from rich.logging import RichHandler

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(message)s",
    handlers=[RichHandler()]
)

logger = logging.getLogger("rich")

# Use logger
logger.info("This is an info message")
logger.warning("This is a warning")
logger.error("This is an error")
```

## Advanced Features

### 1. Columns

```python
from rich.columns import Columns
from rich.panel import Panel
from rich.console import Console

console = Console()

# Create columns
col1 = Panel("Column 1", style="red")
col2 = Panel("Column 2", style="green")
col3 = Panel("Column 3", style="blue")

console.print(Columns([col1, col2, col3]))
```

### 2. Trees

```python
from rich.tree import Tree
from rich.console import Console

console = Console()

tree = Tree("📁 Project")
tree.add("📁 src")
tree.add("📁 tests")
tree.add("📁 docs")
tree.add("📄 README.md")
tree.add("📄 setup.py")

console.print(tree)
```

### 3. Markdown

```python
from rich.markdown import Markdown
from rich.console import Console

console = Console()

markdown = Markdown("""
# Hello World

This is **bold** and this is *italic*.

- Item 1
- Item 2
- Item 3

```python
print("Code block")
```
""")

console.print(markdown)
```

### 4. JSON

```python
from rich.json import JSON
from rich.console import Console

console = Console()

data = {
    "name": "John",
    "age": 30,
    "email": "john@example.com",
    "hobbies": ["reading", "coding", "gaming"]
}

console.print(JSON.from_data(data))
```

## Use Cases

### 1. CLI Application

```python
from rich.console import Console
from rich.table import Table
from rich.panel import Panel

console = Console()

def show_menu():
    console.print(Panel("[bold cyan]Main Menu[/bold cyan]"))
    console.print("[1] View Users")
    console.print("[2] Add User")
    console.print("[3] Exit")

def show_users(users):
    table = Table(title="Users")
    table.add_column("ID", style="cyan")
    table.add_column("Name", style="magenta")
    table.add_column("Email", style="green")

    for user in users:
        table.add_row(str(user['id']), user['name'], user['email'])

    console.print(table)

# Usage
users = [
    {"id": 1, "name": "John", "email": "john@example.com"},
    {"id": 2, "name": "Jane", "email": "jane@example.com"}
]

show_menu()
show_users(users)
```

### 2. Status Updates

```python
from rich.console import Console
from rich.progress import track
import time

console = Console()

# Simulate work with status
with console.status("[bold green]Working...") as status:
    for i in track(range(10), description="Processing"):
        time.sleep(0.1)
        status.update(f"[bold green]Processing item {i+1}...")

console.print("[green]✓ Done![/green]")
```

### 3. Error Reporting

```python
from rich.console import Console
from rich.traceback import install

# Install rich traceback handler
install()

console = Console()

try:
    result = 1 / 0
except Exception as e:
    console.print_exception()
```

## Best Practices

1. **Use markup** - Leverage Rich's markup for styling
2. **Organize output** - Use panels and tables for clarity
3. **Add progress** - Show progress for long operations
4. **Use colors wisely** - Don't overuse colors
5. **Test in terminal** - Ensure output looks good

## Performance Tips

- Cache formatted output when possible
- Use `console.is_terminal()` to check if output is a terminal
- Avoid excessive updates in loops
- Use `console.quiet` to suppress output when needed

## Conclusion

The terminal is a professional interface. Users, operators, and developers judge tools by how clearly they communicate — and plain `print()` output fails that standard. Rich transforms every Python script into a polished, readable tool: structured tables replace raw data dumps, progress bars replace silent waits, and syntax-highlighted tracebacks replace cryptic error walls.

The adoption cost is a single `pip install rich`. The return is a terminal experience that communicates intent, surfaces structure, and earns the trust of everyone who runs your code. For any Python project with a CLI or terminal output, Rich is the professional standard.

👉 Read more on [Medium]({{ page.medium_url }})
