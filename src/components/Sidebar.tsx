import { Link, useLocation } from 'react-router-dom'
import {
  Home, BookOpen, BarChart3, MessageSquare, GitBranch,
  CheckSquare, Lightbulb, Library, ArrowRight
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
    <nav className="h-full overflow-y-auto p-4">
      <div className="space-y-1 mb-6">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-text dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>

      <div className="border-t border-border dark:border-border-dark pt-4">
        <h4 className="text-sm font-semibold text-muted dark:text-muted-dark uppercase tracking-wider mb-2 px-3">
          Modules
        </h4>
        {courseData.modules.map(module => {
          const isActive = location.pathname === `/module/${module.id}`
          return (
            <Link
              key={module.id}
              to={`/module/${module.id}`}
              onClick={onClose}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors mb-1 ${
                isActive
                  ? 'bg-primary/10 text-primary dark:text-primary-light'
                  : 'text-text dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="truncate">Day {module.day}: {module.title}</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
