import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
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
            <a href="#projects" className="btn btn-primary">
              Explore Projects <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-outline">
              Get in Touch
            </a>
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
  )
}
