export interface Topic {
  id: string;
  title: string;
  description: string;
  duration: string;
  prerequisites: string[];
  dependentTopics: string[];
  nextTopicPrep: string;
  story: StorySection;
  mathModeling: MathModelingSection;
  activities: ActivitySection;
  project: ProjectSection;
  questions: QuestionSection;
  virtualLab: VirtualLabSection;
  insights: InsightsSection;
  completed?: boolean;
}

export interface StorySection {
  analogy: string;
  narrative: string;
  reflectiveQuestions: string[];
  connection: string;
  technicalExplanation: string[];
  lifeSkills: string;
}

export interface MathModelingSection {
  need: string;
  motivation: string;
  realWorldChallenges: string[];
  technicalChallenges: string[];
  advantages: string[];
  limitations: string[];
  equations: Equation[];
  interactiveParams: InteractiveParam[];
}

export interface Equation {
  latex: string;
  symbolExplanations: { symbol: string; meaning: string }[];
  meaning: string;
  whyNeeded: string;
  interpretation: string;
  numericalExample: string;
}

export interface InteractiveParam {
  name: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
}

export interface ActivityLevel {
  level: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  objectives: string[];
  instructions: string[];
  inputs: string[];
  expectedOutputs: string[];
  rubrics: { criterion: string; weight: number }[];
  learningOutcomes: string[];
  timeRequired: string;
  materials: string[];
}

export interface ActivitySection {
  levels: ActivityLevel[];
}

export interface ProjectSection {
  scope: string;
  feasibility: string;
  riskManagement: RiskItem[];
  budget: BudgetItem[];
  timeline: TimelineItem[];
  objectives: string[];
  outcomes: string[];
  methodology: string[];
  teamRoles: TeamRole[];
  setup: string;
  userManual: string;
}

export interface RiskItem {
  risk: string;
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  mitigation: string;
}

export interface BudgetItem {
  item: string;
  cost: number;
  currency: string;
}

export interface TimelineItem {
  phase: string;
  start: string;
  end: string;
  milestones: string[];
}

export interface TeamRole {
  role: string;
  responsibilities: string[];
}

export interface QuestionItem {
  question: string;
  answer: string;
  explanation: string;
  discussionPoints: string[];
  commonMistakes: string[];
  tips: string[];
}

export interface QuestionSection {
  conceptual: QuestionItem[];
  numerical: QuestionItem[];
  application: QuestionItem[];
  problemSolving: QuestionItem[];
}

export interface VirtualLabSection {
  title: string;
  description: string;
  steps: LabStep[];
  parameters: LabParameter[];
  controls: LabControls;
}

export interface LabStep {
  name: string;
  description: string;
  animation: string;
}

export interface LabParameter {
  name: string;
  label: string;
  type: 'slider' | 'select' | 'number';
  min?: number;
  max?: number;
  step?: number;
  default: number | string;
  options?: string[];
}

export interface LabControls {
  reset: boolean;
  playPause: boolean;
  speed: boolean;
  compare: boolean;
}

export interface InsightsSection {
  keyInsights: string[];
  advantages: string[];
  disadvantages: string[];
  improvements: string[];
  futureScope: string[];
  industrialApplications: string[];
  researchOpportunities: string[];
  careerRelevance: string;
}

// Export type aliases for component usage
export type Story = StorySection;
export type MathModeling = MathModelingSection;
export type VirtualLab = VirtualLabSection;

export interface Module {
  id: string;
  day: number;
  title: string;
  subtitle: string;
  objectives: string[];
  topics: Topic[];
  tools: string[];
  skills: string[];
  deliverable: string;
}

export interface Course {
  title: string;
  subtitle: string;
  audience: string;
  prerequisites: string[];
  overallObjectives: string[];
  modules: Module[];
}
