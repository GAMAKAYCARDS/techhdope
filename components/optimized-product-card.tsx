"use client"

import Image from 'next/image'
import { useState } from 'react'
import { ShoppingBag, Star, Heart, Eye } from 'lucide-react'

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
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div 
      className="group relative bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer premium-card hover-lift animate-fade-in-up border border-gray-100 dark:border-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${product.id * 0.1}s` }}
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-scale-in shadow-lg">
          -{product.discount}%
        </div>
      )}

      {/* Like Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation()
          setIsLiked(!isLiked)
        }}
        className="absolute top-3 right-3 z-10 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full transition-all touch-manipulation hover-scale hover-glow"
        style={{ minHeight: '44px', minWidth: '44px' }}
      >
        <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-400'}`} />
      </button>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse animate-shimmer" />
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-500 premium-transition ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={product.id <= 4}
        />
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full transition-all hover-scale">
            <Eye className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        {/* Product Info */}
        <div className="mb-3">
          <h3 className="font-semibold text-base md:text-lg line-clamp-2 text-gray-900 dark:text-white mb-2 leading-tight">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {product.description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-[#F7DD0F]">Rs {product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                Rs {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {!product.inStock && (
            <span className="text-sm text-red-500 font-medium">Out of Stock</span>
          )}
        </div>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 3).map((feature, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="w-full bg-[#F7DD0F] text-black py-4 px-4 rounded-xl font-semibold hover:bg-[#F7DD0F]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation premium-button hover-lift text-base"
          style={{ minHeight: '56px' }}
        >
          <ShoppingBag className="w-5 h-5" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
} 