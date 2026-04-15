
import { Switch } from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Mentorship = () => {
  const [enabled, setEnabled] = useState(false);
  const navigate = useNavigate();

  // Mock mentorship requests data - in real app this would come from API
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Bhavesh Mulchandani",
      batch: "Batch 2024",
      department: "Computer Science",
      timeAgo: "2 days ago",
      message: "Hi! I'm interested in transitioning to full-stack development and would love guidance on building projects and preparing for interviews.",
      avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
      status: "pending" // pending, accepted, declined
    }
  ]);

  const handleAccept = (requestId) => {
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId
          ? { ...request, status: "accepted" }
          : request
      )
    );
  };

  const handleDecline = (requestId) => {
    setRequests(prevRequests =>
      prevRequests.filter(request => request.id !== requestId)
    );
  };

  const handleOpenChat = () => {
    // Navigate to messages/chat page
    navigate("/alumni/messages");
  };

  const pendingRequests = requests.filter(request => request.status === "pending");
  const acceptedRequests = requests.filter(request => request.status === "accepted");
  return (
    <>

      <div className="flex-1 p-8 bg-gradient-to-br from-pink-50 via-white to-pink-50 h-screen">
        <div className="max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Mentorship Center
            </h2>
            <p className="text-gray-600">
              Guide the next generation of professionals and make a lasting
              impact.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {/* box1div */}
            <div className=" col-span-2 bg-white rounded-lg border border-pink-200 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Mentorship Requests
                </h3>
                <div className=" bg-pink-100 text-pink-600 rounded-3xl px-4 py-2">
                  {pendingRequests.length} pending
                </div>
              </div>

              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="border border-pink-200 rounded-lg p-6 mt-6">
                    <div className="flex items-center space-x-3">
                      <div>
                        <img
                          src={request.avatar}
                          alt="profile_student"
                          className="w-14 h-14 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className=" text-xl font-semibold text-gray-800">
                          {request.name}
                        </h4>
                        <div className="flex space-x-3 text-gray-500">
                          <div className="flex items-center space-x-2">
                            <i className="ri-graduation-cap-line"></i>
                            <h4>{request.batch}</h4>
                          </div>

                          <div className="flex items-center space-x-2 ">
                            <i className="ri-map-pin-2-line"></i>
                            <h4>{request.department}</h4>
                          </div>

                          <div className="flex items-center space-x-2">
                            <i className="ri-calendar-line"></i>
                            <h4>{request.timeAgo}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      {request.message}
                    </p>

                    <div className="mt-6 flex items-center space-x-4">
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="bg-pink-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-pink-600 transition duration-200"
                      >
                        <i className="ri-check-line"></i>
                        <span>Accept</span>
                      </button>

                      <button
                        onClick={() => handleDecline(request.id)}
                        className="bg-white hover:bg-red-50 text-red-600 font-medium border border-red-200 px-4 py-2 rounded-md flex items-center space-x-2 transition duration-200"
                      >
                        <i className="ri-close-line"></i>
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                ))}

                {acceptedRequests.map((request) => (
                  <div key={request.id} className="border border-green-200 rounded-lg p-6 mt-6 bg-green-50">
                    <div className="flex items-center space-x-3">
                      <div>
                        <img
                          src={request.avatar}
                          alt="profile_student"
                          className="w-14 h-14 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className=" text-xl font-semibold text-gray-800">
                          {request.name}
                        </h4>
                        <div className="flex space-x-3 text-gray-500">
                          <div className="flex items-center space-x-2">
                            <i className="ri-graduation-cap-line"></i>
                            <h4>{request.batch}</h4>
                          </div>

                          <div className="flex items-center space-x-2 ">
                            <i className="ri-map-pin-2-line"></i>
                            <h4>{request.department}</h4>
                          </div>

                          <div className="flex items-center space-x-2">
                            <i className="ri-calendar-line"></i>
                            <h4>{request.timeAgo}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      {request.message}
                    </p>

                    <div className="mt-6 flex items-center space-x-4">
                      <button
                        onClick={() => handleOpenChat(request.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-green-600 transition duration-200"
                      >
                        <i className="ri-chat-1-line"></i>
                        <span>Open Chat</span>
                      </button>
                    </div>
                  </div>
                ))}

                {pendingRequests.length === 0 && acceptedRequests.length === 0 && (
                  <div className="border border-gray-200 rounded-lg p-8 mt-6 text-center">
                    <i className="ri-inbox-line text-4xl text-gray-300 mb-4"></i>
                    <h4 className="text-lg font-medium text-gray-600 mb-2">No mentorship requests</h4>
                    <p className="text-gray-500">New requests will appear here when students reach out.</p>
                  </div>
                )}
              </div>
            </div>
            {/* wrapper div for box2 & box3 */}
            <div className="grid grid-rows-2">
              {/* box2 div */}
              <div className="border border-pink-200 rounded-lg p-6 bg-white">
                <h3 className="text-3xl font-semibold text-gray-800">
                  Mentor Profile
                </h3>
                <div className="mt-6 flex items-center justify-between">
                  <h5 className="text-base font-medium text-gray-700">
                    Available for Mentorship
                  </h5>
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${
                      enabled ? "bg-pink-500" : "bg-gray-400"
                    } relative inline-flex h-7 w-14 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        enabled ? "translate-x-9" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {enabled
                    ? "Students can send you mentorship requests"
                    : "You won't receive new mentorship requests"}
                </p>
              </div>
              <div className="border border-pink-200 rounded-lg p-6 bg-white mt-4">
                <h4 className=" text-xl font-semibold text-gray-800">
                  Mentorship Stats
                </h4>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Mentees</span>
                    <span className="font-semibold text-pink-600">{acceptedRequests.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Mentored</span>
                    <span className="font-semibold text-green-600">28</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Success Stories</span>
                    <span className="font-semibold text-blue-600">15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pending Requests</span>
                    <span className="font-semibold text-orange-600">{pendingRequests.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mentorship;
