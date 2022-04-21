import { uploadPost, getOnePostInChannel, uploadAnswer, getPostListInChannel} from "../model/post.js";
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
                } catch(err) {
                    console.log(`can't get post ${post.channel_id} from channel ${post.uid}`, '\n', err);
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

    post.answers.forEach(answer => {
        let answerContainer = document.createElement('div');
        answerContainer.classList = "answer-container";
        answerContainer.innerHTML = `
            <div>
                ${answer.author}: ${answer.content}
            </div>
        `
        answerSection.appendChild(answerContainer);
    })

    let answerFormContainer = document.createElement('div');
    answerFormContainer.classList = "answer-form-container";
    answerFormContainer.innerHTML = `
        <div class="name-answer-input">
            <input type="text" id="username-input-${post_id}" class="answer-form-username-input" name="username" placeholder="Reply as" maxlength=20><span></span>
            <input type="text" id="answer-input-${post_id}" class="answer-form-answer-input" "name="answer" placeholder="Write your reply" maxlength=100>
        </div>
    `
    let answerBtn = document.createElement('button');
    answerBtn.innerText = "Post";
    answerBtn.classList = "answer-submit-button"
    answerBtn.onclick = function() {
        let username = document.getElementById(`username-input-${post_id}`).value;
        let answer = document.getElementById(`answer-input-${post_id}`).value;

        if(username && answer ){
            uploadAnswer(channel_id, post_id, new Answer(username, answer, post_id, false))
            showAllAnswersInOnePost(channel_id, post_id);
        }else{
            console.log("please fills all the answer fields");
        }
    }
    answerFormContainer.appendChild(answerBtn);

    answerSection.appendChild(answerFormContainer);
    answerSection.setAttribute("open","");
}

export function showPostForm(channel_id) {
    postFormContainer.innerHTML = `
        <div class="name-title-input">
            <input type="text" id="post-form-username-input" name="userName" placeholder="Post as" maxlength=20>
            <input type="text" id="post-form-title-input" name="title" placeholder="Write your title" maxlength=100>
        </div>
        <textarea rows="3" type="text" id="post-form-description-input" name="description" placeholder="Write your description" maxlength=200"></textarea>
    `

    let formSubmitBtn = document.createElement('button');
    formSubmitBtn.className = "form-submit-button";
    formSubmitBtn.innerText = "Post";
    formSubmitBtn.onclick = async function() {
        let username = document.getElementById("post-form-username-input").value;
        let title = document.getElementById("post-form-title-input").value;
        let description = document.getElementById("post-form-description-input").value;
        if(username && title && description){
            try {
                await uploadPost(channel_id, new Post(username, title, description, channel_id));
                showPostsFromChannel(await getPostListInChannel(channel_id));
            }
            catch(err){
                console.log(err);
            }
            document.getElementById("post-form-username-input").value = '';
            document.getElementById("post-form-title-input").value = '';
            document.getElementById("post-form-description-input").value = '';
        }else{
            alert('please fills all the fields');
        }
    }
    postFormContainer.appendChild(formSubmitBtn);
}