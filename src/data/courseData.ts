import type { Course } from '../types';
import day1Module from './day1data';
import day2Module from './day2data';
import day3Module from './day3data';
import day4Module from './day4data';
import day5Module from './day5data';
import day6Module from './day6data';

const courseData: Course = {
  title: 'Small Language Models & Retrieval-Augmented Generation (SLM & RAG)',
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
  modules: [day1Module, day2Module, day3Module, day4Module, day5Module, day6Module],
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
