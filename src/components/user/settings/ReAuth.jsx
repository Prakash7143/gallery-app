import { DialogActions, DialogContent, DialogContentText } from "@mui/material"
import { useRef } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import PasswordField from "../inputs/PasswordField"
import SubmitButton from "../inputs/SubmitButton";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import DeleteAccount from "./DeleteAccount";


const ReAuth = ({action}) => {
    const { currentUser, setLoading, setAlert, setModal, modal} = useAuth();
    const passwordRef = useRef();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        const credential =  EmailAuthProvider.credential(currentUser?.email, passwordRef.current.value);
        try {
            await reauthenticateWithCredential(currentUser, credential);
            switch (action) {
                case "changeEmail":
                    setModal({...modal, title:"Change Email", content:<ChangeEmail />})
                    break;
                case "changePassword":
                    setModal({...modal, title:"Update Password", content:<ChangePassword />})
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
        setLoading(false);
    }
  return (
    <form onSubmit={handleSubmit}>
        <DialogContent dividers>
            <DialogContentText>
                Please Enter Your Current Password
            </DialogContentText>
            <PasswordField {...{passwordRef}} />
        </DialogContent>
        <DialogActions>
            <SubmitButton/>
        </DialogActions>
    </form>
  )
}

export default ReAuth