const express = require('express')
const router = express.Router()
const postcontroller = require('../controllers/post.controller')
const { isloggedin } = require('../middlewares/user.middleware')
const upload = require('../utils/multer')

router.post('/createpost', isloggedin, upload.single("image"), postcontroller.createpost)
router.patch('/likepost/:id', isloggedin, postcontroller.likepost)
router.get('/allposts',isloggedin,postcontroller.allposts)



module.exports = router