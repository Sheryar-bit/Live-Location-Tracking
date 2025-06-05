"use client"

import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import DashboardHeader from "./DashboardHeader"
import MapContainer from "./MapContainer"
import StatusBar from "./StatusBar"
import UserManagement from "../admin/UserManagement"
import Privacy from "../user/Privacy"
import Settings from "../user/Settings"
import { useAuth } from "../../contexts/AuthContext"
import { useLocationTracking } from "../../hooks/useLocationTracking"

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentView, setCurrentView] = useState("map") // 'map', 'users', 'analytics', 'privacy', 'settings'
  const [users, setUsers] = useState([])
  const { user } = useAuth()
  const { locationData, isConnected } = useLocationTracking()

  // Fetch user data for admin users
  useEffect(() => {
    const fetchUsers = async () => {
      if (user?.role === "admin") {
        try {
          const token = localStorage.getItem("token")
          const response = await fetch("http://localhost:5000/api/users", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })

          if (response.ok) {
            const userData = await response.json()
            setUsers(userData)
          }
        } catch (error) {
          console.error("Error fetching users:", error)
        }
      }
    }

    fetchUsers()
  }, [user])

  const handleNavigation = (view) => {
    console.log("Navigating to:", view)
    setCurrentView(view)
  }

  const renderContent = () => {
    switch (currentView) {
      case "users":
        return <UserManagement onBack={() => setCurrentView("map")} />
      case "privacy":
        return <Privacy onBack={() => setCurrentView("map")} />
      case "settings":
        return <Settings onBack={() => setCurrentView("map")} />
      case "map":
      default:
        return (
          <>
            <DashboardHeader userRole={user?.role} userName={user?.name} activeUsers={locationData.length} />
            <MapContainer locationData={locationData} userRole={user?.role} users={users} />
            <StatusBar isConnected={isConnected} />
          </>
        )
    }
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        userRole={user?.role}
        onNavigate={handleNavigation}
        currentView={currentView}
      />

      <div className="flex-1 flex flex-col min-w-0">{renderContent()}</div>
    </div>
  )
}

export default Dashboard
