// =========================================
// 0. FIREBASE CONFIGURATION & INIT
// =========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC9PwXwvAQWSbSGNgmRERXRzkrN-cynUok",
  authDomain: "mqsd-94d67.firebaseapp.com",
  databaseURL: "https://mqsd-94d67-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mqsd-94d67",
  storageBucket: "mqsd-94d67.firebasestorage.app",
  messagingSenderId: "381147889010",
  appId: "1:381147889010:web:90051c25baf22f8dac31eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Realtime Database

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. SPA NAVIGATION SYSTEM
    // =========================================
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.page-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // A. Hapus kelas 'active' dari semua menu & halaman
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));

            // B. Tambahkan kelas 'active' ke menu yang diklik
            item.classList.add('active');

            // C. Tampilkan halaman yang sesuai target ID
            const targetId = item.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Khusus halaman AI, scroll langsung ke bawah
                if (targetId === 'page-ai') {
                    setTimeout(scrollToBottom, 100);
                }
            }
        });
    });

    // =========================================
    // 2. CUSTOM CURSOR & PARALLAX
    // =========================================
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    const orbs = document.querySelectorAll('.orb');

    // Cek apakah user pakai mouse (bukan layar sentuh)
    if (window.matchMedia("(pointer: fine)").matches) {
        
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Gerakkan Cursor
            if(cursorDot) {
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;
            }
            
            // Animasi 'lagging' untuk outline biar smooth
            if(cursorOutline) {
                cursorOutline.animate({
                    left: `${posX}px`,
                    top: `${posY}px`
                }, { duration: 500, fill: "forwards" });
            }

            // Efek Parallax untuk Orbs (Gerak berlawanan arah mouse)
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 20; // Kecepatan beda-beda
                const x = (window.innerWidth - posX * speed) / 100;
                const y = (window.innerHeight - posY * speed) / 100;
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // =========================================
    // 3. AMMO AI LOGIC (UPDATED AVATAR)
    // =========================================
    const chatHistory = document.getElementById('chat-history');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    
    // URL FOTO AMMO AI
    const ammoAvatarURL = "https://i.ibb.co.com/Jjj7tx4j/ammo-ai.webp";

    let conversationHistory = []; 

    function scrollToBottom() {
        if(chatHistory) chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.classList.add(sender === 'user' ? 'user-msg' : 'ai-msg');
        
        let avatarHTML;

        // Logika Avatar: Kalau AI pakai Gambar, Kalau User pakai Inisial/Icon
        if (sender === 'ai') {
            avatarHTML = `<img src="${ammoAvatarURL}" class="msg-avatar-img" alt="AI">`;
        } else {
            // Avatar User (Huruf U)
            avatarHTML = `<div class="msg-avatar" style="background:#fff; color:#000;">U</div>`;
        }
        
        msgDiv.innerHTML = `
            ${sender === 'ai' ? avatarHTML : ''} 
            <div class="msg-bubble">${text}</div>
            ${sender === 'user' ? avatarHTML : ''}
        `;
        
        chatHistory.appendChild(msgDiv);
        scrollToBottom();
    }

    const handleChat = async () => {
        const text = userInput.value.trim();
        if (!text) return;

        // 1. Tampilkan Pesan User
        appendMessage('user', text);
        userInput.value = '';
        userInput.disabled = true;

        // 2. Tampilkan Loading Indicator (Pakai Foto Ammo juga)
        const loadingId = 'loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.id = loadingId;
        loadingDiv.classList.add('message', 'ai-msg');
        loadingDiv.innerHTML = `
            <img src="${ammoAvatarURL}" class="msg-avatar-img" alt="AI">
            <div class="msg-bubble" style="font-style:italic; opacity:0.7;">Sedang mengetik...</div>
        `;
        chatHistory.appendChild(loadingDiv);
        scrollToBottom();

        try {
            // 3. Kirim ke Backend
            const response = await fetch('/api/chat', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    message: text,
                    history: conversationHistory 
                }) 
            });

            const data = await response.json();
            
            // Hapus loading
            const loadingEl = document.getElementById(loadingId);
            if(loadingEl) loadingEl.remove();

            if (!response.ok) {
                throw new Error(data.error || "Gagal menghubungi server.");
            }

            // 4. Proses Jawaban AI
            let aiResponseText = "Maaf, saya tidak mengerti.";
            let rawTextForHistory = ""; 

            if (data.candidates && data.candidates[0].content) {
                let rawText = data.candidates[0].content.parts[0].text;
                rawTextForHistory = rawText; 

                // Format Markdown simpel
                aiResponseText = rawText
                    .replace(/\*\*(.*?)\*\*/g, '<b style="color:#39FF14;">$1</b>') 
                    .replace(/\n/g, '<br>'); 
                
                if (data.candidates[0].groundingMetadata?.searchEntryPoint) {
                    aiResponseText += `<br><br><small style="opacity:0.5; font-size:0.7rem;">[🔍 Sumber: Google Search]</small>`;
                }
            }
            appendMessage('ai', aiResponseText);

            conversationHistory.push({ role: "user", parts: [{ text: text }] });
            conversationHistory.push({ role: "model", parts: [{ text: rawTextForHistory }] });

        } catch (error) {
            const loadingEl = document.getElementById(loadingId);
            if(loadingEl) loadingEl.remove();
            appendMessage('ai', `💀 System Error: ${error.message}`);
        } finally {
            userInput.disabled = false;
            userInput.focus();
        }
    };

    if(sendBtn && userInput) {
        sendBtn.addEventListener('click', handleChat);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChat();
        });
    }

    // =========================================
    // 4. COMMENT SYSTEM (FIREBASE REALTIME DB)
    // =========================================
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.querySelector('.comments-list');
    
    // Referensi ke database 'comments'
    const commentsRef = ref(db, 'comments');

    // A. Fungsi Render ke Layar
    const renderComment = (name, msg, dateString) => {
        const newComment = document.createElement('div');
        newComment.classList.add('comment-item', 'glass-card');
        newComment.style.animation = "fadeUp 0.5s ease"; // Animasi masuk halus
        newComment.innerHTML = `
            <div class="comment-header">
                <span class="c-name">${name}</span>
                <span class="c-date">${dateString}</span>
            </div>
            <p class="c-text">${msg}</p>
        `;
        // Masukkan ke paling atas (terbaru)
        commentsList.insertBefore(newComment, commentsList.firstChild);
    };

    // B. Listener: Dengerin kalau ada data baru masuk di Firebase
    onChildAdded(commentsRef, (snapshot) => {
        const data = snapshot.val();
        renderComment(data.name, data.message, data.date);
    });

    // C. Handle Kirim Komentar
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = commentForm.querySelectorAll('.input-glass');
            const nameInput = inputs[0];
            const msgInput = inputs[1];
            const name = nameInput.value.trim();
            const msg = msgInput.value.trim();

            if(!name || !msg) return;

            // 1. Ubah tombol jadi Loading
            const btn = commentForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Mengirim...";
            btn.disabled = true;

            // 2. Siapkan Tanggal
            const now = new Date();
            const dateString = now.toLocaleDateString('id-ID', { 
                day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
            });

            // 3. KIRIM KE FIREBASE (PUSH)
            push(commentsRef, {
                name: name,
                message: msg,
                date: dateString,
                timestamp: Date.now() // Biar bisa diurutkan kalau perlu
            }).then(() => {
                // Berhasil
                nameInput.value = '';
                msgInput.value = '';
                btn.innerText = "Terkirim!";
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 2000);
            }).catch((error) => {
                console.error("Gagal kirim: ", error);
                btn.innerText = "Gagal";
                btn.disabled = false;
            });
        });
    }
});
// =========================================
// 5. PWA INSTALLATION LOGIC
// =========================================
let deferredPrompt;
const installModal = document.getElementById('install-modal');
const btnInstall = document.getElementById('btn-install');
const btnCloseInstall = document.getElementById('btn-close-install');

// 1. Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW Registered!', reg))
            .catch(err => console.log('SW Gagal', err));
    });
}

// 2. Tangkap event 'beforeinstallprompt'
window.addEventListener('beforeinstallprompt', (e) => {
    // Cegah browser menampilkan prompt default yang jelek
    e.preventDefault();
    deferredPrompt = e;
    
    // Tampilkan Modal Custom kita setelah 3 detik biar gak kaget
    setTimeout(() => {
        if(installModal) installModal.classList.remove('hidden');
    }, 3000);
});

// 3. Logic Tombol Install
if(btnInstall) {
    btnInstall.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        // Tampilkan prompt asli browser
        deferredPrompt.prompt();
        
        // Tunggu user klik accept/cancel
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response: ${outcome}`);
        
        // Reset
        deferredPrompt = null;
        installModal.classList.add('hidden');
    });
}

// 4. Logic Tombol Tutup (Nanti)
if(btnCloseInstall) {
    btnCloseInstall.addEventListener('click', () => {
        installModal.classList.add('hidden');
    });
}

// 5. Cek jika sudah terinstall (Mode Standalone)
if (window.matchMedia('(display-mode: standalone)').matches) {
    // Kalau sudah diinstall, pastikan modal gak muncul
    if(installModal) installModal.classList.add('hidden');
}
