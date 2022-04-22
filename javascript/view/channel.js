import { showPostsFromChannelCtrl } from "../controller/postCtrl.js";

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
            showPostsFromChannelCtrl(channel.uid);
        }
        btn.innerHTML = channel.channel_name;
        channelContainer.appendChild(btn);
    });
}