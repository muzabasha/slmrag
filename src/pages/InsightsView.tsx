import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Lightbulb, FlaskConical, Briefcase, TrendingUp, Shield } from 'lucide-react'
import { useState } from 'react'
import courseData from '../data/courseData'

export default function InsightsView() {
  const [activeTab, setActiveTab] = useState('all')

  const tabs = [
    { id: 'all', label: 'All Insights', icon: Lightbulb },
    { id: 'research', label: 'Research', icon: FlaskConical },
    { id: 'career', label: 'Career', icon: Briefcase },
    { id: 'industry', label: 'Industry', icon: TrendingUp },
  ]

  return (
    <>
      <Helmet><title>Insights & Applications - SLM & RAG Workshop</title></Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-6 flex items-center gap-2">
          <Lightbulb className="w-8 h-8 text-warning" />
          Insights & Applications
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-card dark:bg-card-dark text-text dark:text-text-dark border border-border dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="space-y-6">
          {courseData.modules.map((mod, mi) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: mi * 0.1 }}
            >
              <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-4 mb-4">
                <h2 className="text-xl font-bold text-white">Day {mod.day}: {mod.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {mod.topics.map((topic, ti) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: ti * 0.05 }}
                    className="bg-card dark:bg-card-dark rounded-xl p-5 border border-border dark:border-border-dark"
                  >
                    <h3 className="font-bold text-text dark:text-text-dark mb-3">{topic.title}</h3>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-1 flex items-center gap-1">
                          <Lightbulb className="w-4 h-4" />
                          Key Insights
                        </h4>
                        <ul className="space-y-1">
                          {topic.insights.keyInsights.slice(0, 2).map((ins, j) => (
                            <li key={j} className="text-sm text-text dark:text-text-dark flex items-start gap-1">
                              <span className="text-primary">•</span>
                              {ins}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-secondary mb-1 flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          Industrial Applications
                        </h4>
                        <ul className="space-y-1">
                          {topic.insights.industrialApplications.slice(0, 2).map((app, j) => (
                            <li key={j} className="text-sm text-text dark:text-text-dark flex items-start gap-1">
                              <span className="text-secondary">•</span>
                              {app}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-cyan-600 mb-1 flex items-center gap-1">
                          <Shield className="w-4 h-4" />
                          Career Relevance
                        </h4>
                        <p className="text-sm text-text dark:text-text-dark">{topic.insights.careerRelevance}</p>
                      </div>
                    </div>
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
