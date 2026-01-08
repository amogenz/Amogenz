// =========================================
// SERVICE WORKER - NETWORK FIRST STRATEGY
// =========================================

// 1. GANTI VERSION INI SETIAP KALI KAMU UPDATE FITUR
// Contoh: v1 -> v2 -> v3
const CACHE_NAME = 'amogenz-v1'; 

const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700&family=Space+Grotesk:wght@700&display=swap'
];

// A. INSTALL (Simpan aset awal)
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Paksa SW baru langsung aktif tanpa nunggu restart
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// B. ACTIVATE (Hapus Cache Versi Lama)
// Ini penting biar memori HP temanmu gak penuh sampah cache lama
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[SW] Hapus cache lama:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim(); // Ambil alih kontrol halaman segera
});

// C. FETCH (Strategi Network First)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // Kalau ada internet: Ambil file baru, lalu simpan update-nya ke cache
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(() => {
        // Kalau internet mati: Ambil dari cache
        return caches.match(e.request);
      })
  );
});
