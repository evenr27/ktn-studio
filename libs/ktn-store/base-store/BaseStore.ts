/* eslint-disable @typescript-eslint/no-explicit-any */
export type StoreListener<T> = (state: T, prevState: T) => void

type Selector<T, S> = (state: T) => S
type EqualityFn<S> = (a: S, b: S) => boolean

/**
 * Abstract base class for all stores in ktn-store.
 *
 * Provides core functionality for state management, subscriptions, and selectors.
 * Concrete implementations must extend this class.
 *
 * @example
 * ```typescript
 * class MyStore extends BaseStore<MyState> {
 *   // Implementation
 * }
 * ```
 */
export abstract class BaseStore<T = unknown> {
  protected state: T
  private listeners: Set<StoreListener<T>> = new Set()
  private selectorListeners: Array<{
    selector: Selector<T, any>
    equalityFn: EqualityFn<any>
    cb: (slice: any, prevSlice: any) => void
  }> = []

  constructor(initialState: T) {
    this.state = initialState
  }

  /**
   * Get the current state.
   * Can be overridden by subclasses for custom behavior.
   */
  getState(): T {
    return this.state
  }

  /**
   * Update the state.
   * Notifies all subscribers after state change.
   */
  setState(updater: Partial<T> | ((prev: T) => T) | T): void {
    const prev = this.state
    let next: T

    if (typeof updater === 'function') {
      next = (updater as (p: T) => T)(prev)
    } else if (
      typeof updater === 'object' &&
      updater !== null &&
      typeof prev === 'object' &&
      prev !== null
    ) {
      next = { ...(prev as any), ...(updater as any) } as T
    } else {
      next = updater as T
    }

    if (Object.is(prev, next)) return

    this.state = next
    this.notify(next, prev)
    this.notifySelectors(next, prev)
  }

  replaceState(next: T): void {
    const prev = this.state
    if (Object.is(prev, next)) return
    this.state = next
    this.notify(next, prev)
    this.notifySelectors(next, prev)
  }

  subscribe(listener: StoreListener<T>): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  subscribeSelector<S>(
    selector: Selector<T, S>,
    cb: (slice: S, prevSlice: S) => void,
    equalityFn: EqualityFn<S> = Object.is
  ): () => void {
    const entry = { selector, equalityFn, cb }
    this.selectorListeners.push(entry)
    return () => {
      this.selectorListeners = this.selectorListeners.filter((x) => x !== entry)
    }
  }

  protected notify(next: T, prev: T): void {
    for (const l of this.listeners) {
      l(next, prev)
    }
  }

  protected notifySelectors(next: T, prev: T): void {
    for (const entry of this.selectorListeners) {
      const prevSlice = entry.selector(prev)
      const nextSlice = entry.selector(next)
      if (!entry.equalityFn(nextSlice, prevSlice)) {
        entry.cb(nextSlice, prevSlice)
      }
    }
  }
}
