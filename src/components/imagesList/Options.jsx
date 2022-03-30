// import React from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';

import { Delete, MoreVert } from '@mui/icons-material';
import deleteDocument from '../../configs/deleteDocument';
import deleteFile from '../../configs/deleteFile';
import { useAuth } from "../../contexts/AuthContext";


const Options = ({imageId}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const currentUser = {uid:'userId1234'}
  const {currentUser, setAlert } = useAuth();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () =>{
      try {
        await deleteDocument('gallery_colln', imageId);
        await deleteFile(`gallery/${currentUser.uid}/${imageId}`)
      } catch (error) {
        setAlert({isAlert:true, severity:'error', message:error.message, timeout:5000, location:'main'})
        console.log(error);
      }
  }
  
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip  title="Options">
                <IconButton onClick={handleClick}
                 sx={{ position:"absolute", color:"white", top:0, right:0, background:"rgba(0,0,0,0.3)" }}>
                    <MoreVert fontSize='large'/>
                </IconButton>
          </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
              <Delete/>
          </ListItemIcon> Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default Options