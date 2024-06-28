import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jsTPS from '../common/jsTPS';
import api from './store-request-api';
import CreateSong_Transaction from '../transactions/CreateSong_Transaction';
import MoveSong_Transaction from '../transactions/MoveSong_Transaction';
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction';
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction';
import AuthContext from '../auth';

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
  CHANGE_LIST_NAME: 'CHANGE_LIST_NAME',
  CREATE_NEW_LIST: 'CREATE_NEW_LIST',
  LOAD_PLAYLISTS: 'LOAD_PLAYLISTS',
  LOAD_PUBLISHED_PLAYLISTS: 'LOAD_PUBLISHED_PLAYLISTS',
  MARK_LIST_FOR_DELETION: 'MARK_LIST_FOR_DELETION',
  SET_CURRENT_LIST: 'SET_CURRENT_LIST',
  SET_LIST_NAME_EDIT_ACTIVE: 'SET_LIST_NAME_EDIT_ACTIVE',
  EDIT_SONG: 'EDIT_SONG',
  REMOVE_SONG: 'REMOVE_SONG',
  ACCESS_ERROR: 'ACCESS_ERROR',
  HIDE_MODALS: 'HIDE_MODALS',
  SET_SEARCH: 'SET_SEARCH',
  SET_PLAY: 'SET_PLAY',
  SET_SCREEN: 'SET_SCREEN',
  SET_HOME_SCREEN: 'SET_HOME_SCREEN',
};

const tps = new jsTPS();
const CurrentModal = {
  NONE: 'NONE',
  DELETE_LIST: 'DELETE_LIST',
  EDIT_SONG: 'EDIT_SONG',
  REMOVE_SONG: 'REMOVE_SONG',
  ACCESS_ERROR: 'ACCESS_ERROR',
};

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
  const { auth } = useContext(AuthContext);

  // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
  const [store, setStore] = useState({
    currentModal: CurrentModal.NONE,
    playlists: [],
    PublishedPlaylists: [],
    currentList: null,
    currentSongIndex: -1,
    currentSong: null,
    listNameActive: false,
    listIdMarkedForDeletion: null,
    listMarkedForDeletion: null,
    message: '',
    search: null,
    sortMethod: null,
    playIndex: 0,
    currentScreen: '',
  });
  const history = useHistory();
  // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE

  // HERE'S THE DATA STORE'S REDUCER, IT MUST
  // HANDLE EVERY TYPE OF STATE CHANGE
  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case GlobalStoreActionType.CHANGE_LIST_NAME: {
        return setStore({
          currentModal: CurrentModal.NONE,
          playlists: payload.playlists,
          PublishedPlaylists: store.PublishedPlaylists,
          currentList: payload.playlist,
          currentSongIndex: -1,
          currentSong: null,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          message: store.message,
          search: store.search,
          sortMethod: store.sortMethod,
          playIndex: store.playIndex,
          currentScreen: store.currentScreen,
        });
      }
      case GlobalStoreActionType.CREATE_NEW_LIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          playlists: store.playlists,
          PublishedPlaylists: store.PublishedPlaylists,
          currentList: payload,
          currentSongIndex: -1,
          currentSong: null,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          message: store.message,
          search: null,
          sortMethod: store.sortMethod,
          playIndex: store.playIndex,
          currentScreen: store.currentScreen,
        });
      }
      case GlobalStoreActionType.LOAD_PLAYLISTS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          playlists: payload,
          PublishedPlaylists: store.PublishedPlaylists,
          currentList: store.currentList,
          currentSongIndex: -1,
          currentSong: null,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          message: store.message,
          search: store.search,
          sortMethod: store.sortMethod,
          playIndex: store.playIndex,
          currentScreen: store.currentScreen,
        });
      }
      case GlobalStoreActionType.LOAD_PUBLISHED_PLAYLISTS: {
        return setStore({
          currentModal: CurrentModal,
          playlists: store.playlists,
          PublishedPlaylists: payload,
          currentList: store.currentList,
          currentSongIndex: -1,
          currentSong: null,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          message: store.message,
          search: store.search,
          sortMethod: store.sortMethod,
          playIndex: store.playIndex,
          currentScreen: store.currentScreen,
        });
      }
      case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
        return setStore({
          currentModal: CurrentModal.DELETE_LIST,
          playlists: store.playlists,
          PublishedPlaylists: store.PublishedPlaylists,
          currentList: store.currentList,
          currentSongIndex: -1,
          currentSong: null,
          listNameActive: false,
          listIdMarkedForDeletion: payload.id,
          listMarkedForDeletion: payload.playlist,
          message: store.message,
          search: store.search,
          sortMethod: store.sortMethod,
          playIndex: store.playIndex,
          currentScreen: store.currentScreen,
        });
      }
      case GlobalStoreActionType.SET_CURRENT_LIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          playlists: store.playlists,
          PublishedPlaylists: store.PublishedPlaylists,
          currentList: payload,
          currentSongIndex: -1,
          currentSong: null,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          message: store.message,
          search: store.search,
          sortMethod: store.sortMethod,
          playIndex: 0,
          currentScreen: store.currentScreen,
        });
      }
      case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
        return setStore({
          currentModal: CurrentModal.NONE,
          playlists: store.playlists,
          PublishedPlaylists: store.PublishedPlaylists,
          currentList: payload,
          currentSongIndex: -1,
          currentSong: null,
          listNameActive: true,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          message: store.message,
          search: store.search,
          sortMethod: store.sortMethod,
          playIndex: store.playIndex,
          currentScreen: store.currentScreen,
        });
      }
      case GlobalStoreActionType.EDIT_SONG: {
        return setStore({
          currentModal: CurrentModal.EDIT_SONG,
          playlists: store.playlists,
          PublishedPlaylists: store.PublishedPlaylists,
          currentList: store.currentList,
          currentSongIndex: payload.currentSongIndex,
          currentSong: payload.currentSong,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          message: store.message,
          search: store.search,
          sortMethod: store.sortMethod,
          playIndex: store.playIndex,
          currentScreen: store.currentScreen,
        });
      }
      case GlobalStoreActionType.REMOVE_SONG: {
        return setStore({
          currentModal: CurrentModal.REMOVE_SONG,
          playlists: store.playlists,
          PublishedPlaylists: store.PublishedPlaylists,
          currentList: store.currentList,
          currentSongIndex: payload.currentSongIndex,
          currentSong: payload.currentSong,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          message: store.message,
          search: store.search,
          sortMethod: store.sortMethod,
          playIndex: store.playIndex,
          currentScreen: store.currentScreen,
        });
      }
      case GlobalStoreActionType.HIDE_MODALS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          playlists: store.playlists,
          PublishedPlaylists: store.PublishedPlaylists,
          currentList: store.currentList,
          currentSongIndex: -1,
          currentSong: null,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          message: store.message,
          search: store.search,
          sortMethod: store.sortMethod,
          playIndex: store.playIndex,
          currentScreen: store.currentScreen,
        });
      }
      case GlobalStoreActionType.ACCESS_ERROR: {
        return setStore({
          currentModal: CurrentModal.ACCESS_ERROR,
          playlists: store.playlists,
          PublishedPlaylists: store.PublishedPlaylists,
          currentList: store.currentList,
          currentSongIndex: store.currentSongIndex,
          currentSong: store.currentSong,
          listNameActive: store.listNameActive,
          listIdMarkedForDeletion: store.listIdMarkedForDeletion,
          listMarkedForDeletion: store.listIdMarkedForDeletion,
          message: payload,
          search: store.search,
          sortMethod: store.sortMethod,
          playIndex: store.playIndex,
          currentScreen: store.currentScreen,
        });
      }
      case GlobalStoreActionType.SET_SEARCH: {
        return setStore({
          currentModal: CurrentModal.NONE,
          playlists: store.playlists,
          PublishedPlaylists: store.PublishedPlaylists,
          currentList: store.currentList,
          currentSongIndex: store.currentSongIndex,
          currentSong: store.currentSong,
          listNameActive: store.listNameActive,
          listIdMarkedForDeletion: store.listIdMarkedForDeletion,
          listMarkedForDeletion: store.markListForDeletion,
          message: store.message,
          search: payload,
          sortMethod: store.sortMethod,
          playIndex: store.playIndex,
          currentScreen: store.currentScreen,
        });
      }
      case GlobalStoreActionType.SET_SORT: {
        return setStore({
          currentModal: CurrentModal.NONE,
          playlists: store.playlists,
          PublishedPlaylists: store.PublishedPlaylists,
          currentList: store.currentList,
          currentSongIndex: store.currentSongIndex,
          currentSong: store.currentSong,
          listNameActive: store.listNameActive,
          listIdMarkedForDeletion: store.listIdMarkedForDeletion,
          listMarkedForDeletion: store.markListForDeletion,
          message: store.message,
          search: store.search,
          sortMethod: payload,
          playIndex: store.playIndex,
          currentScreen: store.currentScreen,
        });
      }
      case GlobalStoreActionType.SET_PLAY: {
        return setStore({
          currentModal: CurrentModal.NONE,
          playlists: store.playlists,
          PublishedPlaylists: store.PublishedPlaylists,
          currentList: store.currentList,
          currentSongIndex: store.currentSongIndex,
          currentSong: store.currentSong,
          listNameActive: store.listNameActive,
          listIdMarkedForDeletion: store.listIdMarkedForDeletion,
          listMarkedForDeletion: store.markListForDeletion,
          message: store.message,
          search: store.search,
          sortMethod: store.sortMethod,
          playIndex: payload,
          currentScreen: store.currentScreen,
        });
      }
      case GlobalStoreActionType.SET_SCREEN: {
        return setStore({
          currentModal: CurrentModal.NONE,
          playlists: store.playlists,
          PublishedPlaylists: store.PublishedPlaylists,
          currentList: null,
          currentSongIndex: store.currentSongIndex,
          currentSong: store.currentSong,
          listNameActive: store.listNameActive,
          listIdMarkedForDeletion: store.listIdMarkedForDeletion,
          listMarkedForDeletion: store.markListForDeletion,
          message: store.message,
          search: null,
          sortMethod: store.sortMethod,
          playIndex: store.playIndex,
          currentScreen: payload,
        });
      }
      case GlobalStoreActionType.SET_HOME_SCREEN: {
        return setStore({
          currentModal: CurrentModal.NONE,
          playlists: payload.playlists,
          PublishedPlaylists: store.PublishedPlaylists,
          currentList: null,
          currentSongIndex: store.currentSongIndex,
          currentSong: store.currentSong,
          listNameActive: store.listNameActive,
          listIdMarkedForDeletion: store.listIdMarkedForDeletion,
          listMarkedForDeletion: store.markListForDeletion,
          message: store.message,
          search: null,
          sortMethod: store.sortMethod,
          playIndex: store.playIndex,
          currentScreen: payload.screen,
        });
      }
      default:
        return store;
    }
  };

  /// Screen
  store.setScreen = (screen) => {
    storeReducer({
      type: GlobalStoreActionType.SET_SCREEN,
      payload: screen,
    });
  };
  store.setHomeScreen = (screen) => {
    async function asyncLoadPlaylists() {
      const response = await api.getPlaylists();
      if (response.data.success) {
        let playlists = response.data.playlists;
        storeReducer({
          type: GlobalStoreActionType.SET_HOME_SCREEN,
          payload: {
            screen: screen,
            playlist: playlists,
          },
        });
      } else {
        console.log('API FAILED TO GET PLAYLISTS');
      }
    }
    asyncLoadPlaylists();
  };

  /// Play
  store.setPlay = (playIndex) => {
    storeReducer({
      type: GlobalStoreActionType.SET_PLAY,
      payload: playIndex,
    });
  };

  /// Searching
  store.setSearch = (search) => {
    storeReducer({
      type: GlobalStoreActionType.SET_SEARCH,
      payload: search,
    });
  };
  /// Sorting
  store.setSort = (sortMethod) => {
    storeReducer({
      type: GlobalStoreActionType.SET_SORT,
      payload: sortMethod,
    });
  };

  store.changeListName = function (id, newName) {
    async function asyncChangeListName(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        playlist.name = newName;
        async function updateList(playlist) {
          try {
            response = await api.updatePlaylistNameById(playlist._id, playlist);
            if (response.data.success) {
              let newCurrentList = response.data.list;
              async function getPlaylists() {
                response = await api.getPlaylists();
                if (response.data.success) {
                  let NewPlaylists = response.data.playlists;
                  storeReducer({
                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                    payload: {
                      playlists: NewPlaylists,
                      playlist: newCurrentList,
                    },
                  });
                }
              }
              getPlaylists();
            }
          } catch (error) {
            storeReducer({
              type: GlobalStoreActionType.ACCESS_ERROR,
              payload: 'Playlist With Same Name Already Exists',
            });
          }
        }
        updateList(playlist);
      }
    }
    asyncChangeListName(id);
  };

  store.setIsListNameEditActive = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
      payload: null,
    });
  };

  store.clearTransaction = function () {
    tps.clearAllTransactions();
  };

  // THIS FUNCTION CREATES A NEW LIST
  store.createNewList = async function () {
    let newListName = 'Untitled';
    const response = await api.createPlaylist(
      newListName,
      [],
      auth.user.email,
      [],
      auth.user.userName
    );
    console.log('createNewList response: ' + response);
    if (response.status === 201) {
      tps.clearAllTransactions();
      let newList = response.data.playlist;
      storeReducer({
        type: GlobalStoreActionType.CREATE_NEW_LIST,
        payload: newList,
      });
    } else {
      console.log('API FAILED TO CREATE A NEW LIST');
    }
  };
  store.duplicate = async function (id, published) {
    let response = '';
    if (published) {
      response = await api.getPublishedPlaylistById(id);
    } else {
      response = await api.getPlaylistById(id);
    }
    if (response.status === 200) {
      let playlist = response.data.playlist;
      const response2 = await api.createPlaylist(
        playlist.name,
        playlist.songs,
        auth.user.email,
        [],
        auth.user.userName
      );
      if (response2.status === 201) {
        tps.clearAllTransactions();
        storeReducer({
          type: GlobalStoreActionType.ACCESS_ERROR,
          payload: 'Playlist Successfully Duplicated To Home',
        });
      } else {
        console.log('API FAILED TO CREATE A NEW LIST');
      }
    } else {
      console.log('API FAILED TO DUPLICATE TRYING TO GET LIST ');
    }
  };

  store.LoadPlaylists = function () {
    async function asyncLoadPlaylists() {
      const response = await api.getPlaylists();
      if (response.data.success) {
        let playlists = response.data.playlists;
        storeReducer({
          type: GlobalStoreActionType.LOAD_PLAYLISTS,
          payload: playlists,
        });
      } else {
        console.log('API FAILED TO GET PLAYLISTS');
      }
    }
    asyncLoadPlaylists();
  };
  store.LoadPublishedPlaylists = function () {
    async function asyncLoadPublishedPlaylists() {
      const response = await api.getPublishedPlaylists();
      if (response.data.success) {
        let playlists = response.data.playlists;
        storeReducer({
          type: GlobalStoreActionType.LOAD_PUBLISHED_PLAYLISTS,
          payload: playlists,
        });
      } else {
        console.log('API FAILED TO GET PUBLISHED PLAYLISTS');
      }
    }
    asyncLoadPublishedPlaylists();
  };
  store.AddComment = function (comment) {
    async function asyncUpdateCurrentList() {
      store.currentList.comments.push({
        userName: auth.user.userName,
        comment: comment,
        initials: auth.getUserInitials(),
      });
      const response = await api.updatePublishedPlaylistComments(
        store.currentList._id,
        store.currentList
      );
      if (response.data.success) {
        storeReducer({
          type: GlobalStoreActionType.SET_CURRENT_LIST,
          payload: store.currentList,
        });
      }
    }
    asyncUpdateCurrentList();
  };

  store.scrollUp = (element) => {
    let elem = document.getElementById(element);
    elem.scrollTop = elem.scrollHeight;
  };

  store.AddListen = function (id) {
    async function asyncUpdatePublishedList(id) {
      let response = await api.getPublishedPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        playlist.listens++;
        response = await api.updatePublishedPlaylistListens(
          playlist._id,
          playlist
        );
        if (response.data.success) {
          if (store.currentScreen === 'HomeScreen') store.LoadPlaylists();
          else {
            store.LoadPublishedPlaylists();
          }
        }
      }
    }
    asyncUpdatePublishedList(id);
  };

  store.AddLike = function (id) {
    async function asyncUpdatePublishedList(id) {
      let response = await api.getPublishedPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        playlist.likes++;
        response = await api.updatePublishedPlaylistByLike(
          playlist._id,
          playlist
        );
        if (response.data.success) {
          if (store.currentScreen === 'HomeScreen') store.LoadPlaylists();
          else {
            store.LoadPublishedPlaylists();
          }
        }
      }
    }
    asyncUpdatePublishedList(id);
  };

  store.AddDislike = function (id) {
    async function asyncUpdatePublishedList(id) {
      let response = await api.getPublishedPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        playlist.dislikes++;
        response = await api.updatePublishedPlaylistByDislike(
          playlist._id,
          playlist
        );
        if (response.data.success) {
          if (store.currentScreen === 'HomeScreen') store.LoadPlaylists();
          else {
            store.LoadPublishedPlaylists();
          }
        }
      }
    }
    asyncUpdatePublishedList(id);
  };

  store.publishList = function (id) {
    let list = store.currentList;
    list.published = true;
    async function asyncPublishPlaylist(id, list) {
      const response = await api.updatePlaylistById(id, list);
      if (response.data.success) {
        store.LoadPlaylists();
        storeReducer({
          type: GlobalStoreActionType.SET_CURRENT_LIST,
          payload: store.currentList,
        });
      } else {
        console.log('API FAILED TO UPDATE Playlist');
      }
    }
    asyncPublishPlaylist(id, list);
  };

  store.setPublishedList = function (id) {
    async function asyncSetPublishedList(id) {
      let response = await api.getPublishedPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        if (response.data.success) {
          storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: playlist,
          });
        }
      }
    }
    asyncSetPublishedList(id);
  };

  store.updateCurrentList = function () {
    async function asyncUpdateCurrentList() {
      const response = await api.updatePlaylistById(
        store.currentList._id,
        store.currentList
      );
      if (response.data.success) {
        storeReducer({
          type: GlobalStoreActionType.SET_CURRENT_LIST,
          payload: response.data.list,
        });
      }
    }
    asyncUpdateCurrentList();
  };

  store.setCurrentList = function (id) {
    async function asyncSetCurrentList(id) {
      try {
        let response = await api.getPlaylistById(id);
        if (response.data.success) {
          let playlist = response.data.playlist;
          if (response.data.success) {
            storeReducer({
              type: GlobalStoreActionType.SET_CURRENT_LIST,
              payload: playlist,
            });
          }
        }
      } catch (error) {
        storeReducer({
          type: GlobalStoreActionType.ACCESS_ERROR,
          payload: 'Access Error',
        });
      }
    }
    asyncSetCurrentList(id);
  };

  store.markListForDeletion = function (id) {
    async function getListToDelete(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        storeReducer({
          type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
          payload: { id: id, playlist: playlist },
        });
      }
    }
    getListToDelete(id);
  };
  store.deleteList = function (id) {
    async function processDelete(id) {
      let response = await api.deletePlaylistById(id);
      if (response.data.success) {
        store.currentList = null;
        if (store.currentScreen === 'HomeScreen') store.LoadPlaylists();
        else store.LoadPublishedPlaylists();
      }
    }
    processDelete(id);
  };
  store.deleteMarkedList = function () {
    store.deleteList(store.listIdMarkedForDeletion);
    store.hideModals();
  };

  store.showEditSongModal = (songIndex, songToEdit) => {
    storeReducer({
      type: GlobalStoreActionType.EDIT_SONG,
      payload: { currentSongIndex: songIndex, currentSong: songToEdit },
    });
  };
  store.showRemoveSongModal = (songIndex, songToRemove) => {
    storeReducer({
      type: GlobalStoreActionType.REMOVE_SONG,
      payload: { currentSongIndex: songIndex, currentSong: songToRemove },
    });
  };
  store.hideModals = () => {
    storeReducer({
      type: GlobalStoreActionType.HIDE_MODALS,
      payload: {},
    });
  };
  store.isDeleteListModalOpen = () => {
    return store.currentModal === CurrentModal.DELETE_LIST;
  };
  store.isEditSongModalOpen = () => {
    return store.currentModal === CurrentModal.EDIT_SONG;
  };
  store.isRemoveSongModalOpen = () => {
    return store.currentModal === CurrentModal.REMOVE_SONG;
  };
  store.isAccessErrorModalOpen = () => {
    return store.currentModal === CurrentModal.ACCESS_ERROR;
  };

  store.getplaylistsize = function () {
    return store.currentList.songs.length;
  };
  store.addNewSong = function () {
    let index = this.getplaylistsize();
    this.addCreateSongTransaction(index, 'Untitled', '?', 'TO-_3tck2tg');
  };
  // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
  // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
  store.createSong = function (index, song) {
    let list = store.currentList;
    list.songs.splice(index, 0, song);
    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };
  // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
  // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
  store.moveSong = function (start, end) {
    let list = store.currentList;

    // WE NEED TO UPDATE THE STATE FOR THE APP
    if (start < end) {
      let temp = list.songs[start];
      for (let i = start; i < end; i++) {
        list.songs[i] = list.songs[i + 1];
      }
      list.songs[end] = temp;
    } else if (start > end) {
      let temp = list.songs[start];
      for (let i = start; i > end; i--) {
        list.songs[i] = list.songs[i - 1];
      }
      list.songs[end] = temp;
    }

    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };
  // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
  // FROM THE CURRENT LIST
  store.removeSong = function (index) {
    let list = store.currentList;
    list.songs.splice(index, 1);

    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };
  // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
  store.updateSong = function (index, songData) {
    let list = store.currentList;
    let song = list.songs[index];
    song.title = songData.title;
    song.artist = songData.artist;
    song.youTubeId = songData.youTubeId;

    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };
  store.addNewSong = () => {
    let playlistsize = store.getplaylistsize();
    store.addCreateSongTransaction(
      playlistsize,
      'Untitled',
      '?',
      'TO-_3tck2tg'
    );
  };
  // THIS FUNCTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
  store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
    // ADD A SONG ITEM AND ITS NUMBER
    let song = {
      title: title,
      artist: artist,
      youTubeId: youTubeId,
    };
    let transaction = new CreateSong_Transaction(store, index, song);
    tps.addTransaction(transaction);
  };
  store.addMoveSongTransaction = function (start, end) {
    let transaction = new MoveSong_Transaction(store, start, end);
    tps.addTransaction(transaction);
  };
  // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
  store.addRemoveSongTransaction = () => {
    let index = store.currentSongIndex;
    let song = store.currentList.songs[index];
    let transaction = new RemoveSong_Transaction(store, index, song);
    tps.addTransaction(transaction);
  };
  store.addUpdateSongTransaction = function (index, newSongData) {
    let song = store.currentList.songs[index];
    let oldSongData = {
      title: song.title,
      artist: song.artist,
      youTubeId: song.youTubeId,
    };
    let transaction = new UpdateSong_Transaction(
      this,
      index,
      oldSongData,
      newSongData
    );
    tps.addTransaction(transaction);
  };

  store.undo = function () {
    tps.undoTransaction();
  };
  store.redo = function () {
    tps.doTransaction();
  };
  store.canAddNewSong = function () {
    return store.currentList !== null;
  };
  store.canUndo = function () {
    return store.currentList !== null && tps.hasTransactionToUndo();
  };
  store.canRedo = function () {
    return store.currentList !== null && tps.hasTransactionToRedo();
  };
  store.canClose = function () {
    return store.currentList !== null;
  };

  //// All of the Sort Methods
  store.SortName = (playlists) => {
    return playlists.sort(function (a, b) {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      return 0;
    });
  };
  store.SortCreationDate = (playlists) => {
    return playlists.sort(function (a, b) {
      const nameA = a.date;
      const nameB = b.date;
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      return 0;
    });
  };
  store.SortLastEdit = (playlists) => {
    return playlists.sort(function (a, b) {
      const nameA = new Date(a.lastEdit);
      const nameB = new Date(b.lastEdit);
      return nameB - nameA;
    });
  };
  store.SortPublishedDate = (playlists) => {
    return playlists.sort(function (a, b) {
      const nameA = new Date(a.publishedDate);
      const nameB = new Date(b.publishedDate);

      return nameA - nameB;
    });
  };
  store.SortMostListens = (playlists) => {
    return playlists.sort(function (a, b) {
      const nameA = a.listens;
      const nameB = b.listens;
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
  };
  store.SortMostLikes = (playlists) => {
    return playlists.sort(function (a, b) {
      const nameA = a.likes;
      const nameB = b.likes;
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
  };
  store.SortMostDislikes = (playlists) => {
    return playlists.sort(function (a, b) {
      const nameA = a.dislikes;
      const nameB = b.dislikes;
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
  };

  return (
    <GlobalStoreContext.Provider
      value={{
        store,
      }}
    >
      {props.children}
    </GlobalStoreContext.Provider>
  );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
