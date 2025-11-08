/**
 * @file createKtnGitLikeHook.adapter.ts
 *
 * React adapter for the GitLikeStore.
 *
 * This adapter converts the observable pattern (subscribe / notify)
 * into a React hook compatible with the component render cycle.
 *
 * It's framework-specific: use it only inside React environments.
 */

import { useEffect, useState } from 'react'
import { GitLikeState } from '../git-like-store'
import { KtnGitLikeStoreInstance } from '../factories'

/**
 * Return type for the useKtnStore hook.
 * Provides reactive state and all store methods.
 */
export interface UseKtnStoreReturn<T> {
  /** Current working copy (uncommitted changes) */
  stashData: T
  /** Last committed/saved copy */
  commitData: T
  /** Full state with both stash and commit */
  state: GitLikeState<T>
  /** Update stashData with partial or updater function */
  stash: (patch: Partial<T> | ((prev: T) => T) | T) => void
  /** Update a single field in stashData */
  stashField: <K extends keyof T>(key: K, value: T[K]) => void
  /** Save stashData to commitData */
  commit: () => void
  /** Revert stashData to commitData */
  discard: () => void
  /** Reset stashData to commitData */
  resetStash: () => void
  /** Reset both stash and commit to current commitData */
  resetAll: () => void
}

/**
 * Creates a React hook for a GitLikeStore.
 *
 * The returned hook provides reactive access to the store's state
 * and exposes all store methods.
 *
 * @example
 * ```typescript
 * const userStore = createKtnGitLikeStore({ initialData: { name: '' } })
 * const useUser = createKtnGitLikeHook(userStore)
 *
 * function UserComponent() {
 *   const { stashData, commit, stashField } = useUser()
 *   return <input value={stashData.name} onChange={e => stashField('name', e.target.value)} />
 * }
 * ```
 */
export function createKtnGitLikeHook<T = unknown>(store: KtnGitLikeStoreInstance<T>) {
  return function useKtnStore(): UseKtnStoreReturn<T> {
    // Subscribe to store updates
    const [state, setState] = useState<GitLikeState<T>>(() => store.getState())

    useEffect(() => {
      const unsubscribe = store.subscribe((nextState) => {
        setState(nextState)
      })
      return unsubscribe
    }, [])

    // Return reactive state + all store methods
    return {
      stashData: state.stashData,
      commitData: state.commitData,
      state,
      stash: (patch) => store.stash(patch),
      stashField: (key, value) => store.stashField(key, value),
      commit: () => store.commit(),
      discard: () => store.discard(),
      resetStash: () => store.resetStash(),
      resetAll: () => store.resetAll(),
    }
  }
}
