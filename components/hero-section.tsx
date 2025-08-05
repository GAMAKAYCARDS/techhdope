"use client"

import Image from 'next/image'
import { Search, ShoppingBag } from 'lucide-react'

interface HeroSectionProps {
  cartCount: number
  onCartClick: () => void
}

export default function HeroSection({ cartCount, onCartClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#F7DD0F]/10 rounded-full blur-3xl animate-pulse animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#F7DD0F]/5 rounded-full blur-3xl animate-pulse delay-1000 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-in-down">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3">
            <Image
              src="/images/dopetech-logo-new.png"
              alt="DopeTech"
              width={32}
              height={32}
              className="w-8 h-8 md:w-10 md:h-10 logo-adaptive hover-scale"
            />
            <span className="text-white font-bold text-lg md:text-xl jakarta-light">DopeTech</span>
          </div>

          <div className="flex items-center space-x-3 md:space-x-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F7DD0F] transition-all premium-transition"
              />
            </div>

            <button
              onClick={onCartClick}
              className="relative p-2 md:p-3 hover:bg-white/10 rounded-lg transition-colors touch-manipulation hover-scale hover-glow"
              style={{ minHeight: '44px', minWidth: '44px' }} // Touch-friendly minimum size
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F7DD0F] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 jakarta-light animate-fade-in-up stagger-1">
          Your Setup,
          <span className="text-[#F7DD0F] block animate-fade-in-up stagger-2">Perfected.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto jakarta-light px-4 animate-fade-in-up stagger-3">
          Premium tech gear from Nepal. Mechanical keyboards, gaming mice, wireless headphones, and more.
        </p>
        <button 
          className="bg-[#F7DD0F] text-black px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-[#F7DD0F]/90 transition-colors jakarta-light touch-manipulation premium-button hover-lift animate-fade-in-up stagger-4"
          style={{ minHeight: '48px' }} // Touch-friendly minimum height
        >
          Shop Now
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce animate-fade-in-up stagger-5">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
} 