import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg mb-6">
        <Search className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white mb-2">404</h1>
      <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">Page not found</p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/25"
      >
        <Home className="w-4 h-4" />
        Back to Home
      </Link>
    </motion.div>
  )
}
