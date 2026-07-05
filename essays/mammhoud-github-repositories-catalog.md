---
layout: essay
type: essay
title: "GitHub Repository Catalog for mammhoud: Projects, Forks, and Use Cases"
date: 2026-05-13
published: true
labels:
  - GitHub
  - Open Source
  - Portfolio
  - Documentation
---

This article catalogs the public repositories listed on **https://github.com/mammhoud?tab=repositories** and explains practical use cases for each one.

## Core Products and Active Build Repos

1. **mammhoud.github.io** — Personal portfolio website and technical publishing hub.
2. **coffee-website** — Frontend presentation website for product/service showcase pages.
3. **mammhoud** — Personal profile/landing repository for branding and profile-level content.
4. **django-fusion** (formerly documented as **django-osoul**) — Pure Django foundation layer with models, managers, mixins, HTMX components, error-tracking middleware, and Clean Architecture enforcement. Not archived. [→ Repo](https://github.com/mammhoud/django-fusion)
5. **django-rseal** — Workflow and operation orchestration layer for Django business logic. **⚠️ Archived** — codebase is read-only for reference.
6. **django-grep** — Tooling-oriented Django utility package for productivity and development workflows. **⚠️ Archived** — codebase is read-only for reference.
7. **ceptor-ai** — AI integration layer for design enhancement via prompt-based MCP agents. Generates template customizations, component variations, and design polish through structured AI prompts. Not archived. [→ Repo](https://github.com/mammhoud/ceptor-ai)
8. **devstart-django** — Starter template for quickly bootstrapping Django projects.
9. **gui-web** — Python desktop/web hybrid GUI experimentation and implementation.
10. **NINJA-APIs-EX** — API-centric Django Ninja examples and backend implementation patterns (supersedes DJANGO-APIs).
11. **kivy_UI_Example** — Kivy UI prototypes and component experiments.
12. **bayut-website-scrap** *(archived)* — Real-estate scraping/data extraction and transformation utilities.
13. **ChatHack** *(archived)* — Chatbot and NLP experimentation for support/engagement use cases.
14. **Data-engineering** *(archived)* — Data engineering exercises, notebooks, and learning pipelines.
15. **SlackAppWithExcel** *(archived)* — Integration workflows between Slack automations and Excel-like data tasks.
16. **Rasa-Sample-ChatBot** *(archived)* — Arabic-capable Rasa chatbot sample implementation.

## Forked Repositories and Their Use Cases

17. **django-unfold** *(fork of `unfoldadmin/django-unfold`)* — Modern Django admin interface built with Tailwind CSS. The fork evaluates how Unfold's pre-compiled Tailwind classes can be extended without rebuilding the theme from source. **On Tailwind prefix customization:** Unfold does not expose a `tailwind_prefix` setting — its classes are pre-compiled using standard Tailwind utilities. Customization is done through the `UNFOLD['STYLES']` setting in `settings.py`, which injects custom CSS files that can use namespaced selectors (e.g., `.my-custom-admin .card`) to avoid collisions with project styles. The fork tests this approach for multi-tenant Django admin deployments where style isolation is required. Not archived.
18. **django-ninja** *(fork of `django-ninja/django-ninja`)* — Fast, async-ready, type-hints-based API framework for Django. Fork used to test OpenAPI schema generation and async view patterns. Not archived.
19. **public-apis** *(fork)* — Reference source for discovering and integrating free APIs.
20. **Ticketing-System-Django** *(archived fork)* — Learn ticketing architecture and issue workflow implementation.
21. **system-design-101** *(fork)* — Visual system-design study reference for architecture interviews.
22. **free-programming-books** *(fork)* — Developer learning reference and curated study resources.
23. **coding-interview-university** *(fork)* — Structured CS/interview preparation curriculum.

## Archived / Historical Repositories

24. **kivy-pos** *(archived)* — Historical POS prototype built with Kivy.
25. **Coursera-IBM-Skills-Network** *(archived)* — Course artifacts and educational exercises.

## Changes from Previous Catalog

- **crafts-ai** — Removed from catalog (no public repository found under this name).
- **AI-Foundation** — Removed from catalog (no public repository found; was previously a duplicate entry numbered 17).
- **django-erp-framework fork** — Removed (no longer appears in public repositories list).

## Repo Naming Clarifications

- **django-fusion ↔ django-osoul**: The repository was originally named `django-osoul` in documentation but the GitHub project exists as `django-fusion`. Both names refer to the same codebase: a foundation layer for clean Django apps.
- **django-rseal & django-grep**: Both are archived. The code remains available for reference but no active development is planned.

## Portfolio Use Strategy

- Use **core product repos** for production-facing showcases.
- Use **forks** for learning, benchmarking, and upstream extension experiments.
- Use **archived repos** as project history and technical progression evidence.

> Source snapshot date: **May 13, 2026** from the GitHub repositories tab for `mammhoud`.
