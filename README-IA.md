# Katana Studio — AI Agent Guide

> **This document is the entry point for AI agents (ChatGPT, Claude, Copilot, etc.) working on Katana Studio.**

---

## Quick Start for AI Agents

When starting work on Katana Studio, **ALWAYS** load the project context first:

1. Read this file (`README-IA.md`)
2. Read `.ia_context/_OVERVIEW.md` (project vision, tech stack)
3. Read `.ia_context/_CONTEXT/decisions.md` (architectural rules & conventions)
4. Read `.ia_context/_CONTEXT/directory.txt` (project structure)
5. Read all files in `.ia_context/_TECH_REFERENCE/` (factories & architecture patterns)

---

## 📂 Key Documentation Files

| File                                                                       | Purpose                                           |
| -------------------------------------------------------------------------- | ------------------------------------------------- |
| [`.ia_context/_OVERVIEW.md`](.ia_context/_OVERVIEW.md)                     | Project vision, what Katana Studio is, tech stack |
| [`.ia_context/_CONTEXT/decisions.md`](.ia_context/_CONTEXT/decisions.md)   | **Architectural rules & conventions (MUST READ)** |
| [`.ia_context/_CONTEXT/directory.txt`](.ia_context/_CONTEXT/directory.txt) | Project structure (libs, apps, organization)      |
| [`.ia_context/_CONTEXT/env-setup.md`](.ia_context/_CONTEXT/env-setup.md)   | Development environment setup                     |
| [`.ia_context/_CONTEXT/roadmap.md`](.ia_context/_CONTEXT/roadmap.md)       | Project phases & roadmap                          |

---

## 🏗️ Architecture Reference

### Patterns

| Pattern                               | Documentation                                                                                                                                |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Git-like State (Stash/Commit)**     | [`.ia_context/_TECH_REFERENCE/architecture/git-like-pattern.md`](.ia_context/_TECH_REFERENCE/architecture/git-like-pattern.md)               |
| **Intelligent Form Fields**           | [`.ia_context/_TECH_REFERENCE/architecture/form-field-architecture.md`](.ia_context/_TECH_REFERENCE/architecture/form-field-architecture.md) |
| **Hooks System (Adapters/Selectors)** | [`.ia_context/_TECH_REFERENCE/architecture/hooks-system.md`](.ia_context/_TECH_REFERENCE/architecture/hooks-system.md)                       |

### Factories (Source Code)

| Factory            | Purpose                                                      | File                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Git-like Store** | Core Zustand store with stash/commit pattern                 | [`.ia_context/_TECH_REFERENCE/factories/createGitLikeZustandStore.factory.txt`](.ia_context/_TECH_REFERENCE/factories/createGitLikeZustandStore.factory.txt) |
| **Hook Adapter**   | Wraps stores into stable React hooks (ports)                 | [`.ia_context/_TECH_REFERENCE/factories/createGitLikeHookAdapter.factory.txt`](.ia_context/_TECH_REFERENCE/factories/createGitLikeHookAdapter.factory.txt)   |
| **Hook Selector**  | Fine-grained selector hooks for stores                       | [`.ia_context/_TECH_REFERENCE/factories/createGitLikeHookSelector.factory.txt`](.ia_context/_TECH_REFERENCE/factories/createGitLikeHookSelector.factory.txt) |
| **Form Field**     | Intelligent form field wrapper with validation & auto-commit | [`.ia_context/_TECH_REFERENCE/factories/CreateFormField.factory.txt`](.ia_context/_TECH_REFERENCE/factories/CreateFormField.factory.txt)                     |

---

## ✅ What AI Agents CAN Do

- **Generate components** following the patterns in `.ia_context/`
- **Create tests** for components using Jest + React Testing Library
- **Update documentation** in `.ia_context/` when patterns change
- **Suggest refactoring** to follow conventions
- **Generate new factories** using templates from `.ia_context/_TECH_REFERENCE/factories/`
- **Fix bugs** and add features respecting the layered architecture
- **Write JSDoc comments** for exported functions, types, and components

---

## ❌ What AI Agents MUST NOT Do

- **Change core factory implementations** without explicit approval from a human
- **Modify git-like pattern behavior** (stash/commit semantics)
- **Break the layered architecture** (e.g., importing stores directly in UI components)
- **Remove TypeScript strict mode** or add `any` types without strong justification
- **Commit code** that doesn't pass tests or linting
- **Create documentation files** (like README.md) without being asked
- **Use relative imports** across different libs (use absolute imports via `tsconfig.base.json` paths)

---

## 📋 Contribution Rules for AI Agents

### 1. **ALWAYS Follow Conventions**

Read [`.ia_context/_CONTEXT/decisions.md`](.ia_context/_CONTEXT/decisions.md) for complete rules on:

- State management (git-like pattern)
- UI components (dumb components + intelligent wrappers)
- Library naming (`ui-*`, `core-*`, `hooks-*`)
- File structure & naming (PascalCase, kebab-case, etc.)
- Testing (Jest + React Testing Library)
- TypeScript (strict mode, no `any`)
- Imports (absolute paths, `import * as React from 'react'`)
- Git workflow (conventional commits)

### 2. **State Management Rules**

- **ALWAYS use** `createGitLikeZustandStoreFactory` for all stores
- **NEVER expose** Zustand stores directly to UI components
- **ALWAYS use** adapter hooks (`createGitLikeHookAdapterFactory`)
- **Use** selector hooks (`createGitLikeHookSelectorFactory`) for fine-grained subscriptions

### 3. **Form Field Rules**

- **NEVER write validation logic** directly in components
- **ALWAYS use** `CreateFormField` factory for intelligent form controls
- Validation functions **MUST be pure and synchronous**: `(value, props, extra) => string | null`
- Use `validateWithDebounce: true` with minimum 500ms delay for text inputs

### 4. **Component Rules**

- Keep presentational components **"dumb"** (no store imports)
- Use `'use client'` directive for all client-side React components
- **ALWAYS import React**: `import * as React from 'react'`
- Add `.spec.tsx` test file next to every component

### 5. **File Naming**

- Component files: **PascalCase** (e.g., `IDEHeader.tsx`)
- Test files: `ComponentName.spec.tsx` or `functionName.spec.ts`
- Utility files: **camelCase** (e.g., `schemaToState.ts`)
- Directory names: **kebab-case** (e.g., `ide-header-logo/`)

### 6. **Library Organization**

| Lib Prefix          | Purpose                       | Examples                       |
| ------------------- | ----------------------------- | ------------------------------ |
| `core/`             | Base logic, types, ports      | `core/stores/`                 |
| `core-form/`        | Form builder/player logic     | `core-form/schema/`            |
| `hooks/`            | Stable provider hooks (ports) | `hooks/useAuth`                |
| `hooks-form/`       | Form-specific hooks           | `hooks-form/useFormState`      |
| `ui-atoms/`         | Primitive components          | `ui-atoms/Button`              |
| `ui-molecules/`     | Composed components           | `ui-molecules/ide/header/`     |
| `ui-cells/`         | Layout pieces                 | `ui-cells/ide/ide-header/`     |
| `ui-controls-core/` | Logical wrappers              | `ui-controls-core/TextField`   |
| `ui-controls-mui/`  | MUI implementations           | `ui-controls-mui/MUITextField` |
| `ui-features/`      | Complete features             | `ui-features/ide-shell/`       |

---

## 🔄 Reindexing Context

If you're told to **"reindex context"** or **"reload context"**, follow these steps:

1. Re-read `.ia_context/_OVERVIEW.md`
2. Re-read `.ia_context/_CONTEXT/decisions.md`
3. Re-read `.ia_context/_CONTEXT/directory.txt`
4. Re-read all files in `.ia_context/_TECH_REFERENCE/architecture/`
5. Re-read all files in `.ia_context/_TECH_REFERENCE/factories/`
6. Confirm that context has been refreshed successfully

---

## 🧪 Testing Guidelines

- **ALWAYS add tests** for new components and functions
- Test file naming: `ComponentName.spec.tsx` or `functionName.spec.ts`
- **Import React in tests**: `import * as React from 'react'`
- Use `@testing-library/react` for component tests
- Use `@testing-library/jest-dom` for DOM matchers
- Run tests with: `npx jest path/to/file.spec.tsx`

---

## 🚀 Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm jest

# Run linting
pnpm lint:fix

# Format code
pnpm format:fix

# Build project
pnpm build
```

---

## 📖 Additional Context Files

- **`manifest.json`**: Structured metadata about `.ia_context/` files
- **`manifest.schema.json`**: JSON schema for the manifest
- **`project-structure.txt`**: Full directory tree (auto-generated by `tools/print-tree.js`)
- **`prompts.txt`**: Example prompts for loading/reindexing context

---

## 🎯 Project Vision

**Katana Studio** is a **visual IDE for building intelligent forms** (think Visual Studio for forms). It allows developers to:

1. Design forms visually in an IDE
2. Serialize them as JSON
3. Store them in MongoDB
4. Execute them in a runtime player on any frontend

**Core principles:**

- Separate **logic from presentation**
- Use **git-like state pattern (stash/commit)** for reversible editing
- Support **declarative datasets** (combos, autocompletes, cascading dependencies)
- Enable **AI integration**: agents can read `.ia_context/` to generate forms and rules

---

## 📞 Support

- For questions about architecture, check `.ia_context/_CONTEXT/decisions.md`
- For implementation details, check `.ia_context/_TECH_REFERENCE/`
- For project structure, check `.ia_context/_CONTEXT/directory.txt`
- For roadmap, check `.ia_context/_CONTEXT/roadmap.md`

---

**Last updated:** 2025-11-03

**Context version:** 1.0.0
