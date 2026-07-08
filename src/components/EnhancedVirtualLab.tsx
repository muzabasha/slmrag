import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  Beaker, Play, Pause, RotateCcw, Zap, 
  CheckCircle, Code, Terminal, Package,
  FileCode, Rocket, Activity, Book, Lightbulb
} from 'lucide-react'
import CodeEditor from './CodeEditor'
import { slmFineTuningSteps, ragAdvancedSteps } from '../data/labStepsAdvanced'

interface LabStep {
  id: string
  name: string
  description: string
  animation: string
  category: 'setup' | 'development' | 'testing' | 'deployment'
  code?: {
    language: string
    content: string
    expectedOutput?: string
    hints?: string[]
    explanation?: string
  }
  interactiveDemo?: {
    type: 'slider' | 'input' | 'select'
    label: string
    description: string
    options?: string[]
  }[]
  keyLearning: string[]
  troubleshooting?: {
    issue: string
    solution: string
  }[]
}

interface Props {
  title: string
  description: string
  topic: 'slm-basics' | 'rag-basics' | 'slm-finetuning' | 'rag-advanced' | 'deployment'
}

const labStepsDatabase: Record<string, LabStep[]> = {
  'slm-basics': [
    {
      id: 'install',
      name: 'Environment Setup',
      description: 'Install required libraries and dependencies for working with Small Language Models',
      animation: 'Installing transformers, torch, and required packages...',
      category: 'setup',
      code: {
        language: 'python',
        content: `# Install required packages
!pip install transformers torch accelerate bitsandbytes

# Import necessary libraries
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

print("✓ Environment setup complete!")
print(f"PyTorch version: {torch.__version__}")
print(f"CUDA available: {torch.cuda.is_available()}")`,
        expectedOutput: `✓ Environment setup complete!
PyTorch version: 2.1.0
CUDA available: True`,
        hints: [
          'Use !pip install to install packages in Colab/Jupyter',
          'Always verify CUDA availability for GPU acceleration',
          'Import transformers library for HuggingFace models'
        ],
        explanation: 'This step prepares your Python environment with essential libraries for working with language models.'
      },
      keyLearning: [
        'Transformers library provides pre-trained models',
        'PyTorch is the underlying deep learning framework',
        'GPU acceleration significantly speeds up inference'
      ]
    },
    {
      id: 'load-model',
      name: 'Load Small Language Model',
      description: 'Load a pre-trained SLM from HuggingFace Hub (e.g., TinyLlama, Phi-3)',
      animation: 'Downloading model weights from HuggingFace Hub...',
      category: 'development',
      code: {
        language: 'python',
        content: `# Load TinyLlama model and tokenizer
model_name = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"

print("Loading model...")
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.float16,
    device_map="auto"
)

print(f"✓ Model loaded: {model_name}")
print(f"Model parameters: {model.num_parameters() / 1e6:.1f}M")`,
        expectedOutput: `Loading model...
✓ Model loaded: TinyLlama/TinyLlama-1.1B-Chat-v1.0
Model parameters: 1100.0M`,
        hints: [
          'Use float16 for memory efficiency',
          'device_map="auto" automatically distributes model across available devices',
          'Smaller models like TinyLlama are perfect for learning and testing'
        ],
        explanation: 'Loading a pre-trained model from HuggingFace Hub is the starting point for most NLP tasks.'
      },
      keyLearning: [
        'HuggingFace Hub hosts thousands of pre-trained models',
        'AutoTokenizer and AutoModel classes automatically select the right architecture',
        'Float16 precision reduces memory usage by 50% with minimal accuracy loss'
      ],
      troubleshooting: [
        {
          issue: 'Out of memory error',
          solution: 'Use smaller models or enable 8-bit quantization with load_in_8bit=True'
        },
        {
          issue: 'Model download is slow',
          solution: 'Use a good internet connection or pre-download models'
        }
      ]
    },
    {
      id: 'inference',
      name: 'Run Inference',
      description: 'Generate text using the loaded SLM with different sampling strategies',
      animation: 'Generating text token by token using autoregressive decoding...',
      category: 'testing',
      code: {
        language: 'python',
        content: `# Prepare input prompt
prompt = "Explain what is machine learning in simple terms:"

# Tokenize input
inputs = tokenizer(prompt, return_tensors="pt").to(model.device)

# Generate response
print("Generating response...")
outputs = model.generate(
    **inputs,
    max_new_tokens=100,
    temperature=0.7,
    top_p=0.9,
    do_sample=True
)

# Decode and print response
response = tokenizer.decode(outputs[0], skip_special_tokens=True)
print("\\n" + "="*50)
print(response)
print("="*50)`,
        expectedOutput: `Generating response...

==================================================
Explain what is machine learning in simple terms:
Machine learning is a type of artificial intelligence 
that enables computers to learn from data without being 
explicitly programmed. It uses algorithms to identify 
patterns and make predictions or decisions based on 
those patterns.
==================================================`,
        hints: [
          'Temperature controls randomness: lower = more focused, higher = more creative',
          'top_p (nucleus sampling) keeps only the top probable tokens',
          'max_new_tokens limits the length of generated text'
        ],
        explanation: 'Text generation is an autoregressive process where each token is predicted based on previous tokens.'
      },
      keyLearning: [
        'Temperature and top_p control the creativity vs accuracy tradeoff',
        'Autoregressive generation predicts one token at a time',
        'Sampling strategies significantly affect output quality'
      ]
    }
  ],
  'rag-basics': [
    {
      id: 'vector-db-setup',
      name: 'Setup Vector Database',
      description: 'Initialize a vector database (ChromaDB) for storing document embeddings',
      animation: 'Creating vector database and embedding model...',
      category: 'setup',
      code: {
        language: 'python',
        content: `# Install vector database and embedding model
!pip install chromadb sentence-transformers

import chromadb
from sentence_transformers import SentenceTransformer

# Initialize embedding model
print("Loading embedding model...")
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

# Create ChromaDB client
client = chromadb.Client()
collection = client.create_collection(name="knowledge_base")

print("✓ Vector database ready!")
print(f"Embedding dimension: {embedding_model.get_sentence_embedding_dimension()}")`,
        expectedOutput: `Loading embedding model...
✓ Vector database ready!
Embedding dimension: 384`,
        hints: [
          'ChromaDB is a lightweight vector database perfect for prototyping',
          'Sentence Transformers creates semantic embeddings',
          'Smaller embedding models are faster but may be less accurate'
        ]
      },
      keyLearning: [
        'Vector databases store embeddings for similarity search',
        'Embeddings capture semantic meaning of text',
        'Different embedding models have different dimensions and capabilities'
      ]
    },
    {
      id: 'document-ingestion',
      name: 'Ingest Documents',
      description: 'Load documents, chunk them, create embeddings, and store in vector DB',
      animation: 'Processing documents and creating embeddings...',
      category: 'development',
      code: {
        language: 'python',
        content: `# Sample documents about AI
documents = [
    "Machine learning is a subset of AI that learns from data.",
    "Neural networks are inspired by biological neurons in the brain.",
    "Deep learning uses multiple layers to learn hierarchical features.",
    "Natural Language Processing enables computers to understand text.",
    "Transformers revolutionized NLP with attention mechanisms."
]

# Create embeddings
print("Creating embeddings...")
embeddings = embedding_model.encode(documents)

# Store in vector database
collection.add(
    embeddings=embeddings.tolist(),
    documents=documents,
    ids=[f"doc_{i}" for i in range(len(documents))]
)

print(f"✓ Stored {len(documents)} documents in vector DB")`,
        expectedOutput: `Creating embeddings...
✓ Stored 5 documents in vector DB`,
        hints: [
          'Chunk large documents into smaller pieces for better retrieval',
          'Each chunk gets its own embedding vector',
          'Keep chunks semantically coherent'
        ]
      },
      keyLearning: [
        'Document chunking is crucial for effective retrieval',
        'Embeddings capture semantic similarity',
        'Vector DB indexes embeddings for fast similarity search'
      ]
    },
    {
      id: 'retrieval',
      name: 'Semantic Retrieval',
      description: 'Query the vector database to retrieve relevant documents',
      animation: 'Computing query embedding and finding nearest neighbors...',
      category: 'testing',
      code: {
        language: 'python',
        content: `# User query
query = "How do neural networks work?"

# Create query embedding
query_embedding = embedding_model.encode([query])

# Retrieve similar documents
results = collection.query(
    query_embeddings=query_embedding.tolist(),
    n_results=2
)

print("Query:", query)
print("\\nTop 2 relevant documents:")
for i, doc in enumerate(results['documents'][0], 1):
    print(f"{i}. {doc}")`,
        expectedOutput: `Query: How do neural networks work?

Top 2 relevant documents:
1. Neural networks are inspired by biological neurons in the brain.
2. Deep learning uses multiple layers to learn hierarchical features.`,
        hints: [
          'Query and documents must use the same embedding model',
          'Adjust n_results based on context window size',
          'Consider relevance threshold to filter low-quality matches'
        ]
      },
      keyLearning: [
        'Semantic search finds conceptually similar documents',
        'Cosine similarity measures vector closeness',
        'Retrieved context augments LLM knowledge'
      ]
    },
    {
      id: 'rag-generation',
      name: 'RAG Generation',
      description: 'Combine retrieved documents with LLM to generate informed responses',
      animation: 'Augmenting prompt with retrieved context and generating response...',
      category: 'deployment',
      code: {
        language: 'python',
        content: `# Build RAG prompt
context = "\\n".join(results['documents'][0])
rag_prompt = f"""Context: {context}

Question: {query}

Answer based on the context above:"""

# Generate with RAG
inputs = tokenizer(rag_prompt, return_tensors="pt").to(model.device)
outputs = model.generate(
    **inputs,
    max_new_tokens=150,
    temperature=0.7
)

response = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(response)`,
        expectedOutput: `Context: Neural networks are inspired by biological neurons in the brain.
Deep learning uses multiple layers to learn hierarchical features.

Question: How do neural networks work?

Answer based on the context above:
Neural networks are computational models inspired by the biological 
structure of neurons in the brain. They work by processing information 
through multiple interconnected layers. Each layer learns to recognize 
increasingly complex patterns, with deep learning networks using many 
layers to build hierarchical feature representations.`,
        hints: [
          'Format context clearly in the prompt',
          'Instruct model to answer based on provided context',
          'RAG reduces hallucination by grounding responses in facts'
        ]
      },
      keyLearning: [
        'RAG = Retrieval + Augmented + Generation',
        'Retrieved context grounds LLM in factual information',
        'Prompt engineering is crucial for good RAG performance'
      ]
    }
  ],
  'slm-finetuning': slmFineTuningSteps,
  'rag-advanced': ragAdvancedSteps,
  'deployment': [
    {
      id: 'optimize-model',
      name: 'Model Optimization',
      description: 'Apply quantization and optimization for faster inference',
      animation: 'Quantizing model weights to reduce size and increase speed...',
      category: 'setup',
      code: {
        language: 'python',
        content: `# Load model with 8-bit quantization
from transformers import BitsAndBytesConfig

quantization_config = BitsAndBytesConfig(
    load_in_8bit=True,
    llm_int8_threshold=6.0
)

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=quantization_config,
    device_map="auto"
)

print("✓ Model quantized to 8-bit")
print(f"Memory footprint reduced by ~50%")`,
        expectedOutput: `✓ Model quantized to 8-bit
Memory footprint reduced by ~50%`,
        hints: [
          '8-bit quantization reduces model size with minimal accuracy loss',
          'Essential for deploying large models on consumer hardware',
          'Check model performance after quantization'
        ]
      },
      keyLearning: [
        'Quantization converts float32 to int8',
        'Reduces memory by 4x compared to float32',
        'Enables deployment on limited hardware'
      ]
    },
    {
      id: 'api-endpoint',
      name: 'Create API Endpoint',
      description: 'Build a FastAPI endpoint for serving the model',
      animation: 'Creating REST API with FastAPI...',
      category: 'deployment',
      code: {
        language: 'python',
        content: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class QueryRequest(BaseModel):
    query: str
    max_tokens: int = 100

@app.post("/generate")
async def generate_text(request: QueryRequest):
    inputs = tokenizer(request.query, return_tensors="pt")
    outputs = model.generate(
        **inputs,
        max_new_tokens=request.max_tokens
    )
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"response": response}

# Run with: uvicorn main:app --reload
print("✓ API endpoint created at /generate")`,
        expectedOutput: `✓ API endpoint created at /generate`,
        hints: [
          'FastAPI automatically generates API documentation',
          'Use async/await for better performance',
          'Add authentication for production deployments'
        ]
      },
      keyLearning: [
        'REST APIs make models accessible via HTTP',
        'FastAPI provides automatic validation and docs',
        'Containerize with Docker for easy deployment'
      ]
    }
  ]
}

export default function EnhancedVirtualLab({ title, description, topic }: Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const steps = labStepsDatabase[topic] || []
  const currentStep = steps[currentStepIndex]

  const handleStepComplete = useCallback(() => {
    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps([...completedSteps, currentStep.id])
      setLogs([...logs, `✓ ${currentStep.name} completed successfully`])
    }
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }, [completedSteps, currentStep, currentStepIndex, logs, steps.length])

  useEffect(() => {
    if (isAutoPlaying && currentStepIndex < steps.length - 1) {
      const timer = setTimeout(() => {
        handleStepComplete()
      }, 5000)
      return () => clearTimeout(timer)
    } else if (currentStepIndex >= steps.length - 1) {
      setIsAutoPlaying(false)
    }
  }, [isAutoPlaying, currentStepIndex, steps.length, handleStepComplete])

  const handleStepSelect = (index: number) => {
    setCurrentStepIndex(index)
    setIsAutoPlaying(false)
  }

  const handleReset = () => {
    setCurrentStepIndex(0)
    setCompletedSteps([])
    setLogs([])
    setIsAutoPlaying(false)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'setup': return Package
      case 'development': return Code
      case 'testing': return Activity
      case 'deployment': return Rocket
      default: return FileCode
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'setup': return 'text-blue-400'
      case 'development': return 'text-purple-400'
      case 'testing': return 'text-green-400'
      case 'deployment': return 'text-orange-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Lab Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Beaker className="w-10 h-10" />
          <div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-white/90">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="flex-1 bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
              className="h-full bg-white rounded-full"
            />
          </div>
          <span className="text-sm font-semibold">
            {completedSteps.length}/{steps.length} Steps
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg ${
            isAutoPlaying
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isAutoPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-text dark:text-text-dark font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Reset Lab
        </button>
      </div>

      {/* Steps Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((step, index) => {
          const Icon = getCategoryIcon(step.category)
          const isCompleted = completedSteps.includes(step.id)
          const isCurrent = index === currentStepIndex

          return (
            <button
              key={step.id}
              onClick={() => handleStepSelect(index)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                isCurrent
                  ? 'border-primary bg-primary/10 scale-105'
                  : isCompleted
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-border dark:border-border-dark hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-5 h-5 ${getCategoryColor(step.category)}`} />
                {isCompleted && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
              </div>
              <div className="text-sm font-semibold text-text dark:text-text-dark">
                {step.name}
              </div>
              <div className="text-xs text-muted dark:text-muted-dark mt-1">
                {step.category}
              </div>
            </button>
          )
        })}
      </div>

      {/* Current Step Content */}
      {currentStep && (
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-primary/30"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-2xl font-bold text-text dark:text-text-dark mb-2">
                {currentStep.name}
              </h4>
              <p className="text-muted dark:text-muted-dark">{currentStep.description}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              currentStep.category === 'setup' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
              currentStep.category === 'development' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
              currentStep.category === 'testing' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
              'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
            }`}>
              {currentStep.category.toUpperCase()}
            </span>
          </div>

          {/* Code Editor */}
          {currentStep.code && (
            <div className="mb-6">
              <CodeEditor
                initialCode={currentStep.code.content}
                language={currentStep.code.language}
                expectedOutput={currentStep.code.expectedOutput}
                hints={currentStep.code.hints}
              />
              {currentStep.code.explanation && (
                <div className="mt-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                      <div className="flex items-start gap-2 text-sm text-text dark:text-text-dark">
                        <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-300 mt-0.5 flex-shrink-0" />
                        <div><strong className="text-blue-700 dark:text-blue-300">Explanation:</strong> {currentStep.code.explanation}</div>
                      </div>
                </div>
              )}
            </div>
          )}

          {/* Key Learning Points */}
          <div className="mb-6">
            <h5 className="font-bold text-text dark:text-text-dark mb-3 flex items-center gap-2">
              <Book className="w-5 h-5 text-primary" />
              Key Learning Points
            </h5>
            <ul className="space-y-2">
              {currentStep.keyLearning.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className="text-text dark:text-text-dark">{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Troubleshooting */}
          {currentStep.troubleshooting && currentStep.troubleshooting.length > 0 && (
            <div className="mb-6">
              <h5 className="font-bold text-text dark:text-text-dark mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Common Issues & Solutions
              </h5>
              <div className="space-y-3">
                {currentStep.troubleshooting.map((item, i) => (
                  <div key={i} className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                    <div className="flex items-center gap-1.5 font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                      <Zap className="w-4 h-4" />
                      <span>{item.issue}</span>
                    </div>
                    <p className="text-sm text-text dark:text-text-dark">
                      <strong>Solution:</strong> {item.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-border dark:border-border-dark">
            <button
              onClick={() => currentStepIndex > 0 && setCurrentStepIndex(currentStepIndex - 1)}
              disabled={currentStepIndex === 0}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-text dark:text-text-dark font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleStepComplete}
              className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all"
            >
              {currentStepIndex === steps.length - 1 ? 'Complete Lab' : 'Next Step'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Activity Log */}
      {logs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm"
        >
          <div className="flex items-center gap-2 mb-2 text-white">
            <Terminal className="w-4 h-4" />
            <span className="font-bold">Activity Log</span>
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {log}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
