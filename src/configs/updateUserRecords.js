import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "./firebase-config"



const updateUserRecords =  (collectionName, uid, updateObj) => {
  return new Promise( async (resolve, reject) => {
    const qr = query( collection(db, collectionName), where('uid', '==', uid) );
    try {
        const snapshot = await getDocs(qr);
        const updatePromises = [];
        snapshot.forEach(document => {
            updatePromises.push(updateDoc(doc(db, collectionName, document.id), updateObj))
        })
        await Promise.all(updatePromises);
        resolve();
    } catch (error) {
        reject(error)
    }
  })
}

export default updateUserRecords