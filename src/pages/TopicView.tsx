import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  ArrowLeft, BookOpen, Beaker, Lightbulb, BarChart3,
  BookMarked, FlaskConical, MessageSquare, AlertTriangle,
  CheckCircle, Target, ChevronDown, ChevronUp
} from 'lucide-react'
import { useState, useCallback } from 'react'
import courseData from '../data/courseData'
import ActivitySection from '../components/ActivitySection'
import ProjectSection from '../components/ProjectSection'
import QuestionSection from '../components/QuestionSection'
import InteractiveStoryCard from '../components/InteractiveStoryCard'
import InteractiveMathSection from '../components/InteractiveMathSection'
import TopicLabMapper from '../components/TopicLabMapper'

export default function TopicView() {
  const { moduleId, topicId } = useParams()
  const module = courseData.modules.find(m => m.id === moduleId)
  const topic = module?.topics.find(t => t.id === topicId)

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
        <h2 className="text-2xl font-bold text-text dark:text-text-dark">Topic not found</h2>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">Back to Home</Link>
      </div>
    )
  }

  const SectionToggle = ({ section, title, icon: Icon, color }: {
    section: string; title: string; icon: any; color: string
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" style={{ color }} />
        <span className="font-bold text-lg text-text dark:text-text-dark">{title}</span>
      </div>
      {expandedSections[section] ? <ChevronUp className="w-5 h-5 text-muted" /> : <ChevronDown className="w-5 h-5 text-muted" />}
    </button>
  )

  return (
    <>
      <Helmet><title>{topic.title} - SLM & RAG Workshop</title></Helmet>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Navigation */}
        <nav className="flex items-center gap-4 mb-6" aria-label="Breadcrumb">
          <Link
            to={`/module/${module.id}`}
            className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Day {module.day}</span>
          </Link>
        </nav>

        {/* Topic Header */}
        <header className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 mb-6 shadow-lg">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="badge badge-primary bg-white/20 text-white">Day {module.day}</span>
            <span className="badge badge-primary bg-white/20 text-white">{topic.duration}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{topic.title}</h1>
          <p className="text-lg text-white/90 lead">{topic.description}</p>
        </header>

        {/* Conditional Section Rendering - Only show sections with content */}
        
        {/* Prerequisites & Connections - Always show */}
        {(topic.prerequisites?.length > 0 || topic.dependentTopics?.length > 0) && (
          <div className="card mb-4 overflow-hidden animate-fade-up">
            <SectionToggle section="prerequisites" title="Prerequisites & Topic Connections" icon={BookOpen} color="#3b82f6" />
            {expandedSections.prerequisites && (
            <div className="p-6 pt-0 space-y-4">
              <div>
                <h4 className="font-semibold text-text dark:text-text-dark mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-concept" />
                  Prerequisites for this topic
                </h4>
                <ul className="space-y-1">
                  {topic.prerequisites.map((pr, i) => (
                    <li key={i} className="flex items-center gap-2 text-text dark:text-text-dark">
                      <div className="w-2 h-2 rounded-full bg-concept" />
                      {pr}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text dark:text-text-dark mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-warning-semantic" />
                  Topics that depend on this
                </h4>
                <ul className="space-y-1">
                  {topic.dependentTopics.map((dt, i) => (
                    <li key={i} className="flex items-center gap-2 text-text dark:text-text-dark">
                      <div className="w-2 h-2 rounded-full bg-warning-semantic" />
                      {dt}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text dark:text-text-dark mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-activity" />
                  Prepare for next topic
                </h4>
                <p className="text-text dark:text-text-dark">{topic.nextTopicPrep}</p>
              </div>
            </div>
          )}
        </div>

        {/* Story Section - Only show if story content exists */}
        {topic.story && (
          <div className="card mb-4 overflow-hidden animate-fade-up" style={{ animationDelay: '100ms' }}>
            <SectionToggle section="story" title="Story Time: Learn Through Stories" icon={BookMarked} color="#8b5cf6" />
            {expandedSections.story && (
              <div className="p-6 pt-0">
                <InteractiveStoryCard story={topic.story} />
              </div>
            )}
          </div>
        )}

        {/* Math Section - Only show if equations exist */}
        {topic.mathModeling && topic.mathModeling.equations && topic.mathModeling.equations.length > 0 && (
          <div className="card mb-4 overflow-hidden animate-fade-up" style={{ animationDelay: '200ms' }}>
            <SectionToggle section="math" title="Mathematical Modelling" icon={BarChart3} color="#ef4444" />
            {expandedSections.math && (
              <div className="p-6 pt-0">
                <InteractiveMathSection mathModeling={topic.mathModeling} />
              </div>
            )}
          </div>
        )}

        {/* Activities Section - Only show if activities exist */}
        {topic.activities && topic.activities.levels && topic.activities.levels.length > 0 && (
          <div className="card mb-4 overflow-hidden animate-fade-up" style={{ animationDelay: '300ms' }}>
            <SectionToggle section="activities" title="Activity Based Learning" icon={FlaskConical} color="#10b981" />
            {expandedSections.activities && <ActivitySection activities={topic.activities} />}
          </div>
        )}

        {/* Project Section - Only show if project exists */}
        {topic.project && topic.project.scope && (
          <div className="card mb-4 overflow-hidden animate-fade-up" style={{ animationDelay: '400ms' }}>
            <SectionToggle section="project" title="Project Based Learning" icon={Target} color="#7c3aed" />
            {expandedSections.project && <ProjectSection project={topic.project} />}
          </div>
        )}

        {/* Questions Section - Only show if questions exist */}
        {topic.questions && (Object.keys(topic.questions).some(key => 
          topic.questions[key as keyof typeof topic.questions]?.length > 0
        )) && (
          <div className="card mb-4 overflow-hidden animate-fade-up" style={{ animationDelay: '500ms' }}>
            <SectionToggle section="questions" title="Model 2 Mark Questions" icon={BookMarked} color="#06b6d4" />
            {expandedSections.questions && <QuestionSection questions={topic.questions} />}
          </div>
        )}

        {/* Virtual Lab - Always show for hands-on practice */}
        <div className="card mb-4 overflow-hidden animate-fade-up" style={{ animationDelay: '600ms' }}>
          <SectionToggle section="virtualLab" title="Learn by Doing: Virtual Lab" icon={Beaker} color="#f59e0b" />
          {expandedSections.virtualLab && (
            <div className="p-6 pt-0">
              <TopicLabMapper topicId={topic.id} />
            </div>
          )}
        </div>

        {/* Insights Section - Only show if insights exist */}
        {topic.insights && (
          <div className="card mb-4 overflow-hidden animate-fade-up" style={{ animationDelay: '700ms' }}>
            <SectionToggle section="insights" title="Key Insights & Career Relevance" icon={Lightbulb} color="#06b6d4" />
            {expandedSections.insights && (
            <div className="p-6 pt-0 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-text dark:text-text-dark mb-2 text-green-600">✓ Key Insights</h4>
                  <ul className="space-y-1">
                    {topic.insights.keyInsights.map((ins, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text dark:text-text-dark">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        {ins}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-text dark:text-text-dark mb-2 text-red-600">✗ Disadvantages</h4>
                  <ul className="space-y-1">
                    {topic.insights.disadvantages.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text dark:text-text-dark">
                        <AlertTriangle className="w-4 h-4 text-danger mt-0.5 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-text dark:text-text-dark mb-2 text-blue-600">Future Scope</h4>
                  <ul className="space-y-1">
                    {topic.insights.futureScope.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text dark:text-text-dark">
                        <ArrowLeft className="w-4 h-4 text-info mt-0.5 flex-shrink-0 rotate-180" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-text dark:text-text-dark mb-2 text-secondary">Industrial Applications</h4>
                  <ul className="space-y-1">
                    {topic.insights.industrialApplications.map((app, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text dark:text-text-dark">
                        <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-cyan-600 dark:text-cyan-400 mb-2">Career Relevance</h4>
                <p className="text-text dark:text-text-dark">{topic.insights.careerRelevance}</p>
              </div>
            </div>
          )}
        </div>

        {/* Feedback Section */}
        <div className="card mt-6 animate-fade-up" style={{ animationDelay: '800ms' }}>
          <h3 className="text-xl font-bold text-text dark:text-text-dark mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Human-in-the-Loop Feedback
          </h3>
          <p className="text-muted dark:text-muted-dark mb-4 small-text">
            Your feedback helps us improve this learning experience. Share your thoughts, questions, or suggestions below.
          </p>
          <textarea
            className="w-full p-4 rounded-lg border-2 border-border dark:border-border-dark bg-white dark:bg-gray-800 text-text dark:text-text-dark resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            rows={4}
            placeholder="Share your feedback, questions, or suggestions for improving this topic..."
            aria-label="Feedback textarea"
          />
          <div className="flex justify-end mt-3">
            <button className="btn btn-primary">
              Submit Feedback
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
