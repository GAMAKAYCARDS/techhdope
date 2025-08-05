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
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#F7DD0F]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#F7DD0F]/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/dopetech-logo-new.png"
              alt="DopeTech"
              width={40}
              height={40}
              className="logo-adaptive"
            />
            <span className="text-white font-bold text-xl jakarta-light">DopeTech</span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F7DD0F] transition-all"
              />
            </div>

            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ShoppingBag className="w-6 h-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F7DD0F] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 jakarta-light">
          Your Setup,
          <span className="text-[#F7DD0F] block">Perfected.</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto jakarta-light">
          Premium tech gear from Nepal. Mechanical keyboards, gaming mice, wireless headphones, and more.
        </p>
        <button className="bg-[#F7DD0F] text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#F7DD0F]/90 transition-colors jakarta-light">
          Shop Now
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
} 