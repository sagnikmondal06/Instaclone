// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtsA-8-_tPbx1bVHFJo0hChEXYODvJsXg",
  authDomain: "clickshot-74f65.firebaseapp.com",
  projectId: "clickshot-74f65",
  storageBucket: "clickshot-74f65.appspot.com",
  messagingSenderId: "826107233026",
  appId: "1:826107233026:web:7f59ec1a62a42af82df81b",
  measurementId: "G-XFS13NVY54",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
