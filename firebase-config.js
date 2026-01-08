// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDyEfe83-_CzRchqcO_lLnuO6Rg9_AF_8",
  authDomain: "amogenz.firebaseapp.com",
  databaseURL: "https://amogenz-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "amogenz",
  storageBucket: "amogenz.firebasestorage.app",
  messagingSenderId: "864003468268",
  appId: "1:864003468268:web:7c861806529a0dacd66ec9"
};

// Inisialisasi SATU KALI saja di sini
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

// Export agar bisa dipakai file lain
export { app, db, storage };
