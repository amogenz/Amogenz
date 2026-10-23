# Changelog — Web Utama AMOGENZ
> Direkonstruksi dari riwayat commit repo `amogenz/Amogenz` branch `main`
> (317 commit, 22 Nov 2025 – 14 Okt 2026). Tanggal di bawah memakai tanggal
> commit (UTC); tambah ±7 jam untuk WIB. Entri yang hanya didukung pesan
> commit generik ("Add files via upload", "Update index.html") diringkas
> per era karena isi perubahannya tidak terdokumentasi.

## v28 (2026-10-23) — Upgrade halaman produk + tombol utama beranda

- `produk.html`: urutan baru — seksi "Paling Sering Dipakai" (Aksara,
  Amogenz Verse, Nahwu OS) di atas, "Semua Produk" menyusul; kalimat kartu
  dipertajam berpola apa + untuk siapa + kenapa mudah, keluarga Nahwu diberi
  pembeda; lencana konsisten (Gratis, Tanpa Install, Tanpa Daftar, Baru);
  seksi aplikasi tanpa rating bintang — diganti info ukuran terverifikasi,
  Aksara menampilkan versi live + ±10 MB + Android 8.0+; blok jasa pindah ke
  bawah; subjudul halaman diperjelas. (Mockup disetujui Bos 23 Okt 2026.)
- `index.html`: tombol utama hero kini "Lihat Produk" → `/produk`;
  "Tentang Kami" jadi tombol kedua.
- Cache-bust: rujukan `shared.css` naik `?v=8` → `?v=9` di index, produk,
  about, ai, brand, dokumentasi (isi CSS tidak berubah; baseline guard
  diperbarui karena isi CSS ternyata sudah bergeser dari baseline lama).

## v26 (2026-10-15) — Hapus tagline about.html

- `about.html`: hapus tagline "Youth & Technology Community" di bawah tulisan
  AMOGENZ (titah Bos 2026-10-15 — tagline dihapus dari web utama).

## v25 (2026-10-14) — URL bersih

- `vercel.json`: rewrite `/brand /produk /about /ai /dokumentasi` → file
  `.html`; redirect permanen `.html` → URL bersih; no-cache untuk path bersih.
- `sitemap.xml`: URL bersih + tambah `/brand` & `/dokumentasi`.
- `api/chat.js`: URL pengetahuan Ammo AI disesuaikan ke URL bersih.
- 87 link internal `xxx.html` → URL bersih (4 batch commit).

## v24 (2026-10-14) — Jarak kartu about.html

- Kartu "Pesan Dari Founder & CO-Founder" dan "Dokumentasi Proyek" yang
  menempel 0px dibungkus `<div class="product-list">` (pola standar
  shared.css) — hanya jarak, tanpa ubah desain.

## v23 — (kesenjangan: tidak ada commit yang melabeli v23)

- Nomor versi ini terlewati dalam pesan commit; kemungkinan bump
  perantara pada batch URL bersih 14 Okt 2026. Isi pastinya tidak
  terverifikasi.

## v22 (2026-10-13) — Ammo AI kenal AMOGENZ VIBE

- `api/chat.js`: pengetahuan +AMOGENZ VIBE (3 pegangan, rantai
  Biasa–Nyaman–Langsung Paham, tautan brand.html); ringkasan proyek
  +AMOGENZ 3D VERSE & AMOGENZ VIBE; instruksi baru — bila jawaban tidak
  ada di data, akui dengan santai tanpa menuduh user mengarang.
- `ai.html`: chip selingan obrolan "Hal baru di AMOGENZ".

## v21 (2026-10-13) — Isolasi tombol tema spesimen brand.html

- Bug: tombol tema di bingkai Spesimen Hidup ikut mengubah tema halaman
  (sidebar.js menempel handler ke semua `.theme-toggle`).
- Perbaikan: tombol spesimen memakai kelas khusus `.spec-theme-toggle`
  yang hanya mengubah tema di dalam bingkai.

## v20 (2026-10-13) — brand.html jadi visual AMOGENZ VIBE

- Seksi baru: "Cara Kami Mendesain", "Hirarki Informasi" (demo klik),
  "Hirarki Desain" (demo urutan baca), "Spesimen Hidup" (elemen asli
  bisa diklik), "Yang Tidak Kami Lakukan", "Untuk Developer".
- Perbaikan demo ukuran minimum & demo larangan (latar adaptif per tema);
  caption larangan diperjelas; 2 varian lockup resmi: HIJAU SEMUA
  (#4CAF50, untuk spanduk/kaos/banner) dan SATU WARNA PUTIH
  (stempel/sablon/fotokopi).

## v19 (2026-10-13) — Aset brand baru

- `logo-varian-putih.svg` dan `logo-varian-hijau.svg` (lockup resmi,
  dibungkus SVG data-URI agar bisa di-push via konektor teks).
- `favicon.png` diganti: burung soft #4CAF50 di #101210.
- Ikon sidebar & `rel=icon` semua halaman → `favicon.svg?v=2` (lokal,
  menggantikan avatar ibb eksternal); header/topbar tidak diubah.

## v18 (2026-10-13) — Favicon burung soft

- `favicon.svg` diisi ulang: burung hijau soft #4CAF50 di latar #101210.
- `sidebar.js`: perbaikan swap logo tema (bandingkan `src` via
  `getAttribute`, bukan `endsWith` — `logo-dark.svg`.endsWith(`logo.svg`)
  selalu true sehingga logo teks-gelap nyangkut di topbar gelap).
- Seksi "Logo Tunggal" di brand.html; aset baru `bird-soft.svg`.

## v17 (2026-10-12) — Tema terang soft sitewide

- `shared.css`: blok `[data-theme="light"]` (latar #F2F2ED, kartu
  #FAFAF6, teks #20221F — soft, bukan putih jeglek); token
  `--primary-text` #4CAF50 (gelap) / #2E7D32 (terang, kontras baca).
- `sidebar.js`: satu mekanisme tema semua halaman (localStorage
  `amogenz-theme`, ganti logo, theme-color); tombol toggle 44px di
  topbar; anti-kedip (tema diterapkan sebelum render).
- Diterapkan bertahap ke 5 halaman + unifikasi brand.html
  (tema lokal brand.html dicabut).

## v16 (2026-10-12) — Halaman baru Panduan Brand

- `brand.html` baru: konsep UI AMOGENZ VIBE, logo, warna, prinsip soft,
  hirarki, penerapan; chrome standar situs; kartu "Panduan Brand"
  ditambahkan di dokumentasi.html.

## v15 (2026-10-12) — Samakan latar topbar

- Tiga latar yang masih hardcode warna lama diperbaiki ke #101210:
  topbar, header AI, area input chat.

## v14 (2026-10-12) — Satu hijau

- 13 peran teks hijau kembali ke `var(--primary)` #4CAF50 (satu hijau
  di semua peran); token `--primary-text` dicabut sementara.

## v13 (2026-10-12) — Revisi warna terbaru

- Latar default #191C19 → #101210; hijau primer kembali #4CAF50;
  teks hijau #7CC47F yang lembut (13 peran); wash/bayangan hijau
  ikut #4CAF50; kartu #212421 & #262826 tidak berubah.
- `favicon.svg` baru (burung hantu soft #4CAF50) menggantikan
  `favicon.png` neon; 5 halaman menunjuk `shared.css?v=5`.

## v12 (2026-10-12) — Redesain seragam AMOGENZ VIBE

- Palet trio soft: hijau #4CAF50, putih #F2F3F0, gelap #191C19
  (token `:root` terkunci); skala radius resmi 8/10/12/16/999.
- `logo.svg` versi soft: burung 100% utuh, neon #11FF00 → #4CAF50,
  teks putih → #F2F3F0, tulisan "12.Rbal.1443.H" dihapus.
- Sidebar diseragamkan (10 tautan, GitHub, IG Media @ammogenz);
  font mati Manrope & Bebas Neue dibuang; kursor kustom dihapus;
  semua `target=_blank` dilengkapi `rel=noopener`; target sentuh
  44px; `:focus-visible`; `prefers-reduced-motion`.

## v1–v11 — (kesenjangan: riwayat versi 1–11 tidak terdokumentasi)

- `version.json` pertama kali muncul berlabel di commit v12
  (12 Okt 2026). Isi dan tanggal versi 1–11 tidak dapat
  direkonstruksi dari pesan commit.

---

## Era sebelumnya (sebelum penomoran versi)

### 2026-10-11 — Halaman Dokumentasi

- Dokumentasi menjadi halaman sendiri (`dokumentasi.html`) + tombol
  di Tentang; seksi "Akses Dokumentasi Proyek"; seksi "Mau Jadi
  Developer?" (alur Minat → Seleksi → Kesepakatan).

### 2026-10-10 — Kartu Aksara & perampingan

- Kartu "Download Aksara" otomatis: JS mengambil `/api/apk-version`
  (cache-buster `t=Date.now()` agar selalu fresh) lalu update link +
  label versi; link fallback diperbarui ke 1.3.71.
- Kartu Web AMOGENZ LAB; logo kartu Aksara diganti kuning (base64
  embed); bintang rating dihapus dari kartu Aksara.
- 11 keterangan produk diringkas (2–3 baris); banner 3D beranda
  dirampingkan untuk HP.

### 2026-10-05 s.d. 06 — LAB 3D & Naruto War

- Banner & kartu AMOGENZ LAB (3d.amogenz.xyz); rebrand menjadi
  **AMOGENZ 3D VERSE** + kartu Web AMOGENZ LAB (lab.amogenz.xyz);
  pengetahuan Ammo AI diperbarui.
- Naruto War ditambahkan ke produk (logo resmi, tag "Game - 2D
  Fighting").
- Lapisan CSS responsif: breakpoint tablet 768–1023px & desktop
  ≥1024px; navigasi desktop (Beranda, Produk, Tentang Kami, Ammo AI
  + CTA AMOGENZ LAB); footer baru; `vercel.json` pertama (no-cache
  untuk HTML).

### 2026-09 — Perbaikan lafadz

- "Fix error lafadz 20 langkah 7" / "Fix bug 20 langkah 7"
  (konteks modul tidak terdokumentasi di pesan commit — kesenjangan).

### 2026-07–08 — SEO & My Nahwu

- Optimasi SEO halaman utama; hapus referensi Instagram dari
  robots.txt; tambah My Nahwu; beberapa PR merge dari branch `Dev-!!`.

### 2026-05–06 — Ammo AI & aset brand

- Status & deskripsi "ammo ai" diperjelas; update `chat.js`;
  font BerlinSansFB; `centang.js` (komponen badge verified);
  database soal-jawaban Nahwu (`db/amogenzdb-*.js`); "+ nahwu ai app
  & web"; komentar tautan kartu produk dinonaktifkan.

### 2026-04 — Prompt & game Tajwid

- Penyempurnaan system prompt Ammo AI (termasuk hapus bahasa toksik);
  tautan & deskripsi game Tajwid; merge rutin dari branch `Playground`.

### 2026-01–02 — Pembersihan & analitik

- Hapus file warisan (sw.js, package.json, manifest.json,
  firebase-config.js, community.js, chating.js); integrasi Vercel Web
  Analytics; update chat.js & index.html berkala.

### 2025-12 — Iterasi awal Ammo AI

- Puluhan commit "Update chat.js" / "Update index.html" / "Add files
  via upload" — pengembangan chatbot Ammo AI dan halaman utama;
  pesan commit generik sehingga perubahan spesifik tidak dapat
  direkonstruksi (kesenjangan).

### 2025-11-22 — Awal proyek

- Initial commit; layout & style awal; eksperimen chat AKSARA dengan
  penanganan admin; workflow GitHub Actions untuk deploy Jekyll
  (kemudian dihapus).

---

## Kesenjangan yang diketahui

1. **v23** tidak dilabeli commit mana pun (kemungkinan bump perantara
   14 Okt 2026).
2. **v1–v11**: tidak ada catatan versi sebelum v12.
3. **Pesan commit generik** ("Add files via upload", "Update index.html")
   mendominasi era Nov 2025 – Sep 2026 — perubahan spesifik periode itu
   tidak dapat direkonstruksi tanpa membaca diff tiap commit.
4. Konteks commit Sep 2026 ("lafadz 20 langkah 7") tidak terdokumentasi.
