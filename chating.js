import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue, get, set, update, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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

// ASSETS
const AMOGENZ_AVATAR_URL = "https://i.ibb.co.com/Qvwp0rVV/amogenz.webp";
const AMMO_AVATAR = "https://i.ibb.co.com/Jjj7tx4j/ammo-ai.webp";

// LIST CENTANG
const LIST_BLUE_TICK = ['aksara', 'ammo'];   
const LIST_WHITE_TICK = ['brandal'];         
const LIST_AMOGENZ = ['amogenz'];

// STATE
let currentUser = null;
let currentChatPartner = null;
let usersDataCache = {}; 
let typingTimeout = null;
let pendingChatsCount = 0;

// INIT
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupListeners();
    registerServiceWorker();

    // Cache Data User
    onValue(ref(db, 'users'), (snap) => {
        if(snap.exists()) {
            usersDataCache = snap.val();
            // Refresh list kalau lagi buka halaman list
            if (!document.getElementById('chat-list-view').classList.contains('hidden')) {
                loadMyChatList();
            }
        }
    });
});

function checkAuth() {
    currentUser = JSON.parse(localStorage.getItem('amogenz_user'));
    if (!currentUser) {
        const p = document.getElementById('page-ai');
        if(p) p.innerHTML = `<div style="text-align:center;padding:50px;color:#888;">Silakan Login di Menu Universe.</div>`;
    } else {
        loadMyChatList(); 
        update(ref(db, `users/${currentUser.username}`), { status: 'online', lastSeen: Date.now() });
        setInterval(() => update(ref(db, `users/${currentUser.username}`), { lastSeen: Date.now() }), 60000);
    }
}

function setupListeners() {
    const fab = document.getElementById('fab-new-chat');
    if(fab) fab.addEventListener('click', showAllUsersModal);
    
    document.getElementById('btn-close-users').addEventListener('click', () => {
        document.getElementById('modal-users-list').classList.add('hidden');
    });

    document.getElementById('btn-back-chat').addEventListener('click', closeChatRoom);
    document.getElementById('btn-send-chat').addEventListener('click', sendMessage);
    
    const input = document.getElementById('chat-input-text');
    input.addEventListener('keypress', (e) => { if(e.key==='Enter') sendMessage(); });
    input.addEventListener('input', handleTyping);
    input.addEventListener('focus', () => setTimeout(scrollToBottom, 300));
}

// ---------------------------------------------
// 1. LOGIKA LIST CHAT (FILTER REQUEST & ACCEPTED)
// ---------------------------------------------
function loadMyChatList() {
    const listContainer = document.getElementById('user-chat-list');
    
    // Header Permintaan Pesan (Buat dinamis)
    let requestBtn = document.getElementById('btn-requests-list');
    if(!requestBtn) {
        requestBtn = document.createElement('button');
        requestBtn.id = 'btn-requests-list';
        requestBtn.className = 'hidden'; // Default hidden
        listContainer.parentNode.insertBefore(requestBtn, listContainer);
    }

    const myChatsRef = ref(db, `user_chats/${currentUser.username}`);
    
    onValue(myChatsRef, (snapshot) => {
        listContainer.innerHTML = '';
        const chats = snapshot.val();

        // 1. RENDER AMMO AI (HARDCODE BIAR GAK DOUBLE & POSISI ATAS)
        renderChatCard('ammo', {
            lastMessage: "Halo! Gue Ammo. Ada yang bisa dibantu?",
            timestamp: Date.now(),
            seen: true,
            status: 'accepted' // Ammo selalu accepted
        }, listContainer);

        if (!chats) { requestBtn.classList.add('hidden'); return; }

        // Pisahkan Chat: Accepted vs Pending
        const acceptedChats = [];
        const pendingChats = [];

        Object.entries(chats).forEach(([key, val]) => {
            if (key === 'ammo') return; // Skip Ammo database (biar gak double)
            if (val.status === 'pending') pendingChats.push({key, ...val});
            else acceptedChats.push({key, ...val});
        });

        // 2. UPDATE TOMBOL REQUEST
        if (pendingChats.length > 0) {
            requestBtn.classList.remove('hidden');
            requestBtn.innerHTML = `<span>Permintaan Pesan</span> <span style="background:red; color:white; padding:2px 8px; border-radius:10px; font-size:0.8rem;">${pendingChats.length}</span>`;
            
            // Klik tombol request -> Tampilkan List Request
            requestBtn.onclick = () => showRequestList(pendingChats);
        } else {
            requestBtn.classList.add('hidden');
        }

        // 3. RENDER ACCEPTED CHATS
        acceptedChats.sort((a, b) => b.timestamp - a.timestamp);
        acceptedChats.forEach(chat => {
            renderChatCard(chat.key, chat, listContainer);
        });
    });
}

function renderChatCard(partnerKey, chatInfo, container) {
    const userProfile = usersDataCache[partnerKey] || {};
    const name = (partnerKey === 'ammo') ? 'Ammo AI' : (userProfile.originalName || partnerKey);
    const avatar = (partnerKey === 'ammo') ? AMMO_AVATAR : (userProfile.avatar || `https://ui-avatars.com/api/?name=${name}`);
    const isOnline = (Date.now() - (userProfile.lastSeen || 0)) < 120000;
    
    // Bold jika belum dibaca
    const isUnread = (!chatInfo.seen && chatInfo.lastSender !== currentUser.username);
    const msgStyle = isUnread ? 'color:#fff; font-weight:bold;' : 'color:#888;';

    const div = document.createElement('div');
    div.className = 'chat-card glass-card';
    
    // Klik -> Buka Room
    div.onclick = () => openChatRoom(partnerKey, name, avatar, (partnerKey === 'ammo'), chatInfo.status);

    div.innerHTML = `
        <div class="chat-avatar-wrapper">
            <img src="${avatar}" class="chat-list-avatar">
            <span class="online-dot ${(partnerKey === 'ammo' || isOnline) ? 'active' : ''}"></span>
        </div>
        <div class="chat-list-info">
            <div class="chat-list-top">
                <span class="chat-list-name">${name} ${getVerifiedBadge(partnerKey)}</span>
                <span class="chat-list-time">${timeAgoShort(chatInfo.timestamp)}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <p class="chat-list-preview" style="${msgStyle}">
                    ${chatInfo.lastSender === currentUser.username ? '<span style="color:var(--primary);">✓</span> ' : ''} 
                    ${escapeHtml(chatInfo.lastMessage)}
                </p>
                ${isUnread ? '<div style="width:10px; height:10px; background:var(--primary); border-radius:50%;"></div>' : ''}
            </div>
        </div>
    `;
    container.appendChild(div);
}

// Tampilkan Modal Request List (Isinya chat yang statusnya Pending)
function showRequestList(pendingChats) {
    // Kita reuse modal users list
    const modal = document.getElementById('modal-users-list');
    const container = document.getElementById('all-users-container');
    
    modal.classList.remove('hidden');
    container.innerHTML = '<h3 style="color:white; padding:10px; border-bottom:1px solid #333;">Permintaan Pesan</h3>';

    pendingChats.forEach(chat => {
        const userProfile = usersDataCache[chat.key] || {};
        const name = userProfile.originalName || chat.key;
        const div = document.createElement('div');
        div.className = 'user-row-item';
        div.style = "display:flex; align-items:center; gap:15px; padding:15px; border-bottom:1px solid rgba(255,255,255,0.1); cursor:pointer;";
        div.innerHTML = `
            <img src="${userProfile.avatar || AMOGENZ_AVATAR_URL}" style="width:45px; height:45px; border-radius:50%; object-fit:cover;">
            <div style="flex:1;">
                <div style="color:white; font-weight:bold;">${name}</div>
                <div style="color:#aaa; font-size:0.8rem;">${escapeHtml(chat.lastMessage)}</div>
            </div>
        `;
        div.onclick = () => {
            modal.classList.add('hidden');
            // Buka room dengan status PENDING
            openChatRoom(chat.key, name, userProfile.avatar, false, 'pending');
        };
        container.appendChild(div);
    });
}

// ---------------------------------------------
// 2. ROOM CHAT & REQUEST UI
// ---------------------------------------------
window.openChatRoom = function(partnerKey, partnerName, partnerAvatar, isAi, status = 'accepted') {
    currentChatPartner = { key: partnerKey, name: partnerName, avatar: partnerAvatar, isAi: isAi, status: status };
    
    document.getElementById('chat-list-view').classList.add('hidden');
    document.getElementById('fab-new-chat').classList.add('hidden');
    document.getElementById('chat-room-view').classList.remove('hidden');
    document.getElementById('btn-back-chat').classList.remove('hidden');
    
    const nav = document.querySelector('.glass-nav');
    if(nav) nav.style.display = 'none';

    // Header Setup
    const headerInfo = document.getElementById('header-user-info');
    const badgeHTML = getVerifiedBadge(partnerKey);
    
    headerInfo.innerHTML = `
        <img src="${partnerAvatar || AMMO_AVATAR}" class="header-avatar">
        <div>
            <div style="font-weight:bold; font-size:1rem; color:white;">${partnerName} ${badgeHTML}</div>
            <div id="header-status" style="font-size:0.75rem; color:var(--primary);">${isAi ? 'Bot' : 'Online'}</div>
        </div>
    `;

    // Reset Seen Status
    if(status === 'accepted' || isAi) {
        update(ref(db, `user_chats/${currentUser.username}/${partnerKey}`), { seen: true });
    }

    // CEK STATUS REQUEST
    const inputArea = document.querySelector('.chat-input-area');
    const existingOverlay = document.querySelector('.request-overlay');
    if(existingOverlay) existingOverlay.remove();

    if (status === 'pending') {
        // Jika Pending: Sembunyikan Input, Tampilkan Tombol Terima/Hapus
        inputArea.classList.add('hidden');
        
        const overlay = document.createElement('div');
        overlay.className = 'request-overlay';
        overlay.innerHTML = `
            <p style="text-align:center; color:#ccc;">${partnerName} ingin mengirim pesan.</p>
            <div class="request-actions">
                <button class="btn-delete" id="req-delete">Hapus</button>
                <button class="btn-accept" id="req-accept">Terima</button>
            </div>
        `;
        document.getElementById('chat-room-view').appendChild(overlay);

        document.getElementById('req-accept').onclick = acceptRequest;
        document.getElementById('req-delete').onclick = deleteRequest;

    } else {
        // Jika Accepted: Tampilkan Input Normal
        inputArea.classList.remove('hidden');
    }

    loadMessages();
}

function acceptRequest() {
    // Ubah status jadi accepted
    update(ref(db, `user_chats/${currentUser.username}/${currentChatPartner.key}`), { status: 'accepted', seen: true });
    
    // Refresh UI
    const overlay = document.querySelector('.request-overlay');
    if(overlay) overlay.remove();
    document.querySelector('.chat-input-area').classList.remove('hidden');
    currentChatPartner.status = 'accepted';
}

function deleteRequest() {
    if(!confirm("Hapus permintaan pesan ini?")) return;
    // Hapus dari user_chats
    remove(ref(db, `user_chats/${currentUser.username}/${currentChatPartner.key}`));
    closeChatRoom();
}

function closeChatRoom() {
    currentChatPartner = null;
    document.getElementById('chat-list-view').classList.remove('hidden');
    document.getElementById('fab-new-chat').classList.remove('hidden');
    document.getElementById('chat-room-view').classList.add('hidden');
    document.getElementById('btn-back-chat').classList.add('hidden');
    
    const nav = document.querySelector('.glass-nav');
    if(nav) nav.style.display = 'block';
    
    // Hapus overlay request jika ada
    const overlay = document.querySelector('.request-overlay');
    if(overlay) overlay.remove();
    document.querySelector('.chat-input-area').classList.remove('hidden'); // Reset input visibility
}

// ---------------------------------------------
// 3. PESAN LOGIC
// ---------------------------------------------
function getChatId() {
    const u1 = currentUser.username;
    const u2 = currentChatPartner.key;
    return u1 < u2 ? `${u1}_${u2}` : `${u2}_${u1}`;
}

function loadMessages() {
    const container = document.getElementById('messages-container');
    container.innerHTML = ''; 
    const chatId = getChatId();
    
    const chatRef = ref(db, `chats/${chatId}/messages`);

    // Cek apakah chat history kosong, kalau kosong & ini Ammo, tampilkan bubble manual
    get(chatRef).then(snapshot => {
        if (!snapshot.exists() && currentChatPartner.isAi) {
            renderMessage({
                sender: 'ammo',
                text: "Halo Bos! Gue Ammo AI. Mau curhat atau tanya apa nih? Gue siap bantu!",
                timestamp: Date.now(),
                read: true
            });
        }
    });
    
    onChildAdded(chatRef, (snapshot) => {
        const msg = snapshot.val();
        renderMessage(msg);
        if (msg.sender !== currentUser.username && !msg.read) {
            update(ref(db, `chats/${chatId}/messages/${snapshot.key}`), { read: true });
        }
        scrollToBottom();
    });
}

async function sendMessage() {
    const input = document.getElementById('chat-input-text');
    const text = input.value.trim();
    if(!text) return;
    input.value = ''; input.focus();

    const chatId = getChatId();
    const timestamp = Date.now();

    // 1. Simpan Pesan
    await push(ref(db, `chats/${chatId}/messages`), {
        sender: currentUser.username, text: text, timestamp: timestamp, read: false
    });

    // 2. Update Chat List
    // Logic Request: Jika kita kirim pesan ke orang baru, status mereka jadi 'pending'
    // Status kita sendiri 'accepted'
    
    // Update punya saya (Accepted)
    update(ref(db, `user_chats/${currentUser.username}/${currentChatPartner.key}`), { 
        lastMessage: text, lastSender: currentUser.username, timestamp: timestamp, seen: true, status: 'accepted'
    });

    // Update punya Partner
    // Cek dulu statusnya sekarang apa, kalau belum ada set 'pending'
    const partnerChatRef = ref(db, `user_chats/${currentChatPartner.key}/${currentUser.username}`);
    get(partnerChatRef).then((snap) => {
        let currentStatus = 'pending'; // Default Pending
        if (snap.exists()) {
            const data = snap.val();
            // Jika sudah accepted, tetap accepted. Jika pending, tetap pending.
            if (data.status) currentStatus = data.status;
        }
        
        // Simpan update ke partner
        update(partnerChatRef, { 
            lastMessage: text, lastSender: currentUser.username, timestamp: timestamp, seen: false, status: currentStatus
        });
    });

    // 3. AI & Notif
    if (!currentChatPartner.isAi) {
        sendPushNotification(currentChatPartner.key, currentUser.originalName, text);
    } else {
        // AI Logic
        try {
            const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: text }) });
            const data = await res.json();
            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error.";
            await push(ref(db, `chats/${chatId}/messages`), { sender: 'ammo', text: aiText, timestamp: Date.now(), read: true });
            
            // Update Summary Ammo
            update(ref(db, `user_chats/${currentUser.username}/ammo`), { lastMessage: aiText, lastSender: 'ammo', timestamp: Date.now(), seen: false, status: 'accepted' });
        } catch(e){} 
    }
}

function renderMessage(msg) {
    const container = document.getElementById('messages-container');
    const isMe = msg.sender === currentUser.username;
    
    const div = document.createElement('div');
    div.className = `msg-bubble-row ${isMe ? 'me' : 'other'}`;
    const time = new Date(msg.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    
    let tickHtml = '';
    if (isMe) {
        const color = msg.read ? '#34b7f1' : '#888'; 
        tickHtml = `
        <span class="tick-icon ${msg.read ? 'tick-read' : 'tick-sent'}">
            <svg viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.1 0.4L5.6 8.5L2.3 5.2L1 6.5L5.6 11L12.4 1.7L11.1 0.4Z" fill="${color}"/>
                <path d="M15.1 0.4L9.6 8.5L8.3 7.2L12.4 1.7L15.1 0.4Z" fill="${color}"/>
            </svg>
        </span>`;
    }

    div.innerHTML = `
        <div class="msg-content ${isMe ? 'my-msg' : 'their-msg'}">
            <div class="msg-text">${escapeHtml(msg.text)}</div>
            <div class="msg-meta">${time} ${tickHtml}</div>
        </div>
    `;
    container.appendChild(div);
}

// ---------------------------------------------
// 4. MODAL SEARCH USER
// ---------------------------------------------
function showAllUsersModal() {
    const modal = document.getElementById('modal-users-list');
    modal.classList.remove('hidden');
    modal.classList.add('modal-full'); 
    
    const container = document.getElementById('all-users-container');
    container.innerHTML = '';

    if (usersDataCache) {
        Object.values(usersDataCache).forEach(u => {
            if (u.username === currentUser.username) return;
            
            // Cek apakah user ini sudah ada di chat list (Accepted)
            // Kalau sudah, kita tetap tampilkan biar bisa buka chatnya lagi
            
            const avatarHTML = getAvatarHTML(u.username, u.originalName, u.avatar, "45px");
            const badgeHTML = getVerifiedBadge(u.username);

            const div = document.createElement('div');
            div.className = 'user-row-item';
            div.style = "display:flex; align-items:center; gap:15px; padding:15px; border-bottom:1px solid rgba(255,255,255,0.1); cursor:pointer;";
            div.innerHTML = `
                ${avatarHTML}
                <div style="flex:1;">
                    <div style="color:white; font-weight:bold; font-size:1rem;">${u.originalName} ${badgeHTML}</div>
                    <div style="color:#666; font-size:0.8rem;">@${u.username}</div>
                </div>
            `;
            div.onclick = () => {
                modal.classList.add('hidden');
                // Default buka sebagai 'accepted' (karena kita yg inisiatif chat)
                // Tapi nanti di sendMessage logika statusnya dihandle
                openChatRoom(u.username, u.originalName, u.avatar, false, 'accepted');
            };
            container.appendChild(div);
        });
    }
}

// HELPERS
function getAvatarHTML(userKey, name, customAvatar, size="50px", extraClass="chat-list-avatar") {
    if (userKey === 'amogenz') return `<img src="${AMOGENZ_AVATAR_URL}" class="${extraClass}" style="width:${size}; height:${size}; object-fit:cover;">`;
    if (userKey === 'ammo') return `<img src="${AMMO_AVATAR}" class="${extraClass}" style="width:${size}; height:${size}; object-fit:cover;">`;
    if (customAvatar) return `<img src="${customAvatar}" class="${extraClass}" style="width:${size}; height:${size}; object-fit:cover;">`;
    return `<div class="${extraClass}" style="width:${size}; height:${size}; background:#222; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:bold; border-radius:50%; border:1px solid #333;">${name.charAt(0).toUpperCase()}</div>`;
}

function getVerifiedBadge(username) {
    const shape = "M10.5 2.6C11.3 1.7 12.7 1.7 13.5 2.6L14.7 3.9C15 4.3 15.5 4.5 16 4.5L17.8 4.4C19 4.3 20 5.3 19.9 6.5L19.8 8.3C19.8 8.8 20 9.3 20.4 9.7L21.7 10.8C22.6 11.6 22.6 13 21.7 13.8L20.4 15C20 15.3 19.8 15.8 19.8 16.4L19.9 18.1C20 19.3 19 20.3 17.8 20.2L16 20.1C15.5 20.1 15 20.3 14.7 20.7L13.5 22C12.7 22.9 11.3 22.9 10.5 22L9.3 20.7C9 20.3 8.5 20.1 8 20.1L6.2 20.2C5 20.3 4 19.3 4.1 18.1L4.2 16.4C4.2 15.8 4 15.3 3.6 15L2.3 13.8C1.4 13 1.4 11.6 2.3 10.8L3.6 9.7C4 9.3 4.2 8.8 4.2 8.3L4.1 6.5C4 5.3 5 4.3 6.2 4.4L8 4.5C8.5 4.5 9 4.3 9.3 3.9L10.5 2.6Z";
    const check = "M9 12L11 14L15 10";
    let fill = "";
    if (LIST_AMOGENZ.includes(username)) fill = "#39FF14"; 
    else if (LIST_WHITE_TICK.includes(username)) fill = "#FFFFFF";
    else if (LIST_BLUE_TICK.includes(username)) fill = "#1da1f2";
    else return "";
    return `<span class="badge-chat" style="display:inline-block; width:16px; height:16px; margin-left:5px; vertical-align:middle;"><svg viewBox="0 0 24 24" fill="none"><path d="${shape}" fill="${fill}"/><path d="${check}" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
}

function handleTyping() {
    const chatId = getChatId();
    update(ref(db, `chats/${chatId}/typing/${currentUser.username}`), true);
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => update(ref(db, `chats/${chatId}/typing/${currentUser.username}`), false), 2000);
}
function scrollToBottom() { const c = document.getElementById('messages-container'); if(c) c.scrollTop = c.scrollHeight; }
function timeAgoShort(ts) {
    const now = Date.now();
    return (now - ts < 86400000) ? new Date(ts).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : new Date(ts).toLocaleDateString(); 
}
function escapeHtml(text) { return text ? text.replace(/&/g, "&amp;").replace(/</g, "&lt;") : ""; }

async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const reg = await navigator.serviceWorker.register('/sw.js');
            const permission = await Notification.requestPermission();
            if(permission==='granted') subscribeUserToPush(reg);
        } catch(e){}
    }
}
async function subscribeUserToPush(reg) {
    const publicKey = 'BB-JmrHvtnlwI5sinY2AHQShN5rLFo0m8mSZGMjgd4sHlxBoep0sWZyryP6vQXS-ewhSSySpRYVsBtXlQ-wegFo';
    try {
        const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(publicKey) });
        const u = JSON.parse(localStorage.getItem('amogenz_user'));
        fetch(`https://amogenz-default-rtdb.asia-southeast1.firebasedatabase.app/users/${u.username}/pushSub.json`, { method:'PUT', body:JSON.stringify(sub) });
    } catch(e){}
}
async function sendPushNotification(target, sender, text) {
    fetch('/api/notify', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({targetUser:target, title:sender, body:text})});
}
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}
