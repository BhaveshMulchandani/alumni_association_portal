const express = require('express')
const { isloggedin,isstudent, isalumni } = require("../middlewares/user.middleware")
const mentorshipcontroller = require("../controllers/mentorship.controller")
const router = express.Router()

router.get('/availablementors',isloggedin,isstudent,mentorshipcontroller.availablementors)
router.post('/requestmentorship',isloggedin,isstudent,mentorshipcontroller.requestmentorship)
router.get('/requests',isloggedin,isalumni,mentorshipcontroller.viewrequests)
router.get('/studentrequests',isloggedin,isstudent,mentorshipcontroller.studentrequests)
router.patch('/requests/:id/accept',isloggedin,isalumni,mentorshipcontroller.acceptrequest)
router.patch('/requests/:id/reject',isloggedin,isalumni,mentorshipcontroller.rejectrequest)


module.exports = router