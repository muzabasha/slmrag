import { useEffect } from 'react'

/**
 * Custom hook to manage cache control and cookie deletion
 * Ensures fresh content on every page visit
 */
export function useCacheControl() {
  useEffect(() => {
    // Force browser to reload from server
    const preventCache = () => {
      // Set no-cache headers for navigation timing
      if (performance && performance.navigation) {
        if (performance.navigation.type === 2) {
          // Page was accessed via back/forward button
          window.location.reload()
        }
      }
    }

    preventCache()

    // Clear session storage on page load
    const clearSessionData = () => {
      try {
        // Clear session storage but preserve theme preference
        const theme = localStorage.getItem('theme')
        localStorage.clear()
        sessionStorage.clear()
        if (theme) {
          localStorage.setItem('theme', theme)
        }
      } catch (error) {
        console.warn('Could not clear storage:', error)
      }
    }

    clearSessionData()

    // Monitor visibility changes to refresh on tab focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Optional: Force refresh when tab becomes visible
        // Uncomment if you want to reload on tab switch
        // window.location.reload()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])
}

/**
 * Utility function to clear specific cookies
 */
export function clearCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`
}

/**
 * Utility function to clear all application caches
 */
export async function clearAllCaches() {
  if ('caches' in window) {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))
    console.log('✅ All caches cleared')
  }
}

/**
 * Utility function to force hard reload
 */
export function forceHardReload() {
  // Clear caches and reload
  clearAllCaches().then(() => {
    window.location.reload()
  })
}
