import { getPostListInChannel, getOnePost } from "../model/post.js";
import { showPostsFromChannel } from "../view/post.js";
import { getChannel } from "../model/channel.js";
import { showChannelTitle } from "../view/channel.js";
import { showPostForm } from "../view/post.js";


export async function showPostsFromChannelCtrl(channel_id) {
    let posts = await getPostListInChannel(channel_id);
    let channel = await getChannel(channel_id);
    showChannelTitle(channel);
    showPostForm(channel_id);
    showPostsFromChannel(posts);
}

export async function getPostDataFromStorage(post_id, channel_id) {
    if(post_id in window.sessionStorage){
        return JSON.parse(window.sessionStorage.getItem(post_id))
    } else{
        let post = await getOnePost(post_id, channel_id);
        window.sessionStorage.setItem(post_id, JSON.stringify(post));
        return  JSON.parse(window.sessionStorage.getItem(post_id))
    }
}