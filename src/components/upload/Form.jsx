import { Add } from '@mui/icons-material'
import { Fab, Input } from '@mui/material'
import React, { useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Login from '../user/Login'

const Form = ({setFiles}) => {
  const { currentUser, setModal } = useAuth();
    const fileRef = useRef();

    const handleClick = () =>{
      fileRef.current.click();
    }
    const handleChange = (e) => {
      if(!currentUser){
        return setModal({isOpen:true, title:"Login", content:<Login/>})
      }
      setFiles([...e.target.files]);
      fileRef.current.value = null;
    }
  return (
    <form>
        <Input type="file" inputProps={{multiple:true}} sx={{display:"none"}} inputRef={fileRef} onChange={handleChange} />
        <Fab color='primary' aria-label='add' onClick={handleClick}>
            <Add fontSize='large'/>
        </Fab>
    </form>
  )
}

export default Form