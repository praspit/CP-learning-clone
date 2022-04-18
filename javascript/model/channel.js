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
    
    addDoc,
    // collection,
    // deleteDoc,
    // doc,
    // getDoc,
    // getDocs,
    // getFirestore,
    updateDoc,
} from "./firestore-init.js";

const channelRef = collection(db, 'channels')

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