import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue, get, set, runTransaction, remove, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// =========================================
// 0. KONFIGURASI
// =========================================
const firebaseConfig = {
  apiKey: "AIzaSyBDyEfe83-_CzRchqcO_lLnuO6Rg9_AF_8",
  authDomain: "amogenz.firebaseapp.com",
  databaseURL: "https://amogenz-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "amogenz",
  storageBucket: "amogenz.firebasestorage.app",
  messagingSenderId: "864003468268",
  appId: "1:864003468268:web:7c861806529a0dacd66ec9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// LIST VERIFIED
const LIST_BLUE_TICK = ['aksara', 'ammo'];   
const LIST_WHITE_TICK = ['brandal'];         
const LIST_AMOGENZ = ['amogenz'];

const AMOGENZ_AVATAR_URL = "https://i.ibb.co.com/Qvwp0rVV/amogenz.webp";
const AMMO_AI_AVATAR = "https://i.ibb.co.com/Jjj7tx4j/ammo-ai.webp";

// CACHE USER DATA (PENTING BIAR AVATAR UPDATE REALTIME)
let usersData = {}; 

let myDeviceId = localStorage.getItem('device_id');
if (!myDeviceId) {
    myDeviceId = 'dev_' + Date.now();
    localStorage.setItem('device_id', myDeviceId);
}

// ==========================================
// 1. GLOBAL LISTENER
// ==========================================
document.addEventListener('click', (e) => {
    const btn = e.target.closest('button'); 
    const target = e.target;

    // Overlay & Close
    if (target.id === 'modal-overlay' || target.id === 'btn-close-post') { togglePostModal(false); return; }
    if (target.id === 'btn-auth-close') { document.getElementById('auth-modal').classList.add('hidden'); return; }
    if (target.id === 'sidebar-overlay') { closeSidebar(); return; }

    if (btn) {
        const id = btn.id || '';

        // A. AUTH & PROFILE
        if (id === 'btn-auth-submit') { e.preventDefault(); handleLogin(btn); return; }
        if (id === 'btn-logout') {
            if(confirm("Yakin logout?")) {
                localStorage.removeItem('amogenz_user');
                window.location.reload(); 
            } return;
        }
        if (id === 'trigger-login' || id === 'trigger-login-sidebar') {
            document.getElementById('auth-modal').classList.remove('hidden'); closeSidebar(); return;
        }
        if (id === 'btn-save-profile') { handleSaveProfile(btn); return; }
        if (id === 'btn-delete-pp') { handleDeletePP(btn); return; }

        // B. POSTING
        if (id === 'fab-add-post') { togglePostModal(true); return; }
        if (id === 'btn-post') { e.preventDefault(); handlePost(btn); return; }
        if (id === 'btn-remove-img') {
            document.getElementById('cp-file-input').value = '';
            document.getElementById('image-preview-container').classList.add('hidden'); return;
        }

        // C. SIDEBAR & NAV
        if (id === 'btn-menu-toggle') { openSidebar(); return; }
        if (id === 'btn-close-sidebar') { closeSidebar(); return; }

        // D. FEED ACTIONS
        if (id.startsWith('like-')) { toggleLike(id.split('like-')[1]); return; }
        if (id.startsWith('delete-')) { handleDeletePost(id.split('delete-')[1]); return; }
        if (id.startsWith('toggle-')) {
            const section = document.getElementById(`comments-${id.split('toggle-')[1]}`);
            if(section) section.classList.toggle('hidden'); return;
        }
        if (id.startsWith('send-')) { 
            const postId = id.split('send-')[1];
            const captionEl = document.getElementById(`caption-data-${postId}`);
            const caption = captionEl ? captionEl.value : "";
            sendComment(postId, caption); 
            return; 
        }
        if (id.startsWith('download-')) {
            const postId = id.split('download-')[1];
            generateGlassCard(postId, btn); // FUNGSI BARU
            return;
        }
    }
});

// Listener Input File PP
const ppInput = document.getElementById('pp-file-input');
if(ppInput) {
    ppInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = document.createElement('img');
                img.src = ev.target.result;
                img.className = 'avatar-img-custom';
                const avatarBox = document.getElementById('sidebar-avatar');
                if(avatarBox) { avatarBox.innerHTML = ''; avatarBox.appendChild(img); }
            };
            reader.readAsDataURL(file);
        }
    });
}

// ==========================================
// 2. FITUR PROFIL (REALTIME UPDATE)
// ==========================================
async function handleSaveProfile(btn) {
    const currentUser = JSON.parse(localStorage.getItem('amogenz_user'));
    if(!currentUser) return;

    const newName = document.getElementById('edit-display-name').value.trim();
    const ppFile = document.getElementById('pp-file-input').files[0];

    if(!newName) return alert("Nama wajib diisi!");

    const originalText = btn.innerText;
    btn.innerText = "Menyimpan..."; btn.disabled = true;

    try {
        const updates = {};
        // Update Nama
        updates[`users/${currentUser.username}/originalName`] = newName;

        // Update Foto (Jika ada)
        if(ppFile) {
            const base64 = await compressImageToBase64(ppFile, 300); 
            updates[`users/${currentUser.username}/avatar`] = base64;
            currentUser.avatar = base64; 
        }

        // UPDATE DATABASE
        await update(ref(db), updates);

        // Update LocalStorage
        currentUser.originalName = newName;
        localStorage.setItem('amogenz_user', JSON.stringify(currentUser));

        alert("Profil berhasil diperbarui!");
        closeSidebar();
        // UI akan otomatis berubah karena kita pakai Listener onValue di Users
        
    } catch (e) {
        console.error(e); alert("Gagal update profil.");
    } finally {
        btn.innerText = originalText; btn.disabled = false;
    }
}

async function handleDeletePP(btn) {
    if(!confirm("Hapus foto profil?")) return;
    const currentUser = JSON.parse(localStorage.getItem('amogenz_user'));
    try {
        await update(ref(db, `users/${currentUser.username}`), { avatar: null });
        delete currentUser.avatar;
        localStorage.setItem('amogenz_user', JSON.stringify(currentUser));
        document.getElementById('pp-file-input').value = ''; 
        alert("Foto profil dihapus.");
        closeSidebar();
    } catch(e) { alert("Gagal hapus."); }
}

// ==========================================
// 3. FITUR DOWNLOAD (GLASS CARD AESTHETIC)
// ==========================================
async function generateGlassCard(postId, btn) {
    const originalIcon = btn.innerHTML;
    btn.innerHTML = "🎨"; // Ikon loading
    btn.disabled = true;

    try {
        // 1. Ambil Data Elemen
        const card = btn.closest('.feed-item');
        const username = card.querySelector('.feed-name').innerText.trim(); // Nama user
        const captionRaw = card.querySelector('#caption-data-' + postId).value || ""; 
        const postImgEl = card.querySelector('.feed-image-wrapper img');
        
        // Ambil URL Avatar Realtime dari Database
        const userKey = getUsernameKeyFromCard(username); // Helper function
        let avatarUrl = "";
        
        // Logika Ambil Avatar yang Tepat untuk Canvas
        if (usersData[userKey]?.avatar) avatarUrl = usersData[userKey].avatar;
        else if (userKey === 'amogenz') avatarUrl = AMOGENZ_AVATAR_URL;
        else if (userKey === 'ammo') avatarUrl = AMMO_AI_AVATAR;

        // 2. Setup Canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const width = 1080;
        
        // Load Gambar Dulu (Async)
        const loadImg = (src) => new Promise((resolve) => {
            if(!src) return resolve(null);
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
        });

        const avatarImgObj = await loadImg(avatarUrl);
        const postImgObj = postImgEl ? await loadImg(postImgEl.src) : null;

        // Hitung Tinggi Konten
        ctx.font = "40px sans-serif"; // Font caption
        const textLines = wrapText(ctx, captionRaw, width - 200); // Padding kiri kanan 100
        const textBlockHeight = textLines.length * 65; 
        const postImgHeight = postImgObj ? (postImgObj.height / postImgObj.width) * (width - 160) : 0; // Padding gambar 80

        // Tinggi Kartu Kaca
        const cardHeight = 200 + textBlockHeight + (postImgObj ? 40 : 0) + postImgHeight + 100; // Header + Text + Gap + Img + Footer
        const totalHeight = cardHeight + 300; // + Padding atas bawah background

        canvas.width = width;
        canvas.height = totalHeight;

        // 3. --- DRAWING START ---
        
        // A. Background Gelap
        const grad = ctx.createLinearGradient(0, 0, width, totalHeight);
        grad.addColorStop(0, "#0a0a0a");
        grad.addColorStop(1, "#1a1a1a");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, totalHeight);

        // B. Glass Card (Kotak Putih Transparan)
        const cardY = (totalHeight - cardHeight) / 2;
        const cardX = 40;
        const cardW = width - 80;
        
        ctx.save();
        roundRect(ctx, cardX, cardY, cardW, cardHeight, 40); // Rounded Rect
        ctx.fillStyle = "rgba(255, 255, 255, 0.08)"; // Kaca Gelap
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)"; // Border Kaca
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        // C. Header User (Avatar + Nama)
        const headerY = cardY + 60;
        const textStartX = cardX + 160;

        // Draw Avatar Bulat
        if(avatarImgObj) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(cardX + 80, headerY + 40, 50, 0, Math.PI * 2, true); // X, Y, Radius
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatarImgObj, cardX + 30, headerY - 10, 100, 100);
            ctx.restore();
            // Border Avatar
            ctx.beginPath();
            ctx.arc(cardX + 80, headerY + 40, 50, 0, Math.PI * 2, true);
            ctx.strokeStyle = "#39FF14";
            ctx.lineWidth = 4;
            ctx.stroke();
        } else {
            // Fallback Huruf
            ctx.fillStyle = "#333";
            ctx.beginPath(); ctx.arc(cardX + 80, headerY + 40, 50, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = "#fff"; ctx.font = "bold 50px sans-serif"; ctx.textAlign = "center";
            ctx.fillText(username.charAt(0).toUpperCase(), cardX + 80, headerY + 55);
        }

        // Draw Nama & Badge
        ctx.textAlign = "left";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 50px sans-serif"; // Nama Besar
        ctx.fillText(username, textStartX, headerY + 30);
        
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.font = "30px sans-serif";
        ctx.fillText("Amogenz Universe", textStartX, headerY + 75);

        // D. Garis Pembatas
        const dividerY = headerY + 120;
        ctx.beginPath();
        ctx.moveTo(cardX + 40, dividerY);
        ctx.lineTo(cardX + cardW - 40, dividerY);
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.stroke();

        // E. Caption (Kata-kata)
        let contentY = dividerY + 70;
        ctx.fillStyle = "#eee";
        ctx.font = "40px sans-serif"; // Font Caption
        textLines.forEach(line => {
            ctx.fillText(line, cardX + 50, contentY);
            contentY += 65; // Line height
        });

        // F. Gambar Postingan
        if (postImgObj) {
            contentY += 30; // Margin top gambar
            const imgW = cardW - 100; // Padding kiri kanan 50
            const imgH = postImgHeight;
            
            ctx.save();
            roundRect(ctx, cardX + 50, contentY, imgW, imgH, 20);
            ctx.clip();
            ctx.drawImage(postImgObj, cardX + 50, contentY, imgW, imgH);
            ctx.restore();
            
            // Border Tipis Gambar
            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            roundRect(ctx, cardX + 50, contentY, imgW, imgH, 20);
            ctx.stroke();
        }

        // G. Watermark Bawah
        ctx.textAlign = "center";
        ctx.fillStyle = "#39FF14";
        ctx.font = "italic bold 24px sans-serif";
        ctx.fillText("amogenz.my.id", width/2, totalHeight - 40);


        // 4. Download
        const link = document.createElement('a');
        link.download = `amogenz-story-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

    } catch (err) {
        console.error(err);
        alert("Gagal download gambar.");
    } finally {
        btn.innerHTML = originalIcon;
        btn.disabled = false;
    }
}

// Helper Canvas: Rounded Rect
function roundRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

// Helper Canvas: Text Wrap
function wrapText(context, text, maxWidth) {
    const words = text.split(' ');
    let lines = [];
    let line = '';
    words.forEach(word => {
        const testLine = line + word + ' ';
        const metrics = context.measureText(testLine);
        if (metrics.width > maxWidth && line !== '') {
            lines.push(line);
            line = word + ' ';
        } else { line = testLine; }
    });
    lines.push(line);
    return lines;
}

// Helper: Bersihkan Nama untuk jadi Key
function getUsernameKeyFromCard(displayStr) {
    // Biasanya format: "Amogenz [icon]" -> kita butuh "amogenz"
    // Ambil kata pertama saja yang bersih
    return displayStr.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
}

// ==========================================
// 4. FITUR AI, POSTING, AUTH (SAMA SEPERTI SEBELUMNYA)
// ==========================================
async function sendComment(postId, postContext) {
    const user = JSON.parse(localStorage.getItem('amogenz_user'));
    if(!user) { document.getElementById('auth-modal').classList.remove('hidden'); return; }
    
    const input = document.getElementById(`input-${postId}`);
    const text = input.value.trim();
    if(!text) return;

    const btn = document.getElementById(`send-${postId}`);
    const originalText = btn.innerHTML;
    btn.innerHTML = "⏳"; btn.disabled = true;

    try {
        await push(ref(db, `community_posts/${postId}/comments`), { 
            user: user.originalName, userKey: user.username, text: text, timestamp: Date.now()
        });
        input.value = '';

        if (text.toLowerCase().includes('@ammo')) {
            const aiReply = await callAmmoAPI(text, postContext);
            await push(ref(db, `community_posts/${postId}/comments`), { 
                user: "Ammo AI", userKey: "ammo", text: aiReply, timestamp: Date.now() + 500 
            });
        }
    } catch (err) { console.error(err); } 
    finally { btn.innerHTML = originalText; btn.disabled = false; }
}

async function callAmmoAPI(userMessage, postCaption) {
    try {
        const contextPrompt = `[MODE: KOMENTAR] Postingan: "${postCaption}". User: "${userMessage}". Jawab user sebagai Ammo (Gaul).`;
        const response = await fetch('/api/chat', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: contextPrompt, history: [] })
        });
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "Error otak.";
    } catch (e) { return "Sinyal putus."; }
}

async function handlePost(btn) {
    const currentUser = JSON.parse(localStorage.getItem('amogenz_user'));
    if(!currentUser) { togglePostModal(false); document.getElementById('auth-modal').classList.remove('hidden'); return; }
    
    const caption = document.getElementById('cp-caption').value.trim();
    const file = document.getElementById('cp-file-input').files[0];
    if(!caption && !file) return alert("Isi dulu!");

    btn.innerHTML = `...`; btn.disabled = true;
    try {
        let img = file ? await compressImageToBase64(file, 600) : "";
        await push(ref(db, 'community_posts'), {
            username: currentUser.originalName, userKey: currentUser.username,
            caption: caption, image: img, timestamp: Date.now(), likes: 0
        });
        togglePostModal(false);
    } catch (e) { alert("Gagal"); } finally { btn.innerHTML = `Kirim`; btn.disabled = false; }
}

async function handleLogin(btn) {
    const rawName = document.getElementById('auth-user').value.trim();
    const password = document.getElementById('auth-pass').value.trim();
    if (!rawName || !password) return alert("Lengkapi data!");
    const usernameKey = rawName.toLowerCase().replace(/\s+/g, '');
    
    try {
        const snapshot = await get(ref(db, 'users/' + usernameKey));
        if (snapshot.exists()) {
            const data = snapshot.val();
            if (String(data.password) === String(password)) {
                localStorage.setItem('amogenz_user', JSON.stringify(data));
                updateUIState(); document.getElementById('auth-modal').classList.add('hidden');
            } else { alert("Password salah!"); }
        } else {
            const userData = { username: usernameKey, originalName: rawName, password: password, joinedAt: Date.now() };
            await set(ref(db, 'users/' + usernameKey), userData);
            localStorage.setItem('amogenz_user', JSON.stringify(userData));
            updateUIState(); document.getElementById('auth-modal').classList.add('hidden');
        }
    } catch (err) { alert("Error"); }
}

function compressImageToBase64(file, maxWidth) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image(); img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const scale = maxWidth / img.width;
                canvas.width = (scale < 1) ? maxWidth : img.width;
                canvas.height = (scale < 1) ? img.height * scale : img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', 0.7)); 
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}

function openSidebar() {
    document.getElementById('universe-sidebar').classList.add('active');
    document.getElementById('sidebar-overlay').classList.remove('hidden');
    const currentUser = JSON.parse(localStorage.getItem('amogenz_user'));
    if(currentUser) {
        document.getElementById('edit-display-name').value = currentUser.originalName;
        document.getElementById('btn-delete-pp').classList.toggle('hidden', !currentUser.avatar);
    }
}
function closeSidebar() {
    document.getElementById('universe-sidebar').classList.remove('active');
    document.getElementById('sidebar-overlay').classList.add('hidden');
}
function togglePostModal(show) {
    const modal = document.getElementById('post-modal');
    if(show) modal.classList.remove('hidden');
    else {
        modal.classList.add('hidden'); document.getElementById('cp-caption').value = '';
        document.getElementById('cp-file-input').value = ''; document.getElementById('image-preview-container').classList.add('hidden');
    }
}

// 5. RENDER SYSTEM (REALTIME AVATAR)
function getUserAvatar(userKey, originalName) {
    if (userKey === 'amogenz') return `<img src="${AMOGENZ_AVATAR_URL}" class="avatar-img-custom">`;
    if (userKey === 'ammo') return `<img src="${AMMO_AI_AVATAR}" class="avatar-img-custom">`;
    // Disini Kuncinya: Ambil dari Global Cache 'usersData' bukan data postingan
    if (usersData[userKey] && usersData[userKey].avatar) return `<img src="${usersData[userKey].avatar}" class="avatar-img-custom" style="border:1px solid #555;">`;
    return `<div class="avatar-letter">${originalName.charAt(0).toUpperCase()}</div>`;
}

function updateUIState() {
    const currentUser = JSON.parse(localStorage.getItem('amogenz_user'));
    // Trigger update sidebar juga
    const els = { fab: document.getElementById('fab-add-post'), profile: document.getElementById('sidebar-user-info'), 
                  avatar: document.getElementById('sidebar-avatar'), name: document.getElementById('sidebar-username'),
                  login: document.getElementById('trigger-login-sidebar'), logout: document.getElementById('btn-logout') };

    if (currentUser) {
        els.fab.classList.remove('hidden'); els.profile.classList.remove('hidden');
        els.login.classList.add('hidden'); els.logout.classList.remove('hidden');
        
        // Render Avatar Sidebar
        if(els.avatar) {
            let userKey = currentUser.username;
            // Gunakan data realtime jika ada, jika tidak gunakan localstorage
            let avatarSrc = (usersData[userKey] && usersData[userKey].avatar) ? usersData[userKey].avatar : currentUser.avatar;
            
            if(userKey === 'amogenz') els.avatar.innerHTML = `<img src="${AMOGENZ_AVATAR_URL}" class="avatar-img-custom">`;
            else if (avatarSrc) els.avatar.innerHTML = `<img src="${avatarSrc}" class="avatar-img-custom">`;
            else els.avatar.innerHTML = `<div class="avatar-letter">${currentUser.originalName.charAt(0).toUpperCase()}</div>`;
        }
        if(els.name) els.name.innerText = currentUser.originalName;
    } else {
        els.fab.classList.add('hidden'); els.profile.classList.add('hidden');
        els.login.classList.remove('hidden'); els.logout.classList.add('hidden');
    }
}

function getVerifiedBadge(username) {
    const shape = "M10.5 2.6C11.3 1.7 12.7 1.7 13.5 2.6L14.7 3.9C15 4.3 15.5 4.5 16 4.5L17.8 4.4C19 4.3 20 5.3 19.9 6.5L19.8 8.3C19.8 8.8 20 9.3 20.4 9.7L21.7 10.8C22.6 11.6 22.6 13 21.7 13.8L20.4 15C20 15.3 19.8 15.8 19.8 16.4L19.9 18.1C20 19.3 19 20.3 17.8 20.2L16 20.1C15.5 20.1 15 20.3 14.7 20.7L13.5 22C12.7 22.9 11.3 22.9 10.5 22L9.3 20.7C9 20.3 8.5 20.1 8 20.1L6.2 20.2C5 20.3 4 19.3 4.1 18.1L4.2 16.4C4.2 15.8 4 15.3 3.6 15L2.3 13.8C1.4 13 1.4 11.6 2.3 10.8L3.6 9.7C4 9.3 4.2 8.8 4.2 8.3L4.1 6.5C4 5.3 5 4.3 6.2 4.4L8 4.5C8.5 4.5 9 4.3 9.3 3.9L10.5 2.6Z";
    const check = "M9 12L11 14L15 10";
    let fill = "";
    if (LIST_AMOGENZ.includes(username)) fill = "#39FF14";
    else if (LIST_WHITE_TICK.includes(username)) fill = "#FFFFFF";
    else if (LIST_BLUE_TICK.includes(username)) fill = "#1da1f2";
    else return "";
    return `<span style="display:inline-block; width:16px; height:16px; margin-left:4px; vertical-align:middle;"><svg viewBox="0 0 24 24" fill="none"><path d="${shape}" fill="${fill}"/><path d="${check}" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
}

// MAIN RENDER LOOP
document.addEventListener('DOMContentLoaded', () => {
    // 1. Sync User Data
    onValue(ref(db, 'users'), (snapshot) => {
        if(snapshot.exists()) { usersData = snapshot.val(); updateUIState(); }
    });

    const feed = document.getElementById('community-feed');
    onValue(ref(db, 'community_posts'), (snapshot) => {
        if(!feed) return;
        feed.innerHTML = '';
        const data = snapshot.val();
        if (!data) { feed.innerHTML = '<div style="text-align:center; color:#666; padding:50px;">Belum ada postingan.</div>'; return; }
        const currentUser = JSON.parse(localStorage.getItem('amogenz_user'));
        const isOwnerAmogenz = (currentUser && currentUser.username === 'amogenz');

        Object.entries(data).reverse().forEach(([key, post]) => {
            if(!post || !post.username) return;
            const isLiked = post.likesList && post.likesList[myDeviceId];
            let deleteBtnHTML = isOwnerAmogenz ? `<button id="delete-${key}" class="btn-delete-post">🗑️</button>` : '';

            const item = document.createElement('div');
            item.className = 'feed-item';
            
            item.innerHTML = `
                <div class="feed-header">
                    <div class="feed-avatar-wrapper">${getUserAvatar(post.userKey, post.username)}</div>
                    <div class="feed-user-info">
                        <div class="feed-name">
                            ${post.username} ${getVerifiedBadge(post.userKey)}
                        </div>
                        <div class="feed-time">${timeAgo(post.timestamp)}</div>
                    </div>
                    ${deleteBtnHTML}
                </div>
                
                <div class="feed-content">
                    ${post.caption ? `<div>${escapeHtml(post.caption)}</div>` : ''}
                    <input type="hidden" id="caption-data-${key}" value="${escapeHtml(post.caption || '')}">
                </div>

                ${post.image ? `<div class="feed-image-wrapper"><img src="${post.image}" loading="lazy" crossorigin="anonymous"></div>` : ''}
                
                <div class="feed-actions">
                    <button id="like-${key}" class="btn-feed-action ${isLiked ? 'liked' : ''}">
                        ${isLiked ? '❤️' : '🤍'} <span>${post.likes || 0}</span>
                    </button>
                    <button id="toggle-${key}" class="btn-feed-action">
                        💬 <span>${post.comments ? Object.keys(post.comments).length : 0}</span>
                    </button>
                    <button id="download-${key}" class="btn-feed-action" title="Download HD">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </button>
                </div>

                <div id="comments-${key}" class="comment-section hidden">
                    <div id="list-${key}" class="comment-list"></div>
                    <div class="comment-input-box">
                        <input type="text" id="input-${key}" class="input-rounded" placeholder="Ketik @ammo untuk AI...">
                        <button id="send-${key}" class="btn-send-icon">></button>
                    </div>
                </div>`;
            
            feed.appendChild(item);

            if(post.comments) {
                const list = document.getElementById(`list-${key}`);
                Object.values(post.comments).forEach(c => {
                    const commUserKey = c.userKey || c.user.toLowerCase().replace(/\s/g, ''); 
                    const isAi = c.userKey === 'ammo';
                    const nameColor = isAi ? '#39FF14' : 'var(--primary)';
                    const div = document.createElement('div'); 
                    div.style.marginBottom="8px"; div.style.display = "flex"; div.style.gap = "8px"; div.style.fontSize = "0.85rem";
                    div.innerHTML = `<div style="width:24px; height:24px;">${getUserAvatar(commUserKey, c.user)}</div>
                        <div style="background:rgba(255,255,255,0.05); padding:6px 10px; border-radius:12px; flex:1;">
                            <div style="color:${nameColor}; font-weight:bold; font-size:0.8rem; display:flex; align-items:center;">
                                ${c.user} ${getVerifiedBadge(commUserKey)}
                            </div> 
                            <div style="color:#ddd;">${escapeHtml(c.text)}</div>
                        </div>`;
                    list.appendChild(div);
                });
            }
        });
    });
});

function timeAgo(ts) {
    const s = Math.floor((Date.now() - ts) / 1000);
    if(s > 31536000) return Math.floor(s/31536000)+" thn";
    if(s > 2592000) return Math.floor(s/2592000)+" bln";
    if(s > 86400) return Math.floor(s/86400)+" hr";
    if(s > 3600) return Math.floor(s/3600)+" jam";
    if(s > 60) return Math.floor(s/60)+" mnt";
    return "Baru saja";
}
function escapeHtml(text) { return text ? text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : ""; }
function toggleLike(pid) {
    if(!pid) return;
    runTransaction(ref(db, `community_posts/${pid}`), (p) => {
        if (p) {
            if (p.likesList && p.likesList[myDeviceId]) { p.likes--; p.likesList[myDeviceId] = null; } 
            else { p.likes++; if(!p.likesList) p.likesList={}; p.likesList[myDeviceId] = true; }
        } return p;
    });
}
