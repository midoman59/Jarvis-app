const CACHE_NAME = 'jarvis-v1'

let reminderIntervals = {}

self.addEventListener('install', event => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim())
})

// Handle messages from the app
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SET_REMINDER') {
    const { interval, title, body } = event.data
    setReminder(interval, title, body)
  } else if (event.data && event.data.type === 'CANCEL_REMINDERS') {
    cancelAllReminders()
  }
})

function setReminder(interval, title, body) {
  // Clear any existing reminders with the same title
  if (reminderIntervals[title]) {
    clearInterval(reminderIntervals[title])
  }

  // Set new reminder
  reminderIntervals[title] = setInterval(() => {
    self.registration.showNotification(title, {
      body: body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: title,
      requireInteraction: false,
      vibrate: [200, 100, 200],
      actions: [
        { action: 'snooze', title: '⏰ Snooze 30min' },
        { action: 'dismiss', title: '✕ Fermer' }
      ]
    })
  }, interval)

  // Also send first notification immediately
  self.registration.showNotification(title, {
    body: body,
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    tag: title
  })
}

function cancelAllReminders() {
  Object.values(reminderIntervals).forEach(intervalId => {
    clearInterval(intervalId)
  })
  reminderIntervals = {}
}

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close()

  if (event.action === 'snooze') {
    // Show notification again after 30 minutes
    setTimeout(() => {
      self.registration.showNotification(event.notification.title, {
        body: event.notification.body,
        icon: '/favicon.svg',
        badge: '/favicon.svg',
        tag: event.notification.tag,
        actions: [
          { action: 'snooze', title: '⏰ Snooze 30min' },
          { action: 'dismiss', title: '✕ Fermer' }
        ]
      })
    }, 30 * 60 * 1000)
  }

  // Focus the app window
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (let client of clientList) {
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

// Offline caching strategy
self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request).then(response => {
            if (!response || response.status !== 200 || response.type === 'error') {
              return response
            }
            const responseToCache = response.clone()
            cache.put(event.request, responseToCache)
            return response
          }).catch(() => {
            // Return offline response or cached version
            return cache.match(event.request)
          })
        })
      })
    )
  }
})

// Periodic sync (if supported)
if ('periodicSync' in self.registration) {
  self.addEventListener('periodicsync', event => {
    if (event.tag === 'water-reminder') {
      event.waitUntil(
        self.registration.showNotification('💧 Hydratation', {
          body: 'Bois de l\'eau!',
          icon: '/favicon.svg'
        })
      )
    }
  })
}
