"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { api } from "@/lib/api"
import { useAuth } from "./AuthContext"
import { auth } from "@/lib/auth"

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { user, isAuthenticated } = useAuth()

  // Load cart on user login
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart()
    }
  }, [isAuthenticated, user])

  const loadCart = async () => {
    if (!user) return

    setLoading(true)
    try {
      const response = await api.cart.get(user.id, auth.getToken())
      if (response.success) {
        setCartItems(response.cart)
      }
    } catch (error) {
      console.error("Error loading cart:", error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      // Handle guest cart or redirect to login
      alert("Please login to add items to cart")
      return
    }

    setLoading(true)
    try {
      const response = await api.cart.add(
        user.id,
        {
          productId: product.id,
          quantity,
        },
        auth.getToken(),
      )

      if (response.success) {
        setCartItems(response.cart)
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (productId, quantity) => {
    if (!user) return

    setLoading(true)
    try {
      const response = await api.cart.update(user.id, productId, quantity, auth.getToken())
      if (response.success) {
        setCartItems(response.cart)
      }
    } catch (error) {
      console.error("Error updating cart:", error)
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (productId) => {
    if (!user) return

    setLoading(true)
    try {
      const response = await api.cart.remove(user.id, productId, auth.getToken())
      if (response.success) {
        setCartItems(response.cart)
      }
    } catch (error) {
      console.error("Error removing from cart:", error)
    } finally {
      setLoading(false)
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    loadCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
