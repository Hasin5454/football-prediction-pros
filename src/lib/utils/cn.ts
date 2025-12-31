import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format numbers with Bengali locale
 */
export function formatNumber(num: number, locale: 'bn' | 'en' = 'bn'): string {
  if (locale === 'bn') {
    // Bengali numerals
    const bengaliNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
    return num.toString().replace(/[0-9]/g, (digit) => bengaliNumbers[parseInt(digit)])
  }
  return num.toLocaleString()
}

/**
 * Format currency in Bangla Taka
 */
export function formatCurrency(amount: number, locale: 'bn' | 'en' = 'bn'): string {
  const symbol = locale === 'bn' ? '৳' : '$'
  const formatted = locale === 'bn' ? formatNumber(Math.round(amount)) : amount.toFixed(2)
  return `${symbol}${formatted}`
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, locale: 'bn' | 'en' = 'bn'): string {
  const formatted = locale === 'bn' ? formatNumber(value) : value.toFixed(1)
  return `${formatted}%`
}

/**
 * Format date in Bengali
 */
export function formatDate(date: Date | string, locale: 'bn' | 'en' = 'bn'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  if (locale === 'bn') {
    const months = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ]
    
    const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার']
    
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${formatNumber(d.getFullYear())}`
  }
  
  return d.toLocaleDateString()
}

/**
 * Format time in Bengali
 */
export function formatTime(date: Date | string, locale: 'bn' | 'en' = 'bn'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  if (locale === 'bn') {
    const hours = d.getHours()
    const minutes = d.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours % 12 || 12
    
    return `${formatNumber(displayHours)}:${formatNumber(minutes.toString().padStart(2, '0'))} ${ampm}`
  }
  
  return d.toLocaleTimeString()
}

/**
 * Format date and time together
 */
export function formatDateTime(date: Date | string, locale: 'bn' | 'en' = 'bn'): string {
  return `${formatDate(date, locale)} ${formatTime(date, locale)}`
}

/**
 * Calculate time ago in Bengali
 */
export function timeAgo(date: Date | string, locale: 'bn' | 'en' = 'bn'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  if (locale === 'bn') {
    if (diffSeconds < 60) return 'এখনই'
    if (diffMinutes < 60) return `${formatNumber(diffMinutes)} মিনিট আগে`
    if (diffHours < 24) return `${formatNumber(diffHours)} ঘন্টা আগে`
    if (diffDays < 30) return `${formatNumber(diffDays)} দিন আগে`
    if (diffMonths < 12) return `${formatNumber(diffMonths)} মাস আগে`
    return `${formatNumber(diffYears)} বছর আগে`
  }

  if (diffSeconds < 60) return 'just now'
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays < 30) return `${diffDays} days ago`
  if (diffMonths < 12) return `${diffMonths} months ago`
  return `${diffYears} years ago`
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Generate random ID
 */
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Calculate probability percentage
 */
export function calculateProbability(probability: number): string {
  return formatPercentage(probability * 100)
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Convert camelCase to Title Case
 */
export function camelToTitle(text: string): string {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number, locale: 'bn' | 'en' = 'bn'): string {
  const units = locale === 'bn' 
    ? ['বাইট', 'কেবি', 'এমবি', 'জিবি', 'টিবি']
    : ['B', 'KB', 'MB', 'GB', 'TB']
  
  let size = bytes
  let unitIndex = 0
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  
  const formattedSize = locale === 'bn' ? formatNumber(Math.round(size)) : size.toFixed(1)
  return `${formattedSize} ${units[unitIndex]}`
}

/**
 * Sleep/delay function
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T
  if (typeof obj === 'object') {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}

/**
 * Convert RGB to Hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/**
 * Convert Hex to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

/**
 * Generate color palette
 */
export function generateColorPalette(baseColor: string, count: number): string[] {
  const rgb = hexToRgb(baseColor)
  if (!rgb) return []
  
  const colors = [baseColor]
  
  for (let i = 1; i < count; i++) {
    const factor = 0.1 * i
    const r = Math.max(0, Math.min(255, Math.round(rgb.r + (255 - rgb.r) * factor)))
    const g = Math.max(0, Math.min(255, Math.round(rgb.g + (255 - rgb.g) * factor)))
    const b = Math.max(0, Math.min(255, Math.round(rgb.b + (255 - rgb.b) * factor)))
    
    colors.push(rgbToHex(r, g, b))
  }
  
  return colors
}