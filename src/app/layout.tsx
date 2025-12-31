import type { Metadata } from 'next'
import { Inter, Roboto_Mono, Roboto } from 'next/font/google'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { Layout } from '@/components/layout/layout'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: {
    default: 'ফুটবল প্রেডিকশন প্রো | AI-ভিত্তিক স্মার্ট বিশ্লেষণ প্ল্যাটফর্ম',
    template: '%s | ফুটবল প্রেডিকশন প্রো'
  },
  description: 'কৃত্রিম বুদ্ধিমত্তা এবং বিস্তারিত পরিসংখ্যানের মাধ্যমে ফুটবল ম্যাচের সঠিক পূর্বাভাস ও বেটিং সুপারিশ। রিয়েল-টাইম ডেটা, AI প্রেডিকশন এবং এক্সপার্ট অ্যানালাইসিস সহ।',
  keywords: [
    'ফুটবল',
    'প্রেডিকশন',
    'বিশ্লেষণ',
    'বেটিং',
    'AI',
    'মেশিন লার্নিং',
    'স্পোর্টস',
    'ম্যাচ',
    'দল',
    'খেলোয়াড়',
    'লিগ',
    'কাপ',
    'বিশ্বকাপ',
    'ইউরোপ',
    'বাংলাদেশ',
    'প্রিমিয়ার লিগ',
    'লা লিগা',
    'সিরি আ',
    'বুন্ডেসলিগা',
    'লিগ ১'
  ],
  authors: [{ name: 'MiniMax Agent', url: 'https://minimax.chat' }],
  creator: 'MiniMax Agent',
  publisher: 'Football Prediction Pro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    title: 'ফুটবল প্রেডিকশন প্রো | AI-ভিত্তিক স্মার্ট বিশ্লেষণ',
    description: 'কৃত্রিম বুদ্ধিমত্তা এবং বিস্তারিত পরিসংখ্যানের মাধ্যমে ফুটবল ম্যাচের সঠিক পূর্বাভাস ও বেটিং সুপারিশ',
    siteName: 'Football Prediction Pro',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Football Prediction Pro - AI-powered Football Analysis Platform',
      },
      {
        url: '/images/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'Football Prediction Pro Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ফুটবল প্রেডিকশন প্রো | AI-ভিত্তিক স্মার্ট বিশ্লেষণ',
    description: 'কৃত্রিম বুদ্ধিমত্তা এবং বিস্তারিত পরিসংখ্যানের মাধ্যমে ফুটবল ম্যাচের সঠিক পূর্বাভাস ও বেটিং সুপারিশ',
    images: ['/images/twitter-image.jpg'],
    creator: '@footballpredpro',
    site: '@footballpredpro',
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
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon-precomposed.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#1e3a8a' },
    ],
  },
  category: 'sports',
  classification: 'AI-powered Football Prediction Platform',
  referrer: 'origin-when-cross-origin',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'msapplication-TileColor': '#1e3a8a',
    'msapplication-config': '/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn" className={`${inter.variable} ${robotoMono.variable} ${roboto.variable}`} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="msapplication-TileColor" content="#1e3a8a" />
        
        {/* Preload Critical Resources */}
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/images/hero-bg.jpg" as="image" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//api.football-data.org" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Open Graph Optimization */}
        <meta property="og:locale" content="bn_BD" />
        <meta property="og:site_name" content="Football Prediction Pro" />
        <meta property="og:determiner" content="the" />
        
        {/* Twitter Card Optimization */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@footballpredpro" />
        <meta name="twitter:creator" content="@footballpredpro" />
        
        {/* PWA Support */}
        <meta name="application-name" content="Football Prediction Pro" />
        <meta name="apple-mobile-web-app-title" content="Football Prediction Pro" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Performance Hints */}
        <meta httpEquiv="X-DNS-Prefetch-Control" content="on" />
        <meta httpEquiv="X-Preferred-Locale" content="bn_BD" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <QueryProvider>
              <div className="relative flex min-h-screen flex-col">
                <Layout>
                  {children}
                </Layout>
                <Toaster 
                  position="top-right" 
                  toastOptions={{
                    duration: 5000,
                    className: 'toast',
                  }}
                />
              </div>
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}