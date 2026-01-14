import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// --- Config ของคุณ (อย่าเปลี่ยนเลขตรงนี้) ---
const firebaseConfig = {
    apiKey: "AIzaSyBfK1ZhhqeG1FQ4ZaWbeCG_gzXA0X1mjgY",
    authDomain: "shop-95205.firebaseapp.com",
    projectId: "shop-95205",
    storageBucket: "shop-95205.firebasestorage.app",
    messagingSenderId: "664525946102",
    appId: "1:664525946102:web:5d2ebbe48a07690fcd40d7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ตัวแปร UI Elements
const modal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeBtn = document.querySelector('.close-btn');
const googleBtn = document.getElementById('googleLoginBtn');

// ตัวแปร Profile Elements
const userProfileContainer = document.getElementById('userProfileContainer');
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');

// --- 1. Event Listeners (ปุ่มต่างๆ) ---

// เปิด-ปิด Modal
if(loginBtn) loginBtn.addEventListener('click', () => modal.style.display = 'flex');
if(closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => { if(e.target == modal) modal.style.display = 'none'; });

// Login ด้วย Google
if(googleBtn) {
    googleBtn.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then((result) => { 
                console.log("Login Success");
                modal.style.display = 'none'; 
            })
            .catch((error) => { 
                console.error("Login Error:", error);
                alert("เข้าสู่ระบบไม่สำเร็จ: " + error.message); 
            });
    });
}

// Logout
if(logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if(confirm("ต้องการออกจากระบบ?")) { 
            signOut(auth).then(() => location.reload()); 
        }
    });
}

// --- 2. Auth State Listener (ตรวจสอบสถานะตลอดเวลา) ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        // กรณี: ล็อกอินแล้ว
        if(loginBtn) loginBtn.style.display = 'none';
        if(userProfileContainer) userProfileContainer.style.display = 'block';
        
        // อัปเดตข้อมูลใน Profile
        if(userAvatar) userAvatar.src = user.photoURL ? user.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        if(userName) userName.textContent = user.displayName;
        if(userEmail) userEmail.textContent = user.email;

    } else {
        // กรณี: ยังไม่ล็อกอิน
        if(loginBtn) loginBtn.style.display = 'block';
        if(userProfileContainer) userProfileContainer.style.display = 'none';
    }
});