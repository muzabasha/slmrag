import type { Module } from '../types';

const day5Module: Module = {
  id: 'day5',
  day: 5,
  title: 'Advanced RAG Optimization & Human-in-the-Loop',
  subtitle: 'Improve RAG quality using advanced retrieval strategies, evaluation, and human feedback',
  objectives: [
    'Implement advanced retrieval strategies including HyDE and hybrid search',
    'Apply re-ranking and parent-child retrieval for better precision',
    'Detect and mitigate hallucinations in RAG outputs',
    'Build human-in-the-loop feedback interfaces',
    'Evaluate RAG quality using RAGAS and LangSmith',
  ],
  tools: ['RAGAS', 'LangSmith', 'LangChain', 'ChromaDB', 'Cross-Encoders'],
  skills: ['AI System Evaluation', 'Responsible AI', 'Continuous Learning'],
  deliverable: 'Optimized Human-in-the-Loop RAG Assistant',
  topics: [
    {
      id: 'day5-advanced-rag',
      title: 'Advanced RAG Optimization & Evaluation',
      description: 'Master advanced techniques to optimize RAG quality, detect failures, and integrate human feedback',
      duration: '45 min',
      prerequisites: ['Basic RAG pipeline understanding', 'Python programming', 'LLM concepts'],
      dependentTopics: ['Deployment', 'Capstone Project'],
      nextTopicPrep: 'Think about how you would measure and improve the quality of a RAG system',
      story: {
        analogy: 'The Quality Control Inspector',
        narrative: `Imagine a car factory. The basic assembly line (simple RAG) works fine most of the time — cars come out, they drive. But sometimes a car rolls off the line with no brakes (hallucination) or with the wrong engine (irrelevant retrieval). You need quality control!

First, you add better inspection tools (advanced retrieval): instead of just checking one thing, you check multiple angles (hybrid search). You have specialists double-check the important parts (re-ranker). You keep detailed records of every part batch (metadata).

But even with all that, some issues slip through. That's where the human inspector (Human-in-the-Loop) comes in. The system flags suspicious outputs: "I'm only 70% confident about this answer — please review." The human checks it, corrects if needed, and the system learns from that correction.

Over time, the human inspector catches fewer and fewer issues because the system keeps improving. But the human never goes away completely — because in critical systems, you always want a human to have the final say. This is responsible AI in action.`,
        reflectiveQuestions: [
          'What kinds of RAG failures can automated systems detect vs requiring human review?',
          'How do you decide when to trust the AI vs ask for human input?',
          'What metrics would you track to measure RAG quality over time?',
        ],
        connection: 'Advanced RAG optimization is about systematically measuring and improving every component of the pipeline, while HITL ensures responsible deployment by keeping humans in the decision loop for critical outputs.',
        technicalExplanation: [
          'Hybrid search combines dense (embedding) and sparse (BM25) retrieval for better recall across different query types',
          'HyDE (Hypothetical Document Embeddings) generates a hypothetical ideal document from the query and uses it for retrieval',
          'Parent-child retrieval retrieves small chunks but returns their parent sections for richer context',
          'Cross-encoder re-rankers score query-document pairs with higher accuracy than bi-encoder embedding similarity',
          'RAGAS evaluates RAG systems on faithfulness, answer relevance, context precision, and context recall',
        ],
        lifeSkills: 'The principle of continuous improvement through measurement and feedback applies to any complex system — whether it\'s an AI pipeline, a business process, or personal skill development.',
      },
      mathModeling: {
        need: 'Understanding retrieval metrics and evaluation helps systematically improve RAG performance.',
        motivation: 'Without proper evaluation, you cannot tell if your RAG optimizations are actually improving quality or making it worse.',
        realWorldChallenges: ['Balancing retrieval precision vs recall', 'Evaluating when ground truth is unavailable', 'Detecting subtle hallucinations that look plausible'],
        technicalChallenges: ['Creating high-quality evaluation datasets', 'Setting appropriate confidence thresholds', 'Handling domain-specific language in evaluation'],
        advantages: ['Systematic quality measurement enables data-driven improvements', 'HITL feedback creates continuous learning loops', 'Advanced retrieval significantly boosts RAG quality'],
        limitations: ['Evaluation metrics don\'t capture all quality dimensions', 'Human feedback is expensive and slow', 'Some failures are undetectable without domain expertise'],
        equations: [
          {
            latex: '\\text{Faithfulness} = \\frac{|\\text{Supported Claims}|}{|\\text{Total Claims}|}',
            symbolExplanations: [
              { symbol: '|\\text{Supported Claims}|', meaning: 'Number of claims in the response that can be verified from retrieved context' },
              { symbol: '|\\text{Total Claims}|', meaning: 'Total number of factual claims in the generated response' },
            ],
            meaning: 'Faithfulness measures what fraction of the generated response\'s claims are supported by the retrieved context. Higher is better.',
            whyNeeded: 'This is the primary metric for detecting hallucinations — claims not supported by retrieved context are potential hallucinations.',
            interpretation: 'Faithfulness = 1.0 means every claim is supported. Faithfulness < 0.8 indicates the model is adding unsupported information.',
            numericalExample: 'Response has 10 claims, 8 are supported by retrieved docs: Faithfulness = 8/10 = 0.8',
          },
        ],
        interactiveParams: [
          { name: 'retrievalK', label: 'Initial Retrieval K', min: 5, max: 100, step: 5, default: 20 },
          { name: 'rerankK', label: 'After Re-ranking K', min: 1, max: 20, step: 1, default: 5 },
          { name: 'confidenceThreshold', label: 'Confidence Threshold', min: 0.5, max: 1.0, step: 0.05, default: 0.8 },
        ],
      },
      activities: {
        levels: [
          {
            level: 1, title: 'Teacher Demo: RAG Evaluation with RAGAS', description: 'Show how to evaluate RAG quality using automated metrics',
            objectives: ['Understand RAG evaluation metrics', 'See evaluation in action'],
            instructions: ['Set up RAGAS evaluation pipeline', 'Run evaluation on sample queries', 'Interpret faithfulness, relevance, and precision scores', 'Compare simple vs enhanced RAG scores'],
            inputs: ['RAGAS setup', 'Test queries with ground truth'], expectedOutputs: ['Evaluation scores with interpretation'],
            rubrics: [{ criterion: 'Understanding of metrics', weight: 50 }, { criterion: 'Score interpretation', weight: 50 }],
            learningOutcomes: ['Evaluate RAG systems with RAGAS'], timeRequired: '15 min', materials: ['Projector', 'Colab with RAGAS'],
          },
          {
            level: 2, title: 'Guided: Build a Human Feedback Interface', description: 'Students build a simple feedback mechanism for RAG responses',
            objectives: ['Implement thumbs-up/thumbs-down feedback', 'Store and analyze feedback data'],
            instructions: ['Add feedback buttons to RAG interface', 'Implement feedback storage', 'Create simple analytics view', 'Discuss ethical considerations'],
            inputs: ['RAG interface code', 'Feedback widget template'], expectedOutputs: ['RAG interface with working feedback collection'],
            rubrics: [{ criterion: 'Functionality', weight: 40 }, { criterion: 'UI/UX design', weight: 30 }, { criterion: 'Ethical considerations', weight: 30 }],
            learningOutcomes: ['Build HITL feedback systems'], timeRequired: '20 min', materials: ['Code editor', 'RAG interface'],
          },
          {
            level: 3, title: 'Group: RAG Optimization Challenge', description: 'Teams compete to optimize a RAG system for best evaluation scores',
            objectives: ['Apply advanced retrieval techniques', 'Measure and improve RAGAS scores'],
            instructions: ['Start with a basic RAG system', 'Apply different optimization strategies', 'Measure RAGAS scores after each change', 'Present which optimizations worked best'],
            inputs: ['Basic RAG system', 'Optimization techniques list'], expectedOutputs: ['Optimized RAG with documented improvements'],
            rubrics: [{ criterion: 'Score improvement', weight: 40 }, { criterion: 'Optimization strategy', weight: 30 }, { criterion: 'Documentation', weight: 30 }],
            learningOutcomes: ['Systematically optimize RAG systems'], timeRequired: '35 min', materials: ['Colab', 'Optimization technique docs'],
          },
          {
            level: 4, title: 'Individual: Hallucination Detection Report', description: 'Build and evaluate a hallucination detection system',
            objectives: ['Implement hallucination detection', 'Analyze detection accuracy'],
            instructions: ['Generate 20 test responses (some with hallucinations)', 'Build detection method (claim extraction + verification)', 'Measure precision and recall of detection', 'Write analysis report'],
            inputs: ['Test responses', 'Hallucination detection literature'], expectedOutputs: ['Hallucination detection system with evaluation'],
            rubrics: [{ criterion: 'Detection accuracy', weight: 40 }, { criterion: 'Method quality', weight: 30 }, { criterion: 'Analysis depth', weight: 30 }],
            learningOutcomes: ['Detect hallucinations in RAG outputs'], timeRequired: '25 min', materials: ['Python', 'Test dataset'],
          },
        ],
      },
      project: {
        scope: 'Build an optimized, evaluated, human-in-the-loop RAG assistant', feasibility: 'Medium — builds on Day 4 project',
        riskManagement: [{ risk: 'Low feedback volume makes analysis noisy', probability: 'High', impact: 'Low', mitigation: 'Simulate feedback for testing' }, { risk: 'Re-ranker latency', probability: 'Medium', impact: 'Medium', mitigation: 'Cache re-ranker results' }],
        budget: [{ item: 'Reranker API (if not local)', cost: 0, currency: 'USD' }],
        timeline: [{ phase: 'Optimization', start: 'Day 5 AM', end: 'Day 5 PM', milestones: ['Add hybrid search', 'Implement re-ranker', 'Add feedback collection'] }, { phase: 'Evaluation', start: 'Day 5 PM', end: 'Day 5 PM', milestones: ['Run RAGAS evaluation', 'Analyze results', 'Iterate on improvements'] }],
        objectives: ['Achieve RAGAS faithfulness score > 0.85', 'Implement hybrid search and re-ranking', 'Add HITL feedback interface'],
        outcomes: ['Optimized RAG assistant with evaluation scores'], methodology: ['Optimize retrieval', 'Add re-ranking', 'Implement feedback', 'Evaluate and iterate'],
        teamRoles: [{ role: 'ML Engineer', responsibilities: ['Retrieval optimization'] }, { role: 'Full Stack Dev', responsibilities: ['Feedback UI and storage'] }],
        setup: 'Python + LangChain + ChromaDB + Cross-Encoder + RAGAS', userManual: 'Ask questions, rate responses, and see the system improve over time.',
      },
      questions: {
        conceptual: [
          { question: 'Why does hybrid search (dense + sparse) often outperform either method alone?', answer: 'Dense retrieval (embeddings) captures semantic similarity but can miss exact keyword matches. Sparse retrieval (BM25) excels at exact term matching but misses semantic relationships. They are complementary — combining them captures both semantic and lexical relevance.', explanation: 'User queries vary widely. Some are looking for exact information ("Python 3.12 release date"), others for conceptual answers ("explain attention mechanism"). Hybrid handles both.', discussionPoints: ['How to weight dense vs sparse results?', 'When would you use only one method?'], commonMistakes: ['Assuming semantic search is always better than keyword search'], tips: ['Use hybrid search as default, with adaptive weighting based on query characteristics'] },
        ],
        numerical: [
          { question: 'A RAG system processes 100 queries. 80 return correct answers, 10 return wrong answers, 10 return "I don\'t know." What is the hallucination rate?', answer: 'Hallucination rate = wrong answers / total = 10/100 = 10%. Saying "I don\'t know" is NOT a hallucination — it\'s appropriate abstention. Only confidently wrong answers count as hallucinations.', explanation: 'Properly calibrated RAG systems should abstain when uncertain rather than hallucinate.', discussionPoints: ['Is a high "I don\'t know" rate good or bad?', 'How to trade off between coverage and accuracy?'], commonMistakes: ['Counting "I don\'t know" responses as hallucinations'], tips: ['Track both hallucination rate AND coverage rate to understand the full quality picture'] },
        ],
        application: [
          { question: 'Design a RAG evaluation strategy for a medical diagnosis assistant.', answer: '1) Create 200+ test cases with expert-validated ground truth. 2) Evaluate faithfulness (every claim must be traceable to medical literature). 3) Measure context precision (are the right medical sources retrieved?). 4) Test edge cases: rare diseases, contradictory symptoms, pediatric vs adult presentations. 5) Have 2+ medical experts review a sample of outputs. 6) Implement confidence thresholds: below 80% confidence, escalate to human doctor. 7) Continuous monitoring with LangSmith for production drift.', explanation: 'Medical RAG needs the highest standards of evaluation due to patient safety implications.', discussionPoints: ['What confidence threshold is acceptable for medical advice?', 'How to handle rapidly evolving medical knowledge?'], commonMistakes: ['Using only automated metrics without expert review for high-stakes domains'], tips: ['Three-layer evaluation: automated (RAGAS) + expert review + continuous monitoring'] },
        ],
        problemSolving: [
          { question: 'Your RAG system hallucinates less but says "I don\'t know" too often (60% of queries). How do you balance coverage and accuracy?', answer: '1) Lower the confidence threshold gradually while monitoring hallucination rate. 2) Improve retrieval to provide better context for more queries. 3) Add query rewriting to help retrieve relevant docs for difficult queries. 4) Increase the number of retrieved chunks. 5) Fine-tune the LLM to be more confident when given even partial relevant context. 6) Use a stronger LLM for generation that can work with imperfect retrievals.', explanation: 'There\'s always a trade-off between coverage and accuracy. The goal is to find the optimal balance for your use case through systematic experimentation.', discussionPoints: ['What is the acceptable hallucination rate for your domain?', 'How to communicate uncertainty to users effectively?'], commonMistakes: ['Lowering thresholds without monitoring hallucination rate'], tips: ['Track both metrics together on a precision-recall curve — find the elbow point for your use case'] },
        ],
      },
      virtualLab: {
        title: 'Advanced RAG Optimization Lab', description: 'Interactive simulation showing how different optimization techniques affect RAG quality',
        steps: [
          { name: 'Basic RAG', description: 'Start with a simple RAG pipeline baseline', animation: 'Simple pipeline with basic retrieval and generation' },
          { name: 'Hybrid Search', description: 'Add keyword search alongside semantic search', animation: 'Two parallel retrieval paths merge results' },
          { name: 'Re-ranking', description: 'Add cross-encoder re-ranker for better precision', animation: 'Retrieved results filtered through re-ranker' },
          { name: 'HITL Feedback', description: 'Add human feedback collection and analysis', animation: 'Feedback buttons appear, data flows to analytics' },
          { name: 'Evaluation', description: 'Run RAGAS evaluation to measure improvement', animation: 'Dashboard shows before/after scores' },
        ],
        parameters: [
          { name: 'retrievalK', label: 'Retrieval K', type: 'slider', min: 5, max: 50, step: 5, default: 20 },
          { name: 'useHybrid', label: 'Hybrid Search', type: 'select', default: 'Yes', options: ['Yes', 'No'] },
          { name: 'useReranker', label: 'Use Re-ranker', type: 'select', default: 'Yes', options: ['Yes', 'No'] },
        ],
        controls: { reset: true, playPause: false, speed: false, compare: true },
      },
      insights: {
        keyInsights: ['Advanced retrieval (hybrid search, re-ranking) significantly improves RAG quality', 'RAGAS provides systematic evaluation across faithfulness, relevance, and precision', 'Human-in-the-loop is essential for responsible AI deployment in high-stakes applications'],
        advantages: ['Systematic quality improvement through evaluation-driven iteration', 'Human feedback creates continuous learning loops', 'Reduced hallucination rates through better retrieval and verification'],
        disadvantages: ['Increased system complexity and latency', 'Human feedback infrastructure requires ongoing maintenance', 'Evaluation datasets need regular updates to stay relevant'],
        improvements: ['Active learning to select the most informative queries for human review', 'Automatic prompt optimization based on feedback patterns', 'Self-critical RAG that verifies its own outputs before responding'],
        futureScope: ['Fully automated RAG quality optimization with RL', 'Real-time hallucination detection and correction', 'Collaborative RAG where multiple models verify each other\'s outputs'],
        industrialApplications: ['Enterprise knowledge bases with continuous quality monitoring', 'Customer-facing chatbots with human escalation', 'Regulatory compliance documentation assistants', 'Medical literature review and synthesis tools'],
        researchOpportunities: ['Better evaluation metrics beyond RAGAS', 'Online learning from human feedback', 'Explainable retrieval decisions', 'Multi-hop reasoning through multiple retrieved documents'],
        careerRelevance: 'RAG evaluation and optimization is a cutting-edge skill. As RAG becomes the standard enterprise AI architecture, experts who can systematically improve RAG quality and deploy responsible AI systems are increasingly valuable.',
      },
    },
  ],
};

export default day5Module;
