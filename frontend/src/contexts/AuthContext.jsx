"use client"

import { createContext, useState, useEffect, useContext } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000" || "https://live-location-tracking.vercel.app/"

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const name = localStorage.getItem("name")

    if (token && role && name) {
      setUser({ role, name })
    }
    setIsLoading(false)
  }, [])

  const login = async (name, password) => {
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || "Login failed")

      localStorage.setItem("token", data.token)
      localStorage.setItem("role", data.role)
      localStorage.setItem("name", name)

      setUser({ role: data.role, name })
      setSuccess("Login successful!")

      // Force page refresh to update authentication state
      window.location.reload()
    } catch (err) {
      setError(err.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data) => {
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) throw new Error(result.error || "Registration failed")

      setSuccess("Registration successful! Please login.")
    } catch (err) {
      setError(err.message || "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("name")
    setUser(null)

    // Force page refresh to update authentication state
    window.location.reload()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        success,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
