# Architectural Decisions & Conventions

## 1. State Management

**Decision:** Use a **git-like pattern (stash/commit)** over Zustand.

**Why:** We need reversible editing, "discard changes", and persistence only of the committed state.

**Rules:**
- All stores MUST use `createGitLikeZustandStoreFactory` from `.ia_context/_TECH_REFERENCE/factories/`
- NEVER expose Zustand stores directly to UI components
- ALWAYS use adapter hooks created with `createGitLikeHookAdapterFactory`
- Use selector hooks from `createGitLikeHookSelectorFactory` for fine-grained subscriptions

---

## 2. UI Components

**Decision:** Currently **MUI 7.3.4** because the project already has it.

**Future:** Migrate to **Tailwind + shadcn/ui** to avoid vendor lock-in.

**Why:** MUI gives us speed now; Tailwind gives us control later.

**Rules:**
- Keep presentational components **"dumb"**: they should NOT import stores directly
- All MUI components go in `ui-atoms/` or `ui-molecules/`
- Use `'use client'` directive for all client-side React components
- Intelligent wrappers (state + validation) go in `ui-controls-core/` and `ui-controls-mui/`

---

## 3. Database

**Decision:** **MongoDB** for forms and datasets.

**Why:** We store JSON as-is from the builder.

**Rules:**
- Form schemas are stored as JSON documents
- Dataset definitions are stored as JSON documents
- No ORMs; use native MongoDB driver or Mongoose with minimal schemas

---

## 4. Monorepo

**Decision:** **Nx**.

**Why:** We will have multiple apps (web, admin, provider, IDE) and many shared libs.

**Rules:**
- All apps go in `apps/`
- All shared libs go in `libs/`
- Use `nx.json` for task orchestration
- Use `project.json` in each lib/app for project-specific configuration

---

## 5. AI Agent Context

**Decision:** Keep the `.ia_context/` folder as the **source of truth** for AI agents.

**Why:** So ChatGPT / Claude read the same thing we do and we don't have to explain everything each time.

**Rules:**
- NEVER hardcode architectural patterns in comments; document them in `.ia_context/`
- Update `.ia_context/_OVERVIEW.md` when project vision changes
- Update `.ia_context/_CONTEXT/decisions.md` when adding new conventions
- Add new factories to `.ia_context/_TECH_REFERENCE/factories/` with full source code
- Add new architectural patterns to `.ia_context/_TECH_REFERENCE/architecture/`

---

## 6. Library Naming & Organization

**Decision:** Maintain the **`ui-*`, `core-*`, `hooks-*`** pattern.

**Why:** Separates presentation from logic and integration.

**Rules:**

| Lib Prefix          | Purpose                                                | Examples                                |
| ------------------- | ------------------------------------------------------ | --------------------------------------- |
| `core/`             | Base logic, types, ports (general)                     | `core/stores/`, `core/types/`           |
| `core-form/`        | Base logic for form builder/player                     | `core-form/schema/`, `core-form/state/` |
| `hooks/`            | Stable provider hooks (general ports)                  | `hooks/useAuth`, `hooks/useTheme`       |
| `hooks-form/`       | Stable provider hooks for forms                        | `hooks-form/useFormState`               |
| `theme/`            | Project theme configuration                            | `theme/theme.ts`                        |
| `ui-atoms/`         | Primitive presentational components (buttons, inputs)  | `ui-atoms/Button`, `ui-atoms/TextField` |
| `ui-molecules/`     | Composed components (multiple atoms)                   | `ui-molecules/ide/header/`              |
| `ui-cells/`         | Layout pieces (header, panels, sections)               | `ui-cells/ide/ide-header/`              |
| `ui-controls-core/` | Logical wrappers (state, validation, bindings)         | `ui-controls-core/TextField`            |
| `ui-controls-mui/`  | MUI-specific implementations of controls               | `ui-controls-mui/MUITextField`          |
| `ui-features/`      | Complete features (IDE shell, full panels, dashboards) | `ui-features/ide-shell/`                |

---

## 7. Testing

**Decision:** Use **Jest** + **React Testing Library**.

**Rules:**
- ALWAYS add `.spec.tsx` or `.spec.ts` next to the file being tested
- Test file naming: `ComponentName.spec.tsx` or `functionName.spec.ts`
- ALWAYS import React in test files: `import * as React from 'react'`
- Use `@testing-library/react` for component tests
- Use `@testing-library/jest-dom` for DOM matchers

---

## 8. TypeScript

**Decision:** Strict TypeScript with **`"strict": true`** in `tsconfig.json`.

**Rules:**
- NO `any` unless absolutely necessary (use `unknown` + type guards)
- Use `type` for shapes, `interface` for extensible contracts
- Export types/interfaces from `index.ts` in each lib
- Use generic type parameters for factories (`<T>`, `<T, P, E>`)

---

## 9. File Structure & Naming

**Rules:**
- **Component files**: PascalCase (e.g., `IDEHeader.tsx`)
- **Test files**: `ComponentName.spec.tsx` or `functionName.spec.ts`
- **Utility files**: camelCase (e.g., `schemaToState.ts`)
- **Index files**: Always use `index.ts` for exports
- **Directory names**: kebab-case (e.g., `ide-header-logo/`)

**Example structure:**
```
libs/ui-molecules/ide/header/ide-header-logo/
  ├── IDEHeaderLogo.tsx        ← Component
  ├── IDEHeaderLogo.spec.tsx   ← Tests
  └── index.ts                 ← Export
```

---

## 10. Form Fields & Validation

**Decision:** Use the **`CreateFormField`** factory for all intelligent form controls.

**Rules:**
- NEVER write validation logic directly in components
- Use `CreateFormField` from `.ia_context/_TECH_REFERENCE/factories/CreateFormField.factory.txt`
- Validation functions MUST be pure and synchronous: `(value, props, extra) => string | null`
- Use `validateWithDebounce: true` with minimum 500ms delay for text inputs
- Use `commitOnChange` for auto-commit on valid input
- Use `onChangeEffect` for side-effects (analytics, API calls)

---

## 11. Imports

**Rules:**
- Use **absolute imports** via `tsconfig.base.json` paths (e.g., `@ktn-studio/core-form`)
- NEVER use relative imports across libs (e.g., `../../other-lib/`)
- Use relative imports ONLY within the same lib
- Import React as: `import * as React from 'react'`

---

## 12. Git Workflow

**Rules:**
- Main branch: `main`
- Feature branches: `feat/feature-name`
- Bugfix branches: `fix/bug-name`
- NEVER commit directly to `main`
- Use conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`

---

## 13. Code Style

**Decision:** Use **Prettier** + **ESLint**.

**Rules:**
- Run `pnpm format` before committing
- Use single quotes for strings (enforced by Prettier)
- Use semicolons (enforced by Prettier)
- Max line length: 120 characters
- Use 2-space indentation

---

## 14. Documentation

**Rules:**
- Add JSDoc comments to all exported functions, types, and components
- Document **why**, not **what** (code should be self-explanatory)
- Keep architectural docs in `.ia_context/`, NOT in code comments
- Update `.ia_context/_CONTEXT/roadmap.md` when completing phases

---

## 15. AI Agent Guidelines

**What AI agents CAN do:**
- Generate new components following the patterns in `.ia_context/`
- Create tests for components
- Update `.ia_context/` documentation when patterns change
- Suggest refactoring to follow conventions
- Generate factories using templates from `.ia_context/_TECH_REFERENCE/factories/`

**What AI agents MUST NOT do:**
- Change core factory implementations without explicit approval
- Modify git-like pattern behavior
- Break the layered architecture (e.g., importing stores in UI components)
- Remove TypeScript strict mode or add `any` types without justification
- Commit code that doesn't pass tests or linting
