import type { ProjectSection as ProjectSectionType } from '../types'
import { AlertTriangle, DollarSign, Calendar, Users, Target, BookOpen } from 'lucide-react'

interface Props {
  project: ProjectSectionType
}

export default function ProjectSection({ project }: Props) {
  return (
    <div className="p-6 pt-0 space-y-6">
      {/* Scope & Feasibility */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <h4 className="font-semibold text-text dark:text-text-dark mb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-project" />
            Scope
          </h4>
          <p className="text-text dark:text-text-dark">{project.scope}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <h4 className="font-semibold text-text dark:text-text-dark mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-project" />
            Feasibility
          </h4>
          <p className="text-text dark:text-text-dark">{project.feasibility}</p>
        </div>
      </div>

      {/* Risk Management */}
      <div>
        <h4 className="font-semibold text-text dark:text-text-dark mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-danger" />
          Risk Management
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border dark:border-border-dark">
                <th className="py-2 px-3 text-left text-muted dark:text-muted-dark">Risk</th>
                <th className="py-2 px-3 text-left text-muted dark:text-muted-dark">Probability</th>
                <th className="py-2 px-3 text-left text-muted dark:text-muted-dark">Impact</th>
                <th className="py-2 px-3 text-left text-muted dark:text-muted-dark">Mitigation</th>
              </tr>
            </thead>
            <tbody>
              {project.riskManagement.map((risk, i) => (
                <tr key={i} className="border-b border-border dark:border-border-dark">
                  <td className="py-2 px-3 text-text dark:text-text-dark">{risk.risk}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      risk.probability === 'High' ? 'bg-red-100 text-red-700' :
                      risk.probability === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {risk.probability}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      risk.impact === 'High' ? 'bg-red-100 text-red-700' :
                      risk.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {risk.impact}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-text dark:text-text-dark">{risk.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget */}
      <div>
        <h4 className="font-semibold text-text dark:text-text-dark mb-3 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-success" />
          Budget Estimation
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border dark:border-border-dark">
                <th className="py-2 px-3 text-left text-muted dark:text-muted-dark">Item</th>
                <th className="py-2 px-3 text-right text-muted dark:text-muted-dark">Cost</th>
                <th className="py-2 px-3 text-left text-muted dark:text-muted-dark">Currency</th>
              </tr>
            </thead>
            <tbody>
              {project.budget.map((item, i) => (
                <tr key={i} className="border-b border-border dark:border-border-dark">
                  <td className="py-2 px-3 text-text dark:text-text-dark">{item.item}</td>
                  <td className="py-2 px-3 text-right text-text dark:text-text-dark font-mono">{item.cost}</td>
                  <td className="py-2 px-3 text-text dark:text-text-dark">{item.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h4 className="font-semibold text-text dark:text-text-dark mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          Timeline
        </h4>
        <div className="space-y-3">
          {project.timeline.map((phase, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-bold text-text dark:text-text-dark">{phase.phase}</h5>
                <span className="text-sm text-muted dark:text-muted-dark">{phase.start} → {phase.end}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {phase.milestones.map((ms, j) => (
                  <span key={j} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">{ms}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Roles */}
      <div>
        <h4 className="font-semibold text-text dark:text-text-dark mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-secondary" />
          Team Roles
        </h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {project.teamRoles.map((role, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-bold text-text dark:text-text-dark mb-2">{role.role}</h5>
              <ul className="space-y-1">
                {role.responsibilities.map((resp, j) => (
                  <li key={j} className="text-sm text-text dark:text-text-dark flex items-start gap-1">
                    <span className="text-primary">•</span>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Setup & Manual */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <h4 className="font-semibold text-text dark:text-text-dark mb-2">Setup</h4>
          <p className="text-text dark:text-text-dark">{project.setup}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <h4 className="font-semibold text-text dark:text-text-dark mb-2">User Manual</h4>
          <p className="text-text dark:text-text-dark">{project.userManual}</p>
        </div>
      </div>
    </div>
  )
}
