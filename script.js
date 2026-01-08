import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// KONFIGURASI SERVER BARU (AMOGENZ)
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

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SYSTEM NAVIGASI (SPA)
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.page-section');
    
    sections.forEach(sec => {
        if(sec.id === 'page-home') {
            sec.classList.add('active');
            sec.classList.remove('hidden');
        } else {
            sec.classList.remove('active');
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => {
                sec.classList.remove('active');
                sec.classList.add('hidden');
            });

            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('active');
                
                if (targetId === 'page-ai') setTimeout(scrollToBottom, 100);

                if (targetId === 'page-community') {
                    const isLoggedIn = localStorage.getItem('amogenz_user'); 
                    const authModal = document.getElementById('auth-modal');
                    if (!isLoggedIn && authModal) setTimeout(() => authModal.classList.remove('hidden'), 300);
                }
            }
        });
    });

    // HANDLER TOMBOL BATAL LOGIN
    const btnAuthClose = document.getElementById('btn-auth-close');
    const authModal = document.getElementById('auth-modal');
    if(btnAuthClose && authModal) {
        btnAuthClose.addEventListener('click', () => {
            authModal.classList.add('hidden');
            const currentActive = document.querySelector('.nav-item.active');
            if(currentActive && currentActive.getAttribute('data-target') === 'page-community' && !localStorage.getItem('amogenz_user')) {
                const homeBtn = document.querySelector('[data-target="page-home"]');
                if(homeBtn) homeBtn.click();
            }
        });
    }

    // 2. EFEK CURSOR & PARALLAX
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    const orbs = document.querySelectorAll('.orb');

    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            if(cursorDot) { cursorDot.style.left = `${posX}px`; cursorDot.style.top = `${posY}px`; }
            if(cursorOutline) { cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" }); }
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 20; 
                orb.style.transform = `translate(${(window.innerWidth - posX * speed) / 100}px, ${(window.innerHeight - posY * speed) / 100}px)`;
            });
        });
    }

    // 3. AI CHAT LOGIC
    const chatHistory = document.getElementById('chat-history');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const ammoAvatarURL = "https://i.ibb.co.com/Jjj7tx4j/ammo-ai.webp";
    let conversationHistory = []; 

    function scrollToBottom() { if(chatHistory) chatHistory.scrollTop = chatHistory.scrollHeight; }

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender === 'user' ? 'user-msg' : 'ai-msg');
        let avatarHTML = sender === 'ai' ? `<img src="${ammoAvatarURL}" class="msg-avatar-img">` : `<div class="msg-avatar">U</div>`;
        msgDiv.innerHTML = `${sender === 'ai' ? avatarHTML : ''} <div class="msg-bubble">${text}</div>${sender === 'user' ? avatarHTML : ''}`;
        chatHistory.appendChild(msgDiv);
        scrollToBottom();
    }

    const handleChat = async () => {
        const text = userInput.value.trim();
        if (!text) return;
        appendMessage('user', text);
        userInput.value = ''; userInput.disabled = true;

        const loadingId = 'loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.id = loadingId;
        loadingDiv.classList.add('message', 'ai-msg');
        loadingDiv.innerHTML = `<img src="${ammoAvatarURL}" class="msg-avatar-img"><div class="msg-bubble" style="font-style:italic; opacity:0.7;">Sedang mengetik...</div>`;
        chatHistory.appendChild(loadingDiv);
        scrollToBottom();

        try {
            const response = await fetch('/api/chat', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text, history: conversationHistory }) 
            });
            const data = await response.json();
            document.getElementById(loadingId)?.remove();

            if (!response.ok) throw new Error(data.error || "Gagal menghubungi server.");

            let aiResponseText = "Maaf, saya tidak mengerti.";
            if (data.candidates && data.candidates[0].content) {
                let rawText = data.candidates[0].content.parts[0].text;
                aiResponseText = rawText.replace(/\*\*(.*?)\*\*/g, '<b style="color:#39FF14;">$1</b>').replace(/\n/g, '<br>'); 
                if (data.candidates[0].groundingMetadata?.searchEntryPoint) aiResponseText += `<br><br><small style="opacity:0.5;">[🔍 Sumber: Google]</small>`;
                conversationHistory.push({ role: "user", parts: [{ text: text }] }, { role: "model", parts: [{ text: rawText }] });
            }
            appendMessage('ai', aiResponseText);
        } catch (error) {
            document.getElementById(loadingId)?.remove();
            appendMessage('ai', `💀 System Error: ${error.message}`);
        } finally {
            userInput.disabled = false; userInput.focus();
        }
    };

    if(sendBtn && userInput) {
        sendBtn.addEventListener('click', handleChat);
        userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChat(); });
    }

    // 4. SARAN SYSTEM (Database 'comments')
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.querySelector('.comments-list');
    const commentsRef = ref(db, 'comments'); 

    const renderComment = (name, msg, dateString) => {
        const newComment = document.createElement('div');
        newComment.classList.add('comment-item', 'glass-card');
        newComment.innerHTML = `<div class="comment-header"><span class="c-name">${name}</span><span class="c-date">${dateString}</span></div><p class="c-text">${msg}</p>`;
        if(commentsList) commentsList.insertBefore(newComment, commentsList.firstChild);
    };

    onChildAdded(commentsRef, (snapshot) => {
        const data = snapshot.val();
        if(commentsList) renderComment(data.name, data.message, data.date);
    });

    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = commentForm.querySelectorAll('.input-glass');
            const name = inputs[0].value.trim();
            const msg = inputs[1].value.trim();
            if(!name || !msg) return;

            const btn = commentForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Mengirim..."; btn.disabled = true;

            const now = new Date();
            const dateString = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

            push(commentsRef, { name: name, message: msg, date: dateString, timestamp: Date.now() })
            .then(() => {
                inputs[0].value = ''; inputs[1].value = '';
                btn.innerText = "Terkirim!";
                setTimeout(() => { btn.innerText = originalText; btn.disabled = false; }, 2000);
            }).catch((error) => {
                console.error("Gagal kirim: ", error); btn.innerText = "Gagal"; btn.disabled = false;
            });
        });
    }
});
