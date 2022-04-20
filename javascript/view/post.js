import { uploadPost } from "../model/post.js";
import { User, Post, Answer, Reply } from "../model/schema.js"

let postsContainer = document.querySelector('.posts-container');
let postFormContainer = document.querySelector('.post-form-container');

export function showPostsFromChannel(posts) {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        let postBtn = document.createElement('button');
        postBtn.className = 'post-container';
        postBtn.innerHTML = `
            <h1>${post.title}</h1>
            <span>By ${post.author}</span>
            <p>${post.description}</p>
        `
        postBtn.onclick = function(){
            console.log(post);
        }
        postsContainer.appendChild(postBtn);
    });
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