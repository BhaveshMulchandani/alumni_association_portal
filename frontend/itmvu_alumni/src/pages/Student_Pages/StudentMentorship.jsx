import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  const stats = [
    { label: "Available Mentors", value: "18", color: "text-pink-500" },
    { label: "Sent Requests", value: "3", color: "text-blue-500" },
    { label: "Active Sessions", value: "2", color: "text-green-500" },
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
                <Link
                  to="/chat"
                  className="inline-flex items-center gap-2 rounded-md bg-white text-pink-600 hover:bg-pink-50 font-semibold shadow-sm px-4 py-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Open Chat
                </Link>
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
              <BrowseMentorsTab onNavigate={setActiveTab} />
            )}
            {activeTab === "requests" && <RequestsTab />}
            {activeTab === "sessions" && <SessionsTab />}
          </div>
        </main>
      </div>
    </div>
  );
};


const mentors = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    domain: "Machine Learning",
    year: "2018",
    bio: "Senior ML Engineer at Google with 5+ years of experience in NLP and computer vision.",
    avatar: "AS",
    available: true,
  },
  {
    id: 2,
    name: "Rahul Verma",
    domain: "Full-Stack Development",
    year: "2019",
    bio: "Tech Lead at Microsoft. Passionate about React, Node.js, and cloud architecture.",
    avatar: "RV",
    available: true,
  },
  {
    id: 3,
    name: "Priya Nair",
    domain: "Data Science",
    year: "2017",
    bio: "Data Scientist at Amazon. Specializes in analytics and statistical modeling.",
    avatar: "PN",
    available: false,
  },
  {
    id: 4,
    name: "Karthik Menon",
    domain: "Cybersecurity",
    year: "2016",
    bio: "Security Architect at Cisco. Experienced in penetration testing and threat analysis.",
    avatar: "KM",
    available: true,
  },
  {
    id: 5,
    name: "Sneha Reddy",
    domain: "UI/UX Design",
    year: "2020",
    bio: "Product Designer at Figma. Focuses on design systems and user research.",
    avatar: "SR",
    available: true,
  },
  {
    id: 6,
    name: "Amit Joshi",
    domain: "DevOps & Cloud",
    year: "2015",
    bio: "Principal Engineer at AWS. Expert in Kubernetes, Terraform, and CI/CD pipelines.",
    avatar: "AJ",
    available: false,
  },
];

const BrowseMentorsTab = () => {
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const domains = [...new Set(mentors.map((m) => m.domain))];
  const filtered = mentors.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.domain.toLowerCase().includes(search.toLowerCase());
    const matchesDomain = !domainFilter || m.domain === domainFilter;
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
            <div key={mentor.id} className="dashboard-card hover-scale group border border-pink-300 rounded-lg bg-white p-5">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {mentor.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 truncate">
                    {mentor.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {mentor.domain} · Class of {mentor.year}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {mentor.bio}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className={
                    mentor.available
                      ? "inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700"
                      : "inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500"
                  }
                >
                  {mentor.available ? "Available" : "Not Available"}
                </span>
                <button
                  type="button"
                  disabled={!mentor.available}
                  onClick={() => openRequest(mentor)}
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600 text-xs px-3 py-2 disabled:opacity-40"
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
        />
      )}
    </div>
  );
};

const RequestModal = ({ mentor, onClose }) => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log("Request sent:", { mentorId: mentor.id, topic, description });
    onClose();
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
          <span className="font-medium text-pink-600">{mentor.name}</span>
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
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 text-sm"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

const studentRequests = [
  {
    id: 1,
    mentorName: "Dr. Ananya Sharma",
    topic: "ML career path",
    status: "pending",
    date: "Apr 8, 2026",
  },
  {
    id: 2,
    mentorName: "Rahul Verma",
    topic: "React best practices",
    status: "accepted",
    date: "Apr 5, 2026",
  },
  {
    id: 3,
    mentorName: "Karthik Menon",
    topic: "Cybersecurity certifications",
    status: "rejected",
    date: "Mar 28, 2026",
  },
];

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const RequestsTab = () => (
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
            key={req.id}
            className="dashboard-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover-scale border border-pink-300 rounded-lg bg-white p-5"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                {req.mentorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  {req.mentorName}
                </h4>
                <p className="text-sm text-gray-500">{req.topic}</p>
                <p className="text-xs text-gray-400">{req.date}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`${statusStyles[req.status]} capitalize inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold`}
              >
                {req.status}
              </span>
              {req.status === "accepted" && (
                <Link
                  to="/chat"
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
);

const sessions = [
  {
    id: 1,
    mentorName: "Rahul Verma",
    status: "Active",
    started: "Apr 5, 2026",
  },
  {
    id: 2,
    mentorName: "Sneha Reddy",
    status: "Completed",
    started: "Mar 10, 2026",
  },
];

const sessionStatusColors = {
  Active: "bg-green-100 text-green-700",
  Completed: "bg-gray-100 text-gray-600",
  Expired: "bg-red-100 text-red-600",
};

const SessionsTab = () => (
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
          <div key={s.id} className="dashboard-card hover-scale border border-pink-300 rounded-lg bg-white p-5">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                {s.mentorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{s.mentorName}</h4>
                <p className="text-xs text-gray-400">Started {s.started}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`${sessionStatusColors[s.status]} inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold`}
              >
                {s.status}
              </span>
              {s.status === "Active" && (
                <Link
                  to="/chat"
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
);

export default StudentMentorship;
