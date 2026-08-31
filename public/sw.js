// Farah Affes Studio - Background Service Worker for Native OS & Mobile Push Notifications

self.addEventListener('install', function (event) {
  self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})

// Handle Web Push protocol events (e.g. background cloud triggers)
self.addEventListener('push', function (event) {
  let data = { title: '📬 New Alert — Farah Affes Studio', body: 'New message or inquiry received!' }
  if (event.data) {
    try {
      data = event.data.json()
    } catch {
      data = { title: '📬 New Alert — Farah Affes Studio', body: event.data.text() }
    }
  }

  const notificationOptions = {
    body: data.body || 'New update in Farah Affes Studio',
    icon: data.icon || '/images/farah-portrait.png',
    badge: '/favicon.ico',
    vibrate: [300, 100, 300, 100, 400],
    tag: data.tag || 'farah-push-' + Date.now(),
    requireInteraction: true,
    data: {
      url: data.url || '/admin',
    },
    actions: [
      { action: 'open_admin', title: 'Open Studio' },
    ],
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Farah Affes Studio', notificationOptions)
  )
})

// Focus or open Admin window when notification is clicked on Phone Lockscreen / PC Action Center
self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  const targetUrl = (event.notification.data && event.notification.data.url) || '/admin'

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i]
        if (client.url.includes('/admin') && 'focus' in client) {
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl)
      }
    })
  )
})
