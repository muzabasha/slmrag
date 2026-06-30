import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  ArrowLeft, BookOpen, Beaker, Lightbulb, BarChart3,
  BookMarked, FlaskConical, MessageSquare, AlertTriangle,
  CheckCircle, Target, ChevronDown, ChevronUp, Play, Pause,
  RotateCcw
} from 'lucide-react'
import { useState, useCallback } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import courseData from '../data/courseData'
import MathEquation from '../components/MathEquation'
import ActivitySection from '../components/ActivitySection'
import ProjectSection from '../components/ProjectSection'
import QuestionSection from '../components/QuestionSection'

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

  // Virtual lab state
  const [labParams, setLabParams] = useState<Record<string, number>>({
    temperature: 0.7,
    topK: 40,
    topP: 0.9,
    maxTokens: 50,
  })
  const [labRunning, setLabRunning] = useState(false)
  const [labStep, setLabStep] = useState(0)

  // Chart data for math section
  const chartData = Array.from({ length: 10 }, (_, i) => ({
    x: i + 1,
    probability: Math.exp(-i / 3) / 3,
  }))

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
        <div className="flex items-center gap-4 mb-6">
          <Link
            to={`/module/${module.id}`}
            className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Day {module.day}</span>
          </Link>
        </div>

        {/* Topic Header */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">Day {module.day}</span>
            <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">{topic.duration}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{topic.title}</h1>
          <p className="text-lg text-white/90">{topic.description}</p>
        </div>

        {/* ===== SECTION 1: PREREQUISITES & CONNECTIONS ===== */}
        <div className="bg-card dark:bg-card-dark rounded-xl border border-border dark:border-border-dark mb-4 overflow-hidden">
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

        {/* ===== SECTION 2: STORY TELLING ===== */}
        <div className="bg-card dark:bg-card-dark rounded-xl border border-border dark:border-border-dark mb-4 overflow-hidden">
          <SectionToggle section="story" title="Story Time: Learn Through Stories" icon={BookMarked} color="#8b5cf6" />
          {expandedSections.story && (
            <div className="p-6 pt-0">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-4">
                <h4 className="font-bold text-lg text-secondary mb-3">{topic.story.analogy}</h4>
                <p className="text-text dark:text-text-dark whitespace-pre-line leading-relaxed">
                  {topic.story.narrative}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-text dark:text-text-dark mb-3">Reflect on these questions:</h4>
                <ul className="space-y-2">
                  {topic.story.reflectiveQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-text dark:text-text-dark p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-primary mb-2">What did we just learn?</h4>
                <p className="text-text dark:text-text-dark">{topic.story.connection}</p>
              </div>

              <h4 className="font-semibold text-text dark:text-text-dark mb-3">Technical Deep Dive</h4>
              <ul className="space-y-2 mb-4">
                {topic.story.technicalExplanation.map((exp, i) => (
                  <li key={i} className="flex items-start gap-2 text-text dark:text-text-dark">
                    <CheckCircle className="w-4 h-4 text-activity mt-1 flex-shrink-0" />
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Life Skill
                </h4>
                <p className="text-text dark:text-text-dark">{topic.story.lifeSkills}</p>
              </div>
            </div>
          )}
        </div>

        {/* ===== SECTION 3: MATHEMATICAL MODELLING ===== */}
        <div className="bg-card dark:bg-card-dark rounded-xl border border-border dark:border-border-dark mb-4 overflow-hidden">
          <SectionToggle section="math" title="Mathematical Modelling" icon={BarChart3} color="#ef4444" />
          {expandedSections.math && (
            <div className="p-6 pt-0 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Need</h4>
                  <p className="text-text dark:text-text-dark">{topic.mathModeling.need}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Motivation</h4>
                  <p className="text-text dark:text-text-dark">{topic.mathModeling.motivation}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-text dark:text-text-dark mb-2 text-red-600">Challenges</h4>
                  <ul className="space-y-1">
                    {topic.mathModeling.realWorldChallenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text dark:text-text-dark">
                        <AlertTriangle className="w-4 h-4 text-danger mt-0.5 flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-text dark:text-text-dark mb-2 text-green-600">Advantages</h4>
                  <ul className="space-y-1">
                    {topic.mathModeling.advantages.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text dark:text-text-dark">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Equations */}
              {topic.mathModeling.equations.map((eq, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <MathEquation equation={eq} index={i} />
                </div>
              ))}

              {/* Interactive Chart */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-text dark:text-text-dark mb-3">Probability Distribution Visualization</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" label={{ value: 'Token Position', position: 'bottom' }} />
                    <YAxis label={{ value: 'Probability', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="probability" stroke="#2563eb" strokeWidth={2} dot={{ fill: '#2563eb' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* ===== SECTION 4: ACTIVITY BASED LEARNING ===== */}
        <div className="bg-card dark:bg-card-dark rounded-xl border border-border dark:border-border-dark mb-4 overflow-hidden">
          <SectionToggle section="activities" title="Activity Based Learning" icon={FlaskConical} color="#10b981" />
          {expandedSections.activities && <ActivitySection activities={topic.activities} />}
        </div>

        {/* ===== SECTION 5: PROJECT BASED LEARNING ===== */}
        <div className="bg-card dark:bg-card-dark rounded-xl border border-border dark:border-border-dark mb-4 overflow-hidden">
          <SectionToggle section="project" title="Project Based Learning" icon={Target} color="#7c3aed" />
          {expandedSections.project && <ProjectSection project={topic.project} />}
        </div>

        {/* ===== SECTION 6: QUESTIONS ===== */}
        <div className="bg-card dark:bg-card-dark rounded-xl border border-border dark:border-border-dark mb-4 overflow-hidden">
          <SectionToggle section="questions" title="Model 2 Mark Questions" icon={BookMarked} color="#06b6d4" />
          {expandedSections.questions && <QuestionSection questions={topic.questions} />}
        </div>

        {/* ===== SECTION 7: VIRTUAL LAB ===== */}
        <div className="bg-card dark:bg-card-dark rounded-xl border border-border dark:border-border-dark mb-4 overflow-hidden">
          <SectionToggle section="virtualLab" title="Learn by Doing: Virtual Lab" icon={Beaker} color="#f59e0b" />
          {expandedSections.virtualLab && (
            <div className="p-6 pt-0">
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-amber-600 dark:text-amber-400 mb-2">{topic.virtualLab.title}</h4>
                <p className="text-text dark:text-text-dark">{topic.virtualLab.description}</p>
              </div>

              {/* Lab Controls */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {topic.virtualLab.parameters.map(param => (
                  <div key={param.name} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                    <label className="block text-sm font-medium text-text dark:text-text-dark mb-1">
                      {param.label}: <span className="text-primary font-bold">{labParams[param.name] ?? param.default}</span>
                    </label>
                    {param.type === 'slider' && (
                      <input
                        type="range"
                        min={param.min}
                        max={param.max}
                        step={param.step}
                        value={labParams[param.name] ?? param.default}
                        onChange={e => setLabParams(prev => ({ ...prev, [param.name]: parseFloat(e.target.value) }))}
                        className="w-full"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Lab Steps */}
              <div className="space-y-2 mb-4">
                {topic.virtualLab.steps.map((step, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border transition-colors ${
                      labStep === i
                        ? 'border-primary bg-primary/5'
                        : labStep > i
                          ? 'border-success bg-success/5'
                          : 'border-border dark:border-border-dark'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        labStep === i ? 'bg-primary text-white' :
                        labStep > i ? 'bg-success text-white' : 'bg-gray-200 dark:bg-gray-700 text-text dark:text-text-dark'
                      }`}>
                        {i + 1}
                      </div>
                      <div>
                        <h5 className="font-semibold text-text dark:text-text-dark">{step.name}</h5>
                        <p className="text-sm text-muted dark:text-muted-dark">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lab Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => { setLabRunning(!labRunning); if (!labRunning) setLabStep(0); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    labRunning
                      ? 'bg-danger text-white hover:bg-danger/90'
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  {labRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {labRunning ? 'Pause' : 'Start Lab'}
                </button>
                <button
                  onClick={() => { setLabRunning(false); setLabStep(0); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-gray-200 dark:bg-gray-700 text-text dark:text-text-dark hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ===== SECTION 8: INSIGHTS ===== */}
        <div className="bg-card dark:bg-card-dark rounded-xl border border-border dark:border-border-dark mb-4 overflow-hidden">
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
        <div className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark mt-6">
          <h3 className="text-xl font-bold text-text dark:text-text-dark mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Human-in-the-Loop Feedback
          </h3>
          <textarea
            className="w-full p-4 rounded-lg border border-border dark:border-border-dark bg-white dark:bg-gray-800 text-text dark:text-text-dark resize-none"
            rows={4}
            placeholder="Share your feedback, questions, or suggestions for improving this topic..."
          />
          <div className="flex justify-end mt-3">
            <button className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
              Submit Feedback
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
