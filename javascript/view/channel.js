import { showAnnoucementsFromChannelCtrl } from "../controller/announcementCtrl.js";
import { showPostsFromChannelCtrl } from "../controller/postCtrl.js";
import { initChatBox } from "./chatbox.js";

let channelTitle = document.querySelector(".channel-title");
let channelContainer = document.querySelector(".nav-bar");

export function showChannelTitle(channel) {
    channelTitle.innerHTML = `
        ${channel.channel_name}
        `
}

export function showAllChannels(channels) {
    channels.forEach(channel=> {
        let btn = document.createElement('button')
        btn.className = "channel-container";
        btn.onclick = function(){
            unhideElements();

            sessionStorage.setItem('currentChannel', JSON.stringify(channel));
            document.getElementById('web-title').innerText = channel.channel_name;
            initChatBox(channel.chat_id); //comment this if want to remove chat feature
            showAnnoucementsFromChannelCtrl(channel.uid)
            showPostsFromChannelCtrl(channel.uid);
        }
        btn.innerHTML = channel.channel_name;
        channelContainer.appendChild(btn);
    });
}


export function unhideElements() {
    let postTitle = document.querySelector(".post-title");
    let ansTitle = document.querySelector(".answer-title");
    let annTitle = document.querySelector(".announcement-title");
    let postform = document.querySelector(".post-form-container");
    let annnouncements = document.querySelector(".announcements-container");
    if( annnouncements.classList.contains('hide')) {
        annnouncements.classList.remove('hide');
    }
    if( postform.classList.contains('hide')) {
        postform.classList.remove('hide');
    }
    if(annTitle.classList.contains('hide')){
        annTitle.classList.remove('hide');
    }
    if(postTitle.classList.contains('hide')) {
        postTitle.classList.remove('hide');
    }
    if(ansTitle.classList.contains('hide')) {
        ansTitle.classList.remove('hide');
    }
}