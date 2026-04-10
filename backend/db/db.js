const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const ConnectToDb = () => {
    mongoose.connect(`${process.env.MONGO_URI}/alumniassociationportal`)
        .then(() => {
            console.log("db connected")
        }
        )
        .catch((err) => {
            console.log("db not connected", err)
        }
        )
}

module.exports = ConnectToDb