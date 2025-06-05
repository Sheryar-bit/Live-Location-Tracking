"use client"

import { useState } from "react"
import { ArrowLeft, SettingsIcon, User, Bell, Smartphone, Globe, Save } from "lucide-react"
import { useTheme } from "../../contexts/ThemeContext"

function Settings({ onBack }) {
  const { theme: currentTheme } = useTheme()
  const [theme] = useState(currentTheme)

  const [settings, setSettings] = useState({
    // Profile Settings
    name: "John Doe",
    email: "john.doe@example.com",

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    locationAlerts: false,
    weeklyReports: true,

    // App Settings
    language: "en",
    units: "metric",
    updateFrequency: "5min",

    // Location Settings
    highAccuracy: true,
    backgroundTracking: true,
    batteryOptimization: true,
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleSave = () => {
    // Save settings logic here
    setIsEditing(false)
    // Show success message
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Manage your account and app preferences
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Profile Settings</h3>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 dark:disabled:bg-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 dark:disabled:bg-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Theme Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-4 sm:p-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                <SettingsIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-1 sm:mb-2">Theme Settings</h3>
                <p className="text-sm sm:text-base text-blue-800 dark:text-blue-400">
                  Use the theme toggle button in the top header to switch between light and dark mode. Current theme:{" "}
                  <span className="font-medium capitalize">{theme}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Notification Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Receive updates via email</p>
                </div>
                <button
                  onClick={() => handleToggle("emailNotifications")}
                  className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors ${
                    settings.emailNotifications ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform ${
                      settings.emailNotifications ? "translate-x-6 sm:translate-x-7" : "translate-x-1 sm:translate-x-2"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Push Notifications</h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Receive push notifications on your device
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("pushNotifications")}
                  className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors ${
                    settings.pushNotifications ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform ${
                      settings.pushNotifications ? "translate-x-6 sm:translate-x-7" : "translate-x-1 sm:translate-x-2"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Location Alerts</h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Get notified about location changes
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("locationAlerts")}
                  className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors ${
                    settings.locationAlerts ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform ${
                      settings.locationAlerts ? "translate-x-6 sm:translate-x-7" : "translate-x-1 sm:translate-x-2"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Weekly Reports</h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Receive weekly activity summaries
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("weeklyReports")}
                  className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors ${
                    settings.weeklyReports ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform ${
                      settings.weeklyReports ? "translate-x-6 sm:translate-x-7" : "translate-x-1 sm:translate-x-2"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* App Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">App Settings</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => handleInputChange("language", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Units
                </label>
                <select
                  value={settings.units}
                  onChange={(e) => handleInputChange("units", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="metric">Metric (km, m)</option>
                  <option value="imperial">Imperial (mi, ft)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Update Frequency
                </label>
                <select
                  value={settings.updateFrequency}
                  onChange={(e) => handleInputChange("updateFrequency", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="1min">Every minute</option>
                  <option value="5min">Every 5 minutes</option>
                  <option value="10min">Every 10 minutes</option>
                  <option value="30min">Every 30 minutes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Location Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">High Accuracy Mode</h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Use GPS for more precise location tracking
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("highAccuracy")}
                  className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors ${
                    settings.highAccuracy ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform ${
                      settings.highAccuracy ? "translate-x-6 sm:translate-x-7" : "translate-x-1 sm:translate-x-2"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Background Tracking</h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Continue tracking when app is in background
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("backgroundTracking")}
                  className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors ${
                    settings.backgroundTracking ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform ${
                      settings.backgroundTracking ? "translate-x-6 sm:translate-x-7" : "translate-x-1 sm:translate-x-2"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Battery Optimization</h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Optimize tracking to preserve battery life
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("batteryOptimization")}
                  className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors ${
                    settings.batteryOptimization ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform ${
                      settings.batteryOptimization ? "translate-x-6 sm:translate-x-7" : "translate-x-1 sm:translate-x-2"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
