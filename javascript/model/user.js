import {
    db,
    app,
	doc,
	getDoc,
	getDocs,
	collection,
	query,
	setDoc,
	deleteDoc,
    collectionGroup,
    where,
    limit,
    orderBy,
    serverTimestamp,

    addDoc,
    // collection,
    // deleteDoc,
    // doc,
    // getDoc,
    // getDocs,
    // getFirestore,
    updateDoc,
} from "./firestore-init.js";

export async function getUser(username){
    let userRef = doc(db, `users/${username}`)
    let userSnap = await getDoc(userRef)
    console.log(userSnap.id, ' => ', userSnap.data())
    return userSnap.data()
}