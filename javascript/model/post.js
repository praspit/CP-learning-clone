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
    
    addDoc,
    // collection,
    // deleteDoc,
    // doc,
    // getDoc,
    // getDocs,
    // getFirestore,
    updateDoc,
} from "./firestore-init.js";


export async function getPost(post_id) {
    let posts = query(collectionGroup(db, 'posts'), where("uid", "==", post_id));
    let querySnapshot = await getDocs(posts);
    console.log(typeof(querySnapshot))
    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
    });
}

export async function getPostInChannel(channel_id, post_id){
    let postRef = doc(db, `channels/${channel_id}/posts/${post_id}`)
    let postSnap = await getDoc(postRef)
    console.log(postSnap.id, ' => ', postSnap.data())
}