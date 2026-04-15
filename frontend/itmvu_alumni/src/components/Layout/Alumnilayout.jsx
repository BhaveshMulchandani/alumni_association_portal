import React from 'react'
import { Outlet } from "react-router-dom";
import Alumnitopnavbar from '../Navbar/Alumni/Alumnitopnavbar';
import Alumnisidenavbar from '../Navbar/Alumni/Alumnisidenavbar';

const Alumnilayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation */}
      <Alumnitopnavbar />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Alumnisidenavbar />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
            <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Alumnilayout