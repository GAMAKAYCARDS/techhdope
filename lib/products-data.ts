// Original product data only
const originalProducts = [
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
    name: "DopeTech Security Key",
    price: 49.99,
    originalPrice: 59.99,
    image: "/products/key.png",
    category: "accessory",
    rating: 0,
    reviews: 0,
    description: "Biometric security key for enhanced protection",
    features: ["Fingerprint Sensor", "NFC", "Water Resistant"],
    inStock: true,
    discount: 17,
    hiddenOnHome: true
  }
];

// Export all products (only original products now)
export const allProducts = [...originalProducts];

// Export individual arrays for flexibility
export { originalProducts };

// Product type definition
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
  discount: number;
  hiddenOnHome?: boolean;
} 