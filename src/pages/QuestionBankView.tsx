import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Library, Search } from 'lucide-react'
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
      <Helmet><title>Question Bank - SLM & RAG Workshop</title></Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-6 flex items-center gap-2">
          <Library className="w-8 h-8 text-primary" />
          Question Bank
        </h1>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search questions by topic..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-card dark:bg-card-dark border border-border dark:border-border-dark text-text dark:text-text-dark"
          />
        </div>

        <div className="space-y-8">
          {filtered.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-4 mb-4">
                <h2 className="text-xl font-bold text-white">{item.topic.title}</h2>
                <p className="text-white/80 text-sm">Day {item.module.day} — {item.module.title}</p>
              </div>
              <QuestionSection questions={item.questions} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}
