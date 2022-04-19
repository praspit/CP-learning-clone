import { serverTimestamp } from "./firestore-init.js";

export class Reply {
    constructor(author, content) {
        this.author = author;
        this.content = content;
        this.timestamp = serverTimestamp();
    }
    toFirestore() {
        return {
            author : this.author,
            content : this.content,
            timestamp : this.timestamp,
        }
    }
}

export class Answer {
    constructor(author, content, post_id, from_teacher, idx=-1) {
        this.author = author;
        this.content = content;
        this.from_teacher = from_teacher;
        this.timestamp = serverTimestamp();
        this.replies = [];
        this.post_id = post_id;
        this.idx = idx;
        this.upvotes = 0;
        this.upvoters = [];
    }
    toFirestore() {
        return {
            author : this.author,
            content : this.content,
            from_teacher : this.from_teacher,
            timestamp : this.timestamp,
            replies : this.replies,
            post_id : this.post_id,
            idx : this.idx,
            upvotes : this.upvotes,
            upvoters : this.upvoters
        }
    }
}

export class Post {
    constructor(author, title, description, channel_id) {
        this.author = author;
        this.title = title;
        this.description = description;
        this.timestamp = serverTimestamp();
        this.channel_id = channel_id;
        this.answers = [];
        this.closed = false;
        this.upvotes = 0;
        this.upvoters = [];
    }
    toFirestore() {
        return {
            author : this.author,
            title : this.title,
            description : this.description,
            timestamp : this.timestamp,
            channel_id : this.channel_id,
            answers : this.answers,
            closed : this.closed,
            upvotes : this.upvotes,
            upvoters : this.upvoters
        }
    }
}

export class User {
    constructor(username, tag, name, role){
        this.username = username + '#' + tag;
        this.name = name;
        this.role = role;
        this.member_channels = [];
        this.created_posts = [];
    }
}