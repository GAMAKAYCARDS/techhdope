"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, Send, X, Bot, User, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  type: "text" | "product" | "recommendation"
  product?: Product
}

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  category: string
  rating: number
  reviews: number
  description: string
  features: string[]
  inStock: boolean
  discount: number
}

interface AIChatAssistantProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export default function AIChatAssistant({ products, onAddToCart }: AIChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey! I'm your DopeTech AI assistant. I can help you find the perfect tech gear, answer questions about our products, and provide personalized recommendations. What are you looking for today?",
      sender: "ai",
      timestamp: new Date(),
      type: "text"
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // AI Response Generator
  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Product search
    if (lowerMessage.includes("keyboard") || lowerMessage.includes("mechanical")) {
      const keyboard = products.find(p => p.category === "keyboard")
      if (keyboard) {
        return {
          id: Date.now().toString(),
          content: `I found a great keyboard for you! The ${keyboard.name} is our premium mechanical keyboard with Cherry MX switches and RGB backlighting.`,
          sender: "ai",
          timestamp: new Date(),
          type: "product",
          product: keyboard
        }
      }
    }

    if (lowerMessage.includes("mouse") || lowerMessage.includes("gaming")) {
      const mouse = products.find(p => p.category === "mouse")
      if (mouse) {
        return {
          id: Date.now().toString(),
          content: `Check out our ${mouse.name}! It features 25,600 DPI precision and programmable buttons perfect for gaming.`,
          sender: "ai",
          timestamp: new Date(),
          type: "product",
          product: mouse
        }
      }
    }

    if (lowerMessage.includes("headphone") || lowerMessage.includes("audio")) {
      const headphones = products.find(p => p.category === "audio")
      if (headphones) {
        return {
          id: Date.now().toString(),
          content: `For audio, I recommend our ${headphones.name} with active noise cancellation and 40-hour battery life.`,
          sender: "ai",
          timestamp: new Date(),
          type: "product",
          product: headphones
        }
      }
    }

    // General recommendations
    if (lowerMessage.includes("recommend") || lowerMessage.includes("suggestion")) {
      const recommendations = products.slice(0, 3)
      return {
        id: Date.now().toString(),
        content: `Here are my top picks for you:\n\n${recommendations.map(p => `• ${p.name} - $${p.price}`).join('\n')}\n\nThese are our most popular items with great reviews!`,
        sender: "ai",
        timestamp: new Date(),
        type: "recommendation"
      }
    }

    // Price questions
    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return {
        id: Date.now().toString(),
        content: "Our prices range from $49.99 for accessories to $299.99 for premium keyboards. All products come with free shipping and a 30-day return policy. What's your budget?",
        sender: "ai",
        timestamp: new Date(),
        type: "text"
      }
    }

    // Support questions
    if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      return {
        id: Date.now().toString(),
        content: "I'm here to help! I can assist with:\n• Product recommendations\n• Pricing information\n• Technical specifications\n• Order status\n• Return policies\n\nWhat do you need help with?",
        sender: "ai",
        timestamp: new Date(),
        type: "text"
      }
    }

    // Default response
    const responses = [
      "That's interesting! I'd be happy to help you find the perfect tech gear. Could you tell me more about what you're looking for?",
      "I'm here to help you discover amazing tech products! What specific features are you interested in?",
      "Great question! Let me help you find exactly what you need. Are you looking for gaming gear, productivity tools, or audio equipment?",
      "I'd love to help you find the perfect product! What's your main use case - gaming, work, or entertainment?"
    ]
    
    return {
      id: Date.now().toString(),
      content: responses[Math.floor(Math.random() * responses.length)],
      sender: "ai",
      timestamp: new Date(),
      type: "text"
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      type: "text"
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000))

    const aiResponse = await generateAIResponse(inputValue)
    setMessages(prev => [...prev, aiResponse])
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleProductAddToCart = (product: Product) => {
    onAddToCart(product)
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: `Added ${product.name} to your cart!`,
      sender: "ai",
      timestamp: new Date(),
      type: "text"
    }])
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#F7DD0F] text-black p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        aria-label="Open AI Chat Assistant"
      >
        {isOpen ? <X className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-72 h-80 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#F7DD0F] to-yellow-400 rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-[#F7DD0F]" />
              </div>
              <div>
                <h3 className="font-semibold text-black text-sm">DopeTech AI</h3>
                <p className="text-xs text-black/70">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-black/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-black" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start space-x-2 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === "user" 
                      ? "bg-[#F7DD0F] text-black" 
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}>
                    {message.sender === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  </div>
                  
                  <div className={`rounded-2xl px-3 py-2 ${
                    message.sender === "user"
                      ? "bg-[#F7DD0F] text-black"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  }`}>
                    <p className="text-xs whitespace-pre-wrap">{message.content}</p>
                    
                    {/* Product Card */}
                    {message.type === "product" && message.product && (
                      <Card className="mt-2 p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center space-x-2">
                          <img
                            src={message.product.image}
                            alt={message.product.name}
                            className="w-8 h-8 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-xs">{message.product.name}</h4>
                            <p className="text-[#F7DD0F] font-bold text-xs">${message.product.price}</p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleProductAddToCart(message.product!)}
                            className="bg-[#F7DD0F] text-black hover:bg-[#F7DD0F]/90 text-xs px-2 py-1 h-6"
                          >
                            Add
                          </Button>
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-[#F7DD0F] text-xs h-8"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-[#F7DD0F] text-black hover:bg-[#F7DD0F]/90 disabled:opacity-50 h-8 w-8 p-0"
                size="sm"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 