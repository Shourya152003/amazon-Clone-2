import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAGDPeByTRKR_7t358XvzFy_W_OG3alh1Q",
  authDomain: "clone-62088.firebaseapp.com",
  projectId: "clone-62088",
  storageBucket: "clone-62088.appspot.com",
  messagingSenderId: "389494797007",
  appId: "1:389494797007:web:950c6ac5f6ba1161cbfdba",
  measurementId: "G-GC8VM7K0EQ"
  });

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db , auth};