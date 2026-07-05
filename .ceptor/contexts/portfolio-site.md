# Portfolio Site: mammhoud.github.io

## Project Overview
Personal portfolio and technical publishing hub built with Jekyll, Tailwind CSS v4, GSAP animations, and Unpoly for smooth AJAX navigation.

## Build System
- **Static site generator**: Jekyll ~> 4.2 (Ruby)
- **CSS framework**: Tailwind CSS v4 via `@tailwindcss/cli`
- **CSS entry**: `css/main.css` → output: `css/main-theme/main.min.css`
- **Build**: `npm run css:build` (Tailwind), `make build` (Jekyll)
- **Deploy**: GitHub Actions (`make_deploy.yml`) on push to `github-page`

## Directory Structure
```
/
├── _config.yml                 # Site configuration (theme, baseurl, plugins)
├── _data/bio.json              # Personal data (name, bio, profiles, skills)
├── _includes/                  # Reusable Jekyll include components
│   ├── about/about.html        # Hero section with avatar, bio, social links
│   ├── about/social.html       # Single social link tile
│   ├── essays/essays.html      # Essays section with card grid
│   ├── essays/essay-card.html  # Single essay card
│   ├── projects/projects.html  # Projects section
│   ├── projects/project-card.html  # Single project card with image
│   ├── contact/contact-form.html   # Formspree contact form
│   ├── header.html             # Sticky navbar with nav links
│   ├── footer.html             # Footer with attribution link
│   └── resume/date-range.html  # DRY date formatting utility
├── _layouts/                   # Jekyll page templates
│   ├── default.html            # Base layout (head, scripts, body shell)
│   ├── home.html               # Header + content + footer
│   ├── essay.html              # Single essay page (+ reading progress bar)
│   ├── project.html            # Single project page
│   └── missingpage.html        # 404 page
├── css/
│   ├── main.css                # Tailwind CSS entry point
│   ├── main-theme/main.min.css # Built Tailwind output
│   └── site-theme/
│       └── custom-portfolio.css # Custom theme (Midnight Orchid Garden)
├── js/
│   └── portfolio-animations.js # GSAP + ScrollTrigger animations
├── essays/                     # Essay markdown collection
├── projects/                   # Project markdown collection
└── index.html                  # Homepage (hero → projects → essays → contact)
```

## Layout Chain
```
default.html (base: head, body, scripts)
  └── home.html (header + {{ content }} + footer)
       ├── index.html (about, projects, essays, contact)
       ├── resume.html
       ├── essay.html (single essay)
       └── project.html (single project)
```

## Key Dependencies (CDN)
- **Tailwind CSS v4** — via CLI build
- **GSAP 3.12** — `cdn.jsdelivr.net/npm/gsap@3.12.7` (with ScrollTrigger)
- **Unpoly 3.10** — `unpkg.com/unpoly@3.10.0` (AJAX navigation)
- **Highlight.js 11** — Code syntax highlighting
- **Formspree** — Contact form backend (form ID placeholder)

## Navigation
- Sticky navbar with `up-target="#content"` for Unpoly AJAX loading
- Pages: Home (/), Resume (/resume.html), Essays (/essays/), Projects (/projects/)
- Mobile: hamburger toggle with collapse/expand behavior
- Internal anchors: /#projects, /#essays, /#contact

## Design System
See `.ceptor/tokens/design-system.json` for complete token values.
- **Theme**: Midnight Orchid Garden (dark, botanical)
- **Primary gradient**: midnight-orchid → #355c3c → amethyst-glow
- **Accent**: sage (#d8efbf), moss (#b7d77a)
- **Text**: #fbf8ee on dark backgrounds
- **Navbar**: Light gradient (dew/sage), sticky, shrinks on scroll

## CSS Conventions
- BEM-like naming: `.portfolio__component--variant`
- CSS variables via `:root` for all theme colors
- `color-mix(in oklab, ...)` for derived colors
- Responsive breakpoints: 768px (md)

## Architecture Decisions
- No Bootstrap (migrated to pure Tailwind v4)
- No jQuery (vanilla JS + GSAP)
- Unpoly for SPA-like navigation without a framework
- GSAP for scroll-triggered entrance animations
- All theme colors use CSS custom properties (not hardcoded)
