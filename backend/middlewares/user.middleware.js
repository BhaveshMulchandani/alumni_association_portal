const usermodel = require('../models/usermodel')
const jwt = require('jsonwebtoken')



const isloggedin = async (req, res, next) => {
    const token = req.cookies.token

    if (!token)
        return res.status(401).json({ message: "unauthorised, please login first" })


    try {

        const {id,role} = jwt.verify(token, process.env.JWT_SECRET)

        const user = await usermodel.findOne({
            _id: id,
            role

        })

        req.user = user
        next()
    } catch (error) {

        return res.status(401).json({ message: "please login first" })

    }
}


const isalumni = (req,res,next) => {

    if(req.user.role !== 'alumni'){
        return res.status(401).json({message:"access denied,alumni only"})
    }

    next()

}

const isstudent = (req,res,next) => {

    if(req.user.role !== 'student'){
        return res.status(401).json({message:"access denied,student only"})
    }

    next()

}


module.exports = { isloggedin, isalumni, isstudent}