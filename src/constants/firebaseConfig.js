// Import the functions you need from the SDKs you need


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSj_Vq4dsrLGSyWrB5C1ScrzvMkV8-bVA",
  authDomain: "thesamepage-43fb0.firebaseapp.com",
  projectId: "thesamepage-43fb0",
  storageBucket: "thesamepage-43fb0.firebasestorage.app",
  messagingSenderId: "34043205967",
  appId: "1:34043205967:web:23bbb2774560f3cc228d3a"
};

//firebase imports
import { initializeApp } from "firebase/app";
import { 
    //createUserWithEmailAndPassword, 
    //onAuthStateChanged,
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
//import { getDatabase, ref, set, onValue } from "firebase/database";
import { getFirestore } from "firebase/firestore"

//initialize 
const firebaseApp = initializeApp(firebaseConfig);
const auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
//const database = getDatabase(firebaseApp);
const firestore = getFirestore(firebaseApp);

export {firebaseApp, auth, firestore}