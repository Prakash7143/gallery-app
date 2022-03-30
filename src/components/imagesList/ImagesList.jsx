import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { SRLWrapper } from "simple-react-lightbox";
import SimpleReactLightbox from 'simple-react-lightbox'
import { Avatar, Tooltip, Typography } from '@mui/material';
import moment from 'moment';

import Options from './Options';

import useFireStore from "../../configs/useFireStore";
import { useAuth } from '../../contexts/AuthContext';


function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ImagesList = () => {
const { currentUser } = useAuth()
  const {documents} = useFireStore('gallery_colln');
    
  return (
      <SimpleReactLightbox >
        <SRLWrapper>
            <ImageList
            variant="quilted"
            cols={4}
            rowHeight={185}
            >
                {documents.map((item, index) => (
                    <ImageListItem key={item?.id} 
                        cols={patterns[index - Math.floor(index/patterns.length) *patterns.length].cols} 
                        rows={patterns[index - Math.floor(index/patterns.length) *patterns.length].rows}
                        sx={{ opacity:"0.8", transition: "opacity .3s linear", cursor:"pointer",
                            '&:hover':{
                                opacity:1
                            }
                        }}
                        >
                        { currentUser?.uid === item?.data?.uid && (
                            <Options imageId={item?.id}/>
                        ) }
                        
                        <img
                            {...srcset(item?.data?.imageUrl, 185,
                                patterns[index - Math.floor(index/patterns.length) *patterns.length].rows, 
                                patterns[index - Math.floor(index/patterns.length) *patterns.length].cols)}
                            alt={item?.data?.uName || item?.data?.uEmail.split('@')[0]}
                            loading="lazy"
                        />
                        <Typography variant='body2' component="span" 
                        sx={{ position:"absolute", bottom:0, left:0, color:"white", background:"rgba(0,0,0,0.5)",
                            p:"5px", borderTopRightRadius:8
                        }}>
                            {moment(item?.data?.timestamp?.toDate()).fromNow()}
                            {/* {moment(new Date() -500*60*60).fromNow()} */}
                        </Typography>
                        <Tooltip title={item?.data?.uName || item?.data?.uEmail?.split('@')[0]}
                         sx={{ position:"absolute", bottom:"3px", right:"3px" }}>
                            <Avatar src={item?.data?.uPhoto} imgProps={{'aria-hidden':true}}></Avatar>
                        </Tooltip>
                    </ImageListItem>
                ))}
            </ImageList>
        </SRLWrapper>
    </SimpleReactLightbox>
        
  );
}

const patterns =[
    {
        rows:2,
        cols:2
    },
    {
        rows:1,
        cols: 1
    },
    {
        rows:1,
        cols: 1
    },
    {
        rows:1,
        cols: 1
    },
    {
        rows:1,
        cols:1
    },
    {
        rows:1,
        cols:1
    },
    {
        rows:2,
        cols:2
    },
    {
        rows:1,
        cols: 1
    },
    {
        rows:1,
        cols: 1
    },
]


export default ImagesList

