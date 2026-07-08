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

const milestones = [
  { label: 'Getting Started', threshold: 25 },
  { label: 'Halfway There', threshold: 50 },
  { label: 'Almost Done', threshold: 75 },
  { label: 'Complete!', threshold: 100, isTrophy: true },
]

export default function ProgressTracker() {
  const [totalTopics, setTotalTopics] = useState(0)
  const [completedTopics, setCompletedTopics] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('courseProgress')
    if (saved) {
      try {
        const data: ProgressData = JSON.parse(saved)
        const completed = Object.values(data).filter(item => item.completed).length
        const total = Object.keys(data).length
        setCompletedTopics(completed)
        setTotalTopics(total)
      } catch {
        // ignore malformed data
      }
    }
  }, [])

  // Safe division — avoids NaN when no progress data is loaded yet
  const progressPercentage = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-5 mb-8 border border-primary/20 bg-gradient-to-br from-primary/8 via-secondary/5 to-transparent dark:from-primary/15 dark:via-secondary/10"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg flex-shrink-0">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-base text-text dark:text-text-dark leading-tight">Your Progress</h3>
            <p className="text-muted dark:text-muted-dark text-xs">Keep up the great work!</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</div>
          <p className="text-muted dark:text-muted-dark text-xs">{completedTopics} of {totalTopics} topics</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2.5 bg-border dark:bg-border-dark rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full"
        />
      </div>

      {/* Milestones */}
      <div className="flex items-center justify-between flex-wrap gap-x-3 gap-y-1">
        {milestones.map(({ label, threshold, isTrophy }) => {
          const achieved = progressPercentage >= threshold
          return (
            <div key={label} className="flex items-center gap-1.5 text-xs">
              {isTrophy ? (
                <Trophy className={`w-3.5 h-3.5 flex-shrink-0 ${achieved ? 'text-yellow-500' : 'text-muted dark:text-muted-dark'}`} />
              ) : achieved ? (
                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-success" />
              ) : (
                <Circle className="w-3.5 h-3.5 flex-shrink-0 text-muted dark:text-muted-dark" />
              )}
              <span className={achieved ? 'font-semibold text-text dark:text-text-dark' : 'text-muted dark:text-muted-dark'}>
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
