import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Lightbulb, AlertTriangle, MessageSquare } from 'lucide-react'
import type { QuestionSection as QuestionSectionType } from '../types'

interface Props {
  questions: QuestionSectionType
}

const categories = [
  { key: 'conceptual', label: 'Conceptual Questions', color: '#3b82f6' },
  { key: 'numerical', label: 'Numerical Questions', color: '#ef4444' },
  { key: 'application', label: 'Application Based', color: '#10b981' },
  { key: 'problemSolving', label: 'Problem Solving', color: '#8b5cf6' },
]

export default function QuestionSection({ questions }: Props) {
  const [expandedQ, setExpandedQ] = useState<string | null>(null)

  return (
    <div className="p-5 pt-0 space-y-6">
      {(Object.keys(questions) as Array<keyof QuestionSectionType>).map((catKey, ci) => {
        const cat = categories[ci]
        const qs = questions[catKey]
        if (!qs || qs.length === 0) return null
        return (
          <div key={catKey}>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
              {cat.label}
            </h4>
            <div className="space-y-2">
              {qs.map((q, i) => {
                const qId = `${catKey}-${i}`
                const isOpen = expandedQ === qId
                return (
                  <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
                    <button
                      onClick={() => setExpandedQ(isOpen ? null : qId)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: cat.color }}
                        >
                          {i + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{q.question}</p>
                        </div>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-3 border-t border-gray-100 dark:border-gray-800 pt-3">
                            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-1">Answer</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">{q.answer}</p>
                            </div>

                            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                              <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">Explanation</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">{q.explanation}</p>
                            </div>

                            {q.discussionPoints.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
                                  <MessageSquare className="w-3 h-3" />
                                  Discussion Points
                                </p>
                                <ul className="space-y-0.5">
                                  {q.discussionPoints.map((dp, j) => (
                                    <li key={j} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                                      <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                                      {dp}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {q.commonMistakes.length > 0 && (
                              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-1.5 flex items-center gap-1.5">
                                  <AlertTriangle className="w-3 h-3" />
                                  Common Mistakes
                                </p>
                                <ul className="space-y-0.5">
                                  {q.commonMistakes.map((m, j) => (
                                    <li key={j} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                                      <div className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                                      {m}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {q.tips.length > 0 && (
                              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-1.5 flex items-center gap-1.5">
                                  <Lightbulb className="w-3 h-3" />
                                  Tips
                                </p>
                                <ul className="space-y-0.5">
                                  {q.tips.map((t, j) => (
                                    <li key={j} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                                      <div className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                                      {t}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
