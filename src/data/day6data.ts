import type { Module } from '../types';

const day6Module: Module = {
  id: 'day6',
  day: 6,
  title: 'Deployment & Industry Capstone Project',
  subtitle: 'Build and deploy an industry-ready AI application with APIs, containers, and cloud hosting',
  objectives: [
    'Develop RESTful APIs with FastAPI for AI model serving',
    'Build user interfaces with Streamlit for AI applications',
    'Containerize applications with Docker',
    'Deploy to cloud platforms (Hugging Face Spaces, Vercel)',
    'Complete and present an end-to-end AI assistant project',
  ],
  tools: ['FastAPI', 'Streamlit', 'Docker', 'GitHub', 'Hugging Face Spaces'],
  skills: ['End-to-End AI Product Development', 'Cloud Deployment'],
  deliverable: 'Fully Deployed Domain-Specific AI Assistant',
  topics: [
    {
      id: 'day6-deployment',
      title: 'Deployment & Capstone Project',
      description: 'Learn to deploy AI applications using FastAPI, Streamlit, Docker, and cloud platforms',
      duration: '45 min',
      prerequisites: ['RAG pipeline', 'Python web basics', 'Git/GitHub'],
      dependentTopics: [] as string[],
      nextTopicPrep: 'Finalize your capstone project idea and gather all required resources',
      story: {
        analogy: 'The Restaurant Opening',
        narrative: `You've spent months perfecting your family's secret biryani recipe (the AI model). Your friends love it. Your family begs for more. But only 20 people have ever tasted it. How do you serve it to the entire city?

First, you need a kitchen that can scale — not just your home stove (FastAPI backend that handles multiple requests). You need waiters who can take orders and explain the menu (Streamlit or React frontend). You need standardized containers for delivery (Docker) so the biryani tastes the same whether it's cooked in your kitchen or a cloud kitchen.

But here's the catch: your biryani needs to stay hot during delivery (low latency). Some customers want it spicier, some milder (user customization via parameters). Some nights are busier than others (auto-scaling). And you need a way to get feedback: "This biryani was too salty" (error logging and monitoring).

Finally, you open on a platform like Swiggy/Zomato (Hugging Face Spaces / cloud platform). Now the entire city can enjoy your biryani — your AI model is live, serving real users, making a real impact. Congratulations — you're an AI entrepreneur!`,
        reflectiveQuestions: [
          'What are the key differences between a model in a notebook and a deployed model serving users?',
          'Why is containerization important for deployment?',
          'What monitoring would you need for a production AI application?',
        ],
        connection: 'Deployment transforms a working prototype into a production service. It involves API development, frontend building, containerization, cloud hosting, and ongoing monitoring — the full lifecycle of an AI product.',
        technicalExplanation: [
          'FastAPI provides high-performance async API endpoints for model inference with automatic OpenAPI documentation',
          'Streamlit enables rapid UI development for AI applications with Python-only code',
          'Docker containerization ensures consistent environments from development to production',
          'Hugging Face Spaces and cloud platforms (AWS, GCP, Azure) provide scalable hosting infrastructure',
          'CI/CD pipelines automate testing and deployment for rapid iteration',
        ],
        lifeSkills: 'Deployment teaches the difference between "it works on my machine" and "it works for everyone." Taking a project from prototype to production requires attention to reliability, scalability, security, and user experience.',
      },
      mathModeling: {
        need: 'Understanding deployment infrastructure helps design systems that scale reliably under real-world usage.',
        motivation: 'A model that isn\'t deployed has zero impact. Deployment math (latency, throughput, cost) determines whether your AI solution is practically useful.',
        realWorldChallenges: ['Managing inference latency under concurrent user load', 'Handling model versioning and A/B testing', 'Monitoring for drift and degradation over time'],
        technicalChallenges: ['GPU memory management for multiple concurrent inferences', 'Cold start latency for serverless deployments', 'Cost optimization for API-based models'],
        advantages: ['Reach unlimited users simultaneously', 'Easy updates via API versioning', 'Usage analytics for continuous improvement'],
        limitations: ['Infrastructure costs scale with usage', 'Network latency for API calls', 'Dependency on cloud provider reliability'],
        equations: [],
        interactiveParams: [
          { name: 'concurrentUsers', label: 'Concurrent Users', min: 1, max: 1000, step: 10, default: 100 },
          { name: 'latencyPerRequest', label: 'Latency per Request (ms)', min: 100, max: 10000, step: 100, default: 1000 },
          { name: 'costPerToken', label: 'Cost per 1K Tokens ($)', min: 0.001, max: 0.1, step: 0.001, default: 0.002 },
        ],
      },
      activities: {
        levels: [
          {
            level: 1, title: 'Teacher Demo: Full Deployment Pipeline', description: 'Live demonstration deploying a RAG application from local to cloud',
            objectives: ['See the complete deployment process', 'Understand each deployment stage'],
            instructions: ['Show local development setup', 'Build Docker container', 'Push to container registry', 'Deploy to Hugging Face Spaces', 'Test live endpoint'],
            inputs: ['Working RAG app', 'Docker setup', 'Cloud account'], expectedOutputs: ['Live deployed AI application'],
            rubrics: [{ criterion: 'Deployment understanding', weight: 50 }, { criterion: 'Troubleshooting', weight: 50 }],
            learningOutcomes: ['Understand deployment pipeline'], timeRequired: '20 min', materials: ['Projector', 'Terminal', 'Cloud access'],
          },
          {
            level: 2, title: 'Guided: Build a FastAPI Endpoint', description: 'Students build a simple API endpoint for their RAG model',
            objectives: ['Create FastAPI application', 'Implement model inference endpoint'],
            instructions: ['Setup FastAPI project structure', 'Create /predict endpoint', 'Add request/response models', 'Test with Swagger UI'],
            inputs: ['Python model code', 'FastAPI example'], expectedOutputs: ['Working FastAPI endpoint with Swagger docs'],
            rubrics: [{ criterion: 'API functionality', weight: 50 }, { criterion: 'Code quality', weight: 30 }, { criterion: 'Documentation', weight: 20 }],
            learningOutcomes: ['Build FastAPI model serving APIs'], timeRequired: '25 min', materials: ['VS Code', 'Python', 'FastAPI'],
          },
          {
            level: 3, title: 'Group: Dockerize an AI Application', description: 'Teams containerize their RAG application and test locally',
            objectives: ['Create Dockerfile for AI app', 'Build and test Docker container'],
            instructions: ['Write Dockerfile with Python dependencies', 'Add .dockerignore', 'Build Docker image', 'Run container locally', 'Test endpoint via container'],
            inputs: ['Working RAG app', 'Dockerfile template'], expectedOutputs: ['Working Docker container with RAG app'],
            rubrics: [{ criterion: 'Dockerfile quality', weight: 40 }, { criterion: 'Container functionality', weight: 30 }, { criterion: 'Optimization', weight: 30 }],
            learningOutcomes: ['Containerize AI applications'], timeRequired: '30 min', materials: ['Docker Desktop', 'RAG app code'],
          },
          {
            level: 4, title: 'Individual: Deploy to Hugging Face Spaces', description: 'Each student deploys their application to Hugging Face Spaces',
            objectives: ['Deploy application to cloud', 'Configure deployment settings'],
            instructions: ['Create Hugging Face Space', 'Connect GitHub repository', 'Configure build settings', 'Deploy and test', 'Share the public URL'],
            inputs: ['GitHub repo', 'Hugging Face account'], expectedOutputs: ['Publicly deployed AI application'],
            rubrics: [{ criterion: 'Successful deployment', weight: 50 }, { criterion: 'Application functionality', weight: 30 }, { criterion: 'Documentation', weight: 20 }],
            learningOutcomes: ['Deploy AI apps to cloud platforms'], timeRequired: '25 min', materials: ['GitHub repo', 'HF account'],
          },
        ],
      },
      project: {
        scope: 'Build and deploy an end-to-end domain-specific AI assistant as a team capstone project', feasibility: 'High — builds on all previous days',
        riskManagement: [{ risk: 'Deployment platform limitations (memory, CPU)', probability: 'Medium', impact: 'Medium', mitigation: 'Optimize model size, use quantized models' }, { risk: 'Integration issues between components', probability: 'Medium', impact: 'High', mitigation: 'Test integration early, use CI/CD pipeline' }],
        budget: [{ item: 'GPU Compute', cost: 0, currency: 'USD' }, { item: 'Cloud Hosting (HF Spaces free tier)', cost: 0, currency: 'USD' }],
        timeline: [{ phase: 'Integration', start: 'Day 6 AM', end: 'Day 6 AM', milestones: ['Combine RAG pipeline', 'Create API', 'Build UI'] }, { phase: 'Deployment', start: 'Day 6 AM', end: 'Day 6 PM', milestones: ['Dockerize', 'Deploy to cloud', 'Test live', 'Present demo'] }],
        objectives: ['Integrate all components into one application', 'Containerize with Docker', 'Deploy to a public cloud platform', 'Present the final product'],
        outcomes: ['Fully deployed domain-specific AI assistant'], methodology: ['Integration', 'Containerization', 'Deployment', 'Testing', 'Presentation'],
        teamRoles: [{ role: 'Backend Lead', responsibilities: ['API development and model integration'] }, { role: 'Frontend Lead', responsibilities: ['UI development and user experience'] }, { role: 'DevOps Lead', responsibilities: ['Docker, deployment, CI/CD'] }],
        setup: 'FastAPI + Streamlit + Docker + GitHub + Hugging Face Spaces', userManual: 'Access the deployed app URL. Upload or select a domain, ask questions, and get AI-powered answers with citations.',
      },
      questions: {
        conceptual: [
          { question: 'What is the difference between horizontal and vertical scaling for AI applications?', answer: 'Vertical scaling adds more resources (CPU, RAM, GPU) to a single server. Horizontal scaling adds more servers behind a load balancer. AI inference is typically CPU/GPU-bound, making horizontal scaling more effective for handling concurrent users, while model training benefits from vertical scaling with powerful GPUs.', explanation: 'Horizontal scaling is preferred for web APIs serving many users because it provides redundancy and can handle traffic spikes by spinning up additional instances.', discussionPoints: ['When would you choose vertical over horizontal?', 'How does auto-scaling work in practice?'], commonMistakes: ['Scaling vertically when the bottleneck is concurrent request handling'], tips: ['For inference APIs, design for horizontal scaling from day one'] },
        ],
        numerical: [
          { question: 'An API handles 100 requests/minute with 2s average latency. How many servers needed for 1000 requests/minute with <1s latency?', answer: 'Current capacity: 100/2 = 50 requests/second per server. Target: 1000 req/min = ~17 req/sec. Each server at 2s latency handles 0.5 req/sec. To handle 17 req/sec with <1s latency, each server would handle ~1 req/sec with optimized code. So: 17 servers minimum. But with auto-scaling, you\'d set min=5, max=20 to handle spikes.', explanation: 'Latency and throughput are inversely related. Reducing latency requires more parallel capacity.', discussionPoints: ['How does batching affect throughput?', 'What\'s the role of a load balancer?'], commonMistakes: ['Assuming linear scaling — adding servers doesn\'t always linearly increase throughput'], tips: ['Always load test under realistic conditions to find the actual scaling curve'] },
        ],
        application: [
          { question: 'Design a deployment architecture for a RAG chatbot that must be available 24/7 with <3s response time.', answer: '1) FastAPI backend with async endpoints for non-blocking requests. 2) Redis cache for frequent queries to reduce LLM calls. 3) Docker containers orchestrated with Kubernetes for auto-scaling. 4) Load balancer (NGINX) distributing traffic. 5) PostgreSQL for feedback and usage data. 6) Monitoring stack (Prometheus + Grafana) for latency, error rates, and usage patterns. 7) Blue-green deployment for zero-downtime updates. 8) CDN for static frontend assets.', explanation: 'Production AI systems need redundancy, caching, monitoring, and deployment strategies to maintain SLAs.', discussionPoints: ['How to handle cache invalidation when documents are updated?', 'What metrics to alert on?'], commonMistakes: ['No caching — every identical query calls the LLM'], tips: ['Cache similar query results with semantic similarity threshold, not exact match'] },
        ],
        problemSolving: [
          { question: 'Your deployed AI app is slow and returning errors under load. How do you diagnose and fix it?', answer: '1) Check monitoring dashboard — is CPU, memory, or I/O the bottleneck? 2) Examine error logs — are there timeouts, OOM errors, or API failures? 3) Test the bottleneck component in isolation (database? model inference? frontend?). 4) Common fixes: add caching for frequent queries, optimize model inference (quantization, batching), increase server count, add connection pooling for database, implement rate limiting. 5) If model inference is the bottleneck, switch to a smaller/faster model or add GPU acceleration.', explanation: 'Systematic debugging follows the "measure → identify → fix" cycle. Always measure before guessing the bottleneck.', discussionPoints: ['How to simulate production load for testing?', 'What\'s the most common deployment bottleneck for AI apps?'], commonMistakes: ['Optimizing the wrong component based on intuition rather than measurement'], tips: ['Add comprehensive logging and monitoring from day one — you can\'t fix what you can\'t measure'] },
        ],
      },
      virtualLab: {
        title: 'AI App Deployment Simulator', description: 'Interactive simulation of deploying, scaling, and monitoring an AI application',
        steps: [
          { name: 'Local Development', description: 'Build and test the application locally', animation: 'Code editor with local server running' },
          { name: 'Containerization', description: 'Package the application with Docker', animation: 'Dockerfile builds into a container image' },
          { name: 'Cloud Deployment', description: 'Deploy container to cloud platform', animation: 'Container uploads and starts on cloud server' },
          { name: 'Traffic Simulation', description: 'Simulate user traffic and monitor performance', animation: 'Request traffic graph shows usage patterns' },
          { name: 'Scaling', description: 'Auto-scale based on load', animation: 'New server instances spin up under high load' },
        ],
        parameters: [
          { name: 'serverCount', label: 'Initial Server Count', type: 'slider', min: 1, max: 20, step: 1, default: 3 },
          { name: 'trafficLevel', label: 'Simulated Traffic Level', type: 'slider', min: 1, max: 100, step: 1, default: 10 },
        ],
        controls: { reset: true, playPause: true, speed: true, compare: false },
      },
      insights: {
        keyInsights: ['Deployment is the final critical step that turns a prototype into a product', 'Containerization ensures consistency across environments', 'Monitoring and logging are essential for production AI systems', 'CI/CD enables rapid iteration while maintaining reliability'],
        advantages: ['Reach unlimited users globally', 'Easy updates and version management', 'Usage analytics drive product improvements'],
        disadvantages: ['Ongoing infrastructure costs', 'Requires DevOps expertise', 'Production debugging is harder than local debugging'],
        improvements: ['Serverless deployment for cost efficiency', 'Edge deployment for reduced latency', 'Automated canary deployments for safe rollouts'],
        futureScope: ['Federated deployment across edge devices', 'Self-healing infrastructure', 'Green AI — energy-efficient deployment'],
        industrialApplications: ['Customer-facing AI chatbots and assistants', 'Internal enterprise knowledge tools', 'Automated content generation platforms', 'AI-powered analytics dashboards'],
        researchOpportunities: ['Efficient model serving techniques', 'Federated learning deployment', 'Cost-optimized inference scheduling', 'Privacy-preserving deployment architectures'],
        careerRelevance: 'Full-stack AI deployment skills are among the most valuable in the industry. Companies need engineers who can not only build models but deploy, monitor, and maintain production AI systems.',
      },
    },
  ],
};

export default day6Module;
