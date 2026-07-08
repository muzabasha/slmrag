import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return stored === 'dark' || (stored === null && prefersDark)
    }
    return false
  })

  const location = useLocation()

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  // Initialize theme on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev
      localStorage.setItem('theme', next ? 'dark' : 'light')
      if (next) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return next
    })
  }

  return (
    <div className={`min-h-screen bg-surface dark:bg-surface-dark flex flex-col ${darkMode ? 'dark' : ''}`}>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Header */}
      <Header
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Layout Container */}
      <div className="flex flex-1 relative min-h-0">

        {/* Sidebar — always an overlay, never pushes content */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Mobile/Desktop Overlay backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
              />

              {/* Sidebar Panel */}
              <motion.aside
                initial={{ x: -320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -320, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 32,
                }}
                className="fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-72 bg-card/90 dark:bg-card-dark/90 glass border-r border-border/50 dark:border-border-dark/50 shadow-2xl overflow-hidden"
                role="complementary"
                aria-label="Sidebar navigation"
              >
                <div className="h-full overflow-y-auto">
                  <Sidebar onClose={() => setSidebarOpen(false)} />
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content — never shifts, always full width under the overlay */}
        <main
          id="main-content"
          className="flex-1 min-h-0 overflow-y-auto"
          role="main"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <footer className="bg-card dark:bg-card-dark border-t border-border dark:border-border-dark mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <p className="text-sm text-muted dark:text-muted-dark">
                  © 2026 REVA University — SLM &amp; RAG Workshop
                </p>
                <div className="flex gap-5 text-sm">
                  {['About', 'Documentation', 'Feedback'].map(link => (
                    <a
                      key={link}
                      href="#"
                      className="text-muted dark:text-muted-dark hover:text-primary dark:hover:text-primary-light transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
