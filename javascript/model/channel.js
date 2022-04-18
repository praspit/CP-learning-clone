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


export async function getChannel(channel_id){
    let channelRef = doc(db, `channels/${channel_id}`)
    let channelSnap = await getDoc(channelRef)
    console.log(channelSnap.id, ' => ', channelSnap.data())
    return channelSnap.data()
}

export async function getChannelsFromList(channel_list){
    let q = query(collection(db, "channels"), where(documentId(), 'in', channel_list));
    let querySnapshot = await getDocs(q);
    let channels = querySnapshot.docs.map(doc => doc.data());
    console.log(channels)
    return channels
}