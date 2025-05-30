"use client"

import { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { useAuth } from "../contexts/AuthContext"

export function useLocationTracking() {
  const [locationData, setLocationData] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef(null)
  const { user } = useAuth()

  const API_BASE = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000"

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token || !user) return

    // Initialize socket connection
    socketRef.current = io(API_BASE, { auth: { token } })

    socketRef.current.on("connect", () => {
      setIsConnected(true)
    })

    socketRef.current.on("disconnect", () => {
      setIsConnected(false)
    })

    // Start location tracking
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          socketRef.current?.emit("send-location", { latitude, longitude })
        },
        (error) => {
          console.error("Geolocation error:", error)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      )

      // Listen for location updates
      if (user.role === "admin") {
        socketRef.current.on("all-locations", (locations) => {
          setLocationData(locations)
        })
      } else {
        socketRef.current.on("receive-location", (data) => {
          setLocationData([data])
        })
      }

      return () => {
        navigator.geolocation.clearWatch(watchId)
        socketRef.current?.disconnect()
      }
    }

    return () => {
      socketRef.current?.disconnect()
    }
  }, [user, API_BASE])

  return {
    locationData,
    isConnected,
  }
}
