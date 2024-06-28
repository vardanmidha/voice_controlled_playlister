import { useContext, useEffect, useState } from 'react';
import List, { listClasses } from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js';
import PublishedToolbar from './PublishedToolbar.js';
import Button from '@mui/material/Button';

function PublishedArea(props) {
  const { store } = useContext(GlobalStoreContext);
  const { id, userName } = props;
  // console.log(store.currentList.songs);
  useEffect(() => {
    store.LoadPublishedPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function preReq(event, song) {
    let x = song.artist;
    let y = false;

    store.currentList.songs.map((s, ind) => (ind == x - 1 ? (y = s) : 1));

    if (y) {
      let result = window.prompt(
        `You have to watch ${song.artist}. Would you like to be redirected to their YouTube video?\n\nEnter 'yes' to confirm, or 'no' to cancel.`
      );
      if (result === 'yes') {
        // console.log(y.youTubeId);
        event.stopPropagation();
        store.setPlay(x - 1);
        // console.log(y);
        // window.location.href = `https://www.youtube.com/watch?v=${y.youTubeId}`;
      }
    }
  }

  let handleSongSelect = (index, event) => {
    event.stopPropagation();
    store.setPlay(index);
  };

  return (
    <div className="workspace">
      <List
        id="published-list"
        sx={{ width: '100%', backgroundColor: 'transparent' }}
      >
        {store.currentList
          ? store.currentList.songs.map((song, index) => (
              <div
                onClick={(event) => {
                  handleSongSelect(index, event);
                }}
                className="published-card"
                key={index + 1}
                style={{backgroundColor:"#bfbfbf"}}
              >
                <p
                  key={index}
                  style={{ color: store.playIndex === index ? '#0000e6' : '' }}
                >
                  {index + 1}. {song.title}
                </p>
                <button
                  className="myButton"
                  onClick={(event) => {
                    preReq(event, song);
                  }}
                  style={{
                    fontFamily: 'Gummy',
                    width: '25%',
                    height: '3em',
                    color: '#00334d',
                    backgroundColor: '#f2f2f2',
                    fontWeight:'bold',
                    bottom:"58px",
                    left:"60%",
                    borderRadius:"10px"
                  }}
                >
                  PreRequisites
                </button>
                
              </div>
            ))
          : ''}
      </List>
      <PublishedToolbar userName={userName} id={id}></PublishedToolbar>
    </div>
  );
}

export default PublishedArea;
