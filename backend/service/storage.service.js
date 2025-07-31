var ImageKit = require("imagekit");
const mongoose = require('mongoose')

var imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadfile = async (file) => {
    try {
        const response = await imagekit.upload({
            file: file.buffer, //required
            fileName: new mongoose.Types.ObjectId().toString(),
            folder:"post_images"
        })

        return response

    } catch (error) {
        throw error
    }
}



module.exports = { uploadfile }
