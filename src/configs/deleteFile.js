import { deleteObject, ref } from "firebase/storage"
import { storage } from "./firebase-config"


const deleteFile = (filePath) => {
 const imgRef = ref(storage, filePath);
 return deleteObject(imgRef);
}

export default deleteFile