import { useEffect, useRef, useState } from 'react'
import { FiStar, FiGitBranch, FiEye, FiCode, FiUsers, FiGitCommit } from 'react-icons/fi'

export function SectionTitle({ tag, title, subtitle }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <p className="st-mono-label" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>{tag}</p>
      <h2 style={{
        fontSize: 'clamp(1.9rem,4vw,2.9rem)', fontWeight: 900,
        letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: '0.8rem',
      }}>
        {title}
      </h2>
      {subtitle && <p style={{ color: 'var(--muted)', fontSize: '0.93rem', lineHeight: 1.65 }}>{subtitle}</p>}
      <div style={{
        marginTop: '1.5rem', height: '2px',
        background: 'linear-gradient(90deg, var(--accent), rgba(230,57,70,0.3), transparent)',
        borderRadius: '2px',
      }} />
    </div>
  )
}

function AnimatedNumber({ value }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0, step = value / 45
        const t = setInterval(() => {
          start += step
          if (start >= value) { setN(value); clearInterval(t) }
          else setN(Math.floor(start))
        }, 28)
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [value])
  return <span ref={ref}>{n.toLocaleString()}</span>
}

export default function GitHubStats({ profile, repos }) {
  const [sectionRef, sectionVisible] = useInViewHook()
  const totalStars    = repos.reduce((s,r) => s + r.stargazers_count, 0)
  const totalForks    = repos.reduce((s,r) => s + r.forks_count, 0)
  const totalWatchers = repos.reduce((s,r) => s + r.watchers_count, 0)
  const totalIssues   = repos.reduce((s,r) => s + r.open_issues_count, 0)

  const stats = [
    { icon: FiCode,      label: 'Public Repos',  value: profile?.public_repos ?? 0, desc: 'Open source projects built and maintained publicly.' },
    { icon: FiStar,      label: 'Total Stars',   value: totalStars, desc: 'Community endorsements across all repositories.' },
    { icon: FiGitBranch, label: 'Total Forks',   value: totalForks, desc: 'Code forked and reused by other developers.' },
    { icon: FiUsers,     label: 'Followers',     value: profile?.followers ?? 0, desc: 'Developers following the journey.' },
  ]

  return (
    <>
      {/* Wave transition dark → light */}
      <div className="wave-divider wave-dark-to-light" style={{ background: '#050505' }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,0 C360,120 1080,0 1440,80 L1440,120 L0,120 Z" />
        </svg>
      </div>

      <section id="stats" className="st-section section-light" style={{
        background: '#E6E6E6', color: '#0A0A0A',
      }}>
        <div className="st-section-content">
          {/* Big title */}
          <div ref={sectionRef} style={{
            textAlign: 'center', marginBottom: '4rem',
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <p className="st-mono-label" style={{ marginBottom: '1.5rem', color: '#6B6B6B' }}>
              BUILT TO TRACK YOUR PROGRESS, NOT FIGHT YOUR CODE
            </p>
            <h2 style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: '#0A0A0A',
            }}>
              Analytics
            </h2>
          </div>

          {/* 4-column feature grid (StringTune "Flexibility" style) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 0,
            marginBottom: '3rem',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
          }}>
            {stats.map(({ icon: Icon, label, value, desc }, i) => (
              <div key={label} className="feature-card" style={{
                borderLeft: i > 0 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                animation: sectionVisible ? `fadeUp 0.6s ${i * 0.1}s cubic-bezier(0.16,1,0.3,1) both` : 'none',
              }}>
                <p className="feature-num">({i + 1})</p>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  marginBottom: '1rem',
                }}>
                  <Icon size={18} style={{ color: '#0A0A0A' }} />
                  <span style={{
                    fontSize: '2rem', fontWeight: 900,
                    fontFamily: 'var(--font-mono)', color: '#0A0A0A',
                    lineHeight: 1,
                  }}>
                    <AnimatedNumber value={value} />
                  </span>
                </div>
                <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0A0A0A', marginBottom: '0.5rem' }}>
                  {label}
                </p>
                <p className="feature-text">{desc}</p>
              </div>
            ))}
          </div>

          {/* Contribution chart */}
          <div style={{
            background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '20px', padding: '2rem', textAlign: 'center',
          }}>
            <p className="st-mono-label" style={{
              marginBottom: '1.25rem', color: '#6B6B6B',
            }}>
              CONTRIBUTION ACTIVITY
            </p>
            <img
              src={`https://ghchart.rshah.org/e63946/${import.meta.env.VITE_GITHUB_USERNAME}`}
              alt="Contribution Chart"
              style={{
                width: '100%', maxWidth: 820, borderRadius: '10px',
                filter: 'saturate(1.2)', display: 'block', margin: '0 auto',
              }}
              onError={e => { e.target.style.display = 'none' }}
            />
          </div>
        </div>
      </section>
    </>
  )
}

function useInViewHook(threshold = 0.15) {
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
