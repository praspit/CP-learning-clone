import { goToLandingPage, goToContentPage } from "./controller/pageCtrl.js"
import { updateUser } from "./controller/userCtrl.js"


if ('user' in sessionStorage) {
    updateUser(JSON.parse(sessionStorage.user).username);
    goToContentPage();
    
}
else goToLandingPage();

// login automatically
const auto_login = () => {
    if('user' in sessionStorage){
        return
    }
    document.getElementById('landing-page-username-input').value = 'somying';
    document.getElementById('landing-page-tag-input').value = '1234';
    document.getElementsByClassName('log-in-btn')[0].click()
}



