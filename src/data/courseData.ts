import type { Course } from '../types';

const courseData: Course = {
  title: 'Large Language Models & Small Language Models',
  subtitle: 'From Foundations to Production-Ready AI Assistants',
  audience: '3rd Year B. Tech Students',
  prerequisites: [
    'Python Programming (Functions, OOP, Exception Handling, File Handling)',
    'NumPy, Pandas, Matplotlib',
    'Regression, Classification, Evaluation Metrics',
    'Artificial Neural Networks',
    'Linear Algebra (Vectors), Matrix Multiplication, Probability, Cosine Similarity',
    'Windows/Linux Terminal Commands',
    'Git & GitHub Basics',
    'SQL Fundamentals',
    'REST API Basics',
    'Tokens, Vocabulary, Corpus',
  ],
  overallObjectives: [
    'Explain the complete architecture and workflow of LLMs and SLMs, including tokenization, embeddings, transformers, attention mechanisms, and text generation.',
    'Execute and optimize open-source SLMs locally and in cloud environments using modern inference frameworks.',
    'Apply advanced prompt engineering techniques to improve response quality, reasoning, and task-specific performance.',
    'Prepare domain-specific datasets and fine-tune SLMs using PEFT techniques such as LoRA and QLoRA.',
    'Design, implement, and optimize RAG systems by integrating document preprocessing, embedding generation, vector databases, retrieval strategies, and prompt orchestration.',
    'Enhance RAG performance using advanced retrieval techniques, HITL feedback, hallucination mitigation, and evaluation frameworks such as RAGAS and LangSmith.',
    'Develop RESTful APIs and deploy complete AI-powered applications using FastAPI, Streamlit, Docker, and cloud platforms.',
    'Collaborate effectively in teams to build, evaluate, and present an end-to-end, production-ready, domain-specific AI assistant.',
  ],
  modules: [
    {
      id: 'day1',
      day: 1,
      title: 'Foundations of Generative AI & Small Language Models',
      subtitle: 'Understanding how Generative AI and Language Models work from first principles',
      objectives: [
        'Understand evolution of AI to Generative AI',
        'Comprehend LLM vs SLM differences',
        'Master tokenization and embeddings',
        'Understand transformer architecture and self-attention',
        'Execute first open-source SLM',
      ],
      tools: ['Python', 'VS Code', 'Google Colab', 'Hugging Face Transformers', 'Sentence Transformers'],
      skills: ['Understanding of internal LLM architecture', 'Inference pipeline execution'],
      deliverable: 'Working Local AI Chatbot using TinyLlama/Phi-3/Gemma',
      topics: [
        {
          id: 'day1-evolution',
          title: 'Evolution of AI to Generative AI',
          description: 'Understand the journey from symbolic AI to modern generative models',
          duration: '45 min',
          prerequisites: ['Basic understanding of Artificial Intelligence', 'Machine Learning fundamentals'],
          dependentTopics: ['Transformer Architecture', 'LLM vs SLM'],
          nextTopicPrep: 'Read about the limitations of discriminative models',
          story: {
            analogy: 'The Library of Alexandria 2.0',
            narrative: `Imagine you're in the world's largest library. In the old days (Symbolic AI), you had a strict librarian who only gave you books if you followed exact rules: "Book must be red, on shelf 3, written after 1990." If you said "reddish" instead of "red," the librarian would ignore you.

Then came Machine Learning librarians who learned from examples. Show them 1000 red books and 1000 blue books, and they could sort new books by color. But they couldn't describe what a book was about.

Deep Learning librarians could read entire books and understand patterns. They could tell you "this book has similar writing style to Shakespeare."

Now, Generative AI librarians don't just sort books — they can WRITE new books! They've read millions of books and can create original content that feels like it was written by a human. They can summarize, translate, write poetry, and even generate code.

But here's the funny part: these librarians have NEVER actually read a book. They just got really, really good at predicting which word comes next. It's like someone who's watched so many cooking shows they can write recipes without ever tasting food!`,
            reflectiveQuestions: [
              'What is the fundamental difference between sorting books and writing new books?',
              'Can a system that only predicts the next word truly understand language?',
              'Why do you think we moved from rule-based to learning-based approaches?',
            ],
            connection: 'Just like our library evolved from strict rule-following to creative generation, AI evolved from Symbolic AI → Machine Learning → Deep Learning → Generative AI. The key breakthrough? Scale. More data, bigger models, more computation.',
            technicalExplanation: [
              'Generative AI models learn the underlying probability distribution of training data',
              'Unlike discriminative models that learn decision boundaries, generative models learn to produce new samples',
              'Autoregressive language models predict next token given previous tokens: P(x_t | x_1, ..., x_{t-1})',
              'The "attention is all you need" breakthrough enabled parallel processing of sequences',
              'Scaling laws show predictable improvement in model capabilities with increased parameters and data',
            ],
            lifeSkills: 'This evolution teaches us that progress comes from rethinking fundamental assumptions. The shift from rule-based to learning-based systems mirrors how expertise develops in humans — from following strict procedures to developing intuitive understanding.',
          },
          mathModeling: {
            need: 'Understanding the mathematical foundation of language modeling is essential for grasping how generative AI works under the hood.',
            motivation: 'Language models are fundamentally probability distributions over sequences of tokens. Mastering this math enables you to understand model capabilities, limitations, and failure modes.',
            realWorldChallenges: [
              'Language is discrete and combinatorial — there are infinitely many possible sentences',
              'Context matters enormously — the same word can have different meanings',
              'Long-range dependencies require maintaining information over hundreds of tokens',
            ],
            technicalChallenges: [
              'Computational cost grows quadratically with sequence length in standard attention',
              'Vanishing gradients in very deep networks',
              'Catastrophic forgetting during training',
            ],
            advantages: [
              'Can generate novel, coherent text across diverse domains',
              'Learns implicit linguistic rules without explicit programming',
              'Scales with data and compute',
            ],
            limitations: [
              'Statistically plausible but factually unreliable outputs',
              'No true understanding or consciousness',
              'Computationally expensive to train and deploy',
            ],
            equations: [
              {
                latex: 'P(w_1, w_2, ..., w_n) = \\prod_{i=1}^{n} P(w_i | w_1, ..., w_{i-1})',
                symbolExplanations: [
                  { symbol: 'P', meaning: 'Probability of the sequence' },
                  { symbol: 'w_i', meaning: 'The i-th word/token in the sequence' },
                  { symbol: 'n', meaning: 'Total length of the sequence' },
                  { symbol: '\\prod', meaning: 'Product over all tokens from 1 to n' },
                  { symbol: 'P(w_i | w_1, ..., w_{i-1})', meaning: 'Conditional probability of w_i given all previous words' },
                ],
                meaning: 'This is the chain rule of probability applied to language. The probability of a sentence is the product of probabilities of each word given all previous words.',
                whyNeeded: 'This equation is the mathematical foundation of all autoregressive language models including GPT, LLaMA, and Gemma.',
                interpretation: 'Language modeling is sequential: at each step, the model predicts the next word given all words so far. Multiply all these conditional probabilities to get the sentence probability.',
                numericalExample: 'For "I love AI": P(I) × P(love|I) × P(AI|I, love) = 0.1 × 0.05 × 0.02 = 0.0001',
              },
              {
                latex: 'H(P, Q) = -\\sum_{x} P(x) \\log Q(x)',
                symbolExplanations: [
                  { symbol: 'H(P, Q)', meaning: 'Cross-entropy between true distribution P and predicted distribution Q' },
                  { symbol: 'P(x)', meaning: 'True probability of token x' },
                  { symbol: 'Q(x)', meaning: 'Predicted probability of token x' },
                  { symbol: '\\sum_{x}', meaning: 'Sum over all possible tokens' },
                  { symbol: '\\log', meaning: 'Natural logarithm' },
                ],
                meaning: 'Cross-entropy measures how different two probability distributions are. Lower cross-entropy means the model predictions are closer to the true distribution.',
                whyNeeded: 'Cross-entropy is the standard loss function for training language models. Minimizing it directly improves next-token prediction accuracy.',
                interpretation: 'When Q(x) = P(x) (perfect prediction), cross-entropy equals the entropy of P. Any difference increases cross-entropy.',
                numericalExample: 'If true P("cat")=0.7, P("dog")=0.3 and model Q("cat")=0.6, Q("dog")=0.4: H = -(0.7×log(0.6) + 0.3×log(0.4)) = -(0.7×(-0.51) + 0.3×(-0.92)) = 0.63',
              },
            ],
            interactiveParams: [
              { name: 'sequenceLength', label: 'Sequence Length', min: 1, max: 100, step: 1, default: 10 },
              { name: 'vocabularySize', label: 'Vocabulary Size', min: 1000, max: 100000, step: 1000, default: 50000 },
              { name: 'contextWindow', label: 'Context Window', min: 128, max: 8192, step: 128, default: 2048 },
            ],
          },
          activities: {
            levels: [
              {
                level: 1,
                title: 'Teacher Demonstration: AI Evolution Timeline',
                description: 'Instructor presents the evolution of AI with visual timeline',
                objectives: ['Understand the historical progression of AI', 'Identify key breakthroughs in each era'],
                instructions: [
                  'Display the AI evolution timeline on projector',
                  'Explain each era with concrete examples',
                  'Show how each breakthrough enabled the next',
                  'Demonstrate a symbolic AI system vs ML vs DL vs GenAI',
                ],
                inputs: ['AI Evolution Timeline chart', 'Example outputs from each AI era'],
                expectedOutputs: ['Students can identify which era a given AI system belongs to'],
                rubrics: [
                  { criterion: 'Understanding of AI eras', weight: 40 },
                  { criterion: 'Ability to classify AI systems', weight: 30 },
                  { criterion: 'Engagement in discussion', weight: 30 },
                ],
                learningOutcomes: ['Students can trace AI evolution from symbolic to generative'],
                timeRequired: '15 min',
                materials: ['Projector', 'Timeline chart', 'Example AI outputs'],
              },
              {
                level: 2,
                title: 'Guided Exploration: AI System Classification',
                description: 'Students work with instructor to classify AI systems',
                objectives: ['Apply knowledge to classify real AI systems', 'Understand discriminative vs generative distinction'],
                instructions: [
                  'Show 10 different AI systems',
                  'Ask students to classify each as Symbolic/ML/DL/GenAI',
                  'Discuss borderline cases',
                  'Explain why ChatGPT is generative but a spam filter is discriminative',
                ],
                inputs: ['List of 10 AI systems with descriptions'],
                expectedOutputs: ['Correct classification of AI systems with justification'],
                rubrics: [
                  { criterion: 'Classification accuracy', weight: 50 },
                  { criterion: 'Quality of justification', weight: 50 },
                ],
                learningOutcomes: ['Can distinguish between discriminative and generative models'],
                timeRequired: '15 min',
                materials: ['Printed or projected list of AI systems'],
              },
              {
                level: 3,
                title: 'Group Activity: Build Your AI Evolution Timeline',
                description: 'Student groups create detailed AI evolution posters',
                objectives: ['Synthesize knowledge into a coherent timeline', 'Identify cause-effect relationships in AI progress'],
                instructions: [
                  'Divide class into 6 groups of 10',
                  'Assign each group one era of AI evolution',
                  'Groups research and create timeline with key innovations',
                  'Present to class',
                  'Class votes on best timeline',
                ],
                inputs: ['Research links', 'Poster materials or digital canvas'],
                expectedOutputs: ['Detailed timeline poster with key innovations, dates, and impact'],
                rubrics: [
                  { criterion: 'Accuracy of timeline', weight: 30 },
                  { criterion: 'Creativity in presentation', weight: 25 },
                  { criterion: 'Depth of research', weight: 25 },
                  { criterion: 'Team collaboration', weight: 20 },
                ],
                learningOutcomes: ['Can explain how each AI era enabled the next', 'Team collaboration skills'],
                timeRequired: '30 min',
                materials: ['Poster paper', 'Markers', 'Reference materials or laptops'],
              },
              {
                level: 4,
                title: 'Individual Reflection: AI and Your Life',
                description: 'Students write a reflective essay on how generative AI impacts their field',
                objectives: ['Connect AI evolution to personal relevance', 'Develop critical perspective on AI'],
                instructions: [
                  'Write a 500-word essay on how generative AI will impact your engineering field',
                  'Include at least 3 specific applications',
                  'Discuss ethical considerations',
                  'Share with peer for feedback',
                ],
                inputs: ['Writing prompt', 'Example essays'],
                expectedOutputs: ['Well-structured reflective essay on AI impact'],
                rubrics: [
                  { criterion: 'Critical thinking depth', weight: 35 },
                  { criterion: 'Technical accuracy', weight: 35 },
                  { criterion: 'Writing quality', weight: 30 },
                ],
                learningOutcomes: ['Can articulate personal and professional relevance of generative AI'],
                timeRequired: '20 min',
                materials: ['Notebook or laptop', 'Writing prompt'],
              },
            ],
          },
          project: {
            scope: 'Create an interactive AI Evolution Timeline Web Application',
            feasibility: 'High — uses HTML/CSS/JavaScript with data visualization libraries',
            riskManagement: [
              { risk: 'Timeline data may be incomplete', probability: 'Low', impact: 'Medium', mitigation: 'Use peer-reviewed sources and cross-reference multiple references' },
              { risk: 'Visual complexity may overwhelm', probability: 'Medium', impact: 'Low', mitigation: 'Start with simple timeline, add interactivity incrementally' },
            ],
            budget: [
              { item: 'Developer Time', cost: 0, currency: 'USD' },
              { item: 'Hosting', cost: 0, currency: 'USD' },
              { item: 'Libraries', cost: 0, currency: 'USD' },
            ],
            timeline: [
              { phase: 'Research', start: 'Day 1 AM', end: 'Day 1 PM', milestones: ['Gather timeline data', 'Identify key milestones'] },
              { phase: 'Development', start: 'Day 1 PM', end: 'Day 2 AM', milestones: ['Build HTML structure', 'Add CSS styling', 'Implement JavaScript interactivity'] },
            ],
            objectives: ['Create visually engaging timeline', 'Include interactive elements', 'Make responsive for all devices'],
            outcomes: ['Working interactive timeline', 'Better understanding of AI history'],
            methodology: ['Research → Design → Implement → Test → Deploy'],
            teamRoles: [
              { role: 'Researcher', responsibilities: ['Gather historical data', 'Verify accuracy'] },
              { role: 'Developer', responsibilities: ['Implement timeline', 'Add interactions'] },
              { role: 'Designer', responsibilities: ['Visual design', 'Responsive layout'] },
            ],
            setup: 'VS Code with live server or any static hosting',
            userManual: 'Open index.html in browser. Scroll through timeline. Click on milestones for details.',
          },
          questions: {
            conceptual: [
              {
                question: 'What is the key architectural difference between discriminative and generative models?',
                answer: 'Discriminative models learn decision boundaries between classes (P(y|x)), while generative models learn the joint probability distribution (P(x,y)) and can generate new data samples.',
                explanation: 'Discriminative models focus on "what separates classes" while generative models learn "what each class looks like." This is why generative models can create new content.',
                discussionPoints: ['Why would you choose one over the other?', 'Can a discriminative model be converted to generative?'],
                commonMistakes: ['Confusing generative with "generating anything" — generative models generate data similar to training data'],
                tips: ['Remember: discriminative = decision boundary, generative = data distribution'],
              },
              {
                question: 'How did the scaling of transformers enable the emergence of generative capabilities?',
                answer: 'As transformer models scaled (more parameters, more data, more compute), they exhibited emergent abilities not present in smaller models — including in-context learning, reasoning, and coherent text generation.',
                explanation: 'Scaling laws show that model performance improves predictably with scale, but certain capabilities only appear after crossing size thresholds.',
                discussionPoints: ['Are there limits to scaling?', 'What alternatives exist to scaling?'],
                commonMistakes: ['Assuming bigger is always better — inference cost and latency matter'],
                tips: ['Think of scaling as "phase transitions" — new abilities emerge at certain thresholds'],
              },
            ],
            numerical: [
              {
                question: 'A language model has vocabulary size V=50,000 and context window C=2048. How many parameters are in the embedding layer?',
                answer: 'Embedding parameters = V × d_model. If d_model = 4096, then 50,000 × 4,096 = 204,800,000 parameters.',
                explanation: 'The embedding layer maps each token to a dense vector representation. Each token has its own embedding vector.',
                discussionPoints: ['Why not share embeddings between similar tokens?', 'How does embedding size affect model quality?'],
                commonMistakes: ['Forgetting the embedding dimension', 'Confusing embedding layer with output layer'],
                tips: ['Embedding parameters = vocab_size × embedding_dim — always'],
              },
            ],
            application: [
              {
                question: 'You need to build a chatbot for legal document assistance. Would you use a generative model or a discriminative model? Why?',
                answer: 'A generative model (LLM) would be more appropriate because it can understand context, generate human-like responses, summarize documents, and answer diverse questions about legal content.',
                explanation: 'Legal assistance requires understanding complex language, generating coherent responses, and handling varied queries — all strengths of generative models.',
                discussionPoints: ['What risks exist with using generative AI for legal advice?', 'How would you ensure factual accuracy?'],
                commonMistakes: ['Assuming generative models are always correct — they can hallucinate legal facts'],
                tips: ['Always include human oversight for high-stakes applications like legal or medical'],
              },
            ],
            problemSolving: [
              {
                question: 'A company wants to automate customer support. They have 10,000 support tickets with solutions. Design a system using both discriminative and generative components.',
                answer: 'Use a discriminative classifier to route tickets to categories (billing, technical, account), then use a generative model to draft responses. Use retrieval to find similar resolved tickets for context.',
                explanation: 'Combining both approaches leverages strengths: fast classification + nuanced generation.',
                discussionPoints: ['How would you handle edge cases?', 'What if no similar ticket exists?'],
                commonMistakes: ['Using only generative — expensive and slow for simple routing'],
                tips: ['Hybrid systems often outperform pure approaches in production'],
              },
            ],
          },
          virtualLab: {
            title: 'Generative AI Explorer Lab',
            description: 'Interactive simulation showing how a generative model creates text token by token',
            steps: [
              { name: 'Input Encoding', description: 'Convert input text to token IDs', animation: 'Tokens are mapped through embedding lookup' },
              { name: 'Forward Pass', description: 'Tokens pass through transformer layers', animation: 'Each layer applies self-attention and feed-forward' },
              { name: 'Next Token Prediction', description: 'Model outputs probability distribution over vocabulary', animation: 'Softmax converts logits to probabilities' },
              { name: 'Token Sampling', description: 'Sample next token from probability distribution', animation: 'Temperature-adjusted sampling selects next token' },
              { name: 'Iteration', description: 'Append predicted token and repeat', animation: 'Autoregressive generation continues until stopping condition' },
            ],
            parameters: [
              { name: 'temperature', label: 'Temperature', type: 'slider', min: 0, max: 2, step: 0.1, default: 0.7 },
              { name: 'topK', label: 'Top-K', type: 'slider', min: 1, max: 100, step: 1, default: 40 },
              { name: 'topP', label: 'Top-P (Nucleus)', type: 'slider', min: 0, max: 1, step: 0.05, default: 0.9 },
              { name: 'maxTokens', label: 'Max Tokens', type: 'slider', min: 1, max: 200, step: 1, default: 50 },
            ],
            controls: { reset: true, playPause: true, speed: true, compare: false },
          },
          insights: {
            keyInsights: [
              'Generative AI represents a paradigm shift from pattern recognition to pattern generation',
              'The evolution of AI was driven by three factors: data, compute, and algorithmic innovations',
              'Scale leads to emergence — capabilities appear at certain model sizes that weren\'t explicitly programmed',
            ],
            advantages: [
              'Can create novel content across multiple modalities',
              'Learns implicit patterns without explicit feature engineering',
              'Transfers knowledge across tasks through pre-training',
            ],
            disadvantages: [
              'Statistically plausible but factually unreliable',
              'Requires enormous computational resources',
              'Can amplify biases present in training data',
            ],
            improvements: [
              'Better factual accuracy through retrieval augmentation',
              'More efficient architectures (Mixture of Experts)',
              'Improved alignment with human values',
            ],
            futureScope: [
              'Multimodal models that understand text, images, audio, and video',
              'Agentic AI systems that can take actions',
              'On-device models for privacy-preserving AI',
            ],
            industrialApplications: [
              'Automated content creation and summarization',
              'Code generation and software development assistance',
              'Customer service automation',
              'Scientific research and drug discovery',
              'Education and personalized tutoring',
            ],
            researchOpportunities: [
              'Improving factual accuracy and reducing hallucinations',
              'Developing more efficient architectures',
              'Understanding emergent abilities',
              'Creating robust evaluation benchmarks',
            ],
            careerRelevance: 'Generative AI is transforming every industry. Engineers who understand these models — their capabilities, limitations, and implementation — are in extremely high demand. Skills in deploying, fine-tuning, and building applications with LLMs are among the most valuable in today\'s job market.',
          },
        },
      ],
    },
  ],
};

export default courseData;

export const dailySchedule = [
  { time: '09:30 – 10:30', activity: 'Conceptual Learning & Interactive Discussion' },
  { time: '10:30 – 11:30', activity: 'Live Coding Demonstration' },
  { time: '11:30 – 11:45', activity: 'Tea Break' },
  { time: '11:45 – 01:00', activity: 'Guided Hands-on Laboratory' },
  { time: '01:00 – 02:00', activity: 'Lunch Break' },
  { time: '02:00 – 03:30', activity: 'Project Development & Team Activities' },
  { time: '03:30 – 04:15', activity: 'Code Review, Debugging & Mentoring' },
  { time: '04:15 – 04:30', activity: 'Quiz, Reflection & Daily Deliverable Submission' },
];

export const miniProjects = [
  { day: 1, project: 'Local AI Chatbot using Open-source SLM', skills: 'Model Inference, Prompting, Hugging Face' },
  { day: 2, project: 'Intelligent Prompt Engineering Playground', skills: 'Prompt Optimization, Model Benchmarking' },
  { day: 3, project: 'Fine-tuned Domain-Specific Chatbot', skills: 'Dataset Preparation, LoRA Fine-tuning' },
  { day: 4, project: 'Enterprise Knowledge Assistant using RAG', skills: 'Vector Search, Retrieval-Augmented Generation' },
  { day: 5, project: 'Human-in-the-Loop RAG Assistant', skills: 'Evaluation, Feedback Integration, Hallucination Reduction' },
  { day: 6, project: 'Fully Deployable AI Assistant', skills: 'Deployment, API Development, Cloud Hosting' },
];
