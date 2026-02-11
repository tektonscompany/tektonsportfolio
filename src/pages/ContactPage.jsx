import { Mail, Linkedin, Github, MapPin, ArrowRight } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="hero-label">Let's Talk</span>
          <h1 className="page-title">Contact</h1>
          <p className="page-subtitle">
            Partnerships, collaborations, or just a conversation about technology.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid-page">
            <a href="mailto:info@tektons.co.uk" className="contact-card">
              <Mail size={24} />
              <h3>Email</h3>
              <p>tektonscompany@gmail.com</p>
            </a>
            <a href="https://linkedin.com/company/tektons" target="_blank" rel="noopener noreferrer" className="contact-card">
              <Linkedin size={24} />
              <h3>LinkedIn</h3>
              <p>Follow Tektons</p>
            </a>
            <a href="https://github.com/tektonscompany" target="_blank" rel="noopener noreferrer" className="contact-card">
              <Github size={24} />
              <h3>GitHub</h3>
              <p>View Repositories</p>
            </a>
            <div className="contact-card">
              <MapPin size={24} />
              <h3>Location</h3>
              <p>Accra, Ghana</p>
            </div>
          </div>

          <div className="contact-statement">
            <div className="statement-card">
              <h2>Building with purpose</h2>
              <p>
                Tektons is a technology company focused on engineering products that solve
                real problems. We work across fintech, AI, e-commerce, and education,
                bringing disciplined engineering to ambitious ideas. If your project
                demands precision and technical depth, we should talk.
              </p>
              <a href="mailto:info@tektons.co.uk" className="btn btn-primary">
                Start a Conversation <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
