import { useState, useEffect } from 'react'
import { FiGithub, FiFileText } from 'react-icons/fi'

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME

export default function Navbar({ scrollPct, isLightSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['home','about','stats','repos','certificates','contact']
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.3 }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'stats', label: 'Stats' },
    { id: 'repos', label: 'Projects' },
    { id: 'certificates', label: 'Certs' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <>
      <nav className={`st-navbar ${isLightSection ? 'light' : ''}`}>
        {/* Left — Logo */}
        <a href="#home" className="nav-logo" style={{ textDecoration: 'none' }}>
          <div className="nav-logo-icon">⚡</div>
          <span className="nav-logo-text">{USERNAME || 'Portfolio'}©</span>
        </a>

        {/* Center — Nav links */}
        <div className="nav-links">
          {links.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${active === link.id ? 'active' : ''}`}
              onClick={() => setActive(link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right — Actions */}
        <div className="nav-right">
          <button className="info-btn" onClick={() => setShowInfo(true)} title="Info">
            i
          </button>

          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="nav-btn"
          >
            <FiGithub size={14} />
            GitHub
          </a>

          <span className="scroll-pct">{Math.round(scrollPct || 0)}%</span>
        </div>
      </nav>

      {/* Info Modal */}
      {showInfo && (
        <div className="info-modal-overlay" onClick={() => setShowInfo(false)}>
          <div className="info-modal" onClick={e => e.stopPropagation()}>
            <button className="info-modal-close" onClick={() => setShowInfo(false)}>✕</button>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
                Portfolio
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#6B6B6B', letterSpacing: '0.08em' }}>
                V. 2026
              </p>
            </div>

            <p style={{ color: '#9A9A9A', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              A developer portfolio built with React, Vite, and Three.js. 
              Data is fetched live from the GitHub API on every visit. 
              Inspired by the StringTune aesthetic.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer"
                className="nav-btn" style={{ fontSize: '0.78rem' }}>
                <FiGithub size={13} /> GitHub
              </a>
              <a href="/Soumyajit_Saha_Resume.pdf" target="_blank" rel="noopener noreferrer"
                className="nav-btn" style={{ fontSize: '0.78rem' }}>
                <FiFileText size={13} /> Resume
              </a>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#4A4A4A' }}>
                Built by {USERNAME} · React + Vite + Three.js
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
