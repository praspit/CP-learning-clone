import {
    db,
    app,
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
    
    addDoc,
    // collection,
    // deleteDoc,
    // doc,
    // getDoc,
    // getDocs,
    // getFirestore,
    updateDoc,
} from "./firestore-init.js";

export function getPostRef(post_id, channel_id = ''){
    if(channel_id){
        return doc(db, `channels/${channel_id}/posts/${post_id}`)
    }
    let postRef = query(collectionGroup(db, "posts"), where('uid', '==', post_id));
    return postRef
}

export async function getSingleDocRefFromQuery(docRef){
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
        console.log(postSnap.id, ' => ', postSnap.data())
    }
}

export async function getOnePostInChannel(channel_id, post_id){
    let postRef = getPostRef(post_id, channel_id);
    let postSnap = await getDoc(postRef)
    console.log(postSnap.id, ' => ', postSnap.data())
}

export async function getPostListInChannel(channel_id){
    let postRef = collection(db, `channels/${channel_id}/posts`)
    let postSnap = await getDocs(postRef)
    postSnap.forEach((post) => {
        console.log(post.id, ' => ', post.data());
    })
}

export async function incrementPostUpvote(post_id, channel_id = '', amt = 1){
    let postRef = getPostRef(post_id, channel_id);
    if(postRef.type === 'query'){
        postRef = await getSingleDocRefFromQuery(postRef);
    }
    await updateDoc(postRef, {
        upvotes: increment(amt)
    })
    console.log('done')
}