import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, CheckCircle, XCircle, Copy, Download, Lightbulb } from 'lucide-react'

interface Props {
  initialCode: string
  language: string
  expectedOutput?: string
  hints?: string[]
  onExecute?: (code: string) => { success: boolean; output: string; explanation?: string }
}

export default function CodeEditor({ initialCode, language, expectedOutput, hints, onExecute }: Props) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<string>('')
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionSuccess, setExecutionSuccess] = useState<boolean | null>(null)
  const [showHints, setShowHints] = useState(false)

  const handleExecute = () => {
    setIsExecuting(true)
    setOutput('')
    
    setTimeout(() => {
      if (onExecute) {
        const result = onExecute(code)
        setOutput(result.output)
        setExecutionSuccess(result.success)
      } else {
        // Default simulation
        setOutput(`Code executed successfully!\n\n${expectedOutput || 'Output displayed here...'}`)
        setExecutionSuccess(true)
      }
      setIsExecuting(false)
    }, 1500)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
  }

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `code.${language}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-700">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm font-semibold text-gray-300 ml-2">
            {language.toUpperCase()} Editor
          </span>
        </div>
        <div className="flex gap-2">
          {hints && hints.length > 0 && (
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
            >
              <Lightbulb className="w-3 h-3" />
              Hints
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
          >
            <Copy className="w-3 h-3" />
            Copy
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
          >
            <Download className="w-3 h-3" />
            Download
          </button>
          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className="flex items-center gap-1 px-4 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            <Play className="w-3 h-3" />
            {isExecuting ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>

      {/* Hints Panel */}
      {showHints && hints && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="bg-yellow-900/20 border-b border-yellow-700 p-3"
        >
          <div className="flex items-center gap-1.5 text-sm text-yellow-300 font-semibold mb-2">
            <Lightbulb className="w-4 h-4" /> Hints:
          </div>
          <ul className="space-y-1">
            {hints.map((hint, i) => (
              <li key={i} className="text-xs text-yellow-200 flex items-start gap-2">
                <span className="text-yellow-500">•</span>
                {hint}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Code Editor */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none"
        rows={12}
        spellCheck={false}
        style={{ tabSize: 2 }}
        aria-label="Code editor"
      />

      {/* Output Panel */}
      {output && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="border-t border-gray-700"
        >
          <div className={`px-4 py-2 flex items-center gap-2 ${
            executionSuccess 
              ? 'bg-green-900/20 border-b border-green-700' 
              : executionSuccess === false 
                ? 'bg-red-900/20 border-b border-red-700' 
                : 'bg-gray-800 border-b border-gray-700'
          }`}>
            {executionSuccess === true && <CheckCircle className="w-4 h-4 text-green-400" />}
            {executionSuccess === false && <XCircle className="w-4 h-4 text-red-400" />}
            <span className={`text-sm font-semibold ${
              executionSuccess 
                ? 'text-green-400' 
                : executionSuccess === false 
                  ? 'text-red-400' 
                  : 'text-gray-300'
            }`}>
              {executionSuccess === true ? 'Execution Successful' : executionSuccess === false ? 'Execution Failed' : 'Output'}
            </span>
          </div>
          <pre className="p-4 text-sm text-gray-300 font-mono whitespace-pre-wrap overflow-x-auto">
            {output}
          </pre>
        </motion.div>
      )}
    </div>
  )
}
