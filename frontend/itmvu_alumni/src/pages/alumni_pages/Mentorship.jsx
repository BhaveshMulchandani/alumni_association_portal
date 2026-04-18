
import { Switch } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Mentorship = () => {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMentorshipRequests();
  }, []);

  const fetchMentorshipRequests = async () => {
    try {
      setRequestsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/mentorship/requests`,
        { withCredentials: true }
      );
      setRequests(response.data.requests || []);
      setError(null);
    } catch (err) {
      setError("Failed to load mentorship requests");
      console.error("Error fetching requests:", err);
    } finally {
      setRequestsLoading(false);
    }
  };

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

  const handleToggleAvailability = async (newValue) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/user/availability`,
        { isAvailable: newValue },
        { withCredentials: true }
      );
      setEnabled(newValue);
      console.log("Availability updated:", response.data);
    } catch (error) {
      console.error("Failed to update availability:", error);
      alert("Failed to update availability. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/mentorship/requests/${requestId}/accept`,
        {},
        { withCredentials: true }
      );
      alert("Mentorship request accepted!");
      fetchMentorshipRequests();
    } catch (error) {
      console.error("Failed to accept request:", error);
      alert("Failed to accept request. Please try again.");
    }
  };

  const handleDecline = async (requestId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/mentorship/requests/${requestId}/reject`,
        {},
        { withCredentials: true }
      );
      alert("Mentorship request declined!");
      fetchMentorshipRequests();
    } catch (error) {
      console.error("Failed to decline request:", error);
      alert("Failed to decline request. Please try again.");
    }
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
                {requestsLoading ? (
                  <div className="border border-gray-200 rounded-lg p-8 mt-6 text-center">
                    <div className="inline-block animate-spin">⏳</div>
                    <h4 className="text-lg font-medium text-gray-600 mt-2">Loading requests...</h4>
                  </div>
                ) : error ? (
                  <div className="border border-red-200 rounded-lg p-8 mt-6 text-center bg-red-50">
                    <h4 className="text-lg font-medium text-red-600">{error}</h4>
                  </div>
                ) : pendingRequests.length === 0 && acceptedRequests.length === 0 ? (
                  <div className="border border-gray-200 rounded-lg p-8 mt-6 text-center">
                    <i className="ri-inbox-line text-4xl text-gray-300 mb-4"></i>
                    <h4 className="text-lg font-medium text-gray-600 mb-2">No mentorship requests</h4>
                    <p className="text-gray-500">New requests will appear here when students reach out.</p>
                  </div>
                ) : (
                  <>
                {pendingRequests.map((request) => (
                  <div key={request._id} className="border border-pink-200 rounded-lg p-6 mt-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center text-white font-semibold">
                        {request.student?.username
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <h4 className=" text-xl font-semibold text-gray-800">
                          {request.student?.username}
                        </h4>
                        <div className="flex space-x-3 text-gray-500">
                          <div className="flex items-center space-x-2">
                            <i className="ri-graduation-cap-line"></i>
                            <h4>Batch {request.student?.passingyear}</h4>
                          </div>

                          <div className="flex items-center space-x-2 ">
                            <i className="ri-book-2-line"></i>
                            <h4>{request.student?.stream || "General"}</h4>
                          </div>

                          <div className="flex items-center space-x-2">
                            <i className="ri-calendar-line"></i>
                            <h4>{getTimeAgo(request.createdAt)}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Topic: {request.topic}</p>
                      <p className="text-gray-600 leading-relaxed">
                        {request.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center space-x-4">
                      <button
                        onClick={() => handleAccept(request._id)}
                        className="bg-pink-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-pink-600 transition duration-200"
                      >
                        <i className="ri-check-line"></i>
                        <span>Accept</span>
                      </button>

                      <button
                        onClick={() => handleDecline(request._id)}
                        className="bg-white hover:bg-red-50 text-red-600 font-medium border border-red-200 px-4 py-2 rounded-md flex items-center space-x-2 transition duration-200"
                      >
                        <i className="ri-close-line"></i>
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                ))}

                {acceptedRequests.map((request) => (
                  <div key={request._id} className="border border-green-200 rounded-lg p-6 mt-6 bg-green-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center text-white font-semibold">
                        {request.student?.username
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <h4 className=" text-xl font-semibold text-gray-800">
                          {request.student?.username}
                        </h4>
                        <div className="flex space-x-3 text-gray-500">
                          <div className="flex items-center space-x-2">
                            <i className="ri-graduation-cap-line"></i>
                            <h4>Batch {request.student?.passingyear}</h4>
                          </div>

                          <div className="flex items-center space-x-2 ">
                            <i className="ri-book-2-line"></i>
                            <h4>{request.student?.stream || "General"}</h4>
                          </div>

                          <div className="flex items-center space-x-2">
                            <i className="ri-calendar-line"></i>
                            <h4>{getTimeAgo(request.createdAt)}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Topic: {request.topic}</p>
                      <p className="text-gray-600 leading-relaxed">
                        {request.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center space-x-4">
                      <button
                        onClick={() => handleOpenChat(request.student?._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-green-600 transition duration-200"
                      >
                        <i className="ri-chat-1-line"></i>
                        <span>Open Chat</span>
                      </button>
                    </div>
                  </div>
                ))}
                  </>
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
                    onChange={handleToggleAvailability}
                    disabled={loading}
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
