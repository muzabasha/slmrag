import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { MessageSquare, ThumbsUp, ThumbsDown, Send, CheckCircle } from 'lucide-react'
import { useState } from 'react'

const reviewStatuses = [
  'Day 1: Foundations',
  'Day 2: Prompt Engineering',
  'Day 3: Fine-tuning',
  'Day 4: RAG Systems',
  'Day 5: Advanced RAG',
  'Day 6: Deployment',
]

const statusConfig: Record<number, { label: string; className: string }> = {
  0: { label: 'Approved', className: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' },
  1: { label: 'Pending Review', className: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' },
}

export default function FeedbackInterface() {
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState<number | null>(null)
  const [quickFeedback, setQuickFeedback] = useState<'good' | 'clarify' | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!feedback.trim() && rating === null) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFeedback('')
      setRating(null)
      setQuickFeedback(null)
    }, 3000)
  }

  return (
    <>
      <Helmet><title>Feedback &amp; Review - SLM &amp; RAG Workshop</title></Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">

        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text dark:text-text-dark">Human-in-the-Loop Feedback</h1>
            <p className="text-sm text-muted dark:text-muted-dark">Help us improve the learning experience</p>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark mb-5">
          <p className="text-sm text-muted dark:text-muted-dark mb-6 leading-relaxed">
            Your feedback helps us improve the learning experience. Each submission goes through
            human review before updating the next concept.
          </p>

          {/* Rating */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-text dark:text-text-dark mb-3">Rate your understanding (1–5):</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  className={`w-11 h-11 rounded-xl font-bold text-base transition-all ${
                    rating === n
                      ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-md scale-110'
                      : 'bg-gray-100 dark:bg-gray-800 text-text dark:text-text-dark hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Feedback */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setQuickFeedback('good')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                quickFeedback === 'good'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/30'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              I understand this well
            </button>
            <button
              onClick={() => setQuickFeedback('clarify')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                quickFeedback === 'clarify'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/30'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              Need clarification
            </button>
          </div>

          {/* Detailed Feedback */}
          <div className="mb-5">
            <label className="text-sm font-bold text-text dark:text-text-dark mb-2 block">
              Detailed Feedback
            </label>
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              className="w-full p-4 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-text dark:text-text-dark resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
              rows={5}
              placeholder="What did you like? What can be improved? Any questions?"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!feedback.trim() && rating === null}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl text-sm hover:opacity-90 hover:scale-105 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
          >
            {submitted ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Submitted! Thank you
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Feedback
              </>
            )}
          </button>
        </div>

        {/* Feedback Review Status */}
        <div className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark">
          <h3 className="font-bold text-text dark:text-text-dark mb-4">Feedback Review Status</h3>
          <div className="space-y-2.5">
            {reviewStatuses.map((day, i) => {
              const status = statusConfig[i] ?? { label: 'Not Started', className: 'bg-gray-100 dark:bg-gray-800 text-muted dark:text-muted-dark' }
              return (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-border/50 dark:border-border-dark/50">
                  <span className="text-sm text-text dark:text-text-dark font-medium">{day}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.className}`}>
                    {status.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </>
  )
}
