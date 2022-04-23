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
    updateDoc,
} from "./firestore-init.js";


export async function getChannel(channel_id){
    let channelRef = doc(db, `channels/${channel_id}`);
    let channelSnap = await getDoc(channelRef);
    console.log(`getChannel: ${channelSnap.id}`);
    return channelSnap.data();
}

export async function getChannelsFromList(channel_list){
    let q = query(collection(db, "channels"), where(documentId(), 'in', channel_list));
    let querySnapshot = await getDocs(q);
    let channels = querySnapshot.docs.map(doc => doc.data());
    console.log(`getChannelsFromList: ${channels.length}`)
    return channels;
}

export async function getAllChannels(){
    let q = query(collection(db, "channels"), orderBy('channel_name'));
    let querySnapshot = await getDocs(q);
    let channels = querySnapshot.docs.map(doc => doc.data());
    console.log(`getAllChannels: ${channels.length}`);
    return channels;
}

