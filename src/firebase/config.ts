import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxkO-_gEtAU85pOQWBwFPrUxPbwC46NP8",
  authDomain: "swachhsaathi-92659.firebaseapp.com",
  projectId: "swachhsaathi-92659",
  storageBucket: "swachhsaathi-92659.firebasestorage.app",
  messagingSenderId: "577757414931",
  appId: "1:577757414931:web:56256661d26840109de1e6",
  measurementId: "G-NKJQJM3G21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export default app; 