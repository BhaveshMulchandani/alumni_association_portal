const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  liveLink: String,
  github: String,
}, { _id: false });

const Profileschema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user", 
        required: true
    },

    role: {
        type: String,
        enum: ["student", "alumni"],
        required: true
    },

    name: { 
        type: String 
    },
    passingYear: { 
        type: Number 
    },

    profilepic: String,

    sociallinks: {
        linkedin: String,
        github: String,
        twitter: String,
        resume: String,           // mostly students use
        leetcode: String,
        gfg: String,
    },

    // Student-only fields
    department: String,
    professionalSummary: String,
    technicalSkills: [String],

    // Alumni-only fields
    company: String,
    designation: String,
    location: String,
    totals: {
        donations: { type: Number, default: 0 },
        jobPosts: { type: Number, default: 0 },
        mentorships: { type: Number, default: 0 },
    },

    // Common
    projects: [projectSchema],
})