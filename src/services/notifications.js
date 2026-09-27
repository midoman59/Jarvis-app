export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('Browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

export const scheduleWaterReminder = async (intervalMinutes = 60) => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Workers not supported')
    return
  }

  const granted = await requestNotificationPermission()
  if (!granted) {
    console.log('Notification permission denied')
    return
  }

  try {
    const registration = await navigator.serviceWorker.ready

    // Send message to service worker
    if (registration.active) {
      registration.active.postMessage({
        type: 'SET_REMINDER',
        interval: intervalMinutes * 60 * 1000, // Convert to milliseconds
        title: '💧 Bois de l\'eau!',
        body: 'Il est temps de boire un verre d\'eau'
      })
    }
  } catch (error) {
    console.error('Failed to schedule reminder:', error)
  }
}

export const scheduleNutritionReminder = async (intervalMinutes = 120) => {
  if (!('serviceWorker' in navigator)) return

  const granted = await requestNotificationPermission()
  if (!granted) return

  try {
    const registration = await navigator.serviceWorker.ready

    if (registration.active) {
      registration.active.postMessage({
        type: 'SET_REMINDER',
        interval: intervalMinutes * 60 * 1000,
        title: '🍽️ Enregistre un repas',
        body: 'N\'oublie pas de logger ton déjeuner'
      })
    }
  } catch (error) {
    console.error('Failed to schedule nutrition reminder:', error)
  }
}

export const sendImmediateNotification = async (title, body, icon = '/icon-192x192.png') => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Workers not supported')
    return
  }

  const granted = await requestNotificationPermission()
  if (!granted) return

  try {
    const registration = await navigator.serviceWorker.ready
    await registration.showNotification(title, {
      body,
      icon,
      badge: '/badge-96x96.png',
      tag: title,
      requireInteraction: false,
      vibrate: [200, 100, 200]
    })
  } catch (error) {
    console.error('Failed to show notification:', error)
  }
}

export const cancelNotifications = async () => {
  if (!('serviceWorker' in navigator)) return

  try {
    const registration = await navigator.serviceWorker.ready

    if (registration.active) {
      registration.active.postMessage({
        type: 'CANCEL_REMINDERS'
      })
    }

    // Close all notifications
    const notifications = await registration.getNotifications()
    notifications.forEach(n => n.close())
  } catch (error) {
    console.error('Failed to cancel notifications:', error)
  }
}
