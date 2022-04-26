import {
    db,
	doc,
	getDoc,
	setDoc,
} from "./firestore-init.js";

export async function getUser(username){
    let userRef = doc(db, `users/${username}`)
    let userSnap = await getDoc(userRef)
    if(!userSnap.exists()){
        return null
    }
    console.log(getUser, username)
    return userSnap.data()
}

export async function userExist(username){
    let userRef = doc(db, `users/${username}`)
    let userSnap = await getDoc(userRef)
    return userSnap.exists()
}

export async function uploadNewUser(user){
    user = user.toFirestore();
    let userRef = doc(db, `users/${user.username}`)
    let userSnap = await getDoc(userRef)
    if(userSnap.exists()){
        console.log(`User ${user.username} already exists`)
        return false
    }
    await setDoc(userRef, user)
    console.log(`User ${user.username} added`)
    return true
}

export async function matchTeacherPassword(pwd) {
    let pwdref = doc(db, `teacher_pwd/${pwd}`)
    let pwdSnap = await getDoc(pwdref)
    if(!pwdSnap.exists()){
        return false
    }
    else return true
}