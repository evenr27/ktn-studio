/**
 * Port (interface) for persistence adapters.
 *
 * Defines the contract for storing and retrieving state.
 * Implementations can use localStorage, sessionStorage, IndexedDB, etc.
 */
export interface Persistence<T> {
  /**
   * Load state from storage.
   * @returns The stored state, or null if not found or invalid.
   */
  load(): T | null

  /**
   * Save state to storage.
   * @param state - The state to persist.
   */
  save(state: T): void

  /**
   * Clear stored state.
   * Removes all data associated with this persistence instance.
   */
  clear(): void
}

/**
 * Adapter for localStorage persistence.
 *
 * Stores state in browser localStorage (persists across sessions).
 */
export class LocalStoragePersistence<T> implements Persistence<T> {
  constructor(private key: string) {}

  load(): T | null {
    if (typeof window === 'undefined') return null
    try {
      const raw = window.localStorage.getItem(this.key)
      return raw ? (JSON.parse(raw) as T) : null
    } catch (error) {
      console.error(`Failed to load from localStorage (key: ${this.key})`, error)
      return null
    }
  }

  save(state: T): void {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(this.key, JSON.stringify(state))
    } catch (error) {
      console.error(`Failed to save to localStorage (key: ${this.key})`, error)
    }
  }

  clear(): void {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.removeItem(this.key)
    } catch (error) {
      console.error(`Failed to clear localStorage (key: ${this.key})`, error)
    }
  }
}

/**
 * Adapter for sessionStorage persistence.
 *
 * Stores state in browser sessionStorage (cleared when tab/window closes).
 */
export class SessionStoragePersistence<T> implements Persistence<T> {
  constructor(private key: string) {}

  load(): T | null {
    if (typeof window === 'undefined') return null
    try {
      const raw = window.sessionStorage.getItem(this.key)
      return raw ? (JSON.parse(raw) as T) : null
    } catch (error) {
      console.error(`Failed to load from sessionStorage (key: ${this.key})`, error)
      return null
    }
  }

  save(state: T): void {
    if (typeof window === 'undefined') return
    try {
      window.sessionStorage.setItem(this.key, JSON.stringify(state))
    } catch (error) {
      console.error(`Failed to save to sessionStorage (key: ${this.key})`, error)
    }
  }

  clear(): void {
    if (typeof window === 'undefined') return
    try {
      window.sessionStorage.removeItem(this.key)
    } catch (error) {
      console.error(`Failed to clear sessionStorage (key: ${this.key})`, error)
    }
  }
}
