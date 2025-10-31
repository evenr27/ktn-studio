export interface Persistence<T> {
  load(): T | null
  save(state: T): void
}

export class LocalStoragePersistence<T> implements Persistence<T> {
  constructor(private key: string) {}

  load(): T | null {
    if (typeof window === 'undefined') return null
    const raw = window.localStorage.getItem(this.key)
    return raw ? (JSON.parse(raw) as T) : null
  }

  save(state: T): void {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(this.key, JSON.stringify(state))
  }
}

export class SessionStoragePersistence<T> implements Persistence<T> {
  constructor(private key: string) {}

  load(): T | null {
    if (typeof window === 'undefined') return null
    const raw = window.sessionStorage.getItem(this.key)
    return raw ? (JSON.parse(raw) as T) : null
  }

  save(state: T): void {
    if (typeof window === 'undefined') return
    window.sessionStorage.setItem(this.key, JSON.stringify(state))
  }
}
