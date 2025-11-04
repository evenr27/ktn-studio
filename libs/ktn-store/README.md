# ktn-store

Reusable, lightweight **Git-like state manager** for TypeScript and React.

---

## 🌱 Overview

This package provides a universal, minimalistic state layer used across **KTN** projects.

It allows you to:

- Keep **two synchronized states**:
  - `stashData` → working copy (editable / draft)
  - `commitData` → confirmed / persisted copy
- Make **atomic commits**, **discard changes**, **reset**, and **hydrate**.
- **Persist** data automatically to `localStorage` or `sessionStorage`.
- Work with **objects**, **primitives**, or **null** values.
- Use it **without React** or with **React hooks** (Zustand-like syntax).

---

## 🧩 Installation (in Nx or any TS project)

Place the folder under `libs/ktn-store/` and make sure your `tsconfig.base.json` includes:

```json
{
  "compilerOptions": {
    "paths": {
      "@ktn-store": ["libs/ktn-store/index.ts"]
    }
  }
}
```

Then import it anywhere:

```ts
import { createKtnGitLikeStore } from '@ktn-store'
```

---

## 🚀 Creating a Store

```ts
import { createKtnGitLikeStore } from '@ktn-store'

export const profileStore = createKtnGitLikeStore({
  storageKey: 'profile',
  initialData: {
    firstName: '',
    lastName: '',
  },
  // persistence is optional — defaults to 'none'
  // persistence: 'local',
})
```

`createKtnGitLikeStore` accepts:

| Property      | Type                         | Default       | Description                                                   |
| ------------- | ---------------------------- | ------------- | ------------------------------------------------------------- |
| `storageKey`  | `string`                     | `'ktn-store'` | Used as the storage key when persisting                       |
| `initialData` | `T`                          | —             | Initial stash/commit data (can be object, primitive, or null) |
| `persistence` | `'local', 'session', 'none'` | `'none'`      | Persistence type                                              |
| `onChange`    | `(state) => void`            | —             | Optional listener for every state change                      |

---

## 📖 Reading the Store (no React)

You can access the store from **any file**:

```ts
import { profileStore } from '@core/stores/profile-store'

// get entire state
const state = profileStore.getState()
console.log(state.stashData, state.commitData)

// get only committed data
const committed = profileStore.getCommit()

// get only the draft
const draft = profileStore.getStash()
```

---

## ✏️ Updating the Store (no React)

```ts
profileStore.stash({ firstName: 'Edwin' })
profileStore.commit()

console.log(profileStore.getCommit()) // → { firstName: 'Edwin', lastName: '' }
```

If you want to cancel changes:

```ts
profileStore.discard() // stash = last commit
```

If you want to fully reset:

```ts
profileStore.resetAll() // stash and commit = commitData
```

---

## 👂 Subscribing to Changes (no React)

### Subscribe to any change:

```ts
const unsub = profileStore.subscribe((next, prev) => {
  console.log('Profile changed:', prev, '→', next)
})
```

### Subscribe to a specific field (selector):

```ts
profileStore.subscribeSelector(
  (s) => s.stashData.firstName,
  (next, prev) => console.log('First name changed:', prev, '→', next)
)
```

Use `unsubscribe()` when no longer needed.

---

## ⚛️ Using with React

Create a hook using `createKtnGitLikeHook`:

```ts
import { createKtnGitLikeHook } from '@ktn-store'
import { profileStore } from './profile-store'

// 1. Create a hook bound to your store
export const useProfileStore = createKtnGitLikeHook(profileStore._store)

// 2. Use it in any React component
function ProfileName() {
  const firstName = useProfileStore((s) => s.stashData.firstName)
  return <span>{firstName}</span>
}
```

- If you omit a selector, it subscribes to the full state.
- With a selector, it only re-renders when that slice changes.

---

## 🔒 Persistence Example

```ts
const preferencesStore = createKtnGitLikeStore({
  storageKey: 'user-preferences',
  initialData: { darkMode: false, language: 'en' },
  persistence: 'local',
})

// automatically persisted when committing
preferencesStore.stash({ darkMode: true })
preferencesStore.commit()

// later (even after refresh)
console.log(preferencesStore.getCommit()) // → persisted value
```

---

## 🧠 API Reference

| Method                            | Description                                |
| --------------------------------- | ------------------------------------------ |
| `getState()`                      | Returns `{ stashData, commitData }`        |
| `getStash()`                      | Returns the working copy                   |
| `getCommit()`                     | Returns the confirmed copy                 |
| `stash(patch)`                    | Merges or replaces stash data              |
| `stashField(key, value)`          | Updates a single field (objects only)      |
| `commit()`                        | Promotes stash → commit                    |
| `discard()`                       | Restores stash from last commit            |
| `resetStash()`                    | Same as discard                            |
| `resetAll()`                      | Resets stash and commit                    |
| `hydrate(stash, commit?)`         | Loads state from external source           |
| `subscribe(listener)`             | Watches all changes                        |
| `subscribeSelector(selector, cb)` | Watches specific slices                    |
| `_store`                          | Exposes the internal GitLikeStore instance |

---

## 🧩 Primitive / Null Example

```ts
const flagStore = createKtnGitLikeStore<boolean>({
  storageKey: 'feature-x',
  initialData: false,
  persistence: 'session',
})

flagStore.stash(true)
flagStore.commit()

console.log(flagStore.getCommit()) // true
```

---

## ⚙️ Summary

- ✅ Simple API — no Providers or React context needed.
- ✅ Works with objects, primitives, and null.
- ✅ Built-in persistence.
- ✅ Works outside React or inside React (via hook).
- ✅ Fully typed and portable — drop it into any TS/JS app.

---

_Designed for KTN projects to provide a consistent, Git-like state layer._
