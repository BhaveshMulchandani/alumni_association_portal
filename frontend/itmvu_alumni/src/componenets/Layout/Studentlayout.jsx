import React from 'react'
import { Outlet } from "react-router-dom";
import Studenttopnavbar from '../Navbar/Student/Studenttopnavbar';
import  Studentsidenavbar from '../Navbar/Student/Studentsidenavbar';

const Studentlayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation */}
      <Studenttopnavbar />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Studentsidenavbar />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
            <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Studentlayout