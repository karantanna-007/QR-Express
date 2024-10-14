// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBbAjleh6WSRcxT4ddpXvqMnsSGdjCwh6Y",
    authDomain: "qr-express-32b91.firebaseapp.com",
    projectId: "qr-express-32b91",
    storageBucket: "qr-express-32b91.appspot.com",
    messagingSenderId: "493907566009",
    appId: "1:493907566009:web:37e2b91039b0b1b741ea68"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
