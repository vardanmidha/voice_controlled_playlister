import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

export default function MUIEditSongModal() {
  const { store } = useContext(GlobalStoreContext);
  const [title, setTitle] = useState(store.currentSong.title);
  const [artist, setArtist] = useState(store.currentSong.artist);
  const [youTubeId, setYouTubeId] = useState(store.currentSong.youTubeId);

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

  function prevent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function handleConfirmEditSong(event) {
    let newSongData = {
      title: title,
      artist: artist,
      youTubeId: youTubeId,
    };
    store.addUpdateSongTransaction(store.currentSongIndex, newSongData);
  }

  function handleCancelEditSong(event) {
    store.hideModals();
  }

  function handleUpdateTitle(event) {
    setTitle(event.target.value);
  }

  function handleUpdateArtist(event) {
    setArtist(event.target.value);
  }

  function handleUpdateYouTubeId(event) {
    setYouTubeId(event.target.value);
  }

  return (
    <Modal open={store.isEditSongModalOpen()} onClick={prevent}>
      <Box sx={style}>
        <div className="modal-dialog">
          <div className="dialog-header">Edit Song</div>

          <div className="modal-main">
            <div id="title-prompt" className="modal-prompt">
              Title:
              <input
                id="edit-song-modal-title-textfield"
                className="modal-textfield"
                type="text"
                defaultValue={title}
                onChange={handleUpdateTitle}
              />
            </div>

            <div id="artist-prompt" className="modal-prompt">
              Pre-Requisites:
              <input
                id="edit-song-modal-artist-textfield"
                className="modal-textfield"
                type="text"
                defaultValue={artist}
                onChange={handleUpdateArtist}
              />
            </div>

            <div id="you-tube-id-prompt" className="modal-prompt">
              You Tube Id:
              <input
                id="edit-song-modal-youTubeId-textfield"
                className="modal-textfield"
                type="text"
                defaultValue={youTubeId}
                onChange={handleUpdateYouTubeId}
              />
            </div>
          </div>

          <div id="confirm-cancel-container">
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                id="dialog-yes-button"
                className="modal-button"
                color="primary"
                onClick={handleConfirmEditSong}
              >
                Confirm
              </Button>

              <Button
                variant="contained"
                id="dialog-no-button"
                className="modal-button"
                color="primary"
                onClick={handleCancelEditSong}
              >
                Cancel
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
