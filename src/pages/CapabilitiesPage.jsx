import { Code, Brain, Layout, Server, ShieldCheck, Cloud, TrendingUp, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { capabilities } from '../data'

const iconMap = {
  backend: Server,
  ai: Brain,
  frontend: Layout,
  finance: TrendingUp,
  risk: ShieldCheck,
  infrastructure: Cloud,
}

export default function CapabilitiesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="hero-label">What We Build</span>
          <h1 className="page-title">Capabilities</h1>
          <p className="page-subtitle">
            Full-spectrum engineering for products that demand precision.
          </p>
        </div>
      </section>

      <section className="capabilities-section">
        <div className="container">
          <div className="capabilities-grid">
            {capabilities.map(cap => {
              const Icon = iconMap[cap.id] || Code
              return (
                <div key={cap.id} className="capability-card">
                  <div className="capability-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{cap.title}</h3>
                  <p>{cap.description}</p>
                  <ul className="capability-list">
                    {cap.items.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="method-section">
        <div className="container">
          <h2 className="section-heading">Our Process</h2>
          <p className="section-subheading">Methodical execution from concept to deployment.</p>
          <div className="method-steps">
            {[
              { num: '01', title: 'Discovery', text: 'We study the market, map requirements, and define technical boundaries before writing a single line.' },
              { num: '02', title: 'Architecture', text: 'System design, data modelling, and infrastructure planning that scales with your ambition.' },
              { num: '03', title: 'Build', text: 'Iterative sprints, continuous integration, and rigorous testing at every checkpoint.' },
              { num: '04', title: 'Deploy & Evolve', text: 'Launch with monitoring, gather real-world data, and iterate towards product-market fit.' },
            ].map(step => (
              <div key={step.num} className="method-card">
                <span className="method-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to build something?</h2>
            <p>We partner with founders and organisations that share our standards.</p>
            <Link to="/contact" className="btn btn-primary">
              Get in Touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
