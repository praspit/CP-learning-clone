let postsContainer = document.querySelector('.posts-container');

export function showPostsFromChannel(posts) {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        let btn = document.createElement('button');
        btn.className = 'post-container';
        btn.innerHTML = `
            <h1>${post.title}</h1>
            <p>${post.description}</p>
            <h3>${post.author}</h3>
        `
        btn.onclick = function(){
            console.log(post);
        }
        postsContainer.appendChild(btn);
    });
}