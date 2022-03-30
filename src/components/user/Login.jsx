import { Google } from '@mui/icons-material'
import { Button, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import EmailField from './inputs/EmailField'
import PasswordField from './inputs/PasswordField'
import SubmitButton from './inputs/SubmitButton'
import ResetPassword from './ResetPassword'

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPassRef = useRef();

    const [isRegister, setIsRegister] = useState(false);
    const {modal, setModal, signUp, logIn, loginWithGoogle, setAlert, setLoading} = useAuth();
    useEffect(() =>{
        if(isRegister){
            setModal({...modal, title:"Register"});
        }else{
            setModal({...modal, title:"Login"});
        }
    }, [isRegister]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true)
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if(isRegister){
            const confirmpass = confirmPassRef.current.value;
            try {
                if(password !== confirmpass){
                    throw new Error("Passwords don't match");
                }
                await signUp(email, password);
                setModal({...modal, isOpen:false});
            } catch (error) {
                setAlert({isAlert:true, severity:'error', message:error.message, timeout:5000, location:'modal'})
                // alert(error.message)
                console.log(error);
            }
        }else{
            try {
                await logIn(email, password);
                setModal({...modal, isOpen:false})
            } catch (error) {
                setAlert({isAlert:true, severity:'error', message:error.message, timeout:5000, location:'modal'})
                console.log(error);
            }
        }
        setLoading(false)
    }
const handleGoogle = async () =>{
    try {
        await loginWithGoogle();
        setModal({...modal, isOpen:false})
    } catch (error) {
        setAlert({isAlert:true, severity:'error', message:error.message, timeout:5000, location:'modal'})
        console.log(error);
    }
}
  return (
    <>
        <form onSubmit={handleSubmit}>
            <DialogContent dividers>
                <DialogContentText>
                    Please Enter Your Email and Password:
                </DialogContentText>
                <EmailField {...{emailRef}} />
                <PasswordField {...{passwordRef, autoFocus:false }}  />
                {isRegister && <PasswordField {...{passwordRef:confirmPassRef, id:"confirmPassword", label:"Confirm Password", autoFocus:false }} /> }
            </DialogContent>
            <DialogActions sx={{justifyContent:"space-between", px:"20px"}}>
                <Button onClick={() => setModal({...modal, title:"Reset Password", content:<ResetPassword/>})} size="small">Forgot Password</Button>
                <SubmitButton/>
            </DialogActions>
        </form>
        <DialogActions sx={{justifyContent:"left", p:"5px 24px"}}>
            {
                isRegister ? "Already have an account! Login Now" : "Don't you have an account ? Let's Create One"
            }
            <Button onClick={() => setIsRegister(!isRegister) }>{isRegister ? "Login" : "Register"}</Button>
        </DialogActions>
        <DialogActions sx={{justifyContent:"center", py:"24px"}}>
            <Button variant='outlined' startIcon={<Google/>} onClick={handleGoogle}> Login with Google </Button>
        </DialogActions>
    </>
  )
}

export default Login