import { useEffect, useState, useRef } from 'react'
import { FiArrowDown, FiMapPin, FiUsers, FiBookOpen, FiFileText } from 'react-icons/fi'
import HeroScene3D from './HeroScene3D'

export default function Hero({ profile }) {
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!profile) return null

  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const progress = Math.min(scrollY / (vh * 2), 1) // 0 to 1 over 2vh of scroll

  // Parallax values
  const titleOpacity = Math.max(1 - progress * 2.5, 0)
  const titleY = progress * -80
  const subtitleOpacity = Math.max(1 - progress * 3, 0)
  const nameOpacity = progress < 0.2 ? 0 : Math.min((progress - 0.2) * 3, 1)
  const nameScale = 0.85 + nameOpacity * 0.15
  const infoOpacity = progress < 0.4 ? 0 : Math.min((progress - 0.4) * 3, 1)
  const scrollHintOpacity = Math.max(1 - progress * 5, 0)

  return (
    <section id="home" ref={sectionRef} className="st-hero">
      <div className="st-hero-sticky">
        {/* 3D Background */}
        <div className="hero-3d-container">
          <HeroScene3D scrollProgress={progress} />
        </div>

        {/* Phase 1: Large intro text */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          transition: 'none',
          pointerEvents: titleOpacity < 0.1 ? 'none' : 'auto',
        }}>
          <p className="st-mono-label" style={{ marginBottom: '2rem', letterSpacing: '0.2em' }}>
            PORTFOLIO · {new Date().getFullYear()}
          </p>
          <h1 className="hero-title">
            Master<br />
            Your <span className="hero-accent">Code</span>
          </h1>
          <p className="hero-subtitle" style={{
            opacity: subtitleOpacity,
          }}>
            Crafting beautiful things on the web
          </p>
        </div>

        {/* Phase 2: Name & Profile (fades in as you scroll) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
          opacity: nameOpacity,
          transform: `scale(${nameScale})`,
          transition: 'none',
          pointerEvents: nameOpacity < 0.1 ? 'none' : 'auto',
        }}>
          {/* Avatar */}
          <div style={{
            position: 'relative',
            marginBottom: '2rem',
          }}>
            <div style={{
              position: 'absolute',
              inset: '-12px',
              borderRadius: '50%',
              border: '1px dashed rgba(230,57,70,0.25)',
              animation: 'spin-slow 20s linear infinite',
            }} />
            <img
              src={profile.avatar_url}
              alt="avatar"
              style={{
                width: 100, height: 100,
                borderRadius: '50%',
                border: '2px solid rgba(230,57,70,0.4)',
                display: 'block',
              }}
            />
            {/* Online dot */}
            <div style={{
              position: 'absolute', bottom: 4, right: 4,
              width: 14, height: 14, borderRadius: '50%',
              background: '#34d399',
              border: '2px solid #050505',
              animation: 'pulse-glow 2.5s ease infinite',
            }} />
          </div>

          {/* Name */}
          <h2 style={{
            fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            textAlign: 'center',
            marginBottom: '1rem',
          }}>
            <span className="grad-text">{profile.name || profile.login}</span>
          </h2>

          {/* Title */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.8rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{ width: 24, height: 2, background: 'var(--accent)', borderRadius: 2 }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--accent)',
              letterSpacing: '0.1em',
              fontWeight: 500,
            }}>
              Full Stack Developer
            </span>
            <div style={{ width: 24, height: 2, background: 'var(--accent)', borderRadius: 2 }} />
          </div>

          {/* Bio */}
          <p style={{
            color: '#9A9A9A',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            textAlign: 'center',
            maxWidth: 480,
            marginBottom: '2rem',
            opacity: infoOpacity,
          }}>
            {profile.bio || 'Crafting beautiful things on the web.'}
          </p>

          {/* Meta row */}
          <div style={{
            display: 'flex', gap: '1.5rem', flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '2rem',
            opacity: infoOpacity,
          }}>
            {profile.location && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem',
                color: '#6B6B6B', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                <FiMapPin size={12} style={{ color: 'var(--accent)' }} /> {profile.location}
              </span>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem',
              color: '#6B6B6B', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
              <FiUsers size={12} style={{ color: 'var(--accent)' }} /> {profile.followers} followers
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem',
              color: '#6B6B6B', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
              <FiBookOpen size={12} style={{ color: 'var(--accent)' }} /> {profile.public_repos} repos
            </span>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', opacity: infoOpacity }}>
            <a href={`https://github.com/${profile.login}`} target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                textDecoration: 'none', padding: '0.85rem 2rem',
                background: 'var(--accent)', color: '#fff',
                borderRadius: '100px', fontWeight: 700, fontSize: '0.88rem',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(230,57,70,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              View GitHub ↗
            </a>
            <a href="/Soumyajit_Saha_Resume.pdf" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                textDecoration: 'none', padding: '0.85rem 2rem',
                background: 'transparent', color: '#fff',
                borderRadius: '100px', fontWeight: 600, fontSize: '0.88rem',
                border: '1px solid rgba(255,255,255,0.15)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(230,57,70,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'none' }}
            >
              <FiFileText size={14} /> Resume
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint" style={{ opacity: scrollHintOpacity }}>
          <p>SCROLL</p>
          <FiArrowDown size={14} style={{ color: '#4A4A4A', animation: 'float 2s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  )
}
