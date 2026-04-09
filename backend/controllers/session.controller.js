const sessionmodel =  require('../models/sessionmodel')

const getsessions = async (req ,res ) => {
    try {
         const sessions = await sessionmodel.find({
            $or:[
                { student: req.user._id },
                { alumni: req.user._id }
            ],status: 'active'
        }).populate('student', 'username').populate('alumni', 'username')

        if(sessions.length === 0){
            return res.status(200).json({message:"No active sessions found", sessions: []})
        }

        return res.status(200).json({sessions})

    } catch (error) {
        return res.status(500).json({message:"Some error occurred while fetching sessions"})
    }
   
}

const completesession = async (req, res) => {

    try {
        const session = await sessionmodel.findById(req.params.sessionid)
        const userid = req.user._id.toString()

        if(!session){
            return res.status(404).json({message:"Session not found"})
        }

        if(session.student.toString() !== userid && session.alumni.toString() !== userid){
            return res.status(403).json({message:"You are not authorized to complete this session"})
        }

        if(session.status !== 'active'){
            return res.status(400).json({message:"This session is already expired or completed"})
        }

        session.status = 'completed'
        await session.save()

        return res.status(200).json({message:"Session completed successfully"})

    } catch (error) {
        return res.status(500).json({message:"Some error occurred while completing session"})
    }
}

module.exports = { getsessions,completesession}