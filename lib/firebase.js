"use client";

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_apiKey,
//   authDomain: process.env.NEXT_PUBLIC_authDomain,
//   projectId: process.env.NEXT_PUBLIC_projectId,
//   storageBucket: process.env.NEXT_PUBLIC_storageBucket,
//   messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
//   appId: process.env.NEXT_PUBLIC_appId,
// };

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP-s5m-bUk1TPgZGt2Cv5FKjSrX9obEdo",
  authDomain: "pet-care-eae72.firebaseapp.com",
  projectId: "pet-care-eae72",
  storageBucket: "pet-care-eae72.firebasestorage.app",
  messagingSenderId: "464663311236",
  appId: "1:464663311236:web:fede5fbe34c548a2e7a3d1"
};

// Initialize Firebase safely
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
