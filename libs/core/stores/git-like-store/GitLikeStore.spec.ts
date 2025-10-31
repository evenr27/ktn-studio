import { GitLikeStore } from './GitLikeStore'

interface TestData {
  name: string
  value: number
}

describe('GitLikeStore', () => {
  let store: GitLikeStore<TestData>
  const initialData: TestData = { name: 'initial', value: 0 }

  beforeEach(() => {
    store = new GitLikeStore<TestData>(initialData)
  })

  describe('initialization', () => {
    it('should initialize stash and commit with the same data', () => {
      expect(store.getStashData()).toEqual(initialData)
      expect(store.getCommitData()).toEqual(initialData)
    })
  })

  describe('getStashData', () => {
    it('should return the stash data', () => {
      expect(store.getStashData()).toEqual({ name: 'initial', value: 0 })
    })
  })

  describe('getCommitData', () => {
    it('should return the commit data', () => {
      expect(store.getCommitData()).toEqual({ name: 'initial', value: 0 })
    })
  })

  describe('stash', () => {
    it('should update stash data with partial object', () => {
      store.stash({ value: 10 })

      expect(store.getStashData()).toEqual({ name: 'initial', value: 10 })
      expect(store.getCommitData()).toEqual({ name: 'initial', value: 0 })
    })

    it('should update stash data with updater function', () => {
      store.stash((prev) => ({ ...prev, value: prev.value + 5 }))

      expect(store.getStashData()).toEqual({ name: 'initial', value: 5 })
      expect(store.getCommitData()).toEqual({ name: 'initial', value: 0 })
    })

    it('should allow multiple stash operations', () => {
      store.stash({ value: 10 })
      store.stash({ name: 'updated' })

      expect(store.getStashData()).toEqual({ name: 'updated', value: 10 })
      expect(store.getCommitData()).toEqual({ name: 'initial', value: 0 })
    })
  })

  describe('stashField', () => {
    it('should update a single field in stash', () => {
      store.stashField('name', 'modified')

      expect(store.getStashData()).toEqual({ name: 'modified', value: 0 })
      expect(store.getCommitData()).toEqual({ name: 'initial', value: 0 })
    })

    it('should update multiple fields individually', () => {
      store.stashField('name', 'first')
      store.stashField('value', 99)

      expect(store.getStashData()).toEqual({ name: 'first', value: 99 })
      expect(store.getCommitData()).toEqual({ name: 'initial', value: 0 })
    })
  })

  describe('commit', () => {
    it('should commit stash data to commit data', () => {
      store.stash({ name: 'staged', value: 20 })
      store.commit()

      expect(store.getStashData()).toEqual({ name: 'staged', value: 20 })
      expect(store.getCommitData()).toEqual({ name: 'staged', value: 20 })
    })

    it('should keep committed data after commit', () => {
      store.stash({ name: 'committed', value: 100 })
      store.commit()

      // Further stash changes should not affect commit
      store.stash({ value: 200 })

      expect(store.getStashData()).toEqual({ name: 'committed', value: 200 })
      expect(store.getCommitData()).toEqual({ name: 'committed', value: 100 })
    })
  })

  describe('discard', () => {
    it('should discard stash changes and restore commit data', () => {
      store.stash({ name: 'temporary', value: 50 })
      store.discard()

      expect(store.getStashData()).toEqual({ name: 'initial', value: 0 })
      expect(store.getCommitData()).toEqual({ name: 'initial', value: 0 })
    })

    it('should discard only stash, not affecting previous commits', () => {
      store.stash({ name: 'first-change', value: 10 })
      store.commit()

      store.stash({ name: 'second-change', value: 20 })
      store.discard()

      expect(store.getStashData()).toEqual({ name: 'first-change', value: 10 })
      expect(store.getCommitData()).toEqual({ name: 'first-change', value: 10 })
    })
  })

  describe('resetAll', () => {
    it('should reset both stash and commit to commit data', () => {
      store.stash({ name: 'stashed', value: 30 })
      store.resetAll()

      expect(store.getStashData()).toEqual({ name: 'initial', value: 0 })
      expect(store.getCommitData()).toEqual({ name: 'initial', value: 0 })
    })

    it('should work after multiple operations', () => {
      store.stash({ value: 10 })
      store.commit()
      store.stash({ value: 20 })
      store.resetAll()

      expect(store.getStashData()).toEqual({ name: 'initial', value: 10 })
      expect(store.getCommitData()).toEqual({ name: 'initial', value: 10 })
    })
  })

  describe('git-like workflow', () => {
    it('should support typical git-like workflow: stash -> commit -> stash -> discard', () => {
      // Make changes
      store.stash({ name: 'version-1', value: 1 })
      expect(store.getStashData()).toEqual({ name: 'version-1', value: 1 })

      // Commit changes
      store.commit()
      expect(store.getCommitData()).toEqual({ name: 'version-1', value: 1 })

      // Make more changes
      store.stash({ value: 2 })
      expect(store.getStashData()).toEqual({ name: 'version-1', value: 2 })

      // Discard uncommitted changes
      store.discard()
      expect(store.getStashData()).toEqual({ name: 'version-1', value: 1 })
      expect(store.getCommitData()).toEqual({ name: 'version-1', value: 1 })
    })
  })

  describe('listeners', () => {
    it('should notify listeners on stash changes', () => {
      const listener = jest.fn()
      store.subscribe(listener)

      store.stash({ value: 15 })

      expect(listener).toHaveBeenCalledTimes(1)
      expect(listener).toHaveBeenCalledWith(
        {
          stashData: { name: 'initial', value: 15 },
          commitData: { name: 'initial', value: 0 },
        },
        {
          stashData: { name: 'initial', value: 0 },
          commitData: { name: 'initial', value: 0 },
        }
      )
    })

    it('should notify listeners on commit', () => {
      const listener = jest.fn()
      store.stash({ value: 25 })
      store.subscribe(listener)

      store.commit()

      expect(listener).toHaveBeenCalledTimes(1)
      expect(listener).toHaveBeenCalledWith(
        {
          stashData: { name: 'initial', value: 25 },
          commitData: { name: 'initial', value: 25 },
        },
        {
          stashData: { name: 'initial', value: 25 },
          commitData: { name: 'initial', value: 0 },
        }
      )
    })

    it('should notify listeners on discard', () => {
      const listener = jest.fn()
      store.stash({ value: 35 })
      store.subscribe(listener)

      store.discard()

      expect(listener).toHaveBeenCalledTimes(1)
      expect(listener).toHaveBeenCalledWith(
        {
          stashData: { name: 'initial', value: 0 },
          commitData: { name: 'initial', value: 0 },
        },
        {
          stashData: { name: 'initial', value: 35 },
          commitData: { name: 'initial', value: 0 },
        }
      )
    })
  })
})
