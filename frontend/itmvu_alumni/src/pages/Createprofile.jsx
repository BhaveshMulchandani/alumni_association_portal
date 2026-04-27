import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import Profilecontext from "../context/Profilecontext";
import axios from "axios";

const Createprofile = () => {
  const navigate = useNavigate();
  const { setProfile } = useContext(Profilecontext);

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);

  // COMMON
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    github: "",
  });

  // STUDENT
  const [department, setDepartment] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState("");

  // ALUMNI
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [location, setLocation] = useState("");

  //  FETCH ROLE
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/me`,
          { withCredentials: true }
        );
        setRole(res.data.user.role);
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };

    fetchUser();
  }, []);

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let payload = {
        socialLinks,
      };

      if (role === "student") {
        payload = {
          ...payload,
          department,
          skills: skills.split(",").map((s) => s.trim()),
          resume,
        };
      } else if (role === "alumni") {
        payload = {
          ...payload,
          company,
          designation,
          location,
        };
      }

      // 🔥 REMOVE EMPTY VALUES (clean payload)
      payload = Object.fromEntries(
        Object.entries(payload).filter(([_, v]) => v !== "")
      );

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/profile/create`,
        payload,
        { withCredentials: true }
      );

      //  UPDATE CONTEXT (MOST IMPORTANT)
      setProfile(res.data.profile);

      //  REDIRECT
      if (role === "alumni") {
        navigate("/alumni/profile");
      } else {
        navigate("/student/profile");
      }

    } catch (err) {
      console.error("Create profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 LOADING SCREEN
  if (!role) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-lg text-gray-600">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">

      {/* HEADER */}
      <header className="bg-white border-b border-pink-100">
        <div className="container mx-auto px-6 py-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">
            Create Your Profile
          </h1>
        </div>
      </header>

      {/* FORM */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow space-y-6">

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* COMMON */}
            <input
              type="text"
              placeholder="LinkedIn URL"
              value={socialLinks.linkedin}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, linkedin: e.target.value })
              }
              className="w-full p-3 border rounded"
            />

            <input
              type="text"
              placeholder="GitHub URL"
              value={socialLinks.github}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, github: e.target.value })
              }
              className="w-full p-3 border rounded"
            />

            {/* STUDENT */}
            {role === "student" && (
              <>
                <input
                  type="text"
                  placeholder="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-3 border rounded"
                />

                <input
                  type="text"
                  placeholder="Skills (comma separated)"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full p-3 border rounded"
                />

                <input
                  type="text"
                  placeholder="Resume Link"
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  className="w-full p-3 border rounded"
                />
              </>
            )}

            {/* ALUMNI */}
            {role === "alumni" && (
              <>
                <input
                  type="text"
                  placeholder="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full p-3 border rounded"
                />

                <input
                  type="text"
                  placeholder="Designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full p-3 border rounded"
                />

                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 border rounded"
                />
              </>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full h-12 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Profile"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Createprofile;