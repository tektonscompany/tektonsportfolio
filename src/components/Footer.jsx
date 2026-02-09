import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">T</span>
            <span className="footer-name">Tektons LTD</span>
          </div>
          <div className="footer-nav">
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/capabilities">Capabilities</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>2026 Tektons LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
