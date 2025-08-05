"use client"

import { useState, useMemo } from 'react'
import { Headphones, Keyboard, Mouse, Speaker } from 'lucide-react'
import OptimizedProductCard from './optimized-product-card'

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

interface ProductsSectionProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

const categories = [
  { id: 'all', name: 'All', icon: null },
  { id: 'keyboard', name: 'Keyboards', icon: Keyboard },
  { id: 'mouse', name: 'Mice', icon: Mouse },
  { id: 'audio', name: 'Audio', icon: Headphones },
  { id: 'speaker', name: 'Speakers', icon: Speaker },
]

export default function ProductsSection({ products, onAddToCart }: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [products, selectedCategory, searchTerm])

  return (
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4 jakarta-light">
            Featured Products
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 jakarta-light">
            Discover our premium collection of tech gear
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 mb-6 md:mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F7DD0F] touch-manipulation"
              style={{ minHeight: '48px' }} // Touch-friendly minimum height
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition-colors touch-manipulation ${
                    selectedCategory === category.id
                      ? 'bg-[#F7DD0F] text-black'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  style={{ minHeight: '48px' }} // Touch-friendly minimum height
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span className="text-sm md:text-base">{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <OptimizedProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
} 