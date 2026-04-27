const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    liveLink: String,
    github: String,
}, { _id: false });

const baseProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // ✅ FIXED
        required: true,
        unique: true, // ✅ one profile per user
        index: true
    },


    role: {
        type: String,
        enum: ["student", "alumni"],
        required: true,
        index: true
    },

    socialLinks: {
        type: Map,
        of: String,
        default: {}
    },

    projects: [projectSchema],

}, {
    discriminatorKey: "role",
    timestamps: true // ✅ IMPORTANT
});

const studentProfileSchema = new mongoose.Schema({
    department: { type: String, required: true },

    skills: {
        type: [String],
        default: []
    },

    resume: String,

});

const alumniProfileSchema = new mongoose.Schema({
    company: String,
    designation: String,
    location: String,
});

const Profile = mongoose.model("profile", baseProfileSchema);

const StudentProfile = Profile.discriminator(
    "student",
    studentProfileSchema
);

const AlumniProfile = Profile.discriminator(
    "alumni",
    alumniProfileSchema
);

module.exports = { Profile, StudentProfile, AlumniProfile };