import { TextField } from '@mui/material'
import React from 'react'

const EmailField = ({emailRef, defaultValue=''}) => {
  return (
    <TextField 
    autoFocus margin='normal' variant='standard' id='email' label="Email Id" type="email"
    fullWidth required inputRef={emailRef} defaultValue={defaultValue}
    />
  )
}

export default EmailField