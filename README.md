# Katana Studio (KTN)

Visual IDE and form builder with a **Git-like state management system**, datasets, and AI integration.

---

## 🧠 Overview

Katana Studio (KTN) is a **visual IDE and form builder** built using Nx, Next.js, and a modular architecture.
The project includes a Git-like store (`ktn-store`), intelligent form field factories, dataset adapters, and an evolving AI-assisted builder.

---

## 🧩 Tech Stack

- **Framework:** Nx + Next.js (App Router)
- **Language:** TypeScript
- **UI Library:** MUI 7 (Tailwind + shadcn/ui planned for later KTN frontends)
- **State (core):** ktn-store (custom git-like store)
- **Database:** MongoDB + PostgreSQL (Dockerized)
- **Testing:** Jest + React Testing Library
- **Validation:** Zod 4
- **Data Fetching:** TanStack Query 5
- **Containerization:** Docker + Docker Compose
- **CI/CD:** GitHub Actions (planned)

---

## 📁 Project Structure

```text
.ia_context/           ← Project context and documentation for AI + developers
apps/                  ← Applications (frontend and IDE shell)
libs/                  ← Core, UI, and logic libraries
tools/                 ← Custom development scripts
docker/                ← Environment and service definitions
```

---

## 📘 Documentation

### For Developers

- [`OVERVIEW`](.ia_context/_OVERVIEW.md) – Complete project overview
- [`DECISIONS`](.ia_context/_CONTEXT/decisions.md) – Architectural decisions
- [`ROADMAP`](.ia_context/_CONTEXT/roadmap.md) – Development phases
- [`ENV_SETUP`](.ia_context/_CONTEXT/env-setup.md) – Environment setup guide

### Technical Reference

- [**Git-Like Pattern**](.ia_context/_TECH_REFERENCE/architecture/git-like-pattern.md)
- [**Form Field Architecture**](.ia_context/_TECH_REFERENCE/architecture/form-field-architecture.md)
- [**Hooks System**](.ia_context/_TECH_REFERENCE/architecture/hooks-system.md)

### Factory Source Code

- [.ia_context/\_TECH_REFERENCE/factories/createGitLikeZustandStore.factory.txt](.ia_context/_TECH_REFERENCE/factories/createGitLikeZustandStore.factory.txt)
- [.ia_context/\_TECH_REFERENCE/factories/createGitLikeHookAdapter.factory.txt](.ia_context/_TECH_REFERENCE/factories/createGitLikeHookAdapter.factory.txt)
- [.ia_context/\_TECH_REFERENCE/factories/createGitLikeHookSelector.factory.txt](.ia_context/_TECH_REFERENCE/factories/createGitLikeHookSelector.factory.txt)
- [.ia_context/\_TECH_REFERENCE/factories/CreateFormField.factory.txt](.ia_context/_TECH_REFERENCE/factories/CreateFormField.factory.txt)

---

## ⚙️ Key Features

✅ **Git-like Store Factories**: custom state management (Zustand-like) with stash/commit pattern  
✅ **Intelligent Form Fields**: reactive validation and auto-commit logic  
✅ **Datasets System**: declarative data sources (static, remote, derived)  
✅ **Dataset Registry**: cache, transform, and bind field data dynamically  
✅ **AI Integration (planned)**: agent-assisted form creation & rules setup  
✅ **Multi-storage Persistence**: session/local storage and MongoDB linkage

---

## 🧠 Git-Like Store API

Each form or component can manage its state as a Git-like repo with two layers:

```ts
stash(...)       // Update working copy
commit(...)      // Promote stash to commit
discard()        // Revert stash to last commit
resetStash()     // Reset only the stash
resetAll()       // Reset both stash and commit to the same value
```

### Example

```ts
import { createKtnGitLikeStore } from '@ktn-store'

export const profileStore = createKtnGitLikeStore({
  storageKey: 'profile',
  initialData: {
    firstName: '',
    lastName: '',
  },
  persistence: 'local',
})

profileStore.stash({ firstName: 'Edwin' })
profileStore.commit()

console.log(profileStore.getCommit())
// → { firstName: 'Edwin', lastName: '' }
```

---

## ⚛️ React Adapter

The adapter bridges the GitLikeStore to React hooks.

```ts
import { createKtnGitLikeHook } from '@ktn-store'
import { profileStore } from './profile-store'

export const useProfileStore = createKtnGitLikeHook(profileStore._store)

function ProfileName() {
  const firstName = useProfileStore((s) => s.stashData.firstName)
  return <span>{firstName}</span>
}
```

---

## 🧠 AI Context Files

All contextual information for developers and AI agents lives under `.ia_context/`:

```
.ia_context/
  _OVERVIEW.md
  _CONTEXT/
  _TECH_REFERENCE/
  manifest.json
  project-structure.txt
  prompts.txt
```

> NOTE: `.claude/` may contain local Claude settings, but `.ia_context/` is the **official context source**.

---

## 🧰 Tools

| Tool                    | Description                                   |
| ----------------------- | --------------------------------------------- |
| `tools/print-tree.js`   | Generates `.ia_context/project-structure.txt` |
| `tools/read-context.js` | Reads and merges context files (for AI usage) |

Run:

```bash
pnpm tree:project
pnpm context:read
```

---

## 🧱 Dockerized Databases

```
docker/
  mongo/
  postgres/
```

> Each service includes initialization scripts, environment variables, and persistent volumes.

---

## 🔮 Future Plans

- AI-assisted node editor for form logic (rules, visibility, validation)
- Visual dataset linking with dependency graphs
- Integration with Postmark/SES for transactional emails
- Publishing system for reusable components and forms

---

## 🧑‍💻 License

This repository and its submodules are licensed under the terms defined in **LICENSE** and **NON-COMMERCIAL.md**.

---

_Designed and developed as part of the KTN ecosystem._
