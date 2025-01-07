// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithCustomToken } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfeceXxKYJQ3JFkGZQxCsXNmRooR_KljU",
  authDomain: "fir-kill.firebaseapp.com",
  projectId: "fir-kill",
  storageBucket: "fir-kill.firebasestorage.app",
  messagingSenderId: "126493318130",
  appId: "1:126493318130:web:e5edefe9aaf55ee37f696b"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth();
const db = getFirestore();

export { db, auth, signInWithCustomToken };