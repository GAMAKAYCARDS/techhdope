"use client"

import Image from 'next/image'
import { useState } from 'react'
import { ShoppingBag, Star, Heart } from 'lucide-react'

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

interface OptimizedProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function OptimizedProductCard({ product, onAddToCart }: OptimizedProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="group relative bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-2 md:top-3 left-2 md:left-3 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          -{product.discount}%
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={product.id <= 4} // Prioritize first 4 images
        />
      </div>

      {/* Content */}
      <div className="p-3 md:p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 dark:text-white flex-1 mr-2">
            {product.name}
          </h3>
          <button 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors touch-manipulation"
            style={{ minHeight: '44px', minWidth: '44px' }} // Touch-friendly minimum size
          >
            <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
          </button>
        </div>

        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-[#F7DD0F]">Rs {product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through ml-2">
                Rs {product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="w-full bg-[#F7DD0F] text-black py-3 md:py-2 px-4 rounded-lg font-medium hover:bg-[#F7DD0F]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation"
          style={{ minHeight: '48px' }} // Touch-friendly minimum height
        >
          <ShoppingBag className="w-4 h-4" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
} 