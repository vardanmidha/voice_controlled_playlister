
import { useContext } from 'react'
import * as React from 'react';
import { AlertTitle ,Typography, Button,Modal,Alert,Box } from '@mui/material';
import { GlobalStoreContext } from '../store/index.js'


export default function MUIAccessErrorModal() {
  const { store } = useContext(GlobalStoreContext);

  let handleClose = ()=>{
    store.hideModals();
  }

return(
    <Modal
        style={{border:'none'}}
        id='alert-style'
        open={store.isAccessErrorModalOpen()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       
          <Alert severity ="info" style={{border:'2px solid white'}}>
            <AlertTitle>Info</AlertTitle>
            <div id='alert-style'> 
            <Typography component="h1" variant="h5"> {store.message} </Typography>
            <Button onClick={()=>handleClose()}variant="outlined" color="info">Close</Button>
            </div>
          </Alert>
        
      </Modal>

  );
}