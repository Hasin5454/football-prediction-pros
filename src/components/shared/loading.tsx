'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'pulse' | 'dots' | 'bars' | 'football'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  className?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
}

const colorClasses = {
  primary: 'border-primary',
  secondary: 'border-secondary',
  success: 'border-green-500',
  warning: 'border-yellow-500',
  danger: 'border-red-500'
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default', 
  color = 'primary',
  className 
}: LoadingSpinnerProps) {
  const sizeClass = sizeClasses[size]
  const colorClass = colorClasses[color]

  if (variant === 'pulse') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <motion.div
          className={cn(
            'rounded-full bg-current opacity-75',
            sizeClass,
            colorClass.replace('border-', 'bg-')
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.75, 0.3, 0.75]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center justify-center space-x-1', className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn(
              'rounded-full bg-current',
              size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3',
              colorClass.replace('border-', 'bg-')
            )}
            animate={{
              y: [0, -8, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'bars') {
    return (
      <div className={cn('flex items-end justify-center space-x-1', className)}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={cn(
              'bg-current rounded-sm',
              size === 'sm' ? 'w-1' : size === 'md' ? 'w-2' : 'w-3',
              'h-4'
            )}
            animate={{
              scaleY: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut'
            }}
            style={{ backgroundColor: colorClass.includes('primary') ? 'hsl(var(--primary))' : undefined }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'football') {
    return (
      <div className={cn('relative flex items-center justify-center', className)}>
        <motion.div
          className={cn(
            'rounded-full border-2 border-current',
            sizeClass,
            colorClass
          )}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <motion.div
          className={cn(
            'absolute inset-0 rounded-full border-2 border-t-transparent',
            sizeClass,
            colorClass
          )}
          animate={{
            rotate: -360
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
    )
  }

  // Default spinner
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <motion.div
        className={cn(
          'rounded-full border-2 border-t-transparent',
          sizeClass,
          colorClass
        )}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  )
}

interface LoadingOverlayProps {
  isVisible: boolean
  message?: string
  variant?: LoadingSpinnerProps['variant']
  size?: LoadingSpinnerProps['size']
}

export function LoadingOverlay({ 
  isVisible, 
  message = 'লোড হচ্ছে...', 
  variant = 'default',
  size = 'lg'
}: LoadingOverlayProps) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="bg-background rounded-lg p-8 shadow-2xl border text-center space-y-4">
        <LoadingSpinner variant={variant} size={size} />
        <p className="text-sm font-medium text-muted-foreground">{message}</p>
      </div>
    </motion.div>
  )
}

interface LoadingSkeletonProps {
  className?: string
  lines?: number
  variant?: 'text' | 'avatar' | 'card' | 'button' | 'image'
}

export function LoadingSkeleton({ 
  className, 
  lines = 3, 
  variant = 'text' 
}: LoadingSkeletonProps) {
  if (variant === 'avatar') {
    return (
      <div className={cn('rounded-full bg-muted animate-pulse', className || 'h-10 w-10')} />
    )
  }

  if (variant === 'card') {
    return (
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
        <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
      </div>
    )
  }

  if (variant === 'button') {
    return (
      <div className={cn('h-9 bg-muted rounded animate-pulse', className || 'w-24')} />
    )
  }

  if (variant === 'image') {
    return (
      <div className={cn('bg-muted rounded animate-pulse', className || 'h-48 w-full')} />
    )
  }

  // Default text skeleton
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 bg-muted rounded animate-pulse',
            i === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}

interface LoadingPageProps {
  message?: string
  variant?: LoadingSpinnerProps['variant']
}

export function LoadingPage({ message = 'পেজ লোড হচ্ছে...', variant = 'football' }: LoadingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <LoadingSpinner variant={variant} size="xl" />
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{message}</h2>
          <p className="text-muted-foreground">অনুগ্রহ করে অপেক্ষা করুন</p>
        </div>
      </div>
    </div>
  )
}

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  loadingText?: string
  spinnerVariant?: LoadingSpinnerProps['variant']
}

export function LoadingButton({ 
  loading = false, 
  loadingText = 'লোড হচ্ছে...', 
  spinnerVariant = 'dots',
  children, 
  className,
  disabled,
  ...props 
}: LoadingButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2',
        loading && 'cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner size="sm" variant={spinnerVariant} />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  )
}