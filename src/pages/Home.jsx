import { Link } from 'react-router-dom'
import { ArrowRight, PieChart, Code, GitBranch } from 'lucide-react'
import { projects } from '../data'

const pillars = [
  { icon: PieChart, title: 'Financial Architecture', text: 'Unit economics, margin design, risk mitigation' },
  { icon: Code, title: 'Technical Execution', text: 'Go, Python, React -- systems that scale to millions' },
  { icon: GitBranch, title: 'Ecosystem Thinking', text: 'Every venture feeds intelligence to the next' }
]

export default function Home() {
  const featured = projects.slice(0, 3)

  return (
    <>
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-container">
          <div className="hero-content">
            <p className="hero-label">Tech & AI Conglomerate</p>
            <h1 className="hero-title">
              <span className="title-line">Building the Future</span>
              <span className="title-line title-accent">of West Africa</span>
            </h1>
            <p className="hero-desc">
              One intelligence core. Five interconnected ventures. Tektons LTD
              engineers scalable technology products across e-commerce, AI,
              education, agriculture and travel.
            </p>
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">
                Explore Projects <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="orbit-system">
              <div className="orbit-ring orbit-ring-1" />
              <div className="orbit-ring orbit-ring-2" />
              <div className="orbit-ring orbit-ring-3" />
              <div className="orbit-center">Core</div>
              <div className="orbit-node n1">C</div>
              <div className="orbit-node n2">R</div>
              <div className="orbit-node n3">B</div>
              <div className="orbit-node n4">A</div>
              <div className="orbit-node n5">G</div>
            </div>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-value">5</span>
            <span className="stat-label">Ventures</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">1</span>
            <span className="stat-label">Unified Core</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">5</span>
            <span className="stat-label">Sectors</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">Ghana</span>
            <span className="stat-label">Headquarters</span>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-tag">About Tektons</span>
              <h2 className="section-title">
                Engineering economic systems through technology
              </h2>
              <p className="about-text">
                Tektons LTD is a Ghanaian tech and AI startup conglomerate built
                on a single thesis: one intelligence core powering infinite
                market vectors. We combine deep financial discipline with
                technical execution to build high-margin AI products designed for
                profitability from day one.
              </p>
              <p className="about-text">
                Our dual fluency in business analytics and software engineering
                is our competitive advantage. We model unit economics before
                writing the first microservice. We stress-test the P&L while the
                codebase compiles.
              </p>
              <div className="pillars">
                {pillars.map(p => (
                  <div className="pillar" key={p.title}>
                    <div className="pillar-icon"><p.icon size={20} /></div>
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

      <section className="home-projects">
        <div className="container">
          <div className="home-projects-header">
            <div>
              <span className="section-tag">Featured</span>
              <h2 className="section-title">Active Ventures</h2>
            </div>
            <Link to="/projects" className="btn btn-outline btn-sm">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="featured-grid">
            {featured.map(p => (
              <Link to={`/projects/${p.id}`} className="featured-card" key={p.id}>
                <div className="featured-status">
                  <span className={`status-dot dot-${p.status}`} />
                  <span className="status-text">
                    {p.status === 'active' ? 'In Development' : p.status === 'design' ? 'Design Phase' : 'Planning'}
                  </span>
                </div>
                <span className="project-category">{p.categoryLabel}</span>
                <h3 className="featured-name">{p.name}</h3>
                <p className="featured-tagline">{p.tagline}</p>
                <div className="featured-bar">
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                  </div>
                  <span className="progress-label">{p.stage}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <div className="cta-card">
            <h2 className="cta-title">Ready to build the future together?</h2>
            <p className="cta-text">
              For partnerships, investment discussions, or collaboration
              opportunities.
            </p>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-primary">
                Get in Touch <ArrowRight size={18} />
              </Link>
              <Link to="/capabilities" className="btn btn-outline">
                View Capabilities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
