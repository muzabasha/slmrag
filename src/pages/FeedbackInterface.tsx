import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { MessageSquare, ThumbsUp, ThumbsDown, Send } from 'lucide-react'
import { useState } from 'react'

export default function FeedbackInterface() {
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFeedback('')
      setRating(null)
    }, 3000)
  }

  return (
    <>
      <Helmet><title>Feedback & Review - SLM & RAG Workshop</title></Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-6 flex items-center gap-2">
          <MessageSquare className="w-8 h-8 text-primary" />
          Human-in-the-Loop Feedback
        </h1>

        <div className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark mb-6">
          <p className="text-text dark:text-text-dark mb-6">
            Your feedback helps us improve the learning experience. Each topic submission goes through
            human review before proceeding to the next concept.
          </p>

          {/* Rating */}
          <div className="mb-6">
            <h3 className="font-bold text-text dark:text-text-dark mb-3">Rate your understanding of the current topic:</h3>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  className={`w-12 h-12 rounded-lg font-bold text-lg transition-colors ${
                    rating === n
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-text dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Feedback */}
          <div className="flex gap-3 mb-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
              <ThumbsUp className="w-4 h-4" />
              I understand
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
              <ThumbsDown className="w-4 h-4" />
              Need clarification
            </button>
          </div>

          {/* Text Feedback */}
          <div className="mb-4">
            <h3 className="font-bold text-text dark:text-text-dark mb-2">Detailed Feedback:</h3>
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              className="w-full p-4 rounded-lg border border-border dark:border-border-dark bg-white dark:bg-gray-800 text-text dark:text-text-dark resize-none"
              rows={5}
              placeholder="What did you like? What can be improved? Any questions?"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!feedback.trim() && rating === null}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            {submitted ? 'Submitted!' : 'Submit Feedback'}
          </button>
        </div>

        {/* Feedback Status */}
        <div className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark">
          <h3 className="font-bold text-text dark:text-text-dark mb-4">Feedback Review Status</h3>
          <div className="space-y-3">
            {['Day 1: Foundations', 'Day 2: Prompt Engineering', 'Day 3: Fine-tuning', 'Day 4: RAG Systems', 'Day 5: Advanced RAG', 'Day 6: Deployment'].map((day, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <span className="text-text dark:text-text-dark">{day}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  i === 0 ? 'bg-green-100 text-green-700' :
                  i === 1 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {i === 0 ? 'Approved' : i === 1 ? 'Pending Review' : 'Not Started'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}
