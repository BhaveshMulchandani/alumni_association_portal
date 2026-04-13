const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back, Student!
            </h2>
            <p className="text-gray-600">
              Stay connected with your alumni network and discover new
              opportunities.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="dashboard-card text-center border border-pink-100 rounded-lg bg-white p-4">
              <div className="text-3xl font-bold text-pink-500 mb-2">24</div>
              <div className="text-gray-500">Available Jobs</div>
            </div>
            <div className="dashboard-card text-center border border-pink-100 rounded-lg bg-white p-4">
              <div className="text-3xl font-bold text-blue-500 mb-2">8</div>
              <div className="text-gray-500">Mentor Connections</div>
            </div>
            <div className="dashboard-card text-center border border-pink-100 rounded-lg bg-white p-4">
              <div className="text-3xl font-bold text-green-500 mb-2">156</div>
              <div className="text-gray-500">Alumni Network</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-card mb-8 border rounded-lg bg-white border-pink-100 p-6 ">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-pink-50 rounded-lg">
                <div className="w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">
                    John Doe (Class of 2018)
                  </div>
                  <div className="text-gray-600 text-sm">
                    Posted a new job opportunity at Google
                  </div>
                  <div className="text-gray-500 text-xs mt-1">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                  SM
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">
                    Sarah Miller (Class of 2020)
                  </div>
                  <div className="text-gray-600 text-sm">
                    Shared insights about software engineering career
                  </div>
                  <div className="text-gray-500 text-xs mt-1">5 hours ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="dashboard-card border rounded-lg bg-white border-pink-100 p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Recommended Jobs
            </h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">
                    Software Developer Intern
                  </h4>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-pink-500 text-white hover:bg-pink-600 px-4 py-2">
                    Apply Now
                  </button>
                </div>
                <div className="text-gray-600 text-sm mb-2">
                  Microsoft • Redmond, WA
                </div>
                <div className="text-gray-500 text-sm">
                  Posted by: Alex Johnson (Class of 2017)
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">
                    Data Analyst Position
                  </h4>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-pink-500 text-white hover:bg-pink-600 px-4 py-2">
                    Apply Now
                  </button>
                </div>
                <div className="text-gray-600 text-sm mb-2">
                  Amazon • Seattle, WA
                </div>
                <div className="text-gray-500 text-sm">
                  Posted by: Maria Garcia (Class of 2019)
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
