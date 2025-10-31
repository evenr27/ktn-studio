/* eslint-disable @typescript-eslint/no-explicit-any */
export type StoreListener<T> = (state: T, prevState: T) => void

type Selector<T, S> = (state: T) => S
type EqualityFn<S> = (a: S, b: S) => boolean

export class BaseStore<T extends object> {
  protected state: T
  private listeners: Set<StoreListener<T>> = new Set()
  // listeners por selector (como zustand select)
  private selectorListeners: Array<{
    selector: Selector<T, any>
    equalityFn: EqualityFn<any>
    currentSlice: any
    cb: (slice: any, prevSlice: any) => void
  }> = []

  constructor(initialState: T) {
    this.state = initialState
  }

  getState(): T {
    return this.state
  }

  /**
   * setState soporta:
   * - objeto parcial
   * - updater(prev) => next
   */
  setState(updater: Partial<T> | ((prev: T) => T)): void {
    const prev = this.state
    const next =
      typeof updater === 'function'
        ? (updater as (p: T) => T)(prev)
        : ({ ...prev, ...updater } as T)

    // si no cambió nada, no notificamos
    if (Object.is(prev, next)) {
      return
    }

    this.state = next
    this.notify(next, prev)
    this.notifySelectors(next, prev)
  }

  /**
   * Reemplazar todo el estado (útil para hydrate)
   */
  replaceState(next: T): void {
    const prev = this.state
    if (Object.is(prev, next)) return
    this.state = next
    this.notify(next, prev)
    this.notifySelectors(next, prev)
  }

  /**
   * Suscripción simple (todo el estado)
   */
  subscribe(listener: StoreListener<T>): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  /**
   * Suscripción con selector (como zustand)
   * El listener solo se llama cuando cambia el slice
   */
  subscribeSelector<S>(
    selector: Selector<T, S>,
    cb: (slice: S, prevSlice: S) => void,
    equalityFn: EqualityFn<S> = Object.is
  ): () => void {
    const slice = selector(this.state)
    const entry = {
      selector,
      equalityFn,
      currentSlice: slice,
      cb,
    }
    this.selectorListeners.push(entry)

    return () => {
      this.selectorListeners = this.selectorListeners.filter((x) => x !== entry)
    }
  }

  protected notify(next: T, prev: T): void {
    for (const listener of this.listeners) {
      listener(next, prev)
    }
  }

  protected notifySelectors(next: T, prev: T): void {
    for (const entry of this.selectorListeners) {
      const prevSlice = entry.selector(prev)
      const nextSlice = entry.selector(next)
      if (!entry.equalityFn(nextSlice, prevSlice)) {
        entry.currentSlice = nextSlice
        entry.cb(nextSlice, prevSlice)
      }
    }
  }
}
