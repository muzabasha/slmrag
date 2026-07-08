import { Routes, Route } from 'react-router-dom'
import { ThemeContext, useThemeState } from './hooks/useTheme'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import ModuleView from './pages/ModuleView'
import TopicView from './pages/TopicView'
import SubjectOverview from './pages/SubjectOverview'
import LearningAnalytics from './pages/LearningAnalytics'
import FeedbackInterface from './pages/FeedbackInterface'
import DependencyGraph from './pages/DependencyGraph'
import PrerequisiteMapping from './pages/PrerequisiteMapping'
import QuestionBankView from './pages/QuestionBankView'
import InsightsView from './pages/InsightsView'

function App() {
  const theme = useThemeState()

  return (
    <ThemeContext.Provider value={theme}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<SubjectOverview />} />
          <Route path="/module/:moduleId" element={<ModuleView />} />
          <Route path="/module/:moduleId/topic/:topicId" element={<TopicView />} />
          <Route path="/analytics" element={<LearningAnalytics />} />
          <Route path="/feedback" element={<FeedbackInterface />} />
          <Route path="/dependency-graph" element={<DependencyGraph />} />
          <Route path="/prerequisites" element={<PrerequisiteMapping />} />
          <Route path="/question-bank" element={<QuestionBankView />} />
          <Route path="/insights" element={<InsightsView />} />
        </Route>
      </Routes>
    </ThemeContext.Provider>
  )
}

export default App
