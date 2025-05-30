"use client"

import { Users, User, MapPin, Bell, Settings, Moon, Sun } from "lucide-react"
import { useTheme } from "../../contexts/ThemeContext"

function DashboardHeader({ userRole, userName, activeUsers }) {
  const themeContext = useTheme()
  const theme = themeContext.theme
  const toggleTheme = themeContext.toggleTheme
  const mounted = themeContext.mounted

  if (!mounted) {
    return (
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {userRole === "admin" ? "Admin Dashboard" : "Location Dashboard"}
              </h1>
              <p className="text-gray-600 mt-1">
                {userRole === "admin"
                  ? "Monitor all user locations in real-time"
                  : "Your live location is being tracked"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {userRole === "admin" ? "Admin Dashboard" : "Location Dashboard"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {userRole === "admin" ? "Monitor all user locations in real-time" : "Your live location is being tracked"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Live</span>
            </div>

            {userRole === "admin" && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-4 py-2 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                    {activeUsers} Active Users
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 group"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 group-hover:text-gray-700 transition-colors" />
              )}
            </button>

            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>

            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-600">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-xl flex items-center justify-center shadow-sm">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </div>
              <div className="text-sm">
                <div className="font-semibold text-gray-900 dark:text-white">{userName || "User"}</div>
                <div className="text-gray-500 dark:text-gray-400 capitalize">{userRole}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
