import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import './styles/responsive.css'
import App from './App'

// Clear all cookies on every page load
function clearAllCookies() {
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim()
    // Delete cookie for current domain
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    // Delete cookie for parent domain
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`
    // Delete cookie for root domain
    const domain = window.location.hostname.split('.').slice(-2).join('.')
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${domain}`
  }
}

// Clear browser cache using Service Worker
async function clearBrowserCache() {
  if ('caches' in window) {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))
  }
}

// Force reload from server (bypass cache)
function disableCache() {
  // Prevent back-forward cache
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      window.location.reload()
    }
  })
  
  // Disable cache for fetch requests
  if ('fetch' in window) {
    const originalFetch = window.fetch
    window.fetch = function(...args) {
      const [resource, config] = args
      return originalFetch(resource, {
        ...config,
        cache: 'no-store',
        headers: {
          ...config?.headers,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
    }
  }
}

// Initialize cleanup on app load
;(async () => {
  try {
    // Clear cookies
    clearAllCookies()
    
    // Clear cache
    await clearBrowserCache()
    
    // Setup cache prevention
    disableCache()
    
    console.log('✅ Cache cleared and cookies deleted')
  } catch (error) {
    console.warn('Cache/Cookie cleanup warning:', error)
  }
})()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
