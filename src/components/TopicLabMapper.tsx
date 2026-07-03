import EnhancedVirtualLab from './EnhancedVirtualLab'

interface Props {
  topicId: string
}

// Map topics to their corresponding lab type
const topicLabMapping: Record<string, { 
  topic: 'slm-basics' | 'rag-basics' | 'slm-finetuning' | 'rag-advanced' | 'deployment'
  title: string
  description: string
}> = {
  // Day 1 topics
  'day1-evolution': {
    topic: 'slm-basics',
    title: 'Hands-On: Your First Small Language Model',
    description: 'Learn to load, configure, and run inference with TinyLlama - a 1.1B parameter SLM'
  },
  'day1-tokenization': {
    topic: 'slm-basics',
    title: 'Tokenization & Embeddings Lab',
    description: 'Explore how text is converted to tokens and embeddings work under the hood'
  },
  
  // Day 2 topics
  'day2-rag-intro': {
    topic: 'rag-basics',
    title: 'Build Your First RAG System',
    description: 'Create a complete RAG pipeline with vector database, embeddings, and LLM integration'
  },
  'day2-vector-db': {
    topic: 'rag-basics',
    title: 'Vector Database Deep Dive',
    description: 'Master ChromaDB, FAISS, and semantic search techniques'
  },
  
  // Day 3 topics
  'day3-finetuning': {
    topic: 'slm-finetuning',
    title: 'Fine-Tune Your Own SLM',
    description: 'Fine-tune Phi-3 or TinyLlama on custom datasets using LoRA and QLoRA'
  },
  'day3-prompt-engineering': {
    topic: 'slm-basics',
    title: 'Advanced Prompt Engineering',
    description: 'Master few-shot learning, chain-of-thought, and prompt optimization'
  },
  
  // Day 4 topics
  'day4-rag-advanced': {
    topic: 'rag-advanced',
    title: 'Production-Ready RAG Systems',
    description: 'Build advanced RAG with re-ranking, hybrid search, and query optimization'
  },
  'day4-evaluation': {
    topic: 'rag-advanced',
    title: 'RAG Evaluation & Optimization',
    description: 'Measure and improve RAG system performance with metrics and benchmarks'
  },
  
  // Day 5 topics
  'day5-deployment': {
    topic: 'deployment',
    title: 'Deploy SLM & RAG to Production',
    description: 'Deploy your models with FastAPI, Docker, and cloud platforms (AWS/Azure/GCP)'
  },
  'day5-optimization': {
    topic: 'deployment',
    title: 'Model Optimization & Quantization',
    description: 'Optimize models with quantization, pruning, and distillation for production'
  },
  
  // Day 6 topics
  'day6-capstone': {
    topic: 'deployment',
    title: 'Capstone: End-to-End AI Application',
    description: 'Build and deploy a complete SLM + RAG application with real-world features'
  }
}

export default function TopicLabMapper({ topicId }: Props) {
  const labConfig = topicLabMapping[topicId]
  
  if (!labConfig) {
    // Fallback to basic SLM lab
    return (
      <EnhancedVirtualLab
        topic="slm-basics"
        title="Interactive Learning Lab"
        description="Hands-on experiential learning with code and real-time feedback"
      />
    )
  }
  
  return (
    <EnhancedVirtualLab
      topic={labConfig.topic}
      title={labConfig.title}
      description={labConfig.description}
    />
  )
}
