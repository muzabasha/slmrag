import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  ArrowRight, Clock, BookOpen, Code2, Layers, Trophy,
  GraduationCap, ExternalLink, Sparkles, CheckCircle,
  Calendar, Users, Zap, Target, ChevronRight, Rocket, Star
} from 'lucide-react'
import courseData, { dailySchedule, miniProjects } from '../data/courseData'
import ProgressTracker from '../components/ProgressTracker'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Home() {
  const totalTopics = courseData.modules.reduce((sum, m) => sum + m.topics.length, 0)

  return (
    <>
      <Helmet>
        <title>{courseData.title} - SLM & RAG Workshop</title>
        <meta name="description" content={courseData.subtitle} />
      </Helmet>

      <div className="w-full max-w-full overflow-x-hidden">
        {/* ===== HERO SECTION ===== */}
        <motion.section 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-10 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 md:p-12"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative z-10 max-w-4xl">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white">6-Day Intensive Workshop</span>
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4"
            >
              {courseData.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/90 mb-3 max-w-2xl"
            >
              {courseData.subtitle}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 text-white/80 mb-8"
            >
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">{courseData.audience}</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/module/day1"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-600 font-bold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                <Rocket className="w-5 h-5" />
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://scholar-sparkle-web.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white/20 transition-all border-2 border-white/30"
              >
                <ExternalLink className="w-4 h-4" />
                Meet Resource Person
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* ===== STATS CARDS ===== */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {[
            { icon: Calendar, label: 'Duration', value: '6 Days', gradient: 'from-blue-500 to-cyan-500' },
            { icon: BookOpen, label: 'Modules', value: `${courseData.modules.length}`, gradient: 'from-purple-500 to-pink-500' },
            { icon: Layers, label: 'Topics', value: `${totalTopics}`, gradient: 'from-emerald-500 to-teal-500' },
            { icon: Trophy, label: 'Projects', value: `${miniProjects.length}`, gradient: 'from-amber-500 to-orange-500' },
          ].map(({ icon: Icon, label, value, gradient }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{value}</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ===== PROGRESS TRACKER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <ProgressTracker />
        </motion.div>

        {/* ===== WORKSHOP MODULES ===== */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-1">
                Workshop Modules
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                6 days of intensive hands-on learning
              </p>
            </div>
            <Link to="/overview" className="hidden sm:flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold group">
              View All
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courseData.modules.map((mod, i) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link
                  to={`/module/${mod.id}`}
                  className="group block h-full"
                >
                  <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6 transition-all hover:border-indigo-500 hover:shadow-2xl">
                    {/* Day badge */}
                    <div className="absolute -top-3 -right-3 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all">
                      <span className="text-white font-black text-lg">D{mod.day}</span>
                    </div>

                    {/* Skills tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mod.skills.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {mod.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {mod.subtitle}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500 pt-4 border-t border-gray-200 dark:border-gray-800">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5" />
                        {mod.topics.length} topics
                      </span>
                      <span className="flex items-center gap-1">
                        <Code2 className="w-3.5 h-3.5" />
                        {mod.tools.length} tools
                      </span>
                    </div>

                    {/* Arrow indicator */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ===== TWO COLUMN LAYOUT ===== */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* Prerequisites */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg"
          >
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Prerequisites
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {courseData.prerequisites.map((pr, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{pr}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Daily Schedule */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg"
          >
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Daily Schedule
            </h2>
            <div className="space-y-1 max-h-96 overflow-y-auto pr-2">
              {dailySchedule.map((sched, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="w-24 flex-shrink-0">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{sched.time}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{sched.activity}</span>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* ===== MINI PROJECTS ===== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl border border-amber-200 dark:border-amber-900/30 p-6 mb-10"
        >
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Progressive Mini Projects
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {miniProjects.map((mp, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-900/30 shadow-md"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                    <span className="text-xs font-black text-white">D{mp.day}</span>
                  </div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Project {mp.day}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">{mp.project}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{mp.skills}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ===== LEARNING OBJECTIVES ===== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-2xl border border-indigo-200 dark:border-indigo-900/30 p-6 mb-10"
        >
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-500" />
            Learning Objectives
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {courseData.overallObjectives.map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white text-sm font-black">{i + 1}</span>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{obj}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ===== CTA SECTION ===== */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12 text-center"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <GraduationCap className="w-16 h-16 text-white/90 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              Ready to Build the Future?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join us for 6 days of intensive learning and build production-ready AI systems with Small Language Models and RAG.
            </p>
            <Link
              to="/module/day1"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-600 font-black hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/20 hover:scale-105 transform text-lg"
            >
              Begin Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.section>
      </div>
    </>
  )
}
