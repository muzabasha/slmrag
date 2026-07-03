import type { Module } from '../types';

const day2Module: Module = {
  id: 'day2',
  day: 2,
  title: 'Prompt Engineering & Open Source Small Language Models',
  subtitle: 'Learn to effectively interact with and optimize SLM performance using prompts and model optimization',
  objectives: [
    'Master prompt engineering fundamentals including zero-shot, few-shot, and Chain-of-Thought',
    'Understand role prompting and context window management',
    'Learn temperature, Top-k, and Top-p sampling parameters',
    'Explore quantization and GGUF models for efficient inference',
    'Develop model selection strategies for different use cases',
  ],
  tools: ['Ollama', 'Hugging Face', 'GGUF Models', 'Transformers', 'LangChain'],
  skills: ['Prompt Engineering', 'Model Selection', 'Local Inference Optimization'],
  deliverable: 'Intelligent Prompt Engineering Playground',
  topics: [
    {
      id: 'day2-prompt-engineering',
      title: 'Prompt Engineering Fundamentals',
      description: 'Master the art and science of crafting effective prompts for language models',
      duration: '45 min',
      prerequisites: ['Understanding of LLM inference pipeline', 'Basic knowledge of language model capabilities'],
      dependentTopics: ['Fine-tuning', 'RAG Systems'],
      nextTopicPrep: 'Experiment with different prompting strategies on a local model before the next session',
      story: {
        analogy: 'The Genie in the Bottle',
        narrative: [
          'Imagine you find a magical genie (the language model). The genie can do almost anything, but it takes your wishes literally. If you say "I want a car," you might get a tiny toy car. If you say "I want a brand new red Tesla Model 3 parked in my driveway with the keys in the ignition," you get exactly that.',
          'But there is a problem - the genie has never left the bottle. It only knows about the world from stories told to it (training data). Sometimes it makes things up (hallucinates). Sometimes it gets confused by vague instructions.',
          'You discover that the way you phrase your wish dramatically changes what you get. "Make me rich" might give you a pile of gold coins. "Give me skills to earn wealth" gives you an online course subscription. The more specific, contextual, and structured your wish, the better the result.',
          'Some master wishers use tricks: "Let us think step by step" (Chain-of-Thought), "You are an expert financial advisor" (role prompting), or "Here are 3 examples of good wishes" (few-shot). These are your prompt engineering techniques!',
        ].join('\n\n'),
        reflectiveQuestions: [
          'Why does adding "Let us think step by step" improve reasoning?',
          'How does providing examples in the prompt help the model understand the task?',
          'What happens when you give contradictory instructions in a prompt?',
        ],
        connection: 'Just like the genie needs precise wishes, language models need well-crafted prompts. Prompt engineering is the skill of communicating with AI to get desired outputs reliably and safely.',
        technicalExplanation: [
          'Zero-shot prompting asks the model to perform a task without any examples',
          'Few-shot prompting provides 2-5 examples to establish the pattern before asking',
          'Chain-of-Thought (CoT) prompting encourages step-by-step reasoning for complex problems',
          'Role prompting assigns a persona to the model (e.g., "You are a expert data scientist") to shape the response style',
          'System prompts set the overall behavior and constraints before user interaction begins',
        ],
        lifeSkills: 'Prompt engineering teaches us that communication clarity matters enormously. Whether talking to humans or AI, being specific, providing context, and structuring your requests leads to better outcomes.',
      },
      mathModeling: {
        need: 'Understanding how prompts mathematically influence model output distributions enables precise control over generation behavior.',
        motivation: 'Prompt engineering is not just trial and error - it has a mathematical foundation in probability, information theory, and sampling mechanics. Mastering this math lets you predict and control model outputs systematically.',
        realWorldChallenges: [
          'Small changes in prompt phrasing can produce dramatically different outputs',
          'Different models respond differently to the same prompting strategy',
          'Balancing creativity (high temperature) vs. factuality (low temperature) is task-dependent',
        ],
        technicalChallenges: [
          'The prompt space is infinite - no exhaustive search is possible',
          'Model internal representations are not directly interpretable',
          'Context window limits constrain prompt length and complexity',
        ],
        advantages: [
          'No training required - works with any compatible model',
          'Quick iteration cycle enables rapid experimentation',
          'Composable - strategies can be combined for complex tasks',
        ],
        limitations: [
          'No guarantee of consistency across different inputs',
          'Requires human expertise to design effective prompts',
          'Models have different sensitivities to prompting techniques',
        ],
        equations: [
          {
            latex: 'P(y \\mid x, p) = \\text{softmax}\\left(\\frac{f(x, p; \\theta)}{T}\\right)',
            symbolExplanations: [
              { symbol: 'x', meaning: 'Input/task description' },
              { symbol: 'p', meaning: 'Prompt template' },
              { symbol: 'y', meaning: 'Model output' },
              { symbol: 'T', meaning: 'Temperature parameter' },
              { symbol: '\\theta', meaning: 'Model parameters (frozen during prompting)' },
              { symbol: 'f', meaning: 'Model forward pass function' },
            ],
            meaning: 'The probability of output y given input x and prompt p is determined by the softmax of logits divided by temperature T.',
            whyNeeded: 'This equation captures how prompts influence the output distribution. The prompt p changes the hidden states, which changes the logits, which changes the final probabilities.',
            interpretation: 'Temperature T controls the sharpness of the distribution. T=1 is standard, T<1 makes outputs more deterministic, T>1 increases randomness.',
            numericalExample: 'If logits are [2.0, 1.0, 0.0], T=1 gives probs [0.67, 0.24, 0.09], T=0.2 gives [0.98, 0.02, 0.00], T=2.0 gives [0.46, 0.31, 0.23]',
          },
          {
            latex: '\\text{Top-p}(x) = \\min\\left\\{k \\mid \\sum_{i=1}^{k} P(x_i) \\geq p\\right\\}',
            symbolExplanations: [
              { symbol: 'Top-p(x)', meaning: 'The set of tokens selected by nucleus sampling' },
              { symbol: 'P(x_i)', meaning: 'Probability of the i-th most likely token' },
              { symbol: 'p', meaning: 'Probability threshold (e.g., 0.9)' },
              { symbol: 'k', meaning: 'Number of tokens whose cumulative probability reaches p' },
            ],
            meaning: 'Nucleus sampling selects the smallest set of tokens whose cumulative probability exceeds threshold p, then samples from this set.',
            whyNeeded: 'Top-p (nucleus) sampling adaptively chooses how many tokens to consider based on the distribution shape, avoiding both overly greedy and overly random outputs.',
            interpretation: 'When the distribution is sharp (one token clearly better), top-p selects fewer tokens. When it is flat, it selects more tokens.',
            numericalExample: 'If tokens have probs [0.5, 0.3, 0.1, 0.05, ...], top-p=0.9 selects first 3 tokens (0.5+0.3+0.1=0.9)',
          },
        ],
        interactiveParams: [
          { name: 'temperature', label: 'Temperature', min: 0.1, max: 2.0, step: 0.1, default: 0.7 },
          { name: 'topP', label: 'Top-P', min: 0.5, max: 1.0, step: 0.05, default: 0.9 },
          { name: 'topK', label: 'Top-K', min: 1, max: 100, step: 1, default: 40 },
        ],
      },
      activities: {
        levels: [
          {
            level: 1, title: 'Basic: Zero-shot vs Few-shot', description: 'Compare model outputs with and without examples',
            objectives: ['Understand the impact of providing examples'], timeRequired: '15 min', materials: ['Model access (chat interface)'],
            instructions: ['Task: "Classify this email as spam or not spam: [email text]"', 'Run with zero-shot first', 'Then add 2-3 examples', 'Compare accuracy and confidence'],
            inputs: ['Sample emails (5 provided)'], expectedOutputs: ['Comparison table of zero-shot vs few-shot results'],
            rubrics: [{ criterion: 'Correct classification', weight: 40 }, { criterion: 'Quality of few-shot examples', weight: 30 }, { criterion: 'Analysis of differences', weight: 30 }],
            learningOutcomes: ['Understand when few-shot prompting helps'],
          },
          {
            level: 2, title: 'Intermediate: Chain-of-Thought', description: 'Implement CoT prompting for reasoning tasks',
            objectives: ['Master CoT prompting technique', 'Compare CoT with direct answering'], timeRequired: '15 min', materials: ['Model access'],
            instructions: ['Pick 3 math word problems', 'Ask model to answer directly (baseline)', 'Then use "Let us think step by step" (CoT)', 'Compare accuracy and reasoning quality'],
            inputs: ['Math word problems (3 provided)'], expectedOutputs: ['CoT solutions with step-by-step reasoning'],
            rubrics: [{ criterion: 'Answer correctness', weight: 40 }, { criterion: 'Reasoning quality', weight: 40 }, { criterion: 'Step clarity', weight: 20 }],
            learningOutcomes: ['Apply CoT for complex reasoning tasks'],
          },
          {
            level: 3, title: 'Advanced: Prompt Engineering Competition', description: 'Teams compete to design the best prompts',
            objectives: ['Apply all prompting strategies', 'Optimize prompts for different tasks'], timeRequired: '25 min', materials: ['Team laptops', 'Shared model access'],
            instructions: ['Divide into 4 teams', 'Assign each team a task type (summarization, code gen, reasoning, creative)', 'Teams design prompts and run them', 'Class votes on best outputs'],
            inputs: ['Task descriptions', 'Evaluation rubric'], expectedOutputs: ['Competition prompts with results and analysis'],
            rubrics: [{ criterion: 'Output quality', weight: 40 }, { criterion: 'Prompt creativity', weight: 30 }, { criterion: 'Analysis', weight: 30 }],
            learningOutcomes: ['Master multiple prompting strategies'],
          },
          {
            level: 4, title: 'Individual: Prompt Portfolio Creation', description: 'Each student creates a personal prompt engineering portfolio',
            objectives: ['Build reusable prompt templates', 'Document effective strategies for different tasks'], timeRequired: '20 min', materials: ['Document editor', 'Model access'],
            instructions: ['Create 5 prompt templates for different tasks', 'Test and refine each with a model', 'Document what works and why', 'Share with peers'],
            inputs: ['Template examples', 'Model access'], expectedOutputs: ['Personal prompt portfolio with 5 templates'],
            rubrics: [{ criterion: 'Template quality', weight: 40 }, { criterion: 'Documentation', weight: 30 }, { criterion: 'Testing thoroughness', weight: 30 }],
            learningOutcomes: ['Build reusable prompt library'],
          },
        ],
      },
      project: {
        scope: 'Build an Interactive Prompt Engineering Playground web app', feasibility: 'High - Streamlit or React with model API',
        riskManagement: [{ risk: 'Model API costs', probability: 'Low', impact: 'Medium', mitigation: 'Use local models via Ollama' }],
        budget: [{ item: 'Hosting', cost: 0, currency: 'USD' }, { item: 'API credits', cost: 0, currency: 'USD' }],
        timeline: [{ phase: 'Build', start: 'Day 2 AM', end: 'Day 2 PM', milestones: ['Setup UI', 'Connect model', 'Add prompt templates'] }],
        objectives: ['Support multiple prompting strategies', 'Compare outputs side by side', 'Save and share effective prompts'],
        outcomes: ['Working prompt playground with template library'], methodology: ['Design', 'Build', 'Test', 'Deploy'],
        teamRoles: [{ role: 'UI Developer', responsibilities: ['Build interface'] }, { role: 'ML Engineer', responsibilities: ['Model integration'] }],
        setup: 'Streamlit or React + FastAPI with local LLM via Ollama', userManual: 'Select prompt strategy, type your task, adjust parameters, and compare outputs.',
      },
      questions: {
        conceptual: [
          { question: 'Why does Chain-of-Thought prompting improve performance on reasoning tasks?', answer: 'CoT encourages the model to break down complex problems into intermediate steps, similar to how humans solve problems step by step. This reduces working memory load and makes the reasoning process visible and verifiable.', explanation: 'The model can leverage its next-token prediction ability to generate intermediate reasoning steps before arriving at a final answer.', discussionPoints: ['Does CoT work for all types of tasks?', 'How long should CoT prompts be?'], commonMistakes: ['Using CoT for simple factual questions where it adds unnecessary complexity'], tips: ['Use CoT for math, logic, and multi-step reasoning tasks - not for simple lookups'] },
          { question: 'What is the difference between a system prompt and a user prompt?', answer: 'A system prompt sets the overall context, behavior rules, and persona for the AI, applied before any user interaction. User prompts are individual requests within that context. System prompts are ideal for setting constraints, while user prompts carry specific task instructions.', explanation: 'This separation allows reusable AI behavior (system) with flexible task input (user).', discussionPoints: ['How would you structure system prompts for a medical chatbot?', 'Can user prompts override system prompts?'], commonMistakes: ['Putting task-specific instructions in system prompts instead of user prompts'], tips: ['Use system prompts for identity and constraints, user prompts for tasks and questions'] },
        ],
        numerical: [
          { question: 'With temperature T=0.2, what happens to the probability distribution?', answer: 'T=0.2 sharpens the distribution significantly. The highest-probability token becomes much more likely, while low-probability tokens become nearly impossible to select. For logits values of 2.0, 1.0, 0.0, probabilities become approximately 0.98, 0.02, 0.00 after softmax with T=0.2.', explanation: 'Low temperature makes output nearly deterministic - the model will almost always pick the most likely token.', discussionPoints: ['When would you want completely deterministic output?', 'What are the dangers of too high temperature?'], commonMistakes: ['Setting temperature too high for factual tasks causes hallucination'], tips: ['Use T=0.1-0.3 for factual/code tasks, T=0.7-0.9 for creative tasks'] },
        ],
        application: [
          { question: 'Design a prompt system for a customer support chatbot', answer: 'Use a system prompt for behavior rules and user prompts for tasks. Include role, constraints, and few-shot examples.', explanation: 'A structured prompt helps the model handle different scenarios consistently.', discussionPoints: ['How would you handle abusive customers?', 'When should the chatbot escalate to human?'], commonMistakes: ['Not handling edge cases in prompt design'], tips: ['Test prompts with edge cases'] },
        ],
        problemSolving: [
          { question: 'Your prompt gives good results 70% of the time but fails badly on certain inputs. How do you systematically improve reliability?', answer: '1) Analyze failure patterns - what types of inputs fail? 2) Add specific handling instructions. 3) Use few-shot examples. 4) Add a verification step. 5) Implement confidence thresholds - if below threshold, ask for clarification.', explanation: 'Systematic prompt improvement involves data analysis of failures, targeted prompt updates, and adding verification mechanisms.', discussionPoints: ['How many few-shot examples are enough?', 'What if failures are random?'], commonMistakes: ['Making prompts longer without addressing specific failure modes'], tips: ['Track prompt performance like any ML system - measure, analyze, improve'] },
        ],
      },
      virtualLab: {
        title: 'Prompt Engineering Playground', description: 'Interactive lab to experiment with different prompting strategies and sampling parameters',
        steps: [
          { name: 'Select Strategy', description: 'Choose prompting strategy (Zero-shot, Few-shot, CoT, Role)', animation: 'Strategy template loads in prompt editor' },
          { name: 'Craft Prompt', description: 'Write your prompt with optional examples and role context', animation: 'Prompt construction with live token count' },
          { name: 'Set Parameters', description: 'Adjust temperature, Top-K, Top-P, max tokens', animation: 'Parameter sliders update in real time' },
          { name: 'Generate', description: 'Run the model and see the output', animation: 'Tokens stream in one by one' },
          { name: 'Compare', description: 'Compare outputs from different strategies side by side', animation: 'Side-by-side output comparison view' },
        ],
        parameters: [
          { name: 'temperature', label: 'Temperature', type: 'slider', min: 0.1, max: 2.0, step: 0.1, default: 0.7 },
          { name: 'maxTokens', label: 'Max Tokens', type: 'slider', min: 16, max: 1024, step: 16, default: 256 },
        ],
        controls: { reset: true, playPause: true, speed: false, compare: true },
      },
      insights: {
        keyInsights: ['Prompt engineering is the primary interface for controlling LLM behavior', 'Different tasks need different prompting strategies', 'Small changes in phrasing can cause large changes in output'],
        advantages: ['No training required - works with any compatible model', 'Quick iteration cycle', 'Composable - strategies can be combined'],
        disadvantages: ['No guarantee of consistency', 'Requires human expertise to design', 'Models have different sensitivities to prompting'],
        improvements: ['Automatic prompt optimization (APE)', 'Dynamic prompt selection based on task', 'Prompt version control and testing frameworks'],
        futureScope: ['Self-improving prompts that learn from feedback', 'Multi-modal prompting (text + images)', 'Programmatic prompt generation with meta-prompts'],
        industrialApplications: ['Chatbot development and conversation design', 'Content generation workflows', 'Code generation with specific frameworks', 'Data extraction and transformation pipelines'],
        researchOpportunities: ['Understanding why prompts work (mechanistic interpretability)', 'Automatic prompt discovery', 'Cross-model prompt transferability'],
        careerRelevance: 'Prompt engineering is one of the most accessible entry points into the AI field and a highly valued skill across all industries adopting generative AI.',
      },
    },
  ],
};

export default day2Module;
