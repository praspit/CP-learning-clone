// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE1Oa90KQIM0FdSdLMPhPPzzNFgzYuIm8",
  authDomain: "cp-learning-clone.firebaseapp.com",
  projectId: "cp-learning-clone",
  storageBucket: "cp-learning-clone.appspot.com",
  messagingSenderId: "766156463040",
  appId: "1:766156463040:web:46708f663c0a67550dc625"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// import 'package:firebase_core/firebase_core.dart';

// Initialize Firebase
// initializeApp(firebaseConfig);
// await Firebase.initializeApp();

export {
	doc,
	getDoc,
	getDocs,
	collection,
	query,
	setDoc,
	deleteDoc,
  collectionGroup,
  where,
  orderBy,
  limit,
  serverTimestamp,
  documentId,
  increment,
  arrayUnion,
    
    addDoc,
    // collection,
    // deleteDoc,
    // doc,
    // getDoc,
    // getDocs,
    // getFirestore,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

export const db = getFirestore();  