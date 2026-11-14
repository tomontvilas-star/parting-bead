// v2: game files come fresh from the internet when online (so updates arrive), cached copy when offline
const CACHE = 'toyhouse-v2';
const FILES = ['./', 'index.html', 'lines.js', 'voices.js', 'voices.mp3', 'baloo600.woff2', 'baloo800.woff2', 'manifest.json', 'icon-180.png', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const big = /\.(mp3|woff2|png)$/.test(new URL(e.request.url).pathname);
  if (big) { // large files: cache first
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const c = res.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); return res; })));
    return;
  }
  e.respondWith(fetch(e.request).then(res => { const c = res.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); return res; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('index.html'))));
});
