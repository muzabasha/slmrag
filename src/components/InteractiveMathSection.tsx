import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Play, RotateCcw, TrendingUp, AlertCircle } from 'lucide-react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import MathEquation from './MathEquation'
import type { MathModeling, Equation, InteractiveParam } from '../types'

interface Props {
  mathModeling: MathModeling
}

export default function InteractiveMathSection({ mathModeling }: Props) {
  const [activeParams, setActiveParams] = useState<Record<string, number>>({})
  const [chartData, setChartData] = useState<Array<{ x: number; y: number; z?: number }>>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Initialize parameters with defaults
    const defaults: Record<string, number> = {}
    mathModeling.interactiveParams?.forEach((param: InteractiveParam) => {
      defaults[param.name] = param.default
    })
    setActiveParams(defaults)
    generateChartData(defaults)
  }, [mathModeling.interactiveParams])

  const generateChartData = (params: Record<string, number>) => {
    const points = 50
    const data = Array.from({ length: points }, (_, i) => {
      const x = i
      const seqLength = params.sequenceLength || 10
      const vocabSize = params.vocabularySize || 50000
      
      // Simulate a probability distribution curve
      const y = Math.exp(-Math.pow(x - seqLength / 2, 2) / (seqLength * 2)) * 
                (1 / Math.sqrt(vocabSize / 10000))
      
      return { x, y, z: y * (vocabSize / 50000) }
    })
    setChartData(data)
  }

  const handleParamChange = (name: string, value: number) => {
    const newParams = { ...activeParams, [name]: value }
    setActiveParams(newParams)
    generateChartData(newParams)
  }

  const handleAnimate = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 2000)
  }

  const handleReset = () => {
    const defaults: Record<string, number> = {}
    mathModeling.interactiveParams?.forEach(param => {
      defaults[param.name] = param.default
    })
    setActiveParams(defaults)
    generateChartData(defaults)
  }

  return (
    <div className="space-y-6">
      {/* Context Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-5 border-2 border-red-200 dark:border-red-700"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h4 className="font-bold text-red-700 dark:text-red-300">Why Do We Need This?</h4>
          </div>
          <p className="text-text dark:text-text-dark">{mathModeling.need}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-5 border-2 border-blue-200 dark:border-blue-700"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-bold text-blue-700 dark:text-blue-300">Motivation</h4>
          </div>
          <p className="text-text dark:text-text-dark">{mathModeling.motivation}</p>
        </motion.div>
      </div>

      {/* Challenges vs Advantages */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-border dark:border-border-dark">
          <h4 className="font-bold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Challenges
          </h4>
          <ul className="space-y-2">
            {[...mathModeling.realWorldChallenges, ...mathModeling.technicalChallenges].map((c, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 text-sm text-text dark:text-text-dark p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/10"
              >
                <span className="text-red-500 mt-1">⚠</span>
                {c}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-border dark:border-border-dark">
          <h4 className="font-bold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Advantages
          </h4>
          <ul className="space-y-2">
            {mathModeling.advantages.map((a: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 text-sm text-text dark:text-text-dark p-2 rounded hover:bg-green-50 dark:hover:bg-green-900/10"
              >
                <span className="text-green-500 mt-1">✓</span>
                {a}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Equations with Enhanced Display */}
      <div className="space-y-4">
        {mathModeling.equations.map((eq: Equation, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700"
          >
            <MathEquation equation={eq} index={i} />
          </motion.div>
        ))}
      </div>

      {/* Interactive Visualization */}
      {mathModeling.interactiveParams && mathModeling.interactiveParams.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-primary/30"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-xl text-primary flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Interactive Visualization
            </h4>
            <div className="flex gap-2">
              <button
                onClick={handleAnimate}
                className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Play className="w-4 h-4" />
                Animate
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-2 bg-gray-200 dark:bg-gray-700 text-text dark:text-text-dark rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          {/* Parameter Controls */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {mathModeling.interactiveParams.map((param: InteractiveParam) => (
              <div key={param.name} className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                <label className="block text-sm font-semibold text-text dark:text-text-dark mb-2">
                  {param.label}: <span className="text-primary text-lg">{activeParams[param.name]?.toFixed(param.step < 1 ? 2 : 0) || param.default}</span>
                </label>
                <input
                  type="range"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={activeParams[param.name] || param.default}
                  onChange={e => handleParamChange(param.name, parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted dark:text-muted-dark mt-1">
                  <span>{param.min}</span>
                  <span>{param.max}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="x" 
                  label={{ value: 'Position', position: 'insideBottom', offset: -5 }}
                  stroke="#6b7280"
                />
                <YAxis 
                  label={{ value: 'Probability', angle: -90, position: 'insideLeft' }}
                  stroke="#6b7280"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorY)"
                  isAnimationActive={isAnimating}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}
    </div>
  )
}
