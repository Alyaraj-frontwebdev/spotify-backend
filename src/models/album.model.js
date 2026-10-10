const { request } = require("express");
const mongoose = require("mongoose");


const AlbumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    musics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "music"
    }],
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}
)

const albumModel = mongoose.model("album", AlbumSchema);


module.exports = albumModel;
