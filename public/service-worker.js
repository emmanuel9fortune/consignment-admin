/* eslint-disable no-restricted-globals */
/* eslint-env serviceworker */
const CACHE_NAME = "sleeng-cache-v1";
const urlsToCache = ["/", "/index.html"];

// Install event: cache all important files
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("[ServiceWorker] Deleting old cache:", name);
            return caches.delete(name);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event: serve from cache first, then network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached file or fetch and cache it
      return (
        response ||
        fetch(event.request)
          .then((res) => {
            // Only cache GET requests and successful responses
            if (!res || res.status !== 200 || res.type !== "basic") return res;

            const resToCache = res.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, resToCache);
            });
            return res;
          })
          .catch(() => {
            // Offline fallback: show index.html for SPA routing
            if (event.request.mode === "navigate") {
              return caches.match("/index.html");
            }
          })
      );
    })
  );
});
