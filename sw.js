const CACHE_NAME = "v1_cache_PWA_jahires";

var urlsToCache = [
  "./",
  "./images/favicon-16x16.png",
  "./images/favicon-32x32.png",
  "./images/favicon-64x64.png",
  "./images/favicon-96x96.png",
  "./images/favicon-128x128.png",
  "./images/favicon-192x192.png",
  "./images/favicon-256x256.png",
  "./images/favicon-384x384.png",
  "./images/favicon-512x512.png",
  "./images/favicon-1024x1024.png",
  "./images/coca.png",
  "./images/az.png",
  "./images/hm.png",
  "./images/apple.png",
  "./images/jahir.jpeg",
  "./images/shakehand.png",
  "./files/CV.pdf",
];

//instalacion del service worker
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache
        .addAll(urlsToCache)
        .then(() => {
          self.skipWaiting();
        })
        .catch((err) => {
          console.log("no se ha cargado la cache ", err);
        });
    })
  );
});

// Evento Activate activa el Sw y permite que trabaje offline
self.addEventListener("activate", (e) => {
  //añadimos todos los elementos en la cache
  const cacheWhiteList = [CACHE_NAME];
  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhiteList.indexOf(cacheName) === -1) {
              //borrar los elementos que ya no esten en la cache
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        //Activar cache en el dispositivo
        self.clients.claim();
      })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        // devuelvo datos desde cache
        return res;
      }
      return fetch(e.request);
    })
  );
});
