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
  { key: 'problemSolving', label: 'Problem Solving', color: '#7c3aed' },
]

export default function QuestionSection({ questions }: Props) {
  const [expandedQ, setExpandedQ] = useState<string | null>(null)

  return (
    <div className="p-6 pt-0 space-y-6">
      {(Object.keys(questions) as Array<keyof QuestionSectionType>).map((catKey, ci) => {
        const cat = categories[ci]
        const qs = questions[catKey]
        if (!qs || qs.length === 0) return null
        return (
          <div key={catKey}>
            <h4 className="font-bold text-lg mb-3" style={{ color: cat.color }}>{cat.label}</h4>
            <div className="space-y-3">
              {qs.map((q, i) => {
                const qId = `${catKey}-${i}`
                const isOpen = expandedQ === qId
                return (
                  <div key={i} className="border border-border dark:border-border-dark rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedQ(isOpen ? null : qId)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: cat.color }}>
                          {i + 1}
                        </span>
                        <p className="font-medium text-text dark:text-text-dark">{q.question}</p>
                      </div>
                      {isOpen ? <ChevronUp className="w-5 h-5 text-muted flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted flex-shrink-0" />}
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 space-y-3">
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Answer:</p>
                              <p className="text-text dark:text-text-dark">{q.answer}</p>
                            </div>
                            <p className="text-text dark:text-text-dark">
                              <span className="font-semibold">Explanation: </span>{q.explanation}
                            </p>
                            {q.discussionPoints.length > 0 && (
                              <div>
                                <h5 className="font-semibold text-sm text-text dark:text-text-dark mb-1 flex items-center gap-1">
                                  <MessageSquare className="w-4 h-4" />
                                  Discussion Points
                                </h5>
                                <ul className="space-y-1">
                                  {q.discussionPoints.map((dp, j) => (
                                    <li key={j} className="text-sm text-text dark:text-text-dark flex items-start gap-1">
                                      <span className="text-primary">•</span>
                                      {dp}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {q.commonMistakes.length > 0 && (
                              <div>
                                <h5 className="font-semibold text-sm text-text dark:text-text-dark mb-1 flex items-center gap-1">
                                  <AlertTriangle className="w-4 h-4 text-warning" />
                                  Common Mistakes
                                </h5>
                                <ul className="space-y-1">
                                  {q.commonMistakes.map((cm, j) => (
                                    <li key={j} className="text-sm text-text dark:text-text-dark flex items-start gap-1">
                                      <span className="text-warning">!</span>
                                      {cm}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {q.tips.length > 0 && (
                              <div>
                                <h5 className="font-semibold text-sm text-text dark:text-text-dark mb-1 flex items-center gap-1">
                                  <Lightbulb className="w-4 h-4 text-warning" />
                                  Tips
                                </h5>
                                <ul className="space-y-1">
                                  {q.tips.map((tip, j) => (
                                    <li key={j} className="text-sm text-text dark:text-text-dark flex items-start gap-1">
                                      <span className="text-warning">💡</span>
                                      {tip}
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
