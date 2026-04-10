import { useState, useContext } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Profilecontext from "../context/Profilecontext";

const Navbar = () => {
  const [search, setsearch] = useState("");
  const { setProfile } = useContext(Profilecontext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
        {},
        { withCredentials: true }
      );
      setProfile(null);
      localStorage.removeItem("profile");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/student_dashboard", icon: "ri-home-7-line", activeIcon: "ri-home-7-fill" },
    { name: "Post", path: "/Student_Post", icon: "ri-add-box-line", activeIcon: "ri-add-box-fill" },
    { name: "Events", path: "/event", icon: "ri-calendar-line", activeIcon: "ri-calendar-fill" },
    { name: "Job", path: "/Student_job", icon: "ri-briefcase-4-line", activeIcon: "ri-briefcase-4-fill" },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate("/student_dashboard")}>
            {logo ? (
              <img src={logo} alt="logo" className="h-12 w-auto object-contain" />
            ) : (
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 tracking-tight">
                AlumniHub
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 justify-center px-8">
            <div className="relative w-full max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-2-line text-gray-400 group-focus-within:text-indigo-500 transition-colors"></i>
              </div>
              <input
                type="text"
                placeholder="Search events, jobs, posts..."
                className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full leading-5 bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 sm:text-sm transition-all duration-300"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => {
              const isActive = location.pathname.includes(link.path.toLowerCase());
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? "text-indigo-600 font-semibold" 
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <i className={`text-2xl mb-1 ${isActive ? link.activeIcon : link.icon} group-hover:scale-110 transition-transform duration-200`}></i>
                  <span className="text-[10px] uppercase tracking-wider">{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-1 w-8 h-1 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-t-md"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center space-x-4 lg:space-x-6 pl-4">
            {/* Notification Bell */}
            <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100">
              <i className="ri-notification-3-line text-xl"></i>
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>

            {/* Profile Dropdown / Avatar */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigate("/Student_Profile")}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-500 p-0.5 shadow-md group-hover:shadow-lg transition-all duration-300">
                <img
                  className="w-full h-full rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=600&auto=format&fit=crop&q=60"
                  alt="User avatar"
                />
              </div>
              <div className="hidden lg:block text-sm">
                <p className="text-gray-900 font-medium leading-none">Yash S.</p>
                <p className="text-gray-500 text-xs mt-1">Student</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="hidden sm:flex items-center space-x-2 bg-white text-gray-700 border border-gray-200 hover:border-red-200 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow"
            >
              <i className="ri-logout-box-r-line"></i>
              <span>Logout</span>
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-md">
              <i className="ri-menu-line text-2xl"></i>
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
