import { useEffect, useRef } from 'react'
import katex from 'katex'
import type { Equation } from '../types'

interface MathEquationProps {
  equation: Equation
  index: number
}

export default function MathEquation({ equation, index }: MathEquationProps) {
  const displayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (displayRef.current) {
      try {
        katex.render(equation.latex, displayRef.current, {
          throwOnError: false,
          displayMode: true,
          output: 'html',
        })
      } catch (e) {
        console.error('KaTeX error:', e)
      }
    }
  }, [equation.latex])

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-sm">
          {index + 1}
        </span>
        <h5 className="font-semibold text-text dark:text-text-dark">Equation {index + 1}</h5>
      </div>

      <div ref={displayRef} className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-3 overflow-x-auto" />

      {/* Symbol Explanations */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
        {equation.symbolExplanations.map((se, i) => (
          <div key={i} className="flex items-center gap-2 text-sm bg-gray-50 dark:bg-gray-800/50 rounded px-2 py-1">
            <span className="font-mono font-bold text-primary">{se.symbol}</span>
            <span className="text-text dark:text-text-dark">= {se.meaning}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm">
        <p className="text-text dark:text-text-dark">
          <span className="font-semibold">Meaning: </span>{equation.meaning}
        </p>
        <p className="text-text dark:text-text-dark">
          <span className="font-semibold">Why needed: </span>{equation.whyNeeded}
        </p>
        <p className="text-text dark:text-text-dark">
          <span className="font-semibold">Interpretation: </span>{equation.interpretation}
        </p>
        <p className="text-text dark:text-text-dark">
          <span className="font-semibold">Numerical Example: </span>{equation.numericalExample}
        </p>
      </div>
    </div>
  )
}
