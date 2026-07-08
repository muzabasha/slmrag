import { Link, useLocation } from 'react-router-dom'
import {
  Home, BookOpen, BarChart3, MessageSquare, GitBranch,
  CheckSquare, Lightbulb, Library, ChevronRight
} from 'lucide-react'
import courseData from '../data/courseData'

interface SidebarProps {
  onClose: () => void
}

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/overview', icon: BookOpen, label: 'Subject Overview' },
  { to: '/prerequisites', icon: CheckSquare, label: 'Prerequisites' },
  { to: '/analytics', icon: BarChart3, label: 'Learning Analytics' },
  { to: '/dependency-graph', icon: GitBranch, label: 'Topic Dependencies' },
  { to: '/question-bank', icon: Library, label: 'Question Bank' },
  { to: '/insights', icon: Lightbulb, label: 'Insights & Applications' },
  { to: '/feedback', icon: MessageSquare, label: 'Feedback & Review' },
]

export default function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation()

  return (
    <nav className="h-full flex flex-col p-4" aria-label="Main navigation">
      {/* Navigation Links */}
      <div className="space-y-0.5 mb-5">
        <p className="text-xs font-bold text-muted dark:text-muted-dark uppercase tracking-widest mb-2 px-3">Navigation</p>
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                  : 'text-text dark:text-text-dark hover:bg-primary/8 dark:hover:bg-primary/15 hover:text-primary'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Modules Section */}
      <div className="border-t border-border dark:border-border-dark pt-4 flex-1 overflow-y-auto">
        <p className="text-xs font-bold text-muted dark:text-muted-dark uppercase tracking-widest mb-2 px-3">
          Workshop Days
        </p>
        <div className="space-y-0.5">
          {courseData.modules.map(module => {
            const isActive = location.pathname.startsWith(`/module/${module.id}`)
            return (
              <Link
                key={module.id}
                to={`/module/${module.id}`}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-primary/10 text-primary dark:text-primary-light border border-primary/20'
                    : 'text-text dark:text-text-dark hover:bg-primary/8 dark:hover:bg-primary/15 hover:text-primary'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    isActive ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                  }`}>
                    {module.day}
                  </span>
                  <span className="truncate">{module.title}</span>
                </div>
                <ChevronRight className="w-3 h-3 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 mt-2 border-t border-border dark:border-border-dark">
        <p className="text-xs text-muted dark:text-muted-dark text-center">
          © 2026 REVA University
        </p>
      </div>
    </nav>
  )
}
