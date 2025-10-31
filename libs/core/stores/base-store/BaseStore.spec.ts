import { BaseStore } from './BaseStore'

interface TestState {
  count: number
  name: string
}

describe('BaseStore', () => {
  let store: BaseStore<TestState>
  const initialState: TestState = { count: 0, name: 'test' }

  beforeEach(() => {
    store = new BaseStore<TestState>(initialState)
  })

  describe('initialization', () => {
    it('should initialize with the provided state', () => {
      expect(store.getState()).toEqual(initialState)
    })
  })

  describe('getState', () => {
    it('should return the current state', () => {
      const state = store.getState()
      expect(state).toEqual({ count: 0, name: 'test' })
    })
  })

  describe('setState', () => {
    it('should update state with partial object', () => {
      store.setState({ count: 5 })
      expect(store.getState()).toEqual({ count: 5, name: 'test' })
    })

    it('should update state with updater function', () => {
      store.setState((prev) => ({ ...prev, count: prev.count + 1 }))
      expect(store.getState()).toEqual({ count: 1, name: 'test' })
    })

    it('should allow multiple updates', () => {
      store.setState({ count: 10 })
      store.setState({ name: 'updated' })
      expect(store.getState()).toEqual({ count: 10, name: 'updated' })
    })
  })

  describe('subscribe', () => {
    it('should call listener when state changes', () => {
      const listener = jest.fn()
      store.subscribe(listener)

      store.setState({ count: 1 })

      expect(listener).toHaveBeenCalledTimes(1)
      expect(listener).toHaveBeenCalledWith(
        { count: 1, name: 'test' }, // new state
        { count: 0, name: 'test' }  // prev state
      )
    })

    it('should support multiple listeners', () => {
      const listener1 = jest.fn()
      const listener2 = jest.fn()

      store.subscribe(listener1)
      store.subscribe(listener2)

      store.setState({ count: 2 })

      expect(listener1).toHaveBeenCalledTimes(1)
      expect(listener2).toHaveBeenCalledTimes(1)
    })

    it('should return unsubscribe function', () => {
      const listener = jest.fn()
      const unsubscribe = store.subscribe(listener)

      store.setState({ count: 1 })
      expect(listener).toHaveBeenCalledTimes(1)

      unsubscribe()

      store.setState({ count: 2 })
      expect(listener).toHaveBeenCalledTimes(1) // no additional calls
    })

    it('should not call listeners after unsubscribe', () => {
      const listener = jest.fn()
      const unsubscribe = store.subscribe(listener)

      unsubscribe()
      store.setState({ count: 5 })

      expect(listener).not.toHaveBeenCalled()
    })
  })
})
