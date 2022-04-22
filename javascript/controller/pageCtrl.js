import { initializeLandingPage, initializeCreateUserPage } from "../view/page.js";
import { showAllChannelCtrl } from "./channelCtrl.js";

let landingPage = document.querySelector('.landing-page');
let contentPage = document.querySelector('.content-page');
let createUserPage = document.querySelector('.create-user-page');

export function goToLandingPage() {
    contentPage.classList.add('hide');
    createUserPage.classList.add('hide')
    landingPage.classList.remove('hide');

    initializeLandingPage();
}

export function goToContentPage() {
    landingPage.classList.add('hide');
    createUserPage.classList.add('hide')
    contentPage.classList.remove('hide');

    showAllChannelCtrl();
}

export function goToCreateUserPage() {
    landingPage.classList.add('hide');
    contentPage.classList.add('hide');
    createUserPage.classList.remove('hide')

    initializeCreateUserPage();
}