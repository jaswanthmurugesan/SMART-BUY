const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// API utility functions
export const api = {
  // Auth endpoints
  auth: {
    login: async (credentials) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
      return response.json()
    },

    signup: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
      return response.json()
    },

    logout: async (token) => {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.json()
    },
  },

  // Products endpoints
  products: {
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString()
      const response = await fetch(`${API_BASE_URL}/products?${queryString}`)
      return response.json()
    },

    getById: async (id) => {
      const response = await fetch(`${API_BASE_URL}/products/${id}`)
      return response.json()
    },

    search: async (query) => {
      const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`)
      return response.json()
    },
  },

  // Cart endpoints
  cart: {
    get: async (userId, token) => {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.json()
    },

    add: async (userId, productData, token) => {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      })
      return response.json()
    },

    update: async (userId, productId, quantity, token) => {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      })
      return response.json()
    },

    remove: async (userId, productId, token) => {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}/remove/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.json()
    },
  },

  // Orders endpoints
  orders: {
    create: async (orderData, token) => {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      })
      return response.json()
    },

    getUserOrders: async (userId, token) => {
      const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.json()
    },

    getById: async (orderId, token) => {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.json()
    },
  },

  // User endpoints
  user: {
    getProfile: async (userId, token) => {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.json()
    },

    updateProfile: async (userId, userData, token) => {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      })
      return response.json()
    },
  },
}
