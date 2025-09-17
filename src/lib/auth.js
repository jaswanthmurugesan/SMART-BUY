// Authentication utility functions
export const auth = {
  // Store token in localStorage
  setToken: (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("smart_buy_token", token)
    }
  },

  // Get token from localStorage
  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("smart_buy_token")
    }
    return null
  },

  // Remove token from localStorage
  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("smart_buy_token")
      localStorage.removeItem("smart_buy_user")
    }
  },

  // Store user data
  setUser: (user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("smart_buy_user", JSON.stringify(user))
    }
  },

  // Get user data
  getUser: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("smart_buy_user")
      return user ? JSON.parse(user) : null
    }
    return null
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!auth.getToken()
  },

  // Logout user
  logout: () => {
    auth.removeToken()
    if (typeof window !== "undefined") {
      window.location.href = "/login"
    }
  },
}
