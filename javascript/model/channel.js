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
    
    addDoc,
    // collection,
    // deleteDoc,
    // doc,
    // getDoc,
    // getDocs,
    // getFirestore,
    updateDoc,
} from "./firestore-init.js";

export async function getChan(){
    const q = query(collection(db, "channels"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        let docpostRef = collection(db, `channels/${doc.id}/posts`);
        const postSnapshot = await getDocs(docpostRef);
        postSnapshot.forEach((post) => {
            console.log(post.id, " => ", post.data());
        })
    });
}

export async function getChannel(channel_id){
    let channelRef = doc(db, `channels/${channel_id}`)
    let channelSnap = await getDoc(channelRef)
    console.log(channelSnap.id, ' => ', channelSnap.data())
}

export async function getChannelsFromList(channel_list){
    let q = query(collection(db, "channels"), where(documentId(), 'in', channel_list));
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((channel) => {
        console.log(channel.id, ' => ', channel.data());
    })
}