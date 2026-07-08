import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  ArrowRight, BookOpen, Brain, Code, Users, Target,
  Calendar, Award, ExternalLink, Sparkles
} from 'lucide-react'
import courseData from '../data/courseData'
import { dailySchedule, miniProjects } from '../data/courseData'
import ProgressTracker from '../components/ProgressTracker'

export default function Home() {
  return (
    <>
      <Helmet><title>SLM & RAG Workshop - Home</title></Helmet>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-secondary p-8 md:p-14 mb-8 shadow-2xl border border-white/10"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white mb-4 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Interactive Learning Experience</span>
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {courseData.title}
          </h1>
          <p className="text-xl text-white/90 mb-6 max-w-3xl">
            {courseData.subtitle}
          </p>
          <p className="text-lg text-white/80 mb-8">
            <Target className="inline w-5 h-5 mr-2" />
            {courseData.audience}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/overview"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 hover:scale-105 transition-all text-lg shadow-lg"
            >
              <BookOpen className="w-5 h-5" />
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://scholar-sparkle-web.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 hover:scale-105 transition-all text-lg border border-white/30 backdrop-blur-sm"
            >
              <Users className="w-5 h-5" />
              Resource Person
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* Progress Tracker */}
      <ProgressTracker />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Calendar, label: 'Duration', value: '6 Days' },
          { icon: BookOpen, label: 'Modules', value: `${courseData.modules.length} Days` },
          { icon: Brain, label: 'Topics', value: courseData.modules.reduce((a, m) => a + m.topics.length, 0).toString() },
          { icon: Award, label: 'Projects', value: '6 Mini Projects' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/80 dark:bg-card-dark/80 glass rounded-2xl p-4 border border-border/50 dark:border-border-dark/50 text-center hover-lift"
            >
              <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-text dark:text-text-dark">{stat.value}</div>
              <div className="text-sm text-muted dark:text-muted-dark">{stat.label}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Prerequisites */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark mb-8"
      >
        <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-4 flex items-center gap-2">
          <Code className="w-6 h-6 text-primary" />
          Prerequisites
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {courseData.prerequisites.map((prereq, i) => (
            <div key={i} className="flex items-center gap-2 text-text dark:text-text-dark">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>{prereq}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Modules Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-6">Workshop Modules</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData.modules.map((module, i) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Link
                to={`/module/${module.id}`}
                className="block bg-card/90 dark:bg-card-dark/90 glass rounded-2xl p-6 border border-border/50 dark:border-border-dark/50 hover:border-primary/50 hover:shadow-2xl hover:bg-card dark:hover:bg-card-dark transition-all h-full group relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">D{module.day}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">Day {module.day}</span>
                    <div className="text-xs text-muted dark:text-muted-dark">{module.topics.length} topics</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-text dark:text-text-dark mb-2 group-hover:text-primary transition-colors">{module.title}</h3>
                <p className="text-sm text-muted dark:text-muted-dark mb-4">{module.subtitle}</p>
                <div className="space-y-2">
                  {module.objectives.slice(0, 2).map((obj, j) => (
                    <p key={j} className="text-xs text-muted dark:text-muted-dark flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      {obj}
                    </p>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border dark:border-border-dark">
                  <span className="text-xs font-semibold text-secondary">{module.deliverable}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Daily Schedule */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark mb-8"
      >
        <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-4">Daily Schedule</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border dark:border-border-dark">
                <th className="py-3 px-4 text-sm font-semibold text-muted dark:text-muted-dark">Time</th>
                <th className="py-3 px-4 text-sm font-semibold text-muted dark:text-muted-dark">Activity</th>
              </tr>
            </thead>
            <tbody>
              {dailySchedule.map((item, i) => (
                <tr key={i} className="border-b border-border dark:border-border-dark last:border-0">
                  <td className="py-3 px-4 text-text dark:text-text-dark font-medium">{item.time}</td>
                  <td className="py-3 px-4 text-text dark:text-text-dark">{item.activity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Mini Projects */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark mb-8"
      >
        <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-4">Progressive Mini Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {miniProjects.map((proj, i) => (
            <div key={i} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-border dark:border-border-dark">
              <div className="text-sm font-semibold text-primary mb-1">Day {proj.day}</div>
              <div className="font-bold text-text dark:text-text-dark mb-1">{proj.project}</div>
              <div className="text-sm text-muted dark:text-muted-dark">{proj.skills}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Learning Objectives */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark"
      >
        <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-4">By the end of this workshop, you will be able to:</h2>
        <ol className="space-y-3">
          {courseData.overallObjectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-3 text-text dark:text-text-dark">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold text-sm">
                {i + 1}
              </span>
              <span className="pt-1">{obj}</span>
            </li>
          ))}
        </ol>
      </motion.section>
    </>
  )
}
