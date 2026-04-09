const express = require('express')
const router = express.Router()
const authmiddleware = require('../middlewares/user.middleware')
const sessioncontroller = require('../controllers/session.controller')

router.get('/', authmiddleware.isloggedin, sessioncontroller.getsessions)
router.patch('/:sessionid/complete', authmiddleware.isloggedin, sessioncontroller.completesession)

module.exports = router