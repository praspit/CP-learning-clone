import { initChatBox } from "../view/chatbox.js";
import { initializeLandingPage, initializeCreateUserPage } from "../view/page.js";
import { showAllChannelCtrl } from "./channelCtrl.js";
import { showPostsFromChannelCtrl } from "./postCtrl.js";
import { showWelcomeUser } from "../view/page.js";
import {showAnnoucementsFromChannelCtrl} from "./announcementCtrl.js";
import { unhideElements } from "../view/channel.js";

let landingPage = document.querySelector('.landing-page');
let contentPage = document.querySelector('.content-page');
let createUserPage = document.querySelector('.create-user-page');

export function goToLandingPage() {
    contentPage.classList.add('hide');
    createUserPage.classList.add('hide')
    landingPage.classList.remove('hide');
    document.getElementById('web-title').innerText = 'CP Learning';
    let chat = document.querySelector('.chat-container');
    if(!chat.classList.contains('hide')){
        chat.classList.add('hide');
    }
    document.getElementById('chat-msg').innerHTML = '';
    document.getElementById('unsub-btn').click();

    initializeLandingPage();
}

export function goToContentPage() {
    landingPage.classList.add('hide');
    createUserPage.classList.add('hide')
    contentPage.classList.remove('hide');
    showWelcomeUser(JSON.parse(sessionStorage.getItem('user')).username)
    if('currentChannel' in sessionStorage) {
        let currentChannel = JSON.parse(sessionStorage.getItem('currentChannel'));
        document.getElementById('web-title').innerText = currentChannel.channel_name;
        showPostsFromChannelCtrl(currentChannel.uid);
        showAnnoucementsFromChannelCtrl(currentChannel.uid);
        unhideElements();
        initChatBox(currentChannel.chat_id); //comment this if want to remove chat feature
    }

    showAllChannelCtrl();
}

export function goToCreateUserPage() {
    landingPage.classList.add('hide');
    contentPage.classList.add('hide');
    createUserPage.classList.remove('hide')

    initializeCreateUserPage();
}