/* public/firebase-messaging-sw.js */
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCKPrE1B2ikGlnr6PmTq4JVLlBDlOe50Co",
  projectId: "tmv1-7fc4f",
  messagingSenderId: "377085834114",
  appId: "1:377085834114:web:aeb2ca19e51abe8fc5959b"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] background message ', payload);

  const notificationTitle = payload.notification?.title || payload.data?.title || 'Task update';
  const notificationBody = payload.notification?.body || payload.data?.description || '';

  const notificationOptions = {
    body: notificationBody,
    icon: '/icon-192.png'
  };

  // If the server included items JSON (with imageUrl), try to prefetch and cache their images
  const cacheName = 'tmv-task-assets-v1';
  const itemsJson = payload.data && payload.data.items;
  if (itemsJson) {
    try {
      const items = JSON.parse(itemsJson);
      const imageUrls = items
        .map((it) => it.imageUrl)
        .filter((u) => typeof u === 'string' && u.length);

      if (imageUrls.length) {
        // fetch each image and store in cache (best-effort)
        const openCache = caches.open(cacheName);
        const fetchPromises = imageUrls.map(async (url) => {
          try {
            const resp = await fetch(url, { mode: 'no-cors' });
            // put will fail for no-cors opaque responses in some browsers; we still try
            const cache = await openCache;
            await cache.put(url, resp.clone());
            // if supported by Notifications API, include image in notification
            if (!notificationOptions.image) notificationOptions.image = url;
          } catch (err) {
            console.warn('[sw] failed to fetch/cache', url, err);
          }
        });

        // wait for all fetches to settle before showing notification (best-effort)
        Promise.allSettled(fetchPromises).finally(() => {
          self.registration.showNotification(notificationTitle, notificationOptions);
        });
        return; // we've scheduled showing notification after fetches
      }
    } catch (err) {
      console.warn('[sw] invalid items payload', err);
    }
  }

  // fallback: show notification immediately
  self.registration.showNotification(notificationTitle, notificationOptions);
});
