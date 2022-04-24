import { initChatbox } from "../controller/chatboxCtrl.js";
import { sendMessage } from "../model/chatbox.js";

export function showChatBox(chat_id) {
    let unsub = initChatbox(chat_id);
    let body = document.getElementsByTagName("body")[0];
    let chatboxContainer = document.createElement("div");
    let chatForm = document.createElement("textarea");
    chatForm.id = 'chat-form'
    let chatSendBtn = document.createElement("button");
    chatSendBtn.id = 'chat-send-btn'
    chatSendBtn.innerHTML = 'Send'
    chatSendBtn.onclick = () => {
        sendMessage('somying#1234', chat_id, chatForm.value)
        chatForm.value = ''
    }

    let stopBtn = document.createElement("button");
    stopBtn.innerHTML = 'Stop'
    stopBtn.onclick = () => {
        unsub();
        console.log('unsubscribed')
    }

    chatboxContainer.appendChild(chatForm);
    chatboxContainer.appendChild(chatSendBtn);
    chatboxContainer.appendChild(stopBtn);
    chatboxContainer.style ='z-index: 12;'
    body.appendChild(chatboxContainer);
}