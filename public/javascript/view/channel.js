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
    channelContainer.innerHTML = '';
    channels.forEach(channel=> {
        let btn = document.createElement('button')
        btn.className = "channel-container";    
        btn.onclick = function(){
            unhideElements();
            let channel_buttons = document.querySelectorAll('.channel-container');
            channel_buttons.forEach(button=>{
                if(button.classList.contains('channel-btn-selected')){
                    button.classList.remove('channel-btn-selected');
                }
            })
            btn.classList.add('channel-btn-selected');
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

export function hideElements() {
    let postTitle = document.querySelector(".post-title");
    let ansTitle = document.querySelector(".answer-title");
    let annTitle = document.querySelector(".announcement-title");
    let postform = document.querySelector(".post-form-container");
    let annnouncements = document.querySelector(".announcements-container");
    let annformtitle = document.querySelector(".announcement-form-title");
    let annform = document.querySelector(".announcement-form-container");
    if(!annformtitle.classList.contains('hide')){
        annformtitle.classList.add('hide');
    }
    if(!annform.classList.contains('hide')){
        annform.classList.add('hide');
    }
    if(!annnouncements.classList.contains('hide')) {
        annnouncements.classList.add('hide');
    }
    if(!postform.classList.contains('hide')) {
        postform.classList.add('hide');
    }
    if(!annTitle.classList.contains('hide')){
        annTitle.classList.add('hide');
    }
    if(!postTitle.classList.contains('hide')) {
        postTitle.classList.add('hide');
    }
    if(!ansTitle.classList.contains('hide')) {
        ansTitle.classList.add('hide');
    }
}