import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Target, BookOpen, Award, Users, Wrench, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import courseData from '../data/courseData'

export default function SubjectOverview() {
  return (
    <>
      <Helmet><title>Subject Overview - SLM &amp; RAG Workshop</title></Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 mb-8 shadow-xl overflow-hidden">
          <div className="absolute -top-8 -right-8 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">{courseData.title}</h1>
            <p className="text-lg text-white/90 mb-3">{courseData.subtitle}</p>
            <p className="text-white/75 flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 flex-shrink-0" />
              {courseData.audience}
            </p>
          </div>
        </div>

        {/* Objectives + Prerequisites */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <div className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark">
            <h3 className="font-bold text-text dark:text-text-dark mb-4 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-primary" />
              </div>
              Learning Objectives
            </h3>
            <ol className="space-y-2.5">
              {courseData.overallObjectives.map((obj, i) => (
                <li key={i} className="text-sm text-text dark:text-text-dark flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/15 to-secondary/15 text-primary flex items-center justify-center flex-shrink-0 text-xs font-bold border border-primary/20">
                    {i + 1}
                  </span>
                  {obj}
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark">
            <h3 className="font-bold text-text dark:text-text-dark mb-4 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-secondary" />
              </div>
              Prerequisites
            </h3>
            <div className="space-y-2">
              {courseData.prerequisites.map((pr, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-text dark:text-text-dark p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {pr}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modules at a Glance */}
        <div className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark">
          <h3 className="font-bold text-lg text-text dark:text-text-dark mb-5">Modules at a Glance</h3>
          <div className="space-y-3">
            {courseData.modules.map(mod => (
              <Link
                key={mod.id}
                to={`/module/${mod.id}`}
                className="flex items-start gap-4 p-4 rounded-xl border border-border dark:border-border-dark hover:border-primary/40 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-md text-white font-bold text-sm">
                  D{mod.day}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Day {mod.day}</span>
                    <span className="text-xs text-muted dark:text-muted-dark">{mod.topics.length} topic{mod.topics.length !== 1 ? 's' : ''}</span>
                  </div>
                  <h4 className="font-bold text-text dark:text-text-dark text-sm group-hover:text-primary transition-colors">{mod.title}</h4>
                  <p className="text-xs text-muted dark:text-muted-dark mt-0.5">{mod.subtitle}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted dark:text-muted-dark">
                    <span className="flex items-center gap-1">
                      <Wrench className="w-3 h-3" />
                      {mod.tools.slice(0, 3).join(', ')}{mod.tools.length > 3 ? '…' : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-secondary" />
                      {mod.deliverable}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted dark:text-muted-dark flex-shrink-0 mt-1 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}
