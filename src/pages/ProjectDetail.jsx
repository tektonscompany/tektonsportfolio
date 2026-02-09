import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { projects } from '../data'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)
  const currentIdx = projects.findIndex(p => p.id === id)
  const prev = currentIdx > 0 ? projects[currentIdx - 1] : null
  const next = currentIdx < projects.length - 1 ? projects[currentIdx + 1] : null

  if (!project) {
    return (
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Project Not Found</h1>
          <Link to="/projects" className="btn btn-outline" style={{ marginTop: '2rem' }}>
            <ArrowLeft size={16} /> Back to Projects
          </Link>
        </div>
      </section>
    )
  }

  const statusLabel = {
    active: 'In Development',
    design: 'Design Phase',
    planning: 'Planning'
  }

  const stages = ['Planning', 'Design', 'Implementation', 'Launch']
  const currentStageIdx = stages.findIndex(
    s => s.toLowerCase() === project.stage.toLowerCase()
  )

  return (
    <>
      <section className="page-hero page-hero-compact">
        <div className="container">
          <Link to="/projects" className="back-link">
            <ArrowLeft size={16} /> All Projects
          </Link>
          <div className="detail-header">
            <div>
              <div className="detail-meta">
                <span className="project-category">{project.categoryLabel}</span>
                <span className="detail-divider" />
                <span className={`status-dot dot-${project.status}`} />
                <span className="status-text">{statusLabel[project.status]}</span>
              </div>
              <h1 className="page-title">{project.name}</h1>
              <p className="detail-tagline">{project.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-content">
        <div className="container">
          <div className="detail-grid">
            <div className="detail-main">
              <div className="detail-section">
                <h2 className="detail-heading">Overview</h2>
                <p className="detail-text">{project.description}</p>
              </div>
              <div className="detail-section">
                <h2 className="detail-heading">{project.featureLabel}</h2>
                <div className="detail-feature-block">
                  <p className="detail-text">{project.featureText}</p>
                </div>
              </div>
            </div>
            <aside className="detail-sidebar">
              <div className="sidebar-card">
                <h3 className="sidebar-title">Development Stage</h3>
                <div className="stage-timeline">
                  {stages.map((s, i) => (
                    <div
                      key={s}
                      className={`timeline-step${i <= currentStageIdx ? ' timeline-done' : ''}${i === currentStageIdx ? ' timeline-current' : ''}`}
                    >
                      <span className="timeline-dot" />
                      <span className="timeline-label">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="progress-track" style={{ marginTop: '1rem' }}>
                  <div className="progress-fill" style={{ width: `${project.progress}%` }} />
                </div>
                <span className="progress-pct">{project.progress}% Complete</span>
              </div>
              <div className="sidebar-card">
                <h3 className="sidebar-title">Technologies</h3>
                <div className="sidebar-tags">
                  {project.tags.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="sidebar-card">
                <h3 className="sidebar-title">Category</h3>
                <span className="sidebar-category">{project.categoryLabel}</span>
              </div>
            </aside>
          </div>

          <div className="detail-nav">
            {prev ? (
              <Link to={`/projects/${prev.id}`} className="detail-nav-link prev">
                <ArrowLeft size={16} />
                <div>
                  <span className="detail-nav-label">Previous</span>
                  <span className="detail-nav-name">{prev.name}</span>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/projects/${next.id}`} className="detail-nav-link next">
                <div>
                  <span className="detail-nav-label">Next</span>
                  <span className="detail-nav-name">{next.name}</span>
                </div>
                <ArrowRight size={16} />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </>
  )
}
