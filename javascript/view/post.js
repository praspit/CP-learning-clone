import { uploadPost, getOnePostInChannel, uploadAnswer, getPostListInChannel, incrementPostUpvote, cancelUpvote} from "../model/post.js";
import { User, Post, Answer, Reply } from "../model/schema.js"
import { updateUser } from "../controller/userCtrl.js" 
import { showPostsFromChannelCtrl } from "../controller/postCtrl.js";

let postsContainer = document.querySelector('.posts-container');
let postFormContainer = document.querySelector('.post-form-container');

function pressLike(likeBtn, amt){
    likeBtn.setAttribute('likes', parseInt(likeBtn.getAttribute('likes'))+amt);
    likeBtn.innerHTML = `
        <svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M91.6 13A28.7 28.7 0 0 0 51 13l-1 1-1-1A28.7 28.7 0 0 0 8.4 53.8l1 1L50 95.3l40.5-40.6 1-1a28.6 28.6 0 0 0 0-40.6z"/></svg>
        ${likeBtn.getAttribute('likes')}
    `
}

export function showPostsFromChannel(posts) {
    let user = JSON.parse(sessionStorage.getItem('user'));
    let user_id = user.username;

    postsContainer.innerHTML = '';
    posts.forEach(post => {
        let postAndAnswerContainer = document.createElement('div');
        let postBtn = document.createElement('button');
        let postContainer = document.createElement('div');
        postContainer.className = 'post-container';
        postBtn.className = 'show-answers-btn';
        postBtn.id = 'show-answers-btn-' + post.uid;
        postBtn.setAttribute('value', post.answers.length);
        postContainer.innerHTML = `
            <h1>${post.title}</h1>
            <span class="post-author">By ${post.author} | Posted on ${(new Date(post.timestamp.seconds * 1000).toLocaleString())}</span>
            
        `
        let postDescContainer = document.createElement('p');
        postDescContainer.innerText = post.description;
        postContainer.appendChild(postDescContainer);

        let likeBtn = document.createElement('button');
        likeBtn.className = 'like-button';
        likeBtn.setAttribute('likes', post.upvotes);
        likeBtn.innerHTML = `
            <svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M91.6 13A28.7 28.7 0 0 0 51 13l-1 1-1-1A28.7 28.7 0 0 0 8.4 53.8l1 1L50 95.3l40.5-40.6 1-1a28.6 28.6 0 0 0 0-40.6z"/></svg>
            ${post.upvotes}
        `
        if(post.upvoters.includes(user_id)){
            likeBtn.classList.add('liked');
        }
        likeBtn.onclick = async function() {       
            let success = true
            if(likeBtn.classList.contains('liked')) {
                likeBtn.classList.remove('liked');
                pressLike(likeBtn, -1);
                try {
                    success = await cancelUpvote(user_id, post.uid, post.channel_id);

                }
                catch(err) {
                    likeBtn.classList.add('liked');
                    pressLike(likeBtn, 1);
                    console.log(err);
                }
            }
            else {
                likeBtn.classList.add('liked');
                pressLike(likeBtn, 1);
                try {
                    success = await incrementPostUpvote(user_id, post.uid, post.channel_id);                    

                }
                catch(err) {
                    likeBtn.classList.remove('liked');
                    pressLike(likeBtn, -1);
                    console.log(err);
                }
            }
            await updateUser(user_id);
        }

        postBtn.innerText = `show answers (${post.answers.length})`;
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

        let likeAndPostBtnContainer = document.createElement('div');
        likeAndPostBtnContainer.className = 'like-and-post-btn-container';
        let postBtnContainer = document.createElement('span');
        postBtnContainer.appendChild(postBtn);
        let likeBtnContainer = document.createElement('span');
        likeBtnContainer.appendChild(likeBtn);
        likeAndPostBtnContainer.appendChild(likeBtnContainer);
        likeAndPostBtnContainer.appendChild(postBtnContainer);

        postContainer.appendChild(likeAndPostBtnContainer);
        postAndAnswerContainer.appendChild(postContainer);
        postAndAnswerContainer.appendChild(answerSection);
        postAndAnswerContainer.classList = "post-answer-container"
        postAndAnswerContainer.dataset.uid = post.uid;
        postsContainer.appendChild(postAndAnswerContainer);
    });
}

async function showAllAnswersInOnePost(channel_id, post_id) {
    const user = JSON.parse(sessionStorage.getItem('user'));

    let answerSection = document.querySelector(`[data-uid="${post_id}"]`).getElementsByClassName("answer-section")[0];
    answerSection.innerHTML = '';
    let post = await getOnePostInChannel(channel_id, post_id);

    post.answers.forEach(answer => {
        let answerContainer = document.createElement('div');
        answerContainer.classList = "answer-container";
        let answerNameContainer = document.createElement('span');
        let answerContentContainer = document.createElement('span');
        answerNameContainer.innerText = answer.author + ': ';
        answerContentContainer.innerText = answer.content;
        answerContainer.appendChild(answerNameContainer);
        answerContainer.appendChild(answerContentContainer);
        answerSection.appendChild(answerContainer);
    })

    let answerFormContainer = document.createElement('div');
    answerFormContainer.classList = "answer-form-container";
    answerFormContainer.innerHTML = `
        <div class="name-answer-input">
            <select class="answer-form-username-input" name="username" id="username-input-${post_id}">
                <option value="" disabled selected>Reply as</option>
                <option value=${user.username}>you</option>
                <option value="anonymous">anonymous</option>
            </select>
            <span></span>
            <textarea rows="1" type="text" id="answer-input-${post_id}" class="answer-form-answer-input" "name="answer" placeholder=" Write your reply" maxlength=100></textarea>
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
            .then(() => {
                let showbtn = document.getElementById(`show-answers-btn-${post_id}`);
                showbtn.setAttribute('value', parseInt(showbtn.getAttribute('value'))+1);
                showbtn.innerText = `show answers (${showbtn.getAttribute('value')})`;
            })
            showAllAnswersInOnePost(channel_id, post_id);
        }else{
            console.log("please fills all the answer fields");
        }
    }
    answerFormContainer.appendChild(answerBtn);

    answerSection.appendChild(answerFormContainer);
    answerSection.setAttribute("open","");

    let answerInputArea = document.getElementById(`answer-input-${post_id}`);
    answerInputArea.addEventListener('input', autoInputH, false);
    function autoInputH(){
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    }
}

export function showPostForm(channel_id) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    postFormContainer.innerHTML = `
        <div class="name-title-input">
            <select name="userName" id="post-form-username-input">
                <option value="" disabled selected>Post as</option>
                <option value=${user.username}>you</option>
                <option value="anonymous">anonymous</option>
            </select>
            
            <input type="text" id="post-form-title-input" name="title" placeholder=" Write your title" maxlength=100>
        </div>
        <textarea rows="3" type="text" id="post-form-description-input" name="description" placeholder=" Write your description" maxlength=200"></textarea>
    `
    //<input type="text" id="post-form-username-input" name="userName" placeholder=" Post as" maxlength=20>

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

    let postInputArea = document.getElementById(`post-form-description-input`);
    postInputArea.addEventListener('input', autoInputH, false);
    function autoInputH(){
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    }
}

export function showSortAndFilterOptions(channel_id, sortBy) {
    let sortAndFilterContainer = document.querySelector('.sort-and-filter-container');
    sortAndFilterContainer.innerHTML = `
        <div>
            <h4>Sort By: </h4>
        </div>
        <div>
            <select class="sort-by-input" name="sortby" id="sortby-input">
                <option value="timestamp">Most Recent</option>
                <option value="upvotes">Most upvoted</option>
            </select>
        </div>    
    `;
    let sortByInput = document.getElementById('sortby-input');
    sortByInput.value = sortBy;
    sortByInput.addEventListener('change', reshowPosts, false);

    function reshowPosts(){
        showPostsFromChannelCtrl(channel_id, sortByInput.value);
        console.log(sortByInput.value);
    }

}