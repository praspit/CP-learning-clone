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
const app = initializeApp(firebaseConfig);

// import 'package:firebase_core/firebase_core.dart';

// Initialize Firebase
// initializeApp(firebaseConfig);
// await Firebase.initializeApp();

import {
	getFirestore,
	doc,
	getDoc,
	getDocs,
	collection,
	query,
	setDoc,
	deleteDoc,
    
    addDoc,
    // collection,
    // deleteDoc,
    // doc,
    // getDoc,
    // getDocs,
    // getFirestore,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";


const db = getFirestore();  

const channelRef = collection(db, 'channels')

export async function getChan(){
    const q = query(collection(db, "channels"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        let docpostRef = collection(db, `channels/${doc.id}/posts`);
        const postSnapshot = await getDocs(docpostRef);
        postSnapshot.forEach((post) => {
            console.log(post.id, " => ", post.data());
        })
    });
}