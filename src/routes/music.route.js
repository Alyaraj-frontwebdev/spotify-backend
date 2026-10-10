const express = require("express");
const musicController = require("../controllers/music.controller");
const authMiddlerware = require("../middlewares/auth.middleware");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/upload", authMiddlerware.authArtist, upload.single("music"), musicController.createMusic);

router.post("/album", authMiddlerware.authArtist, musicController.createAlbum)

router.get("/", authMiddlerware.authUser, musicController.getALLMusic)

router.get("/albums", authMiddlerware.authUser, musicController.getAllAlbums)

router.get("/album/:albumId", authMiddlerware.authUser, musicController.getAlbumById)

module.exports = router;
