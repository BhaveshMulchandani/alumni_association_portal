import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GraduationCap, LogOut } from "lucide-react";
import axios from "axios";

const Alumnitopnavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
    
    let subtitle = "Alumni Dashboard";
    if (location.pathname.includes('/job')) {
      subtitle = "Create Job";
    }
  
    if (location.pathname.includes('/mentorship')) {
      subtitle = "Mentorship";
    }
  
    if (location.pathname.includes('/messages')) {
      subtitle = "Messages";
    }
  
    if (location.pathname.includes('/profile')) {
      subtitle = "Profile";
    }
  
    if (location.pathname.includes('/create-post')) {
      subtitle = "Create Post";
    }

    const handleLogout = async () => {
      setLoading(true);
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {}, { withCredentials: true });
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        setLoading(false);
      }
    };
  return (

      <header className="bg-white border-b border-pink-100 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Alumni Connect</h1>
                  <p className="text-sm text-gray-500">{subtitle}</p>
                </div>
              </Link>
              <button 
                onClick={handleLogout}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-pink-600 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut className="w-4 h-4" />
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </header>
    
  )
}

export default Alumnitopnavbar