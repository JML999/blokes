import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";


const firebaseConfig = {
    apiKey: "AIzaSyB7NlMhbFuLQs4-KRjqceoDEcq6Xo_f0Ik",
    authDomain: "stans-f377d.firebaseapp.com",
    projectId: "stans-f377d",
    storageBucket: "stans-f377d.appspot.com",
    messagingSenderId: "854330637205",
    appId: "1:854330637205:web:22afea8dbf6952094e149c"
};


// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export { auth, db, storage, firebaseApp };




