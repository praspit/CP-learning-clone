import { getPostListInChannel } from "../model/post.js";
import { showPostsFromChannel } from "../view/post.js";

export async function showPostsFromChannelCtrl(channel_id) {
    let posts = await getPostListInChannel(channel_id);
    showPostsFromChannel(posts);
}