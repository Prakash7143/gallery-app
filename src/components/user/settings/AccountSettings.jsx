import { Button, DialogActions, DialogContent, DialogContentText } from "@mui/material"
import { GoogleAuthProvider, reauthenticateWithPopup } from "firebase/auth";
import { useAuth } from "../../../contexts/AuthContext"
import ChangeEmail from "./ChangeEmail";
import DeleteAccount from "./DeleteAccount";
import ReAuth from "./ReAuth";


const AccountSettings = () => {
    const {currentUser, setModal, modal, setAlert} = useAuth();
    const isPasswordProvider = currentUser?.providerData[0].providerId === 'password'

    const handleAction = async (action) =>{
        if(isPasswordProvider){
            setModal({...modal, title:"Re Login", content:<ReAuth {...{action}} />})
        }else{
            try {
                await reauthenticateWithPopup(currentUser, new GoogleAuthProvider());
                switch (action) {
                    case "changeEmail":
                        setModal({...modal, title:"Change Email", content:<ChangeEmail />})
                        break;
                    case "deleteAcc":
                        setModal({...modal, title:"Delete Account", content:<DeleteAccount />})
                        break;

                
                    default:
                        throw new Error('No matching actions');
                }

            } catch (error) {
                setAlert({isAlert:true, severity:'error', message:error.message, timeout:5000, location:'modal'})
                console.log(error);
            }
        }
    }

  return (
    <>
        <DialogContent dividers>
            <DialogContentText >
                For security reasons, you need to provide your credentials to do any of these actions:
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{flexDirection:'column', gap:1, my:2}}>
            {
               isPasswordProvider && ( <Button onClick={() => handleAction('changePassword')}>Change Password</Button> )
            }
            <Button onClick={() => handleAction('changeEmail')}>Change Email</Button>
            <Button onClick={() => handleAction('deleteAcc')}>Delete Account</Button>
        </DialogActions>
    </>
  )
}

export default AccountSettings