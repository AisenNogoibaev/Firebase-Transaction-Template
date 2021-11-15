import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDOKfZsUlHuv6c2qFErl31m2cuV09ozaT0",
    authDomain: "fir-click-transactions.firebaseapp.com",
    projectId: "fir-click-transactions",
    storageBucket: "fir-click-transactions.appspot.com",
    messagingSenderId: "1018363637161",
    appId: "1:1018363637161:web:f6833d08701d8d24e2a8b8"
};


export const fb = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
