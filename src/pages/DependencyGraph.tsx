import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { GitBranch, ArrowRight } from 'lucide-react'

const dependencies = [
  { from: 'AI Evolution', to: 'LLM vs SLM', color: 'bg-blue-500' },
  { from: 'LLM vs SLM', to: 'Tokenization', color: 'bg-purple-500' },
  { from: 'Tokenization', to: 'Embeddings', color: 'bg-green-500' },
  { from: 'Embeddings', to: 'Positional Encoding', color: 'bg-yellow-500' },
  { from: 'Positional Encoding', to: 'Transformer Architecture', color: 'bg-red-500' },
  { from: 'Transformer Architecture', to: 'Self-Attention', color: 'bg-pink-500' },
  { from: 'Self-Attention', to: 'Text Generation Pipeline', color: 'bg-indigo-500' },
  { from: 'Text Generation', to: 'Prompt Engineering', color: 'bg-teal-500' },
  { from: 'Prompt Engineering', to: 'Fine-tuning (LoRA)', color: 'bg-orange-500' },
  { from: 'Fine-tuning', to: 'RAG Systems', color: 'bg-cyan-500' },
  { from: 'RAG Systems', to: 'Advanced RAG', color: 'bg-violet-500' },
  { from: 'Advanced RAG', to: 'Deployment', color: 'bg-emerald-500' },
]

export default function DependencyGraph() {
  return (
    <>
      <Helmet><title>Topic Dependency Graph - SLM & RAG Workshop</title></Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-6 flex items-center gap-2">
          <GitBranch className="w-8 h-8 text-primary" />
          Topic Dependency Graph
        </h1>

        <div className="bg-card dark:bg-card-dark rounded-xl p-6 border border-border dark:border-border-dark">
          <p className="text-text dark:text-text-dark mb-6">
            This graph shows how topics build upon each other. Understanding prerequisites is essential
            before moving to dependent topics.
          </p>

          <div className="space-y-3">
            {dependencies.map((dep, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className={`px-4 py-2 rounded-lg text-white text-sm font-semibold ${dep.color}`}>
                  {dep.from}
                </div>
                <ArrowRight className="w-5 h-5 text-muted flex-shrink-0" />
                <div className={`px-4 py-2 rounded-lg text-white text-sm font-semibold ${dependencies[i + 1]?.color || 'bg-gray-500'}`}>
                  {dep.to}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}
