"use client"

import React, { useState, useEffect } from "react"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  BarChart3, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Eye,
  Star,
  DollarSign,
  Package,
  Settings,
  LogOut,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  Tag,
  DollarSign as PriceIcon,
  FileText,
  CheckCircle,
  AlertCircle,
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
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <input
            type="text"
            value={editData.category}
            onChange={(e) => setEditData({...editData, category: e.target.value})}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Price (Rs)</label>
          <input
            type="number"
            value={editData.price}
            onChange={(e) => setEditData({...editData, price: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Original Price (Rs)</label>
          <input
            type="number"
            value={editData.originalPrice}
            onChange={(e) => setEditData({...editData, originalPrice: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="text"
            value={editData.image}
            onChange={(e) => setEditData({...editData, image: e.target.value})}
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
            value={editData.rating}
            onChange={(e) => setEditData({...editData, rating: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Reviews Count</label>
          <input
            type="number"
            value={editData.reviews}
            onChange={(e) => setEditData({...editData, reviews: parseInt(e.target.value)})}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
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
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={editData.inStock}
              onChange={(e) => setEditData({...editData, inStock: e.target.checked})}
              className="rounded border-gray-600 bg-gray-700 text-[#F7DD0F] focus:ring-[#F7DD0F]"
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
          className="flex-1 px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
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

  // Load edited products from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
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
        console.log('Loaded products from localStorage:', result)
      } catch (error) {
        console.error('Error loading products from localStorage:', error)
      }
    }
  }, [])

  const [searchQuery, setSearchQuery] = useState("")
  const [isAddingProduct, setIsAddingProduct] = useState(false)

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
        
        console.log("Checking admin session:", { isAdmin, loginTime })
        
        if (isAdmin && loginTime) {
          const loginDate = new Date(loginTime)
          const now = new Date()
          const hoursSinceLogin = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60)
          
          console.log("Hours since login:", hoursSinceLogin)
          
          if (hoursSinceLogin < 8) {
            setIsAuthenticated(true)
            console.log("Valid session found, authenticated")
          } else {
            localStorage.removeItem("adminAuthenticated")
            localStorage.removeItem("adminLoginTime")
            setIsAuthenticated(false)
            console.log("Session expired, logged out")
          }
        } else {
          // Ensure we're not authenticated if no valid session
          setIsAuthenticated(false)
          console.log("No valid session found, showing login")
        }
      } catch (error) {
        console.error("Error checking admin session:", error)
        setIsAuthenticated(false)
      }
    }
  }, [])



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
          console.log("Admin login successful")
        } catch (error) {
          console.error("Error saving admin session:", error)
        }
      }
    } else {
      alert("Invalid admin password!")
      console.log("Admin login failed - invalid password")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem("adminAuthenticated")
        localStorage.removeItem("adminLoginTime")
      } catch (error) {
        console.error("Error clearing admin session:", error)
      }
    }
  }

  const handleAddProduct = () => {
    console.log("Adding product:", newProduct)
    const product: AdminProduct = {
      id: Date.now(),
      ...newProduct,
      isNew: true
    }
    console.log("Created product:", product)
    
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
    
    console.log("Updated products list:", updatedProducts)
    console.log("Admin products saved to localStorage:", adminAddedProducts)
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
    console.log("Product added successfully and saved to localStorage")
  }

  const handleEditProduct = (productId: number) => {
    console.log("Editing product:", productId)
    setProducts(products.map(p => 
      p.id === productId ? { ...p, isEditing: !p.isEditing } : p
    ))
    console.log("Updated products for editing")
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
        console.log("Product saved to localStorage:", { adminAddedProducts, originalProductEdits })
      } catch (error) {
        console.error("Error saving admin products:", error)
      }
    }
  }

  const handleDeleteProduct = (productId: number) => {
    console.log("Attempting to delete product:", productId)
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("Confirmed deletion")
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
      
      console.log("Product deleted successfully and localStorage updated:", adminAddedProducts)
    } else {
      console.log("Deletion cancelled")
    }
  }



  // Debug log
  console.log("Authentication state:", isAuthenticated)
  console.log("Current products:", products)
  console.log("Filtered products:", filteredProducts)
  console.log("isAddingProduct:", isAddingProduct)
  
  // Force authentication check - ensure we're not bypassing security
  if (typeof window !== 'undefined') {
    try {
      const storedAuth = localStorage.getItem("adminAuthenticated") === "true"
      if (!storedAuth && isAuthenticated) {
        console.log("Security check failed - clearing authentication")
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Lock className="w-12 h-12 text-[#F7DD0F]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">DopeTech Admin</h1>
            <p className="text-gray-400">Secure access to admin panel</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Admin Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F] text-white"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            
                         <button
               onClick={handleAdminLogin}
               className="w-full px-4 py-3 bg-[#F7DD0F] text-black rounded-lg hover:bg-[#F7DD0F]/90 transition-colors font-medium"
             >
               Login to Admin Panel
             </button>
             
             <button
               onClick={() => {
                 if (typeof window !== 'undefined') {
                   try {
                     localStorage.removeItem("adminAuthenticated")
                     localStorage.removeItem("adminLoginTime")
                   } catch (error) {
                     console.error("Error clearing session:", error)
                   }
                 }
                 setIsAuthenticated(false)
                 setAdminPassword("")
               }}
               className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
             >
               Clear Session (Debug)
             </button>
            
            <div className="text-center">
              <a 
                href="/"
                className="flex items-center justify-center space-x-2 text-gray-400 hover:text-white transition-colors"
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-[#F7DD0F]">DopeTech Admin</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Admin Mode</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="/"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>View Site</span>
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Products</p>
                <p className="text-2xl font-bold">{analytics.totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-[#F7DD0F]" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Sales</p>
                <p className="text-2xl font-bold">Rs {analytics.totalSales.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Views</p>
                <p className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Interactions</p>
                <p className="text-2xl font-bold">{analytics.totalInteractions.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Top Products & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Products */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Star className="w-5 h-5 text-[#F7DD0F]" />
              <span>Top Products</span>
            </h3>
            <div className="space-y-3">
              {analytics.topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
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
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-[#F7DD0F]" />
              <span>Recent Activity</span>
            </h3>
            <div className="space-y-3">
              {analytics.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
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



           

         

         {/* Product Management */}
         <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
           <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-bold">Product Management</h2>
             <div className="flex items-center space-x-4">
               <button
                 onClick={() => {
                   console.log("Add Product button clicked")
                   setIsAddingProduct(true)
                 }}
                 className="flex items-center space-x-2 px-4 py-2 bg-[#F7DD0F] text-black rounded-lg hover:bg-[#F7DD0F]/90 transition-colors"
               >
                 <Plus className="w-4 h-4" />
                 <span>Add Product</span>
               </button>
             </div>
           </div>

                     {/* Search */}
           <div className="mb-6">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
               <input
                 type="text"
                 placeholder="Search products..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7DD0F]"
               />
             </div>
           </div>

          {/* Add Product Modal */}
          {isAddingProduct && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
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

          {/* Products Table */}
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
                    <tr className="border-b border-gray-700 hover:bg-gray-700/50">
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
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">{product.category}</span>
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
                      <tr key={`edit-${product.id}`} className="bg-gray-700/50">
                        <td colSpan={6} className="py-4 px-4">
                          <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
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
                                // Save to localStorage for admin-added products
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
      </div>
    </div>
  )
}
