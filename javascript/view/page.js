import { goToContentPage, goToCreateUserPage, goToLandingPage } from '../controller/pageCtrl.js';
import { getUser, uploadNewUser } from '../model/user.js';
import {valid_name, valid_tag, generate_tag} from '../utility/tools.js';
import { User, Post, Answer, Reply } from "../model/schema.js"

let landingPage = document.querySelector('.landing-page');
let createUserPage  = document.querySelector('.create-user-page');

export function initializeLandingPage() {
    landingPage.innerHTML = `
    <div class="landing-page-form-container">
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
                document.getElementsByClassName('welcome-user')[0].innerHTML = `<h2>Welcome, ${userExist.username}</h2>`
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
    `

    let createUserBtn = document.createElement('button');
    createUserBtn.innerText = 'Create !';
    createUserBtn.classList = 'create-user-btn';
    createUserBtn.onclick = async function() {
        let username = document.getElementById('create-user-page-username-input').value;
        if(valid_name(username)){
            let newUser = new User(username, generate_tag(), 'student');
            let userIsValid = await uploadNewUser(newUser);
            if(userIsValid){
                let user = await getUser(`${newUser.username}`);
                sessionStorage.setItem('user', JSON.stringify(user));
                document.getElementsByClassName('welcome-user')[0].innerHTML = `<h2>Welcome ${user.username}</h2>`
                goToContentPage();
            }else {
                
                console.log('tag collision');   
            }
        }else{
            document.getElementById('create-user-error').innerText = 'invalid username';
            console.log('invalid username');
        }
    }
    createUserFormContainer.appendChild(createUserBtn);

    let ORText = document.createElement('h4');
    ORText.innerText = 'OR';
    createUserFormContainer.appendChild(ORText);

    let goToLandingPageBtn = document.createElement('button');
    goToLandingPageBtn.innerText = 'back';
    goToLandingPageBtn.classList = 'back-to-login-btn';
    goToLandingPageBtn.onclick = function() {
        goToLandingPage();
        createUserPage.innerHTML = '';
    }
    createUserFormContainer.appendChild(goToLandingPageBtn);

    createUserPage.appendChild(createUserFormContainer);
}