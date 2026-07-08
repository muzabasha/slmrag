import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, Clock, Target, Wrench, Award, ChevronLeft } from 'lucide-react'
import courseData from '../data/courseData'

export default function ModuleView() {
  const { moduleId } = useParams()
  const module = courseData.modules.find(m => m.id === moduleId)

  if (!module) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-4">Module not found</h2>
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    )
  }

  return (
    <>
      <Helmet><title>Day {module.day}: {module.title} - SLM &amp; RAG Workshop</title></Helmet>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted dark:text-muted-dark mb-5">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-text dark:text-text-dark font-medium">Day {module.day}</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 mb-6 shadow-xl overflow-hidden relative">
          <div className="absolute -top-8 -right-8 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full backdrop-blur-sm border border-white/30">
                Day {module.day}
              </span>
              <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-sm border border-white/30">
                {module.topics.length} Topic{module.topics.length !== 1 ? 's' : ''}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">{module.title}</h1>
            <p className="text-white/85 text-base mb-0 max-w-2xl">{module.subtitle}</p>
          </div>
        </div>

        {/* Deliverable callout */}
        <div className="flex items-center gap-2 mb-6 px-4 py-3 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium">
          <Award className="w-4 h-4 flex-shrink-0" />
          <span>Deliverable: <strong>{module.deliverable}</strong></span>
        </div>

        {/* Objectives */}
        <div className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark mb-6">
          <h2 className="text-lg font-bold text-text dark:text-text-dark mb-4 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Target className="w-4 h-4 text-primary" />
            </div>
            Learning Objectives
          </h2>
          <ul className="space-y-2.5">
            {module.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-text dark:text-text-dark">
                <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools & Skills */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark">
            <h3 className="font-bold text-text dark:text-text-dark mb-4 flex items-center gap-2 text-sm">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-3.5 h-3.5 text-primary" />
              </div>
              Tools &amp; Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {module.tools.map((tool, i) => (
                <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark">
            <h3 className="font-bold text-text dark:text-text-dark mb-4 flex items-center gap-2 text-sm">
              <div className="w-7 h-7 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-3.5 h-3.5 text-secondary" />
              </div>
              Industry Skills Gained
            </h3>
            <div className="flex flex-wrap gap-2">
              {module.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full border border-secondary/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Topics */}
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-4">Topics</h2>
        <div className="space-y-3">
          {module.topics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                to={`/module/${module.id}/topic/${topic.id}`}
                className="flex items-start justify-between gap-4 bg-card dark:bg-card-dark rounded-2xl p-5 border border-border dark:border-border-dark hover:shadow-lg hover:border-primary/40 transition-all group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <h3 className="text-base font-bold text-text dark:text-text-dark group-hover:text-primary transition-colors truncate">
                      {topic.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted dark:text-muted-dark mb-2 leading-relaxed">{topic.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-muted dark:text-muted-dark">
                    <Clock className="w-3.5 h-3.5" />
                    {topic.duration}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}
