import {
    db,
	doc,
	getDoc,

    arrayUnion,
    

    updateDoc,

} from "./firestore-init.js";



export async function sendMessage(user_id, chat_id, message){
    let messageRef = doc(db, `chatrooms/${chat_id}`)
    let messageSnap = await getDoc(messageRef)
    if(messageSnap.exists() && message != ''){
        await updateDoc(messageRef, {
            messages: arrayUnion({
                author: user_id,
                content: message,
                timestamp: {
                    seconds: Math.floor(Date.now() / 1000),
                }
            })
        })
        console.log(`Message sent to ${chat_id}`)
    }else{
        console.log('Invalid chat_id')
    }
}

export async function getMessages(chat_id){
    let messageRef = doc(db, `chatrooms/${chat_id}`)
    let messageSnap = await getDoc(messageRef)
    if(messageSnap.exists()){
        console.log(`Messages retrieved from ${chat_id}`)
        return messageSnap.data().messages
    }else{
        console.log('Invalid chat_id')
    }
}
    

