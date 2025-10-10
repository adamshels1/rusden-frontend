const CACHE_NAME = 'rusden-v1';
const STATIC_CACHE = 'rusden-static-v1';
const DYNAMIC_CACHE = 'rusden-dynamic-v1';
const IMAGE_CACHE = 'rusden-images-v1';

const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/_next/static/css/app/layout.css',
  '/_next/static/chunks/webpack.js',
  '/_next/static/chunks/main-app.js',
  '/fonts/inter-var.woff2',
  '/logo.png',
  '/favicon.ico',
];

const API_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const IMAGE_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('SW: Installing...');

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('SW: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('SW: Activating...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE &&
                cacheName !== DYNAMIC_CACHE &&
                cacheName !== IMAGE_CACHE) {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - network first with cache fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle different types of requests
  if (url.origin === self.location.origin) {
    // Handle static assets
    if (request.destination === 'script' ||
        request.destination === 'style' ||
        request.destination === 'font') {
      event.respondWith(handleStaticAsset(request));
    }
    // Handle images
    else if (request.destination === 'image') {
      event.respondWith(handleImage(request));
    }
    // Handle API requests
    else if (url.pathname.startsWith('/api/')) {
      event.respondWith(handleAPIRequest(request));
    }
    // Handle HTML pages
    else {
      event.respondWith(handleHTMLRequest(request));
    }
  } else {
    // Handle external requests (CDN, etc.)
    event.respondWith(handleExternalRequest(request));
  }
});

// Handle static assets - cache first
async function handleStaticAsset(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('SW: Static asset fetch failed:', error);
    return new Response('Asset not available offline', { status: 404 });
  }
}

// Handle images - cache first with TTL
async function handleImage(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    const cachedDate = cachedResponse.headers.get('cached-at');
    if (cachedDate) {
      const age = Date.now() - parseInt(cachedDate);
      if (age < IMAGE_CACHE_TTL) {
        return cachedResponse;
      }
    }
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      responseClone.headers.append('cached-at', Date.now().toString());
      cache.put(request, responseClone);
    }
    return networkResponse;
  } catch (error) {
    console.log('SW: Image fetch failed:', error);
    return cachedResponse || new Response('Image not available offline', { status: 404 });
  }
}

// Handle API requests - network first with cache fallback
async function handleAPIRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cacheKey = new Request(request.url, { method: 'GET' });

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      responseClone.headers.append('cached-at', Date.now().toString());
      cache.put(cacheKey, responseClone);
    }
    return networkResponse;
  } catch (error) {
    console.log('SW: API request failed, trying cache:', error);
    const cachedResponse = await cache.match(cacheKey);

    if (cachedResponse) {
      const cachedDate = cachedResponse.headers.get('cached-at');
      if (cachedDate) {
        const age = Date.now() - parseInt(cachedDate);
        if (age < API_CACHE_TTL) {
          return cachedResponse;
        }
      }
      return cachedResponse;
    }

    // Return offline fallback for API
    return new Response(
      JSON.stringify({
        error: 'Offline - cached data not available',
        offline: true
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle HTML pages - network first with offline fallback
async function handleHTMLRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('SW: HTML request failed, trying cache:', error);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page
    const offlineResponse = await cache.match('/offline');
    return offlineResponse || new Response('Offline page not found', { status: 404 });
  }
}

// Handle external requests - network only with optional caching
async function handleExternalRequest(request) {
  try {
    const networkResponse = await fetch(request);

    // Cache successful external resources
    if (networkResponse.ok && request.destination === 'image') {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('SW: External request failed:', error);

    // Try to serve from cache for images
    if (request.destination === 'image') {
      const cache = await caches.open(IMAGE_CACHE);
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    throw error;
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-listings') {
    event.waitUntil(syncListings());
  }
  if (event.tag === 'background-sync-favorites') {
    event.waitUntil(syncFavorites());
  }
});

async function syncListings() {
  // Sync offline created/updated listings
  console.log('SW: Syncing listings...');
}

async function syncFavorites() {
  // Sync offline favorites
  console.log('SW: Syncing favorites...');
}

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Новое уведомление от Rusden',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Посмотреть',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Закрыть',
        icon: '/icons/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Rusden', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.matchAll().then((clientList) => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
});

// Periodic background sync
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-listings') {
    event.waitUntil(updateListings());
  }
});

async function updateListings() {
  // Periodically update cached listings
  console.log('SW: Updating listings in background...');
}

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_UPDATED') {
    // Handle cache updates from main thread
    console.log('SW: Cache updated notification received');
  }
});