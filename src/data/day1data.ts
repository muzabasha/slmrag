import type { Module } from '../types';

const day1Module: Module = {
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
      description: 'Understand the journey from symbolic AI to modern generative models that can create text, images, and code',
      duration: '45 min',
      prerequisites: ['Basic understanding of Artificial Intelligence', 'Machine Learning fundamentals'],
      dependentTopics: ['LLM vs SLM', 'Transformer Architecture'],
      nextTopicPrep: 'Review the differences between discriminative and generative models',
      story: {
        analogy: 'The Library of Alexandria 2.0',
        narrative: `Imagine you're in the world's largest library. In the old days (Symbolic AI), you had a strict librarian who only gave you books if you followed exact rules: "Book must be red, on shelf 3, written after 1990." Say "reddish" instead of "red," and they'd ignore you completely.

Then came Machine Learning librarians who learned from examples. Show them 1000 red books and 1000 blue books, and they could sort new books by color. But they couldn't describe what a book was actually about.

Deep Learning librarians could read entire books and understand patterns. They could tell you "this book has similar writing style to Shakespeare" or "this is a tragedy."

Now, Generative AI librarians don't just sort books — they can WRITE new books! They've read millions of books and can create original content that feels like it was written by a human. They can summarize, translate, write poetry, and even generate code.

The funny part? These librarians have NEVER actually read a book. They just got really, really good at predicting which word comes next. It's like someone who's watched so many cooking shows they can write gourmet recipes without ever tasting food!`,
        reflectiveQuestions: [
          'What is the fundamental difference between sorting books and writing new books?',
          'Can a system that only predicts the next word truly understand language?',
          'Why did we move from rule-based to learning-based approaches in AI?',
        ],
        connection: 'Just like our library evolved from strict rule-following to creative generation, AI evolved from Symbolic AI to Machine Learning to Deep Learning to Generative AI. The key breakthrough? Scale. More data, bigger models, more computation.',
        technicalExplanation: [
          'Generative AI models learn the underlying probability distribution of training data',
          'Unlike discriminative models (P(y|x)), generative models learn the joint distribution P(x,y) to produce new samples',
          'Autoregressive language models predict next token given previous tokens: P(x_t | x_1, ..., x_{t-1})',
          'The "Attention Is All You Need" breakthrough enabled parallel processing of sequences',
          'Scaling laws show predictable improvement in model capabilities with increased parameters and data',
        ],
        lifeSkills: 'This evolution teaches us that progress comes from rethinking fundamental assumptions. The shift from rule-based to learning-based systems mirrors how expertise develops in humans — from following strict procedures to developing intuitive understanding.',
      },
      mathModeling: {
        need: 'Understanding the mathematical foundation of language modeling is essential for grasping how generative AI works under the hood.',
        motivation: 'Language models are fundamentally probability distributions over sequences of tokens. Mastering this math enables you to understand model capabilities, limitations, and failure modes.',
        realWorldChallenges: [
          'Language is discrete and combinatorial — there are infinitely many possible sentences',
          'Context matters enormously — the same word can have different meanings in different contexts',
          'Long-range dependencies require maintaining information over hundreds of tokens',
        ],
        technicalChallenges: [
          'Computational cost grows quadratically with sequence length in standard attention',
          'Vanishing gradients in very deep networks',
          'Catastrophic forgetting during training when learning new tasks',
        ],
        advantages: [
          'Can generate novel, coherent text across diverse domains',
          'Learns implicit linguistic rules without explicit programming',
          'Scales with data and compute, showing predictable improvement',
        ],
        limitations: [
          'Statistically plausible but factually unreliable outputs (hallucination)',
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
            whyNeeded: 'This is the mathematical foundation of all autoregressive language models including GPT, LLaMA, and Gemma.',
            interpretation: 'Language modeling is sequential: at each step, the model predicts the next word given all words so far. Multiply all these conditional probabilities to get the sentence probability.',
            numericalExample: 'For "I love AI": P(I) x P(love|I) x P(AI|I, love) = 0.1 x 0.05 x 0.02 = 0.0001',
          },
          {
            latex: 'H(P, Q) = -\\sum_{x} P(x) \\log Q(x)',
            symbolExplanations: [
              { symbol: 'H(P, Q)', meaning: 'Cross-entropy between true distribution P and predicted distribution Q' },
              { symbol: 'P(x)', meaning: 'True probability of token x' },
              { symbol: 'Q(x)', meaning: 'Predicted probability of token x' },
              { symbol: '\\sum_{x}', meaning: 'Sum over all possible tokens in vocabulary' },
            ],
            meaning: 'Cross-entropy measures how different two probability distributions are. Lower cross-entropy means the model predictions are closer to the true distribution.',
            whyNeeded: 'Cross-entropy is the standard loss function for training language models. Minimizing it directly improves next-token prediction accuracy.',
            interpretation: 'When Q(x) = P(x) (perfect prediction), cross-entropy equals the entropy of P. Any difference increases cross-entropy.',
            numericalExample: 'If true P("cat")=0.7, P("dog")=0.3 and model Q("cat")=0.6, Q("dog")=0.4: H = -(0.7xlog0.6 + 0.3xlog0.4) = 0.63',
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
            level: 1, title: 'Teacher Demonstration: AI Evolution Timeline',
            description: 'Instructor presents the evolution of AI with a visual timeline showing key breakthroughs',
            objectives: ['Understand the historical progression of AI', 'Identify key breakthroughs in each era'],
            instructions: ['Display the AI evolution timeline on the projector', 'Explain each era with concrete examples', 'Show how each breakthrough enabled the next', 'Compare outputs from different AI paradigms'],
            inputs: ['AI Evolution Timeline chart', 'Example outputs from each AI era (ELIZA, SVM, CNN, GPT)'],
            expectedOutputs: ['Students can correctly identify which era a given AI system belongs to'],
            rubrics: [{ criterion: 'Understanding of AI eras', weight: 40 }, { criterion: 'Ability to classify AI systems', weight: 30 }, { criterion: 'Engagement in discussion', weight: 30 }],
            learningOutcomes: ['Students can trace AI evolution from symbolic to generative'],
            timeRequired: '15 min', materials: ['Projector', 'Timeline chart', 'Example AI outputs slide deck'],
          },
          {
            level: 2, title: 'Guided Exploration: AI System Classification',
            description: 'Students work with the instructor to classify real-world AI systems into their respective eras',
            objectives: ['Apply knowledge to classify real AI systems', 'Understand the discriminative vs generative distinction'],
            instructions: ['Show 10 different AI systems with descriptions', 'Ask students to classify each as Symbolic/ML/DL/GenAI', 'Discuss borderline cases', 'Explain why ChatGPT is generative but a spam filter is discriminative'],
            inputs: ['List of 10 AI systems with brief descriptions', 'Classification worksheet'],
            expectedOutputs: ['Correct classification of each AI system with written justification'],
            rubrics: [{ criterion: 'Classification accuracy', weight: 50 }, { criterion: 'Quality of justification', weight: 50 }],
            learningOutcomes: ['Can distinguish between discriminative and generative models'],
            timeRequired: '15 min', materials: ['Printed list of AI systems', 'Classification answer key'],
          },
          {
            level: 3, title: 'Group Activity: Build Your AI Evolution Timeline',
            description: 'Student groups create detailed AI evolution posters and present to the class',
            objectives: ['Synthesize knowledge into a coherent timeline', 'Identify cause-effect relationships in AI progress'],
            instructions: ['Divide class into 6 groups of 10 students', 'Assign each group one era of AI evolution', 'Groups research and create timeline with key innovations', 'Present findings to the class', 'Class votes on most comprehensive timeline'],
            inputs: ['Research links and QR codes', 'Poster materials or digital canvas tool'],
            expectedOutputs: ['Detailed timeline poster with key innovations, dates, and impact analysis'],
            rubrics: [{ criterion: 'Accuracy of timeline', weight: 30 }, { criterion: 'Creativity in presentation', weight: 25 }, { criterion: 'Depth of research', weight: 25 }, { criterion: 'Team collaboration', weight: 20 }],
            learningOutcomes: ['Can explain how each AI era enabled the next', 'Team collaboration and presentation skills'],
            timeRequired: '30 min', materials: ['Poster paper', 'Markers', 'Reference materials or laptops with internet'],
          },
          {
            level: 4, title: 'Individual Reflection: AI and Your Future',
            description: 'Students write a reflective essay on how generative AI impacts their engineering field',
            objectives: ['Connect AI evolution to personal and professional relevance', 'Develop critical perspective on AI technology'],
            instructions: ['Write a 500-word essay on how generative AI will impact your engineering field', 'Include at least 3 specific applications relevant to your domain', 'Discuss at least one ethical consideration', 'Share draft with a peer for feedback before final submission'],
            inputs: ['Writing prompt with guiding questions', 'Example well-written essays for reference'],
            expectedOutputs: ['Well-structured reflective essay demonstrating critical thinking'],
            rubrics: [{ criterion: 'Critical thinking depth', weight: 35 }, { criterion: 'Technical accuracy', weight: 35 }, { criterion: 'Writing quality and structure', weight: 30 }],
            learningOutcomes: ['Can articulate personal and professional relevance of generative AI'],
            timeRequired: '20 min', materials: ['Notebook or laptop', 'Writing prompt handout'],
          },
        ],
      },
      project: {
        scope: 'Create an interactive AI Evolution Timeline Web Application',
        feasibility: 'High — uses HTML/CSS/JavaScript with a data visualization library like Chart.js',
        riskManagement: [
          { risk: 'Timeline data may be incomplete', probability: 'Low', impact: 'Medium', mitigation: 'Use peer-reviewed sources and cross-reference at least 3 references' },
          { risk: 'Visual complexity may overwhelm beginners', probability: 'Medium', impact: 'Low', mitigation: 'Start with a simple linear timeline, then add interactivity incrementally' },
        ],
        budget: [
          { item: 'Developer Time (student effort)', cost: 0, currency: 'USD' },
          { item: 'Web Hosting (GitHub Pages)', cost: 0, currency: 'USD' },
        ],
        timeline: [
          { phase: 'Research & Design', start: 'Day 1 AM', end: 'Day 1 PM', milestones: ['Gather timeline data from 3+ sources', 'Identify 15+ key milestones', 'Design visual layout'] },
          { phase: 'Development & Testing', start: 'Day 1 PM', end: 'Day 2 AM', milestones: ['Build HTML structure', 'Apply CSS styling', 'Implement JavaScript interactivity', 'Test on multiple screen sizes'] },
        ],
        objectives: ['Create a visually engaging historical timeline', 'Include interactive clickable elements', 'Make fully responsive for all device sizes'],
        outcomes: ['Working interactive timeline webpage', 'Deeper understanding of AI history and progression'],
        methodology: ['Research primary sources', 'Design wireframe', 'Implement with HTML/CSS/JS', 'Test and deploy'],
        teamRoles: [
          { role: 'Research Lead', responsibilities: ['Gather historical data and verify accuracy', 'Write descriptions for each milestone'] },
          { role: 'Frontend Developer', responsibilities: ['Implement the timeline layout', 'Add interactivity and animations'] },
        ],
        setup: 'VS Code with live server extension or any static hosting service (GitHub Pages, Netlify)',
        userManual: 'Open index.html in any modern browser. Scroll through the timeline horizontally. Click on any milestone card for a detailed popup with description and image.',
      },
      questions: {
        conceptual: [
          {
            question: 'What is the key architectural difference between discriminative and generative models?',
            answer: 'Discriminative models learn decision boundaries between classes (model P(y|x)), while generative models learn the joint probability distribution (P(x,y)) and can generate new data samples from the learned distribution.',
            explanation: 'Discriminative models focus on "what separates classes" while generative models learn "what each class looks like internally." This is why generative models can create new content while discriminative models can only classify.',
            discussionPoints: ['In what scenarios would you prefer a generative model over a discriminative model?', 'Can a discriminative model be converted to a generative model?'],
            commonMistakes: ['Confusing generative with "generating anything" — generative models only generate data similar to their training distribution'],
            tips: ['Remember: discriminative = decision boundary between classes, generative = data distribution of each class'],
          },
          {
            question: 'How did scaling of transformer models enable the emergence of generative capabilities?',
            answer: 'As transformer models scaled (more parameters, more training data, more computation), they exhibited emergent abilities not present in smaller models — including in-context learning, chain-of-thought reasoning, and coherent multi-paragraph text generation.',
            explanation: 'Scaling laws empirically show that model performance improves predictably with scale, but certain capabilities only appear after crossing specific size thresholds, not through explicit programming.',
            discussionPoints: ['Are there fundamental limits to scaling?', 'What alternative approaches exist besides scaling?'],
            commonMistakes: ['Assuming bigger models are always better — inference cost, latency, and environmental impact also matter'],
            tips: ['Think of scaling as enabling "phase transitions" in capabilities — new abilities emerge at certain model sizes'],
          },
        ],
        numerical: [
          {
            question: 'A language model has vocabulary size V=50,000 and a context window C=2048. How many parameters are in the embedding layer if d_model=4096?',
            answer: 'Embedding parameters = V x d_model = 50,000 x 4,096 = 204,800,000 parameters (~195 MB at 32-bit float).',
            explanation: 'The embedding layer is essentially a lookup table. Each of the 50,000 tokens in the vocabulary has its own dense vector representation of size 4,096.',
            discussionPoints: ['Why not share embeddings between semantically similar tokens?', 'How does embedding dimension affect overall model quality?'],
            commonMistakes: ['Forgetting to multiply by the embedding dimension', 'Confusing the embedding layer with the output/projection layer'],
            tips: ['Embedding parameters = vocab_size x embedding_dimension — always remember this formula'],
          },
        ],
        application: [
          {
            question: 'You need to build a chatbot for legal document assistance. Would you use a generative model or a discriminative model? Justify your choice.',
            answer: 'A generative model (LLM) would be more appropriate because it can understand context, generate human-like responses, summarize complex documents, and handle diverse legal queries. A discriminative model could only classify or tag documents.',
            explanation: 'Legal assistance requires understanding nuanced language, generating coherent responses, and answering varied queries — all strengths of generative models. Discriminative models lack the ability to produce novel text.',
            discussionPoints: ['What specific risks exist when using generative AI for legal advice?', 'How would you ensure the model provides factually accurate legal information?'],
            commonMistakes: ['Assuming generative models are always factually correct — they can hallucinate legal citations and case law'],
            tips: ['Always include human-in-the-loop oversight for high-stakes applications like legal or medical advice'],
          },
        ],
        problemSolving: [
          {
            question: 'A company wants to automate customer support with 10,000 past resolved tickets. Design a system using both discriminative and generative components.',
            answer: 'Use a lightweight discriminative classifier to route incoming tickets to categories (billing, technical, account management), then use a generative model fine-tuned on past resolutions to draft responses. Retrieve similar resolved tickets using embedding similarity for context.',
            explanation: 'Hybrid systems leverage the strengths of each approach: fast and cheap classification for routing, nuanced generation for responses, and retrieval for factual grounding.',
            discussionPoints: ['How would you evaluate the quality of generated responses?', 'What fallback mechanism works when no similar past ticket is found?'],
            commonMistakes: ['Using only a generative model for everything — unnecessarily expensive and slow for simple routing tasks'],
            tips: ['Hybrid systems almost always outperform pure approaches in production settings — use the right tool for each subtask'],
          },
        ],
      },
      virtualLab: {
        title: 'Generative AI Explorer Lab',
        description: 'An interactive simulation that shows how a generative model creates text token by token, with adjustable parameters',
        steps: [
          { name: 'Input Encoding', description: 'Convert input text to token IDs via the embedding lookup', animation: 'Tokens are mapped through the embedding matrix' },
          { name: 'Forward Pass', description: 'Token embeddings pass through multiple transformer layers', animation: 'Each layer applies self-attention and feed-forward processing' },
          { name: 'Next Token Prediction', description: 'The model outputs a probability distribution over the entire vocabulary', animation: 'Softmax function converts raw logits to interpretable probabilities' },
          { name: 'Token Sampling', description: 'Sample the next token from the probability distribution', animation: 'Temperature-adjusted sampling selects the next token' },
          { name: 'Iterate', description: 'Append the predicted token to the sequence and repeat', animation: 'Autoregressive generation continues until max length or stop token' },
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
          'The evolution of AI was driven by three factors: data availability, compute power, and algorithmic innovations',
          'Scale leads to emergence — novel capabilities appear at certain model sizes without explicit programming',
        ],
        advantages: [
          'Can create novel, coherent content across diverse domains and modalities',
          'Learns implicit linguistic and structural rules without manual feature engineering',
          'Transfers knowledge across different tasks through pre-training and fine-tuning',
        ],
        disadvantages: [
          'Statistically plausible but factually unreliable outputs (hallucination problem)',
          'Requires enormous computational resources for training and deployment',
          'Can amplify and perpetuate biases present in training data',
        ],
        improvements: [
          'Retrieval-Augmented Generation (RAG) for improved factual accuracy',
          'Mixture of Experts (MoE) architectures for more efficient computation',
          'Reinforcement Learning from Human Feedback (RLHF) for better alignment',
        ],
        futureScope: [
          'Multimodal models that seamlessly understand text, images, audio, and video',
          'Agentic AI systems that can take actions in digital and physical environments',
          'On-device SLMs for privacy-preserving, offline AI applications',
        ],
        industrialApplications: [
          'Automated content creation and marketing copy generation',
          'Code generation and software development assistance (GitHub Copilot)',
          'Customer service automation and intelligent chatbots',
          'Scientific research acceleration and drug discovery',
          'Personalized education and adaptive tutoring systems',
        ],
        researchOpportunities: [
          'Improving factual accuracy and reducing hallucinations in generation',
          'Developing more computationally efficient architectures',
          'Understanding and predicting emergent abilities in large models',
          'Creating robust and comprehensive evaluation benchmarks',
        ],
        careerRelevance: 'Generative AI is transforming virtually every industry. Engineers who deeply understand these models — their capabilities, limitations, and implementation — are among the most sought-after professionals in the current job market. Skills in deploying, fine-tuning, and building applications with LLMs command premium compensation.',
      },
    },
  ],
};

export default day1Module;
