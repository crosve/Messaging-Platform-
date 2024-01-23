// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, setPersistence, browserSessionPersistence} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo4gCIYqCL7hBxBqCeQsPLoOkWA7I2Qzw",
  authDomain: "auth-9261a.firebaseapp.com",
  projectId: "auth-9261a",
  storageBucket: "auth-9261a.appspot.com",
  messagingSenderId: "562400168764",
  appId: "1:562400168764:web:11565c81b09973ff692c39",
  measurementId: "G-48H9RDL8HQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);

//get the firstore with db variable
export const db = getFirestore(app);
const analytics = getAnalytics(app);