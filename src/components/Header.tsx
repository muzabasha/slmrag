import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, GraduationCap, Sun, Moon, Search, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

interface HeaderProps {
  toggleSidebar: () => void
  sidebarOpen: boolean
}

export default function Header({ toggleSidebar, sidebarOpen }: HeaderProps) {
  const { darkMode, toggleDarkMode } = useTheme()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const win = window
      const doc = document.documentElement
      const scrollTop = win.scrollY
      const docHeight = doc.scrollHeight - win.innerHeight
      setScrolled(scrollTop > 20)
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = location.pathname === '/'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-lg shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="hidden sm:block font-bold text-gray-900 dark:text-white text-lg tracking-tight">
                  SLM & RAG
                </span>
              </Link>
            </div>

            {/* Center: Breadcrumb (desktop, not on home) */}
            {!isHome && scrolled && (
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                {location.pathname.split('/').filter(Boolean).map((segment, i, arr) => (
                  <span key={segment} className="flex items-center gap-2">
                    <span className="text-gray-300 dark:text-gray-600">/</span>
                    <span className={i === arr.length - 1 ? 'text-gray-900 dark:text-white font-medium capitalize' : 'capitalize'}>
                      {segment.replace(/-/g, ' ')}
                    </span>
                  </span>
                ))}
              </div>
            )}

            {/* Right: Search + Theme */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:block"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-yellow-400 transition-transform hover:rotate-45 duration-300" />
                ) : (
                  <Moon className="w-4 h-4 transition-transform hover:-rotate-12 duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="h-0.5 bg-gray-100 dark:bg-gray-800">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-down">
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                autoFocus
                className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 text-base"
                placeholder="Search topics, modules, concepts..."
                onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
              />
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-md font-mono">
                ESC
              </kbd>
            </div>
            <div className="p-8 text-center text-gray-400 dark:text-gray-500 text-sm">
              Type to search across all workshop content...
            </div>
          </div>
        </div>
      )}
    </>
  )
}
