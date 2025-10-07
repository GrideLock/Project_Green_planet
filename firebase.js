
// TODO: Add your Firebase project configuration here

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

// Function to handle user sign-up
const signup = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('User signed up:', user);
      // You can redirect the user or update the UI here
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Sign-up error:', errorCode, errorMessage);
    });
};

// Function to handle user login
const login = (email, password) => {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('User logged in:', user);
      // You can redirect the user or update the UI here
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Login error:', errorCode, errorMessage);
    });
};

// Add event listeners to your sign-up and login forms
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signup(email, password);
  });

  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password);
  });
});
