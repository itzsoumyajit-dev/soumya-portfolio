import { useState, useRef, useEffect } from 'react'
import { FiExternalLink, FiAward } from 'react-icons/fi'
import { SectionTitle } from './GitHubStats'

const certificates = [
  {
    num: '01',
    title: 'Google Cybersecurity',
    provider: 'Google',
    desc: 'Professional Certificate verifying cybersecurity skills, covering topics from networking to security protocols.',
    year: '2026',
    link: '/GOOGLE.pdf'
  },
  {
    num: '02',
    title: 'Career Essentials in Generative AI',
    provider: 'Microsoft & LinkedIn',
    desc: 'Essential skills in Generative AI, including core concepts, applications, and ethical considerations in AI deployment.',
    year: '2026',
    link: '/GenAI_Microsoft_LinkedIn.pdf'
  },
  {
    num: '03',
    title: 'AWS Certificate',
    provider: 'Amazon Web Services',
    desc: 'Official AWS Certification demonstrating cloud expertise and foundational knowledge of AWS services.',
    year: '2026',
    link: '/aws.pdf'
  },
  {
    num: '04',
    title: 'Amazon Certificate',
    provider: 'Amazon',
    desc: 'Official learning certificate from Amazon demonstrating continued professional development.',
    year: '2026',
    link: '/Amazon.pdf'
  }
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

export default function Certificates() {
  const [sectionRef, sectionVisible] = useInView()

  return (
    <section id="certificates" className="st-section st-section-dark" style={{ paddingBottom: '4rem' }}>
      <div className="st-section-content">
        {/* Big title */}
        <div ref={sectionRef} style={{
          textAlign: 'center', marginBottom: '4rem',
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <p className="st-mono-label" style={{ marginBottom: '1.5rem' }}>
            // achievements
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}>
            Professional<br />
            <span className="st-accent-text">Certificates</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.2rem',
        }}>
          {certificates.map((cert, i) => (
            <CertCard key={cert.num} {...cert} delay={i * 0.1} visible={sectionVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertCard({ num, title, provider, desc, year, link, delay, visible }) {
  const [hov, setHov] = useState(false)

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="st-card glow-border"
      style={{
        textDecoration: 'none', color: 'inherit',
        display: 'flex', flexDirection: 'column', gap: '0.8rem',
        borderColor: hov ? 'rgba(230,57,70,0.3)' : undefined,
        boxShadow: hov ? '0 20px 50px rgba(230,57,70,0.08)' : undefined,
        transform: hov ? 'translateY(-6px) scale(1.01)' : undefined,
        animation: visible ? `fadeUp 0.55s ${delay}s cubic-bezier(0.16,1,0.3,1) both` : 'none',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, var(--accent), transparent)',
        opacity: hov ? 1 : 0.5, transition: 'opacity 0.3s',
        borderRadius: '20px 20px 0 0',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: 38, height: 38, borderRadius: '12px',
            background: 'rgba(230,57,70,0.1)',
            border: '1px solid rgba(230,57,70,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent)', flexShrink: 0,
          }}>
            <FiAward size={18} />
          </div>
          <div>
            <h3 style={{
              fontSize: '0.95rem', fontWeight: 800, margin: 0,
              display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {title}
            </h3>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              color: '#6B6B6B', letterSpacing: '0.05em',
            }}>
              {provider} · {year}
            </span>
          </div>
        </div>
        <FiExternalLink size={14} style={{
          color: hov ? 'var(--accent)' : '#6B6B6B', flexShrink: 0, marginLeft: '0.6rem',
          transform: hov ? 'translate(2px,-2px)' : 'none', transition: 'all 0.2s',
        }} />
      </div>

      <p style={{
        color: '#9A9A9A', fontSize: '0.82rem', lineHeight: 1.65, flexGrow: 1,
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {desc}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#4A4A4A',
        }}>
          {num}.
        </span>
        <span className="lg-pill" style={{
          padding: '0.25rem 0.8rem', borderRadius: '100px',
          fontSize: '0.68rem', fontFamily: 'var(--font-mono)',
          color: hov ? '#fff' : 'var(--accent)',
          background: hov ? 'var(--accent)' : 'transparent',
          border: hov ? '1px solid var(--accent)' : '1px solid rgba(230,57,70,0.3)',
          transition: 'all 0.3s',
        }}>
          View Credential ↗
        </span>
      </div>
    </a>
  )
}
