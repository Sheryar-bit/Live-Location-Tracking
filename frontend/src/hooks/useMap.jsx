"use client"

import { useRef, useCallback } from "react"

export function useMap() {
  const mapInstanceRef = useRef(null)
  const markersRef = useRef({})

  const DEFAULT_LAT = Number.parseFloat(process.env.REACT_APP_DEFAULT_MAP_CENTER_LAT || "40.7128")
  const DEFAULT_LNG = Number.parseFloat(process.env.REACT_APP_DEFAULT_MAP_CENTER_LNG || "-74.0060")
  const DEFAULT_ZOOM = Number.parseInt(process.env.REACT_APP_DEFAULT_MAP_ZOOM || "13")
  const MAP_PROVIDER = process.env.REACT_APP_MAP_PROVIDER || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

  const initializeMap = useCallback(
    (container) => {
      if (mapInstanceRef.current || !container) return

      // Load Leaflet dynamically
      const script = document.createElement("script")
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"
      script.onload = () => {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
        document.head.appendChild(link)

        setTimeout(() => {
          if (window.L && !mapInstanceRef.current) {
            const map = window.L.map(container).setView([DEFAULT_LAT, DEFAULT_LNG], DEFAULT_ZOOM)
            window.L.tileLayer(MAP_PROVIDER, {
              attribution: "© OpenStreetMap contributors",
            }).addTo(map)

            mapInstanceRef.current = map
          }
        }, 100)
      }
      document.head.appendChild(script)
    },
    [DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ZOOM, MAP_PROVIDER],
  )

  const updateMapMarkers = useCallback((locations, userRole = null, users = []) => {
    if (!mapInstanceRef.current || !window.L) return

    const map = mapInstanceRef.current

    locations.forEach(({ userId, latitude, longitude }) => {
      // Find user information
      const user = users.find((u) => u._id === userId || u.id === userId)
      const userName = user ? user.name : `User ${userId.slice(-6)}`

      if (markersRef.current[userId]) {
        markersRef.current[userId].setLatLng([latitude, longitude])
      } else {
        const marker = window.L.marker([latitude, longitude]).addTo(map)

        // Create popup content
        const popupContent = `<div style="text-align: center; padding: 8px;">
          <strong style="color: #2563eb; font-size: 14px;">${userName}</strong>
          <br>
          <small style="color: #6b7280;">User ID: ${userId.slice(-6)}</small>
          <br>
          <small style="color: #6b7280;">Lat: ${latitude.toFixed(6)}</small>
          <br>
          <small style="color: #6b7280;">Lng: ${longitude.toFixed(6)}</small>
        </div>`

        // Bind popup to marker
        marker.bindPopup(popupContent)

        // For admin users, make markers clickable to show user name
        if (userRole === "admin") {
          marker.on("click", function () {
            this.openPopup()
          })

          // Add a tooltip that shows on hover
          marker.bindTooltip(userName, {
            permanent: false,
            direction: "top",
            offset: [0, -10],
            className: "custom-tooltip",
          })
        } else {
          // For regular users, just show basic info
          marker.bindPopup(`<div style="text-align: center; padding: 8px;">
            <strong style="color: #2563eb;">Your Location</strong>
            <br>
            <small style="color: #6b7280;">Lat: ${latitude.toFixed(6)}</small>
            <br>
            <small style="color: #6b7280;">Lng: ${longitude.toFixed(6)}</small>
          </div>`)
        }

        markersRef.current[userId] = marker
      }
    })

    // Center map on first location if available
    if (locations.length > 0) {
      const { latitude, longitude } = locations[0]
      map.setView([latitude, longitude], 16)
    }
  }, [])

  return {
    initializeMap,
    updateMapMarkers,
  }
}
