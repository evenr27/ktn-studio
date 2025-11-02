import { GitLikeStore, GitLikeState } from '../git-like-store'
import { LocalStoragePersistence, SessionStoragePersistence, Persistence } from '../persistence'

export type KtnStorePersistence<T> = 'local' | 'session' | 'none' | Persistence<GitLikeState<T>>

export interface CreateKtnGitLikeStoreConfig<T = unknown> {
  storageKey?: string
  initialData: T
  persistence?: KtnStorePersistence<T>
  onChange?: (state: GitLikeState<T>) => void
}

export function createKtnGitLikeStore<T = unknown>(config: CreateKtnGitLikeStoreConfig<T>) {
  const { storageKey, initialData, onChange, persistence = 'none' } = config

  const store = new GitLikeStore<T>(initialData)

  let persistenceAdapter: Persistence<GitLikeState<T>> | null = null
  const resolvedKey = storageKey ?? 'ktn-store'

  if (persistence === 'local') {
    persistenceAdapter = new LocalStoragePersistence<GitLikeState<T>>(resolvedKey)
  } else if (persistence === 'session') {
    persistenceAdapter = new SessionStoragePersistence<GitLikeState<T>>(resolvedKey)
  } else if (persistence !== 'none' && typeof persistence === 'object') {
    persistenceAdapter = persistence as Persistence<GitLikeState<T>>
  }

  if (persistenceAdapter) {
    const loaded = persistenceAdapter.load()
    if (loaded) {
      store.hydrate(loaded.stashData, loaded.commitData)
    }
  }

  if (persistenceAdapter || onChange) {
    store.subscribe((next) => {
      if (persistenceAdapter) {
        persistenceAdapter.save(next)
      }
      if (onChange) {
        onChange(next)
      }
    })
  }

  return {
    getState: () => store.getState(),
    getStash: () => store.getStashData(),
    getCommit: () => store.getCommitData(),
    stash: (patch: Partial<T> | ((prev: T) => T) | T) => store.stash(patch),
    stashField: <K extends keyof T>(key: K, value: T[K]) => store.stashField(key, value),
    commit: () => store.commit(),
    discard: () => store.discard(),
    resetStash: () => store.resetStash(),
    resetAll: () => store.resetAll(),
    hydrate: (stash: T, commit?: T) => store.hydrate(stash, commit),
    subscribe: store.subscribe.bind(store),
    subscribeSelector: store.subscribeSelector.bind(store),
    _store: store,
  }
}
