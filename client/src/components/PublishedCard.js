import { useContext, useState,useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Button from '@mui/material/Button';
import AuthContext from '../auth'

function PublishedCard(props) {
    
    const { store } = useContext(GlobalStoreContext);
    const {List} = props;
    const { auth } = useContext(AuthContext);
    
    function handleLike(event){
        event.stopPropagation();
        event.preventDefault();
        console.log("like");
        store.AddLike(List._id);
    }
    
    function handleDislike(event){
        event.stopPropagation();
        event.preventDefault();
        store.AddDislike(List._id);
        console.log("dislike");

    }
  
    return (
        <ListItem
            className='card'
            key={List._id}
            style={{color:'black',
            backgroundColor:'#bfbfbf',
            borderRadius:"12px"
        }}
        >  
            <Box style={{alignSelf:'flex-start' , gap:'2rem', flex:'1'}} >{List.name}
                <Box style={{fontSize:'12pt',display:'flex' ,gap:'.5rem'}} > <p style={{}}>By:</p> {List.owner} </Box>
                <Box style={{display:'flex', gap:'.5rem',fontSize:'12pt',marginTop:'1rem',color:"#0000cc"}} > <p style={{color:"black"}}>Published:</p>{new Date(List.date).toDateString()} </Box>
            </Box>
            
            <Box style={{display:'flex' , flexDirection:'column'}}>
                <div>
                <Button
                    className='like'
                    id='like' 
                    disabled={!auth.loggedIn}
                    onClick={handleLike}
                    variant="none">
                    
                    <ThumbUpIcon />
                    <Box style={{fontSize:'12pt', margin:'1rem',marginTop:'1rem'}} >{List.likes} </Box>
                </Button>
                <Button
                    className='like'
                    id='like'
                    disabled={!auth.loggedIn}
                    onClick={handleDislike}
                    variant="none">
                    <ThumbDownIcon />
                    <Box style={{fontSize:'12pt', margin:'1rem',marginTop:'1rem'}} >{List.dislikes} </Box>
                </Button>
                </div>
                <Box style={{ display:'flex', gap:'.5rem',fontSize:'12pt',marginBottom:'2rem', color:'#0000cc'}} > <p style={{color:'black'}}>Listens:</p> {List.listens} </Box>
              </Box>
        </ListItem>
    );
}

export default PublishedCard;