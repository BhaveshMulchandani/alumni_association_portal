import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, LogOut } from "lucide-react";

const Studenttopnavbar = () => {
  const location = useLocation();
  
  let subtitle = "Student Dashboard";
  if (location.pathname.includes('/job')) {
    subtitle = "Job Board";
  }

  if (location.pathname.includes('/event')) {
    subtitle = "Events";
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

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
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
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground text-gray-600 hover:text-pink-600">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Studenttopnavbar;