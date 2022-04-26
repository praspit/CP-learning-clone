import { goToContentPage, goToCreateUserPage, goToLandingPage } from '../controller/pageCtrl.js';
import { getUser, uploadNewUser, matchTeacherPassword } from '../model/user.js';
import {valid_name, valid_tag, generate_tag} from '../utility/tools.js';
import { User, Post, Answer, Reply } from "../model/schema.js"
import { autoUploadNewUser } from '../controller/userCtrl.js';
import { unhideElements } from './channel.js';

let landingPage = document.querySelector('.landing-page');
let createUserPage  = document.querySelector('.create-user-page');

export function initializeLandingPage() {
    landingPage.innerHTML = `
    <div class="landing-page-form-container">
        <div class="web-name-container">CP Learning</div>
        <div class="name-tag-container">
            <input type="text" id="landing-page-username-input" name="name" placeholder="name" maxlength=20>
            #
            <input type="text" id="landing-page-tag-input" name="tag" placeholder="tag" maxlength=4>
        </div>
        <div class="login-error-container" id="login-error"></div>
    </div>
    `;

    let landingPageFormContainer = document.querySelector('.landing-page-form-container');

    let logInBtn = document.createElement('button');
    logInBtn.classList = 'log-in-btn';
    logInBtn.innerText = 'Log in';
    logInBtn.onclick = async function() {
        let username = document.getElementById('landing-page-username-input').value;
        let tag = document.getElementById('landing-page-tag-input').value;
        if(valid_name(username) && valid_tag(tag)) {
            let userExist = await getUser(`${username}#${tag}`);
            if(userExist){
                sessionStorage.setItem('user', JSON.stringify(userExist));
                showWelcomeUser(userExist.username);
                goToContentPage();
            }else{
                document.getElementById('login-error').innerText = 'user doesn\'t exist!';
                console.log("user doesn't exist!");
            }
        }else{
            document.getElementById('login-error').innerText = 'user doesn\'t exist!';
            console.log('invalid username');
        }
    }
    landingPageFormContainer.appendChild(logInBtn);

    let ORText = document.createElement('h4');
    ORText.innerText = 'OR';
    landingPageFormContainer.appendChild(ORText);

    let goToCreateUserPageBtn = document.createElement('button');
    goToCreateUserPageBtn.innerText = 'Create User';
    goToCreateUserPageBtn.classList = 'go-to-create-user-page-btn';
    goToCreateUserPageBtn.onclick = function() {
        goToCreateUserPage();
    }
    landingPageFormContainer.appendChild(goToCreateUserPageBtn);
}

export function initializeCreateUserPage() {
    let createUserFormContainer = document.createElement('div');
    createUserFormContainer.classList = 'create-user-form-container';
    createUserFormContainer.innerHTML = `
        <input type="text" id="create-user-page-username-input" name="name" placeholder="name" maxlength=20>
        <div class="login-error-container" id="create-user-error"></div>
        <div class="teacher-login-checkbox-container">
            <input type="checkbox" id="teacher-checkbox" name="teacherCheckbox">
            <h3>Log in as teacher</h3>
        </div>
        <input type="password" id="teacher-login-password" class="hide" name="teacherLoginPassword" placeholder="Teacher's password">
    `

    let createUserBtn = document.createElement('button');
    createUserBtn.innerText = 'Create !';
    createUserBtn.classList = 'create-user-btn';
    createUserBtn.onclick = async function() {
        let username = document.getElementById('create-user-page-username-input').value;
        let teacherCheckbox = document.getElementById('teacher-checkbox');
        let teacherLoginPassword = document.querySelector('#teacher-login-password').value;
        
        if(teacherCheckbox.checked){
            if(await matchTeacherPassword(teacherLoginPassword)){
                if(valid_name(username)){
                    autoUploadNewUser(username, 'teacher');
                }else {
                    document.getElementById('create-user-error').innerText = 'invalid username';
                    console.log('invalid username');
                }
            }else {
                document.getElementById('create-user-error').innerText = 'invalid teacher\'s password';
                console.log('invalid teacher\'s password');
            }
        }else{
            if(valid_name(username)){
                autoUploadNewUser(username, 'student')
            }else {
                document.getElementById('create-user-error').innerText = 'invalid username';
                console.log('invalid username');
            }
        }
    }
    createUserFormContainer.appendChild(createUserBtn);

    let ORText = document.createElement('h4');
    ORText.innerText = 'OR';
    createUserFormContainer.appendChild(ORText);

    let goToLandingPageBtn = document.createElement('button');
    goToLandingPageBtn.innerHTML = '&larr;';
    goToLandingPageBtn.classList = 'back-to-login-btn';
    goToLandingPageBtn.onclick = function() {
        goToLandingPage();
        createUserPage.innerHTML = '';
    }
    createUserFormContainer.appendChild(goToLandingPageBtn);

    createUserPage.appendChild(createUserFormContainer);

    let teacherCheckbox = document.getElementById('teacher-checkbox');
    teacherCheckbox.onclick = function(){
        let teacherLoginPasswordContainer = document.querySelector('#teacher-login-password');
        document.querySelector('#teacher-login-password').value = '';

        if(teacherCheckbox.checked){
            teacherLoginPasswordContainer.classList.remove('hide');
        }else{
            teacherLoginPasswordContainer.classList.add('hide');
        }
    }
}

export function showWelcomeUser(username) {
    document.getElementsByClassName('welcome-user')[0].innerHTML = `
        <span class="welcome-text">
            Welcome, ${username} |
        </span>
        <span>
            <button id="logout-btn">Log Out</button>
        </span>
    `;
    let logoutBtn = document.getElementById('logout-btn');
    logoutBtn.onclick = function() {
        if(window.confirm('Are you sure you want to log out?')){
            goToLandingPage();
            sessionStorage.removeItem('user');
            if('currentChannel' in sessionStorage){
                sessionStorage.removeItem('currentChannel');
            }
        }
    }
}