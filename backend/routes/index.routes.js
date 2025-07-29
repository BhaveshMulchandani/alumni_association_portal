const express = require("express")
const router = express.Router()


 router.get("/",(req,res)=>{
    res.json({message:"i am running"});
    
 })

 module.exports = router