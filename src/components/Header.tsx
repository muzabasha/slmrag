import { Link } from 'react-router-dom'
import { Menu, Sun, Moon, GraduationCap } from 'lucide-react'

interface HeaderProps {
  toggleSidebar: () => void
  darkMode: boolean
  toggleDarkMode: () => void
}

export default function Header({ toggleSidebar, darkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 h-16 bg-card/80 dark:bg-card-dark/80 glass border-b border-border/50 dark:border-border-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

        {/* Left: burger + logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-primary/10 text-muted dark:text-muted-dark hover:text-primary transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2 ml-1 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-text dark:text-text-dark hidden sm:block tracking-tight">
              SLM &amp; RAG Workshop
            </span>
          </Link>
        </div>

        {/* Right: theme toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-primary/10 text-muted dark:text-muted-dark hover:text-primary transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode
            ? <Sun className="w-5 h-5 text-yellow-500" />
            : <Moon className="w-5 h-5" />
          }
        </button>
      </div>
    </header>
  )
}
