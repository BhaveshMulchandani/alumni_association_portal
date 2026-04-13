import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Alumni specific fields
    passingYear: "",
    currentCompany: "",
    currentRole: "",
    // Student specific fields
    department: "",
    resumeLink: "",
    githubLink: "",
    codingProfile: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock signup logic
    if (formData.name && formData.email && formData.password && role) {
      // In real app, this would create the user account
      console.log("Signup data:", { ...formData, role });
      // Redirect based on role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "alumni") {
        navigate("/alumni-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto px-6 py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Alumni Connect</h1>
              <p className="text-sm text-gray-500">University Portal</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <div className="flex flex-col space-y-1.5 p-6 text-center space-y-2">
              <h3 className="text-2xl font-semibold leading-none tracking-tight text-3xl font-bold text-gray-800">Join Alumni Connect</h3>
              <p className="text-sm text-muted-foreground text-gray-600">
                Create your account and start connecting
              </p>
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">I am a:</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole("student")}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        role === "student"
                          ? "border-pink-400 bg-pink-50 text-pink-600"
                          : "border-gray-200 hover:border-pink-200"
                      }`}
                    >
                      <div className="font-semibold">Student</div>
                      <div className="text-sm text-gray-500">Current student</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("alumni")}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        role === "alumni"
                          ? "border-pink-400 bg-pink-50 text-pink-600"
                          : "border-gray-200 hover:border-pink-200"
                      }`}
                    >
                      <div className="font-semibold">Alumni</div>
                      <div className="text-sm text-gray-500">Graduate</div>
                    </button>
                  </div>
                </div>

                {/* Common Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border-pink-200 focus:border-pink-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border-pink-200 focus:border-pink-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border-pink-200 focus:border-pink-400 pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Confirm Password</label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border-pink-200 focus:border-pink-400 pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Role-specific Fields */}
                {role === "alumni" && (
                  <div className="space-y-4 border-t pt-4">
                    <h4 className="font-semibold text-gray-800">Alumni Information</h4>
                    <div className="space-y-2">
                      <label htmlFor="passingYear" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Passing Year</label>
                      <input
                        id="passingYear"
                        type="number"
                        placeholder="e.g., 2020"
                        value={formData.passingYear}
                        onChange={(e) => handleInputChange("passingYear", e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border-pink-200 focus:border-pink-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="currentCompany" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Current Company</label>
                      <input
                        id="currentCompany"
                        type="text"
                        placeholder="Company name"
                        value={formData.currentCompany}
                        onChange={(e) => handleInputChange("currentCompany", e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border-pink-200 focus:border-pink-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="currentRole" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Current Role</label>
                      <input
                        id="currentRole"
                        type="text"
                        placeholder="Job title"
                        value={formData.currentRole}
                        onChange={(e) => handleInputChange("currentRole", e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border-pink-200 focus:border-pink-400"
                        required
                      />
                    </div>
                  </div>
                )}

                {role === "student" && (
                  <div className="space-y-4 border-t pt-4">
                    <h4 className="font-semibold text-gray-800">Student Information</h4>
                    <div className="space-y-2">
                      <label htmlFor="department" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Department</label>
                      <input
                        id="department"
                        type="text"
                        placeholder="e.g., Computer Science"
                        value={formData.department}
                        onChange={(e) => handleInputChange("department", e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border-pink-200 focus:border-pink-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="resumeLink" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Resume Link (Optional)</label>
                      <input
                        id="resumeLink"
                        type="url"
                        placeholder="Link to your resume"
                        value={formData.resumeLink}
                        onChange={(e) => handleInputChange("resumeLink", e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border-pink-200 focus:border-pink-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="githubLink" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">GitHub Profile (Optional)</label>
                      <input
                        id="githubLink"
                        type="url"
                        placeholder="GitHub profile URL"
                        value={formData.githubLink}
                        onChange={(e) => handleInputChange("githubLink", e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border-pink-200 focus:border-pink-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="codingProfile" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Coding Profile (Optional)</label>
                      <input
                        id="codingProfile"
                        type="url"
                        placeholder="LeetCode, HackerRank, etc."
                        value={formData.codingProfile}
                        onChange={(e) => handleInputChange("codingProfile", e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border-pink-200 focus:border-pink-400"
                      />
                    </div>
                  </div>
                )}

                <button type="submit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-pink-500 text-white hover:bg-pink-600 w-full h-12 text-lg" disabled={!role}>
                  Create Account
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-pink-600 hover:text-pink-700 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;