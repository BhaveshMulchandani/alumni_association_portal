import Navbar_alumni from "../../componenets/Navbar_alumni";
import { Switch } from "@headlessui/react";
import { useState } from "react";

const Mentorship = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar_alumni />
      
      <main className="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Mentorship Center
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl">
              Guide the next generation of professionals and make a lasting impact.
            </p>
          </div>
          
          {/* Availability Toggle */}
          <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">Accepting Mentees</p>
              <p className="text-[11px] text-gray-500">{enabled ? "Students can request" : "Not accepting requests"}</p>
            </div>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${enabled ? "bg-gradient-to-r from-pink-500 to-indigo-500" : "bg-gray-200"}
                relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 shadow-inner`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${enabled ? "translate-x-5" : "translate-x-0"}
                  pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition duration-300 ease-in-out`}
              />
            </Switch>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Requests & Active Sessions */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Mentorship Requests */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Pending Requests</h3>
                <span className="bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1 rounded-full">
                  1 PENDING
                </span>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-5">
                    <img
                      src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=600&auto=format&fit=crop&q=60"
                      alt="Student"
                      className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 leading-tight">Yash Sharma</h4>
                          <div className="flex flex-wrap items-center mt-1.5 gap-3 text-xs font-medium text-gray-500">
                            <span className="flex items-center"><i className="ri-graduation-cap-line mr-1 text-indigo-400"></i> Batch 2025</span>
                            <span className="flex items-center"><i className="ri-macbook-line mr-1 text-indigo-400"></i> Computer Science</span>
                            <span className="flex items-center"><i className="ri-time-line mr-1 text-gray-400"></i> 2 hours ago</span>
                          </div>
                        </div>
                        <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-yellow-50 text-yellow-600 text-xs font-semibold border border-yellow-100">
                          Pending
                        </span>
                      </div>
                      
                      <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          "Hi! I'm interested in transitioning to full-stack development and would love guidance on building scalable projects and interview prep for tech giants."
                        </p>
                      </div>

                      <div className="mt-5 flex gap-3">
                        <button className="flex-1 sm:flex-none flex justify-center items-center space-x-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow">
                          <i className="ri-check-line text-lg"></i>
                          <span>Accept Request</span>
                        </button>
                        <button className="flex-1 sm:flex-none flex justify-center items-center space-x-1.5 bg-white text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 hover:bg-red-50 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                          <span>Decline</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Sessions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Active Sessions</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Session Card 1 */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1.5 h-full bg-green-500"></div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-green-50 text-green-600 text-xs font-semibold px-2.5 py-1 rounded-md border border-green-100">Active</span>
                    <i className="ri-more-2-fill text-gray-400 hover:text-gray-600 cursor-pointer"></i>
                  </div>
                  <div className="flex items-center space-x-3 mb-4">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60" className="w-12 h-12 rounded-full object-cover border border-gray-100" alt="Mentee" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Anita Desai</h4>
                      <p className="text-xs text-gray-500">UI/UX Design Focus</p>
                    </div>
                  </div>
                  <button className="w-full bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center space-x-2">
                    <i className="ri-chat-3-line"></i>
                    <span>Open Chat</span>
                  </button>
                </div>
                
                {/* Session Card 2 */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1.5 h-full bg-gray-300"></div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-md border border-gray-200">Completed</span>
                    <i className="ri-more-2-fill text-gray-400 hover:text-gray-600 cursor-pointer"></i>
                  </div>
                  <div className="flex items-center space-x-3 mb-4">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60" className="w-12 h-12 rounded-full object-cover border border-gray-100 grayscale" alt="Mentee" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Rahul Verma</h4>
                      <p className="text-xs text-gray-500">Backend System Design</p>
                    </div>
                  </div>
                  <button className="w-full bg-white hover:bg-gray-50 text-gray-500 border border-gray-200 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center space-x-2">
                    <i className="ri-file-list-3-line"></i>
                    <span>View Notes</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
          
          {/* Right Column - Stats & Settings */}
          <div className="space-y-6">
            
            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-5 flex items-center">
                <i className="ri-bar-chart-box-line mr-2 text-indigo-500"></i>
                Mentorship Impact
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-pink-100 text-pink-600 rounded-lg"><i className="ri-group-line"></i></div>
                    <span className="text-gray-700 font-medium text-sm">Active Mentees</span>
                  </div>
                  <span className="font-bold text-gray-900 font-mono text-lg">12</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><i className="ri-medal-fill"></i></div>
                    <span className="text-gray-700 font-medium text-sm">Total Mentored</span>
                  </div>
                  <span className="font-bold text-gray-900 font-mono text-lg">28</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg"><i className="ri-magic-line"></i></div>
                    <span className="text-gray-700 font-medium text-sm">Success Stories</span>
                  </div>
                  <span className="font-bold text-green-600 font-mono text-lg">15</span>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-gray-50 hover:bg-gray-100 text-gray-600 py-2.5 rounded-xl text-sm font-semibold transition-colors">
                View Full Analytics
              </button>
            </div>
            
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default Mentorship;
