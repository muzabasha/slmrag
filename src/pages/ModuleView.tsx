import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, Clock, Target, Wrench, Award } from 'lucide-react'
import courseData from '../data/courseData'

export default function ModuleView() {
  const { moduleId } = useParams()
  const module = courseData.modules.find(m => m.id === moduleId)

  if (!module) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-text dark:text-text-dark">Module not found</h2>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">Back to Home</Link>
      </div>
    )
  }

  return (
    <>
      <Helmet><title>Day {module.day}: {module.title} - SLM & RAG Workshop</title></Helmet>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-white/20 text-white text-sm font-semibold rounded-full">Day {module.day}</span>
            <span className="px-3 py-1 bg-white/20 text-white text-sm font-semibold rounded-full">{module.deliverable}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{module.title}</h1>
          <p className="text-xl text-white/90 mb-4">{module.subtitle}</p>
        </div>

        {/* Objectives */}
        <div className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark mb-6">
          <h2 className="text-xl font-bold text-text dark:text-text-dark mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Learning Objectives
          </h2>
          <ul className="space-y-2">
            {module.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-text dark:text-text-dark">
                <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools & Skills */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark">
            <h3 className="font-bold text-text dark:text-text-dark mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" />
              Tools & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {module.tools.map((tool, i) => (
                <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{tool}</span>
              ))}
            </div>
          </div>
          <div className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark">
            <h3 className="font-bold text-text dark:text-text-dark mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-secondary" />
              Industry Skills Gained
            </h3>
            <div className="flex flex-wrap gap-2">
              {module.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Topics */}
        <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-4">Topics</h2>
        <div className="space-y-4">
          {module.topics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/module/${module.id}/topic/${topic.id}`}
                className="block bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark hover:shadow-lg hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-primary">Topic {i + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-text dark:text-text-dark mb-1">{topic.title}</h3>
                    <p className="text-text dark:text-text-dark mb-3">{topic.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted dark:text-muted-dark">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {topic.duration}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-primary flex-shrink-0 mt-2" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}
