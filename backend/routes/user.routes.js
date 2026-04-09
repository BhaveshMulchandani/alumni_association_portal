const express = require("express")
const router = express.Router()
const usercontroller = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/user.middleware')

router.post('/signup',usercontroller.signup)
router.post('/login',usercontroller.login)
router.post('/admin-setup',usercontroller.admin)
router.post('/logout',usercontroller.logout)
router.patch('/availability', authMiddleware.isloggedin, usercontroller.toggleAvailability);

module.exports = router
