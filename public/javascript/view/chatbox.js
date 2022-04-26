import { initChatboxListener } from "../controller/chatboxCtrl.js";
import { sendMessage } from "../model/chatbox.js";

export function initChatBox(chat_id) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const username = user.username;
    const currentChannel = JSON.parse(sessionStorage.getItem('currentChannel'));

    let chatContainer = document.querySelector('.chat-container');
    if(chatContainer.classList.contains('hide')) {
        chatContainer.classList.remove('hide');
    }

    document.getElementById('unsub-btn').click();

    let chat_tab = document.getElementById('chat-tab');
    if(chat_tab.classList.contains('open-chat-tab')){
        chat_tab.classList.remove('open-chat-tab');
    }
    chat_tab.innerHTML = `${currentChannel.channel_name} Live Chat &#x25CF;`;
    let chatwindow = document.getElementById('chat-window');
    if(!chatwindow.classList.contains('hide')){
        chatwindow.classList.add('hide');
    }
    chat_tab.onclick = () => {
        document.getElementById('chat-window').classList.toggle('hide');
        document.getElementById('chat-tab').classList.toggle('open-chat-tab');
    }

    const chatbox = document.getElementById('chat-msg');
    chatbox.innerHTML = '';
    let unsub = initChatboxListener(chat_id);
    let msg_input = document.getElementById('chat-input');
    // msg_input.addEventListener('keydown', (e) => {
    //     if (e.key === 'Enter') {
    //         sendMessage(username, chat_id, msg_input.value);
    //         msg_input.value = '';
    //     }
    // });
    let send_btn = document.getElementById('chat-send');
    send_btn.onclick = () => {
        sendMessage(username, chat_id, msg_input.value);
        msg_input.value = '';
    }
    document.getElementById('unsub-btn').onclick = () => {
        unsub();
    }
}


export function showMsg(msg){
    let msg_container = document.createElement("div");
    let msg_author_container = document.createElement("div");
    let msg_content_container = document.createElement("div");
    msg_container.className = 'message-container'
    msg_author_container.className = 'msg-author-container'
    msg_content_container.className = 'msg-content-container'
    msg_author_container.innerText = msg.author + ' : '
    if(msg.author === JSON.parse(sessionStorage.getItem('user')).username){
        msg_author_container.classList.add('own-msg-author');
    }
    msg_content_container.innerText = msg.content
    msg_container.appendChild(msg_author_container);
    msg_container.appendChild(msg_content_container);
    document.getElementById('chat-msg').appendChild(msg_container);
}



