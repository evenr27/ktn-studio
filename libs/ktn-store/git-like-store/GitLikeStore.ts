/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseStore } from '../base-store'

export type GitLikeState<T = unknown> = {
  stashData: T
  commitData: T
}

export class GitLikeStore<T = unknown> extends BaseStore<GitLikeState<T>> {
  constructor(initialData: T) {
    super({
      stashData: initialData,
      commitData: initialData,
    })
  }

  getStashData(): T {
    return this.state.stashData
  }

  getCommitData(): T {
    return this.state.commitData
  }

  stash(patch: Partial<T> | ((prev: T) => T) | T): void {
    const prev = this.state.stashData
    let next: T

    if (typeof patch === 'function') {
      next = (patch as (p: T) => T)(prev)
    } else if (
      typeof prev === 'object' &&
      prev !== null &&
      typeof patch === 'object' &&
      patch !== null
    ) {
      next = { ...(prev as any), ...(patch as any) } as T
    } else {
      next = patch as T
    }

    this.setState({
      ...this.state,
      stashData: next,
    })
  }

  stashField<K extends keyof T>(key: K, value: T[K]): void {
    const prev = this.state.stashData
    if (typeof prev !== 'object' || prev === null) {
      throw new Error('stashField can only be used when stashData is an object')
    }
    this.setState({
      ...this.state,
      stashData: {
        ...(prev as any),
        [key]: value,
      } as T,
    })
  }

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

  resetStash(): void {
    const { commitData } = this.state
    this.setState({
      ...this.state,
      stashData: commitData,
    })
  }

  resetAll(): void {
    const { commitData } = this.state
    this.setState({
      stashData: commitData,
      commitData,
    })
  }

  hydrate(stashData: T, commitData?: T): void {
    this.setState({
      stashData,
      commitData: commitData ?? stashData,
    })
  }

  select<R>(selector: (s: GitLikeState<T>) => R): R {
    return selector(this.state)
  }
}
