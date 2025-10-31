import { LocalStoragePersistence, SessionStoragePersistence } from './persistence'

interface TestState {
  id: string
  count: number
}

// Mock localStorage and sessionStorage for Node.js environment
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    clear: () => {
      store = {}
    },
  }
})()

const sessionStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    clear: () => {
      store = {}
    },
  }
})()

// Mock window object for Node.js environment
Object.defineProperty(global, 'window', {
  value: {
    localStorage: localStorageMock,
    sessionStorage: sessionStorageMock,
  },
  writable: true,
})

Object.defineProperty(global, 'localStorage', { value: localStorageMock })
Object.defineProperty(global, 'sessionStorage', { value: sessionStorageMock })

describe('LocalStoragePersistence', () => {
  const storageKey = 'test-key'
  let persistence: LocalStoragePersistence<TestState>

  beforeEach(() => {
    persistence = new LocalStoragePersistence<TestState>(storageKey)
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('save', () => {
    it('should save state to localStorage', () => {
      const state: TestState = { id: 'test-1', count: 42 }

      persistence.save(state)

      const saved = localStorage.getItem(storageKey)
      expect(saved).toBe(JSON.stringify(state))
    })

    it('should overwrite existing data', () => {
      const state1: TestState = { id: 'test-1', count: 1 }
      const state2: TestState = { id: 'test-2', count: 2 }

      persistence.save(state1)
      persistence.save(state2)

      const saved = localStorage.getItem(storageKey)
      expect(saved).toBe(JSON.stringify(state2))
    })
  })

  describe('load', () => {
    it('should load state from localStorage', () => {
      const state: TestState = { id: 'test-1', count: 42 }
      localStorage.setItem(storageKey, JSON.stringify(state))

      const loaded = persistence.load()

      expect(loaded).toEqual(state)
    })

    it('should return null when key does not exist', () => {
      const loaded = persistence.load()
      expect(loaded).toBeNull()
    })

    it('should return null when localStorage is empty', () => {
      localStorage.clear()
      const loaded = persistence.load()
      expect(loaded).toBeNull()
    })

    it('should parse JSON correctly', () => {
      const state: TestState = { id: 'complex', count: 999 }
      localStorage.setItem(storageKey, JSON.stringify(state))

      const loaded = persistence.load()

      expect(loaded).toEqual(state)
      expect(typeof loaded?.count).toBe('number')
    })
  })

  describe('save and load integration', () => {
    it('should save and load the same state', () => {
      const state: TestState = { id: 'integration-test', count: 123 }

      persistence.save(state)
      const loaded = persistence.load()

      expect(loaded).toEqual(state)
    })
  })
})

describe('SessionStoragePersistence', () => {
  const storageKey = 'test-session-key'
  let persistence: SessionStoragePersistence<TestState>

  beforeEach(() => {
    persistence = new SessionStoragePersistence<TestState>(storageKey)
    sessionStorage.clear()
  })

  afterEach(() => {
    sessionStorage.clear()
  })

  describe('save', () => {
    it('should save state to sessionStorage', () => {
      const state: TestState = { id: 'session-1', count: 100 }

      persistence.save(state)

      const saved = sessionStorage.getItem(storageKey)
      expect(saved).toBe(JSON.stringify(state))
    })

    it('should overwrite existing data', () => {
      const state1: TestState = { id: 'session-1', count: 10 }
      const state2: TestState = { id: 'session-2', count: 20 }

      persistence.save(state1)
      persistence.save(state2)

      const saved = sessionStorage.getItem(storageKey)
      expect(saved).toBe(JSON.stringify(state2))
    })
  })

  describe('load', () => {
    it('should load state from sessionStorage', () => {
      const state: TestState = { id: 'session-1', count: 100 }
      sessionStorage.setItem(storageKey, JSON.stringify(state))

      const loaded = persistence.load()

      expect(loaded).toEqual(state)
    })

    it('should return null when key does not exist', () => {
      const loaded = persistence.load()
      expect(loaded).toBeNull()
    })

    it('should return null when sessionStorage is empty', () => {
      sessionStorage.clear()
      const loaded = persistence.load()
      expect(loaded).toBeNull()
    })

    it('should parse JSON correctly', () => {
      const state: TestState = { id: 'json-test', count: 555 }
      sessionStorage.setItem(storageKey, JSON.stringify(state))

      const loaded = persistence.load()

      expect(loaded).toEqual(state)
      expect(typeof loaded?.count).toBe('number')
    })
  })

  describe('save and load integration', () => {
    it('should save and load the same state', () => {
      const state: TestState = { id: 'integration', count: 777 }

      persistence.save(state)
      const loaded = persistence.load()

      expect(loaded).toEqual(state)
    })
  })
})

describe('Persistence implementations comparison', () => {
  const key = 'comparison-key'
  const state: TestState = { id: 'compare', count: 50 }

  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('should store data independently', () => {
    const localPersistence = new LocalStoragePersistence<TestState>(key)
    const sessionPersistence = new SessionStoragePersistence<TestState>(key)

    const localState: TestState = { id: 'local', count: 1 }
    const sessionState: TestState = { id: 'session', count: 2 }

    localPersistence.save(localState)
    sessionPersistence.save(sessionState)

    expect(localPersistence.load()).toEqual(localState)
    expect(sessionPersistence.load()).toEqual(sessionState)
  })
})
