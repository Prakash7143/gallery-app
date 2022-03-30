import React from 'react'
import ImageList from '@mui/material/ImageList';
import ProgressItem from './ProgressItem';


const ProgressList = ({files}) => {
  return (
    <ImageList rowHeight={185} cols={4}>
        {
          files.map((file, index) =>
            ( <ProgressItem file={file} key={index}/> )
          )
        }
       
    </ImageList>
  )
}

export default ProgressList