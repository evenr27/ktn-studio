# Git-Like Pattern — State Architecture

## Concept

Cada entidad del formulario (un campo, un dataset, una config del IDE) tiene **dos capas de estado**:

- **stashData** → copia de trabajo (lo que el usuario está tocando ahora)
- **commitData** → copia confirmada / persistida (lo que “vale”)

Esto nos permite:

- editar sin ensuciar lo guardado,
- tener botón de “descartar cambios”,
- y que ciertos componentes auto-committeen cuando están válidos.

---

## Core API

| Acción         | Qué hace                                                                 |
| -------------- | ------------------------------------------------------------------------ |
| `stash(...)`   | Actualiza **solo** la copia de trabajo                                   |
| `stashField`   | Actualiza **un campo** de la copia de trabajo                            |
| `commit(...)`  | Promueve el stash a commit (opcionalmente con un patch)                  |
| `discard()`    | Vuelve el stash al último commit                                         |
| `resetStash()` | Resetea solo el stash a los defaults                                     |
| `resetRepo()`  | Resetea stash **y** commit a los defaults (útil para “nuevo formulario”) |
| `getStash()`   | Lee el stash fuera de React                                              |
| `getCommit()`  | Lee el commit fuera de React                                             |

---

## Implementation

La implementación base está en **`createGitLikeZustandStore.factory.txt`** y usa **Zustand** con persistencia opcional:

- `storage: 'session' | 'local'`
- `persistSaved: true | false` (cuando es `true` solo persiste el **commitData**)
- en SSR usa un storage “no-op” para no romper Next.js

---

## Composition

Encima del store ponemos:

1. **Adapter hooks** → `createGitLikeHookAdapterFactory(...)`
2. **Selector hooks** → `createGitLikeHookSelectorFactory(...)`
3. **Form field wrapper** → `CreateFormField(...)`
