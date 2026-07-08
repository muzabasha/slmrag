import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  Home, BookOpen, BarChart3, GitBranch, CheckSquare,
  Lightbulb, MessageSquare, ChevronRight, GraduationCap,
  Library, BookMarked, ChevronLeft, PanelLeft
} from 'lucide-react'
import courseData from '../data/courseData'

interface SidebarProps {
  onClose: () => void
  collapsed: boolean
}

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/overview', label: 'Subject Overview', icon: BookOpen },
  { path: '/prerequisites', label: 'Prerequisites Map', icon: CheckSquare },
  { path: '/analytics', label: 'Learning Analytics', icon: BarChart3 },
  { path: '/dependency-graph', label: 'Topic Dependencies', icon: GitBranch },
  { path: '/question-bank', label: 'Question Bank', icon: Library },
  { path: '/insights', label: 'Insights & Applications', icon: Lightbulb },
  { path: '/feedback', label: 'Feedback & Review', icon: MessageSquare },
]

export default function Sidebar({ onClose, collapsed }: SidebarProps) {
  const location = useLocation()
  const [modulesOpen, setModulesOpen] = useState(true)

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-950">
      {/* Brand */}
      <div className={`border-b border-gray-100 dark:border-gray-800 ${collapsed ? 'p-3' : 'p-5'}`}>
        <Link to="/" onClick={onClose} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm leading-tight">SLM & RAG</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Workshop Portal</p>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5" aria-label="Sidebar navigation">
        {!collapsed && (
          <p className="px-3 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Main Menu</p>
        )}
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path
          return (
            <Link
              key={path}
              to={path}
              onClick={onClose}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary dark:from-primary/20 dark:to-transparent dark:text-primary-300 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
              {!collapsed && <span>{label}</span>}
              {!collapsed && isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
            </Link>
          )
        })}

        {/* Modules Section */}
        {!collapsed && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setModulesOpen(!modulesOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <span className="flex items-center gap-2">
                <BookMarked className="w-3.5 h-3.5" />
                Workshop Days
              </span>
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform duration-200 ${modulesOpen ? 'rotate-90' : ''}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                modulesOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pt-1 space-y-0.5">
                {courseData.modules.map((mod) => {
                  const isModActive = location.pathname === `/module/${mod.id}`
                  const hasTopics = mod.topics.length > 0
                  return (
                    <div key={mod.id}>
                      <Link
                        to={`/module/${mod.id}`}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          isModActive
                            ? 'bg-gradient-to-r from-secondary/10 to-secondary/5 text-secondary dark:from-secondary/20 dark:to-transparent dark:text-secondary-300'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                          isModActive
                            ? 'bg-secondary text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                        }`}>
                          {mod.day}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-medium">{mod.title}</p>
                          {hasTopics && (
                            <p className="text-xs text-gray-400 dark:text-gray-500">{mod.topics.length} topics</p>
                          )}
                        </div>
                        <ChevronRight className={`w-4 h-4 text-gray-300 dark:text-gray-600 transition-transform ${
                          isModActive ? 'rotate-90 text-secondary' : ''
                        }`} />
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Collapse Toggle + Footer */}
      <div className="border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={() => {
            const event = new CustomEvent('toggleSidebarCollapse')
            window.dispatchEvent(event)
          }}
          className={`w-full flex items-center gap-3 p-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
            collapsed ? 'justify-center' : 'justify-start'
          }`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeft className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="text-xs font-medium">Collapse</span>}
        </button>
        {!collapsed && (
          <footer className="p-4 pt-0">
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
              &copy; 2026 REVA University
            </p>
          </footer>
        )}
      </div>
    </div>
  )
}
