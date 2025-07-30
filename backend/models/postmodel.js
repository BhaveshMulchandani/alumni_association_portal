const mongoose = require('mongoose')

const Postschema = new mongoose.Schema({

    image: {
        type: String,
        required: false
    },
    caption: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }

})

module.exports = mongoose.model("post",Postschema)