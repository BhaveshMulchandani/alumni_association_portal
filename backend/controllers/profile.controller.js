const { Profile, StudentProfile, AlumniProfile } = require("../models/profilemodel");

const checkprofile = async (req, res) => {

    try {
        const profile = await profilemodel.findOne({ user: req.user._id }).populate("user", "username");


        if (!profile) {
            return res.status(200).json({ profile:null })
        }
        return res.status(200).json({ profile })
    } catch (error) {

        return res.status(500).json({ message: "Some error occurred while fetching profile",error })

    }

}

const createprofile = async (req, res) => {
  try {
    const existingprofile = await Profile.findOne({ user: req.user._id})
    if (existingprofile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const role = req.user.role;


    let profile;

    const baseData = {
      user: req.user._id,
      name: req.user.username,
      role,
      socialLinks: req.body.socialLinks || {},
      projects: req.body.projects || []
    };

    // STUDENT PROFILE
    if (role === "student") {
      const { department, skills, resume } = req.body;

      if (!department) {
        return res.status(400).json({ message: "Department is required" });
      }

      profile = await StudentProfile.create({
        ...baseData,
        department,
        skills: skills || [],
        resume: resume || null
      });

    }

    // 🔹 ALUMNI PROFILE
    else if (role === "alumni") {
      const { company, designation, location } = req.body;

      profile = await AlumniProfile.create({
        ...baseData,
        company: company || "",
        designation: designation || "",
        location: location || ""
      });
    }

    return res.status(201).json({ profile });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Some error occurred while creating profile",
      error
    });
  }
};

module.exports = { checkprofile, createprofile }