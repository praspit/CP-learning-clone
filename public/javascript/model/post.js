import {
    db,
	doc,
	getDoc,
	getDocs,
	collection,
	query,
	setDoc,
	deleteDoc,
    collectionGroup,
    where,
    limit,
    orderBy,
    serverTimestamp,
    documentId,
    increment,
    arrayUnion,
    
    addDoc,
    updateDoc,
    arrayRemove,
} from "./firestore-init.js";

function getPostRef(post_id, channel_id = ''){
    if(channel_id){
        return doc(db, `channels/${channel_id}/posts/${post_id}`)
    }
    let postRef = query(collectionGroup(db, "posts"), where('uid', '==', post_id));
    return postRef
}

async function getSingleDocRefFromQuery(docRef){
    if(docRef.type == 'query'){
        let docSnap = await getDocs(docRef);
        docSnap = docSnap.docs[0];
        docRef = docSnap.ref
    }
    return docRef
}

export async function getOnePost(post_id) {
    let postRef = getPostRef(post_id);
    if(postRef.type === 'query'){
        let postSnap = await getDocs(postRef);
        postSnap = postSnap.docs[0];
        console.log(`getOnePost: ${postSnap.id}`)
        return postSnap.data()
    }
}

export async function getOnePostInChannel(channel_id, post_id){
    let postRef = getPostRef(post_id, channel_id);
    let postSnap = await getDoc(postRef)
    console.log(`getOnePostInChannel: ${postSnap.id}`)
    return postSnap.data()
}

// sortBy parameter can be only 'upvotes' or 'timestamp' (if not provided, it will be 'timestamp')
export async function getPostListInChannel(channel_id, sortBy='timestamp', onlyActive=true){
    if(sortBy && (sortBy == 'upvotes' || sortBy == 'timestamp')){
        if(onlyActive){
            var postRef = query(collection(db, `channels/${channel_id}/posts`), where('closed', '==', false), orderBy(sortBy, 'desc'));
        }else{
            var postRef = query(collection(db, `channels/${channel_id}/posts`), orderBy(sortBy, 'desc'));
        }
    }
    else {
        var postRef = collection(db, `channels/${channel_id}/posts`)
    }
    let postSnap = await getDocs(postRef)
    let posts = postSnap.docs.map(doc => doc.data());
    console.log(`getPostListInChannel: ${posts.length}`)
    return posts
}

export async function incrementPostUpvote(user_id, post_id, channel_id = '', amt = 1){
    let postRef = getPostRef(post_id, channel_id);
    if(postRef.type === 'query'){
        postRef = await getSingleDocRefFromQuery(postRef);
    }
    let postSnap = await getDoc(postRef);
    if(!postSnap.exists()){
        console.log(`incrementPostUpvote: post ${post_id} does not exist`)
        return false
    }
    if(postSnap.data().upvoters.includes(user_id)){
        console.log('already upvoted')
        return false
    }
    await updateDoc(postRef, {
        upvotes: increment(amt),
        upvoters: arrayUnion(user_id)
    })
    console.log('upvote incremented')
    return true
}

export async function cancelUpvote(user_id, post_id, channel_id = ''){
    let postRef = getPostRef(post_id, channel_id);
    if(postRef.type === 'query'){
        postRef = await getSingleDocRefFromQuery(postRef);
    }
    let postSnap = await getDoc(postRef);
    if(!postSnap.exists()){
        console.log(`incrementPostUpvote: post ${post_id} does not exist`)
        return false
    }
    if(!postSnap.data().upvoters.includes(user_id)){
        console.log('not yet upvoted')
        return false
    }
    await updateDoc(postRef, {
        upvotes: increment(-1),
        upvoters: arrayRemove(user_id)
    })
    console.log('upvote canceled')
    return true
}

// you need to create post using the constructor in schema.js and pass it to this function
export async function uploadPost(channel_id, post){
    post = post.toFirestore()
    post.timestamp = serverTimestamp();
    let postCollectionRef = collection(db, `channels/${channel_id}/posts`);
    let postRef = await addDoc(postCollectionRef, post);
    await updateDoc(postRef, {
        uid: postRef.id
    })
    let postSnap = await getDoc(postRef);
    console.log('post uploaded')
}

export async function uploadAnswer(channel_id, post_id, answer){
    answer = answer.toFirestore()
    answer.timestamp = {
        seconds: Math.floor(Date.now() / 1000),
    }
    let postRef = getPostRef(post_id, channel_id);
    await updateDoc(postRef, {
        answers : arrayUnion(answer)
    })
    let postSnap = await getDoc(postRef);
    console.log('answer uploaded')
}

export async function deletePost(channel_id, post_id){
    await deleteDoc(doc(db, `channels/${channel_id}/posts/${post_id}`))
    console.log('post deleted')
}
