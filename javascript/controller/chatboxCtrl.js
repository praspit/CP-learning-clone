import { db,doc, onSnapshot } from "../model/firestore-init.js";
import { showMsg } from "../view/chatbox.js";


export function initChatboxListener(chat_id){
    const unsub = onSnapshot(doc(db, `chatrooms/${chat_id}`), (snap) => {
        const source = snap.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(`from ${source}`);
        let messages = snap.data().messages
        if(messages.length > 0){
            showMsg(messages[messages.length-1])
        }
    });
    return () => { 
        unsub();
        console.log('Chatbox listener removed')
    };
}