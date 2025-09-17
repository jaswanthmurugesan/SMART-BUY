"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { auth } from "@/lib/auth"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const token = auth.getToken()
    const userData = auth.getUser()

    if (token && userData) {
      setUser(userData)
    }

    setLoading(false)
  }, [])

  const login = (userData, token) => {
    auth.setToken(token)
    auth.setUser(userData)
    setUser(userData)
  }

  const logout = () => {
    auth.logout()
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
