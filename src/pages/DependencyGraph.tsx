import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { GitBranch, ArrowRight } from 'lucide-react'

const dependencies = [
  { from: 'AI Evolution', to: 'LLM vs SLM' },
  { from: 'LLM vs SLM', to: 'Tokenization' },
  { from: 'Tokenization', to: 'Embeddings' },
  { from: 'Embeddings', to: 'Positional Encoding' },
  { from: 'Positional Encoding', to: 'Transformer Architecture' },
  { from: 'Transformer Architecture', to: 'Self-Attention' },
  { from: 'Self-Attention', to: 'Text Generation Pipeline' },
  { from: 'Text Generation Pipeline', to: 'Prompt Engineering' },
  { from: 'Prompt Engineering', to: 'Fine-tuning (LoRA)' },
  { from: 'Fine-tuning (LoRA)', to: 'RAG Systems' },
  { from: 'RAG Systems', to: 'Advanced RAG' },
  { from: 'Advanced RAG', to: 'Deployment' },
]

const palette = [
  'bg-indigo-500', 'bg-purple-500', 'bg-violet-500', 'bg-blue-500',
  'bg-cyan-500', 'bg-teal-500', 'bg-emerald-500', 'bg-green-500',
  'bg-yellow-500', 'bg-orange-500', 'bg-rose-500', 'bg-pink-500', 'bg-fuchsia-500',
]

export default function DependencyGraph() {
  return (
    <>
      <Helmet><title>Topic Dependency Graph - SLM &amp; RAG Workshop</title></Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <GitBranch className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text dark:text-text-dark">Topic Dependency Graph</h1>
            <p className="text-sm text-muted dark:text-muted-dark">How concepts build upon each other</p>
          </div>
        </div>

        <div className="bg-card dark:bg-card-dark rounded-2xl p-6 border border-border dark:border-border-dark">
          <p className="text-sm text-muted dark:text-muted-dark mb-6 leading-relaxed">
            This graph shows how topics build upon each other. Understanding prerequisites is essential
            before moving to dependent topics.
          </p>

          {/* Flow Chain */}
          <div className="space-y-3">
            {dependencies.map((dep, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 flex-wrap"
              >
                {/* Step number */}
                <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold text-muted dark:text-muted-dark flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>

                {/* From node */}
                <div className={`px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-sm ${palette[i % palette.length]}`}>
                  {dep.from}
                </div>

                <ArrowRight className="w-4 h-4 text-muted flex-shrink-0" />

                {/* To node */}
                <div className={`px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-sm ${palette[(i + 1) % palette.length]}`}>
                  {dep.to}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-8 pt-6 border-t border-border dark:border-border-dark">
            <p className="text-xs text-muted dark:text-muted-dark font-semibold uppercase tracking-wider mb-3">
              Learning Path
            </p>
            <div className="flex flex-wrap gap-2">
              {['Foundations', 'Language Models', 'Architecture', 'Attention', 'Prompting', 'Fine-tuning', 'RAG', 'Deployment'].map((label, i) => (
                <span key={label} className={`px-3 py-1 rounded-full text-white text-xs font-medium ${palette[(i * 2) % palette.length]}`}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
