import { Link } from 'react-router-dom'
import { Menu, Sun, Moon, GraduationCap } from 'lucide-react'

interface HeaderProps {
  toggleSidebar: () => void
  darkMode: boolean
  toggleDarkMode: () => void
}

export default function Header({ toggleSidebar, darkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 h-16 bg-card dark:bg-card-dark border-b border-border dark:border-border-dark shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6 text-text dark:text-text-dark" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-text dark:text-text-dark hidden sm:block">
              SLM & RAG Workshop
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-warning" /> : <Moon className="w-5 h-5 text-text" />}
          </button>
        </div>
      </div>
    </header>
  )
}
