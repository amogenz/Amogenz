// Info APK Aksara terbaru — proxy ke web Aksara.
// Dipakai tombol "Download" di halaman produk agar SELALU menunjuk ke
// APK paling baru tanpa perlu update manual (sama seperti di web Aksara).
// Proxy server-side agar tidak kena blokir CORS browser.
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const r = await fetch('https://aksara.amogenz.xyz/api/apk-version.json', {
      headers: { 'User-Agent': 'amogenz-xyz-apk-proxy/1.0' },
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) throw new Error('upstream ' + r.status);
    const j = await r.json();
    // Cache singkat di edge agar tidak menghantam API Aksara tiap klik
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=120');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(j);
  } catch (e) {
    return res.status(502).json({ error: 'Gagal mengambil info APK terbaru' });
  }
}
