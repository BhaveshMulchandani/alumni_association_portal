const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    alumni: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'expired'],
        default: 'active'
    },
    startTime: {
        type: Date,
        default: null
    },
    endTime: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("Session", SessionSchema);