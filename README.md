# LLM & SLM Workshop - Interactive Learning Platform

A premium static web application for delivering a 6-day intensive workshop on **Large Language Models (LLMs) and Small Language Models (SLMs)**. Built for classroom teaching with 60 students, projector-optimized, responsive across all devices.

## Tech Stack

- **React 19** + **Vite 8** + **TypeScript**
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **KaTeX** for mathematical equations
- **Lucide React** for icons
- **React Router v7** for navigation

## Features

- Home Page with Resource Person link
- Subject Overview & Prerequisite Mapping
- Module Navigation (6 Days)
- Topic Learning Interface with 8 sections:
  - Prerequisites & Connections
  - Storytelling with Analogies
  - Mathematical Modelling (LaTeX equations)
  - Activity-Based Learning (4 levels)
  - Project-Based Learning
  - Question Bank (Conceptual, Numerical, Application)
  - Virtual Lab with interactive parameters
  - Key Insights & Career Relevance
- Learning Analytics Dashboard
- Topic Dependency Graph
- Human-in-the-Loop Feedback Interface
- Dark/Light mode toggle
- Fully responsive (Desktop, Tablet, Mobile)
- Projector-optimized typography

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ActivitySection.tsx
│   ├── Header.tsx
│   ├── MathEquation.tsx
│   ├── ProjectSection.tsx
│   ├── QuestionSection.tsx
│   └── Sidebar.tsx
├── data/
│   └── courseData.ts  # All course content
├── layouts/
│   └── MainLayout.tsx
├── pages/
│   ├── Home.tsx
│   ├── ModuleView.tsx
│   ├── TopicView.tsx
│   ├── SubjectOverview.tsx
│   ├── LearningAnalytics.tsx
│   ├── FeedbackInterface.tsx
│   ├── DependencyGraph.tsx
│   ├── PrerequisiteMapping.tsx
│   ├── QuestionBankView.tsx
│   └── InsightsView.tsx
├── types/
│   └── index.ts       # TypeScript type definitions
├── App.tsx            # Route definitions
├── main.tsx           # Entry point
└── index.css          # Global styles + Tailwind
```

## Deployment

### GitHub

```bash
git init
git add -A
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

### Vercel (via GitHub)

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Framework preset: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**

The `vercel.json` in the root is already configured for SPA routing.

## License

MIT
