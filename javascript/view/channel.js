import { showPostsFromChannelCtrl } from "../controller/postCtrl.js";
import { initChatBox } from "./chatbox.js";

let channelTitle = document.querySelector(".channel-title");
let channelContainer = document.querySelector(".nav-bar");

export function showChannelTitle(channel) {
    channelTitle.innerHTML = `
        <h2>${channel.channel_name}</h2>
        <span>${channel.owner}</span>
        `
}

export function showAllChannels(channels) {
    channels.forEach(channel=> {
        let btn = document.createElement('button')
        btn.className = "channel-container";
        btn.onclick = function(){
            sessionStorage.setItem('currentChannel', JSON.stringify(channel));
            document.getElementById('web-title').innerText = channel.channel_name;
            initChatBox(channel.chat_id); //comment this if want to remove chat feature
            showPostsFromChannelCtrl(channel.uid);
        }
        btn.innerHTML = channel.channel_name;
        channelContainer.appendChild(btn);
    });
}