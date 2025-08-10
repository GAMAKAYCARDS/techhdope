"use client"

import React, { useState, useEffect, useMemo } from "react"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  BarChart3, 
  TrendingUp, 
  Eye,
  Star,
  DollarSign,
  Package,
  LogOut,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  Lock,
  ArrowLeft
} from "lucide-react"
import { allProducts, type Product } from "@/lib/products-data"




interface AdminProduct extends Product {
  isNew?: boolean
  isEditing?: boolean
}

interface EditProductFormProps {
  product: AdminProduct
  onSave: (updatedData: Partial<Product>) => void
  onCancel: () => void
}

function EditProductForm({ product, onSave, onCancel }: EditProductFormProps) {
  const [editData, setEditData] = useState({
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    description: product.description,
    category: product.category,
    image: product.image,
    rating: product.rating,
    reviews: product.reviews,
    features: product.features,
    inStock: product.inStock,
    discount: product.discount
  })

  const handleSave = () => {
    onSave(editData)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Product Name</label>
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({...editData, name: e.target.value})}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <input
            type="text"
            value={editData.category}
            onChange={(e) => setEditData({...editData, category: e.target.value})}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Price (Rs)</label>
          <input
            type="number"
            value={editData.price}
            onChange={(e) => setEditData({...editData, price: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Original Price (Rs)</label>
          <input
            type="number"
            value={editData.originalPrice}
            onChange={(e) => setEditData({...editData, originalPrice: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="text"
            value={editData.image}
            onChange={(e) => setEditData({...editData, image: e.target.value})}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Rating</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={editData.rating}
            onChange={(e) => setEditData({...editData, rating: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Reviews Count</label>
          <input
            type="number"
            value={editData.reviews}
            onChange={(e) => setEditData({...editData, reviews: parseInt(e.target.value)})}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Discount (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={editData.discount}
            onChange={(e) => setEditData({...editData, discount: parseInt(e.target.value)})}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={editData.inStock}
              onChange={(e) => setEditData({...editData, inStock: e.target.checked})}
              className="rounded border-white/10 bg-white/5 text-[#F7DD0F] focus:ring-[#F7DD0F]"
            />
            <span className="text-sm font-medium">In Stock</span>
          </label>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={handleSave}
          className="flex-1 px-4 py-2 bg-[#F7DD0F] text-black rounded-lg hover:bg-[#F7DD0F]/90 transition-colors"
        >
          Save Changes
        </button>
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

interface Analytics {
  totalProducts: number
  totalSales: number
  totalViews: number
  totalInteractions: number
  topProducts: Product[]
  recentActivity: Array<{
    id: string
    type: 'sale' | 'view' | 'interaction'
    product: string
    timestamp: Date
    value?: number
  }>
}

export default function DopeTechAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [products, setProducts] = useState<AdminProduct[]>(allProducts)
  const [orders, setOrders] = useState<any[]>([])

  // Load edited products from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Load orders
        const storedOrders = localStorage.getItem('ordersV1')
        if (storedOrders) {
          try { setOrders(JSON.parse(storedOrders)) } catch {}
        }
        const adminProducts = localStorage.getItem('adminProducts')
        const originalProductEdits = localStorage.getItem('originalProductEdits')
        
        let result = [...allProducts]
        
        // Apply original product edits if they exist
        if (originalProductEdits) {
          try {
            const parsedEdits = JSON.parse(originalProductEdits)
            result = result.map(product => {
              const edit = parsedEdits.find((p: any) => p.id === product.id)
              return edit || product
            })
          } catch (e) {
            console.error('Error parsing original product edits:', e)
          }
        }
        
        // Add admin-added products if they exist
        if (adminProducts) {
          try {
            const parsed = JSON.parse(adminProducts)
            const adminAddedProducts = parsed.filter((p: any) => p.id > 5)
            result = [...result, ...adminAddedProducts]
          } catch (e) {
            console.error('Error parsing admin products:', e)
          }
        }
        
        setProducts(result)
  
      } catch (error) {
        console.error('Error loading products from localStorage:', error)
      }
    }
  }, [])

  // Listen for new orders placed
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handler = () => {
      try {
        const storedOrders = localStorage.getItem('ordersV1')
        if (storedOrders) setOrders(JSON.parse(storedOrders))
      } catch {}
    }
    window.addEventListener('orderPlaced', handler)
    return () => window.removeEventListener('orderPlaced', handler)
  }, [])

  const [searchQuery, setSearchQuery] = useState("")
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [gifFile, setGifFile] = useState<File | null>(null)
  const [gifUrl, setGifUrl] = useState("")
  const [isUploadingGif, setIsUploadingGif] = useState(false)

  // Promo grid arrangement state
  const [promoOrder, setPromoOrder] = useState<number[]>([])
  const [draggedPromoIndex, setDraggedPromoIndex] = useState<number | null>(null)

  const [analytics, setAnalytics] = useState<Analytics>({
    totalProducts: allProducts.length,
    totalSales: 15420,
    totalViews: 2847,
    totalInteractions: 892,
    topProducts: allProducts.slice(0, 5),
    recentActivity: [
      {
        id: "1",
        type: "sale",
        product: "AJ139 MAX TRI MODE GAMING MOUSE",
        timestamp: new Date(),
        value: 299.99
      },
      {
        id: "2",
        type: "view",
        product: "Mechanical Keyboard",
        timestamp: new Date(Date.now() - 1000 * 60 * 30)
      },
      {
        id: "3",
        type: "interaction",
        product: "Wireless Headphones",
        timestamp: new Date(Date.now() - 1000 * 60 * 60)
      }
    ]
  })



  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    originalPrice: 0,
    description: "",
    category: "keyboard",
    image: "",
    rating: 0,
    reviews: 0,
    features: [""],
    inStock: true,
    discount: 0
  })



  // Check for existing admin session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // For development, let's clear any existing session to ensure security
        // localStorage.removeItem("adminAuthenticated")
        // localStorage.removeItem("adminLoginTime")
        
        const isAdmin = localStorage.getItem("adminAuthenticated") === "true"
        const loginTime = localStorage.getItem("adminLoginTime")
        
        if (isAdmin && loginTime) {
          const loginDate = new Date(loginTime)
          const now = new Date()
          const hoursSinceLogin = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60)
          
          if (hoursSinceLogin < 8) {
            setIsAuthenticated(true)
          } else {
            localStorage.removeItem("adminAuthenticated")
            localStorage.removeItem("adminLoginTime")
            setIsAuthenticated(false)
          }
        } else {
          // Ensure we're not authenticated if no valid session
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Error checking admin session:", error)
        setIsAuthenticated(false)
      }
    }
  }, [])

  // Load saved promo order
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem('promoOrderV1')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setPromoOrder(parsed.filter((id: any) => Number.isFinite(id)))
        }
      }
    } catch (e) {
      console.error('Error loading promo order:', e)
    }
  }, [])

  // Compute promo candidates and apply ordering (hiddenOnHome excluded)
  const visiblePromoProducts = useMemo(() => {
    const visible = products.filter((p: any) => !p.hiddenOnHome)
    const orderSet = new Set(promoOrder)
    return [
      ...promoOrder
        .map((id) => visible.find((p) => p.id === id))
        .filter((p): p is AdminProduct => !!p),
      ...visible.filter((p) => !orderSet.has(p.id)),
    ]
  }, [products, promoOrder])

  // DnD handlers
  const handlePromoDragStart = (index: number) => {
    setDraggedPromoIndex(index)
  }

  const handlePromoDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const persistPromoOrder = (ids: number[]) => {
    setPromoOrder(ids)
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('promoOrderV1', JSON.stringify(ids))
        window.dispatchEvent(new Event('promoOrderUpdated'))
      }
    } catch {}
  }

  const handlePromoDrop = (dropIndex: number) => {
    if (draggedPromoIndex === null || draggedPromoIndex === dropIndex) return
    const ids = visiblePromoProducts.map((p) => p.id)
    const next = [...ids]
    const [moved] = next.splice(draggedPromoIndex, 1)
    if (moved === undefined) return
    next.splice(Math.min(dropIndex, next.length), 0, moved)
    // Keep full priority list ordered; append any other known ids from previous order
    const merged = [...next, ...promoOrder.filter((id) => !next.includes(id))]
    persistPromoOrder(merged)
    setDraggedPromoIndex(null)
  }

  const handleResetPromoOrder = () => {
    setPromoOrder([])
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('promoOrderV1')
        window.dispatchEvent(new Event('promoOrderUpdated'))
      }
    } catch {}
  }



  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handleAdminLogin = () => {
    if (adminPassword === "dopetech2024") {
      setIsAuthenticated(true)
      setAdminPassword("")
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem("adminAuthenticated", "true")
          localStorage.setItem("adminLoginTime", new Date().toISOString())

        } catch (error) {
          console.error("Error saving admin session:", error)
        }
      }
    } else {
      alert("Invalid admin password!")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem("adminAuthenticated")
        localStorage.removeItem("adminLoginTime")
        // Force navigation back to the login screen to ensure a clean state
        window.location.href = '/doptechadmin/'
      } catch (error) {
        console.error("Error clearing admin session:", error)
      }
    }
  }

  const handleAddProduct = () => {
    const product: AdminProduct = {
      id: Date.now(),
      ...newProduct,
      isNew: true
    }
    
    // Update local state
    const updatedProducts = [...products, product]
    setProducts(updatedProducts)
    
    // Save only admin-added products to localStorage (products with ID > 5)
    const adminAddedProducts = updatedProducts.filter(p => p.id > 5)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('adminProducts', JSON.stringify(adminAddedProducts))
        // Dispatch custom event to notify main site
        window.dispatchEvent(new Event('adminProductsUpdated'))
      } catch (error) {
        console.error("Error saving admin products:", error)
      }
    }
    
    setNewProduct({
      name: "",
      price: 0,
      originalPrice: 0,
      description: "",
      category: "keyboard",
      image: "",
      rating: 0,
      reviews: 0,
      features: [""],
      inStock: true,
      discount: 0
    })
    setIsAddingProduct(false)

  }

  const handleEditProduct = (productId: number) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, isEditing: !p.isEditing } : p
    ))
  }

  const handleSaveProduct = (productId: number, updatedData: Partial<Product>) => {
    const updatedProducts = products.map(p => 
      p.id === productId ? { ...p, ...updatedData, isEditing: false } : p
    )
    setProducts(updatedProducts)
    
    // Save to localStorage for all edited products
    if (typeof window !== 'undefined') {
      try {
        // Save admin-added products (products with ID > 5)
        const adminAddedProducts = updatedProducts.filter(p => p.id > 5)
        localStorage.setItem('adminProducts', JSON.stringify(adminAddedProducts))
        
        // Save original product edits (products with ID <= 5)
        const originalProductEdits = updatedProducts.filter(p => p.id <= 5)
        localStorage.setItem('originalProductEdits', JSON.stringify(originalProductEdits))
        
        // Dispatch custom event to notify main site
        window.dispatchEvent(new Event('adminProductsUpdated'))

      } catch (error) {
        console.error("Error saving admin products:", error)
      }
    }
  }

  const handleDeleteProduct = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter(p => p.id !== productId)
      setProducts(updatedProducts)
      
      // Save only admin-added products to localStorage (products with ID > 5)
      const adminAddedProducts = updatedProducts.filter(p => p.id > 5)
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('adminProducts', JSON.stringify(adminAddedProducts))
          // Dispatch custom event to notify main site
          window.dispatchEvent(new Event('adminProductsUpdated'))
        } catch (error) {
          console.error("Error saving admin products:", error)
        }
      }
    }
  }

  const handleGifFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type === 'image/gif') {
        if (file.size <= 10 * 1024 * 1024) { // 10MB limit
          setGifFile(file)
          setGifUrl("") // Clear URL when file is selected
        } else {
          alert("File size must be less than 10MB")
        }
      } else {
        alert("Please select a GIF file")
      }
    }
  }

  const handleGifUpload = async () => {
    if (!gifFile && !gifUrl) {
      alert("Please select a GIF file or enter a URL")
      return
    }

    setIsUploadingGif(true)
    
    try {
      let gifPath = ""
      
      if (gifFile) {
        // For file upload, we'll simulate saving to localStorage
        // In a real app, you'd upload to a server
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          if (typeof window !== 'undefined') {
            localStorage.setItem('customGifData', result)
            localStorage.setItem('customGifPath', '/gif/custom-gif.gif')
            window.dispatchEvent(new Event('gifUpdated'))
            alert("GIF uploaded successfully! The main site will now use your custom GIF.")
          }
        }
        reader.readAsDataURL(gifFile)
      } else if (gifUrl) {
        // For URL, save the URL to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('customGifUrl', gifUrl)
          localStorage.setItem('customGifPath', gifUrl)
          window.dispatchEvent(new Event('gifUpdated'))
          alert("GIF URL saved successfully! The main site will now use your custom GIF.")
        }
      }
      
      // Reset form
      setGifFile(null)
      setGifUrl("")
      const fileInput = document.getElementById('gif-upload') as HTMLInputElement
      if (fileInput) fileInput.value = ""
      
    } catch (error) {
      console.error("Error uploading GIF:", error)
      alert("Error uploading GIF. Please try again.")
    } finally {
      setIsUploadingGif(false)
    }
  }

  const handleResetGif = () => {
    if (confirm("Are you sure you want to reset to the default GIF?")) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('customGifData')
        localStorage.removeItem('customGifUrl')
        localStorage.removeItem('customGifPath')
        window.dispatchEvent(new Event('gifUpdated'))
        alert("GIF reset to default successfully!")
      }
    }
  }



  // Force authentication check - ensure we're not bypassing security
  if (typeof window !== 'undefined') {
    try {
      const storedAuth = localStorage.getItem("adminAuthenticated") === "true"
      if (!storedAuth && isAuthenticated) {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error("Error checking authentication:", error)
      setIsAuthenticated(false)
    }
  }
  
  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#141414]/80 backdrop-blur-md shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-5">
              <img src="/logo/dopelogo.svg" alt="DopeTech" className="w-14 h-14" />
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">DopeTech Admin</h1>
            <p className="text-gray-400">Secure access to admin panel</p>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Admin Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F7DD0F] focus:border-transparent"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            
            <button
              onClick={handleAdminLogin}
              className="w-full px-4 py-3 rounded-xl bg-[#F7DD0F] text-black font-semibold hover:bg-[#F7DD0F]/90 transition-colors shadow-lg hover:shadow-[#F7DD0F]/20"
            >
              Login to Admin Panel
            </button>

            <div className="text-center">
              <a 
                href="/"
                className="inline-flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Main Site</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen text-white gradient-bg">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <h1 className="text-xl sm:text-2xl font-bold text-[#F7DD0F]">DopeTech Admin</h1>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                <span>Admin Mode</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <a 
                href="/"
                className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>View Site</span>
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="rounded-xl p-4 sm:p-6 border border-white/10 bg-white/5 hover:border-[#F7DD0F]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#F7DD0F]/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm font-medium">Total Products</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{analytics.totalProducts}</p>
              </div>
              <div className="p-2 sm:p-3 bg-[#F7DD0F]/10 rounded-lg">
                <Package className="w-6 h-6 sm:w-8 sm:h-8 text-[#F7DD0F]" />
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="lg:col-span-4 rounded-xl p-6 border border-white/10 bg-white/5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#F7DD0F]" />
              <span>Orders</span>
              <span className="ml-auto text-sm text-gray-400">{orders.length} total</span>
            </h3>
            {orders.length === 0 ? (
              <p className="text-gray-400">No orders yet.</p>
            ) : (
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                {orders.slice().reverse().map((o) => (
                  <div key={o.orderId} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-sm text-gray-300">Order ID: <span className="font-semibold text-white">{o.orderId}</span></div>
                      <div className="text-sm text-gray-300">Date: {new Date(o.timestamp).toLocaleString()}</div>
                      <div className="text-sm text-[#F7DD0F] font-bold">Rs {o.totals.finalTotal.toLocaleString()}</div>
                    </div>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-white/5 rounded p-3 border border-white/10">
                        <div className="text-xs text-gray-400 mb-1">Customer</div>
                        <div className="text-sm text-white">{o.customer.fullName}</div>
                        <div className="text-xs text-gray-300 break-all">{o.customer.email}</div>
                        <div className="text-xs text-gray-300">{o.customer.phone}</div>
                        {o.customer.fullAddress && <div className="text-xs text-gray-400 mt-1">{o.customer.fullAddress}</div>}
                      </div>
                      <div className="bg-white/5 rounded p-3 border border-white/10">
                        <div className="text-xs text-gray-400 mb-1">Items</div>
                        <ul className="text-sm text-white space-y-1 list-disc pl-4">
                          {o.items.map((it: any) => (
                            <li key={`${o.orderId}-${it.id}`}>{it.name} x{it.quantity} — Rs {it.price}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white/5 rounded p-3 border border-white/10">
                        <div className="text-xs text-gray-400 mb-1">Payment</div>
                        <div className="text-sm text-white">{o.payment.option === 'deposit' ? '10% deposit' : 'Full payment'}</div>
                        <div className="text-sm text-[#F7DD0F]">Rs {o.payment.amount.toLocaleString()}</div>
                        {o.receiptImage && (
                          <a href={o.receiptImage} target="_blank" rel="noreferrer" className="inline-block mt-2 text-sm text-[#F7DD0F] underline">View receipt</a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl p-4 sm:p-6 border border-white/10 bg-white/5 hover:border-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm font-medium">Total Sales</p>
                <p className="text-xl sm:text-2xl font-bold text-white">Rs {analytics.totalSales.toLocaleString()}</p>
              </div>
              <div className="p-2 sm:p-3 bg-green-500/10 rounded-lg">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4 sm:p-6 border border-white/10 bg-white/5 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm font-medium">Total Views</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{analytics.totalViews.toLocaleString()}</p>
              </div>
              <div className="p-2 sm:p-3 bg-blue-500/10 rounded-lg">
                <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4 sm:p-6 border border-white/10 bg-white/5 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm font-medium">Interactions</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{analytics.totalInteractions.toLocaleString()}</p>
              </div>
              <div className="p-2 sm:p-3 bg-purple-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Top Products & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Top Products */}
          <div className="rounded-lg p-6 border border-white/10 bg-white/5">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Star className="w-5 h-5 text-[#F7DD0F]" />
              <span>Top Products</span>
            </h3>
            <div className="space-y-3">
              {analytics.topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-8 h-8 bg-[#F7DD0F] text-black rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-gray-400 text-xs">Rs {product.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#F7DD0F] font-bold">{product.rating}★</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-lg p-6 border border-white/10 bg-white/5">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-[#F7DD0F]" />
              <span>Recent Activity</span>
            </h3>
            <div className="space-y-3">
              {analytics.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'sale' ? 'bg-green-500' : 
                    activity.type === 'view' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}>
                    {activity.type === 'sale' ? <DollarSign className="w-4 h-4" /> :
                     activity.type === 'view' ? <Eye className="w-4 h-4" /> :
                     <TrendingUp className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.product}</p>
                    <p className="text-gray-400 text-xs">
                      {activity.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {activity.value && (
                    <p className="text-[#F7DD0F] font-bold">Rs {activity.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>



           

         

                   {/* GIF Management */}
          <div className="rounded-lg p-6 border border-white/10 bg-white/5 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">GIF Management</h2>
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-[#F7DD0F]" />
                <span className="text-sm text-gray-400">Main Site GIF</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current GIF Preview */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Current GIF</h3>
                 <div className="rounded-lg p-4 bg-white/5 border border-white/10">
                  <img 
                    src="/gif/doptechgif.gif" 
                    alt="Current Main GIF" 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-400 mt-2">Path: /gif/doptechgif.gif</p>
                </div>
              </div>
              
              {/* Upload New GIF */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Upload New GIF</h3>
                 <div className="rounded-lg p-4 bg-white/5 border border-white/10">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">GIF File</label>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-[#F7DD0F] transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-400 mb-2">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">GIF files only, max 10MB</p>
                        <input 
                          type="file" 
                          accept=".gif"
                          className="hidden"
                          id="gif-upload"
                          onChange={handleGifFileChange}
                        />
                        <label 
                          htmlFor="gif-upload"
                          className="inline-block px-4 py-2 bg-[#F7DD0F] text-black rounded-lg hover:bg-[#F7DD0F]/90 transition-colors cursor-pointer mt-2"
                        >
                          Choose File
                        </label>
                        {gifFile && (
                          <p className="text-sm text-[#F7DD0F] mt-2">
                            Selected: {gifFile.name} ({(gifFile.size / 1024 / 1024).toFixed(2)}MB)
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">GIF URL (Alternative)</label>
                      <input
                        type="text"
                        placeholder="https://example.com/your-gif.gif"
                        value={gifUrl}
                        onChange={(e) => setGifUrl(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <button 
                        onClick={handleGifUpload}
                        disabled={isUploadingGif || (!gifFile && !gifUrl)}
                        className="flex-1 px-4 py-2 bg-[#F7DD0F] text-black rounded-lg hover:bg-[#F7DD0F]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUploadingGif ? "Uploading..." : "Upload & Replace"}
                      </button>
                      <button 
                        onClick={handleResetGif}
                        className="flex-1 px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Reset to Default
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Promo Grid Arrangement */}
          <div className="rounded-lg p-6 border border-white/10 bg-white/5 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Promo Grid Arrangement</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 hidden sm:inline">Drag to reorder. First 6 appear on mobile; next 6 fill desktop extra row.</span>
                <button
                  onClick={handleResetPromoOrder}
                   className="px-3 py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-sm"
                >
                  Reset Order
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {visiblePromoProducts.map((p, index) => (
                <div
                  key={`promo-admin-${p.id}`}
                  draggable
                  onDragStart={() => handlePromoDragStart(index)}
                  onDragOver={handlePromoDragOver}
                  onDrop={() => handlePromoDrop(index)}
                   className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-move"
                  title={p.name}
                >
                  <div className="absolute top-2 left-2 z-10 inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-[#F7DD0F] text-black shadow">
                    {index + 1}
                  </div>
                  <img src={p.image} alt={p.name} className="w-full h-24 object-cover opacity-90" />
                  <div className="p-2">
                    <p className="text-xs font-medium line-clamp-2">{p.name}</p>
                    <p className="text-xs text-gray-400">Rs {p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Management */}
          <div className="rounded-lg p-4 sm:p-6 border border-white/10 bg-white/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <h2 className="text-lg sm:text-xl font-bold">Product Management</h2>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  onClick={() => {
                    setIsAddingProduct(true)
                  }}
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 bg-[#F7DD0F] text-black rounded-lg hover:bg-[#F7DD0F]/90 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium">Add Product</span>
                </button>
              </div>
            </div>

                     {/* Enhanced Search */}
           <div className="mb-4 sm:mb-6">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
               <input
                 type="text"
                 placeholder="Search products..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-10 pr-4 py-2.5 sm:py-3 sm:py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F] focus:border-[#F7DD0F] transition-all duration-200 text-white placeholder-gray-400 text-sm sm:text-base"
               />
             </div>
           </div>

          {/* Add Product Modal */}
          {isAddingProduct && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto border border-white/10 bg-[#141414]/80 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Add New Product</h3>
                  <button
                    onClick={() => setIsAddingProduct(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Product Name</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
                    />
                  </div>
                  
                                     <div>
                     <label className="block text-sm font-medium mb-2">Category</label>
                     <input
                       type="text"
                       value={newProduct.category}
                       onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
                       placeholder="e.g., keyboard, mouse, audio"
                     />
                   </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Price (Rs)</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Original Price (Rs)</label>
                    <input
                      type="number"
                      value={newProduct.originalPrice}
                      onChange={(e) => setNewProduct({...newProduct, originalPrice: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <input
                      type="text"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={newProduct.rating}
                      onChange={(e) => setNewProduct({...newProduct, rating: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Reviews Count</label>
                    <input
                      type="number"
                      value={newProduct.reviews}
                      onChange={(e) => setNewProduct({...newProduct, reviews: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Discount (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newProduct.discount}
                      onChange={(e) => setNewProduct({...newProduct, discount: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newProduct.inStock}
                        onChange={(e) => setNewProduct({...newProduct, inStock: e.target.checked})}
                        className="rounded border-gray-600 bg-gray-700 text-[#F7DD0F] focus:ring-[#F7DD0F]"
                      />
                      <span className="text-sm font-medium">In Stock</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleAddProduct}
                    className="flex-1 px-4 py-2 bg-[#F7DD0F] text-black rounded-lg hover:bg-[#F7DD0F]/90 transition-colors"
                  >
                    Add Product
                  </button>
                  <button
                    onClick={() => setIsAddingProduct(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Display */}
          <div className="space-y-4">
            {/* Mobile Cards View */}
            <div className="block lg:hidden space-y-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="rounded-lg p-4 border border-white/10 bg-white/5">
                  <div className="flex items-start space-x-3 mb-3">
                    <img src={product.image} alt={product.name} className="w-16 h-16 rounded object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1 truncate text-white">{product.name}</h3>
                      <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-1 bg-[#F7DD0F]/20 text-[#F7DD0F] rounded-full text-xs font-medium border border-[#F7DD0F]/30">
                          {product.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          product.inStock 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-[#F7DD0F] fill-current" />
                            <span className="text-xs">{product.rating}</span>
                            <span className="text-gray-400 text-xs">({product.reviews})</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm text-[#F7DD0F]">Rs {product.price}</p>
                          {product.originalPrice > product.price && (
                            <p className="text-gray-400 text-xs line-through">Rs {product.originalPrice}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Actions */}
                  <div className="flex items-center justify-end space-x-2 pt-3 border-t border-white/10">
                    <button
                      onClick={() => handleEditProduct(product.id)}
                      className="px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-all duration-200 text-blue-400 text-sm flex items-center space-x-1"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-all duration-200 text-red-400 text-sm flex items-center space-x-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                  
                  {/* Edit Product Form - Mobile */}
                  {product.isEditing && (
                    <div className="mt-4 p-4 rounded-lg border border-white/10 bg-white/5">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base font-semibold">Edit Product</h4>
                        <button
                          onClick={() => handleEditProduct(product.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <EditProductForm 
                        product={product}
                        onSave={(updatedData) => {
                          handleSaveProduct(product.id, updatedData)
                          if (product.id > 5) {
                            const updatedProducts = products.map(p => 
                              p.id === product.id ? { ...p, ...updatedData, isEditing: false } : p
                            )
                            const adminAddedProducts = updatedProducts.filter(p => p.id > 5)
                            if (typeof window !== 'undefined') {
                              try {
                                localStorage.setItem('adminProducts', JSON.stringify(adminAddedProducts))
                                window.dispatchEvent(new Event('adminProductsUpdated'))
                              } catch (error) {
                                console.error("Error saving admin products:", error)
                              }
                            }
                          }
                        }}
                        onCancel={() => handleEditProduct(product.id)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Desktop Table - Hidden on mobile */}
            <div className="hidden lg:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Product</th>
                      <th className="text-left py-3 px-4">Category</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Rating</th>
                      <th className="text-left py-3 px-4">Stock</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <React.Fragment key={product.id}>
                        <tr className="border-b border-white/10 hover:bg-white/5">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-gray-400 text-sm">{product.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-white/10 rounded text-xs border border-white/10">{product.category}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">Rs {product.price}</p>
                              {product.originalPrice > product.price && (
                                <p className="text-gray-400 text-sm line-through">Rs {product.originalPrice}</p>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-[#F7DD0F] fill-current" />
                              <span>{product.rating}</span>
                              <span className="text-gray-400">({product.reviews})</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              product.inStock ? 'bg-green-600' : 'bg-red-600'
                            }`}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEditProduct(product.id)}
                                className="p-1 text-blue-400 hover:text-blue-300"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-1 text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        
                        {/* Edit Product Form */}
                        {product.isEditing && (
                          <tr key={`edit-${product.id}`} className="bg-white/5">
                            <td colSpan={6} className="py-4 px-4">
                              <div className="rounded-lg p-4 border border-white/10 bg-white/5">
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="text-lg font-semibold">Edit Product</h4>
                                  <button
                                    onClick={() => handleEditProduct(product.id)}
                                    className="text-gray-400 hover:text-white"
                                  >
                                    <X className="w-5 h-5" />
                                  </button>
                                </div>
                                
                                <EditProductForm 
                                  product={product}
                                  onSave={(updatedData) => {
                                    handleSaveProduct(product.id, updatedData)
                                    if (product.id > 5) {
                                      const updatedProducts = products.map(p => 
                                        p.id === product.id ? { ...p, ...updatedData, isEditing: false } : p
                                      )
                                      const adminAddedProducts = updatedProducts.filter(p => p.id > 5)
                                      if (typeof window !== 'undefined') {
                                        try {
                                          localStorage.setItem('adminProducts', JSON.stringify(adminAddedProducts))
                                          window.dispatchEvent(new Event('adminProductsUpdated'))
                                        } catch (error) {
                                          console.error("Error saving admin products:", error)
                                        }
                                      }
                                    }
                                  }}
                                  onCancel={() => handleEditProduct(product.id)}
                                />
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Enhanced Mobile Product Cards */}
            <div className="lg:hidden space-y-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="rounded-xl p-4 border border-white/10 bg-white/5 hover:border-[#F7DD0F]/30 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-start space-x-3 mb-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0 shadow-md" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1 truncate text-white">{product.name}</h3>
                      <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-[#F7DD0F]/20 text-[#F7DD0F] rounded-full text-xs font-medium border border-[#F7DD0F]/30">{product.category}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.inStock ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-bold text-sm text-[#F7DD0F]">Rs {product.price}</p>
                      {product.originalPrice > product.price && (
                        <p className="text-gray-400 text-xs line-through">Rs {product.originalPrice}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-[#F7DD0F] fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-gray-400 text-xs">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleEditProduct(product.id)}
                      className="flex items-center space-x-1 px-3 py-2 text-blue-400 hover:text-blue-300 text-xs bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-all duration-200"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex items-center space-x-1 px-3 py-2 text-red-400 hover:text-red-300 text-xs bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                  
                  {/* Edit Product Form for Mobile */}
                  {product.isEditing && (
                    <div className="mt-4 rounded-lg p-4 border border-white/10 bg-white/5">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base font-semibold">Edit Product</h4>
                        <button
                          onClick={() => handleEditProduct(product.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <EditProductForm 
                        product={product}
                        onSave={(updatedData) => {
                          handleSaveProduct(product.id, updatedData)
                          if (product.id > 5) {
                            const updatedProducts = products.map(p => 
                              p.id === product.id ? { ...p, ...updatedData, isEditing: false } : p
                            )
                            const adminAddedProducts = updatedProducts.filter(p => p.id > 5)
                            if (typeof window !== 'undefined') {
                              try {
                                localStorage.setItem('adminProducts', JSON.stringify(adminAddedProducts))
                                window.dispatchEvent(new Event('adminProductsUpdated'))
                              } catch (error) {
                                console.error("Error saving admin products:", error)
                              }
                            }
                          }
                        }}
                        onCancel={() => handleEditProduct(product.id)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
