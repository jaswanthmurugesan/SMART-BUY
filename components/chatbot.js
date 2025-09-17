"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  ShoppingCart,
  Heart,
  Package,
  Star,
  Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const predefinedResponses = {
  greeting: [
    "🌟 Hello there! Welcome to Smart Buy! I'm your personal shopping assistant. How can I make your shopping experience amazing today?",
    "👋 Hi! I'm here to help you discover incredible products and deals. What brings you to Smart Buy today?",
    "✨ Welcome to Smart Buy! I'm your AI shopping companion, ready to help you find exactly what you're looking for. What can I assist you with?",
  ],
  products: [
    "🛍️ We have an incredible selection! Our top categories include:\n\n📱 Electronics (headphones, monitors, gadgets)\n⌚ Wearables (smartwatches, fitness trackers)\n🪑 Furniture (office chairs, home decor)\n👕 Fashion & more!\n\nWhich category catches your interest?",
    "🎯 Looking for something specific? I can help you find:\n\n🔥 Hot deals and bestsellers\n⭐ Top-rated products\n💰 Budget-friendly options\n🆕 Latest arrivals\n\nWhat type of product are you shopping for?",
    "🌟 Our featured products are flying off the shelves! We have amazing deals on wireless headphones, smart watches, and ergonomic furniture. Want me to show you our current bestsellers?",
  ],
  shipping: [
    "🚚 Great news about shipping!\n\n✅ FREE shipping on orders over $50\n⚡ Standard delivery: 3-5 business days\n🚀 Express delivery: 1-2 days ($9.99)\n📦 Same-day delivery available in select areas\n\nYour order qualifies for free shipping! 🎉",
    "📦 Our shipping is super convenient:\n\n🆓 Free standard shipping (orders $50+)\n⏰ Most orders ship within 24 hours\n📱 Real-time tracking included\n🔄 Easy returns within 30 days\n\nNeed expedited shipping? I can help with that!",
  ],
  returns: [
    "😊 Our return policy is customer-friendly!\n\n✅ 30-day hassle-free returns\n📦 Free return shipping labels\n💰 Full refund guarantee\n🔄 Easy online return process\n\nNeed to return something? I'll guide you through it step by step!",
    "🛡️ We've got you covered with our return policy:\n\n⏰ 30 days to return items\n📋 Items must be in original condition\n🏷️ Keep tags attached\n📧 We'll email you a prepaid return label\n\nReturns are stress-free with Smart Buy!",
  ],
  support: [
    "🤝 I'm here to help 24/7! For complex issues, our amazing human support team is ready:\n\n📧 support@smartbuy.com\n📞 1-800-SMART-BUY\n💬 Live chat available\n❓ Check our FAQ for quick answers\n\nWhat specific help do you need?",
    "🌟 You're in great hands! Our support options:\n\n🤖 Me - your AI assistant (always here!)\n👥 Human support team (24/7)\n📚 Comprehensive help center\n🎥 Video tutorials available\n\nHow can I assist you further?",
  ],
  deals: [
    "🔥 Amazing deals happening right now!\n\n💥 Up to 50% off electronics\n⚡ Flash sale on smartwatches\n🎯 Buy 2, get 1 free on accessories\n🆕 New customer discount: 15% off\n\nUse code WELCOME15 for extra savings! Want to see specific deals?",
    "💰 You're in luck! Current promotions:\n\n🌟 Premium headphones - $100 off\n⌚ Smart fitness watches - 25% off\n🪑 Office furniture - Free shipping\n🎁 Bundle deals available\n\nWhich deals interest you most?",
  ],
  recommendations: [
    "🎯 Based on popular choices, I recommend:\n\n🎧 Premium Wireless Headphones - Perfect sound quality\n⌚ Smart Fitness Watch - Track your health goals\n🪑 Ergonomic Office Chair - Comfort for work\n🖥️ 4K Monitor - Crystal clear display\n\nWant details on any of these?",
    "⭐ Here are some customer favorites:\n\n🏆 Best Seller: Wireless Headphones (4.8★)\n🔥 Trending: Smart Fitness Watch (4.6★)\n💼 Professional Choice: Ergonomic Chair (4.9★)\n\nShall I tell you more about any of these top picks?",
  ],
}

const quickActions = [
  { icon: ShoppingCart, text: "View Cart", action: "cart" },
  { icon: Heart, text: "Wishlist", action: "wishlist" },
  { icon: Package, text: "Track Order", action: "track" },
  { icon: Star, text: "Best Deals", action: "deals" },
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "🌟 Hello! I'm your Smart Buy AI assistant! I'm here to help you find amazing products, answer questions, and make your shopping experience fantastic! How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase()

    if (message.includes("hello") || message.includes("hi") || message.includes("hey") || message.includes("start")) {
      return predefinedResponses.greeting[Math.floor(Math.random() * predefinedResponses.greeting.length)]
    }

    if (
      message.includes("product") ||
      message.includes("buy") ||
      message.includes("shop") ||
      message.includes("browse")
    ) {
      return predefinedResponses.products[Math.floor(Math.random() * predefinedResponses.products.length)]
    }

    if (
      message.includes("shipping") ||
      message.includes("delivery") ||
      message.includes("ship") ||
      message.includes("fast")
    ) {
      return predefinedResponses.shipping[Math.floor(Math.random() * predefinedResponses.shipping.length)]
    }

    if (
      message.includes("return") ||
      message.includes("refund") ||
      message.includes("exchange") ||
      message.includes("policy")
    ) {
      return predefinedResponses.returns[Math.floor(Math.random() * predefinedResponses.returns.length)]
    }

    if (
      message.includes("help") ||
      message.includes("support") ||
      message.includes("contact") ||
      message.includes("assistance")
    ) {
      return predefinedResponses.support[Math.floor(Math.random() * predefinedResponses.support.length)]
    }

    if (
      message.includes("deal") ||
      message.includes("discount") ||
      message.includes("sale") ||
      message.includes("offer") ||
      message.includes("coupon")
    ) {
      return predefinedResponses.deals[Math.floor(Math.random() * predefinedResponses.deals.length)]
    }

    if (
      message.includes("recommend") ||
      message.includes("suggest") ||
      message.includes("popular") ||
      message.includes("best")
    ) {
      return predefinedResponses.recommendations[Math.floor(Math.random() * predefinedResponses.recommendations.length)]
    }

    if (
      message.includes("price") ||
      message.includes("cost") ||
      message.includes("expensive") ||
      message.includes("cheap")
    ) {
      return "💰 Great question about pricing! Our products are competitively priced with regular discounts:\n\n🏷️ Price match guarantee\n💳 Flexible payment options\n🎯 Filter by budget range\n🔥 Daily flash sales\n\nWhat's your budget range? I can show you perfect options!"
    }

    if (
      message.includes("account") ||
      message.includes("login") ||
      message.includes("profile") ||
      message.includes("register")
    ) {
      return "👤 Account management made easy!\n\n✅ Create account for exclusive benefits\n🎁 Member-only deals and early access\n📦 Order tracking and history\n❤️ Save items to wishlist\n🚀 Faster checkout process\n\nWant help setting up your account?"
    }

    if (message.includes("cart") || message.includes("checkout") || message.includes("purchase")) {
      return "🛒 Ready to checkout? Here's what you need to know:\n\n💳 Secure payment processing\n🔒 SSL encrypted transactions\n💰 Multiple payment methods accepted\n📧 Instant order confirmation\n📱 Mobile-friendly checkout\n\nNeed help with your cart?"
    }

    if (message.includes("quality") || message.includes("review") || message.includes("rating")) {
      return "⭐ Quality is our priority!\n\n🏆 All products are carefully curated\n📝 Real customer reviews and ratings\n🛡️ Quality guarantee on all items\n🔍 Detailed product specifications\n📸 High-resolution product images\n\nWant to see reviews for a specific product?"
    }

    // Default response with helpful suggestions
    return "🤔 I want to make sure I give you the best help possible! Here are some things I can assist with:\n\n🛍️ Product recommendations\n💰 Current deals and discounts\n📦 Shipping and delivery info\n🔄 Returns and exchanges\n👤 Account assistance\n🎯 Finding specific items\n\nWhat would you like to know more about?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setShowQuickActions(false)

    // Simulate typing delay with realistic timing
    setTimeout(
      () => {
        const botResponse = {
          id: (Date.now() + 1).toString(),
          text: generateResponse(inputValue),
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1200 + Math.random() * 800,
    )
  }

  const handleQuickAction = (action) => {
    let responseText = ""

    switch (action) {
      case "cart":
        responseText =
          "🛒 Let me help you with your cart!\n\nYour current cart contains some great items. You can:\n\n✅ Review your items\n💰 Apply discount codes\n🚚 Check shipping options\n💳 Proceed to secure checkout\n\nWould you like me to show you any current cart promotions?"
        break
      case "wishlist":
        responseText =
          "❤️ Your wishlist is where dreams come true!\n\n🌟 Save items for later\n🔔 Get notified of price drops\n🎁 Share with friends and family\n⚡ Quick add to cart\n\nWant to see your saved items or need help adding something to your wishlist?"
        break
      case "track":
        responseText =
          "📦 Order tracking made simple!\n\n🔍 Enter your order number\n📱 Real-time updates via SMS/email\n🗺️ Live delivery map\n📅 Estimated delivery date\n\nDo you have an order number you'd like me to help you track?"
        break
      case "deals":
        responseText =
          "🔥 Today's hottest deals!\n\n💥 Flash Sale: Up to 60% off electronics\n⌚ Smartwatch Bundle: Buy 1 Get 1 50% off\n🎧 Premium Audio: Extra 25% off with code SOUND25\n🆓 Free shipping on all orders today\n\nWhich category interests you most?"
        break
    }

    const botMessage = {
      id: Date.now().toString(),
      text: responseText,
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botMessage])
    setShowQuickActions(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsOpen(true)}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-2xl relative overflow-hidden"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <MessageCircle className="w-8 h-8 text-white relative z-10" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-2 h-2 text-white" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              height: isMinimized ? 60 : 600,
            }}
            exit={{ scale: 0, opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 z-50 w-96"
          >
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white p-4 relative overflow-hidden">
                <motion.div
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <Bot className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        Smart Assistant
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Sparkles className="w-4 h-4 ml-2" />
                        </motion.div>
                      </CardTitle>
                      <motion.p
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="text-sm text-white/80"
                      >
                        Online & ready to help! ✨
                      </motion.p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="text-white hover:bg-white/20"
                    >
                      {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="p-0">
                  {/* Messages */}
                  <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex items-start space-x-2 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              message.sender === "user"
                                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            }`}
                          >
                            {message.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className={`p-3 rounded-2xl shadow-md ${
                              message.sender === "user"
                                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-sm"
                                : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                            <p
                              className={`text-xs mt-2 ${
                                message.sender === "user" ? "text-purple-200" : "text-gray-500"
                              }`}
                            >
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Quick Actions */}
                    {showQuickActions && messages.length === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-start"
                      >
                        <div className="max-w-[85%]">
                          <p className="text-sm text-gray-600 mb-3 px-3">Quick actions:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {quickActions.map((action, index) => (
                              <motion.button
                                key={action.action}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleQuickAction(action.action)}
                                className="flex items-center space-x-2 p-2 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 rounded-lg border border-purple-200 transition-all"
                              >
                                <action.icon className="w-4 h-4 text-purple-600" />
                                <span className="text-xs text-purple-700 font-medium">{action.text}</span>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-sm shadow-md">
                            <div className="flex space-x-1">
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                                className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                                className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                                className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center space-x-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about products, deals, shipping..."
                        className="flex-1 border-gray-200 focus:border-purple-500 focus:ring-purple-500 bg-white"
                      />
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim() || isTyping}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    </div>
                    <motion.p
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      className="text-xs text-gray-500 mt-2 text-center flex items-center justify-center"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Powered by Smart Buy AI
                      <Sparkles className="w-3 h-3 ml-1" />
                    </motion.p>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
