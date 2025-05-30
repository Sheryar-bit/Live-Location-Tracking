"use client"

import { useState, useEffect } from "react"
import { Users, MapPin, Clock, Mail, User, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react"

function UserManagement({ onBack }) {
  const [users, setUsers] = useState([])
  const [userLocations, setUserLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    console.log("UserManagement component mounted") 
    fetchUsersData()
  }, [])

  const fetchUsersData = async () => {
    try {
      setLoading(true)
      setError("")
      console.log("Fetching users data...") 

      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No authentication token found")
      }

      console.log("Token found, making API calls...") // Debug log

      // Fetch users
      const usersResponse = await fetch("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      console.log("Users response status:", usersResponse.status) // Debug log

      if (!usersResponse.ok) {
        const errorData = await usersResponse.json()
        throw new Error(errorData.error || "Failed to fetch users")
      }

      const usersData = await usersResponse.json()
      console.log("Users data received:", usersData) // Debug log

      // Fetch user locations
      const locationsResponse = await fetch("http://localhost:5000/api/user-locations", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      console.log("Locations response status:", locationsResponse.status) 

      if (!locationsResponse.ok) {
        const errorData = await locationsResponse.json()
        throw new Error(errorData.error || "Failed to fetch locations")
      }

      const locationsData = await locationsResponse.json()
      console.log("Locations data received:", locationsData) 

      setUsers(usersData)
      setUserLocations(locationsData)
    } catch (err) {
      console.error("Error fetching data:", err)
      setError(err.message || "Failed to fetch user data")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchUsersData()
  }

  const getUserLocation = (userId) => {
    return userLocations.find((loc) => loc.userId === userId)
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Never"
    return new Date(timestamp).toLocaleString()
  }

  const getLocationStatus = (timestamp) => {
    if (!timestamp) return { status: "offline", color: "red" }

    const now = new Date()
    const lastUpdate = new Date(timestamp)
    const diffMinutes = (now - lastUpdate) / (1000 * 60)

    if (diffMinutes < 5) return { status: "online", color: "green" }
    if (diffMinutes < 30) return { status: "away", color: "yellow" }
    return { status: "offline", color: "red" }
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading user data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="space-x-3">
            <button
              onClick={fetchUsersData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Back to Map">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
                <p className="text-gray-600">View all registered users and their locations</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">{users.length} Total Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Last Update
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => {
                    const location = getUserLocation(user._id)
                    const locationStatus = getLocationStatus(location?.timestamp)

                    return (
                      <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">ID: {user._id.slice(-6)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900">{user.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full bg-${locationStatus.color}-500`}></div>
                            <span className={`text-sm font-medium text-${locationStatus.color}-700 capitalize`}>
                              {locationStatus.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {location ? (
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <div className="text-sm text-gray-600">
                                <div>Lat: {location.latitude.toFixed(6)}</div>
                                <div>Lng: {location.longitude.toFixed(6)}</div>
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400 italic">No location data</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{formatTimestamp(location?.timestamp)}</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Found</h3>
              <p className="text-gray-500">No users are registered in the system yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserManagement
