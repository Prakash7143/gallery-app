import { DialogActions, DialogContent } from "@mui/material"
import { useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import EmailField from "./inputs/EmailField"
import SubmitButton from "./inputs/SubmitButton";




const ResetPassword = () => {
    const { setLoading, setAlert, setModal, modal, resetPassword } = useAuth();
    const emailRef = useRef();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        try {
            await resetPassword(emailRef.current.value);
            setModal({...modal, isOpen:false})
            setAlert({isAlert:true, severity:'success', message:'Password Reset link has been sent to mail inbox', timeout:5000, location:'main'})
        } catch (error) {
            setAlert({isAlert:true, severity:'error', message:error.message, timeout:5000, location:'main'})
            console.log(error);
        }
        setLoading(false);
    }
  return (
    <form onSubmit={handleSubmit}>
        <DialogContent dividers>
            <DialogContent>
                Please Enter Your Email Address
            </DialogContent>
            <EmailField {...{emailRef}}/>
        </DialogContent>
        <DialogActions>
            <SubmitButton/>
        </DialogActions>
    </form>
  )
}

export default ResetPassword