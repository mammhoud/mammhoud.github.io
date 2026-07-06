---
layout: post
type: post
title: "Ceptor AI: Design Enhancement Through MCP Agents and Structured Prompts"
date: 2026-07-05
published: true
labels:
  - AI
  - Design
  - MCP
  - Prompts
  - Automation
---

## Overview

Ceptor AI is an integration layer that connects structured prompt engineering with visual design systems. It uses the **Model Context Protocol (MCP)** — an open standard for AI-tool communication — to turn natural-language prompts into actionable design customizations for web templates, component libraries, and project features.

For this portfolio site, Ceptor AI enables:

- **Template-level customizations** — Modify layout, spacing, colors, and typography via descriptive prompts
- **Component variations** — Generate card, button, badge, and section variants from minimal input
- **Design system enforcement** — Apply consistent theme tokens (Midnight Orchid Garden palette) across all pages
- **Feature prompts** — Add new sections or interactions (animations, navigation behaviors, responsive layouts) through structured requirements

## How Ceptor AI Works with This Project

### Architecture

```
[Your Prompt] → Ceptor AI MCP Server → [Template Analysis] → [CSS/HTML Generation] → [Portfolio Site]
                        ↕
              [Design System Tokens]
              (colors, spacing, fonts)
```

Ceptor AI reads the existing design tokens from `garden.css` and `_config.yml`, then generates targeted edits through MCP-managed tool calls.

### MCP Agent Integration

The **Model Context Protocol** allows Ceptor AI to expose design tools as MCP **resources** (readable data about the current design) and **tools** (actions that modify templates or stylesheets). Key MCP primitives used:

| MCP Primitive | Ceptor AI Usage |
|---|---|
| **Resources** | Current CSS variables, color tokens, layout templates (read-only design state) |
| **Tools** | `update-color-scheme`, `modify-component`, `add-animation`, `adjust-spacing`, `generate-variant` |
| **Prompts** | Reusable template strings for common design operations |

## Design Customization Prompts

### 1. Theme Color Customization

```prompt
@ceptor-ai Update the color scheme to use warmer tones. Replace the 
amethyst background (#5c3b91) with a deep burgundy (#6b2d3d) and shift 
the accent green from sage (#d8efbf) to a golden olive (#c4a35a). Keep 
all other tokens unchanged.
```

**What happens:** Ceptor AI reads the current `:root` variables in `garden.css`, identifies the target tokens (`--theme-amethyst-glow`, `--theme-sage`), and regenerates all derived `color-mix()` values.

### 2. Component Variant Generation

```prompt
@ceptor-ai Generate a variant of the portfolio__card component that is 
more compact — smaller padding (p-4 instead of p-6), reduced border-radius 
(0.75rem), and a lighter background with 10% more transparency. Name it 
portfolio__card--compact.
```

**What happens:** Ceptor AI creates a new CSS class with the specified modifications, preserving the existing hover and pseudo-element effects.

### 3. Animation Addition

```prompt
@ceptor-ai Add a subtle shimmer effect to the portfolio__hero-title that 
activates on hover. The shimmer should be a gradient sweep from left to 
right over 1.5 seconds, using the existing lavender-mist color.
```

**What happens:** Ceptor AI generates both the CSS `@keyframes` and the hover selector, injecting them into `garden.css` after the hero title rules.

### 4. Template Layout Modification

```prompt
@ceptor-ai Modify the post card grid on the homepage to use a masonry 
layout instead of the current flex-wrap. Cards should be 300px minimum 
width with 1.5rem gaps, and the section eyebrow + title should be 
center-aligned above the grid.
```

**What happens:** Ceptor AI updates `_includes/blog/blog.html` and `_includes/blog/blog-card.html` to replace `flex flex-wrap gap-3` with CSS columns or grid, and adds `text-center` to the title wrapper.

## Feature Prompts with MCP Agents

Beyond visual design, Ceptor AI can implement new features through structured prompt requirements:

### Add a Dark Mode Toggle

```prompt
@ceptor-ai Add a dark mode toggle to the portfolio navbar. Requirements:
- A sun/moon icon button in the navbar next to the Download CV button
- Toggle switches CSS variables between light and dark palettes
- Persist preference in localStorage
- Smooth transition (0.3s) on all color properties
- Respect system preference via prefers-color-scheme on first load
```

**MCP Agent Workflow:**
1. Read current navbar structure (`_includes/header.html`)
2. Generate CSS dark theme variables based on existing palette
3. Add toggle button HTML with SVG icons
4. Create JS for toggle logic + localStorage persistence
5. Add CSS transition rule on `:root` variables
6. Verify all pages have the update via Unpoly re-render

### Add a Reading Progress Bar

```prompt
@ceptor-ai Add a reading progress bar to post pages. Requirements:
- A thin (3px) gradient bar fixed at the very top of the viewport
- Uses the accent sage-to-moss gradient colors
- Width tracks scroll progress through the article
- Only visible on pages with layout: post
- Smooth animation (transform, not width) for performance
```

## Prompt Library Structure (Proposed)

Ceptor AI prompts can be organized into reusable **MCP Prompt Templates**. The following structure is a proposed layout for storing and managing these prompts:

```
.ceptor/
├── prompts/
│   ├── theme-customization.md        # Color scheme changes
│   ├── component-variant.md          # New CSS class variants
│   ├── animation-add.md              # GSAP/CSS animation additions
│   ├── layout-modification.md        # Template structure changes  
│   ├── feature-requirement.md        # New features from specs
│   └── design-polish.md              # Visual refinement pass
├── tokens/
│   └── design-system.json            # Current theme token values
└── contexts/
    └── portfolio-site.md             # Site structure reference
```

> **Note:** The `.ceptor/` directory structure above is a forward-looking proposal and does not yet exist in the repository. It represents a recommended organization pattern for MCP prompt templates.

Each template includes:
- **Parameters** — Input variables (colors, sizes, selectors)
- **Context** — Which files to read before generating
- **Constraints** — Design system rules to respect
- **Validation** — How to verify the output matches expectations

## Invocation Methods

To use Ceptor AI with this portfolio, you can invoke it through any MCP-compatible client:

1. **Claude Desktop (MCP client)** — Configure the `ceptor-ai` repository as an MCP server in your `claude_desktop_config.json`. Once connected, prompts like `@ceptor-ai Update the hero section colors` work directly in chat.
2. **VS Code + Cline extension** — Add the Ceptor AI MCP server to `.vscode/mcp.json`. Type prompts in the Cline panel to generate file edits.
3. **Custom MCP client** — Use the MCP SDK to build a client that connects to the Ceptor AI server and sends prompts programmatically.

Example MCP server config for Claude Desktop:

```json
{
  "mcpServers": {
    "ceptor-ai": {
      "command": "python",
      "args": ["-m", "ceptor_ai.mcp_server"]
    }
  }
}
```

The `@ceptor-ai` handle used in examples throughout this guide is a convention for addressing the MCP server from compatible AI clients.

## Integration with This Portfolio

The `ceptor-ai` repository is available at [github.com/mammhoud/ceptor-ai](https://github.com/mammhoud/ceptor-ai) and can be used alongside this portfolio to:

1. **Rapidly prototype design changes** — Describe what you want in natural language, get instant CSS/HTML edits
2. **Generate consistent variants** — Create multiple component variations from a single prompt
3. **Maintain design system coherence** — All generated code respects the existing Midnight Orchid Garden theme
4. **Automate repetitive polish** — Batch-apply spacing adjustments, color refinements, or animation additions

## References

- [Ceptor AI Repository](https://github.com/mammhoud/ceptor-ai) — Official MCP server implementation
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/) — MCP standard specification
- [MCP Prompts Concepts](https://modelcontextprotocol.info/docs/concepts/prompts/) — Prompt templates for MCP agents
- [Portfolio Color System](https://github.com/mammhoud/mammhoud.github.io/blob/main/css/site-theme/garden.css) — Midnight Orchid Garden design tokens
