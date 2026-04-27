const express = require('express');
const router = express.Router();
const {isloggedin} = require("../middlewares/user.middleware")
const profilecontroller = require("../controllers/profile.controller")

router.get("/me",isloggedin,profilecontroller.checkprofile)
router.post("/create",isloggedin,profilecontroller.createprofile)


module.exports = router;