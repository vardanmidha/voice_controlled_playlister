import { useContext, useState, useEffect } from 'react';
import { GlobalStoreContext } from '../store';
import React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

function ListCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const [editActive, setEditActive] = useState(false);
  const [text, setText] = useState('');
  const { List } = props;

  function handleToggleEdit(event) {
    event.preventDefault();
    event.stopPropagation();
    toggleEdit();
  }

  function toggleEdit() {
    let newActive = !editActive;
    setEditActive(newActive);
  }

  function handleKeyPress(event) {
    if (event.code === 'Enter') {
      if (
        (store.currentList && store.currentList.name === text) ||
        text === ''
      ) {
        toggleEdit();
        return;
      }
      let id = event.target.id.substring('list-'.length);
      store.changeListName(id, text);
      if (store.playlists) {
        let check = store.playlists.filter((list) => list.name === text);
        if (!check.length > 0) toggleEdit();
      }
    }
  }

  function blurAction() {
    if (!store.isAccessErrorModalOpen()) toggleEdit();
  }

  function handleUpdateText(event) {
    setText(event.target.value);
  }

  let cardElement = (
    <ListItem key={List._id} onDoubleClick={handleToggleEdit}>
      <Box style={{ alignSelf: 'flex-start', flex: '1' }}>
        {List.name}
        <Box style={{ fontSize: '12pt' }}>By: {List.owner} </Box>
      </Box>
    </ListItem>
  );

  if (editActive) {
    cardElement = (
      <TextField
        margin="normal"
        required
        fullWidth
        id={'list-' + List._id}
        label="Playlist Name"
        name="name"
        autoComplete="Playlist Name"
        className="list-card"
        onKeyPress={handleKeyPress}
        onChange={handleUpdateText}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        color={'success'}
        onBlur={blurAction}
        defaultValue={List.name}
        inputProps={{ style: { fontSize: 48 } }}
        InputLabelProps={{ style: { fontSize: 17 } }}
        autoFocus
      />
    );
  }
  return cardElement;
}

export default ListCard;
