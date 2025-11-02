/**
 * @file createKtnGitLikeHook.adapter.spec.ts
 *
 * Unit tests for the createKtnGitLikeHook adapter.
 * Tests the React hook integration with GitLikeStore.
 */

import { renderHook, act } from '@testing-library/react'
import { createKtnGitLikeHook } from './createKtnGitLikeHook.adapter'
import { GitLikeStore, GitLikeState } from '../git-like-store'

interface TestData {
  name: string
  count: number
}

describe('createKtnGitLikeHook', () => {
  let store: GitLikeStore<TestData>
  const initialData: TestData = { name: 'test', count: 0 }

  beforeEach(() => {
    store = new GitLikeStore<TestData>(initialData)
  })

  describe('initialization', () => {
    it('should create a hook that returns full state when no selector is provided', () => {
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      expect(result.current).toEqual<GitLikeState<TestData>>({
        stashData: initialData,
        commitData: initialData,
      })
    })

    it('should create a hook that returns selected state when selector is provided', () => {
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore((state) => state.stashData.name))

      expect(result.current).toBe('test')
    })
  })

  describe('state updates', () => {
    it('should update when store state changes', () => {
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      act(() => {
        store.stash({ name: 'updated', count: 1 })
      })

      expect(result.current.stashData).toEqual({ name: 'updated', count: 1 })
    })

    it('should update selected state when store changes', () => {
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore((state) => state.stashData.count))

      expect(result.current).toBe(0)

      act(() => {
        store.stashField('count', 5)
      })

      expect(result.current).toBe(5)
    })

    it('should update when commit is called', () => {
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      act(() => {
        store.stash({ name: 'committed', count: 10 })
        store.commit()
      })

      expect(result.current.stashData).toEqual({ name: 'committed', count: 10 })
      expect(result.current.commitData).toEqual({ name: 'committed', count: 10 })
    })

    it('should update when discard is called', () => {
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      act(() => {
        store.stash({ name: 'changed', count: 5 })
      })

      expect(result.current.stashData.name).toBe('changed')

      act(() => {
        store.discard()
      })

      expect(result.current.stashData.name).toBe('test')
    })
  })

  describe('selector behavior', () => {
    it('should only update when selected value changes', () => {
      const useStore = createKtnGitLikeHook(store)
      let renderCount = 0
      const selector = (state: GitLikeState<TestData>) => state.stashData.name

      const { result } = renderHook(() => {
        renderCount++
        return useStore(selector)
      })

      const initialRenderCount = renderCount

      act(() => {
        store.stashField('count', 5)
      })

      // Should not re-render because name didn't change
      expect(renderCount).toBe(initialRenderCount)
      expect(result.current).toBe('test')

      act(() => {
        store.stashField('name', 'new-name')
      })

      // Should re-render because name changed
      expect(renderCount).toBeGreaterThan(initialRenderCount)
      expect(result.current).toBe('new-name')
    })

    it('should work with complex selectors', () => {
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() =>
        useStore((state) => ({
          isModified: state.stashData.count !== state.commitData.count,
          currentCount: state.stashData.count,
        }))
      )

      expect(result.current.isModified).toBe(false)
      expect(result.current.currentCount).toBe(0)

      act(() => {
        store.stashField('count', 10)
      })

      expect(result.current.isModified).toBe(true)
      expect(result.current.currentCount).toBe(10)

      act(() => {
        store.commit()
      })

      expect(result.current.isModified).toBe(false)
      expect(result.current.currentCount).toBe(10)
    })
  })

  describe('subscription management', () => {
    it('should unsubscribe when component unmounts', () => {
      const useStore = createKtnGitLikeHook(store)
      const { unmount } = renderHook(() => useStore())

      const listenersBefore = (store as any).listeners.size
      unmount()
      const listenersAfter = (store as any).listeners.size

      expect(listenersAfter).toBeLessThan(listenersBefore)
    })

    it('should handle multiple hooks subscribing to the same store', () => {
      const useStore = createKtnGitLikeHook(store)
      const { result: result1 } = renderHook(() => useStore((s) => s.stashData.name))
      const { result: result2 } = renderHook(() => useStore((s) => s.stashData.count))

      expect(result1.current).toBe('test')
      expect(result2.current).toBe(0)

      act(() => {
        store.stash({ name: 'updated', count: 5 })
      })

      expect(result1.current).toBe('updated')
      expect(result2.current).toBe(5)
    })
  })

  describe('edge cases', () => {
    it('should handle rapid state updates', () => {
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore((s) => s.stashData.count))

      act(() => {
        store.stashField('count', 1)
        store.stashField('count', 2)
        store.stashField('count', 3)
      })

      expect(result.current).toBe(3)
    })

    it('should work with null or undefined values', () => {
      const nullStore = new GitLikeStore<{ value: string | null }>({ value: null })
      const useStore = createKtnGitLikeHook(nullStore)
      const { result } = renderHook(() => useStore((s) => s.stashData.value))

      expect(result.current).toBeNull()

      act(() => {
        nullStore.stashField('value', 'not-null')
      })

      expect(result.current).toBe('not-null')
    })

    it('should handle store with array data', () => {
      const arrayStore = new GitLikeStore<string[]>(['a', 'b', 'c'])
      const useStore = createKtnGitLikeHook(arrayStore)
      const { result } = renderHook(() => useStore((s) => s.stashData))

      expect(result.current).toEqual(['a', 'b', 'c'])

      act(() => {
        // Use function updater for arrays to avoid merge behavior
        arrayStore.stash(() => ['x', 'y', 'z'])
      })

      expect(result.current).toEqual(['x', 'y', 'z'])
    })

    it('should handle store with primitive data', () => {
      const primitiveStore = new GitLikeStore<number>(42)
      const useStore = createKtnGitLikeHook(primitiveStore)
      const { result } = renderHook(() => useStore((s) => s.stashData))

      expect(result.current).toBe(42)

      act(() => {
        primitiveStore.stash(100)
      })

      expect(result.current).toBe(100)
    })
  })

  describe('git-like workflow with hook', () => {
    it('should support complete git-like workflow through hook', () => {
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() => useStore())

      // Initial state
      expect(result.current.stashData).toEqual(initialData)
      expect(result.current.commitData).toEqual(initialData)

      // Stash changes
      act(() => {
        store.stash({ name: 'working', count: 5 })
      })

      expect(result.current.stashData).toEqual({ name: 'working', count: 5 })
      expect(result.current.commitData).toEqual(initialData)

      // Commit changes
      act(() => {
        store.commit()
      })

      expect(result.current.stashData).toEqual({ name: 'working', count: 5 })
      expect(result.current.commitData).toEqual({ name: 'working', count: 5 })

      // Make new changes
      act(() => {
        store.stashField('count', 10)
      })

      expect(result.current.stashData.count).toBe(10)
      expect(result.current.commitData.count).toBe(5)

      // Discard changes
      act(() => {
        store.discard()
      })

      expect(result.current.stashData).toEqual({ name: 'working', count: 5 })
      expect(result.current.commitData).toEqual({ name: 'working', count: 5 })
    })

    it('should track modifications correctly through hook', () => {
      const useStore = createKtnGitLikeHook(store)
      const { result } = renderHook(() =>
        useStore((s) => ({
          hasChanges: JSON.stringify(s.stashData) !== JSON.stringify(s.commitData),
          stash: s.stashData,
          commit: s.commitData,
        }))
      )

      expect(result.current.hasChanges).toBe(false)

      act(() => {
        store.stashField('name', 'modified')
      })

      expect(result.current.hasChanges).toBe(true)

      act(() => {
        store.commit()
      })

      expect(result.current.hasChanges).toBe(false)
    })
  })

  describe('type safety', () => {
    it('should maintain type safety with TypeScript', () => {
      const useStore = createKtnGitLikeHook(store)

      // This test is more about compilation than runtime
      const { result } = renderHook(() =>
        useStore((state) => {
          // These should all be type-safe
          const name: string = state.stashData.name
          const count: number = state.stashData.count
          return { name, count }
        })
      )

      expect(result.current.name).toBe('test')
      expect(result.current.count).toBe(0)
    })
  })
})
