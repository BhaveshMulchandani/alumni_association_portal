const usermodel = require('../models/usermodel')
const mentorshipmodel = require('../models/mentorshipmodel')

const availablementors = async (req, res) => {

    try {

        const mentors = await usermodel.find({ role: 'alumni', isAvailable: true }).select('username  stream passingyear')

        if (mentors.length === 0) {
            return res.status(404).json({ message: "No mentors available", mentors: [] });
        }

        return res.status(200).json({ mentors })

    } catch (error) {
        return res.status(500).json({ message: "some error to find mentors" });
    }
}

const requestmentorship = async (req, res) => {

    const { topic, description, alumniid } = req.body

    if (!topic || !description || !alumniid) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    try {

        const alumni = await usermodel.findById(alumniid)

        if (!alumni || alumni.role !== 'alumni') {
            return res.status(404).json({ message: "Alumni not found" });
        }

        if (!alumni.isAvailable) {
            return res.status(400).json({ message: "Alumni is not available for mentorship" });
        }

        const existingrequest = await mentorshipmodel.findOne({ student: req.user._id, alumni: alumniid, status: 'pending' })

        if (existingrequest) {
            return res.status(400).json({ message: "You have already sent a mentorship request to this alumni. Please wait for their response." });
        }

        const request = await mentorshipmodel.create({
            student: req.user._id,
            alumni: alumniid,
            topic,
            description
        })

        return res.status(200).json({ message: "Mentorship request sent successfully", request })

    } catch (error) {
        return res.status(500).json({ message: "Some error occurred while sending mentorship request" });
    }


}

module.exports = { availablementors, requestmentorship }