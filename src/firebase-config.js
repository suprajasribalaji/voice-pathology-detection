
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCFGRQ2jOYwFuVEsvW-fD5WOuQJtJTv_bk",
  authDomain: "voice-pathology-detectio-961c8.firebaseapp.com",
  projectId: "voice-pathology-detectio-961c8",
  storageBucket: "voice-pathology-detectio-961c8.appspot.com",
  messagingSenderId: "1085475765007",
  appId: "1:1085475765007:web:1d0225eee67f374ec8dc7a",
  measurementId: "G-CMKLE0DG0S"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { app, firestore };
