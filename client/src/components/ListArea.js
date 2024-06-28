import React, { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../store';
import List from '@mui/material/List';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import PublishedCard from './PublishedCard';
import { useHistory } from 'react-router-dom';
import PublishedArea from './PublishedArea';

export const ListArea = (props) => {
  const { store } = useContext(GlobalStoreContext);
  const [expanded, setExpanded] = React.useState(false);
  const { parent } = props;
  store.history = useHistory();

  useEffect(() => {
    store.LoadPublishedPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.search]);

  const handleChange = (panel, id) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    store.clearTransaction();
    if (!store.currentList || store.currentList._id !== id) {
      store.setPublishedList(id);
    }
  };

  let ListArea = '';

  if (store.PublishedPlaylists) {
    // let playlists=[];
    let playlists = store.PublishedPlaylists;
    /// Search by PlaylistName
    if (store.search === '') playlists = [];
    if (store.search && store.search !== '') {
      if (parent === 'AllListScreen')
        playlists = playlists.filter((list) =>
          list.name.startsWith(store.search)
        );
      if (parent === 'UserScreen')
        playlists = playlists.filter((list) =>
          list.owner.startsWith(store.search)
        );
    }

    //// Sorting
    switch (store.sortMethod) {
      case 'Name':
        console.log('Sort By Name');
        playlists = store.SortName(playlists);
        break;
      case 'PublishedDate':
        playlists = store.SortPublishedDate(playlists);
        console.log('Sort By Published');
        break;
      case 'Listens':
        playlists = store.SortMostListens(playlists);
        console.log('Sort By Listens');
        break;
      case 'Likes':
        playlists = store.SortMostLikes(playlists);
        console.log('Sort by Likes');
        break;
      case 'Dislikes':
        playlists = store.SortMostDislikes(playlists);
        console.log('Sort by Dislikes');
        break;

      default:
        console.log('Sort Method null');
    }

    ListArea = (
      <List sx={{ width: '90%', left: '5%' }}>
        {playlists.map((list, id = 0) => (
          <Accordion
            style={{
              backgroundColor:
                store.currentList && store.currentList._id === list._id
                  ? '#678983'
                  : list.published
                  ? '#f7e7b5'
                  : '#F0E9D2',
              color: 'black',
            }}
            key={list._id}
            id="user-list"
            expanded={
              store.currentList && store.currentList._id === list._id
                ? expanded === 'panel'
                : false
            }
            onChange={handleChange('panel', list._id)}
          >
            <AccordionSummary
              style={{ display: 'flex', alignItems: 'flex-end',backgroundColor:' #595959', borderRadius:'5px' }}
              expandIcon={
                <KeyboardDoubleArrowDownIcon
                  style={{ marginBottom: '1rem', fontSize: '24pt' }}
                />
              }
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {list.published ? (
                <PublishedCard key={list._id} List={list} selected={false} />
              ) : (
                ''
              )}
            </AccordionSummary>
            <AccordionDetails style={{backgroundColor:' #595959' }}>
              {list.published ? (
                <PublishedArea
                  key={list._id}
                  userName={list.owner}
                  id={list._id}
                />
              ) : (
                ''
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    );
  }

  return <div className="list-area">{ListArea}</div>;
};
