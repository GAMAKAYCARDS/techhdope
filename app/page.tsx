"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
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
  RefreshCw,
  TrendingUp,
  Menu,
  Instagram,
} from "lucide-react"
import DVDBouncer from "@/components/dvd-bouncer"
import CursorTracker from "@/components/cursor-tracker"
import AIChatAssistant from "@/components/ai-chat-assistant"
import OptimizedProductCard from "@/components/optimized-product-card"
import { GridSkeleton } from "@/components/ui/loading-skeleton"
import SEOOptimizer, { defaultStructuredData } from "@/components/seo-optimizer"
import { allProducts, type Product } from "@/lib/products-data"

import { Shield, LogOut } from "lucide-react"

// Product type is now imported from lib/products-data

// Cart item type definition
interface CartItem extends Product {
  quantity: number
}

// Products data imported from lib/products-data
const products: Product[] = allProducts

export default function DopeTechEcommerce() {
  const [scrollY, setScrollY] = useState(0)
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchModalReady, setSearchModalReady] = useState(false)

  const [userBehavior, setUserBehavior] = useState({
    viewedProducts: [] as number[],
    cartItems: [] as number[],
    searchHistory: [] as string[]
  })
  const [isAdmin, setIsAdmin] = useState(false)

  const [animationKey, setAnimationKey] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const searchModalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => setScrollY(window.scrollY)
      window.addEventListener("scroll", handleScroll)
      
      // Simulate loading completion
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      
      return () => {
        window.removeEventListener("scroll", handleScroll)
        clearTimeout(timer)
      }
    }
  }, [])

  // Handle keyboard events and click outside for search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
        setSearchQuery("")
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (searchModalRef.current && !searchModalRef.current.contains(e.target as Node) && searchModalReady) {
        console.log("Click outside detected")
        setIsSearchOpen(false)
        setSearchQuery("")
      }
    }

    const handleTouchOutside = (e: TouchEvent) => {
      if (searchModalRef.current && !searchModalRef.current.contains(e.target as Node) && searchModalReady) {
        console.log("Touch outside detected")
        setIsSearchOpen(false)
        setSearchQuery("")
      }
    }

    if (isSearchOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleTouchOutside)
      // Prevent body scroll when search is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleTouchOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isSearchOpen, searchModalReady])

  // Set modal as ready after a short delay to prevent immediate closing
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        setSearchModalReady(true)
      }, 100)
      return () => {
        clearTimeout(timer)
        setSearchModalReady(false)
      }
    } else {
      setSearchModalReady(false)
    }
  }, [isSearchOpen])

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    // Check on initial load as well
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setIsMobileMenuOpen(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobileMenuOpen])

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



  const addToCart = useCallback((product: Product) => {
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
  }, [])

  const handleCategoryClick = (categoryId: string) => {
    console.log("Category clicked:", categoryId) // Debug log
    setSelectedCategory(categoryId)
    // Clear search when switching categories
    setSearchQuery("")
    
    // Smooth scroll to products section with offset
    setTimeout(() => {
      const productsSection = document.querySelector('[data-products-section]')
      if (productsSection) {
        // Calculate the target scroll position with offset
        const headerHeight = 100 // Offset to keep category buttons visible
        const rect = productsSection.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const targetPosition = scrollTop + rect.top - headerHeight
        
        // Smooth scroll to the calculated position
        window.scrollTo({
          top: targetPosition,
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

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!")
      return
    }
    
    const total = getCartTotal()
    alert(`Proceeding to checkout with ${cart.length} items. Total: Rs ${total.toFixed(2)}`)
    // Here you would typically redirect to a checkout page or payment processor
  }

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
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
  }, [searchQuery, selectedCategory])

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
    { id: "monitor", name: "Monitors", icon: Camera },
    { id: "accessory", name: "Accessories", icon: Cable },
  ]

  return (
    <>
      <SEOOptimizer structuredData={defaultStructuredData} />
      <div className="text-white min-h-screen transition-colors duration-100 tap-feedback scrollbar-hide gradient-bg">
        <CursorTracker />
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#F7DD0F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#F7DD0F] font-semibold">Loading DopeTech...</p>
          </div>
        </div>
      )}

      {/* Enhanced Mobile Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 dopetech-nav animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4">
          <nav className="flex items-center justify-between h-10 sm:h-12 md:h-14 lg:h-16">
            {/* Left Side - Logo */}
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 min-w-0 flex-1">
              <img src="/images/dtechnepal.svg" alt="DopeTech" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 logo-adaptive flex-shrink-0" />

              {isAdmin && (
                <div className="flex items-center space-x-1 ml-1 sm:ml-2 flex-shrink-0">
                  <Shield className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#F7DD0F]" />
                  <span className="text-xs sm:text-sm text-[#F7DD0F] font-medium">ADMIN</span>
                </div>
              )}
            </div>

            {/* Right Side - Controls */}
            <div className="flex items-center justify-end space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 flex-shrink-0">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="nav-icon-button p-1.5 sm:p-2 md:p-3 touch-target flex items-center justify-center hover-scale"
                aria-label="Search"
                style={{ minHeight: '36px', minWidth: '36px' }}
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 hover:text-[#F7DD0F] transition-colors" />
              </button>

              {/* Shopping Cart with Badge */}
              <button 
                onClick={() => setCartOpen(true)}
                className="nav-icon-button relative p-1.5 sm:p-2 md:p-3 touch-target flex items-center justify-center hover-scale" 
                aria-label="Shopping Cart"
                style={{ minHeight: '36px', minWidth: '36px' }}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 hover:text-[#F7DD0F] transition-colors" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 md:-top-2 md:-right-2 bg-[#F7DD0F] text-black text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center font-bold animate-bounce">
                    {getCartCount()}
                  </span>
                )}
              </button>

              {/* Instagram Button */}
              <a
                href="https://www.instagram.com/dopetech_np/?hl=ne"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-icon-button p-1.5 sm:p-2 md:p-3 touch-target flex items-center justify-center hover-scale"
                aria-label="Instagram"
                style={{ minHeight: '36px', minWidth: '36px' }}
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 hover:text-[#F7DD0F] transition-colors" />
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden nav-icon-button p-1.5 sm:p-2 touch-target flex items-center justify-center hover-scale"
                aria-label="Menu"
                data-mobile-menu
                style={{ minHeight: '36px', minWidth: '36px' }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 sm:w-5 sm:h-5 hover:text-[#F7DD0F] transition-colors animate-scale-in" />
                ) : (
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5 hover:text-[#F7DD0F] transition-colors" />
                )}
              </button>
            </div>
          </nav>



          {/* Desktop Search Modal */}
          {isSearchOpen && (
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in"
            >
              <div 
                ref={searchModalRef}
                className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-6 w-full max-w-2xl mx-4 animate-scale-in mt-20"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Search Products</h3>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false)
                      setSearchQuery("")
                    }}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    aria-label="Close search"
                  >
                    <X className="w-5 h-5 text-gray-400 hover:text-white" />
                  </button>
                </div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for keyboards, mice, headphones, speakers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7DD0F] focus:border-transparent text-white placeholder-gray-400"
                    autoFocus
                  />
                </div>
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mt-2 sm:mt-4 animate-slide-in-down bg-black/90 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-gray-700 md:hidden" data-mobile-menu>
              <div className="space-y-2 sm:space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      handleCategoryClick(category.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-200 touch-target ${
                      selectedCategory === category.id
                        ? "bg-[#F7DD0F] text-black"
                        : "text-white hover:bg-white/10"
                    }`}
                    style={{ minHeight: '44px' }}
                  >
                    <category.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Welcome Section - Mobile Optimized */}
      <section className="pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-8 md:pb-12 relative mobile-hero" style={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a0a 50%, #000000 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 animate-fade-in-up stagger-1 leading-tight">
              Your Setup, <span className="text-[#F7DD0F] animate-pulse">Perfected</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-4 sm:mb-6 md:mb-8 animate-fade-in-up stagger-2 leading-relaxed">
              Premium Tech Gear from <span className="text-[#F7DD0F] animate-float">DopeTech</span> Nepal
            </p>
            
            {/* Autoplay GIF with Borderless Glow - Shorter on Mobile */}
            <div className="w-full max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10 animate-fade-in-up stagger-3 borderless-glow">
              <img
                src="/gif/doptechgif.gif"
                alt="DopeTech Introduction"
                className="w-full h-24 sm:h-32 md:h-40 lg:h-48 rounded-xl shadow-xl object-cover object-center"
                loading="lazy"
              />
            </div>

            {/* Category Filter - Mobile Optimized with Larger Touch Targets */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8 md:mb-10 px-2 animate-fade-in-up stagger-4">
              {/* First row */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 w-full">
                {categories.slice(0, 3).map((category, index) => (
                  <div key={category.id} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className={`flex items-center space-x-2 px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 rounded-full transition-all duration-200 cursor-pointer text-sm sm:text-base md:text-lg touch-target hover-scale hover-glow min-h-[44px] ${
                        selectedCategory === category.id
                          ? "bg-[#F7DD0F] text-black shadow-lg animate-pulse font-bold"
                          : "bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-[#F7DD0F]/10 font-medium"
                      }`}
                      aria-label={`Filter by ${category.name}`}
                    >
                      <category.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      <span>{category.name}</span>
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-2 sm:my-3 opacity-50"></div>
              
              {/* Second row */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 w-full">
                {categories.slice(3).map((category, index) => (
                  <div key={category.id} className="relative animate-fade-in-up" style={{ animationDelay: `${(index + 3) * 0.1}s` }}>
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className={`flex items-center space-x-2 px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 rounded-full transition-all duration-200 cursor-pointer text-sm sm:text-base md:text-lg touch-target hover-scale hover-glow min-h-[44px] ${
                        selectedCategory === category.id
                          ? "bg-[#F7DD0F] text-black shadow-lg animate-pulse font-bold"
                          : "bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-[#F7DD0F]/10 font-medium"
                      }`}
                      aria-label={`Filter by ${category.name}`}
                    >
                      <category.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      <span>{category.name}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid - Mobile Optimized with Single Column */}
          <div 
            data-products-section
            className={`grid gap-4 sm:gap-6 md:gap-8 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1"
            }`}>
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="group animate-fade-in-up mobile-product-card hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="dopetech-card p-4 sm:p-6 h-full flex flex-col premium-card hover-scale rounded-2xl shadow-lg">
                  {/* Product Image */}
                  <div className="relative mb-4 sm:mb-5 image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-xl transition-transform duration-200 group-hover:scale-105"
                      loading="lazy"
                    />

                    {!product.inStock && (
                      <div className="absolute top-3 right-3 bg-gray-500 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                        Out of Stock
                      </div>
                    )}
                    <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity touch-target">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col content">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 sm:w-4 sm:h-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">
                        ({product.reviews})
                      </span>
                    </div>

                    <h3 className="font-bold text-base sm:text-lg mb-2 line-clamp-2 title leading-tight">{product.name}</h3>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="text-sm bg-[#F7DD0F]/20 text-[#F7DD0F] px-3 py-1.5 rounded-full font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="mt-auto">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-lg sm:text-xl font-bold price">Rs {product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            Rs {product.originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className={`w-full py-4 sm:py-5 px-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 touch-target button min-h-[48px] ${
                          product.inStock
                            ? "bg-[#F7DD0F] text-black hover:bg-[#F7DD0F]/90 hover:scale-105 shadow-lg active:scale-95 active:shadow-xl"
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

      {/* Dope Picks Marquee Section - Mobile Optimized */}
      <section className="pt-8 sm:pt-12 pb-20 sm:pb-24 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a0a 50%, #000000 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10 animate-fade-in-up">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
              Dope <span className="text-[#F7DD0F]">Picks</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400">
              Latest dope drops
            </p>
          </div>

          {/* Marquee Container - Mobile Optimized */}
          <div className="relative overflow-hidden">
            {/* Horizontal Scroll Container */}
            <div className="flex space-x-4 sm:space-x-6 md:space-x-8 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
              {/* Continuous Marquee Row */}
              <div className="flex animate-marquee space-x-4 sm:space-x-6 md:space-x-8">
                {/* First set of products */}
                {products.map((product, index) => (
                  <div key={`first-${product.id}`} className="group relative flex-shrink-0">
                    <div className="relative overflow-hidden rounded-2xl w-56 h-48 sm:w-64 sm:h-56 md:w-72 md:h-64 lg:w-80 lg:h-72">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-200 group-hover:scale-110 group-hover:rotate-1"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      
                      {/* Product Name Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                        <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">{product.name}</h3>
                        <p className="text-[#F7DD0F] font-bold text-base sm:text-lg md:text-xl">Rs {product.price}</p>
                      </div>
                      
                      {/* NEW Badge */}
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-xs font-bold shadow-lg">
                        NEW
                      </div>
                    </div>
                    
                    {/* Floating Action Button */}
                    <button
                      onClick={() => addToCart(product)}
                      className="absolute -bottom-2 -right-2 bg-[#F7DD0F] text-black p-2.5 sm:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:scale-110 hover:shadow-xl touch-target"
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {products.map((product, index) => (
                  <div key={`second-${product.id}`} className="group relative flex-shrink-0">
                    <div className="relative overflow-hidden rounded-2xl w-56 h-48 sm:w-64 sm:h-56 md:w-72 md:h-64 lg:w-80 lg:h-72">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-200 group-hover:scale-110 group-hover:rotate-1"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      
                      {/* Product Name Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                        <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">{product.name}</h3>
                        <p className="text-[#F7DD0F] font-bold text-base sm:text-lg md:text-xl">Rs {product.price}</p>
                      </div>
                      
                      {/* NEW Badge */}
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-xs font-bold shadow-lg">
                        NEW
                      </div>
                    </div>
                    
                    {/* Floating Action Button */}
                    <button
                      onClick={() => addToCart(product)}
                      className="absolute -bottom-2 -right-2 bg-[#F7DD0F] text-black p-2.5 sm:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:scale-110 hover:shadow-xl touch-target"
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Cart Sidebar - Mobile Optimized */}
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
              <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold">Shopping Cart</h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-colors touch-target"
                  style={{ minHeight: '44px', minWidth: '44px' }}
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 scrollbar-hide">
                {cart.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                    <p className="text-sm sm:text-base text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-xs sm:text-sm line-clamp-2 leading-tight">{item.name}</h3>
                          <p className="text-[#F7DD0F] font-bold text-sm sm:text-base">Rs {item.price}</p>
                        </div>
                        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 sm:p-1.5 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] rounded touch-target"
                            style={{ minHeight: '44px', minWidth: '44px' }}
                          >
                            <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <span className="w-6 sm:w-8 text-center font-medium text-sm sm:text-base">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 sm:p-1.5 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] rounded touch-target"
                            style={{ minHeight: '44px', minWidth: '44px' }}
                          >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 sm:p-1.5 hover:bg-red-100 dark:hover:bg-red-900/20 rounded text-red-500 touch-target"
                          style={{ minHeight: '44px', minWidth: '44px' }}
                        >
                          <X className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6">
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <span className="text-base sm:text-lg font-semibold">Total:</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#F7DD0F]">Rs {getCartTotal().toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-[#F7DD0F] text-black py-3 sm:py-3.5 md:py-4 px-4 rounded-xl font-medium hover:bg-[#F7DD0F]/90 transition-colors touch-target"
                    style={{ minHeight: '48px' }}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer - Mobile Optimized */}
      <footer className="bg-black py-4 sm:py-6 border-t-2 border-[#F7DD0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <img src="/images/dtechnepal.svg" alt="DopeTech" className="w-8 h-8 sm:w-10 sm:h-10 logo-adaptive" />
              <span className="text-xs sm:text-sm text-white jakarta-light">© 2025 DopeTech Nepal. All rights reserved.</span>
            </div>

            <div className="flex space-x-6 sm:space-x-8">
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-[#F7DD0F] transition-colors cursor-hover jakarta-light">
                Privacy Policy
              </a>
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-[#F7DD0F] transition-colors cursor-hover jakarta-light">
                Terms of Use
              </a>
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-[#F7DD0F] transition-colors cursor-hover jakarta-light">
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
    </>
  )
}
