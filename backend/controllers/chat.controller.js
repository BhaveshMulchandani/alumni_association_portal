const chatmodel = require('../models/chatmodel')
const sessionmodel = require('../models/sessionmodel')

const getmessages = async (req, res) => {
    try {

        const session = await sessionmodel.findById(req.params.sessionId)
        const userid = req.user._id.toString()

        if (!session) {
            return res.status(404).json({ message: "Session not found" })
        }

        if (session.student.toString() !== userid && session.alumni.toString() !== userid) {
            return res.status(403).json({ message: "You are not authorized to view these messages" })
        }

        const messages = await chatmodel.find({ session: session._id }).sort({ createdAt: 1 }).populate('sender', 'username_id')

        if (messages.length === 0) {
            return res.status(200).json({ message: "No messages found", messages: [] })
        }

        return res.status(200).json({ messages })

    } catch (error) {
        return res.status(500).json({ message: "Some error occurred while fetching messages" })
    }

}

const sendmessage = async (req, res) => {

    try {

        const session = await sessionmodel.findById(req.params.sessionId)
        const userid = req.user._id.toString()

        if (!session) {
            return res.status(404).json({ message: "Session not found" })
        }

        if (session.student.toString() !== userid && session.alumni.toString() !== userid) {
            return res.status(403).json({ message: "You are not authorized to send messages in this session" })
        }

        if (session.status !== 'active') {
            return res.status(400).json({ message: "Cannot send messages in an inactive session" })
        }

        const now = new Date()

        if (!session.startTime) {
            session.startTime = now
            session.endTime = new Date(now.getTime() + 48 * 60 * 60 * 1000)
            await session.save()
        }

        if (session.endTime && now > session.endTime) {
            session.status = 'expired'
            await session.save()
            return res.status(400).json({ message: "Session has expired. Cannot send messages." })
        }

        const newmessage = await chatmodel.create({
            session: session._id,
            sender: req.user._id,
            message: req.body.message
        })

        const io = req.app.get('io');

        io.to(req.params.sessionId).emit('receive_message', {
            _id: newmessage._id,
            session: session._id,
            message: newmessage.message,
            sender: {
                _id: req.user._id
            },
            createdAt: newmessage.createdAt
        });

        return res.status(201).json({ message: "Message sent successfully", newmessage })


    } catch (error) {
        return res.status(500).json({ message: "Some error occurred while sending message" })
    }

}

module.exports = { getmessages, sendmessage }
