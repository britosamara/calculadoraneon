self.addEventListener('install', event => {
  console.log('[Service Worker] Instalando...');

  event.waitUntil(
    caches.open('calculadora-cache').then(cache => {
      console.log('[Service Worker] Cacheando arquivos');
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './script.js',
        './manifest.json',
        './background.jpg',
        './icon-192.png',
        './icon-512.png'
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Ativado!');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
