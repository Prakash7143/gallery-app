import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase-config'

const addDocument = (collectionName, documentObject, id) =>{
    const docRef = doc(collection(db, collectionName), id);
    return setDoc(docRef, {
        ...documentObject, 
        timestamp: serverTimestamp()
    })
}

export default addDocument;