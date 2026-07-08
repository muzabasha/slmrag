import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  ArrowLeft, BookOpen, Beaker, Lightbulb, BarChart3,
  BookMarked, FlaskConical, MessageSquare, AlertTriangle,
  CheckCircle, Target, ChevronDown, ChevronUp, List
} from 'lucide-react'
import { useState, useCallback } from 'react'
import courseData from '../data/courseData'
import ActivitySection from '../components/ActivitySection'
import ProjectSection from '../components/ProjectSection'
import QuestionSection from '../components/QuestionSection'
import InteractiveStoryCard from '../components/InteractiveStoryCard'
import InteractiveMathSection from '../components/InteractiveMathSection'
import TopicLabMapper from '../components/TopicLabMapper'

type SectionKey = 'story' | 'math' | 'activities' | 'project' | 'questions' | 'virtualLab' | 'insights'

const sections: { key: SectionKey; label: string; icon: any; color: string }[] = [
  { key: 'story', label: 'Story', icon: BookMarked, color: '#8b5cf6' },
  { key: 'math', label: 'Math', icon: BarChart3, color: '#ef4444' },
  { key: 'activities', label: 'Activities', icon: FlaskConical, color: '#10b981' },
  { key: 'project', label: 'Project', icon: Target, color: '#8b5cf6' },
  { key: 'questions', label: 'Questions', icon: BookMarked, color: '#06b6d4' },
  { key: 'virtualLab', label: 'Virtual Lab', icon: Beaker, color: '#f59e0b' },
  { key: 'insights', label: 'Insights', icon: Lightbulb, color: '#06b6d4' },
]

export default function TopicView() {
  const { moduleId, topicId } = useParams()
  const module = courseData.modules.find(m => m.id === moduleId)
  const topic = module?.topics.find(t => t.id === topicId)

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    prerequisites: true, story: true, math: true, activities: true,
    project: true, questions: true, virtualLab: true, insights: true,
  })

  const toggleSection = useCallback((section: string) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }))
  }, [])

  const scrollToSection = useCallback((key: string) => {
    setExpanded(prev => ({ ...prev, [key]: true }))
    setTimeout(() => {
      document.getElementById(`section-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [])

  if (!module || !topic) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Topic not found</h2>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">Back to Home</Link>
      </div>
    )
  }

  const SectionToggle = ({ section, title, icon: Icon, color }: {
    section: string; title: string; icon: any; color: string
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" style={{ color }} />
        <span className="font-semibold text-gray-900 dark:text-white">{title}</span>
      </div>
      {expanded[section] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
    </button>
  )

  const sectionContent = (key: string) => (
    <div className="p-5 pt-0">
      {key === 'story' && topic.story && <InteractiveStoryCard story={topic.story} />}
      {key === 'math' && topic.mathModeling && <InteractiveMathSection mathModeling={topic.mathModeling} />}
      {key === 'activities' && topic.activities && <ActivitySection activities={topic.activities} />}
      {key === 'project' && topic.project && <ProjectSection project={topic.project} />}
      {key === 'questions' && topic.questions && <QuestionSection questions={topic.questions} />}
      {key === 'virtualLab' && <TopicLabMapper topicId={topic.id} />}
      {key === 'insights' && topic.insights && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
              <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Key Insights
              </h4>
              <ul className="space-y-1">
                {topic.insights.keyInsights.map((ins, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    {ins}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Disadvantages
              </h4>
              <ul className="space-y-1">
                {topic.insights.disadvantages.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Future Scope</h4>
              <ul className="space-y-1">
                {topic.insights.futureScope.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Industrial Applications</h4>
              <ul className="space-y-1">
                {topic.insights.industrialApplications.map((app, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                    {app}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800">
            <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">Career Relevance</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">{topic.insights.careerRelevance}</p>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <>
      <Helmet><title>{topic.title} - SLM & RAG Workshop</title></Helmet>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-8 w-full max-w-full">
        {/* Main Content */}
        <div className="min-w-0">
          {/* Navigation */}
          <nav className="flex items-center gap-3 mb-6 text-sm" aria-label="Breadcrumb">
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">Home</Link>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <Link to={`/module/${module.id}`} className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
              Day {module.day}
            </Link>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate">{topic.title}</span>
          </nav>

          {/* Topic Header */}
          <header className="rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black p-6 lg:p-8 mb-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-xs font-medium border border-white/10">
                  Day {module.day}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-xs font-medium border border-white/10">
                  {topic.duration}
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{topic.title}</h1>
              <p className="text-sm text-white/70">{topic.description}</p>
            </div>
          </header>

          {/* Prerequisites */}
          {(topic.prerequisites.length > 0 || topic.dependentTopics.length > 0 || topic.nextTopicPrep) && (
            <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mb-4 overflow-hidden">
              <SectionToggle section="prerequisites" title="Prerequisites & Connections" icon={BookOpen} color="#3b82f6" />
              {expanded.prerequisites && (
                <div className="p-5 pt-0 space-y-4">
                  {topic.prerequisites.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Prerequisites</h4>
                      <ul className="space-y-1">
                        {topic.prerequisites.map((pr, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {pr}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {topic.dependentTopics.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Dependent Topics</h4>
                      <ul className="space-y-1">
                        {topic.dependentTopics.map((dt, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                            {dt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {topic.nextTopicPrep && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Prepare for Next Topic</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{topic.nextTopicPrep}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Sections */}
          {sections.map(({ key, label, icon, color }) => {
            let shouldRender = true
            if (key === 'story' && !topic.story) shouldRender = false
            if (key === 'math' && !topic.mathModeling) shouldRender = false
            if (key === 'activities' && !topic.activities) shouldRender = false
            if (key === 'project' && !topic.project) shouldRender = false
            if (key === 'questions' && !topic.questions) shouldRender = false
            if (key === 'insights' && !topic.insights) shouldRender = false
            if (!shouldRender) return null

            return (
              <div
                key={key}
                id={`section-${key}`}
                className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mb-4 overflow-hidden"
              >
                <SectionToggle section={key} title={label} icon={icon} color={color} />
                {expanded[key] && sectionContent(key)}
              </div>
            )
          })}

          {/* Feedback */}
          <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 mt-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Feedback
            </h3>
            <textarea
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              rows={3}
              placeholder="Share your thoughts on this topic..."
            />
            <div className="flex justify-end mt-3">
              <button className="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Sidebar TOC (Desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-2">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-3">
              <List className="w-3.5 h-3.5" />
              On this page
            </p>
            <button
              onClick={() => scrollToSection('prerequisites')}
              className="block w-full text-left text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition-colors py-1"
            >
              Prerequisites
            </button>
            {sections.map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                className="block w-full text-left text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition-colors py-1"
                style={{ borderLeft: `2px solid transparent`, paddingLeft: '8px' }}
                onMouseEnter={(e) => e.currentTarget.style.borderLeftColor = color}
                onMouseLeave={(e) => e.currentTarget.style.borderLeftColor = 'transparent'}
              >
                {label}
              </button>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <Link
                to={`/module/${module.id}`}
                className="flex items-center gap-1.5 text-xs text-primary hover:text-primary-dark transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to Day {module.day}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
