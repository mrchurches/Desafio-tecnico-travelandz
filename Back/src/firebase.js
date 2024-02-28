
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDQqeEnxYozyhvQHYK3-ccQ6r87_YBCNFo",
  authDomain: "transfers-app-349be.firebaseapp.com",
  projectId: "transfers-app-349be",
  storageBucket: "transfers-app-349be.appspot.com",
  messagingSenderId: "331848341985",
  appId: "1:331848341985:web:c14c551fa95d7bfb191aa0",
  measurementId: "G-0DE6TY0GSH"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);
console.log("Firebase initialized");

module.exports = { db, appFirebase, auth};