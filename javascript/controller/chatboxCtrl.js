import { db,doc, onSnapshot } from "../model/firestore-init.js";


export function initChatbox(chat_id){
    const unsub = onSnapshot(doc(db, `chatrooms/${chat_id}`), (snap) => {
        const source = snap.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(`${source} data: ${snap.data().messages}`);
        let messages = snap.data().messages
        console.log(messages)
    });
    return unsub;
}