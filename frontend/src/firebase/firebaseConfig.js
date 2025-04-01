import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyAWt3DnhyYXcSNxHDR1zGJ3IYDt08XyRes",
  authDomain: "bookworm1418-6deb7.firebaseapp.com",
  projectId: "bookworm1418-6deb7",
  storageBucket: "ookworm1418-6deb7.firebasestorage.app",
  messagingSenderId: "469896837361",
  appId: "1:469896837361:web:a321f101620c6569d01150"
=======
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
>>>>>>> aec901a30340dcae4cd85abeb122f2556fa7cf72
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
