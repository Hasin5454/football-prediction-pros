'use client'

import { useState, useEffect } from 'react'

/**
 * Hook to detect if the current device is mobile
 * Uses multiple methods for accurate detection
 */
export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check multiple criteria for mobile detection
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobileKeywords = [
        'mobile',
        'android',
        'iphone',
        'ipod',
        'blackberry',
        'windows phone',
        'webos',
        'opera mini',
        'iemobile'
      ]
      
      const hasMobileKeyword = mobileKeywords.some(keyword => 
        userAgent.includes(keyword)
      )
      
      // Check screen width
      const isSmallScreen = window.innerWidth <= 768
      
      // Check touch capability
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      // Check for mobile-specific features
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
      
      // Combine all checks
      const mobileDetected = hasMobileKeyword || (isSmallScreen && hasTouch) || isMobileUA
      
      setIsMobile(mobileDetected)
    }

    // Initial check
    checkIsMobile()

    // Listen for resize events (with debounce)
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(checkIsMobile, 250)
    }

    window.addEventListener('resize', handleResize)
    
    // Listen for orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(checkIsMobile, 100)
    })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', () => {})
      clearTimeout(resizeTimeout)
    }
  }, [])

  return isMobile
}

/**
 * Hook to get device type classification
 */
export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    const getDeviceType = () => {
      const width = window.innerWidth
      
      if (width <= 768) {
        setDeviceType('mobile')
      } else if (width <= 1024) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    getDeviceType()

    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(getDeviceType, 250)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return deviceType
}

/**
 * Hook to check if device supports touch
 */
export function useTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsTouchDevice(hasTouch)
    }

    checkTouchDevice()
  }, [])

  return isTouchDevice
}

/**
 * Hook to get screen size information
 */
export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false
  })

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setScreenSize({
        width,
        height,
        isMobile: width <= 768,
        isTablet: width > 768 && width <= 1024,
        isDesktop: width > 1024 && width <= 1440,
        isLargeDesktop: width > 1440
      })
    }

    updateScreenSize()

    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(updateScreenSize, 250)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return screenSize
}

/**
 * Hook to detect if device is in portrait mode
 */
export function useOrientation() {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape')

  useEffect(() => {
    const checkOrientation = () => {
      if (window.innerHeight > window.innerWidth) {
        setOrientation('portrait')
      } else {
        setOrientation('landscape')
      }
    }

    checkOrientation()

    const handleResize = () => {
      setTimeout(checkOrientation, 100)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return orientation
}

/**
 * Hook to check if device supports PWA installation
 */
export function usePWAInstallable(): {
  isInstallable: boolean
  prompt: any
  install: () => Promise<void>
} {
  const [isInstallable, setIsInstallable] = useState(false)
  const [prompt, setPrompt] = useState<any>(null)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const install = async () => {
    if (!prompt) return

    const result = await prompt.prompt()
    setPrompt(null)
    setIsInstallable(false)
    return result
  }

  return {
    isInstallable,
    prompt,
    install
  }
}