import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { projects, filters } from '../data'

const statusLabel = {
  active: 'In Development',
  design: 'Design Phase',
  planning: 'Planning'
}

export default function ProjectsPage() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? projects
    : projects.filter(p => p.category === active)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-tag">Projects</span>
          <h1 className="page-title">The Venture Ecosystem</h1>
          <p className="page-subtitle">
            Five interconnected products across five sectors. Each feeds
            intelligence to the next.
          </p>
        </div>
      </section>

      <section className="projects">
        <div className="container">
          <div className="filter-bar filter-bar-center">
            {filters.map(f => (
              <button
                key={f.key}
                className={`filter-btn${active === f.key ? ' filter-active' : ''}`}
                onClick={() => setActive(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="projects-grid">
            {filtered.map(p => (
              <Link to={`/projects/${p.id}`} className="project-card" key={p.id}>
                <div className="project-status">
                  <span className={`status-dot dot-${p.status}`} />
                  <span className="status-text">{statusLabel[p.status]}</span>
                </div>
                <div className="project-body">
                  <span className="project-category">{p.categoryLabel}</span>
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-tagline">{p.tagline}</p>
                  <p className="project-desc">{p.description}</p>
                </div>
                <div className="project-footer">
                  <div className="project-tags">
                    {p.tags.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <div className="project-progress">
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="progress-label">{p.stage}</span>
                  </div>
                  <span className="card-arrow"><ArrowRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
