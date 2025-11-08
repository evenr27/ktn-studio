# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **📖 Documentation structure:**
> - **CLAUDE.md** (this file): Quick reference for commands, rules, and common patterns. Read this first.
> - **`.ia_context/`**: Deep architectural documentation. Read when you need to understand "why" or implement complex features.

## Overview

**Katana Studio (KTN)** is a visual IDE for building intelligent forms, inspired by Visual Studio .NET. It features:
- Drag-and-drop form builder with JSON schema serialization
- Custom git-like state management (`ktn-store`) with stash/commit pattern
- UI-agnostic form player (supports MUI or Tailwind rendering)
- Declarative datasets and data adapters for dynamic form fields
- MongoDB persistence for form projects
- Nx monorepo with Next.js 15 + React 19

**Key architectural principle:** Separation of logic from presentation using Clean Architecture with Ports & Adapters pattern.

---

## Development Commands

### Running the application
```bash
pnpm dev:studio          # Run main IDE application (ktn-studio)
pnpm dev:examples        # Run examples application
```

### Building
```bash
nx build ktn-studio      # Build main app
pnpm build               # Build main app (alias)
```

### Testing
```bash
pnpm test                # Run all tests
pnpm test:watch          # Run tests in watch mode
nx test <lib-name>       # Run tests for specific library
npx jest <path-to-file>  # Run single test file
```

### Linting and Formatting
```bash
pnpm lint:check          # Check all projects for lint errors
pnpm lint:fix            # Fix lint errors across all projects
pnpm format:check        # Check code formatting
pnpm format:fix          # Auto-format all files
```

### Context and Structure Tools
```bash
pnpm tree:project        # Generate .ia_context/project-structure.txt
pnpm read:context        # Read and merge AI context files
```

---

## Architecture

### Git-Like State Pattern

The core architecture uses a custom **stash/commit** pattern for state management:

- **`stashData`**: Working copy (what the user is currently editing, volatile)
- **`commitData`**: Committed state (what is saved/persisted)

**Core API:**
```typescript
stash(data)       // Update working copy
stashField(key, value)  // Update single field in working copy
commit(patch?)    // Promote stash to commit
discard()         // Revert stash to last commit
resetStash()      // Reset only the stash to defaults
resetRepo()       // Reset both stash and commit to defaults
getStash()        // Read stash outside React
getCommit()       // Read commit outside React
```

**Implementation layers:**
1. `BaseStore<T>` - Low-level reactive store with subscribe/notify
2. `GitLikeStore<T>` - Extends BaseStore with git-like semantics
3. `createKtnGitLikeStore(config)` - Factory with optional persistence (local/session storage)
4. `createKtnGitLikeHook(store)` - React adapter using `useSyncExternalStore`

**Location:** All implementation in `libs/ktn-store/`

### Library Organization

Libraries follow a strict naming convention:

| Prefix | Purpose | Examples |
|--------|---------|----------|
| `core/` | Base logic, types, ports (framework-agnostic) | `core/stores/`, `core/types/` |
| `core-form/` | Form builder/player business logic | `core-form/schema/`, `core-form/state/` |
| `ktn-store/` | Custom git-like state management library | `base-store/`, `git-like-store/`, `factories/` |
| `hooks/` | Stable provider hooks (general ports) | `hooks/useAuth`, `hooks/useTheme` |
| `hooks-form/` | Stable form-specific provider hooks | `hooks-form/useFormState` |
| `theme/` | Project theme configuration | MUI theme setup |
| `ui-atoms/` | Primitive individual components (decorative + form controls) | `Button`, `TextField`, `Icon` |
| `ui-molecules/` | Compound component parts (Root, Header, Body, etc.) | `ide/header/`, `ide/properties-panel/` |
| `ui-cells/` | Layout pieces | `ide/ide-header/` |
| `ui-controls-core/` | Logical wrappers (state, validation, bindings) | Field wrappers |
| `ui-controls-mui/` | MUI-specific control implementations | `MUITextField` |
| `ui-features/` | Complete features | `ide-shell/` |

**Import paths** are configured in `tsconfig.base.json`:
```typescript
import { createKtnGitLikeStore } from '@ktn-store'
import { FormSchema } from '@ktn/core-form'
import { Button } from '@ktn/ui-atoms'
```

### Clean Architecture (CORE Libraries)

**All CORE libraries MUST use classes with Ports & Adapters pattern:**

```typescript
// ✅ Port (interface)
export interface Persistence<T> {
  save(state: T): void
  load(): T | null
  clear(): void
}

// ✅ Adapter (concrete implementation)
export class LocalStoragePersistence<T> implements Persistence<T> {
  constructor(private key: string) {}
  // ... implementation
}

// ✅ Abstract class for extensibility
export abstract class BaseStore<T> {
  protected state: T
  abstract getState(): T
  abstract setState(updater: Partial<T> | ((prev: T) => T)): void
}

// ✅ Concrete class extends abstract
export class GitLikeStore<T> extends BaseStore<GitLikeState<T>> {
  // ... implementation
}
```

**Rules:**
- ✅ Use classes (NOT functional programming in CORE libs)
- ✅ Use abstract classes for contracts
- ✅ Use interfaces for ports
- ✅ Dependency Injection via constructor
- ✅ Every class has `.spec.ts` test file
- ❌ NO React hooks in CORE libraries
- ❌ NO framework dependencies in domain logic

### Compound Components Pattern

**KTN uses a layered composition pattern with individual exports:**

**Architecture layers:**
1. **ui-molecules**: Primitive building blocks (individual exports: Root, Header, Body, etc.)
2. **ui-cells**: Pre-composed components combining molecules
3. **ui-features**: Complete features using cells

**Naming convention (standard parts):**
- `{ComponentName}Root` - Container (REQUIRED for all compound components)
- `{ComponentName}Header` - Top section (RECOMMENDED - helps organize code)
- `{ComponentName}Body` - Main content area (RECOMMENDED - helps organize code)
- `{ComponentName}Footer` - Bottom section (OPTIONAL - use when needed for actions/status)

**Additional specialized parts:**
- `{ComponentName}Actions`, `{ComponentName}LeftPanel`, `{ComponentName}Center`, etc.

**Example - IDEPropertiesPanel:**

```typescript
// 📁 libs/ui-molecules/ide/properties-panel/
// Individual exports (molecules)
export { IDEPropertiesPanelRoot } from './ide-properties-panel-root'
export { IDEPropertiesPanelHeader } from './ide-properties-panel-header'
export { IDEPropertiesPanelBody } from './ide-properties-panel-body'

// 📁 libs/ui-cells/ide/properties-panel/
// Composed component (cell)
import {
  IDEPropertiesPanelRoot,
  IDEPropertiesPanelHeader,
  IDEPropertiesPanelBody,
} from '@ktn/ui-molecules'

export const IDEPropertiesPanel: React.FC<Props> = ({ title, children }) => (
  <IDEPropertiesPanelRoot>
    <IDEPropertiesPanelHeader title={title} />
    <IDEPropertiesPanelBody>{children}</IDEPropertiesPanelBody>
  </IDEPropertiesPanelRoot>
)

// Usage option 1: Use the cell (convenient)
<IDEPropertiesPanel title="Properties">
  <PropertyEditor />
</IDEPropertiesPanel>

// Usage option 2: Use molecules directly (flexible)
import { IDEPropertiesPanelRoot, IDEPropertiesPanelHeader } from '@ktn/ui-molecules'

<IDEPropertiesPanelRoot>
  <IDEPropertiesPanelHeader title="Custom" />
  {/* custom body */}
</IDEPropertiesPanelRoot>
```

**Benefits:**
- Flexibility: Use molecules directly for full control, or cells for convenience
- Clarity: Component structure is explicit in both JSX and imports
- Type safety: Full TypeScript support for all parts
- Testability: Each molecule has its own `.spec.tsx` file

**See:** `.ia_context/_TECH_REFERENCE/architecture/compound-components-pattern.md` for detailed documentation

### IDE Layout (Visual Studio-like)

```
┌─────────────────────────────────────────────────────────────┐
│  Header (menu bar, actions, toolbar)                        │
├──────────┬──────────────────────────────────┬───────────────┤
│  LEFT    │          CENTER                  │    RIGHT      │
│  PANEL   │         (Canvas)                 │    PANEL      │
│          │                                  │               │
│ Component│   Drag & Drop                    │  Properties   │
│ Palette  │   Form Builder                   │  of Selected  │
│          │                                  │  Component    │
└──────────┴──────────────────────────────────┴───────────────┘
```

---

## Critical Rules

### State Management
- ALWAYS use `createKtnGitLikeStore` from `@ktn-store`
- NEVER expose stores directly to UI components
- ALWAYS use adapter hooks created with `createKtnGitLikeHook`
- DO NOT use Zustand or other external state libraries

### Testing
- **MANDATORY**: Every component/class MUST have a `.spec.ts` or `.spec.tsx` file alongside it
- Test file naming: `ComponentName.spec.tsx` (same name as component)
- ALWAYS import React in test files: `import * as React from 'react'`
- Use `@testing-library/react` for component tests
- Use `@testing-library/jest-dom` for DOM matchers

**File structure example:**
```
libs/ui-molecules/ide/header/ide-header-logo/
  ├── IDEHeaderLogo.tsx        ← Component
  ├── IDEHeaderLogo.spec.tsx   ← Unit test (MANDATORY)
  └── index.ts                 ← Export
```

### Imports
- Use **absolute imports** via `tsconfig.base.json` paths (e.g., `@ktn/core-form`)
- NEVER use relative imports across libs (e.g., `../../other-lib/`)
- Use relative imports ONLY within the same lib
- Import React as: `import * as React from 'react'`

### TypeScript
- Strict TypeScript with `"strict": true`
- NO `any` unless absolutely necessary (use `unknown` + type guards)
- Use `type` for shapes, `interface` for extensible contracts
- Export types/interfaces from `index.ts` in each lib

### UI Components
- Use `'use client'` directive for all client-side React components
- Keep presentational components "dumb" (NO direct store imports)
- ALWAYS use Compound Component pattern
- ALWAYS create `.spec.tsx` file alongside component file
- Currently using MUI 7.3.4 (migrating to Tailwind + shadcn/ui later)

### File Naming
- Component files: PascalCase (e.g., `IDEHeader.tsx`)
- Test files: `ComponentName.spec.tsx`
- Utility files: camelCase (e.g., `schemaToState.ts`)
- Directory names: kebab-case (e.g., `ide-header-logo/`)
- Always use `index.ts` for exports

### Git Workflow
- Main branch: `main`
- Feature branches: `feat/feature-name`
- Bugfix branches: `fix/bug-name`
- NEVER commit directly to `main`
- Use conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`

---

## AI Context Files

The `.ia_context/` folder is the **source of truth** for AI agents and developers:

```
.ia_context/
  _OVERVIEW.md                              ← Complete project overview
  _CONTEXT/
    decisions.md                            ← Architectural decisions
    roadmap.md                              ← Development phases
    env-setup.md                            ← Environment setup
  _TECH_REFERENCE/
    architecture/
      git-like-pattern.md                   ← Stash/commit pattern
      form-field-architecture.md            ← Intelligent fields
      hooks-system.md                       ← Hooks system
      datasets-and-adapters.md              ← Data binding
      ide-layout.md                         ← IDE structure
      clean-architecture.md                 ← Clean Architecture
      mongodb-schema.md                     ← DB schema
    factories/
      createGitLikeZustandStore.factory.txt ← Store factory source
      createGitLikeHookAdapter.factory.txt  ← Hook adapter source
      CreateFormField.factory.txt           ← Form field factory
```

**When to update `.ia_context/`:**
- Project vision changes → update `_OVERVIEW.md`
- New conventions → update `_CONTEXT/decisions.md`
- New architectural patterns → add to `_TECH_REFERENCE/architecture/`
- New factories → add full source to `_TECH_REFERENCE/factories/`

---

## Form Builder Architecture

The IDE generates JSON schemas describing form structure, which are:
1. Designed visually in the IDE (drag-and-drop)
2. Serialized to JSON schema
3. Stored in MongoDB
4. Rendered by the runtime player using MUI or Tailwind components

**Key concepts:**
- **`CreateFormField`**: Factory to create intelligent fields from "dumb" UI components
- **Datasets**: Declarative data sources (static arrays, remote APIs, derived)
- **DataAdapters**: Transform/filter data for components with lists (Dropdown, Autocomplete, etc.)
- **Bindings**: Fields declare "my data comes from dataset X using adapter Y"
- **Intelligent wrappers**: Handle validation, touched state, focus, enable/disable, visibility, auto-commit

---

## Database (MongoDB)

MongoDB stores form projects with the following structure:

**Collections:**
- `projects/` - Project metadata (name, description, author, dates)
- `forms/` - Form schemas (components, layout, validations)
- `datasets/` - Data source definitions (static, remote, derived, cascading)
- `dataAdapters/` - Data transformation rules for components

All schemas are versioned for backward compatibility. Use soft deletes (`deletedAt` field).

---

## Common Patterns

### Creating a Store
```typescript
import { createKtnGitLikeStore } from '@ktn-store'

export const profileStore = createKtnGitLikeStore({
  storageKey: 'profile',
  initialData: {
    firstName: '',
    lastName: '',
  },
  persistence: 'local',
})
```

### Creating a Hook Adapter
```typescript
import { createKtnGitLikeHook } from '@ktn-store'
import { profileStore } from './profile-store'

export const useProfileStore = createKtnGitLikeHook(profileStore._store)

// Usage in component:
function ProfileName() {
  const firstName = useProfileStore((s) => s.stashData.firstName)
  return <span>{firstName}</span>
}
```

### Form Field Validation
- Validation functions MUST be pure and synchronous: `(value, props, extra) => string | null`
- Use `validateWithDebounce: true` with minimum 500ms delay for text inputs
- Use `commitOnChange` for auto-commit on valid input
- Use `onChangeEffect` for side-effects (analytics, API calls)

---

## Reference Documentation

For detailed information, always check:
- `.ia_context/_OVERVIEW.md` - Complete project overview
- `.ia_context/_CONTEXT/decisions.md` - All architectural decisions and conventions
- `.ia_context/_TECH_REFERENCE/` - Technical reference docs and factory source code
- `README.md` - Quick start and project introduction
