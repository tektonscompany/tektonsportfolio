import {
  Server,
  Brain,
  Layout,
  TrendingUp,
  ShieldCheck,
  Cloud
} from 'lucide-react'
import { capabilities } from '../data'

const iconMap = { Server, Brain, Layout, TrendingUp, ShieldCheck, Cloud }

const steps = [
  { num: '01', label: 'Financial Model' },
  { num: '02', label: 'Technical Prototype' },
  { num: '03', label: 'Unit Economics' },
  { num: '04', label: 'Market Deploy' }
]

export default function Capabilities() {
  return (
    <section className="capabilities" id="capabilities">
      <div className="container">
        <div className="capabilities-header">
          <span className="section-tag">Capabilities</span>
          <h2 className="section-title">The Technology Stack</h2>
          <p className="section-subtitle">
            Systems engineered for scale, profitability, and resilience.
          </p>
        </div>
        <div className="capabilities-grid">
          {capabilities.map(c => {
            const Icon = iconMap[c.icon]
            return (
              <div className="capability-card" key={c.id}>
                <div className="capability-icon">
                  <Icon size={24} />
                </div>
                <h3 className="capability-name">{c.name}</h3>
                <p className="capability-stack">{c.stack}</p>
                <p className="capability-detail">{c.detail}</p>
              </div>
            )
          })}
        </div>
        <div className="methodology">
          {steps.map((s, i) => (
            <div className="method-group" key={s.num}>
              {i > 0 && <div className="method-connector" />}
              <div className="method-step">
                <span className="method-num">{s.num}</span>
                <span className="method-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
