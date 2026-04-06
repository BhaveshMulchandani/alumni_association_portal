const express = require('express')
const { isloggedin,isalumni,isstudent } = require("../middlewares/user.middleware")
const mentorshipcontroller = require("../controllers/mentorship.controller")
const router = express.Router()

router.get('/availablementors',isloggedin,isstudent,mentorshipcontroller.availablementors)
router.post('/requestmentorship',isloggedin,isstudent,mentorshipcontroller.requestmentorship)