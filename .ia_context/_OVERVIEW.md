# Katana Studio — Project Overview

## What is Katana Studio?

**Katana Studio** is a **visual IDE for building intelligent forms** (think Visual Studio for forms). It allows developers to design forms visually, serialize them as **JSON**, store them in **MongoDB**, and execute them in a runtime **player** on any frontend. The core architecture separates **logic from presentation** using a **git-like state pattern (stash/commit)**, supports **declarative datasets** (for combos, autocompletes, and cascading dependencies like country → state → district), and is designed for **AI integration**: agents can read the `.ia_context/` folder to understand the architecture and generate forms, rules, and schemas automatically.

**Tech stack**: Nx monorepo, Next.js 15+, React 19, Zustand (with custom git-like pattern), MUI 7.3.4 (migrating to Tailwind + shadcn/ui), MongoDB. The project follows strict **layered architecture** with separate libs for core logic (`core/`, `core-form/`), hooks (`hooks/`, `hooks-form/`), and UI components (`ui-atoms/`, `ui-molecules/`, `ui-cells/`, `ui-controls-*/`, `ui-features/`).

---

## Architecture Layers

```text
apps/
  ktn-studio/          ← main Nx + Next.js app (the IDE)

libs/
  core/                ← base logic, types, ports
  core-form/           ← form builder/player logic (validation, datasets, rules)
  hooks/               ← stable providers and hooks (ports)
  hooks-form/          ← stable form-specific hooks
  theme/               ← project theme
  ui-atoms/            ← primitive components (MUI, presentational)
  ui-molecules/        ← more composed components
  ui-cells/            ← layout pieces (header, left panel, etc.)
  ui-controls-core/    ← logical wrappers (state, validation, bindings)
  ui-controls-mui/     ← concrete implementation with MUI
  ui-features/         ← large features (IDE, panels, menus)
```

---

## Git-Like Pattern

We use a **stash / commit** store pattern:

- `stashData` = what the user is currently editing (volatile)
- `commitData` = what is saved/persisted

This allows us to:

- edit without breaking what's saved,
- implement "discard changes",
- and let intelligent components **auto-commit** when they're valid.

See: [`./_TECH_REFERENCE/architecture/git-like-pattern.md`](./_TECH_REFERENCE/architecture/git-like-pattern.md)

---

## Form Builder Core

- **CreateFormField**: factory to create intelligent fields from a "dumb" MUI component.
- **Datasets**: declarative sources (static, remote, derived).
- **Bindings**: a field can declare "my data comes from dataset X".
- **Intelligent wrappers**: handle validation, touched, focus, enable/disable, visibility, and commit.

See:

- [`./_TECH_REFERENCE/architecture/form-field-architecture.md`](./_TECH_REFERENCE/architecture/form-field-architecture.md)
- [`./_TECH_REFERENCE/architecture/hooks-system.md`](./_TECH_REFERENCE/architecture/hooks-system.md)

---

## AI Integration (future)

- Agent with rules (tool manual).
- Can read `.context/` to understand the project.
- Can generate `form.schema.json` and `datasets.schema.json`.

---

## Document Map

| File                                                      | Purpose                                                |
| --------------------------------------------------------- | ------------------------------------------------------ |
| `_TECH_REFERENCE/factories/*.txt`                         | Source code for factories (stores, hooks, fields)      |
| `_TECH_REFERENCE/architecture/git-like-pattern.md`        | Explains stash/commit and why we use it                |
| `_TECH_REFERENCE/architecture/form-field-architecture.md` | How intelligent fields work                            |
| `_TECH_REFERENCE/architecture/hooks-system.md`            | How hooks connect to stores                            |
| `_CONTEXT/decisions.md`                                   | Architecture decisions (Nx, Mongo, MUI)                |
| `_CONTEXT/env-setup.md`                                   | How to run the project (Docker, Nx)                    |
| `_CONTEXT/roadmap.md`                                     | Project phases                                         |
