'use client'

import { useSession, signOut as nextAuthSignOut } from 'next-auth/react'
import { useQuery, useMutation } from 'react-query'
import { toast } from 'sonner'

interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  tier: 'free' | 'premium' | 'pro'
  credits: number
  preferences: {
    language: 'bn' | 'en'
    theme: 'light' | 'dark' | 'system'
    notifications: boolean
  }
  stats: {
    totalPredictions: number
    accuracy: number
    profit: number
    winStreak: number
  }
  createdAt: string
  lastLoginAt: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}

interface UseAuthReturn extends AuthState {
  signOut: () => Promise<void>
  updateUser: (data: Partial<User>) => Promise<void>
  refreshUser: () => Promise<void>
  hasPermission: (permission: string) => boolean
  isPremium: () => boolean
  canMakePrediction: () => boolean
}

export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'
  const isAuthenticated = !!session?.user

  // Fetch user data from API
  const { data: user, refetch: refetchUser } = useQuery<User>(
    ['user', session?.user?.email],
    async () => {
      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }
      
      return response.json()
    },
    {
      enabled: isAuthenticated,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2
    }
  )

  // Sign out mutation
  const signOutMutation = useMutation(
    async () => {
      await nextAuthSignOut({ callbackUrl: '/' })
    },
    {
      onSuccess: () => {
        toast.success('সফলভাবে লগ আউট হয়েছেন')
      },
      onError: (error: any) => {
        toast.error('লগ আউট করতে সমস্যা হয়েছে')
        console.error('Sign out error:', error)
      }
    }
  )

  // Update user mutation
  const updateUserMutation = useMutation(
    async (data: Partial<User>) => {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to update user')
      }

      return response.json()
    },
    {
      onSuccess: () => {
        refetchUser()
        toast.success('প্রোফাইল আপডেট হয়েছে')
      },
      onError: (error: any) => {
        toast.error('আপডেট করতে সমস্যা হয়েছে')
        console.error('Update user error:', error)
      }
    }
  )

  // Refresh user data
  const refreshUser = async () => {
    try {
      await refetchUser()
      toast.success('ডেটা রিফ্রেশ হয়েছে')
    } catch (error) {
      toast.error('রিফ্রেশ করতে সমস্যা হয়েছে')
    }
  }

  // Permission checker
  const hasPermission = (permission: string): boolean => {
    if (!user) return false

    const permissions = {
      // Free tier permissions
      'view_predictions': user.tier !== undefined,
      'make_predictions': user.credits > 0,
      'view_basic_analysis': user.tier !== undefined,
      
      // Premium tier permissions
      'view_detailed_analysis': ['premium', 'pro'].includes(user.tier),
      'access_value_bets': ['premium', 'pro'].includes(user.tier),
      'advanced_statistics': ['premium', 'pro'].includes(user.tier),
      'priority_support': ['premium', 'pro'].includes(user.tier),
      
      // Pro tier permissions
      'api_access': user.tier === 'pro',
      'white_label': user.tier === 'pro',
      'custom_analytics': user.tier === 'pro',
      'bulk_operations': user.tier === 'pro'
    }

    return permissions[permission as keyof typeof permissions] || false
  }

  // Premium status checker
  const isPremium = (): boolean => {
    return user?.tier === 'premium' || user?.tier === 'pro'
  }

  // Prediction allowance checker
  const canMakePrediction = (): boolean => {
    if (!user) return false
    
    // Free users have limited credits
    if (user.tier === 'free') {
      return user.credits > 0
    }
    
    // Premium and Pro users have unlimited predictions
    return true
  }

  const signOut = async () => {
    await signOutMutation.mutateAsync()
  }

  const updateUser = async (data: Partial<User>) => {
    await updateUserMutation.mutateAsync(data)
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    error: null, // We'll handle errors through mutations
    signOut,
    updateUser,
    refreshUser,
    hasPermission,
    isPremium,
    canMakePrediction
  }
}

// Hook for checking specific permissions
export function usePermission(permission: string) {
  const { hasPermission } = useAuth()
  return hasPermission(permission)
}

// Hook for checking premium status
export function usePremium() {
  const { user, isPremium } = useAuth()
  return {
    isPremium: isPremium(),
    tier: user?.tier || 'free',
    benefits: [
      'অসীমিত প্রেডিকশন',
      'ডিটেইলড অ্যানালাইসিস',
      'ভ্যালু বেট ডিটেক্টর',
      'প্রাইভেট কমিউনিটি',
      '২৪/৭ সাপোর্ট'
    ]
  }
}