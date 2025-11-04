# Hooks System Architecture

## Idea

La UI **nunca** debería importar directamente el store de Zustand.
En vez de eso, importa **hooks estables** (ports) que exponen SIEMPRE la misma forma.

---

## Capas

1. **Store (infra)**
   Creado con `createGitLikeZustandStore.factory.txt`

2. **Adapter hook (puerto)**
   Creado con `createGitLikeHookAdapterFactory(store)`

3. **Selector hooks (afinado)**
   Creado con `createGitLikeHookSelectorFactory(store)`

4. **UI / Fields**
   `CreateFormField(...)` usa esos hooks adentro.

---

## Beneficios

- Podemos cambiar Zustand por otra cosa sin tocar la UI.
- Podemos mockear el hook en los tests.
- Mantenemos el patrón **git-like** parejito en todo el proyecto.
