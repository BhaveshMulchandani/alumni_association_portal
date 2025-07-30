const {uploadfile} = require('../service/storage.service')

const createpost = async (req,res) => {
    console.log(req.body);
    console.log(req.file)


    const filedata = await uploadfile(req.file)
    console.log(filedata);
    

    res.status(200).json({message:"image created successfully"})



}

module.exports = {createpost}