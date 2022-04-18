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
}

export async function setTime(){
    await(setDoc(doc(db, 'timers', 'timer1'), {
        timer : serverTimestamp(),
        xtimer : serverTimestamp()
    }))
    console.log("set time successfully")
}

export async function getTime() {
    let timerRef = doc(db, 'timers', 'timer1')
    let timerSnap = await getDoc(timerRef)
    console.log(timerSnap.id, ' => ', timerSnap.data())
}