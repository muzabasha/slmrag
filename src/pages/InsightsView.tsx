import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Lightbulb, FlaskConical, Briefcase, TrendingUp, Shield, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import courseData from '../data/courseData'

const tabs = [
  { id: 'all', label: 'All Insights', icon: Lightbulb },
  { id: 'research', label: 'Research', icon: FlaskConical },
  { id: 'career', label: 'Career', icon: Briefcase },
  { id: 'industry', label: 'Industry', icon: TrendingUp },
]

export default function InsightsView() {
  const [activeTab, setActiveTab] = useState('all')

  return (
    <>
      <Helmet><title>Insights &amp; Applications - SLM &amp; RAG Workshop</title></Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text dark:text-text-dark">Insights &amp; Applications</h1>
            <p className="text-sm text-muted dark:text-muted-dark">Real-world relevance for every concept</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                    : 'bg-card dark:bg-card-dark text-text dark:text-text-dark border border-border dark:border-border-dark hover:border-primary/30 hover:text-primary'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="space-y-8">
          {courseData.modules.map((mod, mi) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: mi * 0.08 }}
            >
              {/* Module header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md text-white font-bold text-sm flex-shrink-0">
                  D{mod.day}
                </div>
                <div>
                  <h2 className="font-bold text-text dark:text-text-dark text-base">Day {mod.day}: {mod.title}</h2>
                </div>
              </div>

              {/* Topic cards */}
              <div className="grid md:grid-cols-2 gap-4">
                {mod.topics.map((topic, ti) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: ti * 0.05 }}
                    className="bg-card dark:bg-card-dark rounded-2xl p-5 border border-border dark:border-border-dark hover:border-primary/30 transition-colors"
                  >
                    <h3 className="font-bold text-text dark:text-text-dark text-sm mb-4 leading-snug">{topic.title}</h3>

                    {(activeTab === 'all' || activeTab === 'research') && (
                      <div className="mb-3">
                        <h4 className="text-xs font-bold text-primary mb-1.5 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5" /> Key Insights
                        </h4>
                        <ul className="space-y-1">
                          {topic.insights.keyInsights.slice(0, 2).map((ins, j) => (
                            <li key={j} className="text-xs text-text dark:text-text-dark flex items-start gap-1.5">
                              <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                              {ins}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {(activeTab === 'all' || activeTab === 'industry') && (
                      <div className="mb-3">
                        <h4 className="text-xs font-bold text-secondary mb-1.5 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5" /> Industrial Applications
                        </h4>
                        <ul className="space-y-1">
                          {topic.insights.industrialApplications.slice(0, 2).map((app, j) => (
                            <li key={j} className="text-xs text-text dark:text-text-dark flex items-start gap-1.5">
                              <span className="text-secondary flex-shrink-0">•</span>
                              {app}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {(activeTab === 'all' || activeTab === 'career') && (
                      <div className="p-3 rounded-xl bg-gradient-to-r from-primary/8 to-secondary/8 border border-primary/15">
                        <h4 className="text-xs font-bold text-primary mb-1 flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5" /> Career Relevance
                        </h4>
                        <p className="text-xs text-text dark:text-text-dark leading-relaxed">{topic.insights.careerRelevance}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}
