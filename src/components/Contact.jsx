import { useState, useRef, useEffect } from 'react'
import { FiGithub, FiMail, FiSend, FiExternalLink, FiFileText } from 'react-icons/fi'

const XIcon = ({ size=18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const LinkedInIcon = ({ size=18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const InstagramIcon = ({ size=18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const SOCIALS = [
  {
    label: 'GitHub',
    handle: '@ItzSoumyajit-dev',
    href: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`,
    Icon: FiGithub,
  },
  {
    label: 'X (Twitter)',
    handle: '@ItzSoumyajit',
    href: 'https://x.com/ItzSoumyajit',
    Icon: XIcon,
  },
  {
    label: 'LinkedIn',
    handle: 'Soumyajit Saha',
    href: 'https://www.linkedin.com/in/itz-soumyajit-soumyajit-saha-413a79337',
    Icon: LinkedInIcon,
  },
  {
    label: 'Instagram',
    handle: '@soumyajit.saha07',
    href: 'https://www.instagram.com/soumyajit.saha07/',
    Icon: InstagramIcon,
  },
]

function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

export default function Contact({ profile }) {
  const [sectionRef, sectionVisible] = useInView()

  return (
    <section id="contact" className="st-section st-section-dark" style={{ paddingBottom: '3rem' }}>
      <div className="st-section-content">
        {/* Big dramatic text */}
        <div ref={sectionRef} style={{
          textAlign: 'center',
          marginBottom: '4rem',
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <p className="st-mono-label" style={{ marginBottom: '2rem' }}>// contact</p>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
          }}>
            Let's Build<br />
            <span className="st-accent-text">Something Great</span>
          </h2>
          <p style={{
            color: '#9A9A9A', fontSize: '1rem', lineHeight: 1.75,
            maxWidth: 550, margin: '0 auto 2.5rem',
          }}>
            Whether it's a cool project, a freelance opportunity, or just a chat about tech — my inbox is always open.
          </p>

          {/* Email CTA */}
          <a
            href={`mailto:${profile?.email || 'soumyajitsaha@example.com'}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              textDecoration: 'none', padding: '0.95rem 2.5rem',
              background: 'var(--accent)', color: '#fff',
              borderRadius: '100px', fontWeight: 700, fontSize: '0.95rem',
              transition: 'all 0.3s',
              boxShadow: '0 8px 32px rgba(230,57,70,0.3)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(230,57,70,0.45)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(230,57,70,0.3)'
            }}
          >
            <FiSend size={16} />
            Say Hello ↗
          </a>
        </div>

        {/* Social links row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          opacity: sectionVisible ? 1 : 0,
          transition: 'opacity 0.8s 0.3s',
        }}>
          {SOCIALS.map(({ label, handle, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              title={`${label}: ${handle}`}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                textDecoration: 'none', padding: '0.7rem 1.3rem',
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#9A9A9A',
                fontSize: '0.82rem', fontWeight: 500,
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(230,57,70,0.4)'
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = '#9A9A9A'
                e.currentTarget.style.transform = 'none'
              }}
            >
              <Icon size={16} />
              {label}
              <FiExternalLink size={11} style={{ opacity: 0.5 }} />
            </a>
          ))}
        </div>

        {/* Resume link */}
        <div style={{ textAlign: 'center', opacity: sectionVisible ? 1 : 0, transition: 'opacity 0.8s 0.4s' }}>
          <a
            href="/Soumyajit_Saha_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              textDecoration: 'none', padding: '0.65rem 1.5rem',
              borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#9A9A9A',
              fontSize: '0.82rem', fontWeight: 500,
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = '#9A9A9A'
            }}
          >
            <FiFileText size={14} />
            View Resume
          </a>
        </div>

        {/* Fun quote */}
        <div style={{
          textAlign: 'center', marginTop: '4rem', paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          opacity: sectionVisible ? 1 : 0,
          transition: 'opacity 0.8s 0.5s',
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            color: '#6B6B6B', fontSize: '0.95rem', lineHeight: 1.7,
            marginBottom: '0.5rem',
          }}>
            "Code is like humor. When you have to explain it, it's bad."
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#4A4A4A' }}>
            — Cory House
          </p>
        </div>
      </div>
    </section>
  )
}
