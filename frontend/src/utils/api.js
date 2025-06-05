const API_BASE = process.env.REACT_APP_API_BASE_URL || "https://live-location-tracking.vercel.app/"

export async function fetchWithAuth(endpoint, options = {}) {
  const token = localStorage.getItem("token")

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || `API request failed with status ${response.status}`)
  }

  return response.json()
}

export const api = {
  auth: {
    login: (credentials) =>
      fetchWithAuth("/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    register: (userData) =>
      fetchWithAuth("/register", {
        method: "POST",
        body: JSON.stringify(userData),
      }),
  },
  users: {
    getAll: () => fetchWithAuth("/api/users"),
    getLocations: () => fetchWithAuth("/api/user-locations"),
  },
}
