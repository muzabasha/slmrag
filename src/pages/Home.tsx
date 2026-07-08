import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Clock, BookOpen, Code2, Layers, Trophy,
  GraduationCap, ExternalLink, Sparkles, CheckCircle,
  Calendar, Users, Zap, Target, ChevronRight
} from 'lucide-react'
import courseData, { dailySchedule, miniProjects } from '../data/courseData'
import ProgressTracker from '../components/ProgressTracker'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function Home() {
  const totalTopics = courseData.modules.reduce((sum, m) => sum + m.topics.length, 0)

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black p-8 lg:p-12 xl:p-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-secondary/30 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs font-medium text-white/80">Interactive Learning Experience</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4">
            {courseData.title}
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mb-4">
            {courseData.subtitle}
          </p>
          <p className="text-sm text-white/50 mb-8">
            <Users className="w-4 h-4 inline mr-1" />
            {courseData.audience}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/module/day1"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://scholar-sparkle-web.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all border border-white/10"
            >
              <ExternalLink className="w-4 h-4" />
              Resource Person
            </a>
          </div>
        </div>
      </section>

      {/* ===== PROGRESS TRACKER ===== */}
      <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
        <ProgressTracker />
      </motion.div>

      {/* ===== STATS GRID ===== */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={{
          animate: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { icon: Calendar, label: 'Duration', value: '6 Days', color: 'from-blue-500 to-blue-600' },
          { icon: BookOpen, label: 'Modules', value: `${courseData.modules.length} Modules`, color: 'from-purple-500 to-purple-600' },
          { icon: Layers, label: 'Topics', value: `${totalTopics} Topics`, color: 'from-emerald-500 to-emerald-600' },
          { icon: Trophy, label: 'Projects', value: `${miniProjects.length} Projects`, color: 'from-amber-500 to-amber-600' },
        ].map(({ icon: Icon, label, value, color }) => (
          <motion.div
            key={label}
            variants={fadeUp}
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity`} />
            <div className="relative">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== PREREQUISITES ===== */}
      <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 lg:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Prerequisites
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {courseData.prerequisites.map((pr, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{pr}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ===== MODULE CARDS ===== */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Workshop Modules</h2>
          <Link to="/overview" className="text-sm text-primary hover:text-primary-dark flex items-center gap-1 transition-colors">
            View all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseData.modules.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <Link
                to={`/module/${mod.id}`}
                className="group block relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                    <span className="text-white font-bold text-sm">{mod.day}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.skills.slice(0, 2).map(s => (
                      <span key={s} className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-primary transition-colors">
                  {mod.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                  {mod.subtitle}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    {mod.topics.length} topics
                  </span>
                  <span className="flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5" />
                    {mod.tools.length} tools
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-xs font-medium text-primary group-hover:underline underline-offset-2">
                    Explore Module
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== DAILY SCHEDULE ===== */}
      <motion.div {...fadeUp} transition={{ delay: 0.5 }}>
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 lg:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Daily Schedule
          </h2>
          <div className="space-y-2">
            {dailySchedule.map((sched, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="w-20 sm:w-24 flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">{sched.time}</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{sched.activity}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ===== MINI PROJECTS ===== */}
      <motion.div {...fadeUp} transition={{ delay: 0.6 }}>
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 lg:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Progressive Mini Projects
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {miniProjects.map((mp, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">D{mp.day}</span>
                  </div>
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Project {mp.day}</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1.5">{mp.project}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{mp.skills}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ===== LEARNING OBJECTIVES ===== */}
      <motion.div {...fadeUp} transition={{ delay: 0.7 }}>
        <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border border-primary/10 dark:border-primary/20 p-6 lg:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Learning Objectives
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {courseData.overallObjectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ===== CTA ===== */}
      <motion.div {...fadeUp} transition={{ delay: 0.8 }}>
        <div className="text-center p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-primary to-secondary">
          <GraduationCap className="w-12 h-12 text-white/80 mx-auto mb-4" />
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            Dive into the world of Small Language Models and build production-ready RAG systems.
          </p>
          <Link
            to="/module/day1"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-primary font-bold hover:bg-white/90 transition-all shadow-xl hover:-translate-y-0.5"
          >
            Begin with Day 1
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
