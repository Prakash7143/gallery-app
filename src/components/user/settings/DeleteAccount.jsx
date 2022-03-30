import { Send } from "@mui/icons-material";
import { Button, DialogActions, DialogContent, DialogContentText } from "@mui/material"
import { deleteUser } from "firebase/auth";
import deleteUserFiles from "../../../configs/deleteUserFiles";

import { useAuth } from "../../../contexts/AuthContext";


const DeleteAccount = () => {
    const { currentUser, setLoading, setAlert, setModal, modal} = useAuth();
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        try {
            await deleteUserFiles('gallery_colln', currentUser);
            await deleteUser(currentUser);
            setModal({...modal, isOpen:false});
            setAlert({isAlert:true, severity:'success', message:'Your account has been deleted successfully', timeout:5000, location:'main'})
        } catch (error) {
            setAlert({isAlert:true, severity:'error', message:error.message, timeout:5000, location:'modal'})
            console.log(error);
        }
        setLoading(false);
    }
  return (
    <form onSubmit={handleSubmit}>
        <DialogContent dividers>
            <DialogContentText>
                Are you sure you want to delete your Account?
                This Action will delete all your records too.
            </DialogContentText>
            
        </DialogContent>
        <DialogActions>
            <Button variant="contained" endIcon={<Send/>} >Confirm</Button>
        </DialogActions>
    </form>
  )
}

export default DeleteAccount