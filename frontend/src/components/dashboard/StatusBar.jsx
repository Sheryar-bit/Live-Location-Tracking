import { Activity, Wifi, Clock, Users } from "lucide-react"

function StatusBar({ isConnected }) {
  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} shadow-sm`}></div>
            <Wifi className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span
              className={`font-medium ${isConnected ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}
            >
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            <span className="text-gray-600 dark:text-gray-300 font-medium">Real-time updates active</span>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-purple-500 dark:text-purple-400" />
            <span className="text-gray-600 dark:text-gray-300">Multi-user tracking enabled</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  )
}

export default StatusBar
