import { Mail, Linkedin, Github, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-content">
            <span className="section-tag">Contact</span>
            <h2 className="section-title">Let's Build Together</h2>
            <p className="contact-text">
              For partnerships, investment discussions, or collaboration
              opportunities.
            </p>
            <div className="contact-links">
              <a href="mailto:founder@tektons.io" className="contact-link">
                <Mail size={18} />
                <span>founder@tektons.io</span>
              </a>
              <a href="#" className="contact-link">
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
              <a href="#" className="contact-link">
                <Github size={18} />
                <span>GitHub</span>
              </a>
            </div>
            <p className="contact-location">
              <MapPin size={16} /> Based in Ghana. Building for the world.
            </p>
          </div>
          <div className="contact-card">
            <div className="contact-card-inner">
              <div className="contact-card-top">
                <span className="contact-logo">T</span>
                <span className="contact-brand">Tektons LTD</span>
              </div>
              <p className="contact-card-desc">Tech & AI Conglomerate</p>
              <div className="contact-divider" />
              <p className="contact-card-tagline">
                One intelligence core. Infinite market vectors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
