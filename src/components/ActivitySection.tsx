import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Clock, Users, Target, ClipboardList, GraduationCap, BookOpen } from 'lucide-react'
import type { ActivitySection as ActivitySectionType } from '../types'

interface Props {
  activities: ActivitySectionType
}

const levelColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']

const levelMeta = [
  { label: 'Teacher Do', icon: GraduationCap },
  { label: 'Teacher + Student', icon: Users },
  { label: 'All Students Do', icon: BookOpen },
  { label: 'Individual Do', icon: Target },
]

export default function ActivitySection({ activities }: Props) {
  const [expandedLevel, setExpandedLevel] = useState<number | null>(0)

  return (
    <div className="p-5 pt-0 space-y-3">
      {activities.levels.map((level, i) => {
        const { icon: LevelIcon, label } = levelMeta[i]
        return (
          <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
            <button
              onClick={() => setExpandedLevel(expandedLevel === i ? null : i)}
              className="w-full flex items-center justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
              style={{ borderLeft: `3px solid ${levelColors[i]}` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${levelColors[i]}15` }}>
                  <LevelIcon className="w-4 h-4" style={{ color: levelColors[i] }} />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold" style={{ color: levelColors[i] }}>
                    Level {level.level} &mdash; {label}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{level.title}</h4>
                </div>
              </div>
              {expandedLevel === i ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>

            <AnimatePresence>
              {expandedLevel === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-4 border-t border-gray-100 dark:border-gray-800 pt-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{level.description}</p>

                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {level.timeRequired}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <ClipboardList className="w-3.5 h-3.5" />
                        {level.materials.join(', ')}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Objectives</p>
                      <ul className="space-y-0.5">
                        {level.objectives.map((obj, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Instructions</p>
                      <ol className="space-y-1">
                        {level.instructions.map((inst, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <span className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-gray-500">
                              {j + 1}
                            </span>
                            {inst}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Rubrics</p>
                      <div className="flex flex-wrap gap-2">
                        {level.rubrics.map((r, j) => (
                          <span key={j} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300">
                            {r.criterion}
                            <span className="font-bold text-primary">{r.weight}%</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
