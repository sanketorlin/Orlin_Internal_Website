import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClwjoIKwHZPudNzZt4cgS4YXtNLUvDdEU",
  authDomain: "studio-4992265935-9ecf3.firebaseapp.com",
  projectId: "studio-4992265935-9ecf3",
  storageBucket: "studio-4992265935-9ecf3.firebasestorage.app",
  messagingSenderId: "298312510355",
  appId: "1:298312510355:web:4de94a2f068353b1cb5666"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
