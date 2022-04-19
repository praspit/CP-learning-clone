let postsContainer = document.querySelector('.posts-container');

export function showPostsFromChannel(posts) {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        let btn = document.createElement('button');
        btn.className = 'post-container';
        btn.innerHTML = `
            <h1>${post.title}</h1>
            <span>By ${post.author}</span>
            <p>${post.description}</p>
        `
        btn.onclick = function(){
            console.log(post);
        }
        postsContainer.appendChild(btn);
    });
}