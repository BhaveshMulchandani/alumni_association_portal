const mongoose = require('mongoose');

// Common project schema
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    liveLink: String,
    github: String,
}, { _id: false });

// Base schema (common fields)
const baseProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    role: {
        type: String,
        enum: ["student", "alumni"],
        required: true
    },
    name: { type: String, required: true },
    passingyear: Number,
    profilepic: { type: String, default: null },
    sociallinks: {
        linkedin: { type: String, default: null },
        github: { type: String, default: null },
        twitter: { type: String, default: null },
        resume: { type: String, default: null },   // mostly students
        leetcode: { type: String, default: null },
        gfg: { type: String, default: null },
    },
    projects: [projectSchema],
}, { discriminatorKey: "role"});


// Student schema (extends base)
const studentProfileSchema = new mongoose.Schema({
    department: { type: String, required: true },
    professionalSummary: { type: String, default: null },
    technicalSkills: { type: [String], required: true },
});

// Alumni schema (extends base)
const alumniProfileSchema = new mongoose.Schema({
    company: String,
    designation: String,
    location: String,
    totals: {
        donations: { type: Number, default: 0 },
        jobPosts: { type: Number, default: 0 },
        mentorships: { type: Number, default: 0 },
    },
});


// Base model
const Profile = mongoose.model("profile", baseProfileSchema);

// Discriminators for role-based
const StudentProfile = Profile.discriminator("student", studentProfileSchema);
const AlumniProfile = Profile.discriminator("alumni", alumniProfileSchema);

module.exports = { Profile, StudentProfile, AlumniProfile };
