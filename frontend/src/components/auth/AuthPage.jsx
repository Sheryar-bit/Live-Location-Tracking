"use client"

import { MapPin, Activity, Shield, Users, Moon, Sun } from "lucide-react"
import AuthForm from "./AuthForm"
import { useTheme } from "../../contexts/ThemeContext"

function AuthPage() {
  const { theme, toggleTheme, mounted } = useTheme()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 dark:bg-indigo-900/20 rounded-full opacity-20"></div>
      </div>

      {/* Header */}
      <div className="relative z-10">
        <nav className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LocationTrack
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Real-time tracking solution</p>
            </div>
          </div>

          {/* Theme Toggle Button */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
              <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                
              </span>
              <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
              
              </span>
              <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
              
              </span>
            </div>

            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 shadow-sm"
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-20 px-4">
        <div className="w-full max-w-md">
          <AuthForm />

          {/* Features Preview */}
          <div className="mt-12 space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Why Choose LocationTrack?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Powerful features for seamless location tracking
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                  <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Real-time Tracking</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Live location updates with millisecond precision
                </p>
              </div>

              <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
                  <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Secure Access</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Enterprise-grade security and privacy protection
                </p>
              </div>

              <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 md:col-span-1 col-span-1">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Multi-user Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Manage multiple users and admin controls</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
