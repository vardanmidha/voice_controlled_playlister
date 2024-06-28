
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()
const auth = require('../auth')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

router.post('/playlist', auth.verify, PlaylistController.createPlaylist)
router.delete('/playlist/:id', auth.verify, PlaylistController.deletePlaylist)
router.get('/playlist/:id', auth.verify, PlaylistController.getPlaylistById)
router.get('/playlists', auth.verify, PlaylistController.getPlaylists)
router.put('/playlist/Name/:id', auth.verify, PlaylistController.updatePlaylistNameById)
router.put('/playlist/:id', auth.verify, PlaylistController.updatePlaylistById)
/// Published
router.get('/PublishedPlaylists/', PlaylistController.getPublishedPlaylists)
router.get('/PublishedPlaylists/:id', PlaylistController.getPublishedPlaylistById)
router.put('/PublishedPlaylistsComments/:id',auth.verify, PlaylistController.updatePublishedPlaylistComments)
router.put('/PublishedPlaylistsListens/:id', PlaylistController.updatePublishedPlaylistListens)
router.put('/PublishedPlaylistsLikes/:id', auth.verify,PlaylistController.updatePublishedPlaylistByLike)
router.put('/PublishedPlaylistsDislikes/:id',auth.verify, PlaylistController.updatePublishedPlaylistByDislike)


module.exports = router