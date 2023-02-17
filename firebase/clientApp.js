import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZ8JGO6UT4duP6hu3l0JCz0s6xok5CeaQ",
  authDomain: "gpt-unblocked.firebaseapp.com",
  projectId: "gpt-unblocked",
  storageBucket: "gpt-unblocked.appspot.com",
  messagingSenderId: "404216855215",
  appId: "1:404216855215:web:25ed86ec185a9a86c4325a",
  measurementId: "G-08KX4M794R"
};
// console.log(firebaseConfig.apiKey);
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  console.log(err);
}
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
