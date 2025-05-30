"use client"

import { useEffect, useRef } from "react"
import { useMap } from "../../hooks/useMap"
import { MapPin, Maximize2, Layers, Navigation } from "lucide-react"

function MapContainer({ locationData, userRole, users = [] }) {
  const mapRef = useRef(null)
  const { initializeMap, updateMapMarkers } = useMap()

  useEffect(() => {
    if (mapRef.current) {
      initializeMap(mapRef.current)
    }
  }, [initializeMap])

  useEffect(() => {
    if (locationData.length > 0) {
      updateMapMarkers(locationData, userRole, users)
    }
  }, [locationData, updateMapMarkers, userRole, users])

  // Add custom CSS for tooltips
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .custom-tooltip {
        background-color: rgba(37, 99, 235, 0.9) !important;
        color: white !important;
        border: none !important;
        border-radius: 8px !important;
        padding: 6px 12px !important;
        font-weight: 600 !important;
        font-size: 12px !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      }
      .custom-tooltip::before {
        border-top-color: rgba(37, 99, 235, 0.9) !important;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 12px !important;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
      }
      .leaflet-popup-tip {
        background-color: white !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="flex-1 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 h-full overflow-hidden relative">
        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
          <button className="p-3 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            <Maximize2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-3 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            <Layers className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-3 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            <Navigation className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Map Info Panel */}
        <div className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-xs">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Live Tracking</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Real-time location updates</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Active Users:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{locationData.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Update Rate:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">Live</span>
            </div>
            {userRole === "admin" && (
              <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                  💡 Click on markers to see user names
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Map Container */}
        <div className="h-full w-full" ref={mapRef}></div>

        {/* Loading Overlay */}
        {locationData.length === 0 && (
          <div className="absolute inset-0 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Initializing Map</h3>
              <p className="text-gray-600 dark:text-gray-400">Waiting for location data...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MapContainer
