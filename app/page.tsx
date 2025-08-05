"use client"

import { useState, useEffect, useMemo } from "react"
import dynamic from 'next/dynamic'
import HeroSection from "@/components/hero-section"
import ProductsSection from "@/components/products-section"
import DVDBouncer from "@/components/dvd-bouncer"
import CursorTracker from "@/components/cursor-tracker"

// Lazy load heavy components
const LazyAIChat = dynamic(() => import('@/components/lazy-ai-chat'), {
  loading: () => <div className="fixed bottom-4 right-4 w-12 h-12 bg-[#F7DD0F] rounded-full animate-pulse" />,
  ssr: false
})

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
    name: "DopeTech Gaming Keycap Set",
    price: 79.99,
    originalPrice: 99.99,
    image: "/products/key.png",
    category: "keyboard",
    rating: 0,
    reviews: 0,
    description: "Custom PBT keycaps with RGB compatibility",
    features: ["PBT Material", "RGB Compatible", "Custom Design"],
    inStock: true,
    discount: 20
  }
]

export default function DopeTechEcommerce() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)

  // Memoize cart calculations
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }, [cart])

  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }, [cart])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const checkAdminAuth = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const adminParam = urlParams.get('admin')
      if (adminParam === 'true') {
        setIsAdmin(true)
      }
    }
    checkAdminAuth()
  }, [])

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <HeroSection 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Products Section */}
      <ProductsSection 
        products={products}
        onAddToCart={addToCart}
      />

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex animate-fade-in-right">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-sm md:max-w-md bg-white dark:bg-gray-900 shadow-xl animate-slide-in-up">
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Shopping Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors touch-manipulation hover-scale premium-transition"
                  style={{ minHeight: '44px', minWidth: '44px' }} // Touch-friendly minimum size
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12 animate-fade-in-up">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {cart.map((item, index) => (
                      <div 
                        key={item.id} 
                        className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg animate-fade-in-up premium-transition hover-lift"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm line-clamp-2 text-gray-900 dark:text-white">{item.name}</h3>
                          <p className="text-[#F7DD0F] font-bold text-sm md:text-base">Rs {item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] rounded transition-colors touch-manipulation hover-scale premium-transition"
                            style={{ minHeight: '44px', minWidth: '44px' }} // Touch-friendly minimum size
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center text-sm md:text-base">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] rounded transition-colors touch-manipulation hover-scale premium-transition"
                            style={{ minHeight: '44px', minWidth: '44px' }} // Touch-friendly minimum size
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded text-red-500 transition-colors touch-manipulation hover-scale premium-transition"
                          style={{ minHeight: '44px', minWidth: '44px' }} // Touch-friendly minimum size
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 md:p-6 animate-fade-in-up">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-base md:text-lg font-semibold">Total:</span>
                    <span className="text-xl md:text-2xl font-bold text-[#F7DD0F]">Rs {cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    className="w-full bg-[#F7DD0F] text-black py-3 md:py-3 px-4 rounded-lg font-medium hover:bg-[#F7DD0F]/90 transition-colors touch-manipulation premium-button hover-lift"
                    style={{ minHeight: '48px' }} // Touch-friendly minimum height
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black py-12 md:py-16 border-t-2 border-[#F7DD0F] animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <img src="/images/dopetech-logo-new.png" alt="DopeTech" className="w-8 h-8 md:w-10 md:h-10 logo-adaptive hover-scale" />
              <span className="text-xs md:text-sm text-white jakarta-light">© 2025 DopeTech Nepal. All rights reserved.</span>
            </div>

            <div className="flex space-x-6 md:space-x-8">
              <a href="#" className="text-xs md:text-sm text-gray-400 hover:text-[#F7DD0F] transition-colors cursor-hover jakarta-light premium-transition hover-scale">
                Privacy Policy
              </a>
              <a href="#" className="text-xs md:text-sm text-gray-400 hover:text-[#F7DD0F] transition-colors cursor-hover jakarta-light premium-transition hover-scale">
                Terms of Use
              </a>
              <a href="#" className="text-xs md:text-sm text-gray-400 hover:text-[#F7DD0F] transition-colors cursor-hover jakarta-light premium-transition hover-scale">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Lazy Loaded AI Chat Assistant */}
      <LazyAIChat
        products={products}
        onAddToCart={addToCart}
      />

      {/* Background Effects */}
      <DVDBouncer />
      <CursorTracker />
    </div>
  )
}
