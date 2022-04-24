import {
    db,
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
    documentId,
    increment,
    arrayUnion,
    
    addDoc,
    updateDoc,
    arrayRemove,
} from "./firestore-init.js";



export async function sendMessage(user_id, chat_id, message){
    let messageRef = doc(db, `chatrooms/${chat_id}`)
    let messageSnap = await getDoc(messageRef)
    if(messageSnap.exists()){
        await updateDoc(messageRef, {
            messages: arrayUnion({
                author: user_id,
                content: message,
                timestamp: {
                    seconds: Date.now() / 1000,
                }
            })
        })
        console.log(`Message sent to ${chat_id}`)
    }else{
        console.log('Invalid chat_id')
    }
}
    

