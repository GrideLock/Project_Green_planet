
// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMDD0Qxw_yxbl_WqO4q5usb9rX1RUz8Bc",
  authDomain: "project-green-planet.firebaseapp.com",
  projectId: "project-green-planet",
  storageBucket: "project-green-planet.firebasestorage.app",
  messagingSenderId: "326840925499",
  appId: "1:326840925499:web:4698b11efbdb7bc4b0cb1e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// --- DOM Elements ---
const navLogin = document.getElementById('nav-login');
const navSignup = document.getElementById('nav-signup');
const navUser = document.getElementById('nav-user');
const signupSection = document.getElementById('signup');
const loginSection = document.getElementById('login');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginMessage = document.getElementById('login-message');
const signupMessage = document.getElementById('signup-message');


// --- UI Update Functions ---
function showUserNav(user) {
    if (navLogin) navLogin.style.display = 'none';
    if (navSignup) navSignup.style.display = 'none';
    if (signupSection) signupSection.style.display = 'none';
    if (loginSection) loginSection.style.display = 'none';

    if (navUser) {
        navUser.style.display = 'flex';
        navUser.innerHTML = `
            <span><i class='bx bx-user'></i> ${user.email}</span>
            <button id="logoutBtn" class="btn">Log Out</button>
        `;

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }
    }
}

function showGuestNav() {
    if (navLogin) navLogin.style.display = '';
    if (navSignup) navSignup.style.display = '';
    if (navUser) navUser.style.display = 'none';
    if (signupSection) signupSection.style.display = '';
    if (loginSection) loginSection.style.display = '';
}

// --- Firebase Auth Functions ---
const signup = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            if (signupMessage) {
                signupMessage.style.color = 'green';
                signupMessage.textContent = 'Sign up successful!';
            }
            console.log('User signed up:', userCredential.user);
        })
        .catch((error) => {
            if (signupMessage) {
                signupMessage.style.color = 'red';
                signupMessage.textContent = error.message;
            }
            console.error('Sign-up error:', error);
        });
};

const login = (email, password) => {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
             if (loginMessage) {
                loginMessage.style.color = 'green';
                loginMessage.textContent = 'Login successful!';
            }
            console.log('User logged in:', userCredential.user);
        })
        .catch((error) => {
            if (loginMessage) {
                loginMessage.style.color = 'red';
                loginMessage.textContent = error.message;
            }
            console.error('Login error:', error);
        });
};

const logout = () => {
    auth.signOut().then(() => {
        console.log('User logged out');
        // The onAuthStateChanged listener will handle the UI update
    }).catch((error) => {
        console.error('Logout error:', error);
    });
};

// --- Event Listeners & Auth State Observer ---
document.addEventListener('DOMContentLoaded', () => {
    // Listen for auth state changes
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            showUserNav(user);
        } else {
            // User is signed out
            showGuestNav();
        }
    });

    // Sign-up form
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = signupForm.email.value;
            const password = signupForm.password.value;
            signup(email, password);
        });
    }

    // Login form
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            login(email, password);
        });
    }
});
