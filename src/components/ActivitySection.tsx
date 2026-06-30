import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Clock, Users, Target, ClipboardList } from 'lucide-react'
import type { ActivitySection as ActivitySectionType } from '../types'

interface Props {
  activities: ActivitySectionType
}

const levelColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']
const levelLabels = ['Teacher Do', 'Teacher + Student', 'All Students Do', 'Individual Do']
const levelIcons = ['👨‍🏫', '🤝', '👥', '🧑‍💻']

export default function ActivitySection({ activities }: Props) {
  const [expandedLevel, setExpandedLevel] = useState<number | null>(0)

  return (
    <div className="p-6 pt-0 space-y-3">
      {activities.levels.map((level, i) => (
        <div key={i} className="rounded-lg border border-border dark:border-border-dark overflow-hidden">
          <button
            onClick={() => setExpandedLevel(expandedLevel === i ? null : i)}
            className="w-full flex items-center justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
            style={{ borderLeft: `4px solid ${levelColors[i]}` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{levelIcons[i]}</span>
              <div className="text-left">
                <div className="text-sm font-semibold" style={{ color: levelColors[i] }}>
                  Level {level.level} — {levelLabels[i]}
                </div>
                <h4 className="font-bold text-text dark:text-text-dark">{level.title}</h4>
              </div>
            </div>
            {expandedLevel === i ? <ChevronUp className="w-5 h-5 text-muted" /> : <ChevronDown className="w-5 h-5 text-muted" />}
          </button>

          <AnimatePresence>
            {expandedLevel === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 space-y-3">
                  <p className="text-text dark:text-text-dark">{level.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-muted dark:text-muted-dark">
                      <Clock className="w-4 h-4" />
                      {level.timeRequired}
                    </div>
                    <div className="flex items-center gap-1 text-muted dark:text-muted-dark">
                      <Users className="w-4 h-4" />
                      {level.materials.join(', ')}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-sm text-text dark:text-text-dark mb-1 flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      Objectives
                    </h5>
                    <ul className="space-y-1">
                      {level.objectives.map((obj, j) => (
                        <li key={j} className="text-sm text-text dark:text-text-dark flex items-start gap-1">
                          <span className="text-primary mt-1">•</span>
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-sm text-text dark:text-text-dark mb-1 flex items-center gap-1">
                      <ClipboardList className="w-4 h-4" />
                      Instructions
                    </h5>
                    <ol className="space-y-1 list-decimal list-inside">
                      {level.instructions.map((inst, j) => (
                        <li key={j} className="text-sm text-text dark:text-text-dark">{inst}</li>
                      ))}
                    </ol>
                  </div>

                  {level.rubrics.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-sm text-text dark:text-text-dark mb-1">Assessment Rubrics</h5>
                      <div className="space-y-1">
                        {level.rubrics.map((r, j) => (
                          <div key={j} className="flex items-center justify-between text-sm bg-gray-50 dark:bg-gray-800/50 rounded px-3 py-1">
                            <span className="text-text dark:text-text-dark">{r.criterion}</span>
                            <span className="font-semibold text-primary">{r.weight}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
