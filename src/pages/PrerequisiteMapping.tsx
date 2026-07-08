import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { CheckSquare, ArrowRight, BookOpen, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import courseData from '../data/courseData'

const prerequisiteMap = [
  { prereq: 'Python Programming', module: 'Day 1–6', relevance: 'All coding activities' },
  { prereq: 'NumPy, Pandas, Matplotlib', module: 'Day 3–4', relevance: 'Data processing & visualization' },
  { prereq: 'Machine Learning Basics', module: 'Day 1–2', relevance: 'Understanding model evaluation' },
  { prereq: 'Artificial Neural Networks', module: 'Day 1, 3', relevance: 'Transformer architecture' },
  { prereq: 'Linear Algebra & Probability', module: 'Day 1', relevance: 'Embeddings & attention math' },
  { prereq: 'Git & GitHub', module: 'Day 6', relevance: 'Version control & deployment' },
  { prereq: 'REST API Basics', module: 'Day 6', relevance: 'Building AI application APIs' },
]

export default function PrerequisiteMapping() {
  const [checked, setChecked] = useState<Record<number, boolean>>({})

  const toggleCheck = (i: number) => {
    setChecked(prev => ({ ...prev, [i]: !prev[i] }))
  }

  const checkedCount = Object.values(checked).filter(Boolean).length
  const total = courseData.prerequisites.length
  const pct = Math.round((checkedCount / total) * 100)

  return (
    <>
      <Helmet><title>Prerequisite Mapping - SLM &amp; RAG Workshop</title></Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <CheckSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text dark:text-text-dark">Prerequisite Mapping</h1>
            <p className="text-sm text-muted dark:text-muted-dark">Track your foundational knowledge</p>
          </div>
        </div>

        {/* Self-Assessment — shown first for engagement */}
        <div className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark mb-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-text dark:text-text-dark">Self-Assessment Checklist</h3>
            <div className="text-right">
              <span className="text-xl font-bold text-primary">{checkedCount}/{total}</span>
              <p className="text-xs text-muted dark:text-muted-dark">{pct}% ready</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-border dark:bg-border-dark rounded-full overflow-hidden mb-5">
            <motion.div
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            />
          </div>

          <div className="space-y-2">
            {courseData.prerequisites.map((pr, i) => (
              <button
                key={i}
                onClick={() => toggleCheck(i)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all border ${
                  checked[i]
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30'
                    : 'bg-gray-50 dark:bg-gray-800/50 border-border dark:border-border-dark hover:border-primary/30'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  checked[i] ? 'bg-emerald-500 text-white' : 'border-2 border-muted dark:border-muted-dark'
                }`}>
                  {checked[i] && <CheckCircle className="w-3 h-3" />}
                </div>
                <span className={`text-sm font-medium ${checked[i] ? 'text-emerald-700 dark:text-emerald-400 line-through' : 'text-text dark:text-text-dark'}`}>
                  {pr}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Two column info panels */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark">
            <h3 className="font-bold text-text dark:text-text-dark mb-4 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              Required Prerequisites
            </h3>
            <div className="space-y-2">
              {courseData.prerequisites.map((pr, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-text dark:text-text-dark p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  {pr}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark">
            <h3 className="font-bold text-text dark:text-text-dark mb-4">Prerequisite to Module Mapping</h3>
            <div className="space-y-3">
              {prerequisiteMap.map((pm, i) => (
                <div key={i} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-border/50 dark:border-border-dark/50">
                  <div className="font-semibold text-text dark:text-text-dark text-sm">{pm.prereq}</div>
                  <div className="text-xs text-muted dark:text-muted-dark mt-0.5">
                    <span className="text-primary font-medium">{pm.module}</span> — {pm.relevance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
