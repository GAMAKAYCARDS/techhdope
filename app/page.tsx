"use client"

import { useState, useEffect } from "react"
import {
  Headphones,
  Keyboard,
  Mouse,
  Speaker,
  Search,
  ShoppingBag,
  Camera,
  ChevronDown,
  Cable,
  Zap,
  Star,
  Heart,
  Plus,
  Minus,
  X,
  Filter,
  Grid,
  List,
  Instagram,
  RefreshCw,
  TrendingUp,
} from "lucide-react"
import DVDBouncer from "@/components/dvd-bouncer"
import CursorTracker from "@/components/cursor-tracker"

import AIChatAssistant from "@/components/ai-chat-assistant"

import { Shield, LogOut } from "lucide-react"

// Product type definition
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

// Cart item type definition
interface CartItem extends Product {
  quantity: number
}

// Product data with actual images
const products: Product[] = [
  {
    id: 1,
    name: "DopeTech Mechanical Keyboard",
    price: 299.99,
    originalPrice: 349.99,
    image: "/products/keyboard.png",
    category: "keyboard",
    rating: 0,
    reviews: 0,
    description: "Premium mechanical keyboard with Cherry MX switches",
    features: ["RGB Backlight", "Wireless", "Programmable Keys"],
    inStock: true,
    discount: 14
  },
  {
    id: 2,
    name: "DopeTech Gaming Mouse",
    price: 89.99,
    originalPrice: 119.99,
    image: "/products/Screenshot 2025-08-02 215024.png",
    category: "mouse",
    rating: 0,
    reviews: 0,
    description: "High-precision gaming mouse with 25,600 DPI",
    features: ["25,600 DPI", "RGB", "Programmable Buttons"],
    inStock: true,
    discount: 25
  },
  {
    id: 3,
    name: "DopeTech Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    image: "/products/Screenshot 2025-08-02 215007.png",
    category: "audio",
    rating: 0,
    reviews: 0,
    description: "Studio-grade wireless headphones with ANC",
    features: ["Active Noise Cancellation", "40h Battery", "Bluetooth 5.0"],
    inStock: true,
    discount: 20
  },
  {
    id: 4,
    name: "DopeTech Smart Speaker",
    price: 149.99,
    originalPrice: 179.99,
    image: "/products/Screenshot 2025-08-02 215110.png",
    category: "speaker",
    rating: 0,
    reviews: 0,
    description: "360-degree smart speaker with voice control",
    features: ["360° Audio", "Voice Control", "Smart Home Integration"],
    inStock: true,
    discount: 17
  },
  {
    id: 5,
    name: "DopeTech Security Key",
    price: 49.99,
    originalPrice: 59.99,
    image: "/products/key.png",
    category: "accessories",
    rating: 0,
    reviews: 0,
    description: "Biometric security key for enhanced protection",
    features: ["Fingerprint Sensor", "NFC", "Water Resistant"],
    inStock: true,
    discount: 17
  }
]

export default function DopeTechEcommerce() {
  const [scrollY, setScrollY] = useState(0)
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")


  const [userBehavior, setUserBehavior] = useState({
    viewedProducts: [] as number[],
    cartItems: [] as number[],
    searchHistory: [] as string[]
  })
  const [isAdmin, setIsAdmin] = useState(false)

  const [animationKey, setAnimationKey] = useState(0)


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => setScrollY(window.scrollY)
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Force dark mode
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check admin authentication
      const checkAdminAuth = () => {
        const isAdmin = localStorage.getItem("adminAuthenticated") === "true"
        const loginTime = localStorage.getItem("adminLoginTime")
        
        if (isAdmin && loginTime) {
          const loginDate = new Date(loginTime)
          const now = new Date()
          const hoursSinceLogin = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60)
          
          if (hoursSinceLogin < 8) {
            setIsAdmin(true)
          } else {
            localStorage.removeItem("adminAuthenticated")
            localStorage.removeItem("adminLoginTime")
            setIsAdmin(false)
          }
        } else {
          setIsAdmin(false)
        }
      }

      checkAdminAuth()
      // Check every minute
      const interval = setInterval(checkAdminAuth, 60000)
      return () => clearInterval(interval)
    }
  }, [])

  // DopeTech animation restart effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1)
    }, 20000) // Restart animation every 20 seconds

    return () => clearInterval(interval)
  }, [])



  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    
    // Track user behavior for AI recommendations
    setUserBehavior(prev => ({
      ...prev,
      cartItems: [...prev.cartItems, product.id]
    }))
  }

  const handleCategoryClick = (categoryId: string) => {
    console.log("Category clicked:", categoryId) // Debug log
    setSelectedCategory(categoryId)
    // Clear search when switching categories
    setSearchQuery("")
    
    // Auto scroll to products section
    setTimeout(() => {
      const productsSection = document.querySelector('[data-products-section]')
      if (productsSection) {
        const headerHeight = 100 // Approximate header height
        const elementTop = productsSection.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementTop - headerHeight - 80 // Adjusted for new category position
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }





  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev => prev.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ))
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    // If there's a search query, prioritize search results over category filtering
    if (searchQuery.trim()) {
      return matchesSearch
    }
    
    // If no search query, filter by category
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesCategory
  })

  // Debug logging
  console.log("Search query:", searchQuery)
  console.log("Selected category:", selectedCategory)
  console.log("Filtered products count:", filteredProducts.length)



  const categories = [
    { id: "all", name: "All Products", icon: Grid },
    { id: "keyboard", name: "Keyboards", icon: Keyboard },
    { id: "mouse", name: "Mice", icon: Mouse },
    { id: "audio", name: "Audio", icon: Headphones },
    { id: "speaker", name: "Speakers", icon: Speaker },
    { id: "accessories", name: "Accessories", icon: Cable },
  ]





  return (
    <div className="text-white min-h-screen transition-colors duration-100 tap-feedback" style={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 30%, #1a1a0a 50%, #1a1a1a 70%, #000000 100%)' }}>
      <CursorTracker />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 dopetech-nav animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-1 sm:px-2 md:px-3 lg:px-4 py-1 sm:py-2 md:py-3">
          <nav className="flex items-center min-h-6 sm:min-h-8 md:min-h-10">
            {/* Left Side - Logo */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 flex-shrink-0">
              <img src="/images/dopetech-logo-new.png" alt="DopeTech" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 logo-adaptive" />
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold jakarta-subtitle hidden sm:block">DopeTech Nepal</span>

              {isAdmin && (
                <div className="flex items-center space-x-1">
                  <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#F7DD0F]" />
                  <span className="text-xs text-[#F7DD0F] font-medium">ADMIN</span>
                </div>
              )}
            </div>

            {/* Center - Search Bar */}
            <div className="flex-1 flex justify-center px-1 sm:px-2 md:px-3">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-6 sm:pl-7 md:pl-8 pr-2 sm:pr-3 md:pr-4 py-0.5 sm:py-1 md:py-1.5 text-xs sm:text-sm bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F7DD0F] focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side - Controls */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-4 overflow-hidden min-w-0 flex-shrink-0 h-full py-0.5 sm:py-1">
              {/* Instagram Button */}
              <a
                href="https://www.instagram.com/dopetech_np/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-icon-button cursor-hover p-0.5 sm:p-1 md:p-1.5"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 hover:text-[#F7DD0F] transition-colors" />
              </a>

              {/* Shopping Cart with Badge */}
              <button 
                onClick={() => setCartOpen(true)}
                className="nav-icon-button cursor-hover relative p-0.5 sm:p-1 md:p-1.5" 
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 hover:text-[#F7DD0F] transition-colors" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 md:-top-1.5 md:-right-1.5 bg-[#F7DD0F] text-black text-xs rounded-full w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 flex items-center justify-center font-bold">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>



      {/* Welcome Section */}
      <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-16 relative" style={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a0a 50%, #000000 100%)' }}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 md:mb-3 animate-fade-in-up stagger-1">
              Your Setup, <span className="text-[#F7DD0F]">Perfected</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-2 sm:mb-4 md:mb-6 animate-fade-in-up stagger-2">
              Premium Tech Gear from <span className="text-[#F7DD0F]">DopeTech</span> Nepal
            </p>
            
            {/* Autoplay GIF */}
            <div className="w-full max-w-6xl mx-auto mb-4 sm:mb-6 md:mb-8 animate-fade-in-up stagger-3">
              <img
                src="/gif/doptechgif.gif"
                alt="DopeTech Introduction"
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg shadow-2xl object-cover object-center"
                loading="lazy"
              />
            </div>

            {/* Category Filter - Right below the GIF */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10 px-4 animate-fade-in-up stagger-4">
              {categories.map((category, index) => (
                <div key={category.id} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className={`flex items-center space-x-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-full transition-all duration-100 cursor-pointer text-xs sm:text-sm md:text-base ${
                      selectedCategory === category.id
                        ? "bg-[#F7DD0F] text-black shadow-lg"
                        : "bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-[#F7DD0F]/10"
                    }`}
                    aria-label={`Filter by ${category.name}`}
                  >
                    <category.icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    <span className="font-medium hidden xs:inline">{category.name}</span>
                    <span className="font-medium xs:hidden">{category.name.split(' ')[0]}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>



              {/* Products Grid */}
              <div 
                data-products-section
                className={`grid gap-3 sm:gap-4 md:gap-6 lg:gap-8 ${
                  viewMode === "grid" 
                    ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                    : "grid-cols-1"
                }`}>
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="dopetech-card p-3 sm:p-4 md:p-6 h-full flex flex-col premium-card">
                  {/* Product Image */}
                  <div className="relative mb-2 sm:mb-3 md:mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-24 sm:h-32 md:h-48 object-cover rounded-xl transition-transform duration-100 group-hover:scale-105"
                      loading="lazy"
                    />

                    {!product.inStock && (
                      <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded-full text-sm">
                        Out of Stock
                      </div>
                    )}
                    <button className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">
                        ({product.reviews})
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-[#F7DD0F]/20 text-[#F7DD0F] px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="mt-auto">
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-2xl font-bold">Rs {product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-lg text-gray-500 line-through">
                            Rs {product.originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-100 ${
                          product.inStock
                            ? "bg-[#F7DD0F] text-black hover:bg-[#F7DD0F]/90 hover:scale-105"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dope Picks Marquee Section */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a0a 50%, #000000 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Dope <span className="text-[#F7DD0F]">Picks</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400">
              Latest dope drops
            </p>
          </div>

          {/* Marquee Container */}
          <div className="relative">
            {/* Continuous Marquee Row */}
            <div className="flex animate-marquee space-x-8">
              {/* First set of products */}
              {products.map((product, index) => (
                <div key={`first-${product.id}`} className="group relative flex-shrink-0">
                  <div className="relative overflow-hidden rounded-2xl w-64 h-64 sm:w-80 sm:h-80">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-200 group-hover:scale-110 group-hover:rotate-1"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    
                    {/* Product Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                      <h3 className="text-white font-semibold text-lg mb-2">{product.name}</h3>
                      <p className="text-[#F7DD0F] font-bold text-xl">Rs {product.price}</p>
                    </div>
                    
                    {/* NEW Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      NEW
                    </div>
                    

                  </div>
                  
                  {/* Floating Action Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute -bottom-3 -right-3 bg-[#F7DD0F] text-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-100 hover:scale-110 hover:shadow-xl"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {products.map((product, index) => (
                <div key={`second-${product.id}`} className="group relative flex-shrink-0">
                  <div className="relative overflow-hidden rounded-2xl w-64 h-64 sm:w-80 sm:h-80">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-200 group-hover:scale-110 group-hover:rotate-1"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    
                    {/* Product Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                      <h3 className="text-white font-semibold text-lg mb-2">{product.name}</h3>
                      <p className="text-[#F7DD0F] font-bold text-xl">Rs {product.price}</p>
                    </div>
                    
                    {/* NEW Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      NEW
                    </div>
                    

                  </div>
                  
                  {/* Floating Action Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute -bottom-3 -right-3 bg-[#F7DD0F] text-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-100 hover:scale-110 hover:shadow-xl"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          
          {/* Cart Panel */}
          <div className="relative ml-auto w-full max-w-sm sm:max-w-md bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-l-2xl">
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                          <p className="text-[#F7DD0F] font-bold">Rs {item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-[#F7DD0F]">Rs {getCartTotal().toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-[#F7DD0F] text-black py-3 px-4 rounded-xl font-medium hover:bg-[#F7DD0F]/90 transition-colors">
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black py-16 border-t-2 border-[#F7DD0F]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <img src="/images/dopetech-logo-new.png" alt="DopeTech" className="w-10 h-10 logo-adaptive" />
              <span className="text-sm text-white jakarta-light">© 2025 DopeTech Nepal. All rights reserved.</span>
            </div>

            <div className="flex space-x-8">
              <a href="#" className="text-sm text-gray-400 hover:text-[#F7DD0F] transition-colors cursor-hover jakarta-light">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-[#F7DD0F] transition-colors cursor-hover jakarta-light">
                Terms of Use
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-[#F7DD0F] transition-colors cursor-hover jakarta-light">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chat Assistant */}
      <AIChatAssistant
        products={products}
        onAddToCart={addToCart}
      />
    </div>
  )
}
