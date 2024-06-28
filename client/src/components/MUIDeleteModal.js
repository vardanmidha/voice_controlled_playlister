import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};


const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#678983',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

export default function MUIDeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
    }
    function handleDeleteList(event) {
        store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        store.hideModals();
    }

    return (
        <Modal
            open={store.isDeleteListModalOpen()}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                    <header className="dialog-header">
                        Delete Playlist ?
                    </header>

                    <h3 className='modal-main'> 
                    Are you sure you want to delete "{name}" playlist ? 
                    </h3>

                    <div id="confirm-cancel-container">
                    <ThemeProvider theme={theme}> 
                        <Button variant="contained"
                        id="dialog-yes-button"
                        className="modal-button"
                        color="primary"
                        onClick={handleDeleteList}>
                            Confirm
                        </Button>

                        <Button variant="contained"
                        id="dialog-no-button"
                        className="modal-button"
                        color="primary"
                        onClick={handleCloseModal}>
                            Cancel
                        </Button>
                    </ThemeProvider>
                    </div>
            </div>
            </Box>
        </Modal>
    );
}