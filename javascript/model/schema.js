import { serverTimestamp } from "./firestore-init.js";
import { valid_name } from "../utility/tools.js";
export class Reply {
    constructor(author, content) {
        this.author = author;
        this.content = content;
        this.timestamp = {
            seconds : Date.now() / 1000,
        }
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
    constructor(author, content, post_id, from_teacher) {
        this.author = author;
        this.content = content;
        this.timestamp = {
            seconds : Date.now() / 1000,
        }
        this.from_teacher = from_teacher;
        this.replies = [];
        this.post_id = post_id;
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
    constructor(username, tag, role='student') {
        if(role != 'student' && role != 'teacher'){
            throw new Error('role must be either student or teacher')
        }
        if(!valid_name(username)){
            throw new Error('invalid username')
        }
        this.username = username + '#' + tag;
        this.name = username;
        this.role = role;
        this.member_channels = [];
        this.created_posts = [];
    }
    toFirestore() {
        return {
            username : this.username,
            name : this.name,
            role : this.role,
            member_channels : this.member_channels,
            created_posts : this.created_posts
        }
    }
}