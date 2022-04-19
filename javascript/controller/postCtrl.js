import { getPostListInChannel } from "../model/post.js";
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