"use client"

import { useState } from "react"
import { Globe, Eye, EyeOff, Mail, User, Lock } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"


function AuthForm() {
  const [authMode, setAuthMode] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  })

  const { login, register, isLoading, error, success } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (authMode === "login") {
      await login(formData.name, formData.password)
    } else {
      await register(formData)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  
  const handleInputtChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Validate email on change
    if (field === "email") {
      if (!value) {
        setEmailError("Email is required.");
      } else if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }
  };


const email = formData.email.trim();
const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
const forbiddenStartChars = ['-', '.', '_'];


  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-3xl"></div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {authMode === "login" ? "Welcome Back" : "Get Started"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {authMode === "login"
              ? "Sign in to access your location dashboard"
              : "Create your account to start tracking"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg mb-6 flex items-center space-x-3">
            <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 text-green-700 dark:text-green-300 px-6 py-4 rounded-lg mb-6 flex items-center space-x-3">
            <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all duration-200 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
          </div>

          {authMode === "register" && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
             <input
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => handleInputtChange("email", e.target.value)}
          className={`w-full pl-12 pr-4 py-4 rounded-xl border ${
            emailError
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-100"
          } dark:focus:border-blue-400 focus:ring-4 dark:focus:ring-blue-900/20 transition-all duration-200 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
          required
        />
            </div>
          )}<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
    <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
  </div>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    value={formData.password}
    onChange={(e) => handleInputChange("password", e.target.value)}
    className="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all duration-200 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
    required
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200 bg-transparent"
  >
    {showPassword ? (
      <EyeOff className="h-5 w-5" />
    ) : (
      <Eye className="h-5 w-5" />
    )}
  </button>
</div>

          {authMode === "register" && (
            <div className="relative">
              <select
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="w-full px-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all duration-200 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white appearance-none cursor-pointer"
              >
                <option value="user">User Account</option>
                <option value="admin">Admin Account</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : authMode === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {authMode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
            >
              {authMode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthForm