"use client"

import { useEffect, useState } from "react"
import AuthPage from "./components/auth/AuthPage"
import Dashboard from "./components/dashboard/Dashboard"
import { AuthProvider } from "./contexts/AuthContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import LoadingSpinner from "./components/comman/LoadingSpinner"
import "./index.css"

function App() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <ThemeProvider>
      <AuthProvider>{isAuthenticated ? <Dashboard /> : <AuthPage />}</AuthProvider>
    </ThemeProvider>
  )
}

export default App
