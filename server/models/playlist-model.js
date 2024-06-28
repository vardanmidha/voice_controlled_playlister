const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        owner:{type:String,required:true},
        date: {type:String , required:true},
        lastEdit: {type:String , required:true},
        listens:{type:Number , required:true},
        published:{type:Boolean , required:true},
        publishedDate:{type:String , required:true},
        likes:{type:Number,required:true},
        dislikes:{type:Number,required:true},
        comments:{ type:[{
            comment:String,
            userName:String,
            initials:String,
        }],required:true},

        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true }

    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
