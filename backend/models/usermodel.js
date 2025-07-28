const mongoose = require("mongoose")

const Userschema = new mongoose.Schema({
    username : {
        type:String,
        required : true,
        minlength : 3,
    },
    email : {
        type:String,
        required : true,
        unique:true,
    },
    passingyear : Number,
    stream : String,
    password : {
        type : String,
        required:true,
    },
    role : { type:String,
        enum : ["student","alumni","admin"]
    }
})

module.exports = mongoose.model("user",Userschema)