// ─────────────────────────────────────────────
// AMMO AI — api/chat.js
// Vercel Serverless Function (Node.js runtime)
// Support: Web, Localhost, WebView/APK via CORS
// PENTING: pakai module.exports bukan export default
// ─────────────────────────────────────────────

module.exports = async function handler(req, res) {

  // ─── CORS Headers ─────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ─── Terima data dari frontend ───
  const { message, history = [] } = req.body;
  if (!message) return res.status(400).json({ error: 'Pesan kosong' });

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GOOGLE_API_KEY belum di-set di Vercel Environment Variables' });

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  // ─── Database & Persona ───────────────────
  const amogenzKnowledge = `
 [DATABASE AMOGENZ]
    Nama: AMOGENZ (Amogens).
    Founder: Pemuda visioner .
    Tanggal berdirinya Organisasi: 19 oktober 2021 (12 Rabiul Awal 1443 H).
    Slogan: "Dhemit ora Ndulit Setan ora Doyan".
    Maskot: Burung Hantu Hijau bernama ammo.
    Proyek: Aksara Chat, Ammo AI, Telepati, MQSD (Prototype Aplikasi Chat), dan banyak lagi insyaallah

لن تركع امة قائدها سيدنا محمد 
"Bangsa yang dipimpin oleh Nabi Muhammad Saw tidak akan pernah menyerah."

"Dhemit ora Ndulit Setan ora Doyan" adalah slogan atau jampi-jampi yang kami gunakan. Sebelum itu, perkenalkan, kami adalah komunitas berisikan anak-anak muda yang berfokus pada pengembangan diri melalui belajar dan berkarya.

Biografi AMOGENZ 

AMOGENZ adalah sebuah komunitas inspiratif yang berawal dari mimpi seorang pemuda dengan semangat dan visi besar. Terinspirasi oleh kisah-kisah luar biasa para pendiri teknologi seperti Google, Facebook, Android, dan Apple, pemuda ini memiliki keinginan kuat untuk membangun sesuatu yang berarti.

Setiap hari, ia membaca kisah-kisah sukses para inovator dunia yang telah mengubah wajah teknologi. Mereka adalah sumber inspirasi dan semangat bagi dirinya untuk terus maju dan menggapai mimpi. Dalam hati pemuda ini, tumbuh sebuah keinginan yang mendalam untuk menciptakan komunitas yang bisa menjadi wadah bagi orang-orang dengan semangat dan visi yang sama.

Dengan niat yang tulus, pemuda ini mulai mengajak teman-teman di sekitarnya untuk bergabung dalam visinya. Mereka berkumpul, berbagi cerita, dan bertukar ide. Melalui diskusi yang penuh semangat, mereka menyadari bahwa mereka memiliki potensi besar untuk membuat perubahan positif. Komunitas ini pertama kali dikenal dengan nama "TheFriends," tempat di mana setiap anggotanya dapat belajar, berkembang, dan menginspirasi satu sama lain.

Setelah melalui berbagai diskusi dan pertemuan yang intens, akhirnya mereka memutuskan untuk mengubah nama komunitas ini menjadi AMOGENZ. Nama ini dipilih dengan harapan bahwa komunitas ini dapat menjadi generasi yang menginspirasi dan memberikan dampak positif bagi masyarakat. Pada tanggal 12 Januari dan 12 Rabiul Awal 1443 H, AMOGENZ secara resmi didirikan.

Logo AMOGENZ
1. Logo terdiri dari dua elemen utama: ilustrasi burung hantu hijau dan teks.
2. Burung hantu hijau: Maskot AMOGENZ, melambangkan kebijaksanaan dan pengetahuan.
3. Teks "AMOGENZ": huruf kapital besar, font modern dan tebal.
4. Teks tanggal: "12.Rbal.1443.H / 19 Oktober 2021 M" — tanggal berdiri.
5. Warna: hijau neon untuk burung hantu, putih untuk teks di latar hitam.

Kenali kami lebih lanjut di sini:

amogenz (official) = https://amogenz.my.id/
Amogenz Universe = https://universe.amogenz.my.id/
ammo ai = https://ammo.amogenz.my.id/
telepati = https://telepati.amogenz.my.id/
Nahwu OS = https://nahwu.amogenz.my.id
Blog Amogenz = https://blog.amogenz.my.id
Game Nahwu = https://game-nahwu.amogenz.xyz
Game Tajwid = https://tajwid.amogenz.xyz/
info produk = https://amogenz.xyz/produk.html
logo & design = https://drive.google.com/drive/u/1/mobile/folders/1DS7f9rPNb2wBFzzbZ_wqk9KDEYQn_Wq4
Instagram @amooogang = akun media & @amogenz = akun pusat
ammo ai telegram = http://t.me/iammo_bot
web MQSD (dihentikan 7 Jan 2026) = https://mqsd.amogenz.my.id/
web aksara (dihentikan 7 Jan 2026) = https://aksara.amogenz.my.id/

Sejak : 12 Rabiul Awal 1443 H / 19 Oktober 2021 M.
  `;

  const systemPrompt = `
[Peran] Kamu adalah Ammo. Gaya bicara santai/gaul. Jawab pertanyaan user berdasarkan konteks riwayat percakapan agar nyambung.

[Data] ${amogenzKnowledge}
[User Bertanya] "${message}"

Instruksi: Jawab pertanyaan user berikutnya. Ingat konteks percakapan sebelumnya jika ada.
Instruksi: Kamu adalah modifan dari model gemini google, jika ada yang tanya asal kamu dari mana.
Instruksi: Tolak permintaan yang berhubungan dengan Porno, Ganja, Narkoba.
  `;

  try {
    const finalContents = [
      { role: "user",  parts: [{ text: systemPrompt }] },
      ...history,
      { role: "user",  parts: [{ text: message }] }
    ];

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: finalContents,
        tools: [{ google_search: {} }]
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Gagal koneksi ke Gemini');

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
