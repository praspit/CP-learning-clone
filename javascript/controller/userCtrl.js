import { getUser } from '../model/user.js';
import { generate_tag } from '../utility/tools.js';
import { uploadNewUser} from '../model/user.js';
import { User } from '../model/schema.js';
import { goToContentPage } from './pageCtrl.js';

export async function autoUploadNewUser(username, role='student'){
    while(true){
        let newUser = new User(username, generate_tag(), role);
        let userIsValid = await uploadNewUser(newUser);
        if(userIsValid){
            let user = await getUser(`${newUser.username}`);
            sessionStorage.setItem('user', JSON.stringify(user));
            document.getElementsByClassName('welcome-user')[0].innerHTML = `<h2>Welcome ${user.username}</h2>`
            goToContentPage();
            break;
        }
    }
}

export async function updateUser(username){
    let user = await getUser(username);
    sessionStorage.setItem('user', JSON.stringify(user));
}