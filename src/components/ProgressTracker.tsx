import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Circle, Trophy } from 'lucide-react'

interface ProgressData {
  [key: string]: {
    completed: boolean
    timeSpent?: number
    lastVisited?: string
  }
}

export default function ProgressTracker() {
  const [totalTopics, setTotalTopics] = useState(0)
  const [completedTopics, setCompletedTopics] = useState(0)

  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem('courseProgress')
    if (saved) {
      const data = JSON.parse(saved)
      calculateProgress(data)
    }
  }, [])

  const calculateProgress = (data: ProgressData) => {
    const completed = Object.values(data).filter(item => item.completed).length
    setCompletedTopics(completed)
    setTotalTopics(Object.keys(data).length || 1)
  }

  const progressPercentage = (completedTopics / totalTopics) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8" />
          <div>
            <h3 className="font-bold text-xl">Your Progress</h3>
            <p className="text-white/80 text-sm">Keep up the great work!</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{Math.round(progressPercentage)}%</div>
          <p className="text-white/80 text-sm">{completedTopics} of {totalTopics} topics</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-4 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute top-0 left-0 h-full bg-white rounded-full"
        />
      </div>

      {/* Milestones */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <div className="flex items-center gap-2">
          {progressPercentage >= 25 ? (
            <CheckCircle className="w-5 h-5 text-green-300" />
          ) : (
            <Circle className="w-5 h-5 text-white/40" />
          )}
          <span className={progressPercentage >= 25 ? 'font-semibold' : 'text-white/60'}>
            Getting Started
          </span>
        </div>
        <div className="flex items-center gap-2">
          {progressPercentage >= 50 ? (
            <CheckCircle className="w-5 h-5 text-green-300" />
          ) : (
            <Circle className="w-5 h-5 text-white/40" />
          )}
          <span className={progressPercentage >= 50 ? 'font-semibold' : 'text-white/60'}>
            Halfway There
          </span>
        </div>
        <div className="flex items-center gap-2">
          {progressPercentage >= 75 ? (
            <CheckCircle className="w-5 h-5 text-green-300" />
          ) : (
            <Circle className="w-5 h-5 text-white/40" />
          )}
          <span className={progressPercentage >= 75 ? 'font-semibold' : 'text-white/60'}>
            Almost Done
          </span>
        </div>
        <div className="flex items-center gap-2">
          {progressPercentage >= 100 ? (
            <Trophy className="w-5 h-5 text-yellow-300" />
          ) : (
            <Trophy className="w-5 h-5 text-white/40" />
          )}
          <span className={progressPercentage >= 100 ? 'font-semibold' : 'text-white/60'}>
            Complete!
          </span>
        </div>
      </div>
    </motion.div>
  )
}
