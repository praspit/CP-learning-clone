import { showPostsFromChannelCtrl } from "../controller/postCtrl.js";

let channelContainer = document.querySelector(".nav-bar");

export function showAllChannels(channels) {
    channelContainer.innerHTML = '';

    channels.forEach(channel=> {
        let btn = document.createElement('button')
        btn.className = "channel-container";
        btn.onclick = function(){
            showPostsFromChannelCtrl(channel.uid);
        }
        btn.innerHTML = channel.channel_name;
        channelContainer.appendChild(btn);
    });
}