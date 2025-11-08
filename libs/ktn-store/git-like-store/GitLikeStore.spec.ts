/* eslint-disable @typescript-eslint/no-explicit-any */
import { GitLikeStore } from './GitLikeStore'

interface TestState {
  name: string
  age: number
}

describe('GitLikeStore', () => {
  describe('constructor and initial state', () => {
    it('should initialize with stash and commit set to initial data', () => {
      const initialData: TestState = { name: 'John', age: 30 }
      const store = new GitLikeStore(initialData)

      expect(store.getStashData()).toEqual(initialData)
      expect(store.getCommitData()).toEqual(initialData)
      expect(store.getState()).toEqual({
        stashData: initialData,
        commitData: initialData,
      })
    })

    it('should work with primitive types', () => {
      const store = new GitLikeStore<number>(42)
      expect(store.getStashData()).toBe(42)
      expect(store.getCommitData()).toBe(42)
    })
  })

  describe('stash', () => {
    it('should update stashData with partial object', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      store.stash({ name: 'Jane' })

      expect(store.getStashData()).toEqual({ name: 'Jane', age: 30 })
      expect(store.getCommitData()).toEqual({ name: 'John', age: 30 }) // Unchanged
    })

    it('should update stashData with updater function', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      store.stash((prev) => ({ ...prev, age: prev.age + 1 }))

      expect(store.getStashData()).toEqual({ name: 'John', age: 31 })
      expect(store.getCommitData()).toEqual({ name: 'John', age: 30 })
    })

    it('should replace entire stashData with full object', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      store.stash({ name: 'Jane', age: 25 })

      expect(store.getStashData()).toEqual({ name: 'Jane', age: 25 })
    })

    it('should work with primitive types', () => {
      const store = new GitLikeStore<number>(0)
      store.stash(42)
      expect(store.getStashData()).toBe(42)
      expect(store.getCommitData()).toBe(0)
    })

    it('should notify subscribers when stash changes', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })
      const listener = jest.fn()

      store.subscribe(listener)
      store.stash({ name: 'Jane' })

      expect(listener).toHaveBeenCalledTimes(1)
    })
  })

  describe('stashField', () => {
    it('should update single field in stashData', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      store.stashField('name', 'Jane')

      expect(store.getStashData()).toEqual({ name: 'Jane', age: 30 })
      expect(store.getCommitData()).toEqual({ name: 'John', age: 30 })
    })

    it('should update multiple fields sequentially', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      store.stashField('name', 'Jane')
      store.stashField('age', 25)

      expect(store.getStashData()).toEqual({ name: 'Jane', age: 25 })
    })

    it('should throw error if stashData is not an object', () => {
      const store = new GitLikeStore<number>(42)

      expect(() => {
        store.stashField('toString' as any, 'test' as any)
      }).toThrow('stashField can only be used when stashData is an object')
    })

    it('should notify subscribers on each field change', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })
      const listener = jest.fn()

      store.subscribe(listener)

      store.stashField('name', 'Jane')
      store.stashField('age', 25)

      expect(listener).toHaveBeenCalledTimes(2)
    })
  })

  describe('commit', () => {
    it('should copy stashData to commitData', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      store.stash({ name: 'Jane' })
      expect(store.getCommitData()).toEqual({ name: 'John', age: 30 })

      store.commit()
      expect(store.getCommitData()).toEqual({ name: 'Jane', age: 30 })
      expect(store.getStashData()).toEqual({ name: 'Jane', age: 30 })
    })

    it('should work with multiple stash operations before commit', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      store.stashField('name', 'Jane')
      store.stashField('age', 25)
      store.commit()

      expect(store.getCommitData()).toEqual({ name: 'Jane', age: 25 })
    })

    it('should notify subscribers on commit', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })
      const listener = jest.fn()

      store.stash({ name: 'Jane' })
      listener.mockClear()

      store.subscribe(listener)
      store.commit()

      expect(listener).toHaveBeenCalledTimes(1)
    })
  })

  describe('discard', () => {
    it('should revert stashData to commitData', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      store.stash({ name: 'Jane', age: 25 })
      expect(store.getStashData()).toEqual({ name: 'Jane', age: 25 })

      store.discard()
      expect(store.getStashData()).toEqual({ name: 'John', age: 30 })
      expect(store.getCommitData()).toEqual({ name: 'John', age: 30 })
    })

    it('should discard multiple uncommitted changes', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      store.commit() // Initial commit
      store.stashField('name', 'Jane')
      store.stashField('age', 25)

      store.discard()

      expect(store.getStashData()).toEqual({ name: 'John', age: 30 })
    })

    it('should notify subscribers on discard', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })
      const listener = jest.fn()

      store.stash({ name: 'Jane' })
      store.subscribe(listener)

      store.discard()

      expect(listener).toHaveBeenCalledTimes(1)
    })
  })

  describe('resetStash', () => {
    it('should reset stashData to commitData', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      store.stash({ name: 'Jane', age: 25 })
      store.resetStash()

      expect(store.getStashData()).toEqual({ name: 'John', age: 30 })
      expect(store.getCommitData()).toEqual({ name: 'John', age: 30 })
    })

    it('should behave like discard', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      store.stashField('name', 'Jane')
      store.commit()
      store.stashField('age', 25)

      store.resetStash()

      expect(store.getStashData()).toEqual({ name: 'Jane', age: 30 })
    })
  })

  describe('resetAll', () => {
    it('should reset both stashData and commitData to initial commitData', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      store.stash({ name: 'Jane', age: 25 })
      store.commit()

      store.stash({ name: 'Bob', age: 40 })

      store.resetAll()

      // Should reset to the current commitData (which is Jane, 25)
      expect(store.getStashData()).toEqual({ name: 'Jane', age: 25 })
      expect(store.getCommitData()).toEqual({ name: 'Jane', age: 25 })
    })
  })

  describe('hydrate', () => {
    it('should hydrate both stash and commit', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      store.hydrate({ name: 'Jane', age: 25 }, { name: 'Bob', age: 40 })

      expect(store.getStashData()).toEqual({ name: 'Jane', age: 25 })
      expect(store.getCommitData()).toEqual({ name: 'Bob', age: 40 })
    })

    it('should use stashData as commitData if not provided', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      store.hydrate({ name: 'Jane', age: 25 })

      expect(store.getStashData()).toEqual({ name: 'Jane', age: 25 })
      expect(store.getCommitData()).toEqual({ name: 'Jane', age: 25 })
    })

    it('should notify subscribers on hydrate', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })
      const listener = jest.fn()

      store.subscribe(listener)
      store.hydrate({ name: 'Jane', age: 25 })

      expect(listener).toHaveBeenCalledTimes(1)
    })
  })

  describe('select', () => {
    it('should select data from current state', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      const name = store.select((s) => s.stashData.name)
      const age = store.select((s) => s.commitData.age)

      expect(name).toBe('John')
      expect(age).toBe(30)
    })

    it('should reflect changes after stash', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      store.stash({ name: 'Jane' })

      const stashName = store.select((s) => s.stashData.name)
      const commitName = store.select((s) => s.commitData.name)

      expect(stashName).toBe('Jane')
      expect(commitName).toBe('John')
    })
  })

  describe('git-like workflow', () => {
    it('should support complete git-like workflow', () => {
      const store = new GitLikeStore<TestState>({ name: 'John', age: 30 })

      // Initial state
      expect(store.getStashData()).toEqual({ name: 'John', age: 30 })
      expect(store.getCommitData()).toEqual({ name: 'John', age: 30 })

      // Make changes (stash)
      store.stashField('name', 'Jane')
      expect(store.getStashData()).toEqual({ name: 'Jane', age: 30 })
      expect(store.getCommitData()).toEqual({ name: 'John', age: 30 })

      // Commit changes
      store.commit()
      expect(store.getStashData()).toEqual({ name: 'Jane', age: 30 })
      expect(store.getCommitData()).toEqual({ name: 'Jane', age: 30 })

      // Make more changes
      store.stashField('age', 25)
      expect(store.getStashData()).toEqual({ name: 'Jane', age: 25 })
      expect(store.getCommitData()).toEqual({ name: 'Jane', age: 30 })

      // Discard uncommitted changes
      store.discard()
      expect(store.getStashData()).toEqual({ name: 'Jane', age: 30 })
      expect(store.getCommitData()).toEqual({ name: 'Jane', age: 30 })
    })
  })

  describe('edge cases', () => {
    it('should handle empty object', () => {
      interface EmptyState {}
      const store = new GitLikeStore<EmptyState>({})

      expect(store.getStashData()).toEqual({})
      expect(store.getCommitData()).toEqual({})
    })

    it('should handle nested objects', () => {
      interface NestedState {
        user: { name: string; age: number }
      }
      const store = new GitLikeStore<NestedState>({
        user: { name: 'John', age: 30 },
      })

      store.stash({ user: { name: 'Jane', age: 25 } })
      expect(store.getStashData()).toEqual({ user: { name: 'Jane', age: 25 } })
    })

    it('should handle arrays', () => {
      const store = new GitLikeStore<number[]>([1, 2, 3])

      // Use updater function for arrays to avoid spreading issues
      store.stash(() => [4, 5, 6])
      expect(store.getStashData()).toEqual([4, 5, 6])
      expect(store.getCommitData()).toEqual([1, 2, 3])

      store.commit()
      expect(store.getCommitData()).toEqual([4, 5, 6])
    })
  })
})
