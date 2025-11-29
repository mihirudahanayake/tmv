import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCKPrE1B2ikGlnr6PmTq4JVLlBDlOe50Co",
  authDomain: "tmv1-7fc4f.firebaseapp.com",
  projectId: "tmv1-7fc4f",
  storageBucket: "tmv1-7fc4f.firebasestorage.app",
  messagingSenderId: "377085834114",
  appId: "1:377085834114:web:aeb2ca19e51abe8fc5959b",
  measurementId: "G-8J8CDN3QFF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
