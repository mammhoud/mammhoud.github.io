---
layout: essay
type: essay
title: "MCP Agent Prompts: Customizing Templates and Project Features Through Structured Requirements"
date: 2026-07-05
published: true
labels:
  - MCP
  - AI
  - Prompts
  - Automation
  - Documentation
---

## Introduction

The **Model Context Protocol (MCP)** defines a standard way for AI agents to discover and interact with tools, resources, and prompts. For a static site or web project, MCP agents can be used to automate template customizations, add features, and enforce design system rules — all through structured, repeatable prompts.

This guide documents the prompt patterns used to customize this portfolio site and provides reusable templates for common operations.

## MCP Prompt Architecture

MCP prompts are **parameterized templates** stored on an MCP server. When invoked, they guide an AI agent through a multi-step workflow:

```
User Request → MCP Prompt Template → Context Gathering → Tool Execution → Validation
```

Each prompt template specifies:
- **Arguments** — What the user provides (e.g., color value, component name)
- **Context requirements** — Which files to read before acting
- **Tool chain** — The sequence of edits to perform
- **Validation rules** — How to confirm the change was applied correctly

## Prompt Categories

### 1. Template Customization Prompts

Used to modify Jekyll layout files, includes, and component templates.

#### Example: Modify Section Layout

```yaml
# .ceptor/prompts/layout-modification.yaml
name: modify-section-layout
description: Modify the layout structure of a portfolio section
arguments:
  - name: section
    type: string
    description: Section identifier (hero, projects, essays, resume)
    required: true
  - name: layout_changes
    type: string
    description: Description of layout changes to apply
    required: true
context:
  - _includes/about/about.html      # Hero section template
  - _includes/projects/projects.html
  - _includes/essays/essays.html
  - _layouts/essay.html
  - _layouts/project.html
tools:
  - read_files
  - str_replace
  - write_file
validation:
  - Verify HTML structure
  - Check Tailwind classes exist
  - Confirm responsive behavior
```

**Usage prompt:**
```
Using the modify-section-layout prompt, update the projects section to 
display cards in a 2-column grid on tablet and 3-column on desktop, 
with a centered section title and reduced gap.
```

### 2. Design Token Prompts

Used to modify CSS custom properties and design system values.

#### Example: Update Color Palette

```yaml
# .ceptor/prompts/update-palette.yaml
name: update-color-palette
description: Update the color scheme across all theme files
arguments:
  - name: token_changes
    type: object
    description: Map of CSS variable names to new values
    required: true
context:
  - css/site-theme/garden.css
  - projects/
  - _includes/
tools:
  - read_files
  - str_replace
  - npm run css:build     # Rebuild after changes
validation:
  - All --theme-* references updated consistently
  - color-mix() expressions recomputed
  - Contrast ratios preserved
```

**Usage prompt:**
```
Using the update-palette prompt, change these tokens:
  --theme-midnight-orchid: #1a0a2e
  --theme-fern: #4a9a5a
  --theme-sage: #b8d89a
```

### 3. Animation Addition Prompts

Used to add GSAP-powered animations via the portfolio animation script.

#### Example: Add Scroll Animation

```yaml
# .ceptor/prompts/add-scroll-animation.yaml
name: add-scroll-animation
description: Add a GSAP ScrollTrigger animation to a set of elements
arguments:
  - name: selector
    type: string
    description: CSS selector for elements to animate
    required: true
  - name: animation_type
    type: string
    description: Type of animation (fade-up, slide-left, scale-in)
    required: true
  - name: trigger_point
    type: string
    description: ScrollTrigger start point (e.g., 'top 80%')
    default: 'top 85%'
context:
  - js/portfolio-animations.js
tools:
  - read_files
  - str_replace
validation:
  - Animation plays once on scroll
  - No duplicate ScrollTrigger instances
  - Works with Unpoly navigation
```

**Usage prompt:**
```
Using the add-scroll-animation prompt, add a scale-in animation to all 
portfolio__badge elements with a stagger of 0.05 and trigger at top 85%.
```

### 4. Feature Requirement Prompts

Used to implement new features from natural-language requirements.

#### Example: Add New Component

```yaml
# .ceptor/prompts/add-component.yaml
name: add-component
description: Add a new reusable include component
arguments:
  - name: component_name
    type: string
    description: Name for the new component include
    required: true
  - name: requirements
    type: string
    description: Description of the component's purpose and behavior
    required: true
  - name: insert_location
    type: string
    description: Which page/section to add the component to
    required: false
context:
  - _includes/          # All existing components for reference
  - css/site-theme/garden.css
tools:
  - read_files
  - write_file          # Create new include
  - str_replace         # Add include to page
  - npm run css:build   # Rebuild if CSS changes
validation:
  - Component renders correctly
  - Responsive at all breakpoints
  - Follows existing patterns
```

**Usage prompt:**
```
Using the add-component prompt, create a testimonial carousel component 
that displays 3 quotes at a time with auto-rotation every 5 seconds. 
Style it with the existing card pattern and add it to the bottom of 
the hero section on the homepage.
```

### 5. Batch Polish Prompts

Used for bulk design refinement passes across the entire site.

#### Example: Design Polish Pass

```yaml
# .ceptor/prompts/design-polish.yaml
name: design-polish
description: Apply a batch of visual refinements across the site
arguments:
  - name: polish_instructions
    type: string
    description: Visual refinements to apply site-wide
    required: true
context:
  - css/site-theme/garden.css
  - _includes/**
  - _layouts/**
  - js/portfolio-animations.js
tools:
  - read_files
  - str_replace
  - write_file
  - npm run css:build
validation:
  - No visual regressions
  - Consistent spacing and alignment
  - All pages render correctly
```

**Usage prompt:**
```
Using the design-polish prompt:
- Add 2px border to all portfolio__social-tile elements with 12px radius
- Increase hero title letter-spacing to -0.01em
- Add a subtle box-shadow transition on portfolio__badge hover
- Reduce the essay card border-radius to 1rem
- Make the navbar-brand bold on scroll
```

## Reusable Prompt Templates

The following prompt templates are ready for use with any MCP-compatible AI agent (Claude, Cursor, etc.):

### Template: Edit a Component

```
I want to modify the [component-name] component in this portfolio.
Current behavior: [describe what it does now]
Desired behavior: [describe what it should do]
Design constraints: [colors, spacing, responsive rules to follow]
Files to consider: [list relevant files]
```

### Template: Add a Feature

```
Add a [feature-name] to the portfolio site.
Requirements:
- [requirement 1]
- [requirement 2]
- [requirement 3]
Design system: Use the existing Midnight Orchid Garden theme tokens
Responsive: Must work on mobile, tablet, and desktop
Integration: Should work with Unpoly AJAX navigation and GSAP animations
```

### Template: Design Audit

```
Audit the [section-name] section for design consistency.
Check:
1. Spacing matches the 4px/8px/16px/24px/32px scale
2. Colors reference CSS variables, not hardcoded values
3. Hover states exist for all interactive elements
4. Motion respects prefers-reduced-motion
5. Print styles are defined
Report any violations and suggest fixes.
```

## MCP Server Setup (Proposed Configuration)

To use these prompts with the portfolio, you would set up an MCP server that exposes a prompts directory. The following is a proposed configuration:

```json
{
  "mcpServers": {
    "ceptor-ai": {
      "command": "python",
      "args": ["-m", "ceptor_ai.mcp_server"],
      "env": {
        "PROJECT_ROOT": "/path/to/mammhoud.github.io"
      }
    }
  }
}
```

> **Note:** The `.ceptor/` prompt directory and the MCP server configuration above are forward-looking proposals. They represent a recommended setup pattern and would need to be implemented before use.

Once configured, the MCP server would make the prompt templates available to any MCP client (Claude Desktop, VS Code with Cline, etc.).

## References

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/) — Official MCP specification
- [MCP Prompts Guide](https://modelcontextprotocol.info/docs/concepts/prompts/) — Prompt template patterns
- [Ceptor AI Repository](https://github.com/mammhoud/ceptor-ai) — MCP server implementation for design
- [Custom-Portfolio CSS Theme](https://github.com/mammhoud/mammhoud.github.io/blob/main/css/site-theme/garden.css) — Design tokens reference
