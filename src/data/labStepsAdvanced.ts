// Advanced lab steps for fine-tuning and RAG
export const slmFineTuningSteps = [
  {
    id: 'dataset-prep',
    name: 'Prepare Training Dataset',
    description: 'Format and prepare your custom dataset for fine-tuning',
    animation: 'Loading and formatting training data...',
    category: 'setup' as const,
    code: {
      language: 'python',
      content: `# Prepare custom dataset
from datasets import Dataset

# Example: Customer support Q&A dataset
data = {
    "instruction": [
        "How do I reset my password?",
        "What is your refund policy?",
        "How do I track my order?"
    ],
    "response": [
        "To reset your password, click 'Forgot Password' on the login page...",
        "We offer a 30-day money-back guarantee for all purchases...",
        "You can track your order using the tracking link in your email..."
    ]
}

# Create HuggingFace dataset
dataset = Dataset.from_dict(data)

# Format for training
def format_prompt(example):
    return {
        "text": f"### Instruction:\\n{example['instruction']}\\n\\n### Response:\\n{example['response']}"
    }

formatted_dataset = dataset.map(format_prompt)
print(f"✓ Dataset prepared: {len(formatted_dataset)} examples")`,
      expectedOutput: `✓ Dataset prepared: 3 examples`,
      hints: [
        'Format data consistently with instruction-response pairs',
        'Add system prompts for better model behavior',
        'Ensure dataset quality over quantity'
      ]
    },
    keyLearning: [
      'Dataset quality is crucial for fine-tuning success',
      'Consistent formatting helps model learn patterns',
      'Start with small datasets (100-1000 examples)'
    ]
  },
  {
    id: 'lora-config',
    name: 'Configure LoRA',
    description: 'Set up Parameter-Efficient Fine-Tuning with LoRA',
    animation: 'Configuring LoRA adapters for efficient training...',
    category: 'development' as const,
    code: {
      language: 'python',
      content: `from peft import LoraConfig, get_peft_model, TaskType

# LoRA configuration
lora_config = LoraConfig(
    r=16,  # Rank of the update matrices
    lora_alpha=32,  # Scaling factor
    target_modules=["q_proj", "v_proj"],  # Which layers to adapt
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM
)

# Apply LoRA to model
model = get_peft_model(model, lora_config)
trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
all_params = sum(p.numel() for p in model.parameters())

print(f"✓ LoRA configured")
print(f"Trainable params: {trainable_params:,} ({100 * trainable_params / all_params:.2f}%)")`,
      expectedOutput: `✓ LoRA configured
Trainable params: 2,359,296 (0.21%)`,
      hints: [
        'LoRA only trains 0.1-1% of parameters',
        'Higher rank (r) = more capacity but more parameters',
        'Target important attention layers for best results'
      ]
    },
    keyLearning: [
      'LoRA enables efficient fine-tuning on consumer GPUs',
      'Only updates small adapter matrices, not full weights',
      'Can train 7B models on 16GB GPU with LoRA'
    ],
    troubleshooting: [
      {
        issue: 'Out of memory during training',
        solution: 'Reduce batch size, use gradient accumulation, or apply 8-bit training'
      }
    ]
  },
  {
    id: 'training',
    name: 'Train the Model',
    description: 'Fine-tune the model on your custom dataset',
    animation: 'Training model with gradient descent...',
    category: 'development' as const,
    code: {
      language: 'python',
      content: `from transformers import TrainingArguments, Trainer

# Training configuration
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    fp16=True,
    logging_steps=10,
    save_strategy="epoch"
)

# Initialize trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=formatted_dataset,
    tokenizer=tokenizer
)

# Start training
print("Starting training...")
trainer.train()
print("✓ Training complete!")`,
      expectedOutput: `Starting training...
Epoch 1/3: 100% [====] Loss: 0.8234
Epoch 2/3: 100% [====] Loss: 0.5123
Epoch 3/3: 100% [====] Loss: 0.3456
✓ Training complete!`,
      hints: [
        'Monitor loss to ensure model is learning',
        'Use gradient accumulation for larger effective batch sizes',
        'Enable fp16 for 2x faster training'
      ]
    },
    keyLearning: [
      'Fine-tuning adapts pre-trained knowledge to specific tasks',
      'Learning rate is crucial - too high causes instability',
      'More epochs ≠ better - watch for overfitting'
    ]
  },
  {
    id: 'evaluation',
    name: 'Evaluate Fine-Tuned Model',
    description: 'Test the model on new examples and compare to base model',
    animation: 'Running inference and evaluating performance...',
    category: 'testing' as const,
    code: {
      language: 'python',
      content: `# Test on new example
test_prompt = "### Instruction:\\nHow do I cancel my subscription?\\n\\n### Response:\\n"

inputs = tokenizer(test_prompt, return_tensors="pt").to(model.device)
outputs = model.generate(**inputs, max_new_tokens=100)
response = tokenizer.decode(outputs[0], skip_special_tokens=True)

print("Fine-tuned Model Response:")
print(response)
print("\\n✓ Model successfully adapted to your domain!")`,
      expectedOutput: `Fine-tuned Model Response:
### Instruction:
How do I cancel my subscription?

### Response:
To cancel your subscription, log in to your account and navigate 
to Settings > Subscription. Click "Cancel Subscription" and follow 
the prompts. Your access will continue until the end of your 
current billing period.

✓ Model successfully adapted to your domain!`,
      hints: [
        'Compare responses with base model',
        'Test on diverse examples from your domain',
        'Check for hallucinations or incorrect information'
      ]
    },
    keyLearning: [
      'Fine-tuned models should outperform base models on domain tasks',
      'Always evaluate on held-out test data',
      'Quality metrics: relevance, accuracy, helpfulness'
    ]
  }
]

export const ragAdvancedSteps = [
  {
    id: 'hybrid-search',
    name: 'Implement Hybrid Search',
    description: 'Combine semantic search with keyword matching for better retrieval',
    animation: 'Implementing BM25 + semantic hybrid search...',
    category: 'development' as const,
    code: {
      language: 'python',
      content: `from rank_bm25 import BM25Okapi
import numpy as np

# Documents
docs = [
    "Machine learning models learn patterns from data",
    "Neural networks use backpropagation for training",
    "Deep learning achieves state-of-art in many tasks"
]

# BM25 (keyword-based)
tokenized_docs = [doc.lower().split() for doc in docs]
bm25 = BM25Okapi(tokenized_docs)

# Semantic search (vector-based)
doc_embeddings = embedding_model.encode(docs)

def hybrid_search(query, alpha=0.5):
    # BM25 scores
    bm25_scores = bm25.get_scores(query.lower().split())
    
    # Semantic scores
    query_emb = embedding_model.encode([query])[0]
    semantic_scores = np.dot(doc_embeddings, query_emb)
    
    # Combine scores
    hybrid_scores = alpha * bm25_scores + (1 - alpha) * semantic_scores
    top_idx = np.argmax(hybrid_scores)
    
    return docs[top_idx]

result = hybrid_search("How do neural networks learn?")
print(f"Best match: {result}")`,
      expectedOutput: `Best match: Neural networks use backpropagation for training`,
      hints: [
        'Alpha controls keyword vs semantic weight',
        'Hybrid search handles both exact matches and semantic similarity',
        'Tune alpha on validation queries'
      ]
    },
    keyLearning: [
      'Hybrid search combines best of both approaches',
      'Keyword search catches exact terms/entities',
      'Semantic search understands intent and concepts'
    ]
  },
  {
    id: 'reranking',
    name: 'Add Re-Ranking',
    description: 'Use a cross-encoder to re-rank retrieved documents',
    animation: 'Re-ranking candidates with cross-encoder...',
    category: 'development' as const,
    code: {
      language: 'python',
      content: `from sentence_transformers import CrossEncoder

# Load cross-encoder for re-ranking
reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

def retrieve_and_rerank(query, top_k=10, rerank_top=3):
    # Initial retrieval (get more candidates)
    results = collection.query(
        query_embeddings=embedding_model.encode([query]).tolist(),
        n_results=top_k
    )
    
    # Re-rank top candidates
    pairs = [[query, doc] for doc in results['documents'][0]]
    scores = reranker.predict(pairs)
    
    # Sort by re-ranker scores
    ranked_indices = np.argsort(scores)[::-1][:rerank_top]
    reranked_docs = [results['documents'][0][i] for i in ranked_indices]
    
    return reranked_docs

docs = retrieve_and_rerank("Explain neural network training")
print("Top 3 re-ranked documents:")
for i, doc in enumerate(docs, 1):
    print(f"{i}. {doc}")`,
      expectedOutput: `Top 3 re-ranked documents:
1. Neural networks use backpropagation for training
2. Deep learning achieves state-of-art in many tasks
3. Machine learning models learn patterns from data`,
      hints: [
        'Retrieve more candidates (10-20) then re-rank top 3-5',
        'Cross-encoders are more accurate but slower',
        'Use bi-encoders for initial retrieval, cross-encoders for re-ranking'
      ]
    },
    keyLearning: [
      'Two-stage retrieval improves accuracy',
      'Cross-encoders compute query-document interaction',
      'Re-ranking is essential for production RAG systems'
    ]
  },
  {
    id: 'query-optimization',
    name: 'Query Transformation',
    description: 'Optimize queries using expansion, decomposition, and hypothetical documents',
    animation: 'Transforming query for better retrieval...',
    category: 'development' as const,
    code: {
      language: 'python',
      content: `# Query expansion with LLM
def expand_query(query):
    prompt = f"""Generate 3 alternative phrasings of this query:
Query: {query}

Alternative phrasings:
1."""
    
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_new_tokens=150)
    expansions = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    return expansions

# Hypothetical Document Embedding (HyDE)
def generate_hypothetical_doc(query):
    prompt = f"""Write a detailed paragraph that would answer:
{query}

Answer:"""
    
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_new_tokens=200)
    hypo_doc = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    # Use hypothetical doc for retrieval
    hypo_embedding = embedding_model.encode([hypo_doc])
    results = collection.query(
        query_embeddings=hypo_embedding.tolist(),
        n_results=3
    )
    
    return results['documents'][0]

query = "What are transformers in NLP?"
docs = generate_hypothetical_doc(query)
print("Retrieved docs using HyDE:")
for doc in docs:
    print(f"- {doc}")`,
      expectedOutput: `Retrieved docs using HyDE:
- Transformers revolutionized NLP with attention mechanisms
- Neural networks are inspired by biological neurons
- Deep learning uses multiple layers to learn features`,
      hints: [
        'Query expansion increases recall',
        'HyDE bridges vocabulary gap between query and docs',
        'Different strategies work better for different query types'
      ]
    },
    keyLearning: [
      'Query transformation improves retrieval accuracy',
      'HyDE generates ideal document then searches for similar',
      'Query decomposition helps with complex multi-part questions'
    ]
  },
  {
    id: 'rag-evaluation',
    name: 'RAG Evaluation Metrics',
    description: 'Measure RAG system performance with precision, recall, and answer quality',
    animation: 'Computing evaluation metrics...',
    category: 'testing' as const,
    code: {
      language: 'python',
      content: `# RAG evaluation metrics
def evaluate_rag(test_queries, ground_truth_answers):
    results = {
        'retrieval_precision': [],
        'answer_relevance': [],
        'faithfulness': []
    }
    
    for query, gt_answer in zip(test_queries, ground_truth_answers):
        # Retrieve documents
        docs = retrieve_and_rerank(query)
        
        # Generate answer
        context = "\\n".join(docs)
        prompt = f"Context: {context}\\n\\nQuestion: {query}\\nAnswer:"
        inputs = tokenizer(prompt, return_tensors="pt")
        outputs = model.generate(**inputs, max_new_tokens=100)
        answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Compute metrics (simplified)
        # In practice, use RAGAS, LLM-as-judge, or human evaluation
        relevance_score = compute_similarity(answer, gt_answer)
        results['answer_relevance'].append(relevance_score)
    
    avg_relevance = np.mean(results['answer_relevance'])
    print(f"Average Answer Relevance: {avg_relevance:.2f}")
    return results

# Example evaluation
test_qs = ["What is machine learning?"]
gt_answers = ["ML is a subset of AI that learns from data"]
evaluate_rag(test_qs, gt_answers)`,
      expectedOutput: `Average Answer Relevance: 0.87`,
      hints: [
        'Use RAGAS framework for comprehensive RAG evaluation',
        'Measure both retrieval quality and generation quality',
        'Human evaluation is gold standard'
      ]
    },
    keyLearning: [
      'RAG evaluation requires multiple metrics',
      'Key metrics: precision, recall, faithfulness, relevance',
      'A/B testing helps compare different RAG configurations'
    ]
  }
]
