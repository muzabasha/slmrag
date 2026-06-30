import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { BarChart3, PieChart, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePie, Pie, Cell } from 'recharts'

const progressData = [
  { day: 'Day 1', completed: 100, remaining: 0 },
  { day: 'Day 2', completed: 80, remaining: 20 },
  { day: 'Day 3', completed: 60, remaining: 40 },
  { day: 'Day 4', completed: 40, remaining: 60 },
  { day: 'Day 5', completed: 20, remaining: 80 },
  { day: 'Day 6', completed: 0, remaining: 100 },
]

const topicDistribution = [
  { name: 'Theory', value: 35 },
  { name: 'Hands-on', value: 40 },
  { name: 'Projects', value: 25 },
]

const COLORS = ['#3b82f6', '#10b981', '#7c3aed']

const skillData = [
  { skill: 'LLM Architecture', score: 85 },
  { skill: 'Prompt Engineering', score: 70 },
  { skill: 'Fine-tuning', score: 55 },
  { skill: 'RAG Systems', score: 45 },
  { skill: 'Deployment', score: 30 },
]

export default function LearningAnalytics() {
  return (
    <>
      <Helmet><title>Learning Analytics - SLM & RAG Workshop</title></Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-6 flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-primary" />
          Learning Analytics Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Progress Chart */}
          <div className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark">
            <h3 className="font-bold text-lg text-text dark:text-text-dark mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Daily Progress
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
                <Bar dataKey="remaining" stackId="a" fill="#e2e8f0" name="Remaining" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Topic Distribution */}
          <div className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark">
            <h3 className="font-bold text-lg text-text dark:text-text-dark mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Content Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RePie>
                <Pie data={topicDistribution} cx="50%" cy="50%" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                  {topicDistribution.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePie>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills Progress */}
        <div className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark">
          <h3 className="font-bold text-lg text-text dark:text-text-dark mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Skill Acquisition Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="skill" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="score" fill="#7c3aed" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </>
  )
}
