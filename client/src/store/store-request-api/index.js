/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.

*/

import axios from 'axios';
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createPlaylist = (
  newListName,
  newSongs,
  email,
  newComments,
  Username
) => {
  return api.post(`/playlist/`, {
    // SPECIFY THE PAYLOAD
    name: newListName,
    ownerEmail: email,
    owner: Username,
    date: new Date(),
    lastEdit: new Date(),
    published: false,
    publishedDate: '-1',
    listens: 0,
    likes: 0,
    dislikes: 0,
    comments: newComments,
    songs: newSongs,
  });
};
export const deletePlaylistById = (id) => api.delete(`/playlist/${id}`);
export const getPlaylistById = (id) => api.get(`/playlist/${id}`);
export const getPlaylists = () => api.get(`/playlists/`);
export const updatePlaylistNameById = (id, playlist) => {
  return api.put(`/playlist/Name/${id}`, {
    // SPECIFY THE PAYLOAD
    playlist: playlist,
  });
};
export const updatePlaylistById = (id, playlist) => {
  return api.put(`/playlist/${id}`, {
    // SPECIFY THE PAYLOAD
    playlist: playlist,
  });
};

/// Published
export const getPublishedPlaylists = () => api.get(`/PublishedPlaylists/`);
export const getPublishedPlaylistById = (id) =>
  api.get(`/PublishedPlaylists/${id}`);
export const updatePublishedPlaylistComments = (id, playlist) => {
  return api.put(`/PublishedPlaylistsComments/${id}`, {
    // SPECIFY THE PAYLOAD
    playlist: playlist,
  });
};
export const updatePublishedPlaylistListens = (id, playlist) => {
  return api.put(`/PublishedPlaylistsListens/${id}`, {
    // SPECIFY THE PAYLOAD
    playlist: playlist,
  });
};
export const updatePublishedPlaylistByLike = (id, playlist) => {
  return api.put(`/PublishedPlaylistsLikes/${id}`, {
    // SPECIFY THE PAYLOAD
    playlist: playlist,
  });
};
export const updatePublishedPlaylistByDislike = (id, playlist) => {
  return api.put(`/PublishedPlaylistsDislikes/${id}`, {
    // SPECIFY THE PAYLOAD
    playlist: playlist,
  });
};

const apis = {
  createPlaylist,
  deletePlaylistById,
  getPlaylistById,
  getPlaylists,
  updatePlaylistById,
  getPublishedPlaylists,
  getPublishedPlaylistById,
  updatePublishedPlaylistComments,
  updatePublishedPlaylistByLike,
  updatePublishedPlaylistByDislike,
  updatePlaylistNameById,
  updatePublishedPlaylistListens,
};

export default apis;
