const DB_NAME = 'jarvis-db'
const DB_VERSION = 1

const STORES = {
  DAILY_LOG: 'daily_log',
  OBJECTIVES: 'objectives',
  SETTINGS: 'settings',
  MEALS: 'meals',
  WORKOUTS: 'workouts'
}

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = event.target.result

      // Daily log store (water, date-based)
      if (!db.objectStoreNames.contains(STORES.DAILY_LOG)) {
        const store = db.createObjectStore(STORES.DAILY_LOG, { keyPath: 'date' })
        store.createIndex('date', 'date', { unique: true })
      }

      // Objectives store
      if (!db.objectStoreNames.contains(STORES.OBJECTIVES)) {
        const store = db.createObjectStore(STORES.OBJECTIVES, { keyPath: 'id', autoIncrement: true })
        store.createIndex('completed', 'completed', { unique: false })
        store.createIndex('date', 'date', { unique: false })
      }

      // Settings store
      if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
        db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' })
      }

      // Meals store
      if (!db.objectStoreNames.contains(STORES.MEALS)) {
        const store = db.createObjectStore(STORES.MEALS, { keyPath: 'id', autoIncrement: true })
        store.createIndex('date', 'date', { unique: false })
      }

      // Workouts store
      if (!db.objectStoreNames.contains(STORES.WORKOUTS)) {
        const store = db.createObjectStore(STORES.WORKOUTS, { keyPath: 'id', autoIncrement: true })
        store.createIndex('date', 'date', { unique: false })
      }
    }
  })
}

// Helper functions
export const dbGet = async (storeName, key) => {
  const db = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly')
    const store = transaction.objectStore(storeName)
    const request = store.get(key)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

export const dbSet = async (storeName, data) => {
  const db = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.put(data)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

export const dbDelete = async (storeName, key) => {
  const db = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.delete(key)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

export const dbGetAll = async (storeName) => {
  const db = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly')
    const store = transaction.objectStore(storeName)
    const request = store.getAll()

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

export const dbClear = async (storeName) => {
  const db = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.clear()

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

// Today's date key (YYYY-MM-DD)
export const getTodayKey = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

// Default daily log structure
export const getDefaultDailyLog = (date = getTodayKey()) => ({
  date,
  water: 0,
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  sport: [],
  meals: [],
  createdAt: new Date().toISOString()
})
