export class Reply {
    constructor(author, content, timestamp) {
        this.author = author;
        this.content = content;
        this.timestamp = timestamp;
    }
}

export class Answer {
    constructor(author, content, post_id, from_teacher, timestamp, uid='') {
        this.author = author;
        this.content = content;
        this.from_teacher = from_teacher;
        this.timestamp = timestamp;
        this.replies = [];
        this.post_id = post_id;
        this.uid = uid;
        this.upvotes = 0;
    }
}

export class Post {
    constructor(author, title, channel_id, timestamp, uid='') {
        this.author = author;
        this.title = title;
        this.timestamp = timestamp;
        this.channel_id = channel_id;
        this.uid = uid;
        this.answers = [];
        this.closed = false;
        this.upvotes = 0;
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