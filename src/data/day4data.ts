import type { Module } from '../types';

const day4Module: Module = {
  id: 'day4',
  day: 4,
  title: 'Designing Domain-Specific RAG Systems',
  subtitle: 'Build Retrieval-Augmented Generation systems using private knowledge bases',
  objectives: [
    'Understand the complete RAG architecture and components',
    'Master document preprocessing and chunking strategies',
    'Implement embedding generation and vector database storage',
    'Build a complete RAG pipeline with LangChain',
    'Optimise retrieval quality with metadata filtering',
  ],
  tools: ['LangChain', 'ChromaDB', 'Sentence Transformers', 'FAISS', 'LlamaIndex'],
  skills: ['Enterprise AI System Development', 'RAG Pipeline Design'],
  deliverable: 'Functional Domain-Specific RAG Chatbot',
  topics: [
    {
      id: 'day4-rag-architecture',
      title: 'RAG Architecture & Implementation',
      description: 'Learn to build retrieval-augmented generation systems that ground LLM responses in your private data',
      duration: '45 min',
      prerequisites: ['Embeddings understanding', 'LLM inference basics', 'Python programming'],
      dependentTopics: ['Advanced RAG', 'Deployment'],
      nextTopicPrep: 'Collect 3-5 PDF documents from your domain for the hands-on session',
      story: {
        analogy: 'The Open-Book Exam',
        narrative: `Remember how in school some exams were "closed book" (rely only on your memory) and others were "open book" (you can look up information)? Standard LLMs are like students taking a closed-book exam — they can only use what they memorized during training. They might forget details, confuse facts, or make things up (hallucinate).

RAG is like giving the student an open-book exam with a well-organized textbook. When asked a question, the student first looks up relevant sections in the textbook (retrieval), reads them carefully, and then formulates an answer based on both the textbook and their general knowledge.

But here's the trick: the textbook needs a REALLY good index. You can't search every page every time — that would take forever. So you create a smart index (vector database) that maps topics to their locations. When a question comes in, you find the most relevant pages instantly.

Now imagine multiple textbooks (multiple documents), each with different chapters, some contradicting each other. Your RAG system needs to: 1) Decide which books are relevant, 2) Find the right chapters, 3) Read them, and 4) Synthesize a coherent answer. That's the art of RAG!`,
        reflectiveQuestions: [
          'Why is retrieval better than just relying on the model\'s memorized knowledge?',
          'What happens when the retrieved documents contain conflicting information?',
          'How would you handle a query that no document in the database can answer?',
        ],
        connection: 'RAG combines the generative power of LLMs with the factual accuracy of retrieval systems. It\'s the standard architecture for building AI systems that work with private or up-to-date data.',
        technicalExplanation: [
          'RAG pipeline: Query → Embed → Retrieve (from vector DB) → Augment prompt → Generate response',
          'Documents are split into chunks (typically 256-1024 tokens), each converted to an embedding vector',
          'Vector databases (ChromaDB, FAISS, Pinecone) index embeddings for efficient similarity search',
          'Retrieved chunks are injected into the LLM prompt as context, grounding the generation in retrieved facts',
          'Metadata filtering (date, author, category) narrows search space for more relevant retrieval',
        ],
        lifeSkills: 'RAG teaches the power of "knowing where to look things up" rather than trying to remember everything. In an information-rich world, the skill of finding and synthesizing relevant information is more valuable than rote memorization.',
      },
      mathModeling: {
        need: 'Understanding the math behind embedding similarity and retrieval helps optimize search quality.',
        motivation: 'Retrieval quality directly determines RAG output quality — garbage in, garbage out applies to retrieved context.',
        realWorldChallenges: ['Large document collections with redundant information', 'Cross-lingual retrieval (query in English, docs in other languages)', 'Dynamic documents that change over time'],
        technicalChallenges: ['Choosing optimal chunk size and overlap', 'Selecting the right embedding model for your domain', 'Balancing retrieval precision vs recall'],
        advantages: ['Grounds LLM responses in verifiable source data', 'Easily updateable — just add new documents', 'Reduces hallucinations by providing relevant context'],
        limitations: ['Retrieval can fail or return irrelevant results', 'Increased latency due to retrieval step', 'Prompt context window limits how many chunks can be included'],
        equations: [
          {
            latex: '\\text{cosine}(q, d) = \\frac{q \\cdot d}{\\|q\\| \\|d\\|} = \\frac{\\sum_{i=1}^{n} q_i d_i}{\\sqrt{\\sum_{i=1}^{n} q_i^2} \\sqrt{\\sum_{i=1}^{n} d_i^2}}',
            symbolExplanations: [
              { symbol: 'q', meaning: 'Query embedding vector' },
              { symbol: 'd', meaning: 'Document chunk embedding vector' },
              { symbol: 'q \\cdot d', meaning: 'Dot product of query and document vectors' },
              { symbol: '\\|q\\|', meaning: 'Magnitude (length) of the query vector' },
              { symbol: '\\|d\\|', meaning: 'Magnitude of the document vector' },
            ],
            meaning: 'Cosine similarity measures the cosine of the angle between two vectors, ranging from -1 (opposite) to 1 (identical).',
            whyNeeded: 'This is the standard similarity metric for embedding-based retrieval, determining which documents are most relevant to a query.',
            interpretation: 'cosine = 1 means the query and document are semantically identical. cosine = 0 means they are unrelated. cosine = -1 means they are semantically opposite.',
            numericalExample: 'q = [1, 2, 3], d = [2, 4, 6]: dot = 28, |q| = 3.74, |d| = 7.48, cosine = 28 / (3.74 x 7.48) = 1.0 (perfectly aligned)',
          },
        ],
        interactiveParams: [
          { name: 'chunkSize', label: 'Chunk Size (tokens)', min: 128, max: 2048, step: 128, default: 512 },
          { name: 'chunkOverlap', label: 'Chunk Overlap (tokens)', min: 0, max: 256, step: 16, default: 64 },
          { name: 'topK', label: 'Top-K Retrieved Chunks', min: 1, max: 20, step: 1, default: 5 },
        ],
      },
      activities: {
        levels: [
          {
            level: 1, title: 'Teacher Demo: RAG Pipeline Walkthrough', description: 'Live demonstration of a complete RAG pipeline from document ingestion to query response',
            objectives: ['See the end-to-end RAG flow', 'Understand each pipeline component'],
            instructions: ['Show document loading process', 'Demonstrate chunking and embedding', 'Execute a test query', 'Inspect retrieved chunks and final response'],
            inputs: ['Sample PDF documents', 'Working RAG pipeline'], expectedOutputs: ['Students see complete RAG flow in action'],
            rubrics: [{ criterion: 'Understanding of pipeline', weight: 50 }, { criterion: 'Questions and engagement', weight: 50 }],
            learningOutcomes: ['Visualize the complete RAG pipeline'], timeRequired: '15 min', materials: ['Projector', 'Working RAG demo'],
          },
          {
            level: 2, title: 'Guided: Document Chunking Exercise', description: 'Students manually chunk a document using different strategies',
            objectives: ['Understand chunking trade-offs', 'Apply different chunking strategies'],
            instructions: ['Take a 2-page document', 'Chunk it using: fixed-size, sentence-based, and recursive strategies', 'Compare token counts and information completeness'],
            inputs: ['Sample document', 'Chunking worksheets'], expectedOutputs: ['Three differently chunked versions of the same document'],
            rubrics: [{ criterion: 'Chunking quality', weight: 50 }, { criterion: 'Analysis of trade-offs', weight: 50 }],
            learningOutcomes: ['Can choose appropriate chunking strategy'], timeRequired: '20 min', materials: ['Printed documents', 'Worksheets'],
          },
          {
            level: 3, title: 'Group: Build a Mini RAG System', description: 'Teams build a complete but simple RAG pipeline',
            objectives: ['Implement RAG pipeline end-to-end', 'Debug common RAG issues'],
            instructions: ['Load provided documents', 'Chunk and embed them', 'Store in ChromaDB', 'Build a query interface', 'Test with 5 questions'],
            inputs: ['Sample documents', 'Colab notebook template'], expectedOutputs: ['Working mini RAG system with query interface'],
            rubrics: [{ criterion: 'Pipeline completion', weight: 40 }, { criterion: 'Answer quality', weight: 30 }, { criterion: 'Code quality', weight: 30 }],
            learningOutcomes: ['Build a RAG pipeline from scratch'], timeRequired: '35 min', materials: ['Colab', 'Sample documents'],
          },
          {
            level: 4, title: 'Individual: RAG Failure Analysis', description: 'Find and document failure modes in a RAG system',
            objectives: ['Identify RAG failure patterns', 'Propose fixes for common issues'],
            instructions: ['Query the RAG system with 10 test questions', 'Identify which ones fail (wrong answer, no answer, hallucination)', 'Analyze the root cause (bad retrieval? wrong chunk? model issue?)', 'Write a report with failure analysis'],
            inputs: ['RAG system', 'Test questions'], expectedOutputs: ['Failure analysis report with root causes and fixes'],
            rubrics: [{ criterion: 'Failure identification', weight: 40 }, { criterion: 'Root cause analysis', weight: 30 }, { criterion: 'Fix proposals', weight: 30 }],
            learningOutcomes: ['Debug and improve RAG systems'], timeRequired: '20 min', materials: ['RAG system access', 'Report template'],
          },
        ],
      },
      project: {
        scope: 'Build a domain-specific RAG chatbot for a knowledge base of your choice', feasibility: 'High — LangChain + ChromaDB run locally',
        riskManagement: [{ risk: 'Poor retrieval quality', probability: 'Medium', impact: 'High', mitigation: 'Test multiple chunk sizes and embedding models' }, { risk: 'Document format issues', probability: 'Low', impact: 'Medium', mitigation: 'Preprocess documents to clean format first' }],
        budget: [{ item: 'Vector DB storage', cost: 0, currency: 'USD' }, { item: 'LLM API or local model', cost: 0, currency: 'USD' }],
        timeline: [{ phase: 'Data Ingestion', start: 'Day 4 AM', end: 'Day 4 AM', milestones: ['Load docs', 'Chunk and embed', 'Store in ChromaDB'] }, { phase: 'RAG Pipeline', start: 'Day 4 AM', end: 'Day 4 PM', milestones: ['Build retriever', 'Create prompt template', 'Implement query interface'] }],
        objectives: ['Load and process domain documents', 'Build vector database with embeddings', 'Create query interface with answer generation'],
        outcomes: ['Working RAG chatbot for chosen domain', 'Documentation of pipeline architecture'], methodology: ['Document loading', 'Chunking and embedding', 'Vector storage', 'Retrieval', 'Generation'],
        teamRoles: [{ role: 'Data Engineer', responsibilities: ['Document processing and chunking'] }, { role: 'Backend Developer', responsibilities: ['RAG pipeline implementation'] }],
        setup: 'Python + LangChain + ChromaDB + Sentence Transformers', userManual: 'Upload documents, wait for indexing, then ask questions about your documents.',
      },
      questions: {
        conceptual: [
          { question: 'Why is chunking one of the most important decisions in a RAG system?', answer: 'Chunk size and strategy determine what information is available for retrieval. Too small = missing context. Too large = diluted relevance with irrelevant information. Poor chunking leads to poor retrieval regardless of embedding quality.', explanation: 'Chunking is the bridge between document structure and retrieval effectiveness. Different document types (code, prose, tables) need different strategies.', discussionPoints: ['How would you chunk a legal contract vs a technical manual?', 'Should chunks overlap? Why?'], commonMistakes: ['Using the same chunking strategy for all document types'], tips: ['Recursive splitter works well for most documents, but consider semantic chunking for complex content'] },
        ],
        numerical: [
          { question: 'A RAG system has 10,000 documents, each chunked into 10 chunks (avg). Each chunk embedding is 384 dimensions (float32). How much memory for the vector index?', answer: '100,000 chunks x 384 dims x 4 bytes = 153,600,000 bytes = ~146.5 MB for the raw vectors plus ~0.8 MB for IDs = ~150 MB total. This fits easily in RAM.', explanation: 'Vector databases are memory-efficient. Even large document collections need relatively small memory for the index.', discussionPoints: ['How does this scale to millions of documents?', 'What optimizations exist for large-scale vector search?'], commonMistakes: ['Underestimating memory for metadata storage alongside vectors'], tips: ['For production, consider disk-based indexes (FAISS IVF) or cloud vector databases for >1M vectors'] },
        ],
        application: [
          { question: 'Design a RAG system for a hospital that needs to answer questions from medical records, research papers, and drug databases.', answer: '1) Separate data sources into different collections with metadata tags (source_type, date, department). 2) Use different chunking for each: small chunks for drug info, larger for research papers. 3) Multi-stage retrieval: first filter by metadata, then semantic search. 4) Add a re-ranker to prioritize authoritative sources (peer-reviewed over blogs). 5) Include citations in the generated response. 6) Add a confidence threshold — if below threshold, defer to human expert.', explanation: 'Medical RAG requires careful handling of source authority, recency, and accuracy. Conflicting information must be surfaced.', discussionPoints: ['How to handle conflicting medical advice from different sources?', 'What regulatory requirements apply?'], commonMistakes: ['Not distinguishing between different quality levels of medical sources'], tips: ['Always rank sources by authority and recency, and cite sources in responses'] },
        ],
        problemSolving: [
          { question: 'Your RAG system retrieves irrelevant chunks for most queries. How do you debug and fix it?', answer: '1) Check embedding quality — test cosine similarity on known related/unrelated pairs. 2) Verify chunking — are chunks too large or too small? 3) Inspect metadata filters — are they accidentally excluding relevant docs? 4) Check query preprocessing — is the query itself well-formed? 5) Test with a simple query to isolate the issue. 6) Consider a different embedding model fine-tuned for your domain.', explanation: 'RAG debugging follows a systematic pipeline: input → embedding → retrieval → augmentation → generation. Test each stage independently.', discussionPoints: ['What tools can help visualize retrieval quality?', 'How to create a test set for retrieval evaluation?'], commonMistakes: ['Tweaking the prompt when the real issue is poor retrieval'], tips: ['Build a simple retrieval-only test first. If retrieval is bad, no amount of prompt engineering can fix the RAG output'] },
        ],
      },
      virtualLab: {
        title: 'RAG Pipeline Simulator', description: 'Interactive step-through of the complete RAG pipeline from document to answer',
        steps: [
          { name: 'Document Loading', description: 'Load documents from various sources (PDF, web, database)', animation: 'Documents appear in the processing queue' },
          { name: 'Chunking', description: 'Split documents into manageable chunks', animation: 'Documents split into color-coded chunks' },
          { name: 'Embedding', description: 'Convert each chunk to a vector embedding', animation: 'Chunks transform into vector arrows' },
          { name: 'Vector Storage', description: 'Store embeddings in vector database with index', animation: 'Vectors arrange in a clustered index' },
          { name: 'Retrieval & Generation', description: 'Query retrieves relevant chunks, LLM generates answer', animation: 'Query vector finds nearest neighbors, context feeds into LLM' },
        ],
        parameters: [
          { name: 'chunkSize', label: 'Chunk Size', type: 'slider', min: 128, max: 2048, step: 128, default: 512 },
          { name: 'topK', label: 'Top-K Retrieved', type: 'slider', min: 1, max: 10, step: 1, default: 3 },
          { name: 'embeddingModel', label: 'Embedding Model', type: 'select', default: 'all-MiniLM-L6-v2', options: ['all-MiniLM-L6-v2', 'BGE-small', 'text-embedding-3-small'] },
        ],
        controls: { reset: true, playPause: true, speed: true, compare: false },
      },
      insights: {
        keyInsights: ['RAG grounds LLM responses in verifiable source data, dramatically reducing hallucinations', 'Chunking strategy is the single most impactful design decision in RAG', 'Vector databases enable efficient semantic search at scale'],
        advantages: ['Grounded in actual data with source attribution', 'Easily updateable without retraining', 'Works with any knowledge domain'],
        disadvantages: ['Retrieval failures propagate to generation', 'Increased latency and infrastructure complexity', 'Limited by the model\'s context window size'],
        improvements: ['Hybrid search (semantic + keyword) for better recall', 'Re-ranking for improved precision', 'Query transformation for better retrieval'],
        futureScope: ['Agentic RAG with multi-step reasoning', 'Multi-modal RAG (text + images + tables)', 'Self-improving RAG that learns from user feedback'],
        industrialApplications: ['Enterprise knowledge management', 'Customer support with product documentation', 'Legal research assistants', 'Medical diagnosis support systems', 'Technical documentation Q&A'],
        researchOpportunities: ['Optimal chunking through reinforcement learning', 'Query understanding for improved retrieval', 'Cross-lingual and multi-lingual RAG', 'Evaluation metrics for RAG quality'],
        careerRelevance: 'RAG is the most commonly deployed architecture for enterprise AI applications. Expertise in building and optimizing RAG systems is one of the highest-demand skills in applied AI.',
      },
    },
  ],
};

export default day4Module;
