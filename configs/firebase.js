const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAnFm7FV6SnrXgfsdSKtR9_TLBFONKJukE",
  authDomain: "note-app-c9870.firebaseapp.com",
  projectId: "note-app-c9870",
  storageBucket: "note-app-c9870.firebasestorage.app",
  messagingSenderId: "713516225277",
  appId: "1:713516225277:web:5d47692ad9713fdebce494",
  measurementId: "G-N2J1JLMD2X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

module.exports = { auth, db };
