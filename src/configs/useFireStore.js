import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext";
import { db } from "./firebase-config";


const useFireStore = (collectionName='gallery_colln') => {
    const [documents, setDocuments] = useState([]);
    const { setAlert } = useAuth();
    useEffect(()=>{
        const qr = query(
            collection(db, collectionName),
            orderBy('timestamp', 'desc')
        )
        const unsubscribe = onSnapshot(qr, (snapshot) =>{
            const docs = [];
            snapshot.forEach(doc => {
                docs.push({id:doc.id, data:doc.data()})
            })
            setDocuments(docs)
        }, (error) => {
            setAlert({isAlert:true, severity:'error', message:error.message, timeout:5000, location:'main'})
            console.log(error);
        })
        return () => unsubscribe();

    }, [collectionName]);

    return {documents};
}

export default useFireStore