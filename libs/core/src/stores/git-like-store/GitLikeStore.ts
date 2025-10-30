import { BaseStore } from '../base-store/BaseStore'

export type GitLikeState<T extends object> = {
  stashData: T
  commitData: T
}

export class GitLikeStore<T extends object> extends BaseStore<GitLikeState<T>> {
  constructor(initialData: T) {
    super({
      stashData: initialData,
      commitData: initialData,
    })
  }

  // --- getters ---
  getStashData(): T {
    return this.state.stashData
  }

  getCommitData(): T {
    return this.state.commitData
  }

  // --- stash ---
  stash(patch: Partial<T> | ((prev: T) => T)): void {
    const prev = this.state.stashData
    const next =
      typeof patch === 'function'
        ? (patch as (p: T) => T)(prev)
        : ({ ...prev, ...patch } as T)

    this.setState({
      ...this.state,
      stashData: next,
    })
  }

  stashField<K extends keyof T>(key: K, value: T[K]): void {
    const prev = this.state.stashData
    this.setState({
      ...this.state,
      stashData: {
        ...prev,
        [key]: value,
      } as T,
    })
  }

  // --- commit / discard ---
  commit(): void {
    const { stashData } = this.state
    this.setState({
      stashData,
      commitData: stashData,
    })
  }

  discard(): void {
    const { commitData } = this.state
    this.setState({
      ...this.state,
      stashData: commitData,
    })
  }

  /**
   * Solo resetea el stash al último commit
   * (no toca el commitData)
   */
  resetStash(): void {
    const { commitData } = this.state
    this.setState({
      ...this.state,
      stashData: commitData,
    })
  }

  /**
   * Resetea stash y commit al commit actual
   * (útil cuando querés volver al "estado base")
   */
  resetAll(): void {
    const { commitData } = this.state
    this.setState({
      stashData: commitData,
      commitData,
    })
  }

  /**
   * Para hidratar desde afuera (ej: cargar formulario)
   */
  hydrate(stashData: T, commitData?: T): void {
    this.setState({
      stashData,
      commitData: commitData ?? stashData,
    })
  }

  /**
   * Selector sencillo, por si después lo querés
   * usar en el hook adaptador
   */
  select<R>(selector: (state: GitLikeState<T>) => R): R {
    return selector(this.state)
  }
}