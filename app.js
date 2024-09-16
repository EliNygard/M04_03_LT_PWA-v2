if ('serviceWorker' in navigator && 'SyncManager' in window) {
  // Register the service worker
  navigator.serviceWorker
    .register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);

      // Register background sync once service worker is ready
      return navigator.serviceWorker.ready;
    })
    .then((registration) => {
      return registration.sync.register('sync-updates');
    })
    .then(() => {
      console.log('Background Sync registered');
    })
    .catch((error) => {
      console.error('Background Sync registration failed:', error);
    });
} else {
  console.log('Service Worker or SyncManager not supported in this browser');
}
