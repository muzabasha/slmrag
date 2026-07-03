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
    <div className={`min-h-screen bg-surface dark:bg-surface-dark ${darkMode ? 'dark' : ''}`}>
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
      <div className="flex relative">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <>
              {/* Mobile Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
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
                  stiffness: 300,
                  damping: 30 
                }}
                className="fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-80 bg-card dark:bg-card-dark border-r border-border dark:border-border-dark shadow-2xl overflow-hidden"
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

        {/* Main Content */}
        <motion.main
          id="main-content"
          className="flex-1 min-h-[calc(100vh-4rem)]"
          initial={false}
          animate={{
            marginLeft: sidebarOpen ? '20rem' : '0',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }}
          role="main"
        >
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            {/* Page Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.main>
      </div>

      {/* Footer */}
      <footer className="bg-card dark:bg-card-dark border-t border-border dark:border-border-dark mt-auto">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted dark:text-muted-dark">
              © 2026 REVA University. SLM & RAG Workshop.
            </p>
            <div className="flex gap-6 text-sm">
              <a 
                href="#" 
                className="text-muted dark:text-muted-dark hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                About
              </a>
              <a 
                href="#" 
                className="text-muted dark:text-muted-dark hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Documentation
              </a>
              <a 
                href="#" 
                className="text-muted dark:text-muted-dark hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Feedback
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
