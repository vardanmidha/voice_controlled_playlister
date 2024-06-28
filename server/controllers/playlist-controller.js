const Playlist = require('../models/playlist-model')
const User = require('../models/user-model');
const auth = require('../auth');


createPlaylist = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    let body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }


    let playlist = new Playlist(body);
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }
    /// Checking if Same name exists
    let name=playlist.name;
    let counter=0;
      while(true){
        const list= await Playlist.findOne({ownerEmail: playlist.ownerEmail, name:playlist.name})
        if(list)playlist.name=name+counter++;
        else break;
     }
    User.findOne({ _id: req.userId }, (err, user) => {
        if (playlist.ownerEmail === user.email) {
        user
            .save()
            .then(() => {
                playlist
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            playlist: playlist
                        })
                    })
                    .catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Playlist Not Created!'
                        })
                    })
            });
        }else{
            console.log("incorrect ownerEmail!");
            return res.status(400).json({ 
                errorMessage: "User E-mail Does not  Match" 
            });
        }
    })
}

deletePlaylist = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    Playlist.findById({ _id: req.params.id }, (err, playlist) => {
        list= JSON.stringify(playlist);
        if (err) {
            return res.status(404).json({
                errorMessage: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            User.findOne({ email: list.ownerEmail }, (err, user) => {
                if (user._id == req.userId) {
                    user
                        .save()
                        .then(() => {
                            Playlist.findOneAndDelete({ _id: req.params.id }, () => {
                                return res.status(200).json({success:true, playlist:Playlist});
        
                            }).catch(err => console.log(err))
                        });
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ 
                        errorMessage: "authentication error" 
                    });
                }
            });
        }
        asyncFindUser(playlist);
    })
}
getPlaylistById = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    await Playlist.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err , errorMessage:"Playlist Does Not Exists"});
        }
        if (!list) {
            return res
                .status(404)
                .json({ success: false, error: 'lists not found' })
        }
        // DOES THIS LIST BELONG TO THIS USER?
        else{
            User.findOne({ email: list.ownerEmail }, (err, user) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err , errorMessage:"Playlist Does Not Exists"});
                }
                if (user._id == req.userId) {
                    console.log("correct user!");
                    return res.status(200).json({ success: true, playlist: list })
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ success: false, description: "authentication error", errorMessage:"Authentication Error" });
                }
            });
        }
    }).catch(err => console.log(err))
    
}

getPlaylists = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    await User.findOne({ _id: req.userId }, (err, user) => {
        async function asyncFindList(email) {
            await Playlist.find({ ownerEmail: email }, (err, playlists) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!playlists) {
                    return res
                        .status(404)
                        .json({ success: false, error: 'Playlists not found' })
                }
                else {
                    let fields = [];
                    for (let key in playlists) {
                        let list = playlists[key];
                        let field = {
                            _id: list._id,
                            name: list.name,
                            owner:list.owner,
                            date:list.date,
                            published:list.published,
                            publishedDate:list.publishedDate,
                            listens:list.listens,
                            likes:list.likes,
                            dislikes:list.dislikes,
                            lastEdit:list.lastEdit,
                        };
                        fields.push(field);
                    }
                    return res.status(200).json({ success: true, playlists: fields })
                }
            }).catch(err => console.log(err))
        }
        asyncFindList(user.email);
    }).catch(err => console.log(err));
}

updatePlaylistNameById= async(req,res)=>{
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    Playlist.findOne({ownerEmail: body.playlist.ownerEmail, name:body.playlist.name},(err,list)=>{
        if(err){
            return  res.status(400).json({ success: false, error:err ,  errorMessage:"omggg"});
        }
        if(!list){
            Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
                if (err) {
                    return res.status(404).json({
                        err,
                        message: 'Playlist not found!',
                    })
                }
                // DOES THIS LIST BELONG TO THIS USER?
                async function asyncFindUser(list) {
                    await User.findOne({ email: list.ownerEmail }, (err, user) => {
                        if (user._id == req.userId) {
                            list.lastEdit= new Date();
                            list.name = body.playlist.name;
                            list.songs = body.playlist.songs;
                            list.ownerEmail=body.playlist.ownerEmail;
                            list.owner=body.playlist.owner;
                            list.date=body.playlist.date;
                            if(!list.published&&body.playlist.published){list.publishedDate= new Date()}
                            else{list.publishedDate=body.playlist.publishedDate}
                            list.published=body.playlist.published;
                            list.listens=body.playlist.listens;
                            list.likes=body.playlist.likes;
                            list.dislikes=body.playlist.dislikes;
                            list.comments=body.playlist.comments;
                            list
                                .save()
                                .then(() => {
                                    console.log("SUCCESS!!!");
                                    return res.status(200).json({
                                        success: true,
                                        id: list._id,
                                        list:list,
                                        message: 'Playlist updated!',
                                    })
                                })
                                .catch(error => {
                                    console.log("FAILURE: " + JSON.stringify(error));
                                    return res.status(404).json({
                                        error,
                                        message: 'Playlist not updated!',
                                    })
                                })
                        }
                        else {
                            console.log("incorrect user!");
                            return res.status(400).json({ success: false, description: "authentication error" });
                        }
                    });
                }
                asyncFindUser(playlist);
            })  
        }
        if(list){
        return res.status(400).json({ success: false, description: "Renaming error", errorMessage:"Playlist Name Already Exists" });
        }
    })

   
}


updatePlaylistById = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }
        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                if (user._id == req.userId) {
                    list.lastEdit= new Date();
                    list.name = body.playlist.name;
                    list.songs = body.playlist.songs;
                    list.ownerEmail=body.playlist.ownerEmail;
                    list.owner=body.playlist.owner;
                    list.date=body.playlist.date;
                    if(!list.published&&body.playlist.published){list.publishedDate= new Date()}
                    else{list.publishedDate=body.playlist.publishedDate}
                    list.published=body.playlist.published;
                    list.listens=body.playlist.listens;
                    list.likes=body.playlist.likes;
                    list.dislikes=body.playlist.dislikes;
                    list.comments=body.playlist.comments;
                    list
                        .save()
                        .then(() => {
                            console.log("SUCCESS!!!");
                            return res.status(200).json({
                                success: true,
                                id: list._id,
                                list:list,
                                message: 'Playlist updated!',
                            })
                        })
                        .catch(error => {
                            console.log("FAILURE: " + JSON.stringify(error));
                            return res.status(404).json({
                                error,
                                message: 'Playlist not updated!',
                            })
                        })
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ success: false, description: "authentication error" });
                }
            });
        }
        asyncFindUser(playlist);
    })
}

///// Published Methods
getPublishedPlaylists = async (req, res) => {
    async function asyncFindLists() {
        await Playlist.find({ published: true }, (err, playlists) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!playlists) {
                return res
                    .status(404)
                    .json({ success: false, error: 'Playlists not found' })
            }
            else {
                let fields = [];
                for (let key in playlists) {
                    let list = playlists[key];
                    let field = {
                        _id: list._id,
                        name: list.name,
                        owner:list.owner,
                        date:list.date,
                        published:list.published,
                        publishedDate:list.publishedDate,
                        listens:list.listens,
                        likes:list.likes,
                        dislikes:list.dislikes,
                        lastEdit:list.lastEdit,
                    };
                    fields.push(field);
                }
                return res.status(200).json({ success: true, playlists: fields})
            }
        }).catch(err => console.log(err))
    }
    asyncFindLists();
}

getPublishedPlaylistById = async (req, res) => {
    await Playlist.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err , errorMessage:"Playlist Does Not Exists"});
        }
        if (!list) {
            return res
                .status(404)
                .json({ success: false, error: 'Playlist Not Found' })
        }
        // IS THIS LIST PUBLISHED?
        if(list.published){
            return res.status(200).json({ success: true, playlist: list})
        }else{
            return res
            .status(404)
            .json({ success: false, error: 'Playlist Is Not Published' })
        }
    }).catch(err => console.log(err))
}

updatePublishedPlaylistComments = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
       
         await Playlist.findOne({ _id: req.params.id }, (err,list) => {
                if (err) {
                    return res.status(404).json({
                        err,
                        message: 'Playlist not found!',
                    })
                }
                if(list.published){
                            /// Cannot be changed by not logged in user
                            list.name = list.name;
                            list.songs = list.songs;
                            list.ownerEmail=list.ownerEmail;
                            list.owner=list.owner;
                            list.date=list.date;
                            list.published=list.published;
                            list.publishedDate=list.publishedDate;
                            list.lastEdit= list.lastEdit;
                            /// Allowed to Change
                            list.listens=body.playlist.listens;
                            list.comments=body.playlist.comments;
                            list
                                .save()
                                .then(() => {
                                    
                                    return res.status(200).json({
                                        success: true,
                                        id: list._id,
                                        list:list,
                                        message: 'Playlist updated!',
                                    })
                                })
                                .catch(error => {
                                    console.log("FAILURE: " + JSON.stringify(error));
                                    return res.status(404).json({
                                        error,
                                        message: 'Playlist not updated!',
                                    })
                                })
                }else{
                    return res
                    .status(404)
                    .json({ success: false, error: 'Playlist Is Not Published' })
                }
                    }).catch(err => console.log(err))
}
/// Update Listens 
updatePublishedPlaylistListens = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
       
         await Playlist.findOne({ _id: req.params.id }, (err,list) => {
                if (err) {
                    return res.status(404).json({
                        err,
                        message: 'Playlist not found!',
                    })
                }
                if(list.published){
                            /// Cannot be changed by not logged in user
                            list.name = list.name;
                            list.songs = list.songs;
                            list.ownerEmail=list.ownerEmail;
                            list.owner=list.owner;
                            list.date=list.date;
                            list.published=list.published;
                            list.publishedDate=list.publishedDate;
                            list.lastEdit= list.lastEdit;
                            list.comments=list.comments;
                            /// Allowed to Change
                            list.listens=body.playlist.listens;
                            
                            list
                                .save()
                                .then(() => {
                                    
                                    return res.status(200).json({
                                        success: true,
                                        id: list._id,
                                        list:list,
                                        message: 'Playlist updated!',
                                    })
                                })
                                .catch(error => {
                                    console.log("FAILURE: " + JSON.stringify(error));
                                    return res.status(404).json({
                                        error,
                                        message: 'Playlist not updated!',
                                    })
                                })
                }else{
                    return res
                    .status(404)
                    .json({ success: false, error: 'Playlist Is Not Published' })
                }
                    }).catch(err => console.log(err))
}

updatePublishedPlaylistByLike = async (req, res) => {
    console.log("this method is called");
    if(auth.verifyUser(req) === null){
        console.log("nahh");
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
   await User.findOne({ _id: req.userId }, (err, user) => {
            Playlist.findOne({ _id: req.params.id }, (err,list) => {
                if (err) {
                    return res.status(404).json({
                        err,
                        message: 'Playlist not found!',
                    })
                }
                if(list.published){
                            /// Cannot be changed by not logged in user
                            list.name = list.name;
                            list.songs = list.songs;
                            list.ownerEmail=list.ownerEmail;
                            list.owner=list.owner;
                            list.date=list.date;
                            list.published=list.published;
                            list.publishedDate=list.publishedDate;
                            list.lastEdit= list.lastEdit;
                            list.comments=list.comments;
                            list.dislikes=list.dislikes;
                            list.listens=list.listens;
                            /// Allowed to Change
                            /// Check if user Liked/Disliked this playlist before
                           
                            const i = user.interactions.findIndex(e => JSON.stringify(e.playlist) === JSON.stringify(list._id));
                            if (i > -1) {
                                console.log("heree");
                                let interaction = user.interactions[i].interaction;
                                /// Liked before
                                if(interaction===1){
                                    /// Liking Again undoes the action , remove the interaction from user.
                                    list.likes--;
                                    user.interactions.splice(i,1);
                                }
                                /// Disliked Before
                                if(interaction==-1){
                                    list.likes=body.playlist.likes;
                                    list.dislikes--;
                                    /// Update the interaction to a Like.
                                    user.interactions[i].interaction=1;
                                }
                            
                            }
                            /// No interaction taken by this user to like or dislike
                            else{
                                list.likes=body.playlist.likes;
                                /// Add that this playlist has been liked by this user.
                                user.interactions.push({
                                    playlist:list._id,
                                    interaction:1});
                                }

                            user
                            .save()
                            .then(() => {
                                console.log(" user interaction saved");
                            });
                            list
                                .save()
                                .then(() => {
                                    console.log("Added Like");
                                    return res.status(200).json({
                                        success: true,
                                        id: list._id,
                                        list:list,
                                        message: 'Playlist updated!',
                                    })
                                })
                                .catch(error => {
                                    console.log("FAILURE: " + JSON.stringify(error));
                                    return res.status(404).json({
                                        error,
                                        message: 'Playlist not updated!',
                                    })
                                })
                    }else{
                    return res
                    .status(404)
                    .json({ success: false, error: 'Playlist Is Not Published' })
        }}).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

updatePublishedPlaylistByDislike = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    await User.findOne({ _id: req.userId }, (err, user) => {
        async function asyncFindList(user) {
            await Playlist.findOne({ _id: req.params.id }, (err,list) => {
                if (err) {
                    return res.status(404).json({
                        err,
                        message: 'Playlist not found!',
                    })
                }
                if(list.published){
                            /// Cannot be changed by not logged in user
                            list.name = list.name;
                            list.songs = list.songs;
                            list.ownerEmail=list.ownerEmail;
                            list.owner=list.owner;
                            list.date=list.date;
                            list.published=list.published;
                            list.publishedDate=list.publishedDate;
                            list.lastEdit= list.lastEdit;
                            list.comments=list.comments;
                            list.likes=list.likes;
                            list.listens=list.listens;
                            /// Allowed to Change
    
                            /// Check if user Liked/Disliked this playlist before
                            const i = user.interactions.findIndex(e => JSON.stringify(e.playlist) === JSON.stringify(list._id));
                            if (i > -1) {
                                let interaction = user.interactions[i].interaction;
                                /// Liked before
                                if(interaction===1){
                                    list.likes--;
                                    list.dislikes=body.playlist.dislikes;
                                    /// Update the interaction to a Dislike.
                                    user.interactions[i].interaction=-1;
                                }
                                /// Disliked Before
                                if(interaction===-1){
                                /// Disliking Again undoes the action , remove the interaction from user.
                                    list.dislikes--;
                                    user.interactions.splice(i,1);
                                }
                            
                            }
                            /// No interaction taken by this user to like or dislike
                            else{
                                list.dislikes=body.playlist.dislikes;
                                /// Add that this playlist has been liked by this user.
                                user.interactions.push({
                                    playlist:list._id,
                                    interaction:-1});
                                }
                            
                            user
                            .save()
                            .then(() => {
                             console.log(" user interaction saved");
                            });

                            list
                                .save()
                                .then(() => {
                                    console.log("Added Like");
                                    return res.status(200).json({
                                        success: true,
                                        id: list._id,
                                        list:list,
                                        message: 'Playlist updated!',
                                    })
                                })
                                .catch(error => {
                                    console.log("FAILURE: " + JSON.stringify(error));
                                    return res.status(404).json({
                                        error,
                                        message: 'Playlist not updated!',
                                    })
                                })
                }else{
                    return res
                    .status(404)
                    .json({ success: false, error: 'Playlist Is Not Published' })
                }
                    }).catch(err => console.log(err))
        
        }
        asyncFindList(user);
    }).catch(err => console.log(err))
}


module.exports = {
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getPublishedPlaylists,
    getPlaylists,
    updatePlaylistById,
    getPublishedPlaylistById,
    updatePublishedPlaylistComments,
    updatePublishedPlaylistByLike,
    updatePublishedPlaylistByDislike,
    updatePlaylistNameById,
    updatePublishedPlaylistListens,
    
}