const CACHE_NAME = 'jarvis-v1'
const NOTIFICATION_INTERVAL = 60 * 60 * 1000 // 1 hour default

self.addEventListener('install', event => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim())
})

// Set up periodic notifications
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SET_REMINDER') {
    const { interval, title, body } = event.data
    scheduleReminder(interval || NOTIFICATION_INTERVAL, title, body)
  }
})

function scheduleReminder(interval, title, body) {
  setInterval(() => {
    self.registration.showNotification(title, {
      body: body,
      icon: '/icon-192x192.png',
      badge: '/badge-96x96.png',
      tag: title,
      requireInteraction: false,
      vibrate: [200, 100, 200],
      actions: [
        { action: 'snooze', title: 'Snooze 30min' },
        { action: 'dismiss', title: 'Fermer' }
      ]
    })
  }, interval)
}

self.addEventListener('notificationclick', event => {
  event.notification.close()

  if (event.action === 'snooze') {
    event.waitUntil(
      new Promise(resolve => {
        setTimeout(() => {
          self.registration.showNotification(event.notification.title, {
            body: event.notification.body,
            icon: '/icon-192x192.png'
          })
          resolve()
        }, 30 * 60 * 1000) // 30 minutes
      })
    )
  }

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i]
        if (client.url === '/' && 'focus' in client) {
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/')
      }
    })
  )
})

self.addEventListener('notificationclose', event => {
  console.log('Notification closed:', event.notification.title)
})

// Handle background sync for data
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData())
  }
})

async function syncData() {
  try {
    const db = new (self.indexedDB.open || self.webkitIndexedDB.open)('jarvis-db')
    console.log('Data synced')
  } catch (error) {
    console.error('Sync failed:', error)
  }
}

// Fetch handler for offline support
self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type === 'basic') {
            return response
          }
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache)
          })
          return response
        })
      }).catch(() => {
        return caches.match(event.request)
      })
    )
  }
})
