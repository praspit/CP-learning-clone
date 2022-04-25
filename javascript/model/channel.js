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
    arrayUnion,
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

// ให้ new Announcement จาก schemea
export async function uploadAnnouncement(channel_id, announcement) {
    let ann = announcement.toFirestore();
    ann.timestamp = {
        seconds : Math.floor(Date.now() / 1000),
    }
    let channelref = doc(db, `channels/${channel_id}`);
    await updateDoc(channelref, {
        announcements: arrayUnion(ann)
    });
    console.log(`announcement uploaded`);
}

