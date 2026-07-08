import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  ArrowLeft, BookOpen, Beaker, Lightbulb, BarChart3,
  BookMarked, FlaskConical, MessageSquare, AlertTriangle,
  CheckCircle, Target, ChevronDown, ChevronUp, Clock
} from 'lucide-react'
import { useState, useCallback } from 'react'
import courseData from '../data/courseData'
import ActivitySection from '../components/ActivitySection'
import ProjectSection from '../components/ProjectSection'
import QuestionSection from '../components/QuestionSection'
import InteractiveStoryCard from '../components/InteractiveStoryCard'
import InteractiveMathSection from '../components/InteractiveMathSection'
import TopicLabMapper from '../components/TopicLabMapper'

const sectionColors: Record<string, string> = {
  prerequisites: 'from-blue-500/10 to-blue-500/5 border-blue-500/30 text-blue-600 dark:text-blue-400',
  story: 'from-violet-500/10 to-violet-500/5 border-violet-500/30 text-violet-600 dark:text-violet-400',
  math: 'from-red-500/10 to-red-500/5 border-red-500/30 text-red-600 dark:text-red-400',
  activities: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
  project: 'from-purple-500/10 to-purple-500/5 border-purple-500/30 text-purple-600 dark:text-purple-400',
  questions: 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/30 text-cyan-600 dark:text-cyan-400',
  virtualLab: 'from-amber-500/10 to-amber-500/5 border-amber-500/30 text-amber-600 dark:text-amber-400',
  insights: 'from-teal-500/10 to-teal-500/5 border-teal-500/30 text-teal-600 dark:text-teal-400',
}

export default function TopicView() {
  const { moduleId, topicId } = useParams()
  const module = courseData.modules.find(m => m.id === moduleId)
  const topic = module?.topics.find(t => t.id === topicId)
  const topicIndex = module?.topics.findIndex(t => t.id === topicId) ?? 0

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    prerequisites: true,
    story: true,
    math: true,
    activities: true,
    project: true,
    questions: true,
    virtualLab: true,
    insights: true,
  })

  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }, [])

  if (!module || !topic) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-4">Topic not found</h2>
        <Link to="/" className="text-primary hover:underline">Back to Home</Link>
      </div>
    )
  }

  const SectionCard = ({
    section, title, icon: Icon, children
  }: {
    section: string; title: string; icon: React.ElementType; children: React.ReactNode
  }) => {
    const colorClass = sectionColors[section] ?? ''
    const isOpen = expandedSections[section]
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border dark:border-border-dark overflow-hidden mb-4 bg-card dark:bg-card-dark"
      >
        <button
          onClick={() => toggleSection(section)}
          className={`w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r ${colorClass} transition-colors`}
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-bold text-base text-text dark:text-text-dark">{title}</span>
          </div>
          {isOpen
            ? <ChevronUp className="w-4 h-4 text-muted dark:text-muted-dark flex-shrink-0" />
            : <ChevronDown className="w-4 h-4 text-muted dark:text-muted-dark flex-shrink-0" />
          }
        </button>
        {isOpen && (
          <div className="p-5">
            {children}
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <>
      <Helmet><title>{topic.title} — SLM &amp; RAG Workshop</title></Helmet>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted dark:text-muted-dark mb-5" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/module/${module.id}`} className="hover:text-primary transition-colors">Day {module.day}</Link>
          <span>/</span>
          <span className="text-text dark:text-text-dark font-medium truncate">{topic.title}</span>
        </nav>

        {/* Topic Hero */}
        <header className="relative bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 mb-6 shadow-xl overflow-hidden">
          <div className="absolute -top-6 -right-6 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-secondary/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Link
                to={`/module/${module.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                Day {module.day}
              </Link>
              <span className="px-3 py-1.5 bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-sm border border-white/30 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {topic.duration}
              </span>
              <span className="px-2 py-1 bg-white/15 text-white text-xs rounded-full">
                Topic {topicIndex + 1}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">{topic.title}</h1>
            <p className="text-white/85 text-base max-w-2xl leading-relaxed">{topic.description}</p>
          </div>
        </header>

        {/* Prerequisites & Connections */}
        {((topic.prerequisites?.length ?? 0) > 0 || (topic.dependentTopics?.length ?? 0) > 0) && (
          <SectionCard section="prerequisites" title="Prerequisites & Topic Connections" icon={BookOpen}>
            <div className="grid sm:grid-cols-2 gap-4">
              {topic.prerequisites?.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-text dark:text-text-dark mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" /> Prerequisites
                  </h4>
                  <ul className="space-y-1.5">
                    {topic.prerequisites.map((pr, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text dark:text-text-dark">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {pr}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {topic.dependentTopics?.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-text dark:text-text-dark mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-secondary" /> Topics that depend on this
                  </h4>
                  <ul className="space-y-1.5">
                    {topic.dependentTopics.map((dt, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text dark:text-text-dark">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                        {dt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {topic.nextTopicPrep && (
              <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30">
                <p className="text-sm text-amber-700 dark:text-amber-400 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span><strong>Prepare for next topic:</strong> {topic.nextTopicPrep}</span>
                </p>
              </div>
            )}
          </SectionCard>
        )}

        {/* Story Section */}
        {topic.story && (
          <SectionCard section="story" title="Story Time: Learn Through Stories" icon={BookMarked}>
            <InteractiveStoryCard story={topic.story} />
          </SectionCard>
        )}

        {/* Math Section */}
        {topic.mathModeling?.equations?.length > 0 && (
          <SectionCard section="math" title="Mathematical Modelling" icon={BarChart3}>
            <InteractiveMathSection mathModeling={topic.mathModeling} />
          </SectionCard>
        )}

        {/* Activities Section */}
        {topic.activities?.levels?.length > 0 && (
          <SectionCard section="activities" title="Activity Based Learning" icon={FlaskConical}>
            <ActivitySection activities={topic.activities} />
          </SectionCard>
        )}

        {/* Project Section */}
        {topic.project?.scope && (
          <SectionCard section="project" title="Project Based Learning" icon={Target}>
            <ProjectSection project={topic.project} />
          </SectionCard>
        )}

        {/* Questions Section */}
        {topic.questions && Object.keys(topic.questions).some(key =>
          (topic.questions[key as keyof typeof topic.questions]?.length ?? 0) > 0
        ) && (
          <SectionCard section="questions" title="Model 2 Mark Questions" icon={BookMarked}>
            <QuestionSection questions={topic.questions} />
          </SectionCard>
        )}

        {/* Virtual Lab */}
        <SectionCard section="virtualLab" title="Learn by Doing: Virtual Lab" icon={Beaker}>
          <TopicLabMapper topicId={topic.id} />
        </SectionCard>

        {/* Insights Section */}
        {topic.insights && (
          <SectionCard section="insights" title="Key Insights & Career Relevance" icon={Lightbulb}>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30">
                <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Key Insights
                </h4>
                <ul className="space-y-1.5">
                  {topic.insights.keyInsights.map((ins, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text dark:text-text-dark">
                      <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {ins}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30">
                <h4 className="text-sm font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Limitations
                </h4>
                <ul className="space-y-1.5">
                  {topic.insights.disadvantages.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text dark:text-text-dark">
                      <AlertTriangle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30">
                <h4 className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-2">🔭 Future Scope</h4>
                <ul className="space-y-1.5">
                  {topic.insights.futureScope.map((f, i) => (
                    <li key={i} className="text-xs text-text dark:text-text-dark flex items-start gap-2">
                      <span className="text-blue-500 flex-shrink-0">→</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/30">
                <h4 className="text-sm font-bold text-purple-700 dark:text-purple-400 mb-2">🏭 Industrial Applications</h4>
                <ul className="space-y-1.5">
                  {topic.insights.industrialApplications.map((app, i) => (
                    <li key={i} className="text-xs text-text dark:text-text-dark flex items-start gap-2">
                      <span className="text-purple-500 flex-shrink-0">•</span> {app}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <h4 className="text-sm font-bold text-primary mb-1.5">💼 Career Relevance</h4>
              <p className="text-sm text-text dark:text-text-dark leading-relaxed">{topic.insights.careerRelevance}</p>
            </div>
          </SectionCard>
        )}

        {/* Feedback Section */}
        <div className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark mt-2">
          <h3 className="text-base font-bold text-text dark:text-text-dark mb-1 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Human-in-the-Loop Feedback
          </h3>
          <p className="text-sm text-muted dark:text-muted-dark mb-4">
            Share your thoughts, questions, or suggestions to help improve this learning experience.
          </p>
          <textarea
            className="w-full p-4 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-text dark:text-text-dark resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
            rows={4}
            placeholder="Share your feedback, questions, or suggestions for improving this topic..."
            aria-label="Feedback textarea"
          />
          <div className="flex justify-end mt-3">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl text-sm hover:opacity-90 hover:scale-105 transition-all shadow-md">
              Submit Feedback
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
