import { getChannelsFromList } from "./model/channel.js"
import { getOnePost, getOnePostInChannel, getPostListInChannel, incrementPostUpvote, uploadPost, uploadAnswer } from "./model/post.js"
import { getUser, uploadNewUser } from "./model/user.js"
import { User, Post, Answer, Reply } from "./model/schema.js"
import { generate_tag } from "./utility/tools.js"

import {showAllChannelCtrl} from "./controller/channelCtrl.js"
import { getPostDataFromStorage, showPostsFromChannelCtrl } from "./controller/postCtrl.js"
import { goToLandingPage, goToContentPage } from "./controller/pageCtrl.js"
import { updateUser } from "./controller/userCtrl.js"
import { showPostsFromChannel } from "./view/post.js"
import { initChatBox } from "./view/chatbox.js"

//getOnePost("BODLFokdmxix53c7ooIz")
//getOnePostInChannel("q6HTTRc61ieJv6qcpVns", "BODLFokdmxix53c7ooIz")
//getUser("somying#1234")
//getPostListInChannel("q6HTTRc61ieJv6qcpVns")
// getChannelsFromList(["q6HTTRc61ieJv6qcpVns"])
//getOnePost("BODLFokdmxix53c7ooIz")
//incrementPostUpvote("BODLFokdmxix53c7ooIz")
//getTime()
//uploadPost("q6HTTRc61ieJv6qcpVns", new Post("somying#1234", "Can you be my friends?", "I'm so lonely", "q6HTTRc61ieJv6qcpVns"))
//uploadAnswer("q6HTTRc61ieJv6qcpVns", "ymz9b1QgttJQa0gMx3I0", new Answer("TA#1234", "no u", "ymz9b1QgttJQa0gMx3I0", true))
//getPostListInChannel("q6HTTRc61ieJv6qcpVns", "timestamp")
//uploadNewUser(new User('prasrodo', generate_tag(), 'student'))

// async function test() {
//     let p = await getPostDataFromStorage("BODLFokdmxix53c7ooIz", "q6HTTRc61ieJv6qcpVns")
//     console.log(p)
//     let pp = await getPostDataFromStorage("BODLFokdmxix53c7ooIz", "q6HTTRc61ieJv6qcpVns")
//     console.log(pp)
// }
//test()
// showAllChannelCtrl();
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
auto_login();



