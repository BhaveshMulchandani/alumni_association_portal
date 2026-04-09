const usermodel = require('../models/usermodel')
const mentorshipmodel = require('../models/mentorshipmodel')
const session = require('../models/sessionmodel')

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

const viewrequests = async (req, res) => {


    try {

        const requests = await mentorshipmodel.find({ alumni: req.user._id, status: 'pending' }).populate('student', 'username stream passingyear')

        if (requests.length === 0) {
            return res.status(200).json({ message: "No mentorship requests found", requests: [] });
        } else {
            return res.status(200).json({ requests })
        }

    } catch (error) {
        return res.status(500).json({ message: "Some error occurred while fetching mentorship requests" });
    }
}

const acceptrequest = async (req, res) => {
    const request = await mentorshipmodel.findById(req.params.id)

    if(!request){
        return res.status(404).json({message:"Request not found"})
    }

    if(request.alumni.toString() !== req.user._id.toString()){
        return res.status(403).json({message:"You are not authorized to accept this request"})
    }

    if(request.status !== 'pending'){
        return res.status(400).json({message:"This request has already been processed"})
    }

    request.status = 'accepted'
    await request.save()

    await session.create({
        student: request.student,
        alumni: request.alumni,
    })

    return res.status(200).json({message:"Mentorship request accepted successfully", request})


}

const rejectrequest = async (req, res) => {

    const request = await mentorshipmodel.findById(req.params.id)

    if(!request){
        return res.status(404).json({message:"Request not found"})
    }

    if(request.alumni.toString() !== req.user._id.toString()){
        return res.status(403).json({message:"You are not authorized to reject this request"})
    }

    if(request.status !== 'pending'){
        return res.status(400).json({message:"This request has already been processed"})
    }

    request.status = 'rejected'
    await request.save()

    return res.status(200).json({message:"Mentorship request rejected successfully", request})
}


module.exports = { availablementors, requestmentorship, viewrequests, acceptrequest, rejectrequest }