import { useState } from 'react'
import { projects, filters } from '../data'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const [active, setActive] = useState('all')

  const filtered =
    active === 'all'
      ? projects
      : projects.filter(p => p.category === active)

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="projects-header">
          <div>
            <span className="section-tag">Projects</span>
            <h2 className="section-title">The Venture Ecosystem</h2>
            <p className="section-subtitle">
              Five interconnected products. Each feeds intelligence to the next.
            </p>
          </div>
          <div className="filter-bar">
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
        </div>
        <div className="projects-grid">
          {filtered.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
