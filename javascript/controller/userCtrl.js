import { getUser } from '../model/user.js';


export async function updateUser(username){
    let user = await getUser(username);
    sessionStorage.setItem('user', JSON.stringify(user));
}