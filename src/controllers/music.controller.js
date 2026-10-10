const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");

async function createMusic(req, res) {

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'));

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
    })

    return res.status(201).json({
        message: "Music created successfully!",
        music
    })

}


async function createAlbum(req, res) {


    console.log(req.body);
    const { title, musicIds } = req.body;
    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musicIds,
    })
    return res.status(201).json({
        message: "Album created successfully!",
        album
    })


}

async function getALLMusic(req, res) {

    const allMusics = await musicModel.find().skip(2).limit(10).populate("artist");

    return res.status(200).json({
        message: "All musics fetched successfully!",
        allMusics
    })


}


async function getAllAlbums(req, res) {

    const album = await albumModel.find().select("title artist").populate("artist", "usernam email")

    res.status(200).json({
        message: "Albms fetched successfully!",
        album
    })
}

async function getAlbumById(req, res) {

    const albumId = req.params.albumId;
    const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics", "title uri");

    res.status(200).json({
        message: "Album fetched successfully!",
        album
    })

}

module.exports = { createMusic, createAlbum, getALLMusic, getAllAlbums, getAlbumById };