const express = require("express")
const router = express.Router()
const usercontroller = require('../controllers/user.controller')

router.post('/signup',usercontroller.signup)
router.post('/login',usercontroller.login)
router.post('/admin-setup',usercontroller.admin)
router.post('/logout',usercontroller.logout)

module.exports = router
