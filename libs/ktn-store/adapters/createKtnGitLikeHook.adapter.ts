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
import { GitLikeStore, GitLikeState } from '../git-like-store'

export function createKtnGitLikeHook<T = unknown>(store: GitLikeStore<T>) {
  return function useKtnStore<S = GitLikeState<T>>(selector?: (state: GitLikeState<T>) => S): S {
    const [state, setState] = useState<S>(() => {
      const full = store.getState()
      return selector ? selector(full) : (full as unknown as S)
    })

    useEffect(() => {
      if (selector) {
        return store.subscribeSelector(selector, (next) => {
          setState(next)
        })
      }
      return store.subscribe((next) => {
        setState(next as unknown as S)
      })
    }, [selector])

    return state
  }
}
