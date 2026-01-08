const webPush = require('web-push');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { targetUser, title, body } = req.body;

    // KONFIGURASI VAPID (SUDAH DIISI KEY KAMU)
    webPush.setVapidDetails(
        'mailto:admin@amogenz.my.id',
        'BB-JmrHvtnlwI5sinY2AHQShN5rLFo0m8mSZGMjgd4sHlxBoep0sWZyryP6vQXS-ewhSSySpRYVsBtXlQ-wegFo', // Public Key
        'CGIYrY5RhbvZHrITLzWij1xAhkvaTffk3VEvotSnNII'  // Private Key
    );

    try {
        // 1. AMBIL DATA SUBSCRIPTION USER DARI FIREBASE (Public Read)
        const dbUrl = `https://amogenz-default-rtdb.asia-southeast1.firebasedatabase.app/users/${targetUser}/pushSub.json`;
        
        const dbRes = await fetch(dbUrl);
        const subscription = await dbRes.json();

        if (!subscription) {
            return res.status(404).json({ message: 'User belum subscribe notif' });
        }

        // 2. KIRIM NOTIFIKASI
        const payload = JSON.stringify({ title, body });
        await webPush.sendNotification(subscription, payload);

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error("Gagal Notif:", error);
        return res.status(500).json({ error: error.message });
    }
}
