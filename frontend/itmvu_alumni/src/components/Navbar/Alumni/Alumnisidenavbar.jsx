import React from 'react'
import { NavLink } from "react-router-dom";
import { Home, Briefcase, MessageCircle, User, PlusCircle, Calendar, Users } from "lucide-react";

const Alumnisidenavbar = () => {
  const linkClasses = ({ isActive }) =>
     `flex items-center gap-2 text-lg px-3 py-2 rounded-lg transition ${
       isActive
         ? "bg-pink-100 text-pink-600 font-semibold"
         : "text-gray-500 hover:text-pink-600 hover:bg-pink-50"
     }`;
 
   return (
     <aside className="w-64 bg-white border-r border-pink-100 h-full">
       <nav className="p-6">
         <ul className="space-y-2">
 
           <li>
             <NavLink to="/alumni/dashboard" className={linkClasses}>
               <Home className="w-5 h-5" />
               <span>Home</span>
             </NavLink>
           </li>

            <li>
             <NavLink to="/alumni/feed" className={linkClasses}>
               <Home className="w-5 h-5" />
               <span>Feed</span>
             </NavLink>
           </li>
 
           <li>
             <NavLink to="/alumni/job" className={linkClasses}>
               <Briefcase className="w-5 h-5" />
               <span>Jobs</span>
             </NavLink>
           </li>
 
           <li>
             <NavLink to="/alumni/donate" className={linkClasses}>
               <Calendar className="w-5 h-5" />
               <span>Donation</span>
             </NavLink>
           </li>
 
           <li>
             <NavLink to="/alumni/mentorship" className={linkClasses}>
               <Users className="w-5 h-5" />
               <span>Mentorship</span>
             </NavLink>
           </li>
 
           <li>
             <NavLink to="/alumni/messages" className={linkClasses}>
               <MessageCircle className="w-5 h-5" />
               <span>Messages</span>
             </NavLink>
           </li>
 
           <li>
             <NavLink to="/alumni/profile" className={linkClasses}>
               <User className="w-5 h-5" />
               <span>My Profile</span>
             </NavLink>
           </li>
 
           <li>
             <NavLink to="/alumni/post" className={linkClasses}>
               <PlusCircle className="w-5 h-5" />
               <span>Create Post</span>
             </NavLink>
           </li>
 
         </ul>
       </nav>
     </aside>
   );
}

export default Alumnisidenavbar