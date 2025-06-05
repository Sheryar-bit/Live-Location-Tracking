"use client"

import { Globe, Users, Activity, Shield, Settings, LogOut, Menu, X, MapPin } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

function Sidebar({ sidebarOpen, setSidebarOpen, userRole, onNavigate, currentView }) {
  const { logout } = useAuth()

  const handleNavigation = (view) => {
    if (onNavigate) {
      onNavigate(view)
    }
  }

  const navigationItems = [
    {
      id: "map",
      label: "Live Map",
      icon: Globe,
      available: true,
    },
    {
      id: "users",
      label: "All Users",
      icon: Users,
      available: userRole === "admin",
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: Shield,
      available: true,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      available: true,
    },
  ]

  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"} flex flex-col border-r border-gray-200 dark:border-gray-700 overflow-hidden`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center transition-all duration-300 ${sidebarOpen ? "space-x-3" : "justify-center w-full"}`}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div className="min-w-0 flex-1">
                <span className="font-bold text-gray-900 dark:text-white block truncate">LocationTrack</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Real-time tracking</p>
              </div>
            )}
          </div>

          {sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex-shrink-0 ml-2"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          )}
        </div>

        {!sidebarOpen && (
          <div className="mt-3 flex justify-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <Menu className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 overflow-hidden">
        <nav className="px-3 space-y-1">
          {navigationItems.map((item) => {
            if (!item.available) return null

            const isActive = currentView === item.id
            const Icon = item.icon

            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center rounded-xl transition-all duration-200 group relative ${
                    sidebarOpen ? "px-3 py-3" : "p-3 justify-center"
                  } ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-blue-600 dark:text-blue-400" : ""} transition-colors`}
                  />

                  {sidebarOpen && (
                    <span className={`ml-3 font-medium truncate ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`}>
                      {item.label}
                    </span>
                  )}
                </button>

                {/* Tooltip for collapsed state */}
                {!sidebarOpen && (
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>

      {/* User Info Section - Only show when expanded */}
      {sidebarOpen && (
        <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">{userRole === "admin" ? "A" : "U"}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {userRole === "admin" ? "Administrator" : "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{userRole} Account</p>
            </div>
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="relative">
          <button
            onClick={logout}
            className={`w-full flex items-center rounded-xl text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 group ${
              sidebarOpen ? "px-3 py-3" : "p-3 justify-center"
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="ml-3 font-medium">Logout</span>}
          </button>

          {/* Tooltip for collapsed logout */}
          {!sidebarOpen && (
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
