"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, Smile, Frown, Meh } from "lucide-react"
import Sentiment from "sentiment"

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 I'm your Smart Buy assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
      sentiment: "positive",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userMood, setUserMood] = useState("neutral")
  const messagesEndRef = useRef(null)
  const sentiment = new Sentiment()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Enhanced responses with sentiment analysis
  const getBotResponse = (userMessage, userSentiment) => {
    const message = userMessage.toLowerCase()
    const sentimentScore = userSentiment.score
    const sentimentLabel = sentimentScore > 0 ? "positive" : sentimentScore < 0 ? "negative" : "neutral"

    // Sentiment-based response prefixes
    const sentimentResponses = {
      positive: ["I'm so glad you're excited! 😊", "That's wonderful to hear! ✨", "Your enthusiasm is contagious! 🌟"],
      negative: [
        "I understand your concern, let me help you with that. 💙",
        "I'm sorry to hear that. Let's see how I can assist you better. 🤗",
        "Don't worry, I'm here to help make things better! 💪",
      ],
      neutral: ["Thanks for reaching out! 👍", "I'm here to help! 🤖", "Let me assist you with that! ✨"],
    }

    let response = ""
    let emoji = "🤖"

    // Product-related queries
    if (message.includes("product") || message.includes("item") || message.includes("buy")) {
      response = `${sentimentResponses[sentimentLabel][Math.floor(Math.random() * sentimentResponses[sentimentLabel].length)]} I can help you find amazing products! We have electronics, fashion, home goods, and much more. What are you looking for specifically? 🛍️`
      emoji = "🛍️"
    }
    // Price-related queries
    else if (
      message.includes("price") ||
      message.includes("cost") ||
      message.includes("cheap") ||
      message.includes("expensive")
    ) {
      response = `${sentimentResponses[sentimentLabel][Math.floor(Math.random() * sentimentResponses[sentimentLabel].length)]} We offer competitive prices and regular discounts! You can filter products by price range, and we often have special deals. Would you like me to show you our current offers? 💰`
      emoji = "💰"
    }
    // Shipping queries
    else if (message.includes("shipping") || message.includes("delivery") || message.includes("ship")) {
      response = `${sentimentResponses[sentimentLabel][Math.floor(Math.random() * sentimentResponses[sentimentLabel].length)]} We offer fast and reliable shipping! Free shipping on orders over $50, and express delivery options available. Most orders arrive within 2-5 business days. 🚚`
      emoji = "🚚"
    }
    // Account/Login queries
    else if (
      message.includes("account") ||
      message.includes("login") ||
      message.includes("register") ||
      message.includes("sign")
    ) {
      response = `${sentimentResponses[sentimentLabel][Math.floor(Math.random() * sentimentResponses[sentimentLabel].length)]} Creating an account is quick and easy! You'll get access to order tracking, wishlist, exclusive deals, and faster checkout. Click on 'Sign Up' to get started! 👤`
      emoji = "👤"
    }
    // Cart queries
    else if (message.includes("cart") || message.includes("checkout") || message.includes("order")) {
      response = `${sentimentResponses[sentimentLabel][Math.floor(Math.random() * sentimentResponses[sentimentLabel].length)]} Your cart saves items for easy checkout! You can add/remove items, apply discount codes, and choose payment methods. Need help with your current cart? 🛒`
      emoji = "🛒"
    }
    // Support queries
    else if (
      message.includes("help") ||
      message.includes("support") ||
      message.includes("problem") ||
      message.includes("issue")
    ) {
      response = `${sentimentResponses[sentimentLabel][Math.floor(Math.random() * sentimentResponses[sentimentLabel].length)]} I'm here to help! You can ask me about products, orders, shipping, returns, or anything else. Our customer support team is also available 24/7 if you need additional assistance. 🆘`
      emoji = "🆘"
    }
    // Greeting responses
    else if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey") ||
      message.includes("good")
    ) {
      response = `${sentimentResponses[sentimentLabel][Math.floor(Math.random() * sentimentResponses[sentimentLabel].length)]} Welcome to Smart Buy! I'm your personal shopping assistant. I can help you find products, answer questions about orders, shipping, and more. What would you like to explore today? 🌟`
      emoji = "🌟"
    }
    // Gratitude responses
    else if (message.includes("thank") || message.includes("thanks") || message.includes("appreciate")) {
      response =
        "You're very welcome! 😊 I'm always happy to help. Is there anything else you'd like to know about our products or services? I'm here whenever you need assistance! ✨"
      emoji = "✨"
    }
    // Default response with sentiment consideration
    else {
      const defaultResponses = {
        positive:
          "That sounds great! I'd love to help you with that. Can you tell me more about what you're looking for? 🌟",
        negative:
          "I understand, and I'm here to help make your experience better. Could you please provide more details so I can assist you properly? 💙",
        neutral:
          "I'd be happy to help! Could you please provide more details about what you're looking for or what questions you have? 🤖",
      }
      response = defaultResponses[sentimentLabel]
      emoji = sentimentLabel === "positive" ? "🌟" : sentimentLabel === "negative" ? "💙" : "🤖"
    }

    return { text: response, emoji, sentiment: sentimentLabel }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    }

    // Analyze sentiment of user message
    const sentimentAnalysis = sentiment.analyze(inputMessage)
    const sentimentLabel =
      sentimentAnalysis.score > 0 ? "positive" : sentimentAnalysis.score < 0 ? "negative" : "neutral"

    setUserMood(sentimentLabel)
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(
      () => {
        const botResponse = getBotResponse(inputMessage, sentimentAnalysis)
        const botMessage = {
          id: Date.now() + 1,
          text: botResponse.text,
          isBot: true,
          timestamp: new Date(),
          sentiment: botResponse.sentiment,
          emoji: botResponse.emoji,
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return <Smile className="h-4 w-4 text-green-500" />
      case "negative":
        return <Frown className="h-4 w-4 text-red-500" />
      default:
        return <Meh className="h-4 w-4 text-gray-500" />
    }
  }

  const getMoodColor = (mood) => {
    switch (mood) {
      case "positive":
        return "from-green-400 to-blue-500"
      case "negative":
        return "from-red-400 to-pink-500"
      default:
        return "from-blue-500 to-purple-600"
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl text-white font-semibold float-animation bg-gradient-to-r ${getMoodColor(userMood)}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle className="h-6 w-6" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] glass-effect rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className={`p-4 bg-gradient-to-r ${getMoodColor(userMood)} text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Bot className="h-8 w-8" />
                    <motion.div
                      className="absolute -bottom-1 -right-1"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                    >
                      {getSentimentIcon(userMood)}
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Smart Buy Assistant</h3>
                    <p className="text-sm opacity-90">
                      {userMood === "positive"
                        ? "😊 Happy to help!"
                        : userMood === "negative"
                          ? "🤗 Here to support you"
                          : "🤖 Ready to assist"}
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white/50 to-white/80">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? "" : "flex-row-reverse space-x-reverse"}`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isBot
                          ? `bg-gradient-to-r ${getMoodColor(message.sentiment || "neutral")} text-white`
                          : "bg-gray-600 text-white"
                      }`}
                    >
                      {message.isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-2 shadow-md ${
                        message.isBot
                          ? "bg-white border border-gray-200"
                          : `bg-gradient-to-r ${getMoodColor(userMood)} text-white`
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className={`text-xs ${message.isBot ? "text-gray-500" : "text-white/70"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {message.isBot && message.sentiment && (
                          <div className="ml-2">{getSentimentIcon(message.sentiment)}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${getMoodColor("neutral")} text-white flex items-center justify-center`}
                    >
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-white rounded-2xl px-4 py-2 shadow-md border border-gray-200">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white/90">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className={`p-2 rounded-full text-white bg-gradient-to-r ${getMoodColor(userMood)} disabled:opacity-50 disabled:cursor-not-allowed`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs text-gray-500">
                  Mood:{" "}
                  {userMood === "positive"
                    ? "😊 Positive"
                    : userMood === "negative"
                      ? "😔 Needs Support"
                      : "😐 Neutral"}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot
