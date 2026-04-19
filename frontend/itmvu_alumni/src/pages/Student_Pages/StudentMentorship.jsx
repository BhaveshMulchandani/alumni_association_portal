import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  GraduationCap,
  Home,
  Briefcase,
  MessageCircle,
  User,
  Calendar,
  Users,
  Search,
  Compass,
  ClipboardList,
  Zap,
  LogOut,
} from "lucide-react";

const StudentMentorship = () => {
  const [activeTab, setActiveTab] = useState("mentors");
  const [mentors, setMentors] = useState([]);
  const [studentRequests, setStudentRequests] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAvailableMentors();
    fetchStudentRequests();
    fetchSessions();
  }, []);

  const fetchStudentRequests = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/mentorship/studentrequests`,
        { withCredentials: true }
      );
      setStudentRequests(response.data.requests || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/session`,
        { withCredentials: true }
      );
      setSessions(response.data.sessions || []);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    }
  };

  const fetchAvailableMentors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/mentorship/availablementors`,
        { withCredentials: true }
      );
      setMentors(response.data.mentors);
      setError(null);
    } catch (err) {
      setError("Failed to load mentors. Please try again.");
      console.error("Error fetching mentors:", err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: "Available Mentors", value: mentors.length.toString(), color: "text-pink-500" },
    { label: "Sent Requests", value: studentRequests.length.toString(), color: "text-blue-500" },
    { label: "Active Sessions", value: sessions.filter(s => s.status === 'active').length.toString(), color: "text-green-500" },
  ];

  const tabs = [
    { id: "mentors", label: "Browse Mentors", icon: Search },
    { id: "requests", label: "My Requests", icon: ClipboardList },
    { id: "sessions", label: "Sessions", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      <div className="flex">
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-6 md:p-8 mb-8 text-black border border-pink-300">
              <div className="flex items-center space-x-3 mb-2">
                <Compass className="w-7 h-7" />
                <h2 className="text-2xl md:text-3xl font-bold">
                  Mentorship Hub
                </h2>
              </div>
              <p className="text-gray-600 text-base md:text-lg max-w-xl">
                Connect with experienced alumni and grow your career 🚀
              </p>
              <div className="flex flex-wrap gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setActiveTab("mentors")}
                  className="inline-flex items-center gap-2 rounded-md bg-white text-pink-600 hover:bg-pink-50 font-semibold shadow-sm px-4 py-2 text-sm"
                >
                  <Search className="w-4 h-4" />
                  Browse Mentors
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("requests")}
                  className="inline-flex items-center gap-2 rounded-md bg-white text-pink-600 hover:bg-pink-50 font-semibold shadow-sm px-4 py-2 text-sm"
                >
                  <ClipboardList className="w-4 h-4" />
                  View Requests
                </button>
                {sessions.filter(s => s.status === 'active').length > 0 && (
                  <Link
                    to={`/student/messages/${sessions.filter(s => s.status === 'active')[0]._id}`}
                    className="inline-flex items-center gap-2 rounded-md bg-white text-pink-600 hover:bg-pink-50 font-semibold shadow-sm px-4 py-2 text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Open Chat
                  </Link>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="dashboard-card text-center hover-scale rounded-2xl border border-pink-200 bg-white p-4"
                >
                  <div className={`text-3xl font-bold ${s.color} mb-1`}>
                    {s.value}
                  </div>
                  <div className="text-gray-600 text-sm">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex space-x-1 bg-white rounded-xl p-1 border border-pink-300 mb-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-sm"
                      : "text-gray-600 hover:bg-pink-50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {activeTab === "mentors" && (
              <BrowseMentorsTab mentors={mentors} loading={loading} error={error} onNavigate={setActiveTab} fetchStudentRequests={fetchStudentRequests} />
            )}
            {activeTab === "requests" && <RequestsTab studentRequests={studentRequests} />}
            {activeTab === "sessions" && <SessionsTab sessions={sessions} />}
          </div>
        </main>
      </div>
    </div>
  );
};


const mentorDomains = (mentor) => mentor.stream || "General";

const BrowseMentorsTab = ({ mentors, loading, error, fetchStudentRequests }) => {
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  if (loading) {
    return (
      <div className="dashboard-card text-center py-16">
        <div className="inline-block animate-spin">⏳</div>
        <h3 className="text-lg font-semibold text-gray-600 mt-3">
          Loading mentors...
        </h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-card text-center py-16 border-red-200 bg-red-50">
        <h3 className="text-lg font-semibold text-red-600">{error}</h3>
      </div>
    );
  }

  const domains = [...new Set(mentors.map((m) => mentorDomains(m)))];
  const filtered = mentors.filter((m) => {
    const matchesSearch =
      m.username.toLowerCase().includes(search.toLowerCase()) ||
      mentorDomains(m).toLowerCase().includes(search.toLowerCase());
    const matchesDomain = !domainFilter || mentorDomains(m) === domainFilter;
    return matchesSearch && matchesDomain;
  });

  const openRequest = (mentor) => {
    setSelectedMentor(mentor);
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search mentors by name or domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
          />
        </div>
        <select
          value={domainFilter}
          onChange={(e) => setDomainFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm text-gray-700"
        >
          <option value="">All Domains</option>
          {domains.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="dashboard-card text-center py-16">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-600">
            No mentors found
          </h3>
          <p className="text-gray-400 text-sm">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((mentor) => (
            <div key={mentor._id} className="dashboard-card hover-scale group border border-pink-300 rounded-lg bg-white p-5">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {mentor.username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 truncate">
                    {mentor.username}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {mentorDomains(mentor)} · Class of {mentor.passingyear}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Available for mentorship in {mentorDomains(mentor)}
              </p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                  Available
                </span>
                <button
                  type="button"
                  onClick={() => openRequest(mentor)}
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600 text-xs px-3 py-2"
                >
                  Request Mentorship
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedMentor && (
        <RequestModal
          mentor={selectedMentor}
          onClose={() => setShowModal(false)}
          onSuccess={fetchStudentRequests}
        />
      )}
    </div>
  );
};

const RequestModal = ({ mentor, onClose, onSuccess }) => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!topic.trim() || !description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/mentorship/requestmentorship`,
        {
          topic,
          description,
          alumniid: mentor._id,
        },
        { withCredentials: true }
      );
      alert("Mentorship request sent successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to send request. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          Request Mentorship
        </h3>
        <p className="text-sm text-gray-500 mb-5">
          Send a request to{" "}
          <span className="font-medium text-pink-600">{mentor.username}</span>
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Career guidance in ML"
              className="w-full px-4 py-2.5 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe what you'd like help with..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm resize-none"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-md border border-pink-200 text-gray-600 px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 text-sm disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const RequestsTab = ({ studentRequests }) => {
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
  <div>
    {studentRequests.length === 0 ? (
      <div className="dashboard-card text-center py-16">
        <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-600">No requests yet</h3>
        <p className="text-gray-400 text-sm">
          Browse mentors and send your first request!
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        {studentRequests.map((req) => (
          <div
            key={req._id}
            className="dashboard-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover-scale border border-pink-300 rounded-lg bg-white p-5"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                {req.alumni?.username
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  {req.alumni?.username || "Unknown"}
                </h4>
                <p className="text-sm text-gray-500">{req.topic}</p>
                <p className="text-xs text-gray-400">{formatDate(req.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`${statusStyles[req.status]} capitalize inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold`}
              >
                {req.status}
              </span>
              {req.status === "accepted" && req.session && (
                <Link
                  to={`/student/messages/${req.session}`}
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-pink-400 to-pink-500 text-white text-xs px-3 py-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1" />
                  Open Chat
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)};

const sessionStatusColors = {
  active: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-600",
  expired: "bg-red-100 text-red-600",
};

const SessionsTab = ({ sessions }) => {
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
  <div>
    {sessions.length === 0 ? (
      <div className="dashboard-card text-center py-16">
        <Zap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-600">
          No active sessions
        </h3>
        <p className="text-gray-400 text-sm">
          Sessions will appear here once a mentor accepts your request.
        </p>
      </div>
    ) : (
      <div className="grid sm:grid-cols-2 gap-5">
        {sessions.map((s) => (
          <div key={s._id} className="dashboard-card hover-scale border border-pink-300 rounded-lg bg-white p-5">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                {s.alumni?.username
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{s.alumni?.username || "Unknown"}</h4>
                <p className="text-xs text-gray-400">Started {formatDate(s.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`${sessionStatusColors[s.status]} capitalize inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold`}
              >
                {s.status}
              </span>
              {s.status === "active" && (
                <Link
                  to={`/student/messages/${s._id}`}
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-pink-400 to-pink-500 text-white text-xs px-3 py-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1" />
                  Open Chat
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)};

export default StudentMentorship;
