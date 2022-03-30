import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'

const PasswordField = ({passwordRef, id="password", label="password", autoFocus=true}) => {
    const [showPass, setShowPass] = useState(false);

    const handleClick = () =>{
        setShowPass(!showPass);
    }
    const handleMouseDown = (e) =>{
        e.preventDefault();
    }

  return (
    <TextField 
    autoFocus={autoFocus} margin='normal' variant='standard' id={id} label={label} type={showPass ? "text" : "Password"}
    fullWidth required inputRef={passwordRef} inputProps={{minLength:6}} 
    InputProps={{ 
      endAdornment: 
      <InputAdornment position='end'>
        <IconButton 
          aria-label='Toggle Password visibility' onClick={handleClick} onMouseDown={handleMouseDown}
          >{showPass ? <VisibilityOff/> : <Visibility/>}
        </IconButton>
      </InputAdornment>}}
    />
  )
}

export default PasswordField