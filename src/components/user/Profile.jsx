import { Avatar, Box, DialogActions, DialogContent, DialogContentText, IconButton, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext"
import SubmitButton from "./inputs/SubmitButton";
import { v4 as uuidv4} from 'uuid';
import uploadFile from "../../configs/uploadFile";
import { updateProfile } from "firebase/auth";
import deleteFile from "../../configs/deleteFile";
import updateUserRecords from "../../configs/updateUserRecords";
import CropEasy from "../crop/CropEasy";
import Crop from "@mui/icons-material/Crop";


const Profile = () => {
    const {currentUser, setLoading, setAlert, modal, setModal} = useAuth();
    const [name, setName] = useState(currentUser?.displayName);
    const [file, setFile] = useState(null);
    const [photoURL, setPhotoURL] = useState(currentUser?.photoURL);
    const [openCrop , setOpenCrop] = useState(false);

    const handleChange = (e) =>{
        e.preventDefault();
        const file = e.target.files[0];
        if(file){
            setFile(file);
            setPhotoURL(URL.createObjectURL(file))
            setOpenCrop(true);
        }
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true);
        let userObj = { displayName:name };
        let imagesObj = {uName: name};
        try {
            if(file){
                const imageName = uuidv4() + "." + file?.name?.split(".")?.pop();
                const url = await uploadFile(file, `profile/${currentUser?.uid}/${imageName}`)
                // delete previous profile pic
                if(currentUser?.photoURL){
                    const prevImage = currentUser?.photoURL?.split(`${currentUser?.uid}%2F`)[1].split('?')[0];
                    if(prevImage){
                        try {
                            await deleteFile(`profile/${currentUser?.uid}/${prevImage}`)
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }


                userObj = {...userObj, photoURL:url}
                imagesObj = {...imagesObj, uPhoto:url}
            }
            await updateProfile(currentUser, userObj)

            // update gallery images documents related to this user.
            await updateUserRecords('gallery_colln', currentUser?.uid, imagesObj)


            setAlert({isAlert:true, severity:'success', message:'Your Profile Updated Successfully', timeout:5000, location:'modal'})
        } catch (error) {
            setAlert({isAlert:true, severity:'error', message:error.message, timeout:8000, location:'modal'});
            console.log(error);
        }

        setLoading(false);
    }
    useEffect(() => {
        if(openCrop){
            setModal({...modal, title:"Crop Profile Photo"})
        }else{
            setModal({...modal, title:"Update Profile"})
        }
    }, [openCrop]);
  return (
    !openCrop ? (
        <form onSubmit={handleSubmit}>
            <DialogContent dividers>
                <DialogContentText>
                    You can update your profile by updating these fields:
                </DialogContentText>
                <TextField autoFocus margin="normal" type="text" inputProps={{minLength:2}} 
                fullWidth variant="standard" value={name || ""} required onChange={(e) => setName(e.target.value)}
                />
                <Box sx={{display:"flex", alignItems:"center"}}>
                    <label htmlFor="profilePhoto">
                        <input accept="image/*" id="profilePhoto" type="file" style={{display:"none"}} onChange={handleChange}/>
                        <Avatar src={photoURL} sx={{width:75, height:75, cursor:"pointer"}}/>
                    </label>
                    {
                        file && (
                            <IconButton aria-label="Crop" color="primary" onClick={() => setOpenCrop(true)}>
                                <Crop/>
                            </IconButton>
                        )
                    }
                    
                </Box>
                
            </DialogContent>
            <DialogActions>
                <SubmitButton />
            </DialogActions>
        </form>
    ) :(
        <CropEasy {...{photoURL, setOpenCrop, setPhotoURL, setFile}} />
    )
  )
}

export default Profile