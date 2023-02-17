import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { auth } from "firebase/auth";
import { firestore } from "firebase/firestore";
import { storage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZ8JGO6UT4duP6hu3l0JCz0s6xok5CeaQ",
  authDomain: "gpt-unblocked.firebaseapp.com",
  projectId: "gpt-unblocked",
  storageBucket: "gpt-unblocked.appspot.com",
  messagingSenderId: "404216855215",
  appId: "1:404216855215:web:25ed86ec185a9a86c4325a",
  measurementId: "G-08KX4M794R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// console.log(firebaseConfig.apiKey);

export { auth, firestore as db, storage };
