import { collection, getDocs, query, where } from "firebase/firestore"
import deleteDocument from "./deleteDocument";
import deleteFile from "./deleteFile";
import { db } from "./firebase-config"



const deleteUserFiles = (collectionName, currentUser) => {
  return new Promise ( async (resolve, reject) => {
    const qr = query( collection(db, collectionName), where('uid', '==', currentUser.uid) );
    try {
        const snapshot = await getDocs(qr);
        const storePromises = [];
        const storagePromises = [];
        snapshot.forEach(document => {
            storePromises.push( deleteDocument(collectionName, document.id) )
            storagePromises.push( deleteFile(`${collectionName}/${currentUser.uid}/${document.id}`) )
        })
        await Promise.all(storePromises);
        await Promise.all(storagePromises);
        if(currentUser?.photoURL){
            const photoName = currentUser?.photoURL?.split(`${currentUser?.uid}%2F`)[1]?.split('?')[0];
            if(photoName){
                try {
                    await deleteFile(`profile/${currentUser?.uid}/${photoName}`);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        resolve();
    } catch (error) {
        reject(error);
    }
  })
}

export default deleteUserFiles