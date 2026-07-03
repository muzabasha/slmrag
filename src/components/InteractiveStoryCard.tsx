import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookMarked, MessageSquare, Lightbulb, Code, Play } from 'lucide-react'
import type { Story } from '../types'

interface Props {
  story: Story
}

export default function InteractiveStoryCard({ story }: Props) {
  const [activeTab, setActiveTab] = useState<'story' | 'technical' | 'reflect'>('story')
  const [isNarratorReading, setIsNarratorReading] = useState(false)

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      if (isNarratorReading) {
        window.speechSynthesis.cancel()
        setIsNarratorReading(false)
      } else {
        const utterance = new SpeechSynthesisUtterance(story.narrative)
        utterance.rate = 0.9
        utterance.pitch = 1.0
        utterance.onend = () => setIsNarratorReading(false)
        window.speechSynthesis.speak(utterance)
        setIsNarratorReading(true)
      }
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-700">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveTab('story')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            activeTab === 'story'
              ? 'bg-purple-600 text-white shadow-lg scale-105'
              : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800'
          }`}
        >
          <BookMarked className="w-4 h-4" />
          Story
        </button>
        <button
          onClick={() => setActiveTab('technical')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            activeTab === 'technical'
              ? 'bg-purple-600 text-white shadow-lg scale-105'
              : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800'
          }`}
        >
          <Code className="w-4 h-4" />
          Technical
        </button>
        <button
          onClick={() => setActiveTab('reflect')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            activeTab === 'reflect'
              ? 'bg-purple-600 text-white shadow-lg scale-105'
              : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Reflect
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'story' && (
          <motion.div
            key="story"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-2xl text-purple-600 dark:text-purple-400">
                  {story.analogy}
                </h4>
                <button
                  onClick={handleReadAloud}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
                    isNarratorReading
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/60'
                  }`}
                  title="Read aloud"
                >
                  <Play className={`w-4 h-4 ${isNarratorReading ? 'animate-pulse' : ''}`} />
                  {isNarratorReading ? 'Stop' : 'Read'}
                </button>
              </div>
              <p className="text-text dark:text-text-dark leading-relaxed whitespace-pre-line text-lg">
                {story.narrative}
              </p>
            </div>

            <div className="mt-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg p-4">
              <h5 className="font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Key Takeaway
              </h5>
              <p className="text-text dark:text-text-dark">{story.connection}</p>
            </div>

            <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h5 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Life Skill</h5>
              <p className="text-text dark:text-text-dark">{story.lifeSkills}</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'technical' && (
          <motion.div
            key="technical"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-xl text-purple-600 dark:text-purple-400 mb-4">
                Technical Deep Dive
              </h4>
              <ul className="space-y-3">
                {story.technicalExplanation.map((exp: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900/70 transition-colors"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="text-text dark:text-text-dark">{exp}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {activeTab === 'reflect' && (
          <motion.div
            key="reflect"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h4 className="font-bold text-xl text-purple-600 dark:text-purple-400 mb-4">
                Reflective Questions
              </h4>
              <div className="space-y-4">
                {story.reflectiveQuestions.map((q: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700"
                  >
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-text dark:text-text-dark font-medium mb-2">{q}</p>
                        <textarea
                          className="w-full p-3 rounded-lg border border-purple-200 dark:border-purple-700 bg-white dark:bg-gray-900 text-text dark:text-text-dark resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          rows={2}
                          placeholder="Write your thoughts here..."
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
