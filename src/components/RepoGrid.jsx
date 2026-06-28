import { useState, useRef, useEffect } from 'react'
import { FiStar, FiGitBranch, FiExternalLink, FiCircle, FiEye, FiMaximize2 } from 'react-icons/fi'
import { SectionTitle } from './GitHubStats'
import RepoModal from './RepoModal'

const LC = {
  JavaScript:'#f7df1e',TypeScript:'#3178c6',Python:'#3572A5',Rust:'#dea584',
  Go:'#00ADD8',CSS:'#563d7c',HTML:'#e34c26',Java:'#b07219','C++':'#f34b7d',
  Ruby:'#701516',Shell:'#89e051',Vue:'#41b883',Svelte:'#ff3e00',Kotlin:'#7f52ff',
  Swift:'#f05138',Dart:'#00B4AB',PHP:'#777BB4','C#':'#178600',
}

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

export default function RepoGrid({ repos }) {
  const [showAll, setShowAll] = useState(false)
  const [selectedRepo, setSelectedRepo] = useState(null)
  const [sectionRef, sectionVisible] = useInView()
  const display = showAll ? repos.slice(0,18) : repos.slice(0,6)

  return (
    <>
      {/* Wave transition light → dark */}
      <div className="wave-divider wave-light-to-dark" style={{ background: '#E6E6E6' }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C480,120 960,0 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>

      <section id="repos" className="st-section st-section-dark">
        <div className="st-section-content">
          {/* Big title */}
          <div ref={sectionRef} style={{
            textAlign: 'center', marginBottom: '4rem',
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <p className="st-mono-label" style={{ marginBottom: '1.5rem' }}>
              // repositories
            </p>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: '1rem',
            }}>
              Featured<br />
              <span className="st-accent-text">Projects</span>
            </h2>
            <p style={{ color: '#6B6B6B', fontSize: '0.9rem' }}>
              {repos.length} public repositories · sorted by stars · click for details
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.1rem',
          }}>
            {display.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} delay={i * 0.06} onClick={() => setSelectedRepo(repo)} />
            ))}
          </div>

          {repos.length > 6 && (
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <button
                onClick={() => setShowAll(!showAll)}
                style={{
                  background: 'transparent',
                  cursor: 'pointer',
                  borderRadius: '100px',
                  padding: '0.75rem 2rem',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#fff',
                  letterSpacing: '0.05em',
                  border: '1px solid rgba(255,255,255,0.15)',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff' }}
              >
                {showAll ? '↑ Show Less' : `↓ Show All ${repos.length} Repos`}
              </button>
            </div>
          )}

          {selectedRepo && (
            <RepoModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
          )}
        </div>
      </section>
    </>
  )
}

function RepoCard({ repo, delay, onClick }) {
  const [hov, setHov] = useState(false)
  const cardRef = useRef(null)
  const innerRef = useRef(null)
  const glowRef = useRef(null)
  const lc = LC[repo.language] || '#6B6B6B'

  const handleMouseMove = (e) => {
    if (!cardRef.current || !innerRef.current || !glowRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // 3D Tilt calculation
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    
    innerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    glowRef.current.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(230,57,70,0.12) 0%, transparent 60%)`
    glowRef.current.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    setHov(false)
    if (innerRef.current) {
      innerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = '0'
    }
  }

  return (
    <div
      ref={cardRef}
      style={{
        animation: `fadeUp 0.55s ${delay}s cubic-bezier(0.16,1,0.3,1) both`,
        perspective: '1000px',
        zIndex: hov ? 10 : 1,
        position: 'relative',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={innerRef}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
        className="st-card glow-border"
        style={{
          display: 'flex', flexDirection: 'column', gap: '0.8rem',
          cursor: 'pointer',
          borderColor: hov ? 'rgba(230,57,70,0.3)' : undefined,
          boxShadow: hov ? '0 20px 50px rgba(230,57,70,0.12)' : undefined,
          transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
          transformStyle: 'preserve-3d',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Dynamic Glow Overlay */}
        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            transition: 'opacity 0.4s ease',
            borderRadius: 'inherit',
            opacity: 0,
            zIndex: 0,
          }}
        />

        {/* Content wrapper to float above card base */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', gap: '0.8rem', transform: 'translateZ(25px)' }}>
          {/* Top color bar */}
          <div style={{
            position: 'absolute', top: '-1.3rem', left: '-1.3rem', right: '-1.3rem', height: '2px',
            background: `linear-gradient(90deg, ${lc}, transparent)`,
            opacity: hov ? 1 : 0.4, transition: 'opacity 0.3s',
            borderRadius: '20px 20px 0 0',
          }} />

          {/* Expand hint */}
          <div style={{
            position: 'absolute', top: '-0.3rem', right: '-0.3rem',
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            padding: '0.18rem 0.55rem', borderRadius: '100px',
            background: hov ? 'rgba(230,57,70,0.12)' : 'transparent',
            border: hov ? '1px solid rgba(230,57,70,0.2)' : '1px solid transparent',
            opacity: hov ? 1 : 0,
            transition: 'all 0.3s', pointerEvents: 'none',
            transform: 'translateZ(30px)'
          }}>
            <FiMaximize2 size={9} style={{ color: 'var(--accent)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--accent)' }}>Details</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{
              fontWeight: 800, fontSize: '0.93rem',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
              color: hov ? '#fff' : 'rgba(255,255,255,0.85)', transition: 'color 0.2s',
            }}>
              {repo.name}
            </span>
            <FiExternalLink size={13} style={{
              color: hov ? 'var(--accent)' : '#6B6B6B', flexShrink: 0, marginLeft: '0.6rem',
              transform: hov ? 'translate(2px,-2px)' : 'none', transition: 'all 0.2s',
            }} />
          </div>

          <p style={{
            color: '#9A9A9A', fontSize: '0.79rem', lineHeight: 1.65, flexGrow: 1,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            transform: 'translateZ(10px)'
          }}>
            {repo.description || 'No description provided.'}
          </p>

          {repo.topics?.length > 0 && (
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', transform: 'translateZ(15px)' }}>
              {repo.topics.slice(0,3).map(t => (
                <span key={t} className="lg-pill" style={{
                  padding: '0.18rem 0.6rem', borderRadius: '100px',
                  fontSize: '0.67rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)',
                }}>{t}</span>
              ))}
            </div>
          )}

          <div style={{
            display: 'flex', gap: '1rem', fontSize: '0.73rem', color: '#6B6B6B',
            fontFamily: 'var(--font-mono)', paddingTop: '0.75rem',
            borderTop: '1px solid rgba(255,255,255,0.06)', alignItems: 'center',
            marginTop: 'auto', transform: 'translateZ(10px)'
          }}>
            {repo.language && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flex: 1 }}>
                <FiCircle size={9} style={{ color: lc, fill: lc }} />{repo.language}
              </span>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.28rem' }}>
              <FiStar size={11} style={{ color: '#fbbf24' }} />{repo.stargazers_count}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.28rem' }}>
              <FiGitBranch size={11} style={{ color: '#a78bfa' }} />{repo.forks_count}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.28rem' }}>
              <FiEye size={11} style={{ color: '#34d399' }} />{repo.watchers_count}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
