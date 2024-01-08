
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCFGRQ2jOYwFuVEsvW-fD5WOuQJtJTv_bk",
  authDomain: "voice-pathology-detectio-961c8.firebaseapp.com",
  projectId: "voice-pathology-detectio-961c8",
  storageBucket: "voice-pathology-detectio-961c8.appspot.com",
  messagingSenderId: "1085475765007",
  appId: "1:1085475765007:web:1d0225eee67f374ec8dc7a",
  measurementId: "G-CMKLE0DG0S"
};

 export const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);