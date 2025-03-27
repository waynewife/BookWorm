// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWt3DnhyYXcSNxHDR1zGJ3IYDt08XyRes",
  authDomain: "bookworm1418-6deb7.firebaseapp.com",
  projectId: "bookworm1418-6deb7",
  storageBucket: "bookworm1418-6deb7.firebasestorage.app",
  messagingSenderId: "469896837361",
  appId: "1:469896837361:web:a321f101620c6569d01150",
  measurementId: "G-B28YRJHSZ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);