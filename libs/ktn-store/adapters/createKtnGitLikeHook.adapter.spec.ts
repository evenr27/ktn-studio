/**
 * @file createKtnGitLikeHook.adapter.spec.ts
 *
 * Unit tests for the createKtnGitLikeHook adapter.
 * Tests the React hook integration with GitLikeStore.
 */

import { renderHook, act } from '@testing-library/react'
import { createKtnGitLikeHook, UseKtnStoreReturn } from './createKtnGitLikeHook.adapter'
import { createKtnGitLikeStore } from '../factories'

interface TestData {
  name: string
  count: number
}

describe('createKtnGitLikeHook', () => {
  const initialData: TestData = { name: 'test', count: 0 }

  describe('initialization', () => {
    it('should create a hook that returns all state and methods', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      // Check that all properties exist
      expect(result.current).toHaveProperty('stashData')
      expect(result.current).toHaveProperty('commitData')
      expect(result.current).toHaveProperty('state')
      expect(result.current).toHaveProperty('stash')
      expect(result.current).toHaveProperty('stashField')
      expect(result.current).toHaveProperty('commit')
      expect(result.current).toHaveProperty('discard')
      expect(result.current).toHaveProperty('resetStash')
      expect(result.current).toHaveProperty('resetAll')

      // Check initial values
      expect(result.current.stashData).toEqual(initialData)
      expect(result.current.commitData).toEqual(initialData)
      expect(result.current.state).toEqual({
        stashData: initialData,
        commitData: initialData,
      })
    })

    it('should initialize with correct data types', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      expect(typeof result.current.stash).toBe('function')
      expect(typeof result.current.stashField).toBe('function')
      expect(typeof result.current.commit).toBe('function')
      expect(typeof result.current.discard).toBe('function')
      expect(typeof result.current.resetStash).toBe('function')
      expect(typeof result.current.resetAll).toBe('function')
    })
  })

  describe('reactive state updates', () => {
    it('should update stashData when stash method is called', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      act(() => {
        result.current.stash({ name: 'updated', count: 1 })
      })

      expect(result.current.stashData).toEqual({ name: 'updated', count: 1 })
      expect(result.current.commitData).toEqual(initialData) // Commit unchanged
    })

    it('should update stashData when stashField method is called', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      act(() => {
        result.current.stashField('count', 5)
      })

      expect(result.current.stashData.count).toBe(5)
      expect(result.current.stashData.name).toBe('test') // Other field unchanged
      expect(result.current.commitData).toEqual(initialData) // Commit unchanged
    })

    it('should update both stashData and commitData when commit is called', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      act(() => {
        result.current.stashField('name', 'committed')
        result.current.stashField('count', 10)
        result.current.commit()
      })

      expect(result.current.stashData).toEqual({ name: 'committed', count: 10 })
      expect(result.current.commitData).toEqual({ name: 'committed', count: 10 })
    })

    it('should revert stashData to commitData when discard is called', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      act(() => {
        result.current.stashField('name', 'changed')
        result.current.stashField('count', 5)
      })

      expect(result.current.stashData).toEqual({ name: 'changed', count: 5 })

      act(() => {
        result.current.discard()
      })

      expect(result.current.stashData).toEqual(initialData)
      expect(result.current.commitData).toEqual(initialData)
    })

    it('should update when store state changes externally', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      // Change store directly (not through hook methods)
      act(() => {
        store.stash({ name: 'external', count: 99 })
      })

      expect(result.current.stashData).toEqual({ name: 'external', count: 99 })
    })
  })

  describe('stash method variations', () => {
    it('should handle partial updates with stash', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      act(() => {
        result.current.stash({ count: 10 }) // Only update count
      })

      expect(result.current.stashData).toEqual({ name: 'test', count: 10 })
    })

    it('should handle function updater with stash', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      act(() => {
        result.current.stash((prev) => ({ ...prev, count: prev.count + 1 }))
      })

      expect(result.current.stashData.count).toBe(1)

      act(() => {
        result.current.stash((prev) => ({ ...prev, count: prev.count + 1 }))
      })

      expect(result.current.stashData.count).toBe(2)
    })

    it('should handle full replacement with stash', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      act(() => {
        result.current.stash({ name: 'replaced', count: 100 })
      })

      expect(result.current.stashData).toEqual({ name: 'replaced', count: 100 })
    })
  })

  describe('resetStash and resetAll', () => {
    it('should reset stashData to commitData with resetStash', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      act(() => {
        result.current.stashField('name', 'changed')
        result.current.commit()
        result.current.stashField('count', 99)
      })

      expect(result.current.stashData).toEqual({ name: 'changed', count: 99 })
      expect(result.current.commitData).toEqual({ name: 'changed', count: 0 })

      act(() => {
        result.current.resetStash()
      })

      expect(result.current.stashData).toEqual({ name: 'changed', count: 0 })
      expect(result.current.commitData).toEqual({ name: 'changed', count: 0 })
    })

    it('should reset both stash and commit to current commitData with resetAll', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      act(() => {
        result.current.stashField('name', 'v1')
        result.current.commit()
        result.current.stashField('count', 10)
      })

      const committedValue = result.current.commitData

      act(() => {
        result.current.resetAll()
      })

      expect(result.current.stashData).toEqual(committedValue)
      expect(result.current.commitData).toEqual(committedValue)
    })
  })

  describe('subscription management', () => {
    it('should unsubscribe when component unmounts', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { unmount } = renderHook(() => useStore())

      const listenersBefore = (store._store as any).listeners.size
      unmount()
      const listenersAfter = (store._store as any).listeners.size

      expect(listenersAfter).toBeLessThan(listenersBefore)
    })

    it('should handle multiple hooks subscribing to the same store', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result: result1 } = renderHook(() => useStore())
      const { result: result2 } = renderHook(() => useStore())

      expect(result1.current.stashData.name).toBe('test')
      expect(result2.current.stashData.count).toBe(0)

      act(() => {
        result1.current.stash({ name: 'updated', count: 5 })
      })

      // Both hooks should update
      expect(result1.current.stashData).toEqual({ name: 'updated', count: 5 })
      expect(result2.current.stashData).toEqual({ name: 'updated', count: 5 })
    })
  })

  describe('edge cases', () => {
    it('should handle rapid state updates', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      act(() => {
        result.current.stashField('count', 1)
        result.current.stashField('count', 2)
        result.current.stashField('count', 3)
      })

      expect(result.current.stashData.count).toBe(3)
    })

    it('should work with null or undefined values', () => {
      const nullData = { value: null as string | null }
      const store = createKtnGitLikeStore({ initialData: nullData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      expect(result.current.stashData.value).toBeNull()

      act(() => {
        result.current.stashField('value', 'not-null')
      })

      expect(result.current.stashData.value).toBe('not-null')
    })

    it('should handle store with array data', () => {
      const arrayStore = createKtnGitLikeStore({
        initialData: ['a', 'b', 'c'],
        persistence: 'none',
      })
      const useStore = createKtnGitLikeHook(arrayStore)
      const { result } = renderHook(() => useStore())

      expect(result.current.stashData).toEqual(['a', 'b', 'c'])

      act(() => {
        // Use function updater for arrays to avoid merge behavior
        result.current.stash(() => ['x', 'y', 'z'])
      })

      expect(result.current.stashData).toEqual(['x', 'y', 'z'])
    })

    it('should handle store with primitive data', () => {
      const primitiveStore = createKtnGitLikeStore({ initialData: 42, persistence: 'none' })
      const useStore = createKtnGitLikeHook(primitiveStore)
      const { result } = renderHook(() => useStore())

      expect(result.current.stashData).toBe(42)

      act(() => {
        result.current.stash(100)
      })

      expect(result.current.stashData).toBe(100)
    })
  })

  describe('complete git-like workflow', () => {
    it('should support complete git-like workflow through hook', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      // Initial state
      expect(result.current.stashData).toEqual(initialData)
      expect(result.current.commitData).toEqual(initialData)

      // Stash changes
      act(() => {
        result.current.stash({ name: 'working', count: 5 })
      })

      expect(result.current.stashData).toEqual({ name: 'working', count: 5 })
      expect(result.current.commitData).toEqual(initialData)

      // Commit changes
      act(() => {
        result.current.commit()
      })

      expect(result.current.stashData).toEqual({ name: 'working', count: 5 })
      expect(result.current.commitData).toEqual({ name: 'working', count: 5 })

      // Make new changes
      act(() => {
        result.current.stashField('count', 10)
      })

      expect(result.current.stashData.count).toBe(10)
      expect(result.current.commitData.count).toBe(5)

      // Discard changes
      act(() => {
        result.current.discard()
      })

      expect(result.current.stashData).toEqual({ name: 'working', count: 5 })
      expect(result.current.commitData).toEqual({ name: 'working', count: 5 })
    })

    it('should track modifications correctly through hook', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      const hasChanges = () =>
        JSON.stringify(result.current.stashData) !== JSON.stringify(result.current.commitData)

      expect(hasChanges()).toBe(false)

      act(() => {
        result.current.stashField('name', 'modified')
      })

      expect(hasChanges()).toBe(true)

      act(() => {
        result.current.commit()
      })

      expect(hasChanges()).toBe(false)
    })
  })

  describe('type safety', () => {
    it('should maintain type safety with TypeScript', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)

      // This test is more about compilation than runtime
      const { result } = renderHook(() => useStore())

      // These should all be type-safe
      const name: string = result.current.stashData.name
      const count: number = result.current.stashData.count

      expect(name).toBe('test')
      expect(count).toBe(0)
    })

    it('should properly type the UseKtnStoreReturn interface', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      // Type assertion to ensure the return type is correct
      const hookReturn: UseKtnStoreReturn<TestData> = result.current

      expect(hookReturn.stashData).toBeDefined()
      expect(hookReturn.commitData).toBeDefined()
      expect(hookReturn.state).toBeDefined()
    })
  })

  describe('state object consistency', () => {
    it('should keep state object in sync with stashData and commitData', () => {
      const store = createKtnGitLikeStore({ initialData, persistence: 'none' })
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      expect(result.current.state.stashData).toBe(result.current.stashData)
      expect(result.current.state.commitData).toBe(result.current.commitData)

      act(() => {
        result.current.stashField('name', 'changed')
      })

      expect(result.current.state.stashData).toBe(result.current.stashData)
      expect(result.current.state.commitData).toBe(result.current.commitData)
    })
  })
})
