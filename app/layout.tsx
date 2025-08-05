import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "DopeTech Nepal - Premium Tech Gear",
  description: "Premium tech gear from DopeTech Nepal. Mechanical keyboards, gaming mice, wireless headphones, and more. Your setup, perfected.",
  keywords: "tech gear, mechanical keyboard, gaming mouse, wireless headphones, Nepal, DopeTech",
  authors: [{ name: "DopeTech Nepal" }],
  creator: "DopeTech Nepal",
  publisher: "DopeTech Nepal",
  generator: 'Next.js',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DopeTech'
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dopetech-nepal.com',
    title: 'DopeTech Nepal - Premium Tech Gear',
    description: 'Premium tech gear from DopeTech Nepal. Mechanical keyboards, gaming mice, wireless headphones, and more.',
    siteName: 'DopeTech Nepal',
    images: [
      {
        url: '/images/dopetech-logo-new.png',
        width: 1200,
        height: 630,
        alt: 'DopeTech Nepal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DopeTech Nepal - Premium Tech Gear',
    description: 'Premium tech gear from DopeTech Nepal. Mechanical keyboards, gaming mice, wireless headphones, and more.',
    images: ['/images/dopetech-logo-new.png'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F7DD0F',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <meta name="theme-color" content="#F7DD0F" />
        <meta name="msapplication-TileColor" content="#F7DD0F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DopeTech" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={plusJakartaSans.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
