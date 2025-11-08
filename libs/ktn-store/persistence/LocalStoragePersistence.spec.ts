import { LocalStoragePersistence } from './persistence'

interface TestState {
  count: number
  name: string
}

describe('LocalStoragePersistence', () => {
  const storageKey = 'test-local-storage-key'
  let persistence: LocalStoragePersistence<TestState>

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    persistence = new LocalStoragePersistence<TestState>(storageKey)
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('save and load', () => {
    it('should save state to localStorage', () => {
      const state: TestState = { count: 42, name: 'test' }

      persistence.save(state)

      const raw = localStorage.getItem(storageKey)
      expect(raw).toBe(JSON.stringify(state))
    })

    it('should load state from localStorage', () => {
      const state: TestState = { count: 42, name: 'test' }
      localStorage.setItem(storageKey, JSON.stringify(state))

      const loaded = persistence.load()

      expect(loaded).toEqual(state)
    })

    it('should return null if key does not exist', () => {
      const loaded = persistence.load()
      expect(loaded).toBeNull()
    })

    it('should handle save and load roundtrip', () => {
      const state: TestState = { count: 99, name: 'roundtrip' }

      persistence.save(state)
      const loaded = persistence.load()

      expect(loaded).toEqual(state)
    })

    it('should overwrite existing data on save', () => {
      const state1: TestState = { count: 1, name: 'first' }
      const state2: TestState = { count: 2, name: 'second' }

      persistence.save(state1)
      persistence.save(state2)

      const loaded = persistence.load()
      expect(loaded).toEqual(state2)
    })
  })

  describe('clear', () => {
    it('should remove state from localStorage', () => {
      const state: TestState = { count: 42, name: 'test' }
      persistence.save(state)

      expect(localStorage.getItem(storageKey)).not.toBeNull()

      persistence.clear()

      expect(localStorage.getItem(storageKey)).toBeNull()
    })

    it('should not throw if key does not exist', () => {
      expect(() => persistence.clear()).not.toThrow()
    })

    it('should make load return null after clear', () => {
      const state: TestState = { count: 42, name: 'test' }
      persistence.save(state)

      persistence.clear()

      const loaded = persistence.load()
      expect(loaded).toBeNull()
    })
  })

  describe('error handling', () => {
    it('should return null on load if JSON is invalid', () => {
      localStorage.setItem(storageKey, 'invalid-json{')

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      const loaded = persistence.load()

      expect(loaded).toBeNull()
      expect(consoleErrorSpy).toHaveBeenCalled()

      consoleErrorSpy.mockRestore()
    })

    it('should handle save errors gracefully', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      // Mock localStorage.setItem to throw
      const setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError')
      })

      const state: TestState = { count: 42, name: 'test' }

      expect(() => persistence.save(state)).not.toThrow()
      expect(consoleErrorSpy).toHaveBeenCalled()

      setItemSpy.mockRestore()
      consoleErrorSpy.mockRestore()
    })

    it('should handle clear errors gracefully', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      // Mock localStorage.removeItem to throw
      const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('Storage error')
      })

      expect(() => persistence.clear()).not.toThrow()
      expect(consoleErrorSpy).toHaveBeenCalled()

      removeItemSpy.mockRestore()
      consoleErrorSpy.mockRestore()
    })
  })

  describe('complex data types', () => {
    it('should handle nested objects', () => {
      interface NestedState {
        user: { name: string; age: number }
        settings: { theme: string }
      }
      const persistence = new LocalStoragePersistence<NestedState>(storageKey)
      const state: NestedState = {
        user: { name: 'John', age: 30 },
        settings: { theme: 'dark' },
      }

      persistence.save(state)
      const loaded = persistence.load()

      expect(loaded).toEqual(state)
    })

    it('should handle arrays', () => {
      const persistence = new LocalStoragePersistence<number[]>(storageKey)
      const state = [1, 2, 3, 4, 5]

      persistence.save(state)
      const loaded = persistence.load()

      expect(loaded).toEqual(state)
    })

    it('should handle null values in state', () => {
      interface NullableState {
        value: string | null
      }
      const persistence = new LocalStoragePersistence<NullableState>(storageKey)
      const state: NullableState = { value: null }

      persistence.save(state)
      const loaded = persistence.load()

      expect(loaded).toEqual(state)
    })

    it('should handle boolean and number primitives in objects', () => {
      interface MixedState {
        isActive: boolean
        count: number
        name: string
      }
      const persistence = new LocalStoragePersistence<MixedState>(storageKey)
      const state: MixedState = { isActive: true, count: 0, name: 'test' }

      persistence.save(state)
      const loaded = persistence.load()

      expect(loaded).toEqual(state)
    })
  })

  describe('multiple instances', () => {
    it('should not interfere with different keys', () => {
      const persistence1 = new LocalStoragePersistence<TestState>('key1')
      const persistence2 = new LocalStoragePersistence<TestState>('key2')

      const state1: TestState = { count: 1, name: 'first' }
      const state2: TestState = { count: 2, name: 'second' }

      persistence1.save(state1)
      persistence2.save(state2)

      expect(persistence1.load()).toEqual(state1)
      expect(persistence2.load()).toEqual(state2)
    })

    it('should clear only its own key', () => {
      const persistence1 = new LocalStoragePersistence<TestState>('key1')
      const persistence2 = new LocalStoragePersistence<TestState>('key2')

      const state: TestState = { count: 1, name: 'test' }

      persistence1.save(state)
      persistence2.save(state)

      persistence1.clear()

      expect(persistence1.load()).toBeNull()
      expect(persistence2.load()).toEqual(state)
    })
  })

  describe('SSR compatibility', () => {
    it('should handle undefined window gracefully', () => {
      // Simulate SSR environment
      const originalWindow = global.window
      // @ts-expect-error Testing SSR
      delete global.window

      const ssrPersistence = new LocalStoragePersistence<TestState>(storageKey)

      expect(ssrPersistence.load()).toBeNull()
      expect(() => ssrPersistence.save({ count: 1, name: 'test' })).not.toThrow()
      expect(() => ssrPersistence.clear()).not.toThrow()

      // Restore window
      global.window = originalWindow
    })
  })
})
