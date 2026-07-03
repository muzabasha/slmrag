import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Beaker, Play, Pause, RotateCcw, Zap, TrendingUp, Settings } from 'lucide-react'
import type { VirtualLab, LabParameter, LabStep } from '../types'

interface Props {
  virtualLab: VirtualLab
}

export default function VirtualLabSimulation({ virtualLab }: Props) {
  const [labParams, setLabParams] = useState<Record<string, number>>({})
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [output, setOutput] = useState<string[]>([])

  useEffect(() => {
    const defaults: Record<string, number> = {}
    virtualLab.parameters.forEach((param: LabParameter) => {
      defaults[param.name] = typeof param.default === 'number' ? param.default : 0
    })
    setLabParams(defaults)
  }, [virtualLab.parameters])

  useEffect(() => {
    if (isRunning && currentStep < virtualLab.steps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps([...completedSteps, currentStep])
        setOutput([...output, `✓ ${virtualLab.steps[currentStep].name} completed`])
        setCurrentStep(currentStep + 1)
        
        if (currentStep + 1 >= virtualLab.steps.length) {
          setIsRunning(false)
        }
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [isRunning, currentStep, virtualLab.steps, completedSteps, output])

  const handleStart = () => {
    if (currentStep >= virtualLab.steps.length) {
      handleReset()
    }
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentStep(0)

    setCompletedSteps([])
    setOutput([])
  }

  const handleParamChange = (name: string, value: number) => {
    setLabParams({ ...labParams, [name]: value })
  }

  return (
    <div className="space-y-6">
      {/* Lab Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-6 border-2 border-amber-300 dark:border-amber-700">
        <div className="flex items-center gap-3 mb-3">
          <Beaker className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          <div>
            <h4 className="font-bold text-xl text-amber-700 dark:text-amber-300">{virtualLab.title}</h4>
            <p className="text-text dark:text-text-dark text-sm">{virtualLab.description}</p>
          </div>
        </div>
      </div>

      {/* Parameter Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-border dark:border-border-dark">
        <h5 className="font-bold text-text dark:text-text-dark mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          Experiment Parameters
        </h5>
        <div className="grid md:grid-cols-2 gap-4">
          {virtualLab.parameters.map((param: LabParameter) => (
            <div key={param.name} className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-text dark:text-text-dark">
                  {param.label}
                </label>
                <span className="text-lg font-bold text-primary">
                  {labParams[param.name]?.toFixed((param.step && param.step < 1) ? 2 : 0) || param.default}
                </span>
              </div>
              {param.type === 'slider' && (
                <input
                  type="range"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={labParams[param.name] || param.default}
                  onChange={e => handleParamChange(param.name, parseFloat(e.target.value))}
                  disabled={isRunning}
                  className="w-full"
                />
              )}
              <div className="flex justify-between text-xs text-muted dark:text-muted-dark mt-1">
                <span>{param.min}</span>
                <span>{param.max}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulation Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-border dark:border-border-dark">
        <h5 className="font-bold text-text dark:text-text-dark mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Simulation Steps
        </h5>
        <div className="space-y-3">
          {virtualLab.steps.map((step: LabStep, i: number) => {
            const isActive = currentStep === i && isRunning
            const isCompleted = completedSteps.includes(i)
            const isPending = i > currentStep

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isActive
                    ? 'border-primary bg-primary/5 animate-pulse'
                    : isCompleted
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : isPending
                        ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 opacity-50'
                        : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      isActive
                        ? 'bg-primary text-white animate-pulse'
                        : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-text dark:text-text-dark'
                    }`}
                  >
                    {isCompleted ? '✓' : i + 1}
                  </div>
                  <div className="flex-1">
                    <h6 className="font-semibold text-text dark:text-text-dark">{step.name}</h6>
                    <p className="text-sm text-muted dark:text-muted-dark">{step.description}</p>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-xs text-primary font-medium flex items-center gap-1"
                      >
                        <Zap className="w-3 h-3 animate-pulse" />
                        {step.animation}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-3">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-lg"
          >
            <Play className="w-5 h-5" />
            {currentStep >= virtualLab.steps.length ? 'Restart Lab' : 'Start Lab'}
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg"
          >
            <Pause className="w-5 h-5" />
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-text dark:text-text-dark font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      {/* Output Log */}
      <AnimatePresence>
        {output.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm"
          >
            <div className="flex items-center gap-2 mb-2 text-white">
              <Zap className="w-4 h-4" />
              <span className="font-bold">Lab Output</span>
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {output.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
