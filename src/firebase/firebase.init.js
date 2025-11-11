// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiu9wMCggD-hf5cMPNrIpj4ljWxYTEHWQ",
  authDomain: "b12-a10-habit-tracker.firebaseapp.com",
  projectId: "b12-a10-habit-tracker",
  storageBucket: "b12-a10-habit-tracker.firebasestorage.app",
  messagingSenderId: "454022824321",
  appId: "1:454022824321:web:f6082bcdc4d61e79722880"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)