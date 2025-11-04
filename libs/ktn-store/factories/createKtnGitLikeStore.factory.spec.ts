/**
 * @file createKtnGitLikeStore.factory.spec.ts
 *
 * Unit tests for the createKtnGitLikeStore factory.
 * Tests store creation, persistence, and all git-like operations.
 */

import { createKtnGitLikeStore } from './createKtnGitLikeStore.factory'
import { Persistence } from '../persistence'
import { GitLikeState } from '../git-like-store'

interface TestData {
  name: string
  count: number
}

// Mock persistence adapter for testing
class MockPersistence<T> implements Persistence<T> {
  private storage: T | null = null

  load(): T | null {
    return this.storage
  }

  save(state: T): void {
    this.storage = state
  }

  clear(): void {
    this.storage = null
  }

  getSavedData(): T | null {
    return this.storage
  }
}

describe('createKtnGitLikeStore', () => {
  const initialData: TestData = { name: 'test', count: 0 }

  beforeEach(() => {
    // Clear localStorage and sessionStorage before each test
    if (typeof window !== 'undefined') {
      localStorage.clear()
      sessionStorage.clear()
    }
  })

  describe('initialization', () => {
    it('should create a store with initial data', () => {
      const store = createKtnGitLikeStore({
        initialData,
      })

      expect(store.getStash()).toEqual(initialData)
      expect(store.getCommit()).toEqual(initialData)
    })

    it('should create a store with custom storage key', () => {
      const store = createKtnGitLikeStore({
        initialData,
        storageKey: 'custom-key',
      })

      expect(store.getStash()).toEqual(initialData)
    })

    it('should use default storage key when not provided', () => {
      const store = createKtnGitLikeStore({
        initialData,
      })

      expect(store.getStash()).toEqual(initialData)
    })
  })

  describe('basic operations', () => {
    it('should stash data correctly', () => {
      const store = createKtnGitLikeStore({ initialData })

      store.stash({ name: 'updated', count: 5 })

      expect(store.getStash()).toEqual({ name: 'updated', count: 5 })
      expect(store.getCommit()).toEqual(initialData)
    })

    it('should stash partial data', () => {
      const store = createKtnGitLikeStore({ initialData })

      store.stash({ name: 'partial' })

      expect(store.getStash()).toEqual({ name: 'partial', count: 0 })
    })

    it('should stash using function updater', () => {
      const store = createKtnGitLikeStore({ initialData })

      store.stash((prev) => ({ ...prev, count: prev.count + 10 }))

      expect(store.getStash().count).toBe(10)
    })

    it('should stash field correctly', () => {
      const store = createKtnGitLikeStore({ initialData })

      store.stashField('count', 42)

      expect(store.getStash().count).toBe(42)
      expect(store.getStash().name).toBe('test')
    })

    it('should commit changes', () => {
      const store = createKtnGitLikeStore({ initialData })

      store.stash({ name: 'committed', count: 5 })
      store.commit()

      expect(store.getStash()).toEqual({ name: 'committed', count: 5 })
      expect(store.getCommit()).toEqual({ name: 'committed', count: 5 })
    })

    it('should discard changes', () => {
      const store = createKtnGitLikeStore({ initialData })

      store.stash({ name: 'temporary', count: 5 })
      store.discard()

      expect(store.getStash()).toEqual(initialData)
      expect(store.getCommit()).toEqual(initialData)
    })

    it('should reset stash to commit', () => {
      const store = createKtnGitLikeStore({ initialData })

      store.stash({ name: 'stashed', count: 5 })
      store.commit()
      store.stash({ name: 'changed', count: 10 })
      store.resetStash()

      expect(store.getStash()).toEqual({ name: 'stashed', count: 5 })
      expect(store.getCommit()).toEqual({ name: 'stashed', count: 5 })
    })

    it('should reset all to commit', () => {
      const store = createKtnGitLikeStore({ initialData })

      store.stash({ name: 'changed', count: 10 })
      store.resetAll()

      expect(store.getStash()).toEqual(initialData)
      expect(store.getCommit()).toEqual(initialData)
    })
  })

  describe('hydrate', () => {
    it('should hydrate with stash only', () => {
      const store = createKtnGitLikeStore({ initialData })

      store.hydrate({ name: 'hydrated', count: 100 })

      expect(store.getStash()).toEqual({ name: 'hydrated', count: 100 })
      expect(store.getCommit()).toEqual({ name: 'hydrated', count: 100 })
    })

    it('should hydrate with stash and commit', () => {
      const store = createKtnGitLikeStore({ initialData })

      store.hydrate({ name: 'stash', count: 5 }, { name: 'commit', count: 3 })

      expect(store.getStash()).toEqual({ name: 'stash', count: 5 })
      expect(store.getCommit()).toEqual({ name: 'commit', count: 3 })
    })
  })

  describe('subscriptions', () => {
    it('should notify subscribers on state changes', () => {
      const store = createKtnGitLikeStore({ initialData })
      const listener = jest.fn()

      store.subscribe(listener)
      store.stash({ name: 'changed', count: 5 })

      expect(listener).toHaveBeenCalledTimes(1)
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          stashData: { name: 'changed', count: 5 },
        }),
        expect.any(Object)
      )
    })

    it('should allow unsubscribe', () => {
      const store = createKtnGitLikeStore({ initialData })
      const listener = jest.fn()

      const unsubscribe = store.subscribe(listener)
      store.stash({ name: 'first', count: 1 })

      unsubscribe()

      store.stash({ name: 'second', count: 2 })

      expect(listener).toHaveBeenCalledTimes(1)
    })

    it('should support selector subscriptions', () => {
      const store = createKtnGitLikeStore({ initialData })
      const listener = jest.fn()

      store.subscribeSelector((state) => state.stashData.count, listener)

      store.stashField('count', 5)

      expect(listener).toHaveBeenCalledWith(5, 0)
    })
  })

  describe('onChange callback', () => {
    it('should call onChange when state changes', () => {
      const onChange = jest.fn()
      const store = createKtnGitLikeStore({
        initialData,
        onChange,
      })

      store.stash({ name: 'changed', count: 5 })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          stashData: { name: 'changed', count: 5 },
        })
      )
    })

    it('should call onChange on commit', () => {
      const onChange = jest.fn()
      const store = createKtnGitLikeStore({
        initialData,
        onChange,
      })

      store.stash({ name: 'committed', count: 5 })
      onChange.mockClear()

      store.commit()

      expect(onChange).toHaveBeenCalledTimes(1)
    })
  })

  describe('persistence: none', () => {
    it('should not persist when persistence is none', () => {
      const store = createKtnGitLikeStore({
        initialData,
        persistence: 'none',
        storageKey: 'test-key',
      })

      store.stash({ name: 'not-persisted', count: 5 })

      // Create new store - should use initial data, not persisted
      const newStore = createKtnGitLikeStore({
        initialData,
        persistence: 'none',
        storageKey: 'test-key',
      })

      expect(newStore.getStash()).toEqual(initialData)
    })
  })

  describe('persistence: custom adapter', () => {
    it('should use custom persistence adapter', () => {
      const mockPersistence = new MockPersistence<GitLikeState<TestData>>()
      const store = createKtnGitLikeStore({
        initialData,
        persistence: mockPersistence,
      })

      store.stash({ name: 'persisted', count: 5 })

      const saved = mockPersistence.getSavedData()
      expect(saved?.stashData).toEqual({ name: 'persisted', count: 5 })
    })

    it('should load from custom persistence on initialization', () => {
      const mockPersistence = new MockPersistence<GitLikeState<TestData>>()
      mockPersistence.save({
        stashData: { name: 'loaded', count: 99 },
        commitData: { name: 'loaded', count: 99 },
      })

      const store = createKtnGitLikeStore({
        initialData,
        persistence: mockPersistence,
      })

      expect(store.getStash()).toEqual({ name: 'loaded', count: 99 })
      expect(store.getCommit()).toEqual({ name: 'loaded', count: 99 })
    })

    it('should persist on every state change', () => {
      const mockPersistence = new MockPersistence<GitLikeState<TestData>>()
      const store = createKtnGitLikeStore({
        initialData,
        persistence: mockPersistence,
      })

      store.stashField('count', 1)
      expect(mockPersistence.getSavedData()?.stashData.count).toBe(1)

      store.stashField('count', 2)
      expect(mockPersistence.getSavedData()?.stashData.count).toBe(2)

      store.commit()
      expect(mockPersistence.getSavedData()?.commitData.count).toBe(2)
    })
  })

  describe('git-like workflow', () => {
    it('should support complete git-like workflow', () => {
      const store = createKtnGitLikeStore({ initialData })

      // Initial state
      expect(store.getStash()).toEqual(initialData)
      expect(store.getCommit()).toEqual(initialData)

      // User makes changes (stash)
      store.stash({ name: 'working', count: 5 })
      expect(store.getStash()).toEqual({ name: 'working', count: 5 })
      expect(store.getCommit()).toEqual(initialData)

      // User commits changes
      store.commit()
      expect(store.getStash()).toEqual({ name: 'working', count: 5 })
      expect(store.getCommit()).toEqual({ name: 'working', count: 5 })

      // User makes more changes
      store.stashField('count', 10)
      expect(store.getStash().count).toBe(10)
      expect(store.getCommit().count).toBe(5)

      // User discards new changes
      store.discard()
      expect(store.getStash()).toEqual({ name: 'working', count: 5 })
    })

    it('should handle multiple stash-commit cycles', () => {
      const store = createKtnGitLikeStore({ initialData })

      // Cycle 1
      store.stash({ name: 'v1', count: 1 })
      store.commit()

      // Cycle 2
      store.stash({ name: 'v2', count: 2 })
      store.commit()

      // Cycle 3
      store.stash({ name: 'v3', count: 3 })
      store.commit()

      expect(store.getStash()).toEqual({ name: 'v3', count: 3 })
      expect(store.getCommit()).toEqual({ name: 'v3', count: 3 })
    })
  })

  describe('edge cases', () => {
    it('should handle empty object as initial data', () => {
      const store = createKtnGitLikeStore<Record<string, never>>({
        initialData: {},
      })

      expect(store.getStash()).toEqual({})
    })

    it('should handle array as data', () => {
      const store = createKtnGitLikeStore<number[]>({
        initialData: [1, 2, 3],
      })

      // Note: Arrays are treated as objects by the store's merge logic
      // Use function updater for arrays
      store.stash(() => [4, 5, 6])

      expect(store.getStash()).toEqual([4, 5, 6])
    })

    it('should handle primitive values', () => {
      const store = createKtnGitLikeStore<number>({
        initialData: 42,
      })

      store.stash(100)

      expect(store.getStash()).toBe(100)
    })

    it('should handle nested objects', () => {
      interface NestedData {
        user: {
          profile: {
            name: string
            age: number
          }
        }
      }

      const store = createKtnGitLikeStore<NestedData>({
        initialData: {
          user: {
            profile: {
              name: 'John',
              age: 30,
            },
          },
        },
      })

      store.stash({
        user: {
          profile: {
            name: 'Jane',
            age: 25,
          },
        },
      })

      expect(store.getStash().user.profile.name).toBe('Jane')
    })

    it('should handle null values', () => {
      const store = createKtnGitLikeStore<{ value: string | null }>({
        initialData: { value: null },
      })

      store.stashField('value', 'not-null')
      expect(store.getStash().value).toBe('not-null')

      store.stashField('value', null)
      expect(store.getStash().value).toBeNull()
    })
  })

  describe('getState method', () => {
    it('should return full state with stash and commit', () => {
      const store = createKtnGitLikeStore({ initialData })

      store.stash({ name: 'stashed', count: 5 })

      const state = store.getState()

      expect(state).toEqual({
        stashData: { name: 'stashed', count: 5 },
        commitData: initialData,
      })
    })
  })

  describe('internal store access', () => {
    it('should expose internal store for advanced usage', () => {
      const store = createKtnGitLikeStore({ initialData })

      expect(store._store).toBeDefined()
      expect(store._store.getState).toBeDefined()
    })
  })

  describe('type safety', () => {
    it('should maintain type safety with TypeScript', () => {
      const store = createKtnGitLikeStore<TestData>({
        initialData: { name: 'test', count: 0 },
      })

      // These operations should be type-safe
      store.stash({ name: 'new', count: 1 })
      store.stashField('name', 'typed')
      store.stashField('count', 42)

      const stash: TestData = store.getStash()
      const commit: TestData = store.getCommit()

      expect(stash).toBeDefined()
      expect(commit).toBeDefined()
    })
  })

  describe('persistence with onChange', () => {
    it('should work with both persistence and onChange', () => {
      const mockPersistence = new MockPersistence<GitLikeState<TestData>>()
      const onChange = jest.fn()

      const store = createKtnGitLikeStore({
        initialData,
        persistence: mockPersistence,
        onChange,
      })

      store.stash({ name: 'both', count: 5 })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(mockPersistence.getSavedData()?.stashData.name).toBe('both')
    })
  })
})
