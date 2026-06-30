import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { CheckSquare, ArrowRight, BookOpen } from 'lucide-react'
import courseData from '../data/courseData'

const prerequisiteMap = [
  { prereq: 'Python Programming', module: 'Day 1-6', relevance: 'All coding activities' },
  { prereq: 'NumPy, Pandas, Matplotlib', module: 'Day 3-4', relevance: 'Data processing & visualization' },
  { prereq: 'Machine Learning Basics', module: 'Day 1-2', relevance: 'Understanding model evaluation' },
  { prereq: 'Artificial Neural Networks', module: 'Day 1, 3', relevance: 'Transformer architecture' },
  { prereq: 'Linear Algebra & Probability', module: 'Day 1', relevance: 'Embeddings & attention math' },
  { prereq: 'Git & GitHub', module: 'Day 6', relevance: 'Version control & deployment' },
  { prereq: 'REST API Basics', module: 'Day 6', relevance: 'Building AI application APIs' },
]

export default function PrerequisiteMapping() {
  return (
    <>
      <Helmet><title>Prerequisite Mapping - SLM & RAG Workshop</title></Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-6 flex items-center gap-2">
          <CheckSquare className="w-8 h-8 text-primary" />
          Prerequisite Mapping
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark">
            <h3 className="font-bold text-lg text-text dark:text-text-dark mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Required Prerequisites
            </h3>
            <div className="space-y-2">
              {courseData.prerequisites.map((pr, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-text dark:text-text-dark p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  {pr}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark">
            <h3 className="font-bold text-lg text-text dark:text-text-dark mb-3">Prerequisite to Module Mapping</h3>
            <div className="space-y-3">
              {prerequisiteMap.map((pm, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                  <div className="font-semibold text-text dark:text-text-dark">{pm.prereq}</div>
                  <div className="text-sm text-muted dark:text-muted-dark">
                    Used in {pm.module} — {pm.relevance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark">
          <h3 className="font-bold text-lg text-text dark:text-text-dark mb-4">Self-Assessment Checklist</h3>
          <div className="space-y-3">
            {courseData.prerequisites.map((pr, i) => (
              <label key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-text dark:text-text-dark">{pr}</span>
              </label>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}
