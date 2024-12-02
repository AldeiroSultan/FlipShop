// app/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Note: getAnalytics() doesn't work on the server side
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBbtnp0QjTvuQ8IpYxBKZ1zk7XEUQ8_kOI",
  authDomain: "flipshop-93f6a.firebaseapp.com",
  projectId: "flipshop-93f6a",
  storageBucket: "flipshop-93f6a.firebasestorage.app",
  messagingSenderId: "746093465472",
  appId: "1:746093465472:web:720a0a398c964243abbb65",
  measurementId: "G-VQK2E45LF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics only on client side
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };