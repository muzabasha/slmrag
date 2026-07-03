import type { Module } from '../types';

const day3Module: Module = {
  id: 'day3',
  day: 3,
  title: 'Fine-tuning Small Language Models',
  subtitle: 'Customize open-source SLMs using parameter-efficient fine-tuning techniques',
  objectives: [
    'Understand why and when to fine-tune language models',
    'Master instruction tuning and dataset preparation',
    'Implement LoRA and QLoRA for parameter-efficient fine-tuning',
    'Monitor training and evaluate fine-tuned models',
    'Deploy fine-tuned models for inference',
  ],
  tools: ['Hugging Face', 'PEFT', 'LoRA', 'QLoRA', 'TRL', 'Accelerate'],
  skills: ['Model Adaptation and Domain Customization', 'Dataset Preparation'],
  deliverable: 'Fine-tuned University/Healthcare Domain Assistant',
  topics: [
    {
      id: 'day3-finetuning',
      title: 'Parameter-Efficient Fine-Tuning with LoRA',
      description: 'Learn to adapt pre-trained language models to your domain using LoRA and QLoRA',
      duration: '45 min',
      prerequisites: ['Understanding of transformer architecture', 'Python and PyTorch basics'],
      dependentTopics: ['RAG Systems', 'Deployment'],
      nextTopicPrep: 'Prepare a small domain-specific dataset for fine-tuning practice',
      story: {
        analogy: 'The Specialist Doctor',
        narrative: `Imagine you graduate from medical school as a general practitioner (the pre-trained model). You know all the basics — anatomy, physiology, common diseases. But now you want to specialize in cardiology. Do you go back to medical school for 4 more years (full fine-tuning)? No! You do a fellowship (LoRA) where you only learn cardiology-specific knowledge while keeping your general training intact.

Full fine-tuning is like going back to medical school — you update ALL your knowledge, which is expensive and risks forgetting what you already learned (catastrophic forgetting). LoRA is like a fellowship — you add small "adaptation modules" that teach you cardiology without touching your core knowledge.

QLoRA is even smarter — it's like doing your fellowship while wearing noise-canceling headphones (4-bit quantization). You can learn in a noisy environment (using less precise computations) and still become an excellent cardiologist. This means you can specialize even on a tight budget!

The best part? Your cardiology fellowship notes (LoRA weights) are just a small file. You can share them, and any other general practitioner can quickly become a cardiologist by applying your notes. This is the magic of parameter-efficient fine-tuning!`,
        reflectiveQuestions: [
          'Why is full fine-tuning wasteful for adapting a model to a specific domain?',
          'How does LoRA prevent catastrophic forgetting?',
          'What types of tasks benefit most from fine-tuning vs. prompting?',
        ],
        connection: 'Fine-tuning adapts general-purpose models to specialized tasks. LoRA and QLoRA make this process efficient enough to run on consumer hardware, democratizing access to custom AI.',
        technicalExplanation: [
          'Full fine-tuning updates all model parameters, requiring significant compute and risking catastrophic forgetting',
          'LoRA freezes pre-trained weights and injects trainable rank decomposition matrices into attention layers',
          'QLoRA combines 4-bit NormalFloat quantization with LoRA, reducing memory usage by 4x',
          'The rank r controls the trade-off between expressiveness and efficiency — lower r = fewer parameters to train',
          'Fine-tuned adapters are typically 1-2% of the original model size and can be easily shared and deployed',
        ],
        lifeSkills: 'Fine-tuning teaches the value of specialization built on a strong general foundation. It\'s more efficient to adapt existing knowledge than to learn from scratch — a principle that applies to career development and skill acquisition.',
      },
      mathModeling: {
        need: 'Understanding LoRA\'s math helps choose the right rank and configuration for your fine-tuning task.',
        motivation: 'LoRA makes fine-tuning accessible on consumer GPUs by dramatically reducing the number of trainable parameters.',
        realWorldChallenges: ['Limited GPU memory for full fine-tuning', 'Catastrophic forgetting of pre-trained knowledge', 'Managing multiple fine-tuned versions for different tasks'],
        technicalChallenges: ['Choosing optimal rank for the target task', 'Selecting which layers to apply LoRA to', 'Balancing adapter strength with base model capabilities'],
        advantages: ['Reduces trainable parameters by 10,000x', 'No inference latency added', 'Multiple adapters can be swapped at runtime'],
        limitations: ['May not match full fine-tuning performance on complex tasks', 'Requires careful hyperparameter tuning', 'Limited research on optimal rank selection'],
        equations: [
          {
            latex: 'h = W_0x + \\Delta Wx = W_0x + BAx',
            symbolExplanations: [
              { symbol: 'h', meaning: 'Output of the modified layer' },
              { symbol: 'W_0', meaning: 'Pre-trained weight matrix (frozen)' },
              { symbol: 'x', meaning: 'Input to the layer' },
              { symbol: 'B', meaning: 'Trainable matrix (d x r) initialized to zero' },
              { symbol: 'A', meaning: 'Trainable matrix (r x k) initialized with random Gaussian' },
              { symbol: 'r', meaning: 'Rank of the LoRA adaptation (typically 1-64)' },
            ],
            meaning: 'LoRA decomposes the weight update into a product of two low-rank matrices. The original weights remain frozen, and only the small A and B matrices are trained.',
            whyNeeded: 'This decomposition reduces the number of trainable parameters from d x k to r x (d + k), which is orders of magnitude smaller when r is small.',
            interpretation: 'Instead of updating a massive matrix W, we update tiny A and B matrices whose product approximates the full update. The rank r controls the approximation quality.',
            numericalExample: 'For d=4096, k=4096: full update = 16.8M params. LoRA with r=8: A=8x4096, B=4096x8 = 65,536 params. Reduction: 256x.',
          },
        ],
        interactiveParams: [
          { name: 'loraRank', label: 'LoRA Rank (r)', min: 1, max: 256, step: 1, default: 8 },
          { name: 'loraAlpha', label: 'LoRA Alpha', min: 1, max: 64, step: 1, default: 16 },
          { name: 'learningRate', label: 'Learning Rate', min: 1e-6, max: 1e-3, step: 1e-6, default: 2e-4 },
        ],
      },
      activities: {
        levels: [
          {
            level: 1, title: 'Teacher Demo: Before and After Fine-tuning', description: 'Show comparison of base model vs fine-tuned model responses',
            objectives: ['See the impact of fine-tuning visually', 'Understand when fine-tuning is needed'],
            instructions: ['Show base model responses to domain questions', 'Show fine-tuned model responses to same questions', 'Highlight quality differences and error reduction'],
            inputs: ['Base model', 'Fine-tuned model', 'Test questions'], expectedOutputs: ['Students see clear quality improvement from fine-tuning'],
            rubrics: [{ criterion: 'Understanding of FT impact', weight: 50 }, { criterion: 'Engagement', weight: 50 }],
            learningOutcomes: ['Can identify when fine-tuning adds value'], timeRequired: '10 min', materials: ['Projector', 'Two model outputs side by side'],
          },
          {
            level: 2, title: 'Guided: Dataset Preparation Walkthrough', description: 'Instructor guides students through preparing a dataset for fine-tuning',
            objectives: ['Understand dataset format requirements', 'Prepare instruction-following data'],
            instructions: ['Show raw domain data', 'Demonstrate conversion to instruction format', 'Explain each field: instruction, input, output', 'Validate dataset quality'],
            inputs: ['Raw domain text', 'Dataset conversion script'], expectedOutputs: ['Properly formatted instruction dataset'],
            rubrics: [{ criterion: 'Format correctness', weight: 40 }, { criterion: 'Data quality', weight: 60 }],
            learningOutcomes: ['Can prepare instruction datasets'], timeRequired: '20 min', materials: ['Colab notebook', 'Sample data'],
          },
          {
            level: 3, title: 'Group: Run a LoRA Fine-tuning Job', description: 'Groups run a small LoRA fine-tuning experiment',
            objectives: ['Execute LoRA fine-tuning pipeline', 'Monitor training metrics'],
            instructions: ['Set up the training script', 'Configure LoRA parameters', 'Run training for 100 steps', 'Monitor loss curve', 'Save the adapter'],
            inputs: ['Training script', 'Colab GPU'], expectedOutputs: ['Trained LoRA adapter with loss curves'],
            rubrics: [{ criterion: 'Successful training', weight: 40 }, { criterion: 'Loss curve analysis', weight: 30 }, { criterion: 'Adapter quality', weight: 30 }],
            learningOutcomes: ['Can execute LoRA fine-tuning pipeline'], timeRequired: '30 min', materials: ['Colab Pro', 'Prepared dataset'],
          },
          {
            level: 4, title: 'Individual: Adapter Evaluation Report', description: 'Each student evaluates and documents their fine-tuned adapter',
            objectives: ['Evaluate model quality systematically', 'Document findings and improvements'],
            instructions: ['Load your trained adapter', 'Test on 10 evaluation questions', 'Compare with base model', 'Write evaluation report'],
            inputs: ['Trained adapter', 'Evaluation questions'], expectedOutputs: ['Evaluation report with comparison metrics'],
            rubrics: [{ criterion: 'Evaluation thoroughness', weight: 40 }, { criterion: 'Report quality', weight: 30 }, { criterion: 'Insights', weight: 30 }],
            learningOutcomes: ['Can evaluate and document model improvements'], timeRequired: '20 min', materials: ['Adapter', 'Evaluation notebook'],
          },
        ],
      },
      project: {
        scope: 'Fine-tune a small language model for a domain-specific task and deploy the adapter', feasibility: 'Medium — requires GPU access (Colab)',
        riskManagement: [{ risk: 'GPU memory limits', probability: 'Medium', impact: 'High', mitigation: 'Use QLoRA with 4-bit quantization' }, { risk: 'Overfitting on small dataset', probability: 'Medium', impact: 'Medium', mitigation: 'Use validation split and early stopping' }],
        budget: [{ item: 'GPU Compute (Colab)', cost: 0, currency: 'USD' }, { item: 'Storage for adapters', cost: 0, currency: 'USD' }],
        timeline: [{ phase: 'Data Prep', start: 'Day 3 AM', end: 'Day 3 AM', milestones: ['Collect domain data', 'Convert to instruction format'] }, { phase: 'Training', start: 'Day 3 AM', end: 'Day 3 PM', milestones: ['Configure LoRA', 'Run training', 'Evaluate adapter'] }],
        objectives: ['Fine-tune a TinyLlama/Phi-3 model', 'Achieve measurable improvement on domain tasks', 'Save and load the adapter'],
        outcomes: ['Trained LoRA adapter', 'Evaluation report comparing base vs fine-tuned'], methodology: ['Data collection', 'Format conversion', 'LoRA training', 'Evaluation', 'Documentation'],
        teamRoles: [{ role: 'Data Engineer', responsibilities: ['Dataset preparation and cleaning'] }, { role: 'ML Engineer', responsibilities: ['Training configuration and execution'] }],
        setup: 'Google Colab with T4 GPU, Hugging Face Transformers + PEFT + TRL libraries', userManual: 'Run the notebook, upload your data, configure LoRA, train, and save the adapter weights.',
      },
      questions: {
        conceptual: [
          { question: 'Why does LoRA only modify attention layers and not all layers?', answer: 'Research found that attention layers have a low intrinsic rank — the weight updates needed for new tasks can be captured with low-rank matrices. Modifying attention layers is sufficient for most task adaptation while being efficient.', explanation: 'The "intrinsic dimension" of language model task adaptation is surprisingly low, as shown by Aghajanyan et al. (2020).', discussionPoints: ['Would adding LoRA to FFN layers help?', 'How does this relate to the lottery ticket hypothesis?'], commonMistakes: ['Applying LoRA to all layers unnecessarily increases adapter size without proportional gains'], tips: ['Default to attention layers only (q,v projections), add more layers if needed'] },
        ],
        numerical: [
          { question: 'Fine-tuning a 7B parameter model with LoRA (r=16). How many trainable parameters?', answer: 'For a typical 7B model with ~32 layers, each with Q and V projections of dimension 4096: 2 projections x 32 layers x (16x4096 + 4096x16) = 64 x (65,536 + 65,536) = 64 x 131,072 = ~8.4M trainable parameters. This is ~0.12% of the full model!', explanation: 'LoRA dramatically reduces training parameters while maintaining task performance.', discussionPoints: ['How does this ratio change for larger models?', 'What rank is optimal for different model sizes?'], commonMistakes: ['Forgetting that rank affects both LoRA matrices (A and B)'], tips: ['Rule of thumb: trainable params = 2 x r x d x num_layers x num_projections'] },
        ],
        application: [
          { question: 'Design a fine-tuning strategy for a legal document analysis model.', answer: '1) Collect 1000+ legal Q&A pairs from court cases, 2) Format as instruction: "Analyze this legal clause: [text]" -> "[analysis]", 3) Use QLoRA (r=16, 4-bit) on a base model like Llama 3 8B, 4) Train for 3 epochs with validation, 5) Evaluate on held-out cases, 6) Deploy adapter for inference.', explanation: 'The legal domain requires precise, structured outputs that benefit from fine-tuning rather than prompting alone.', discussionPoints: ['How would you handle confidential legal documents?', 'What metrics measure quality for legal analysis?'], commonMistakes: ['Not cleaning data properly — legal text has complex formatting and citations'], tips: ['Include legal citation format in training data for consistent output style'] },
        ],
        problemSolving: [
          { question: 'Your fine-tuned model performs well on training data but worse than the base model on general knowledge questions. What happened and how to fix it?', answer: 'This is catastrophic forgetting. The model over-specialized to the domain data and lost general knowledge. Fixes: 1) Reduce learning rate, 2) Add 10-20% general knowledge data to the training mix, 3) Use lower LoRA rank to constrain adaptation, 4) Train for fewer epochs with earlier stopping, 5) Use Elastic Weight Consolidation (EWC) to regularize important weights.', explanation: 'Catastrophic forgetting is a key challenge in fine-tuning. The model weights move too far from the pre-trained initialization.', discussionPoints: ['How do we measure which weights are "important"?', 'What ratio of general to domain data works best?'], commonMistakes: ['Training too long on small domain datasets'], tips: ['Always include a general knowledge eval set alongside domain eval to monitor forgetting'] },
        ],
      },
      virtualLab: {
        title: 'LoRA Fine-tuning Simulator', description: 'Interactive simulation showing how LoRA adapters modify model behavior with different ranks',
        steps: [
          { name: 'Load Base Model', description: 'Start with a pre-trained language model', animation: 'Model weights load with frozen indicator' },
          { name: 'Inject LoRA', description: 'Add low-rank adapter matrices to attention layers', animation: 'Small A and B matrices appear alongside frozen weights' },
          { name: 'Train', description: 'Train only the LoRA parameters on domain data', animation: 'A and B matrices update, frozen weights stay constant' },
          { name: 'Merge', description: 'Optionally merge LoRA weights into base model', animation: 'A x B product adds to frozen weights' },
          { name: 'Evaluate', description: 'Test adapted model on domain tasks', animation: 'Model generates improved domain-specific responses' },
        ],
        parameters: [
          { name: 'loraRank', label: 'LoRA Rank', type: 'slider', min: 1, max: 64, step: 1, default: 8 },
          { name: 'trainSteps', label: 'Training Steps', type: 'slider', min: 10, max: 500, step: 10, default: 100 },
        ],
        controls: { reset: true, playPause: true, speed: true, compare: true },
      },
      insights: {
        keyInsights: ['LoRA makes fine-tuning accessible on consumer hardware by reducing trainable parameters 10,000x', 'Fine-tuning adapts general models to specialized domains with minimal data', 'QLoRA enables 4-bit fine-tuning, fitting large models on a single GPU'],
        advantages: ['Dramatically reduced memory and compute requirements', 'No inference latency overhead', 'Multiple task-specific adapters can be hot-swapped'],
        disadvantages: ['May not reach full fine-tuning quality on very complex or diverse tasks', 'Requires careful hyperparameter tuning (rank, alpha, learning rate)', 'Adapter quality depends heavily on dataset quality'],
        improvements: ['DoRA (Weight-Decomposed Low-Rank Adaptation) for better learning', 'VeRA (Vec-based Random Adaptations) for even fewer parameters', 'Adapter fusion for combining multiple specialized adapters'],
        futureScope: ['Automatic rank selection based on task difficulty', 'Cross-architecture adapter transfer', 'Privacy-preserving fine-tuning with federated LoRA'],
        industrialApplications: ['Domain-specific chatbots (medical, legal, financial)', 'Company internal knowledge assistants', 'Custom code generation for proprietary frameworks', 'Personalized AI assistants for individual users'],
        researchOpportunities: ['Understanding the intrinsic dimension of different tasks', 'Optimal rank selection theory', 'Adapter composition and interference', 'Catastrophic forgetting prevention'],
        careerRelevance: 'Fine-tuning is one of the most valuable applied ML skills. Companies need engineers who can adapt base models to their specific domain data and use cases efficiently.',
      },
    },
  ],
};

export default day3Module;
