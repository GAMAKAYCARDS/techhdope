"use client"

import { useState, useRef } from "react"
import { X, Upload, CheckCircle, AlertCircle, CreditCard, MessageCircle, Truck, Package, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  total: number
}

export default function CheckoutModal({ isOpen, onClose, cart, total }: CheckoutModalProps) {
  const [activeTab, setActiveTab] = useState<'customer-info' | 'payment' | 'receipt'>('customer-info')
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery')
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    state: '',
    zipCode: '',
    fullAddress: '',
    mobileNumber: ''
  })
  const [discountCode, setDiscountCode] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setReceiptFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setReceiptPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadReceipt = async () => {
    if (!receiptFile) return

    setIsUploading(true)
    setUploadStatus('idle')

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically upload to your server
      // For now, we'll just simulate success
      setUploadStatus('success')
      
      // Reset after showing success
      setTimeout(() => {
        setUploadStatus('idle')
        setReceiptFile(null)
        setReceiptPreview(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }, 3000)
      
    } catch (error) {
      setUploadStatus('error')
      setTimeout(() => setUploadStatus('idle'), 3000)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveFile = () => {
    setReceiptFile(null)
    setReceiptPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleCustomerInfoChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const isCustomerInfoValid = () => {
    return customerInfo.fullName.trim().length > 0 && 
           customerInfo.email.trim().length > 0 &&
           customerInfo.phone.trim().length > 0 &&
           customerInfo.fullAddress.trim().length > 0 &&
           termsAccepted
  }

  const shippingCost = deliveryOption === 'delivery' ? 5 : 0
  const discountAmount = discountCode ? 10 : 0
  const finalTotal = total + shippingCost - discountAmount

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden border border-white/20 gradient-bg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="flex items-center space-x-2 md:space-x-4">
            <img src="/logo/dopelogo.svg" alt="DopeTech" className="h-6 md:h-8 w-auto" />
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#F7DD0F]/20 rounded-full flex items-center justify-center border border-[#F7DD0F]/30">
                  <span className="text-xs font-semibold text-[#F7DD0F]">1</span>
                </div>
                <span className="text-sm text-gray-300">Cart</span>
              </div>
              <div className="w-8 h-0.5 bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#F7DD0F]/20 rounded-full flex items-center justify-center border border-[#F7DD0F]/30">
                  <span className="text-xs font-semibold text-[#F7DD0F]">2</span>
                </div>
                <span className="text-sm text-gray-300">Review</span>
              </div>
              <div className="w-8 h-0.5 bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#F7DD0F] rounded-full flex items-center justify-center border border-[#F7DD0F]/50">
                  <span className="text-xs font-semibold text-black">3</span>
                </div>
                <span className="text-sm font-semibold text-[#F7DD0F]">Checkout</span>
              </div>
            </div>
            {/* Mobile Progress Indicator */}
            <div className="md:hidden flex items-center space-x-2">
              <div className="w-4 h-4 bg-[#F7DD0F] rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-black">3</span>
              </div>
              <span className="text-sm font-semibold text-[#F7DD0F]">Checkout</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-[calc(95vh-80px)]">
          {/* Left Column - Customer Information */}
          <div className="flex-1 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-white/20 overflow-y-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Checkout</h1>
            
            <div className="space-y-6 md:space-y-8">
              {/* Delivery Options */}
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6">Shipping Information</h2>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6 md:mb-8">
                  <button
                    onClick={() => setDeliveryOption('delivery')}
                    className={`flex items-center justify-center sm:justify-start space-x-3 px-6 py-4 rounded-lg border-2 transition-colors backdrop-blur-sm ${
                      deliveryOption === 'delivery'
                        ? 'border-[#F7DD0F] bg-[#F7DD0F]/20 text-[#F7DD0F]'
                        : 'border-white/30 bg-white/5 text-gray-300 hover:border-white/50 hover:text-white'
                    }`}
                  >
                    <Truck className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="font-medium text-base md:text-lg">Delivery</span>
                  </button>
                  <button
                    onClick={() => setDeliveryOption('pickup')}
                    className={`flex items-center justify-center sm:justify-start space-x-3 px-6 py-4 rounded-lg border-2 transition-colors backdrop-blur-sm ${
                      deliveryOption === 'pickup'
                        ? 'border-[#F7DD0F] bg-[#F7DD0F]/20 text-[#F7DD0F]'
                        : 'border-white/30 bg-white/5 text-gray-300 hover:border-white/50 hover:text-white'
                    }`}
                  >
                    <Package className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="font-medium text-base md:text-lg">Pick up</span>
                  </button>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="fullName" className="block text-base font-medium text-gray-300 mb-2">
                      Full name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={customerInfo.fullName}
                      onChange={(e) => handleCustomerInfoChange('fullName', e.target.value)}
                      className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#F7DD0F] focus:border-transparent bg-white/5 text-white placeholder-gray-400 backdrop-blur-sm text-base md:text-lg"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-base font-medium text-gray-300 mb-2">
                      Email address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={customerInfo.email}
                      onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#F7DD0F] focus:border-transparent bg-white/5 text-white placeholder-gray-400 backdrop-blur-sm text-base md:text-lg"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="block text-base font-medium text-gray-300 mb-2">
                      Phone number *
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                        <span className="text-base">🇺🇸</span>
                        <span className="text-gray-400">|</span>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                        className="w-full pl-20 pr-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#F7DD0F] focus:border-transparent bg-white/5 text-white placeholder-gray-400 backdrop-blur-sm text-base md:text-lg"
                        placeholder="+1 425 151 2318"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country" className="block text-base font-medium text-gray-300 mb-2">
                      Country *
                    </label>
                    <select
                      id="country"
                      value={customerInfo.country}
                      onChange={(e) => handleCustomerInfoChange('country', e.target.value)}
                      className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#F7DD0F] focus:border-transparent bg-white/5 text-white backdrop-blur-sm text-base md:text-lg"
                      required
                    >
                      <option value="" className="bg-gray-800">Choose country</option>
                      <option value="US" className="bg-gray-800">United States</option>
                      <option value="CA" className="bg-gray-800">Canada</option>
                      <option value="UK" className="bg-gray-800">United Kingdom</option>
                      <option value="AU" className="bg-gray-800">Australia</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-base font-medium text-gray-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={customerInfo.city}
                      onChange={(e) => handleCustomerInfoChange('city', e.target.value)}
                      className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#F7DD0F] focus:border-transparent bg-white/5 text-white placeholder-gray-400 backdrop-blur-sm text-base md:text-lg"
                      placeholder="Enter city"
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-base font-medium text-gray-300 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={customerInfo.state}
                      onChange={(e) => handleCustomerInfoChange('state', e.target.value)}
                      className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#F7DD0F] focus:border-transparent bg-white/5 text-white placeholder-gray-400 backdrop-blur-sm text-base md:text-lg"
                      placeholder="Enter state"
                    />
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-base font-medium text-gray-300 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      value={customerInfo.zipCode}
                      onChange={(e) => handleCustomerInfoChange('zipCode', e.target.value)}
                      className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#F7DD0F] focus:border-transparent bg-white/5 text-white placeholder-gray-400 backdrop-blur-sm text-base md:text-lg"
                      placeholder="Enter ZIP code"
                    />
                  </div>
                </div>

                {/* Full Address */}
                <div className="mt-6 md:mt-8">
                  <label htmlFor="fullAddress" className="block text-base font-medium text-gray-300 mb-2">
                    Full Address *
                  </label>
                  <textarea
                    id="fullAddress"
                    value={customerInfo.fullAddress}
                    onChange={(e) => handleCustomerInfoChange('fullAddress', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#F7DD0F] focus:border-transparent bg-white/5 text-white placeholder-gray-400 resize-none backdrop-blur-sm text-base md:text-lg"
                    placeholder="Enter your complete address"
                    required
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="mt-6 md:mt-8">
                  <label className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 w-5 h-5 text-[#F7DD0F] border-white/30 rounded focus:ring-[#F7DD0F] bg-white/5"
                    />
                    <span className="text-base text-gray-300">
                      I have read and agree to the Terms and Conditions.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-96 p-4 md:p-6 bg-white/5 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-white/20 overflow-y-auto">
            <h2 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">Review your cart</h2>
            
            {/* Products */}
            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                  <img src={item.image} alt={item.name} className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white text-sm md:text-base truncate">{item.name}</h3>
                    <p className="text-sm text-gray-300">{item.quantity}x</p>
                  </div>
                  <span className="font-semibold text-[#F7DD0F] text-sm md:text-base">Rs {item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Discount Code */}
            <div className="mb-4 md:mb-6">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#F7DD0F] focus:border-transparent bg-white/5 text-white placeholder-gray-400 backdrop-blur-sm text-sm md:text-base"
                    placeholder="Discount code"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🏷️</span>
                </div>
                <Button className="bg-[#F7DD0F] hover:bg-[#F7DD0F]/90 text-black px-4 py-2 rounded-lg font-medium text-sm md:text-base">
                  Apply
                </Button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="space-y-3 mb-4 md:mb-6 p-3 md:p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm md:text-base">Subtotal</span>
                <span className="font-medium text-white text-sm md:text-base">Rs {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm md:text-base">Shipping</span>
                <span className="font-medium text-white text-sm md:text-base">Rs {shippingCost.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm md:text-base">Discount</span>
                  <span className="font-medium text-red-400 text-sm md:text-base">-Rs {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-white/20 pt-3">
                <div className="flex justify-between">
                  <span className="text-base md:text-lg font-semibold text-white">Total</span>
                  <span className="text-base md:text-lg font-bold text-[#F7DD0F]">Rs {finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Pay Now Button */}
            <Button 
              className="w-full bg-[#F7DD0F] hover:bg-[#F7DD0F]/90 text-black py-3 rounded-lg font-semibold text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isCustomerInfoValid()}
            >
              Pay Now
            </Button>

            {/* Security Message */}
            <div className="mt-4 text-center p-3 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Lock className="w-4 h-4 text-[#F7DD0F]" />
                <span className="text-sm font-medium text-white">Secure Checkout - SSL Encrypted</span>
              </div>
              <p className="text-xs text-gray-300">
                Ensuring your financial and personal details are secure during every transaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

