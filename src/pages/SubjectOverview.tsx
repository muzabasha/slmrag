import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Target, BookOpen, Award, Users, Wrench } from 'lucide-react'
import courseData from '../data/courseData'

export default function SubjectOverview() {
  return (
    <>
      <Helmet><title>Subject Overview - SLM & RAG Workshop</title></Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-6">Subject Overview</h1>

        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">{courseData.title}</h2>
          <p className="text-lg text-white/90">{courseData.subtitle}</p>
          <p className="text-white/80 mt-2">
            <Users className="inline w-4 h-4 mr-1" />
            {courseData.audience}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark">
            <h3 className="font-bold text-lg text-text dark:text-text-dark mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Learning Objectives
            </h3>
            <ol className="space-y-2">
              {courseData.overallObjectives.map((obj, i) => (
                <li key={i} className="text-sm text-text dark:text-text-dark flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs font-bold">{i + 1}</span>
                  {obj}
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark">
            <h3 className="font-bold text-lg text-text dark:text-text-dark mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Prerequisites
            </h3>
            <div className="space-y-2">
              {courseData.prerequisites.map((pr, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-text dark:text-text-dark">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {pr}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark">
          <h3 className="font-bold text-lg text-text dark:text-text-dark mb-4">Modules at a Glance</h3>
          <div className="space-y-4">
            {courseData.modules.map((mod) => (
              <div key={mod.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded">Day {mod.day}</span>
                  <h4 className="font-bold text-text dark:text-text-dark">{mod.title}</h4>
                </div>
                <p className="text-sm text-text dark:text-text-dark mb-2">{mod.subtitle}</p>
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-muted" />
                  <span className="text-xs text-muted dark:text-muted-dark">Tools: {mod.tools.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Award className="w-4 h-4 text-muted" />
                  <span className="text-xs text-muted dark:text-muted-dark">Deliverable: {mod.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}
