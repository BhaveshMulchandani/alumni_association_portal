const { uploadfile } = require('../service/storage.service')
const postmodel = require('../models/postmodel')

const createpost = async (req, res) => {

    const { caption } = req.body

    if (!caption) {
        return res.status(404).json({ message: "please enter caption" })
    }

    let imageurl = null

    if (req.file) {
        var filedata = await uploadfile(req.file)
        imageurl = filedata.url
    }
    try {
        const post = await postmodel.create({
            image: imageurl || null,
            caption,
            user: req.user._id
        })


        res.status(200).json({ 
            message: "image created successfully",
            role: req.user.role 
        })

    } catch (error) {
        return res.status(404).json({ message: "image not created!!", error })
    }
}

const likepost = async (req, res) => {

    const {id : postid} = req.params
    const userid = req.user._id
    try {

        const post = await postmodel.findById(postid)

        if (!post) {
            return res.status(404).json({ message: "post not created!!" })
        }

        const alreadyliked = post.likes.includes(userid)

        if (alreadyliked) {
            post.likes = post.likes.filter(id => id.toString() != userid.toString())
        } else {
            post.likes.push(userid)
        }

        await post.save()
        return res.status(200).json({ message: alreadyliked ? "Post unliked" : "Post liked" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }


}

const allposts = async (req, res) => {

    try {
        const posts = await postmodel.find().sort({ createdAt: -1 })

        res.status(200).json({posts})

    } catch (error) {
        res.status(500).json({message:"failed to fetch allposts",error})

    }

}

module.exports = { createpost, likepost, allposts }