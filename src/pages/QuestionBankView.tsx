import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Library, Search, X } from 'lucide-react'
import { useState } from 'react'
import courseData from '../data/courseData'
import QuestionSection from '../components/QuestionSection'

export default function QuestionBankView() {
  const [searchQuery, setSearchQuery] = useState('')

  const allQuestions = courseData.modules.flatMap(m =>
    m.topics.map(t => ({
      module: m,
      topic: t,
      questions: t.questions,
    }))
  )

  const filtered = allQuestions.filter(item =>
    item.topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.module.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <Helmet><title>Question Bank - SLM &amp; RAG Workshop</title></Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <Library className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text dark:text-text-dark">Question Bank</h1>
            <p className="text-sm text-muted dark:text-muted-dark">{allQuestions.length} topics — {filtered.length} shown</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by topic or module name…"
            className="w-full pl-11 pr-11 py-3 rounded-xl bg-card dark:bg-card-dark border border-border dark:border-border-dark text-text dark:text-text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-text dark:hover:text-text-dark transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted dark:text-muted-dark">
            <Library className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No topics match your search.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filtered.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                {/* Topic header strip */}
                <div className="flex items-center gap-3 mb-3 px-1">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm text-white text-xs font-bold flex-shrink-0">
                    D{item.module.day}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-text dark:text-text-dark leading-tight">{item.topic.title}</h2>
                    <p className="text-xs text-muted dark:text-muted-dark">Day {item.module.day} — {item.module.title}</p>
                  </div>
                </div>
                <div className="bg-card dark:bg-card-dark rounded-2xl border border-border dark:border-border-dark overflow-hidden">
                  <QuestionSection questions={item.questions} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </>
  )
}
