/**
 * AKSARA CHAT SYSTEM - ROBUST VERSION
 * Fixes: Global Scope for OnClick, Syntax Errors, Admin Logic
 */

// --- 1. GLOBAL VARIABLES ---
var client; // Menggunakan var agar lebih tahan banting di scope global
var myName = "";
var myRoom = "";
var storageTopic = ""; 
var broadcastTopic = "aksara-global-v1/announcements";

// PASSWORD ADMIN (Hash SHA-256 dari "p")
var ADMIN_HASH = "83878c91171338902e0fe0fb97a8c47a828505289d1b8e9def57d66bd3451655";
var ADMIN_PASS_TEXT = "p"; 

// State Variables
var tempImageBase64 = null; // Wajib ada untuk upload gambar
var isAdminMode = false; 
var mediaRecorder = null;
var audioChunks = [];
var isRecording = false;
var audioBlobData = null;
var isSoundOn = true;
var sendOnEnter = true;
var replyingTo = null; 
var onlineUsers = {};
var typingTimeout;
var localChatHistory = []; 

// Audio Elements
var notifAudio = document.getElementById('notifSound');
var sentAudio = document.getElementById('sentSound');


// --- 2. HELPER FUNCTIONS ---

async function digestMessage(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Menempelkan fungsi ke window agar terbaca oleh onclick HTML
window.showToast = function(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
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

window.toggleAdminMode = function(active) {
    isAdminMode = active;
    const wrapper = document.getElementById('input-wrapper');
    const sendBtn = document.getElementById('send-btn');
    
    if (active) {
        if(wrapper) {
            wrapper.style.border = "1px solid #FFD700";
            wrapper.style.boxShadow = "0 0 10px rgba(255, 215, 0, 0.3)";
        }
        if(sendBtn) {
            sendBtn.style.background = '#FFD700'; 
            sendBtn.style.color = '#000';
        }
        showToast("Mode Admin AKTIF", "success");
    } else {
        if(wrapper) {
            wrapper.style.border = "1px solid rgba(255,255,255,0.5)";
            wrapper.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
        }
        if(sendBtn) {
            sendBtn.style.background = '#007AFF'; 
            sendBtn.style.color = '#fff';
        }
        showToast("Mode Admin NONAKTIF", "info");
    }
}


// --- 3. INITIALIZATION ---

window.onload = function() {
    // Load Settings
    if(localStorage.getItem('aksara_name')) document.getElementById('username').value = localStorage.getItem('aksara_name');
    if(localStorage.getItem('aksara_room')) document.getElementById('room').value = localStorage.getItem('aksara_room');
    
    isSoundOn = (localStorage.getItem('aksara_sound') === 'true');
    sendOnEnter = (localStorage.getItem('aksara_enter') === 'true');
    
    const toggleS = document.getElementById('sound-toggle');
    if(toggleS) { toggleS.checked = isSoundOn; toggleS.addEventListener('change', window.toggleSound); }
    
    const toggleE = document.getElementById('enter-toggle');
    if(toggleE) { toggleE.checked = sendOnEnter; toggleE.addEventListener('change', window.toggleEnterSettings); }

    const savedBg = localStorage.getItem('aksara_bg_image');
    if(savedBg) document.body.style.backgroundImage = `url(${savedBg})`;

    // Event Listener khusus untuk Input (selain onclick)
    const msgInput = document.getElementById('msg-input');
    if(msgInput) {
        msgInput.addEventListener('keydown', window.handleEnter);
        msgInput.addEventListener('input', window.handleTyping);
    }
};


// --- 4. CORE CONNECTION ---

window.startChat = function() {
    const user = document.getElementById('username').value.trim();
    const room = document.getElementById('room').value.trim().toLowerCase();
    if (!user || !room) { showToast("Lengkapi data!", "error"); return; }

    localStorage.setItem('aksara_name', user);
    localStorage.setItem('aksara_room', room);
    
    myName = user;
    myRoom = "aksara-v29/" + room; 
    storageTopic = myRoom + "/storage"; 

    document.getElementById('side-user').innerText = myName;
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('chat-screen').style.display = 'flex';
    document.getElementById('room-display').innerText = "#" + room;
    document.getElementById('typing-indicator').innerText = "Menghubungkan...";

    loadFromLocal(); 

    const options = { 
        protocol: 'wss', type: 'mqtt', clean: true, 
        reconnectPeriod: 1000, 
        clientId: 'aks_' + Math.random().toString(16).substr(2, 8) 
    };
    client = mqtt.connect('wss://broker.emqx.io:8084/mqtt', options);

    client.on('connect', () => {
        document.getElementById('typing-indicator').innerText = "";
        client.subscribe(myRoom); 
        client.subscribe(storageTopic); 
        client.subscribe(broadcastTopic);
        
        publishMessage("bergabung.", 'system');
        
        setInterval(() => { 
            client.publish(myRoom, JSON.stringify({ type: 'ping', user: myName })); 
            cleanOnlineList(); 
        }, 10000);
    });

    client.on('message', (topic, message) => {
        const msgString = message.toString();
        
        // ADMIN BROADCAST
        if (topic === broadcastTopic) {
            try {
                const data = JSON.parse(msgString);
                if (data.type === 'admin_clear') {
                    // Hapus semua pesan admin dari memory lokal
                    localChatHistory = localChatHistory.filter(msg => !msg.isAdmin && msg.type !== 'admin');
                    saveToLocal(); 
                    renderChat();
                    showToast("Pengumuman Admin Ditarik", "info");
                } else {
                    // Jika ada pesan admin baru, hapus yang lama dulu biar cuma 1
                    localChatHistory = localChatHistory.filter(msg => !msg.isAdmin && msg.type !== 'admin');
                    handleIncomingMessage(data); 
                }
            } catch(e) {}
            return;
        }

        if (topic === storageTopic) { 
            try { 
                const srv = JSON.parse(msgString); 
                if (Array.isArray(srv)) mergeWithLocal(srv); 
            } catch(e) {} 
            return; 
        }

        if (topic === myRoom) { 
            try { 
                const data = JSON.parse(msgString); 
                if (data.type === 'ping') { updateOnlineList(data.user); return; } 
                if (data.type === 'typing') { showTyping(data.user); return; } 
                handleIncomingMessage(data); 
            } catch(e) {} 
        }
    });
}


// --- 5. MESSAGE LOGIC ---

function handleIncomingMessage(data) {
    const isSystem = (data.type === 'system' || data.type === 'admin_clear');
    
    if (!isSystem) {
        if (!localChatHistory.some(msg => msg.id === data.id)) {
            localChatHistory.push(data);
            
            if (localChatHistory.length > 77) localChatHistory = localChatHistory.slice(-77); 
            
            saveToLocal(); 
            renderChat(); 
            
            if (data.user !== myName) playSound('received');

            // Admin tidak update storage room biasa
            if (data.user === myName && !data.isAdmin) updateServerStorage();
        }
    } else {
        renderSingleElement(data);
    }
}

function renderChat() {
    const chatBox = document.getElementById('messages');
    chatBox.innerHTML = '<div class="welcome-msg">Messages are encrypted and secure.</div>';
    localChatHistory.forEach(msg => { chatBox.appendChild(createMessageElement(msg)); });
    scrollToBottom();
}

function renderSingleElement(data) {
    const chatBox = document.getElementById('messages');
    chatBox.appendChild(createMessageElement(data));
    scrollToBottom();
}

function createMessageElement(data) {
    const div = document.createElement('div');
    const isMe = data.user === myName;
    if (data.id) div.id = data.id;

    // SYSTEM
    if (data.type === 'system') {
        div.style.textAlign = 'center'; div.style.fontSize = '11px'; 
        div.style.color = '#fff'; div.style.opacity = '0.7'; div.style.margin = '10px 0'; 
        div.innerText = `${data.user} ${data.content}`;
        return div;
    }

    // ADMIN
    if (data.isAdmin || data.type === 'admin') {
        div.className = 'message admin';
        let contentHtml = "";
        if (data.type === 'image') {
            contentHtml = `<img src="${data.content}" class="chat-image" onclick="openLightbox(this.src)" style="max-height:200px; width:auto;">` + (data.caption ? `<div style="font-size:12px;margin-top:5px;color:#fff">${data.caption}</div>` : '');
        } else if (data.type === 'audio') {
            contentHtml = `<audio controls src="${data.content}" style="width:100%; margin-top:5px;"></audio>`;
        } else {
            contentHtml = data.content.replace(/\n/g, '<br>');
        }
        div.innerHTML = `
            <div class="admin-badge">AKSARA <i class="material-icons" style="font-size:16px; color:#FFD700; margin-left:4px;">verified</i></div>
            <div class="admin-content">${contentHtml}</div>
            <div class="admin-time">${data.time}</div>
        `;
        return div;
    }

    // NORMAL
    div.className = isMe ? 'message right' : 'message left';
    let contentHtml = "";
    if (data.type === 'text') contentHtml = `<span class="msg-content">${data.content}</span>`;
    else if (data.type === 'image') contentHtml = `<img src="${data.content}" class="chat-image" onclick="openLightbox(this.src)">` + (data.caption ? `<div style="font-size:12px;margin-top:5px">${data.caption}</div>` : '');
    else if (data.type === 'audio') contentHtml = `<audio controls src="${data.content}"></audio>`;

    let replyHtml = "";
    if (data.reply) {
        replyHtml = `<div class="reply-quote" onclick="scrollToMessage('${data.reply.id}')"><div class="reply-content"><b>${data.reply.user}</b><span>${data.reply.text.substring(0, 40)}...</span></div></div>`;
    }

    const replyBtn = !isMe ? `<i class="material-icons reply-btn" onclick="setReply('${data.id||'unknown'}', '${data.user}', '${data.type==='text'?data.content.replace(/'/g,""):data.type}')">reply</i>` : '';

    div.innerHTML = `<span class="sender-name">${data.user}</span>${replyHtml}<div>${contentHtml}</div><div class="time-info">${data.time} ${replyBtn}</div>`;
    return div;
}

function scrollToBottom() {
    const chatBox = document.getElementById('messages');
    if (chatBox.scrollHeight - chatBox.scrollTop - chatBox.clientHeight < 250) {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}


// --- 6. UTILS (Storage & Logic) ---

function loadFromLocal() {
    const saved = localStorage.getItem(getStorageKey());
    if (saved) { localChatHistory = JSON.parse(saved); renderChat(); }
}
function saveToLocal() { localStorage.setItem(getStorageKey(), JSON.stringify(localChatHistory)); }
function getStorageKey() { return 'aksara_history_v29_' + myRoom; }
function updateServerStorage() { client.publish(storageTopic, JSON.stringify(localChatHistory), { retain: true, qos: 1 }); }

function mergeWithLocal(serverData) {
    let changed = false;
    serverData.forEach(srvMsg => {
        if (!localChatHistory.some(locMsg => locMsg.id === srvMsg.id)) {
            localChatHistory.push(srvMsg);
            changed = true;
        }
    });
    if (changed) {
        localChatHistory.sort((a, b) => a.timestamp - b.timestamp);
        if (localChatHistory.length > 77) localChatHistory = localChatHistory.slice(-77);
        saveToLocal();
        renderChat();
    }
}


// --- 7. ACTIONS (Global Binding) ---

function publishMessage(content, type = 'text', caption = '') {
    if (!content) return;
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
    const msgId = 'msg-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    
    let finalType = type;
    let finalTopic = myRoom;
    let mqttOpts = {};

    if (isAdminMode) {
        finalTopic = broadcastTopic;
        mqttOpts = { retain: true, qos: 1 };
        if (type === 'text') finalType = 'admin';
    } else if (type === 'admin_clear') {
        finalTopic = broadcastTopic;
        mqttOpts = { retain: true, qos: 1 };
    }

    const payload = { 
        id: msgId, user: myName, content: content, type: finalType, 
        caption: caption, time: time, reply: replyingTo, timestamp: Date.now(),
        isAdmin: isAdminMode 
    };

    try { 
        client.publish(finalTopic, JSON.stringify(payload), mqttOpts); 
        if (isSoundOn && !isAdminMode && type !== 'system') playSound('sent');
    } catch(e) { showToast("Gagal kirim", "error"); }
    
    if (!isAdminMode) window.cancelReply();
}

window.sendMessage = async function() {
    const input = document.getElementById('msg-input');
    const text = input.value.trim();
    
    if (!text) return;

    // ADMIN LOGIN
    if (text.startsWith('/admin ')) {
        const pass = text.split(' ')[1];
        try {
            const hashed = await digestMessage(pass);
            if (hashed === ADMIN_HASH || pass === ADMIN_PASS_TEXT) toggleAdminMode(true);
            else showToast("Password Salah", "error");
        } catch(e) { if(pass===ADMIN_PASS_TEXT) toggleAdminMode(true); }
        input.value = ''; input.style.height = 'auto'; input.focus();
        return;
    }

    // LOGOUT
    if (text === '/exit') {
        toggleAdminMode(false);
        input.value = ''; input.style.height = 'auto'; input.focus();
        return;
    }
    
    // HAPUS ADMIN
    if (text.startsWith('/hapusadmin')) {
        const pass = text.split(' ')[1];
        try {
            const hashed = await digestMessage(pass);
            if (hashed === ADMIN_HASH || pass === ADMIN_PASS_TEXT) { publishMessage('clear', 'admin_clear'); showToast("Dihapus", "success"); }
            else showToast("Password Salah", "error");
        } catch(e) { if(pass===ADMIN_PASS_TEXT) { publishMessage('clear', 'admin_clear'); } }
        input.value = ''; return;
    }

    publishMessage(text, 'text');
    input.value = ''; input.style.height = 'auto'; input.focus();
}

// GLOBAL HELPERS (Window Binding)
window.handleEnter = function(e) { if (e.key === 'Enter' && !e.shiftKey && sendOnEnter) { e.preventDefault(); window.sendMessage(); } }
window.handleTyping = function() { if(client&&client.connected) client.publish(myRoom, JSON.stringify({type:'typing', user:myName})); const el=document.getElementById('msg-input'); el.style.height='auto'; el.style.height=el.scrollHeight+'px'; }
window.showTyping = function(user) { if(user===myName)return; const ind=document.getElementById('typing-indicator'); ind.innerText=`${user} typing...`; clearTimeout(typingTimeout); typingTimeout=setTimeout(()=>{ind.innerText="";},2000); }
window.updateOnlineList = function(user) { onlineUsers[user]=Date.now(); renderOnlineList(); }
window.cleanOnlineList = function() { const now=Date.now(); for(const u in onlineUsers)if(now-onlineUsers[u]>20000)delete onlineUsers[u]; renderOnlineList(); }
function renderOnlineList() { const l=document.getElementById('online-list'); l.innerHTML=""; for(const u in onlineUsers){ const li=document.createElement('li'); li.innerHTML=`<span style="color:var(--ios-green)">●</span> ${u}`; l.appendChild(li); } }

window.toggleSidebar = function() { const sb=document.getElementById('sidebar'); const ov=document.getElementById('sidebar-overlay'); if(sb.style.left==='0px'){sb.style.left='-350px';sb.classList.remove('active');ov.style.display='none';}else{sb.style.left='0px';sb.classList.add('active');ov.style.display='block';} }
window.handleBackgroundUpload = function(input) { const f=input.files[0]; if(f){ const r=new FileReader(); r.onload=e=>{try{localStorage.setItem('aksara_bg_image',e.target.result); document.body.style.backgroundImage=`url(${e.target.result})`; showToast("Background diganti","success");}catch(e){showToast("Gambar kebesaran","error");}}; r.readAsDataURL(f); } }
window.resetBackground = function() { localStorage.removeItem('aksara_bg_image'); document.body.style.backgroundImage=""; showToast("Background reset","info"); }
window.toggleSound = function() { isSoundOn=document.getElementById('sound-toggle').checked; localStorage.setItem('aksara_sound',isSoundOn); }
window.toggleEnterSettings = function() { sendOnEnter=document.getElementById('enter-toggle').checked; localStorage.setItem('aksara_enter',sendOnEnter); }
window.leaveRoom = function() { if(confirm("Keluar?")) { publishMessage("telah keluar.", 'system'); localStorage.removeItem('aksara_name'); localStorage.removeItem('aksara_room'); location.reload(); } }

function playSound(type) { if (!isSoundOn) return; const audio = (type === 'sent') ? sentAudio : notifAudio; if (audio) { audio.volume = (type === 'sent') ? 0.4 : 1.0; audio.currentTime = 0; audio.play().catch(() => {}); } }

// MEDIA HANDLERS
window.triggerImageUpload = function() { document.getElementById('chat-file-input').click(); }
window.handleImageUpload = function(input) { const f=input.files[0]; if(f){ const r=new FileReader(); r.onload=e=>{ tempImageBase64 = e.target.result; document.getElementById('preview-img').src=tempImageBase64; document.getElementById('image-preview-modal').style.display='flex'; }; r.readAsDataURL(f); } input.value=""; }
window.cancelImagePreview = function() { document.getElementById('image-preview-modal').style.display='none'; document.getElementById('img-caption').value=""; tempImageBase64=null; }
window.sendImageWithCaption = function() {
    if(!tempImageBase64) return;
    const caption = document.getElementById('img-caption').value.trim(); const img = new Image(); img.src = tempImageBase64;
    img.onload = function() { const c = document.createElement('canvas'); const ctx = c.getContext('2d'); const s = 300/img.width; c.width = 300; c.height = img.height * s; ctx.drawImage(img, 0, 0, c.width, c.height); publishMessage(c.toDataURL('image/jpeg', 0.6), 'image', caption); cancelImagePreview(); }
}

window.toggleRecording = async function() {
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
window.sendVoiceNote = function() { const r = new FileReader(); r.readAsDataURL(audioBlobData); r.onloadend = () => { publishMessage(r.result, 'audio'); window.cancelVoiceNote(); }; }
window.cancelVoiceNote = function() { audioBlobData = null; document.getElementById('vn-preview-bar').style.display = 'none'; document.getElementById('main-input-area').style.display = 'flex'; }

window.setReply = function(id, user, text) { replyingTo = { id, user, text }; document.getElementById('reply-preview-bar').style.display = 'flex'; document.getElementById('reply-to-user').innerText = user; document.getElementById('reply-preview-text').innerText = text.substring(0,50)+'...'; document.getElementById('msg-input').focus(); }
window.cancelReply = function() { replyingTo = null; document.getElementById('reply-preview-bar').style.display = 'none'; }
window.scrollToMessage = function(msgId) { const el = document.getElementById(msgId); if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('flash-highlight'); setTimeout(() => el.classList.remove('flash-highlight'), 1000); } else { showToast("Pesan tidak ditemukan.", "info"); } }
window.openLightbox = function(src) { document.getElementById('lightbox-img').src = src; document.getElementById('lightbox-overlay').style.display = 'flex'; }
window.closeLightbox = function(e) { if (e.target.classList.contains('lightbox-close') || e.target.id === 'lightbox-overlay') { document.getElementById('lightbox-overlay').style.display = 'none'; } }
