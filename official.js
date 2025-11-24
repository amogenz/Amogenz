/* AKSARA OFFICIAL CHANNEL - FINAL SMART EXIT & ADMIN FIX */

// Official Channel Configuration
const OFFICIAL_CHANNEL = true;
let isSuperAdmin = false;
let pendingMessages = [];

// SUPER ADMIN CONFIG
const SUPER_ADMIN_CONFIG = {
    passwordHash: "71710",
    secretCommand: "/superadmin",
    adminUsername: "Aksara"
};

let client;
let myName = "";
let myRoom = "";
let storageTopic = ""; 
const broadcastTopic = "aksara-global-v1/announcements";

// State Variables
let isAdminMode = false; 
let tempImageBase64 = null; 
let mediaRecorder, audioChunks = [], isRecording = false, audioBlobData = null;
let isSoundOn = true;
let sendOnEnter = true;
let tabNotificationsOn = true;
let replyingTo = null; 
let onlineUsers = {};
let typingTimeout;
let localChatHistory = []; 

// PERFORMANCE OPTIMIZATION VARIABLES
let saveDebounce, storageDebounce, typingThrottle = false;
let pingInterval;

// NOTIFICATION SYSTEM VARIABLES
let originalTitle = "";
let titleBlinkInterval;
let unreadCount = 0;
let isWindowFocused = true;
let audioUnlocked = false;

// Audio Elements
const notifAudio = document.getElementById('notifSound');
const sentAudio = document.getElementById('sentSound');

// ==================== SUPER ADMIN SYSTEM ====================

function authenticateSuperAdmin() {
    const password = prompt("🔐 SUPER ADMIN ACCESS\nEnter Master Password:");
    if (!password) return false;
    
    const inputHash = customHash(password);
    if (inputHash === SUPER_ADMIN_CONFIG.passwordHash) {
        enableSuperAdminMode();
        return true;
    } else {
        showToast("Access Denied!", "error");
        return false;
    }
}

function enableSuperAdminMode() {
    isSuperAdmin = true;
    isAdminMode = true;
    
    myName = SUPER_ADMIN_CONFIG.adminUsername;
    
    document.getElementById('side-user').innerText = "Aksara (Super Admin)";
    const inputWrapper = document.getElementById('input-wrapper');
    if(inputWrapper) inputWrapper.classList.add('super-admin-active');
    
    const sendBtn = document.getElementById('send-btn');
    if(sendBtn) sendBtn.style.background = '#FFD700';
    
    // Munculkan menu rahasia
    document.getElementById('admin-wallpaper-settings').style.display = 'block';
    document.getElementById('admin-online-section').style.display = 'block';
    
    showToast("⚡ MODE ADMIN AKTIF", "success");
    renderChat(false);
}

function disableSuperAdminMode() {
    isSuperAdmin = false;
    isAdminMode = false;

    const originalUser = localStorage.getItem('aksara_name') || document.getElementById('username').value;
    myName = originalUser;

    document.getElementById('side-user').innerText = myName;

    const inputWrapper = document.getElementById('input-wrapper');
    if(inputWrapper) inputWrapper.classList.remove('super-admin-active');

    const sendBtn = document.getElementById('send-btn');
    if(sendBtn) sendBtn.style.background = ''; 

    // Sembunyikan menu rahasia
    document.getElementById('admin-wallpaper-settings').style.display = 'none';
    document.getElementById('admin-online-section').style.display = 'none';

    showToast("Mode Admin Nonaktif", "info");
    renderChat(false);
}

function handleSpecialCommands(text) {
    if (text === SUPER_ADMIN_CONFIG.secretCommand) {
        if (authenticateSuperAdmin()) {
            const input = document.getElementById('msg-input');
            if(input) input.value = '';
        }
        return true;
    }

    if (text === "/exit") {
        if (isSuperAdmin) {
            disableSuperAdminMode();
            const input = document.getElementById('msg-input');
            if(input) input.value = '';
        }
        return true;
    }

    return false;
}

// ==================== MODIFIED MESSAGE SYSTEM ====================

function createOfficialMessageElement(data) {
    const isOfficialAdmin = data.user === SUPER_ADMIN_CONFIG.adminUsername;
    
    let deleteBtn = '';
    if (isSuperAdmin) {
        deleteBtn = `<i class="material-icons" onclick="deleteAnyMessage('${data.id}')" 
                      style="font-size:16px; color:red; cursor:pointer; margin-left:8px; vertical-align:middle; z-index:10;">
                      delete
                    </i>`;
    }
    
    const div = document.createElement('div');
    
    if (isOfficialAdmin) {
        div.className = 'message official-admin';
        div.id = data.id;
        
        // FIX: Handle text content for admin type
        let contentHtml = "";
        if (data.type === 'text' || data.type === 'admin') {
            contentHtml = `<div class="message-text">${data.content}</div>`;
        } 
        else if (data.type === 'image') {
            contentHtml = `<img src="${data.content}" class="chat-image" onclick="openLightbox(this.src)" style="max-height:200px; width:auto; border-radius:8px;">` + (data.caption ? `<div style="font-size:12px;margin-top:5px">${data.caption}</div>` : '');
        }
        else if (data.type === 'audio') {
            contentHtml = `<audio controls src="${data.content}"></audio>`;
        }

        // UI FIX: Badge Emas di sebelah nama
        div.innerHTML = `
            <div class="admin-avatar-container">
                <img src="https://i.imgur.com/Ct0pzwl.png" class="admin-avatar" alt="Aksara">
            </div>
            <div class="message-content">
                <div class="admin-header">
                    <span class="admin-title">Aksara</span>
                    <i class="material-icons verified-gold">verified</i>
                    ${deleteBtn}
                </div>
                ${contentHtml}
                <div class="message-time">${data.time} ✓</div>
            </div>
        `;
    } else {
        const isMe = data.user === myName;
        div.className = isMe ? 'message right' : 'message left';
        div.id = data.id;
        
        let contentHtml = "";
        if (data.type === 'text') contentHtml = `<span class="msg-content">${data.content}</span>`;
        else if (data.type === 'image') contentHtml = `<img src="${data.content}" class="chat-image" onclick="openLightbox(this.src)" style="max-height:200px; width:auto;">` + (data.caption ? `<div style="font-size:12px;margin-top:5px">${data.caption}</div>` : '');
        else if (data.type === 'audio') contentHtml = `<audio controls src="${data.content}"></audio>`;

        div.innerHTML = `
            <div style="display:flex; align-items:center; gap:5px; margin-bottom:2px;">
                <span class="sender-name">${data.user}</span>
                ${deleteBtn}
            </div>
            <div>${contentHtml}</div>
            <div class="time-info">${data.time}</div>
        `;
    }
    
    return div;
}

// ==================== CORE FUNCTIONS ====================

function customHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i) * (i + 1);
    }
    return (hash * 10).toString();
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if(!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'info';
    let color = '#007AFF';
    if (type === 'success') { icon = 'check_circle'; color = '#34C759'; }
    if (type === 'error') { icon = 'error'; color = '#ff4444'; }
    
    toast.innerHTML = `<i class="material-icons" style="color:${color}">${icon}</i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { 
        toast.style.opacity = '0'; 
        setTimeout(() => toast.remove(), 500); 
    }, 3000);
}

function sendMessage() {
    const input = document.getElementById('msg-input');
    if(!input) return;
    const text = input.value.trim();
    if (!text) return;

    if (handleSpecialCommands(text)) {
        return;
    }
    
    publishMessage(text, 'text');
    input.value = '';
    input.style.height = 'auto';
    input.focus();
}

// ==================== DELETE MESSAGE SYSTEM ====================

function deleteAnyMessage(messageId) {
    if (!isSuperAdmin) {
        showToast("Akses Ditolak", "error");
        return;
    }
    
    if (!confirm("Hapus pesan ini secara permanen?")) return;
    
    const msgEl = document.getElementById(messageId);
    if(msgEl) msgEl.style.opacity = '0.3';

    if (client && client.connected) {
        client.publish(myRoom, JSON.stringify({
            type: 'message_deleted',
            targetId: messageId,
            deletedBy: "Admin",
            timestamp: Date.now()
        }));
        
        localChatHistory = localChatHistory.filter(msg => msg.id !== messageId);
        saveToLocal();
        showToast("Pesan dihapus", "success");
    }
}

function handleMessageDeletion(data) {
    if (data.type === 'message_deleted') {
        const messageElement = document.getElementById(data.targetId);
        if (messageElement) {
            messageElement.style.transition = 'all 0.3s ease';
            messageElement.style.transform = 'scale(0.9)';
            messageElement.style.opacity = '0';
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }
        localChatHistory = localChatHistory.filter(msg => msg.id !== data.targetId);
        saveToLocal();
    }
}

function publishMessage(content, type = 'text', caption = '') {
    if (!content) return;
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
    const msgId = 'msg-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    
    let finalType = type;
    let finalTopic = myRoom;
    let mqttOpts = {};

    if (isSuperAdmin) {
        finalTopic = broadcastTopic; 
        mqttOpts = { retain: true, qos: 1 };
        if (type === 'text') finalType = 'admin';
    }

    const payload = { 
        id: msgId, 
        user: myName, 
        content: content, 
        type: finalType, 
        caption: caption, 
        time: time, 
        timestamp: Date.now(),
        isAdmin: isSuperAdmin 
    };

    try { 
        client.publish(finalTopic, JSON.stringify(payload), mqttOpts); 
        if (isSoundOn && type !== 'system') playSound('sent');
    } catch(e) { 
        showToast("Gagal kirim", "error"); 
    }
}

function handleIncomingMessage(data) {
    if (data.type === 'message_deleted') {
        handleMessageDeletion(data);
        return; 
    }
    
    const isSystem = (data.type === 'system');
    const isMe = data.user === myName;
    
    if (!isSystem) {
        if (!localChatHistory.some(msg => msg.id === data.id)) {
            localChatHistory.push(data);
            if (localChatHistory.length > 77) localChatHistory = localChatHistory.slice(-77); 
            
            const chatBox = document.getElementById('messages');
            const newMsg = createOfficialMessageElement(data);
            chatBox.appendChild(newMsg);
            
            debouncedSaveToLocal();
            scrollToBottom(true);
            
            if (!isMe) playSound('received');
            if (isMe && !data.isAdmin) {
                debouncedUpdateServerStorage();
            }
        }
    } else {
        renderSingleElement(data);
    }
}

function renderChat(forceScroll = false) {
    const chatBox = document.getElementById('messages');
    chatBox.innerHTML = '<div class="welcome-msg">Official Channel - Saran & feedback akan ditinjau admin</div>';
    localChatHistory.forEach(msg => { 
        chatBox.appendChild(createOfficialMessageElement(msg)); 
    });
    scrollToBottom(forceScroll);
}

function renderSingleElement(data) {
    const chatBox = document.getElementById('messages');
    chatBox.appendChild(createOfficialMessageElement(data));
    scrollToBottom(false);
}

function scrollToBottom(force = false) {
    const chatBox = document.getElementById('messages');
    const isAtBottom = (chatBox.scrollHeight - chatBox.scrollTop - chatBox.clientHeight) < 150;
    if (force || isAtBottom) {
        setTimeout(() => {
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 100);
    }
}

// ==================== PERFORMANCE OPTIMIZED FUNCTIONS ====================

function debouncedSaveToLocal() {
    clearTimeout(saveDebounce);
    saveDebounce = setTimeout(() => saveToLocal(), 1000);
}

function debouncedUpdateServerStorage() {
    clearTimeout(storageDebounce);
    storageDebounce = setTimeout(() => updateServerStorage(), 5000);
}

function handleTyping() {
    const el = document.getElementById('msg-input');
    if(!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
    
    if (!typingThrottle && client && client.connected) {
        typingThrottle = true;
        client.publish(myRoom, JSON.stringify({type:'typing', user:myName}));
        setTimeout(() => { typingThrottle = false; }, 1000);
    }
}

// ==================== NOTIFICATION & SOUND ====================

function initializeNotificationSystem() {
    originalTitle = document.title;
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('visibilitychange', handleVisibilityChange);
    initializeBrowserNotifications();
}

function handleWindowFocus() { isWindowFocused = true; resetNotifications(); }
function handleWindowBlur() { isWindowFocused = false; }
function handleVisibilityChange() { if (!document.hidden) resetNotifications(); }

function initializeBrowserNotifications() {
    if ("Notification" in window && Notification.permission === "default") {
        setTimeout(() => { Notification.requestPermission(); }, 2000);
    }
}

function showNewMessageNotification(message) {
    if (!tabNotificationsOn) return;
    if (message.user === myName) return;
    unreadCount++;
    startTitleBlinking(message);
    updateFaviconBadge();
    playSound('received');
    showBrowserNotification(message);
}

function startTitleBlinking(message) {
    if (titleBlinkInterval) clearInterval(titleBlinkInterval);
    const messagePreview = message.content.length > 30 ? message.content.substring(0, 30) + '...' : message.content;
    let showAlert = true;
    titleBlinkInterval = setInterval(() => {
        document.title = showAlert ? `🔔 (${unreadCount}) ${message.user}: ${messagePreview}` : originalTitle;
        showAlert = !showAlert;
    }, 1000);
}

function updateFaviconBadge() {
    const header = document.querySelector('header');
    if (header && unreadCount > 0 && !isWindowFocused) {
        header.style.boxShadow = '0 0 0 2px var(--ios-red)';
    } else if (header) {
        header.style.boxShadow = '';
    }
}

function showBrowserNotification(message) {
    if (!("Notification" in window) || Notification.permission !== "granted" || document.hasFocus()) return;
    const notification = new Notification(`Pesan dari ${message.user}`, {
        body: message.type === 'text' ? message.content : `Mengirim ${message.type}`,
        icon: 'https://i.imgur.com/Ct0pzwl.png',
        tag: 'aksara-chat',
        requireInteraction: false
    });
    notification.onclick = function() { window.focus(); notification.close(); };
    setTimeout(() => notification.close(), 5000);
}

function resetNotifications() {
    if (titleBlinkInterval) { clearInterval(titleBlinkInterval); titleBlinkInterval = null; }
    document.title = originalTitle;
    unreadCount = 0;
    const header = document.querySelector('header');
    if (header) header.style.boxShadow = '';
}

function unlockAudio() {
    if (audioUnlocked) return;
    const unlock = () => {
        const silentPlay = (audio) => {
            if (!audio) return Promise.resolve();
            audio.volume = 0.01;
            return audio.play().then(() => {
                audio.pause(); audio.currentTime = 0; audio.volume = 1.0; return true;
            }).catch(() => false);
        };
        Promise.all([silentPlay(notifAudio), silentPlay(sentAudio)]).then(results => {
            if (results.some(result => result)) audioUnlocked = true;
        });
    };
    unlock();
    const e = () => { unlock(); document.removeEventListener('click', e); document.removeEventListener('keydown', e); document.removeEventListener('touchstart', e); };
    document.addEventListener('click', e); document.addEventListener('keydown', e); document.addEventListener('touchstart', e);
}

function playSound(type) {
    if (!isSoundOn) return;
    const audio = (type === 'sent') ? sentAudio : notifAudio;
    if (!audio) return;
    audio.volume = (type === 'sent') ? 0.4 : 1.0;
    audio.currentTime = 0;
    audio.play().catch(error => {});
}

// ==================== CHAT SYSTEM (FIXED WALLPAPER SYNC) ====================

function startChat() {
    const userEl = document.getElementById('username');
    const roomEl = document.getElementById('room');
    
    if (!userEl || !roomEl) { console.error("Critical elements missing"); return; }

    const user = userEl.value.trim();
    const room = roomEl.value.trim().toLowerCase();
    
    if (!user || !room) { showToast("Data tidak lengkap", "error"); return; }

    localStorage.setItem('aksara_name', user);
    localStorage.setItem('aksara_room', room);
    
    myName = user;
    myRoom = "aksara-v29/" + room; 
    storageTopic = myRoom + "/storage"; 

    document.getElementById('side-user').innerText = myName;
    const chatScreen = document.getElementById('chat-screen');
    if(chatScreen) chatScreen.style.display = 'flex';
    document.getElementById('room-display').innerText = "#" + room;
    document.getElementById('typing-indicator').innerText = "Menghubungkan...";

    loadFromLocal(); 

    const options = { 
        protocol: 'wss', host: 'broker.emqx.io', port: 8084, path: '/mqtt',
        clean: true, reconnectPeriod: 4000, connectTimeout: 10000,
        clientId: 'aks_official_' + Math.random().toString(16).substr(2, 8)
    };
    
    try {
        client = mqtt.connect('wss://broker.emqx.io:8084/mqtt', options);

        client.on('connect', () => {
            console.log("✅ MQTT Connected!");
            document.getElementById('typing-indicator').innerText = "";
            client.subscribe(myRoom); 
            client.subscribe(storageTopic);
            client.subscribe(broadcastTopic); 
            
            publishMessage("bergabung.", 'system');
            showToast("Connected to Official Channel!", "success");
            
            pingInterval = setInterval(() => { 
                if (client && client.connected) {
                    client.publish(myRoom, JSON.stringify({ type: 'ping', user: myName })); 
                    cleanOnlineList(); 
                }
            }, 30000);
        });

        client.on('message', (topic, message) => {
            const msgString = message.toString();
            try {
                const data = JSON.parse(msgString);
                
                // Wallpaper Sync
                if (data.type === 'admin_wallpaper') {
                    localStorage.setItem('aksara_bg_image', data.content);
                    document.body.style.backgroundImage = `url(${data.content})`;
                    showToast("Wallpaper diperbarui oleh Admin", "info");
                    return;
                }

                if (data.type === 'typing') showTyping(data.user);
                else if (data.type === 'ping') updateOnlineList(data.user);
                else if (data.type === 'message_deleted') handleMessageDeletion(data);
                else {
                    handleIncomingMessage(data);
                    updateOnlineList(data.user);
                    if (!isWindowFocused && data.user !== myName) showNewMessageNotification(data);
                }
            } catch (e) {}
        });

        client.on('error', (error) => document.getElementById('typing-indicator').innerText = "Connection error");
        client.on('offline', () => document.getElementById('typing-indicator').innerText = "Reconnecting...");
        client.on('reconnect', () => document.getElementById('typing-indicator').innerText = "Reconnecting...");

    } catch (error) {
        document.getElementById('typing-indicator').innerText = "Failed to connect";
    }
}

// ==================== UTILITY FUNCTIONS ====================

function handleEnter(e) { if (e.key === 'Enter' && !e.shiftKey && sendOnEnter) { e.preventDefault(); sendMessage(); } }
function showTyping(user) { if(user===myName)return; const ind=document.getElementById('typing-indicator'); ind.innerText=`${user} typing...`; clearTimeout(typingTimeout); typingTimeout=setTimeout(()=>{ind.innerText="";},2000); }
function updateOnlineList(user) { onlineUsers[user]=Date.now(); renderOnlineList(); }
function cleanOnlineList() { const now=Date.now(); for(const u in onlineUsers)if(now-onlineUsers[u]>40000)delete onlineUsers[u]; renderOnlineList(); }
function renderOnlineList() { const l=document.getElementById('online-list'); const c=document.getElementById('online-count'); l.innerHTML=""; let count=0; for(const u in onlineUsers){ const li=document.createElement('li'); li.innerHTML=`<span style="color:var(--ios-green)">●</span> ${u}`; l.appendChild(li); count++; } if(c)c.innerText=count; }

function toggleSidebar() { const sb=document.getElementById('sidebar'); const ov=document.getElementById('sidebar-overlay'); if(sb.style.left==='0px'){sb.style.left='-350px';sb.classList.remove('active');ov.style.display='none';}else{sb.style.left='0px';sb.classList.add('active');ov.style.display='block';} }

function handleBackgroundUpload(input) { 
    const f=input.files[0]; 
    if(f){ 
        const r=new FileReader(); 
        r.onload=e=>{
            try{
                const bgData = e.target.result;
                localStorage.setItem('aksara_bg_image', bgData); 
                document.body.style.backgroundImage=`url(${bgData})`; 
                showToast("Background diganti","success");

                if (isSuperAdmin && client && client.connected) {
                    client.publish(myRoom, JSON.stringify({
                        type: 'admin_wallpaper',
                        content: bgData,
                        user: "Admin"
                    }), { retain: true, qos: 1 });
                    showToast("Wallpaper disinkronkan!", "success");
                }
            } catch(e){
                showToast("Gambar terlalu besar!","error");
            }
        }; 
        r.readAsDataURL(f); 
    } 
    input.value=""; 
}

function resetBackground() { localStorage.removeItem('aksara_bg_image'); document.body.style.backgroundImage=""; showToast("Background reset","info"); }
function toggleSound() { isSoundOn=document.getElementById('sound-toggle').checked; localStorage.setItem('aksara_sound',isSoundOn); }
function toggleEnterSettings() { sendOnEnter=document.getElementById('enter-toggle').checked; localStorage.setItem('aksara_enter',sendOnEnter); }
function toggleNotifSettings() { tabNotificationsOn=document.getElementById('notif-toggle').checked; localStorage.setItem('aksara_notif',tabNotificationsOn); }

function loadFromLocal() { const saved = localStorage.getItem(getStorageKey()); if (saved) { localChatHistory = JSON.parse(saved); renderChat(); } }
function saveToLocal() { localStorage.setItem(getStorageKey(), JSON.stringify(localChatHistory)); }
function getStorageKey() { return 'aksara_history_v29_' + myRoom; }
function updateServerStorage() { if(client && client.connected) client.publish(storageTopic, JSON.stringify(localChatHistory), { retain: true, qos: 1 }); }

// MEDIA HANDLERS
function triggerImageUpload() { document.getElementById('chat-file-input').click(); }
function handleImageUpload(input) { 
    const f = input.files[0]; 
    if(f){ const r=new FileReader(); r.onload=e=>{ tempImageBase64 = e.target.result; document.getElementById('preview-img').src=tempImageBase64; document.getElementById('image-preview-modal').style.display='flex'; }; r.readAsDataURL(f); } input.value=""; 
}
function cancelImagePreview() { document.getElementById('image-preview-modal').style.display='none'; document.getElementById('img-caption').value=""; tempImageBase64=null; }
function sendImageWithCaption() {
    if(!tempImageBase64) return;
    const caption = document.getElementById('img-caption').value.trim(); 
    const img = new Image(); 
    img.src = tempImageBase64;
    img.onload = function() { 
        requestAnimationFrame(() => {
            const c = document.createElement('canvas');
            const ctx = c.getContext('2d');
            const s = 300/img.width;
            c.width = 300;
            c.height = img.height * s;
            ctx.drawImage(img, 0, 0, c.width, c.height); 
            publishMessage(c.toDataURL('image/jpeg', 0.6), 'image', caption); 
            cancelImagePreview(); 
        });
    }
}
function sendVoiceNote() { const r = new FileReader(); r.readAsDataURL(audioBlobData); r.onloadend = () => { publishMessage(r.result, 'audio'); cancelVoiceNote(); }; }
function cancelVoiceNote() { audioBlobData = null; document.getElementById('vn-preview-bar').style.display = 'none'; document.getElementById('main-input-area').style.display = 'flex'; }
function setReply(id, user, text) { replyingTo = { id, user, text }; document.getElementById('reply-preview-bar').style.display = 'flex'; document.getElementById('reply-to-user').innerText = user; document.getElementById('reply-preview-text').innerText = text.substring(0,50)+'...'; document.getElementById('msg-input').focus(); }
function cancelReply() { replyingTo = null; document.getElementById('reply-preview-bar').style.display = 'none'; }
function openLightbox(src) { document.getElementById('lightbox-img').src = src; document.getElementById('lightbox-overlay').style.display = 'flex'; }
function closeLightbox(e) { if (e.target.classList.contains('lightbox-close') || e.target.id === 'lightbox-overlay') { document.getElementById('lightbox-overlay').style.display = 'none'; } }

async function toggleRecording() {
    if (!isRecording) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream); audioChunks = [];
            mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
            mediaRecorder.onstop = () => { audioBlobData = new Blob(audioChunks, { type: 'audio/webm' }); document.getElementById('vn-player').src = URL.createObjectURL(audioBlobData); document.getElementById('vn-preview-bar').style.display = 'flex'; document.getElementById('main-input-area').style.display = 'none'; };
            mediaRecorder.start(); isRecording = true; document.getElementById('mic-btn').classList.add('recording');
        } catch (err) { showToast("Butuh izin mic!", "error"); }
    } else { mediaRecorder.stop(); isRecording = false; document.getElementById('mic-btn').classList.remove('recording'); }
}

// SMART EXIT LOGIC (FIXED)
function leaveRoom() { 
    if(confirm("Kembali ke menu utama?")) { 
        if (pingInterval) clearInterval(pingInterval);
        if (titleBlinkInterval) clearInterval(titleBlinkInterval);
        publishMessage("telah keluar.", 'system'); 
        setTimeout(() => {
            // Hapus room official saja, biarkan nama tetap ada
            localStorage.removeItem('aksara_room'); 
            window.location.href = 'index.html'; 
        }, 500);
    } 
}

window.onload = function() {
    const usernameInput = document.getElementById('username');
    const safeUserVal = usernameInput ? usernameInput.value : 'guest';
    const savedUser = localStorage.getItem('aksara_redirect_user') || localStorage.getItem('aksara_name') || safeUserVal;
    
    if (savedUser && usernameInput) {
        usernameInput.value = savedUser;
        myName = savedUser;
        document.getElementById('side-user').innerText = savedUser;
    }
    
    const roomInput = document.getElementById('room');
    if(roomInput) roomInput.value = "aksara";
    
    isSoundOn = (localStorage.getItem('aksara_sound') === 'true');
    sendOnEnter = (localStorage.getItem('aksara_enter') === 'true');
    tabNotificationsOn = (localStorage.getItem('aksara_notif') !== 'false');
    
    const toggleS = document.getElementById('sound-toggle'); if(toggleS) toggleS.checked = isSoundOn;
    const toggleE = document.getElementById('enter-toggle'); if(toggleE) toggleE.checked = sendOnEnter;
    const toggleN = document.getElementById('notif-toggle'); if(toggleN) toggleN.checked = tabNotificationsOn;

    const savedBg = localStorage.getItem('aksara_bg_image');
    if(savedBg) document.body.style.backgroundImage = `url(${savedBg})`;
    
    initializeNotificationSystem();
    setTimeout(unlockAudio, 1000);
};

// ==================== CSS STYLING ====================

const superAdminStyles = `
<style>
.message.official-admin {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    background: linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,215,0,0.05));
    border: 1px solid rgba(255,215,0,0.3);
    border-radius: 18px;
    padding: 12px;
    margin: 8px 0;
    max-width: 85%;
    align-self: flex-start;
    backdrop-filter: blur(10px);
}
.admin-avatar-container { position: relative; flex-shrink: 0; }
.admin-avatar { width: 42px; height: 42px; border-radius: 50%; border: 2px solid #FFD700; box-shadow: 0 2px 8px rgba(255,215,0,0.3); }

/* NEW BADGE STYLE - INLINE */
.verified-gold {
    font-size: 16px;
    color: #FFD700;
    margin-left: 4px;
    filter: drop-shadow(0 0 2px rgba(255,215,0,0.5));
}

.admin-header { display: flex; align-items: center; gap: 4px; margin-bottom: 6px; }
.admin-title { background: linear-gradient(135deg, #FFD700, #FFA500); color: #000; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 800; }
.message-text { color: #000; line-height: 1.4; font-size: 14.5px; }
.message-time { font-size: 11px; color: #666; margin-top: 4px; display: flex; align-items: center; gap: 4px; }
.super-admin-active { border: 2px solid #FFD700 !important; box-shadow: 0 0 20px rgba(255, 215, 0, 0.3) !important; background: rgba(255,215,0,0.1) !important; }
.message { transition: all 0.3s ease; }
</style>
`;

document.head.insertAdjacentHTML('beforeend', superAdminStyles);

console.log("🚀 Aksara Official Channel dengan FIX Admin UI Loaded!");
