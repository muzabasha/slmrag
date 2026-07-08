import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { GitBranch } from 'lucide-react'
import MermaidDiagram from '../components/MermaidDiagram'

const flowChart = `graph TD
    FE[AI Evolution] --> LS[LLM vs SLM]
    LS --> TK[Tokenization]
    TK --> EM[Embeddings]
    EM --> PE[Positional Encoding]
    PE --> TA[Transformer Architecture]
    TA --> SA[Self-Attention]
    SA --> TG[Text Generation Pipeline]
    TG --> PE2[Prompt Engineering]
    PE2 --> FT[Fine-tuning LoRA]
    FT --> RS[RAG Systems]
    RS --> AR[Advanced RAG]
    AR --> DP[Deployment]

    style FE fill:#6366f1,color:#fff
    style LS fill:#a855f7,color:#fff
    style TK fill:#7c3aed,color:#fff
    style EM fill:#3b82f6,color:#fff
    style PE fill:#06b6d4,color:#fff
    style TA fill:#14b8a6,color:#fff
    style SA fill:#10b981,color:#fff
    style TG fill:#22c55e,color:#fff
    style PE2 fill:#eab308,color:#fff
    style FT fill:#f59e0b,color:#fff
    style RS fill:#f97316,color:#fff
    style AR fill:#ef4444,color:#fff
    style DP fill:#ec4899,color:#fff`

const stages = [
  { label: 'Foundations', color: 'bg-indigo-500' },
  { label: 'Language Models', color: 'bg-purple-500' },
  { label: 'Architecture', color: 'bg-blue-500' },
  { label: 'Attention', color: 'bg-emerald-500' },
  { label: 'Prompting', color: 'bg-yellow-500' },
  { label: 'Fine-tuning', color: 'bg-orange-500' },
  { label: 'RAG', color: 'bg-red-500' },
  { label: 'Deployment', color: 'bg-pink-500' },
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

          <MermaidDiagram chart={flowChart} />

          {/* Legend */}
          <div className="pt-6 border-t border-border dark:border-border-dark">
            <p className="text-xs text-muted dark:text-muted-dark font-semibold uppercase tracking-wider mb-3">
              Learning Path Stages
            </p>
            <div className="flex flex-wrap gap-2">
              {stages.map(({ label, color }) => (
                <span key={label} className={`px-3 py-1 rounded-full text-white text-xs font-medium ${color}`}>
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
