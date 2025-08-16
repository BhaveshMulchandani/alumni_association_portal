const mongoose = require('mongoose')

const Jobschema = new mongoose.Schema({

    jobtitle:{
        type:String,
        required:true
    },
    companyname:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobtype:{
        type:String,
        enum:['Full-Time','Part-Time','Remote','Internship'],
        default: 'Full-Time',
        required:true
    },
    experience:{
        type:Number,
        required:true,
        min:0,
        default:0
    },
    salary:{
        type:Number,
        required:false,
        min:0,
        default:25000
    },
    jobdescription:{
        type:String,
        required:true
    },
    applicationlink:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    postedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
})

module.exports = new mongoose.model("job",Jobschema)