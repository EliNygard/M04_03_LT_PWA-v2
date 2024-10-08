// Define the cache name and the files to cache
const CACHE_NAME = "my-simple-pwa-cache-v5";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/manifest.json",
];

// Install event - caching the files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - a cache-first strategy - checks if the request is in the cache. If it is, it returns the cached resource; otherwise, it fetches it from the network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event - removing old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handling backup sync
// self.addEventListener('sync', (event) => {
//   if (event.tag === 'sync-updates') {
//     event.waitUntil(syncUpdates());
//   }
// });

// async function syncUpdates() {
//   // Function to handle syncing data
//   try {
//     const response = await fetch('/api/sync-updates');
//     const data = await response.json();
//     console.log('Data synced:', data);
//   } catch (error) {
//     console.error('Sync failed:', error);
//   }
// }