// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg8oEtcpMFS3g7aJhzxjG1R3Rv4bpEL8Q",
  authDomain: "safebank-d8bcf.firebaseapp.com",
  projectId: "safebank-d8bcf",
  storageBucket: "safebank-d8bcf.firebasestorage.app",
  messagingSenderId: "998881547746",
  appId: "1:998881547746:web:e2cbc4578926cd535655bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);