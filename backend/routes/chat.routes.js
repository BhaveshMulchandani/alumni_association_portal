const express = require('express')
const router = express.Router()
const authmiddleware = require('../middlewares/user.middleware')
const chatcontroller = require('../controllers/chat.controller')

router.get('/:sessionId/messages', authmiddleware.isloggedin, chatcontroller.getmessages)
router.post('/:sessionId/messages', authmiddleware.isloggedin, chatcontroller.sendmessage)


module.exports = router