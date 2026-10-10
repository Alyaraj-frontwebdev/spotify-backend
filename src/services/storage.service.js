const { ImageKit } = require("@imagekit/nodejs");
const image_Kit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function uploadFile(file) {
    const response = await image_Kit.files.upload({
        file,
        fileName: "music" + Date.now(),
        folder: "spotify-clone-backend/music"
    });

    return response;
}

module.exports = { uploadFile };