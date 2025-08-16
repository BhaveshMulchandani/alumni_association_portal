const jobmodel = require('../models/jobmodel')

const createjob = async (req, res) => {
    const { jobtitle, companyname, location, jobtype, experience, salary, jobdescription, applicationlink } = req.body

    if (!jobtitle || !companyname || !location || !jobtype || experience === undefined || !jobdescription || !applicationlink) {
        return res.status(404).json({ message: "please enter valid credentials" })
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
            postedby: req.user._id
        })

        return res.status(200).json({ message: "jobpost created successfully!!" })
    } catch (error) {

        return res.status(409).json({ message: "failed to create jobpost", error })

    }

}

const showjob = async (req, res) => {

    try {
        const jobs = await jobmodel.find().populate("postedby", "username role passingyear").sort({ createdAt: -1 })

        return res.status(200).json({ message: "all jobs fetched successfully!!" ,jobs})
    } catch (error) {
        return res.status(500).json({ message: "failed to fetch jobs", error })
    }


}

module.exports = { createjob, showjob }