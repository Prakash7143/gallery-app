import React, { useEffect, useState } from "react";
import { ImageListItem, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircularProgBar from "./CircularProgBar";
import { v4 as uuidv4} from 'uuid';
import uploadFileProgress from "../../../configs/uploadFileProgress";
import addDocument from "../../../configs/addDocument";
import { useAuth } from "../../../contexts/AuthContext";

const backDrop = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.5)",
  };

const ProgressItem = ({file}) => {
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const {currentUser, setAlert } = useAuth();
  useEffect(()=>{
    const uploadImage = async()=>{
      const imageName = uuidv4()+"."+file.name.split('.').pop();
      try {
        const url = await uploadFileProgress( file, `gallery/${currentUser.uid}`, imageName, setProgress );
        // console.log(url);
        const galleryDoc = {
          imageUrl:url,
          uid: currentUser?.uid || '',
          uEmail: currentUser?.email || '',
          uName: currentUser?.displayName || '',
          uPhoto:currentUser?.photoURL || '',
        }
        await addDocument('gallery_colln', galleryDoc, imageName)
        setImageUrl(null)
      } catch (error) {
        setAlert({isAlert:true, severity:'error', message:error.message, timeout:5000, location:'main'})
        console.log(error);
      }
    }
    setImageUrl(URL.createObjectURL(file));
    uploadImage();
  }, [file])
  return (
    imageUrl && (<ImageListItem cols={1} rows={1}>
      <img
        src={imageUrl}
        alt="gallary"
        loading="lazy"
        style={{objectFit:"cover"}}
      />
      <Box sx={backDrop}>
        {progress < 100 ? (
          <CircularProgBar value={progress} />
        ) : (
          <CheckCircleOutlineIcon
            sx={{ width: 60, height: 60, color: "lightgreen" }}
          />
        )}
      </Box>
    </ImageListItem>)
  );
};


export default ProgressItem;
