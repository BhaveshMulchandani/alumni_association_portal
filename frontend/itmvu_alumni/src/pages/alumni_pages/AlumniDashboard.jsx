import { Link } from "react-router-dom";
import {
  GraduationCap,
  Home,
  User,
  PlusCircle,
  Briefcase,
  Users,
  Heart,
  MessageCircle,
  LogOut,
} from "lucide-react";

const AlumniDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      <div className="flex">
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Alumni!</h2>
              <p className="text-gray-600">Make a difference in students&apos; lives and stay connected with your alma mater.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-4 mb-8">
              <div className="rounded-3xl border border-pink-200 bg-white p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-pink-500 mb-2">12</div>
                <div className="text-gray-600">Students Mentored</div>
              </div>
              <div className="rounded-3xl border border-pink-200 bg-white p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-blue-500 mb-2">5</div>
                <div className="text-gray-600">Jobs Posted</div>
              </div>
              <div className="rounded-3xl border border-pink-200 bg-white p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-green-500 mb-2">$2,500</div>
                <div className="text-gray-600">Total Donations</div>
              </div>
              <div className="rounded-3xl border border-pink-200 bg-white p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-purple-500 mb-2">48</div>
                <div className="text-gray-600">Network Connections</div>
              </div>
            </div>

            <section className="rounded-3xl border border-pink-200 bg-white p-6 shadow-sm mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-3xl bg-green-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-400 text-sm font-semibold text-white">AS</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">Alex Smith (Student)</div>
                    <div className="text-gray-600 text-sm">Applied to your Software Engineer job posting</div>
                    <div className="text-gray-500 text-xs mt-1">1 hour ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-3xl bg-blue-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400 text-sm font-semibold text-white">EJ</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">Emily Johnson (Student)</div>
                    <div className="text-gray-600 text-sm">Requested mentorship in Data Science</div>
                    <div className="text-gray-500 text-xs mt-1">3 hours ago</div>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-pink-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Post a Job Opportunity</h3>
                <p className="text-gray-600 mb-4">Help students find their next career opportunity by posting job openings from your company.</p>
                <Link
                  to="/post-new-job"
                  className="inline-flex items-center justify-center rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
                >
                  Post New Job
                </Link>
              </div>

              <div className="rounded-3xl border border-pink-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Mentorship Requests</h3>
                <p className="text-gray-600 mb-4">3 students are looking for mentorship in your field. Help guide the next generation!</p>
                <Link
                  to="/mentorship"
                  className="inline-flex items-center justify-center rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
                >
                  View Requests
                </Link>
              </div>

              <div className="rounded-3xl border border-pink-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Share Professional Update</h3>
                <p className="text-gray-600 mb-4">Share your latest achievements, career moves, or insights with the community.</p>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
                >
                  Create Update
                </button>
              </div>

              <div className="rounded-3xl border border-pink-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Support Your Alma Mater</h3>
                <p className="text-gray-600 mb-4">Make a donation to support current students and university programs.</p>
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
                >
                  Make Donation
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AlumniDashboard;
