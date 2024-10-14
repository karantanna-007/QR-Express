// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
    apiKey: "AIzaSyBNeT_IJT1-ZoRYf8QfhCbD-xe_YXX0gfU",
    authDomain: "qr-express-6e1c4.firebaseapp.com",
    projectId: "qr-express-6e1c4",
    storageBucket: "qr-express-6e1c4.appspot.com",
    messagingSenderId: "15295240878",
    appId: "1:15295240878:web:4a2334596d6bcafb57eb3f"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app); // Initialize Firestore

export { auth, storage, firestore }; // Export Firestore
