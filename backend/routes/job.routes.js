const express = require('express')
const { isloggedin,isalumni } = require("../middlewares/user.middleware")
const jobcontroller = require("../controllers/job.controller")
const router = express.Router()

router.post("/createjob",isloggedin,isalumni,jobcontroller.createjob)
router.get("/showjob", jobcontroller.showjob)


module.exports = router