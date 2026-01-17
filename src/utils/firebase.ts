import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaBxxWFh5HJGumd_JmO7MHn7sJNUq2yZU",
  authDomain: "undangannikah-c05c9.firebaseapp.com",
  projectId: "undangannikah-c05c9",
  storageBucket: "undangannikah-c05c9.firebasestorage.app",
  messagingSenderId: "1070438201588",
  appId: "1:1070438201588:web:3c1a19b9639bc6076006a1",
  measurementId: "G-YH5GJ6MTTD"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Init Firestore
const db = getFirestore(app);

// EXPORT supaya bisa dipakai file lain
export { db };
