const usermodel = require('../models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {

    const { username, email, passingyear, stream, password, role } = req.body

    if (!username || !email || !password || !role || !passingyear || !stream) {
        return res.status(401).json({ message: "missing credentials , enter valid credentials !!" })
    }
    try {

        const existinguser = await usermodel.findOne({ email })

        if (existinguser) {
            return res.status(409).json({ message: "user already exists." })
        }

        const salt = await bcrypt.genSalt(12)
        const hashpassword = await bcrypt.hash(password, salt)

        const user = await usermodel.create({
            username,
            email,
            passingyear,
            stream,
            password: hashpassword,
            role,
        })

        return res.status(201).json({ message: "user created successfully" })


    } catch (error) {
        console.log("signup error :", error)
        return res.status(500).json({ message: "internal server error" })

    }

}

const login = async (req,res) => {

    const {email,password} = req.body

    if(!email || !password){
        return res.status(400).json({message:"missing credentials!!"})
    }

    try {
        const user = await usermodel.findOne({email})

        if(!user){
            return res.status(404).json({message:"enter valid credentilas"})
        }

        const ispassword = await bcrypt.compare(password,user.password)

        if(!ispassword){
            return res.status(401).json({message:"enter valid credentials"})
        }

        let token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET)

        res.cookie("token",token,{ expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)})

        return res.status(201).json({message:'user successfully loggedin !!',role:user.role})

    } catch (error) {

        console.log("login error :", error)
        return res.status(500).json({ message: "internal server error" })
        
    }
}

module.exports = { signup, login }