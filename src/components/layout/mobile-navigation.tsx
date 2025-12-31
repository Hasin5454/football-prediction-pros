'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  BarChart3, 
  Target, 
  Live, 
  TrendingUp,
  User,
  Settings,
  LogOut,
  Crown
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

const navItems = [
  {
    name: 'হোম',
    href: '/',
    icon: Home,
    description: 'প্রধান পেজ'
  },
  {
    name: 'বিশ্লেষণ',
    href: '/analysis',
    icon: BarChart3,
    description: 'ম্যাচ বিশ্লেষণ'
  },
  {
    name: 'প্রেডিকশন',
    href: '/predictions',
    icon: Target,
    description: 'AI প্রেডিকশন'
  },
  {
    name: 'লাইভ',
    href: '/live',
    icon: Live,
    description: 'রিয়েল-টাইম ম্যাচ'
  },
  {
    name: 'ট্রেন্ডস',
    href: '/trends',
    icon: TrendingUp,
    description: 'ট্রেন্ড বিশ্লেষণ'
  }
]

const userItems = [
  {
    name: 'ড্যাশবোর্ড',
    href: '/dashboard',
    icon: User,
    description: 'পার্সোনাল ড্যাশবোর্ড'
  },
  {
    name: 'সেটিংস',
    href: '/settings',
    icon: Settings,
    description: 'অ্যাকাউন্ট সেটিংস'
  }
]

export function MobileNavigation() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-background/95 backdrop-blur-md border-t border-border/50"
      >
        {/* Main Navigation */}
        <div className="flex items-center justify-around py-2 px-4">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link key={index} href={item.href}>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsExpanded(false)}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    isActive && "bg-primary/10"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={cn(
                    "text-xs font-medium mt-1 truncate w-full text-center",
                    isActive && "text-primary"
                  )}>
                    {item.name}
                  </span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="mobile-active-indicator"
                      className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </div>

        {/* Expandable User Section */}
        <AnimatePresence>
          {isExpanded && user && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-border/50 bg-muted/50"
            >
              <div className="p-4 space-y-2">
                {/* User Info */}
                <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <div className="flex items-center space-x-1">
                      <Crown className="w-3 h-3 text-yellow-500" />
                      <p className="text-xs text-muted-foreground">প্রিমিয়াম</p>
                    </div>
                  </div>
                </div>

                {/* User Menu Items */}
                {userItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <Link key={index} href={item.href} onClick={() => setIsExpanded(false)}>
                      <div className={cn(
                        "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-background text-muted-foreground"
                      )}>
                        <Icon className="w-5 h-5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs opacity-70">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}

                {/* Logout Button */}
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                  onClick={() => {
                    signOut()
                    setIsExpanded(false)
                  }}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  লগ আউট
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Profile Toggle */}
        {user && (
          <div className="flex justify-center pb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-full"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
              </motion.div>
            </Button>
          </div>
        )}

        {/* Safe Area for devices with home indicator */}
        <div className="h-safe-bottom bg-background" />
      </motion.div>
    </div>
  )
}