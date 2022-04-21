import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyAiiTvoHK3P6OMiNktRSV2B9Znzfaknsjc",
    authDomain: "react-2022-6c5d8.firebaseapp.com",
    projectId: "react-2022-6c5d8",
    storageBucket: "react-2022-6c5d8.appspot.com",
    messagingSenderId: "66630377209",
    appId: "1:66630377209:web:b2e979219cae4774894c28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
