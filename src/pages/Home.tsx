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

const totalTopics = courseData.modules.reduce((a, m) => a + m.topics.length, 0)

export default function Home() {
  return (
    <>
      <Helmet><title>SLM &amp; RAG Workshop - Home</title></Helmet>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-secondary p-8 md:p-12 mb-8 shadow-2xl"
      >
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-8 -left-8 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white mb-5 backdrop-blur-sm border border-white/30"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Interactive Learning Experience</span>
          </motion.div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {courseData.title}
          </h1>
          <p className="text-xl text-white/90 mb-3 max-w-3xl leading-relaxed">
            {courseData.subtitle}
          </p>
          <p className="text-base text-white/75 mb-8 flex items-center gap-2">
            <Target className="w-4 h-4 flex-shrink-0" />
            {courseData.audience}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/overview"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 hover:scale-105 transition-all text-base shadow-lg"
            >
              <BookOpen className="w-5 h-5" />
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://scholar-sparkle-web.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 hover:scale-105 transition-all text-base border border-white/30 backdrop-blur-sm"
            >
              <Users className="w-5 h-5" />
              Resource Person
              <ExternalLink className="w-4 h-4" />
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
          { icon: BookOpen, label: 'Modules', value: `${courseData.modules.length} Modules` },
          { icon: Brain, label: 'Topics', value: `${totalTopics} Topics` },
          { icon: Award, label: 'Projects', value: '6 Projects' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card dark:bg-card-dark rounded-2xl p-5 border border-border dark:border-border-dark text-center hover-lift"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-text dark:text-text-dark">{stat.value}</div>
              <div className="text-xs text-muted dark:text-muted-dark mt-0.5">{stat.label}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Prerequisites */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark mb-8"
      >
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Code className="w-4 h-4 text-primary" />
          </div>
          Prerequisites
        </h2>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {courseData.prerequisites.map((prereq, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-text dark:text-text-dark">
              <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courseData.modules.map((module, i) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="flex"
            >
              <Link
                to={`/module/${module.id}`}
                className="flex flex-col w-full bg-card dark:bg-card-dark rounded-2xl p-5 border border-border dark:border-border-dark hover:border-primary/40 hover:shadow-xl transition-all group"
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <span className="text-white font-bold text-base">D{module.day}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest block">Day {module.day}</span>
                    <span className="text-xs text-muted dark:text-muted-dark">{module.topics.length} topic{module.topics.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-text dark:text-text-dark mb-1.5 group-hover:text-primary transition-colors leading-snug">
                  {module.title}
                </h3>
                <p className="text-sm text-muted dark:text-muted-dark mb-4 leading-relaxed flex-1">
                  {module.subtitle}
                </p>

                {/* Objectives */}
                <div className="space-y-1.5 mb-4">
                  {module.objectives.slice(0, 2).map((obj, j) => (
                    <p key={j} className="text-xs text-muted dark:text-muted-dark flex items-start gap-1.5">
                      <ArrowRight className="w-3 h-3 mt-0.5 flex-shrink-0 text-primary" />
                      {obj}
                    </p>
                  ))}
                </div>

                {/* Deliverable badge */}
                <div className="pt-3 border-t border-border dark:border-border-dark">
                  <span className="text-xs font-semibold text-secondary line-clamp-1">{module.deliverable}</span>
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
        className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark mb-8"
      >
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-4">Daily Schedule</h2>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-left min-w-[360px]">
            <thead>
              <tr className="border-b border-border dark:border-border-dark">
                <th className="py-2.5 px-4 text-xs font-semibold text-muted dark:text-muted-dark uppercase tracking-wider w-36">Time</th>
                <th className="py-2.5 px-4 text-xs font-semibold text-muted dark:text-muted-dark uppercase tracking-wider">Activity</th>
              </tr>
            </thead>
            <tbody>
              {dailySchedule.map((item, i) => (
                <tr key={i} className="border-b border-border dark:border-border-dark last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="py-3 px-4 text-sm text-primary font-medium whitespace-nowrap">{item.time}</td>
                  <td className="py-3 px-4 text-sm text-text dark:text-text-dark">{item.activity}</td>
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
        className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark mb-8"
      >
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-5">Progressive Mini Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {miniProjects.map((proj, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border dark:border-border-dark hover:border-primary/30 transition-colors"
            >
              <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Day {proj.day}</div>
              <div className="font-semibold text-text dark:text-text-dark mb-1.5 text-sm leading-snug">{proj.project}</div>
              <div className="text-xs text-muted dark:text-muted-dark">{proj.skills}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Learning Objectives */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark"
      >
        <h2 className="text-xl font-bold text-text dark:text-text-dark mb-5">
          By the end of this workshop, you will be able to:
        </h2>
        <ol className="space-y-3">
          {courseData.overallObjectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-text dark:text-text-dark">
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/15 to-secondary/15 text-primary flex items-center justify-center flex-shrink-0 font-bold text-xs border border-primary/20">
                {i + 1}
              </span>
              <span className="pt-0.5 leading-relaxed">{obj}</span>
            </li>
          ))}
        </ol>
      </motion.section>
    </>
  )
}
