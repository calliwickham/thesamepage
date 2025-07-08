// Import the functions you need from the SDKs you need


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_jPcn1v0pQWyR0NVR3SF7TOAZ5PBn-FI",
  authDomain: "samepagedummy.firebaseapp.com",
  projectId: "samepagedummy",
  storageBucket: "samepagedummy.firebasestorage.app",
  messagingSenderId: "3018177546",
  appId: "1:3018177546:web:8d5966625d799918a0b3f3"
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