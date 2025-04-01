import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAWt3DnhyYXcSNxHDR1zGJ3IYDt08XyRes",
  authDomain: "bookworm1418-6deb7.firebaseapp.com",
  projectId: "bookworm1418-6deb7",
  storageBucket: "bookworm1418-6deb7.firebasestorage.app", // Fixed typo: "ookworm" -> "bookworm"
  messagingSenderId: "469896837361",
  appId: "1:469896837361:web:a321f101620c6569d01150"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);