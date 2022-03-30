import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../configs/firebase-config";


const authContext = createContext();
export const useAuth = () =>{
    return useContext(authContext);
}

const AuthContext = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [modal, setModal] = useState({
      isOpen:false, title:'', content:''
  });
  const [alert, setAlert] = useState({
    isAlert:false, severity:'info', message:'', timeout:null, location:''
  });
  const [loading, setLoading] = useState(false)

  const loginWithGoogle = () =>{
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const logIn =  (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }
  const logOut = () =>{
    return signOut(auth);
  }
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
        setCurrentUser(user);
        // console.log('user sts: ', user);
    })
    return unsubscribe;
  }, []);


  const value = {
      currentUser, signUp, logIn, logOut, modal, setModal, loginWithGoogle, alert, setAlert, loading, setLoading, resetPassword
  };
  return (
    <authContext.Provider {...{value}}>
        {children}
    </authContext.Provider>
  )
}

export default AuthContext