const jobmodel = require('../models/jobmodel')

const createjob = async (req,res) => {
    const {jobtitle,companyname,location,jobtype,experience,salary,jobdescription,applicationlink} = req.body

    if(!jobtitle || !companyname || !location || !jobtype || !experience || !jobdescription || !applicationlink){
        return res.status(404).json({message:"please enter valid credentials"})
    }

    try {

        const jobpost = await jobmodel.create({
        jobtitle,
        companyname,
        location,
        jobtype,
        experience,
        salary,
        jobdescription,
        applicationlink,
        postedby:req.user._id
    })

    return res.status(200).json({message:"jobpost created successfully!!"})
    } catch (error) {

        return res.status(409).json({message:"failed to create jobpost",error})
        
    }

}

module.exports = {createjob}