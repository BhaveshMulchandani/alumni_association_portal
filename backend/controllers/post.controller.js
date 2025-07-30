const postmodel = require('../models/postmodel')

const createpost = (req,res) => {
    console.log(req.body);
    console.log(req.file)

    res.status(200).json({message:"image created successfully"})
}

module.exports = {createpost}