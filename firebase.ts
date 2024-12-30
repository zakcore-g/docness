// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfeceXxKYJQ3JFkGZQxCsXNmRooR_KljU",
  authDomain: "fir-kill.firebaseapp.com",
  projectId: "fir-kill",
  storageBucket: "fir-kill.firebasestorage.app",
  messagingSenderId: "126493318130",
  appId: "1:126493318130:web:e5edefe9aaf55ee37f696b",
  measurementId: "G-7LDP7ZS4JQ"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };