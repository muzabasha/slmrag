import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { Menu, GraduationCap, Sun, Moon, Search, X, ArrowRight } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import courseData from '../data/courseData'

interface HeaderProps {
  toggleSidebar: () => void
  sidebarOpen: boolean
}

export default function Header({ toggleSidebar, sidebarOpen }: HeaderProps) {
  const { darkMode, toggleDarkMode } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    const results: { label: string; to: string; module: string }[] = []
    for (const mod of courseData.modules) {
      if (mod.title.toLowerCase().includes(q)) {
        results.push({ label: `Day ${mod.day}: ${mod.title}`, to: `/module/${mod.id}`, module: '' })
      }
      for (const topic of mod.topics) {
        if (topic.title.toLowerCase().includes(q) || topic.description.toLowerCase().includes(q)) {
          results.push({ label: topic.title, to: `/module/${mod.id}/topic/${topic.id}`, module: `Day ${mod.day}` })
        }
      }
    }
    return results.slice(0, 10)
  }, [searchQuery])

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

            {/* Center: Breadcrumb */}
            {!isHome && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 min-w-0 max-w-[40%] lg:max-w-none">
                <Link to="/" className="hover:text-primary transition-colors whitespace-nowrap flex-shrink-0">Home</Link>
                {location.pathname.split('/').filter(Boolean).map((segment, i, arr) => (
                  <span key={segment} className="flex items-center gap-1.5 min-w-0">
                    <span className="text-gray-300 dark:text-gray-600 flex-shrink-0">/</span>
                    <span className={`truncate ${i === arr.length - 1 ? 'text-gray-900 dark:text-white font-medium' : 'capitalize'}`}>
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
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 text-base"
                placeholder="Search topics, modules, concepts..."
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setSearchOpen(false)
                  if (e.key === 'Enter' && searchResults.length > 0) {
                    navigate(searchResults[0].to)
                    setSearchOpen(false)
                    setSearchQuery('')
                  }
                }}
              />
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-md font-mono">
                ESC
              </kbd>
            </div>
            {searchQuery.trim() ? (
              <div className="max-h-80 overflow-y-auto p-2">
                {searchResults.length === 0 ? (
                  <div className="p-6 text-center text-gray-400 dark:text-gray-500 text-sm">
                    No results found for &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : (
                  searchResults.map((result, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        navigate(result.to)
                        setSearchOpen(false)
                        setSearchQuery('')
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {result.label}
                        </p>
                        {result.module && (
                          <p className="text-xs text-gray-400 dark:text-gray-500">{result.module}</p>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </button>
                  ))
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-400 dark:text-gray-500 text-sm">
                Type to search across all workshop content...
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
