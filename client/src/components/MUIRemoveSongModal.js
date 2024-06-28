import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';


export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);
    
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
            darker: 'red',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
        },
  });

    function prevent(event){
        event.preventDefault();
        event.stopPropagation();
    }

    function handleConfirmRemoveSong () {
        store.addRemoveSongTransaction();
    }
    function handleCancelRemoveSong () {
        store.hideModals();
    }
   
    let modalClass = "modal";
    if (store.isRemoveSongModalOpen()) {
        modalClass += " is-visible";
    }
    let songTitle = "";
    if (store.currentSong) {
        songTitle = store.currentSong.title;
    }

    return (
        <Modal
            open={store.isRemoveSongModalOpen()}
            onClick={prevent}
        >
            <Box sx={style}>
            <div
        id="remove-song-modal"
        className={modalClass}
        data-animation="slideInOutLeft">
        <div className="modal-dialog">
            <div className="dialog-header">
                Remove Song ?
            </div>

            <h3 className='modal-main'>
                    Are you sure you wish to permanently remove "{songTitle}" from the playlist?
            </h3>

            <div id="confirm-cancel-container">
                    <ThemeProvider theme={theme}> 
                        <Button variant="contained"
                        id="dialog-yes-button"
                        className="modal-button"
                        color="primary"
                        onClick={handleConfirmRemoveSong}>
                            Confirm
                        </Button>

                        <Button variant="contained"
                        id="dialog-no-button"
                        className="modal-button"
                        color="primary"
                        onClick={handleCancelRemoveSong}>
                            Cancel
                        </Button>
                    </ThemeProvider>
                    </div>
        </div>
    </div>
            </Box>
        </Modal>
    );
}