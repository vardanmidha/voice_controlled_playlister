import AuthContext from '../auth'
import { useContext } from 'react'
import * as React from 'react';
import { AlertTitle ,Typography, Button,Modal,Alert,Box } from '@mui/material';



export default function MUILoginErrorModal() {
  const { auth } = useContext(AuthContext);

  let handleClose = ()=>{
    auth.closeError();
    console.log("close");
  }

return(
    <Modal
        id='error-style'
        open={auth.isLoginErrorOpen()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Alert severity ="warning">
            <AlertTitle>Error</AlertTitle>
            <div id='alert-style'> 
            <Typography component="h1" variant="h5"> {auth.message} </Typography>
            <Button onClick={handleClose}variant="outlined" color="error">Close</Button>
            </div>
          </Alert>
        </Box>
      </Modal>

  );
}