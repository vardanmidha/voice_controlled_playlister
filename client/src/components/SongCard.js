import React, { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';

function SongCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const [draggedTo, setDraggedTo] = useState(0);
  const { song, index } = props;
  // const [ artist, setArtist ] = useState(store.currentSong.artist);
  function handlePlay(event) {
    event.stopPropagation();
    store.setPlay(index);
  }

  function handleDragStart(event) {
    event.dataTransfer.setData('song', index);
  }

 


  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDragEnter(event) {
    event.preventDefault();
    setDraggedTo(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    setDraggedTo(false);
  }

  function handleDrop(event) {
    event.preventDefault();
    let targetIndex = index;
    let sourceIndex = Number(event.dataTransfer.getData('song'));
    setDraggedTo(false);
    console.log(draggedTo);

    // UPDATE THE LIST
    store.addMoveSongTransaction(sourceIndex, targetIndex);
  }
  function handleRemoveSong(event) {
    event.preventDefault();
    event.stopPropagation();
    store.showRemoveSongModal(index, song);
  }
  function handleDoubleClick(event) {
    store.showEditSongModal(index, song);
  }

  // function preReq(event) {
  //   let x = song.artist;
  //   let y = false;

  //   store.currentList.songs.map((s, index) => (index == x - 1 ? (y = s) : 1));

  //   if (y) {
  //     let result = window.prompt(
  //       `You have to watch ${song.artist}. Would you like to be redirected to their YouTube video?\n\nEnter 'yes' to confirm, or 'no' to cancel.`
  //     );
  //     if (result === 'yes') {
  //       // console.log(y.youTubeId);
  //       window.location.href = `https://www.youtube.com/watch?v=${y.youTubeId}`;
  //     }
  //   }
  // }

  return (
    <div
      key={index}
      id={'song-' + index + '-card'}
      className={'song-card'}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      draggable="true"
      onClick={handlePlay}
      onDoubleClick={handleDoubleClick}
    >
      <h5 style={{ fontWeight:"bold",  color: store.playIndex === index ? 'black' : '' }}>
        {index + 1}. {song.title}
      </h5>
      {/* <button className="myButton" onClick={preReq}>
        PreRequisites
      </button> */}
         

      <Button id="delete-song-button" onClick={handleRemoveSong} variant="none">
        <ClearIcon />
      </Button>
    </div>
  );
}

export default SongCard;
