import React, { useContext, useEffect,useRef,useState } from 'react'
import TextField from '@mui/material/TextField';
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

export const Comments = (props) => {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const {selection} = props;

  useEffect(() => {
    store.scrollUp('comments');
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [store.currentList?store.currentList.comments.length: '']);

 

  const handleAddComment = (event) => {
    if (event.key === 'Enter') {
      if(event.target.value!=="") store.AddComment(event.target.value);
      }
  }

  
  let comments = ""
  if(store.currentList){
     comments= store.currentList.comments.map((comment,index=0)=>(
      <div key={index++} className='comment'>
        <Avatar sx={{ bgcolor: '#678983' }}>{comment.initials}</Avatar>
        <div style={{display:'flex' ,flexDirection:'column'}}> 
        <h4 style={{color:'#678983'}}>{comment.userName}</h4>
        <p>{comment.comment}</p>
        </div>
      </div>
      ))
  }
  console.log(selection);
  return (
    <div  className='comments' style={{ opacity: selection === "contained" ? '1' :'0' , pointerEvents: selection === "contained" ? 'auto' :'none' }}  >
        <div id="comments" className='comments-area'>
               {comments}
        </div>
        { auth.loggedIn && store.currentList && store.currentList.published?
        <TextField
        style={{backgroundColor:'white' , marginRight:'1rem',borderRadius:'5px',border:'2px solid black',}}
        onKeyPress={handleAddComment} 
        id="outlined-basic" 
        label="Add Comment" 
        variant="filled" /> : ""
        }
    </div>
  )
}
