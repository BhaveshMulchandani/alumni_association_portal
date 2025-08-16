import React, { useEffect, useState } from "react";
import Navbar_student from "../../componenets/Navbar_student";
import axios from "axios";

function getTimeAgo(dateString) {
  const postDate = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - postDate) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (let interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}


const Student_job = () => {
  const [jobs, setjobs] = useState([]);

  const fetchjobs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job/showjob`);
      setjobs(res.data.jobs);
    } catch (error) {
      console.log("error fetching jobs", error);
    }
  };

  useEffect(() => {
    fetchjobs();
  }, []);

  const stats = [
  { number: jobs.length, label: "Active Jobs", color: "text-pink-500" },
  { number: jobs.filter((job) => job.jobtype ==='Internship').length , label: "Internships", color: "text-blue-500" },
  { number: jobs.filter((job) => job.jobtype ==='Remote').length, label: "Remote Jobs", color: "text-emerald-500" },
  { number: jobs.filter((job) => job.postedby.role === 'alumni').length, label: "Alumni Posted", color: "text-violet-500" },
];

  return (
    <>
      <Navbar_student />
      <div className="min-h-screen bg-gray-50 px-16 py-28">
        <div className="max-w-full mx-auto">
          <div>
            <h1 className="text-gray-800 font-bold text-3xl">Job Board</h1>
            <h4 className="text-gray-600 text-base">
              Discover amazing career opportunities posted by alumni and
              placement team
            </h4>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {
            stats.map((stat,index)=>(
              <div key={index} className="p-6 flex flex-col items-center justify-center bg-white rounded-lg border border-pink-200 shadow-sm">
              <h1 className={`${stat.color} font-bold text-2xl`}>{stat.number}</h1>
              <h4 className="text-gray-600 text-sm">{stat.label}</h4>
            </div>
            ))
          }
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job)=>(
              <div key={job._id} className="w-full max-w-4xl p-5 bg-white border border-pink-200 rounded-xl shadow-sm mx-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <h1 className="text-gray-800 font-medium text-xl">
                      {job.jobtitle}
                    </h1>
                    <span className="text-sm text-pink-600 bg-pink-100 rounded-full px-3 py-1 flex items-center gap-1">
                      <i className="ri-group-line"></i>{job.postedby?.role || "Unknown"}
                    </span>
                  </div>
                  <a href={job.applicationlink} target="blank" rel="noopener noreferrer" className="bg-pink-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-pink-700 transition">Apply Now</a>
                </div>
                <div className="mt-1 flex gap-2">
                  <div className="text-gray-600 font-semibold text-base">
                    <i className="ri-building-line"></i>
                    <span>{job.companyname}</span>
                  </div>
                  <div className="text-gray-600 text-base">
                    <i className="ri-map-pin-line"></i>
                    <span>{job.location}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm mt-2 space-x-2">
                  <span className="px-2 rounded-2xl font-medium bg-gray-50 border border-pink-100">
                    {job.jobtype}
                  </span>
                  <div className="space-x-1 text-gray-600 ">
                    <i className="ri-time-line"></i>
                    <span>{job.experience}years</span>
                  </div>
                  <div className="space-x-1 text-gray-600 ">
                    <i className="ri-money-rupee-circle-line"></i>
                    <span>{job.salary}LPA</span>
                  </div>
                </div>
                <p className="mt-2 font-light text-gray-800">
                  {job.jobdescription}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-gray-600">
                    Posted by:{" "}
                    <span className="text-gray-600 font-medium">
                      {job.postedby?.username || "Unknown User"} (Class of  {job.postedby?.passingyear || "not passing"})
                    </span>
                  </span>
                  <span className="text-gray-600">{getTimeAgo(job.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Student_job;
