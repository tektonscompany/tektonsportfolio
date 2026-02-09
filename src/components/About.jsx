import { PieChart, Code, GitBranch } from 'lucide-react'

const pillars = [
  {
    icon: PieChart,
    title: 'Financial Architecture',
    text: 'Unit economics, margin design, risk mitigation'
  },
  {
    icon: Code,
    title: 'Technical Execution',
    text: 'Go, Python, React -- systems that scale to millions'
  },
  {
    icon: GitBranch,
    title: 'Ecosystem Thinking',
    text: 'Every venture feeds intelligence to the next'
  }
]

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <span className="section-tag">About Tektons</span>
            <h2 className="section-title">
              Engineering economic systems through technology
            </h2>
            <p className="about-text">
              Tektons LTD is a Ghanaian tech and AI startup conglomerate built
              on a single thesis: one intelligence core powering infinite market
              vectors. We combine deep financial discipline with technical
              execution to build high-margin AI products designed for
              profitability from day one.
            </p>
            <p className="about-text">
              Our dual fluency in business analytics and software engineering is
              our competitive advantage. We model unit economics before writing
              the first microservice. We stress-test the P&L while the codebase
              compiles.
            </p>
            <div className="pillars">
              {pillars.map(p => (
                <div className="pillar" key={p.title}>
                  <div className="pillar-icon">
                    <p.icon size={20} />
                  </div>
                  <div className="pillar-text">
                    <strong>{p.title}</strong>
                    <span>{p.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-visual">
            <div className="model-card">
              <span className="model-tag">The Model</span>
              <div className="model-core">Intelligence Core</div>
              <div className="model-flow">
                <span className="flow-in">Data In</span>
                <span className="flow-out">Products Out</span>
              </div>
              <div className="model-sectors">
                {['Commerce', 'Travel', 'Wellness', 'Education', 'Agriculture'].map(s => (
                  <span key={s} className="sector-chip">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
