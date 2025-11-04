# Intelligent Form Field Architecture

## Objetivo

Tener un **wrapper controlado** que:

- lea y escriba en un **store git-like**,
- valide (inmediato o con debounce),
- pueda **auto-committear** cuando no hay error,
- y **no obligue** al componente visual (el MUI) a saber de stores.

---

## Flujo cuando el usuario escribe

1. El usuario escribe → `stashField('value', nuevoValor)`
2. Marcamos el campo como editado → `stashField('isEdited', true)`
3. Si hay `onChangeEffect`, se ejecuta (puede ser async)
4. Validamos:
   - inmediato **o**
   - con debounce `>= 500ms`
5. Si **no hay error** y `commitOnChange` está activado → `commit()`

---

## Relación con los stores

- El wrapper **siempre** usa un hook que viene de una factoría (`createGitLikeHookAdapterFactory`)
- Ese hook a su vez viene de un store creado con `createGitLikeZustandStore.factory.txt`
- Así todo el proyecto habla el mismo idioma: **stash / commit / discard / reset**
