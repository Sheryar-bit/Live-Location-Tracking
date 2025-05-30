"use client"

import { useState } from "react"
import { ArrowLeft, Shield, Lock, Globe } from "lucide-react"

function Privacy({ onBack }) {
  const [settings, setSettings] = useState({
    locationSharing: true,
    dataRetention: "30days",
    anonymousMode: false,
    shareWithAdmins: true,
    locationHistory: true,
    realTimeTracking: true,
  })

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleSelectChange = (setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Privacy Settings</h1>
              <p className="text-gray-600">Control your location data and privacy preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Location Sharing */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Location Sharing</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Enable Location Sharing</h4>
                  <p className="text-sm text-gray-600">Allow your location to be shared with the system</p>
                </div>
                <button
                  onClick={() => handleToggle("locationSharing")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.locationSharing ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.locationSharing ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Real-time Tracking</h4>
                  <p className="text-sm text-gray-600">Share your location in real-time</p>
                </div>
                <button
                  onClick={() => handleToggle("realTimeTracking")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.realTimeTracking ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.realTimeTracking ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Share with Administrators</h4>
                  <p className="text-sm text-gray-600">Allow administrators to view your location</p>
                </div>
                <button
                  onClick={() => handleToggle("shareWithAdmins")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.shareWithAdmins ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.shareWithAdmins ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Location History</h4>
                  <p className="text-sm text-gray-600">Store your location history for analytics</p>
                </div>
                <button
                  onClick={() => handleToggle("locationHistory")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.locationHistory ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.locationHistory ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Data Retention Period</h4>
                  <p className="text-sm text-gray-600">How long to keep your location data</p>
                </div>
                <select
                  value={settings.dataRetention}
                  onChange={(e) => handleSelectChange("dataRetention", e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="7days">7 days</option>
                  <option value="30days">30 days</option>
                  <option value="90days">90 days</option>
                  <option value="1year">1 year</option>
                  <option value="forever">Forever</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Anonymous Mode</h4>
                  <p className="text-sm text-gray-600">Hide your identity in shared data</p>
                </div>
                <button
                  onClick={() => handleToggle("anonymousMode")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.anonymousMode ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.anonymousMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Information */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Your Privacy Matters</h3>
                <div className="text-sm text-blue-800 space-y-2">
                  <p>• Your location data is encrypted and stored securely</p>
                  <p>• You can delete your data at any time</p>
                  <p>• We never share your data with third parties</p>
                  <p>• All tracking can be disabled instantly</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Export My Data
              </button>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                Clear Location History
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Delete All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy
