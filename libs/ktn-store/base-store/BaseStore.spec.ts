/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseStore } from './BaseStore'

/**
 * Concrete implementation of BaseStore for testing.
 * Since BaseStore is abstract, we need a concrete class to test it.
 */
class TestStore extends BaseStore<{ count: number }> {
  // No additional implementation needed for basic tests
}

describe('BaseStore', () => {
  describe('constructor and getState', () => {
    it('should initialize with provided state', () => {
      const store = new TestStore({ count: 0 })
      expect(store.getState()).toEqual({ count: 0 })
    })

    it('should initialize with complex state', () => {
      const initialState = {
        count: 42,
      }
      const store = new TestStore(initialState)
      expect(store.getState()).toEqual(initialState)
    })
  })

  describe('setState', () => {
    it('should update state with partial object', () => {
      const store = new TestStore({ count: 0 })
      store.setState({ count: 1 })
      expect(store.getState()).toEqual({ count: 1 })
    })

    it('should update state with updater function', () => {
      const store = new TestStore({ count: 5 })
      store.setState((prev) => ({ count: prev.count + 10 }))
      expect(store.getState()).toEqual({ count: 15 })
    })

    it('should replace entire state when not an object', () => {
      class PrimitiveStore extends BaseStore<number> {}
      const store = new PrimitiveStore(0)
      store.setState(42)
      expect(store.getState()).toBe(42)
    })

    it('should not update if state reference is identical (Object.is)', () => {
      const store = new TestStore({ count: 1 })
      const listener = jest.fn()
      store.subscribe(listener)

      // Get current state reference
      const currentState = store.getState()

      // Set with same reference using updater function that returns same object
      store.setState(() => currentState)

      // Should NOT notify because reference is the same
      expect(listener).not.toHaveBeenCalled()
    })
  })

  describe('replaceState', () => {
    it('should replace entire state', () => {
      const store = new TestStore({ count: 0 })
      const newState = { count: 100 }
      store.replaceState(newState)
      expect(store.getState()).toEqual(newState)
    })

    it('should not notify if state is identical', () => {
      const store = new TestStore({ count: 1 })
      const listener = jest.fn()
      store.subscribe(listener)

      const currentState = store.getState()
      store.replaceState(currentState)
      expect(listener).not.toHaveBeenCalled()
    })
  })

  describe('subscribe', () => {
    it('should notify listener on state change', () => {
      const store = new TestStore({ count: 0 })
      const listener = jest.fn()

      store.subscribe(listener)
      store.setState({ count: 1 })

      expect(listener).toHaveBeenCalledTimes(1)
      expect(listener).toHaveBeenCalledWith({ count: 1 }, { count: 0 })
    })

    it('should notify multiple listeners', () => {
      const store = new TestStore({ count: 0 })
      const listener1 = jest.fn()
      const listener2 = jest.fn()

      store.subscribe(listener1)
      store.subscribe(listener2)
      store.setState({ count: 5 })

      expect(listener1).toHaveBeenCalledWith({ count: 5 }, { count: 0 })
      expect(listener2).toHaveBeenCalledWith({ count: 5 }, { count: 0 })
    })

    it('should return unsubscribe function', () => {
      const store = new TestStore({ count: 0 })
      const listener = jest.fn()

      const unsubscribe = store.subscribe(listener)

      store.setState({ count: 1 })
      expect(listener).toHaveBeenCalledTimes(1)

      unsubscribe()

      store.setState({ count: 2 })
      expect(listener).toHaveBeenCalledTimes(1) // Not called after unsubscribe
    })

    it('should not notify unsubscribed listeners', () => {
      const store = new TestStore({ count: 0 })
      const listener1 = jest.fn()
      const listener2 = jest.fn()

      const unsub1 = store.subscribe(listener1)
      store.subscribe(listener2)

      unsub1() // Unsubscribe first listener

      store.setState({ count: 1 })

      expect(listener1).not.toHaveBeenCalled()
      expect(listener2).toHaveBeenCalledTimes(1)
    })
  })

  describe('subscribeSelector', () => {
    it('should notify only when selected slice changes', () => {
      const store = new TestStore({ count: 0 })
      const selector = (state: { count: number }) => state.count
      const callback = jest.fn()

      store.subscribeSelector(selector, callback)

      store.setState({ count: 1 })
      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback).toHaveBeenCalledWith(1, 0)
    })

    it('should not notify if selected slice is equal', () => {
      const store = new TestStore({ count: 5 })
      const selector = (state: { count: number }) => state.count
      const callback = jest.fn()

      store.subscribeSelector(selector, callback)

      // Update with same count
      store.setState({ count: 5 })
      expect(callback).not.toHaveBeenCalled()
    })

    it('should use custom equality function', () => {
      const store = new TestStore({ count: 5 })
      const selector = (state: { count: number }) => state.count
      const callback = jest.fn()
      const alwaysEqual = () => true // Always consider equal

      store.subscribeSelector(selector, callback, alwaysEqual)

      store.setState({ count: 10 })
      expect(callback).not.toHaveBeenCalled() // Custom equality says they're equal
    })

    it('should return unsubscribe function', () => {
      const store = new TestStore({ count: 0 })
      const selector = (state: { count: number }) => state.count
      const callback = jest.fn()

      const unsubscribe = store.subscribeSelector(selector, callback)

      store.setState({ count: 1 })
      expect(callback).toHaveBeenCalledTimes(1)

      unsubscribe()

      store.setState({ count: 2 })
      expect(callback).toHaveBeenCalledTimes(1) // Not called after unsubscribe
    })

    it('should support multiple selector subscriptions', () => {
      const store = new TestStore({ count: 0 })
      const selector1 = (state: { count: number }) => state.count
      const selector2 = (state: { count: number }) => state.count * 2
      const callback1 = jest.fn()
      const callback2 = jest.fn()

      store.subscribeSelector(selector1, callback1)
      store.subscribeSelector(selector2, callback2)

      store.setState({ count: 5 })

      expect(callback1).toHaveBeenCalledWith(5, 0)
      expect(callback2).toHaveBeenCalledWith(10, 0)
    })
  })

  describe('edge cases', () => {
    it('should handle null state', () => {
      class NullableStore extends BaseStore<{ data: string | null }> {}
      const store = new NullableStore({ data: null })
      expect(store.getState()).toEqual({ data: null })

      store.setState({ data: 'value' })
      expect(store.getState()).toEqual({ data: 'value' })
    })

    it('should handle undefined values in state', () => {
      class OptionalStore extends BaseStore<{ value?: number }> {}
      const store = new OptionalStore({})
      expect(store.getState()).toEqual({})

      store.setState({ value: 42 })
      expect(store.getState()).toEqual({ value: 42 })
    })

    it('should handle array state', () => {
      class ArrayStore extends BaseStore<number[]> {
        // Override setState to handle arrays properly
        setState(updater: Partial<number[]> | ((prev: number[]) => number[]) | number[]): void {
          const prev = this.state
          let next: number[]

          if (typeof updater === 'function') {
            next = (updater as (p: number[]) => number[])(prev)
          } else {
            // For arrays, replace entirely instead of spreading
            next = Array.isArray(updater) ? updater : prev
          }

          if (Object.is(prev, next)) return

          this.state = next
          this.notify(next, prev)
          this.notifySelectors(next, prev)
        }
      }

      const store = new ArrayStore([1, 2, 3])
      expect(store.getState()).toEqual([1, 2, 3])

      store.setState([4, 5, 6])
      expect(store.getState()).toEqual([4, 5, 6])
    })
  })
})
