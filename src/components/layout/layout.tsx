'use client'

import { useState, useEffect } from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { MobileNavigation } from './mobile-navigation'
import { useAuth } from '@/hooks/use-auth'
import { useMobile } from '@/hooks/use-mobile'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { user, isLoading } = useAuth()
  const isMobile = useMobile()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 relative">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-green-500/3 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>
        
        {/* Main Content */}
        <div className="relative z-10">
          {children}
        </div>
      </main>

      <Footer />
      
      {/* Mobile Navigation */}
      {isMobile && <MobileNavigation />}
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground">লোড হচ্ছে...</p>
          </div>
        </div>
      )}
    </div>
  )
}