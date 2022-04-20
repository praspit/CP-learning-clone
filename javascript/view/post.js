import { uploadPost, getOnePostInChannel} from "../model/post.js";
import { User, Post, Answer, Reply } from "../model/schema.js"

let postsContainer = document.querySelector('.posts-container');
let postFormContainer = document.querySelector('.post-form-container');

export function showPostsFromChannel(posts) {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        let postAndAnswerContainer = document.createElement('div');
        let postBtn = document.createElement('button');

        postBtn.className = 'post-container';
        postBtn.innerHTML = `
            <h1>${post.title}</h1>
            <span>By ${post.author}</span>
            <p>${post.description}</p>
        `
        postBtn.onclick = async function() {
            let answerSection = document.querySelector(`[data-uid="${post.uid}"]`).getElementsByClassName("answer-section")[0];
            if(answerSection.hasAttribute("open")){
                answerSection.setAttribute("closing","");

                answerSection.addEventListener(
                    "animationend", 
                    () => {
                        answerSection.removeAttribute("closing");
                        answerSection.removeAttribute("open");
                    },
                    { once:true }
                );
            }else{
                try {
                    let p = await getOnePostInChannel(post.channel_id, post.uid);
                    console.log(p);
                    showAllAnswersInOnePost(post.channel_id, post.uid);
                } catch {
                    console.log(`can't get post ${post.channel_id} from channel ${post.uid}`)
                }
            }
        }

        let answerSection = document.createElement('div');
        answerSection.classList = "answer-section";

        postAndAnswerContainer.appendChild(postBtn);
        postAndAnswerContainer.appendChild(answerSection);
        postAndAnswerContainer.classList = "post-answer-container"
        postAndAnswerContainer.dataset.uid = post.uid;
        postsContainer.appendChild(postAndAnswerContainer);
    });
}

async function showAllAnswersInOnePost(channel_id, post_id) {
    let answerSection = document.querySelector(`[data-uid="${post_id}"]`).getElementsByClassName("answer-section")[0];
    answerSection.innerHTML = '';
    let post = await getOnePostInChannel(channel_id, post_id);
    if(post.answers.length===0)return;
    post.answers.forEach(answer => {
        let answerContainer = document.createElement('div');
        answerContainer.classList = "answer-container";
        answerContainer.innerHTML = `
            <div>
                ${answer.author}
            </div>
            <div>
                ${answer.content}
            </div>
        `
        answerSection.appendChild(answerContainer);
    })
    answerSection.setAttribute("open","");
}

export function showPostForm(channel_id) {
    postFormContainer.innerHTML = `
        <div class="name-title-input">
            <input type="text" id="username-input" name="userName" placeholder="Post as" maxlength=20>
            <input type="text" id="title-input" name="title" placeholder="Write your title" maxlength=100>
        </div>
        <textarea rows="3" type="text" id="description-input" name="description" placeholder="Write your description" maxlength=200"></textarea>
    `

    let formSubmitBtn = document.createElement('button');
    formSubmitBtn.className = "form-submit-button";
    formSubmitBtn.innerText = "Post";
    formSubmitBtn.onclick = function() {
        let userName = document.getElementById("username-input").value;
        let title = document.getElementById("title-input").value;
        let description = document.getElementById("description-input").value;
        if(userName && title && description){
            uploadPost(channel_id, new Post(userName, title, description, channel_id));
        }else{
            alert('please fills all the fields');
        }
    }
    postFormContainer.appendChild(formSubmitBtn);
}