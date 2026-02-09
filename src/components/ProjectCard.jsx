export default function ProjectCard({ project }) {
  const statusClass = {
    active: 'dot-active',
    design: 'dot-design',
    planning: 'dot-planning'
  }

  return (
    <article className="project-card">
      <div className="project-status">
        <span className={`status-dot ${statusClass[project.status]}`} />
        <span className="status-text">
          {project.status === 'active'
            ? 'In Development'
            : project.status === 'design'
            ? 'Design Phase'
            : 'Planning'}
        </span>
      </div>
      <div className="project-body">
        <span className="project-category">{project.categoryLabel}</span>
        <h3 className="project-name">{project.name}</h3>
        <p className="project-tagline">{project.tagline}</p>
        <p className="project-desc">{project.description}</p>
        <div className="project-feature">
          <span className="feature-label">{project.featureLabel}</span>
          <p className="feature-text">{project.featureText}</p>
        </div>
      </div>
      <div className="project-footer">
        <div className="project-tags">
          {project.tags.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <div className="project-progress">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <span className="progress-label">{project.stage}</span>
        </div>
      </div>
    </article>
  )
}
