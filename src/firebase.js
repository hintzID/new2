
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Inisialisasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBNhlUvSoDnI5ZuqnREBQgZZMpfJsPQWLc",
  authDomain: "quran-610de.firebaseapp.com",
  databaseURL: "https://quran-610de-default-rtdb.firebaseio.com",
  projectId: "quran-610de",
  storageBucket: "quran-610de.appspot.com",
  messagingSenderId: "364048434633",
  appId: "1:364048434633:web:8a8b7bdd667dbbf34ad418",
  measurementId: "G-0CKNTPQSDW"
};

firebase.initializeApp(firebaseConfig);

// Export instance database Firebase
export const db = firebase.database();
