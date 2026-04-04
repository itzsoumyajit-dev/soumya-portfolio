import { useEffect, useRef, useState, useCallback } from 'react'
import { FiStar, FiGitBranch, FiEye, FiExternalLink, FiX, FiCopy, FiCheck, FiCircle, FiCalendar, FiAlertCircle, FiCode, FiGitCommit, FiClock, FiGlobe, FiTerminal, FiBox } from 'react-icons/fi'

const LC = {
  JavaScript:'#f7df1e',TypeScript:'#3178c6',Python:'#3572A5',Rust:'#dea584',
  Go:'#00ADD8',CSS:'#563d7c',HTML:'#e34c26',Java:'#b07219','C++':'#f34b7d',
  Ruby:'#701516',Shell:'#89e051',Vue:'#41b883',Svelte:'#ff3e00',Kotlin:'#7f52ff',
  Swift:'#f05138',Dart:'#00B4AB',PHP:'#777BB4','C#':'#178600',
}

const LANG_ICONS = {
  JavaScript:'⚡', TypeScript:'🔷', Python:'🐍', Rust:'🦀', Go:'🐹',
  CSS:'🎨', HTML:'🌐', Java:'☕', 'C++':'⚙️', Ruby:'💎', Shell:'🐚',
  Vue:'💚', Svelte:'🔥', Kotlin:'🟣', Swift:'🍊', Dart:'🎯', PHP:'🐘', 'C#':'🟢',
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now - d
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatSize(kb) {
  if (kb >= 1024) return (kb / 1024).toFixed(1) + ' MB'
  return kb + ' KB'
}

function AnimatedCounter({ value, duration = 1200 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!started || value === 0) return
    let start = 0
    const step = value / (duration / 16)
    const iv = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(iv) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(iv)
  }, [started, value, duration])

  return <>{count}</>
}

export default function RepoModal({ repo, onClose }) {
  const overlayRef = useRef(null)
  const [phase, setPhase] = useState('entering')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase('visible'))
    })
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleClose = useCallback(() => {
    setPhase('exiting')
    setTimeout(onClose, 400)
  }, [onClose])

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`git clone ${repo.clone_url}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (!repo) return null

  const lc = LC[repo.language] || '#8494b8'
  const langIcon = LANG_ICONS[repo.language] || '📦'
  const isVisible = phase === 'visible'

  const stagger = (i) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.5s ${0.12 + i * 0.07}s cubic-bezier(0.16,1,0.3,1), transform 0.5s ${0.12 + i * 0.07}s cubic-bezier(0.16,1,0.3,1)`,
  })

  const createdDate = new Date(repo.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        background: phase === 'exiting' ? 'rgba(0,0,0,0)' : (isVisible ? 'rgba(4,6,15,0.72)' : 'rgba(0,0,0,0)'),
        backdropFilter: isVisible && phase !== 'exiting' ? 'blur(20px) saturate(180%)' : 'blur(0px)',
        WebkitBackdropFilter: isVisible && phase !== 'exiting' ? 'blur(20px) saturate(180%)' : 'blur(0px)',
        transition: 'background 0.45s ease, backdrop-filter 0.45s ease',
      }}
    >
      <div
        className="repo-modal-card"
        style={{
          width: '100%', maxWidth: '640px', maxHeight: '88vh',
          overflowY: 'auto', overflowX: 'hidden',
          borderRadius: '28px',
          background: 'linear-gradient(165deg, rgba(24,30,54,0.95) 0%, rgba(18,22,41,0.98) 100%)',
          border: '1px solid rgba(56,189,248,0.12)',
          boxShadow: `
            0 50px 140px rgba(0,0,0,0.65),
            0 0 100px rgba(56,189,248,0.06),
            0 0 1px rgba(255,255,255,0.1),
            inset 0 1px 0 rgba(255,255,255,0.08),
            inset 0 -1px 0 rgba(0,0,0,0.3)
          `,
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          position: 'relative',
          transform: phase === 'exiting' ? 'scale(0.88) translateY(30px)' : (isVisible ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(30px)'),
          opacity: phase === 'exiting' ? 0 : (isVisible ? 1 : 0),
          transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease',
        }}
      >
        {/* ═══ Animated gradient border glow ═══ */}
        <div style={{
          position: 'absolute', inset: '-1px', borderRadius: '29px', zIndex: -1,
          background: `linear-gradient(135deg, ${lc}40, transparent 40%, transparent 60%, rgba(167,139,250,0.25))`,
          animation: 'gradient-rotate 6s linear infinite',
          backgroundSize: '200% 200%',
        }}/>

        {/* ═══ Hero header with language splash ═══ */}
        <div style={{
          position: 'relative', overflow: 'hidden',
          padding: '2rem 2rem 1.5rem', borderRadius: '28px 28px 0 0',
        }}>
          {/* Background gradient splash */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 70% 20%, ${lc}15 0%, transparent 60%),
                          radial-gradient(ellipse at 20% 80%, rgba(167,139,250,0.08) 0%, transparent 50%)`,
            pointerEvents: 'none',
          }}/>
          {/* Animated dots pattern */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.03,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            pointerEvents: 'none',
          }}/>

          {/* Close button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute', top: '1.2rem', right: '1.2rem',
              width: 40, height: 40, borderRadius: '14px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--muted)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              zIndex: 2, backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(244,114,182,0.15)'
              e.currentTarget.style.color = '#f472b6'
              e.currentTarget.style.borderColor = 'rgba(244,114,182,0.3)'
              e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              e.currentTarget.style.color = 'var(--muted)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.transform = 'none'
            }}
          >
            <FiX size={18}/>
          </button>

          {/* Language icon + badge row */}
          <div style={{ ...stagger(0), display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', position: 'relative' }}>
            <div style={{
              width: 52, height: 52, borderRadius: '16px',
              background: `linear-gradient(135deg, ${lc}22, ${lc}08)`,
              border: `1px solid ${lc}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.6rem',
              boxShadow: `0 8px 24px ${lc}20`,
            }}>
              {langIcon}
            </div>
            <div>
              {repo.language && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  padding: '0.22rem 0.75rem', borderRadius: '100px',
                  background: `${lc}15`, border: `1px solid ${lc}28`,
                  fontSize: '0.73rem', fontFamily: 'var(--font-mono)', color: lc,
                }}>
                  <FiCircle size={7} style={{ fill: lc, color: lc }}/> {repo.language}
                </span>
              )}
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.35rem' }}>
                {repo.archived && <MicroBadge text="Archived" color="#fb923c"/>}
                {repo.fork && <MicroBadge text="Fork" color="#a78bfa"/>}
                {repo.is_template && <MicroBadge text="Template" color="#34d399"/>}
              </div>
            </div>
          </div>

          {/* Repo name */}
          <h2 style={{
            ...stagger(1),
            fontSize: 'clamp(1.5rem,4.5vw,2rem)', fontWeight: 900,
            color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.15,
            paddingRight: '3rem', marginBottom: '0.75rem', position: 'relative',
          }}>
            {repo.name}
          </h2>

          {/* Description */}
          <p style={{
            ...stagger(2),
            color: 'var(--muted2)', fontSize: '0.92rem', lineHeight: 1.8,
            position: 'relative',
          }}>
            {repo.description || 'No description provided for this repository.'}
          </p>
        </div>

        {/* ═══ Content area ═══ */}
        <div style={{ padding: '0 2rem 2rem' }}>

          {/* Topics */}
          {repo.topics?.length > 0 && (
            <div style={{ ...stagger(3), display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {repo.topics.map((t, i) => (
                <span key={t} style={{
                  padding: '0.28rem 0.75rem', borderRadius: '100px',
                  background: `linear-gradient(135deg, rgba(56,189,248,${0.06 + i * 0.02}), rgba(167,139,250,${0.04 + i * 0.015}))`,
                  border: '1px solid rgba(56,189,248,0.12)',
                  fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
                  color: 'var(--c1)', letterSpacing: '0.02em',
                  transition: 'all 0.25s',
                  cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(56,189,248,0.15)'; e.currentTarget.style.borderColor = 'rgba(56,189,248,0.35)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = `linear-gradient(135deg, rgba(56,189,248,${0.06 + i * 0.02}), rgba(167,139,250,${0.04 + i * 0.015}))`; e.currentTarget.style.borderColor = 'rgba(56,189,248,0.12)'; e.currentTarget.style.transform = 'none' }}
                >{t}</span>
              ))}
            </div>
          )}

          {/* ═══ Stats cards ═══ */}
          <div style={{ ...stagger(4), display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {[
              { icon: FiStar, label: 'Stars', value: repo.stargazers_count, color: '#fbbf24', glow: 'rgba(251,191,36,0.15)' },
              { icon: FiGitBranch, label: 'Forks', value: repo.forks_count, color: '#a78bfa', glow: 'rgba(167,139,250,0.15)' },
              { icon: FiEye, label: 'Watchers', value: repo.watchers_count, color: '#34d399', glow: 'rgba(52,211,153,0.15)' },
              { icon: FiAlertCircle, label: 'Issues', value: repo.open_issues_count, color: '#fb923c', glow: 'rgba(251,146,60,0.15)' },
            ].map(({ icon: Icon, label, value, color, glow }, idx) => (
              <StatMiniCard key={label} Icon={Icon} label={label} value={value} color={color} glow={glow} visible={isVisible} delay={0.35 + idx * 0.06}/>
            ))}
          </div>

          {/* ═══ Details grid ═══ */}
          <div style={{
            ...stagger(5),
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem',
            marginBottom: '1.5rem',
          }}>
            <DetailChip icon={FiClock} label="Updated" value={formatDate(repo.updated_at)}/>
            <DetailChip icon={FiCalendar} label="Created" value={createdDate}/>
            <DetailChip icon={FiGitCommit} label="Branch" value={repo.default_branch}/>
            {repo.size > 0 && <DetailChip icon={FiBox} label="Size" value={formatSize(repo.size)}/>}
            {repo.license && <DetailChip icon={FiCode} label="License" value={repo.license.spdx_id || repo.license.name}/>}
            {repo.homepage && <DetailChip icon={FiGlobe} label="Website" value="Live" isLink href={repo.homepage}/>}
          </div>

          {/* ═══ Clone section ═══ */}
          <div style={{ ...stagger(6), marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <FiTerminal size={12} style={{ color: 'var(--c1)' }}/>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)',
                letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Quick Clone
              </span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1rem', borderRadius: '14px',
              background: 'rgba(0,0,0,0.35)',
              border: '1px solid rgba(255,255,255,0.05)',
              fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--muted2)',
              overflow: 'hidden', position: 'relative',
            }}>
              {/* Subtle gradient line at top */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.15), transparent)',
              }}/>
              <span style={{ color: 'var(--c4)', marginRight: '-0.2rem' }}>$</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                git clone {repo.clone_url}
              </span>
              <button
                onClick={handleCopy}
                style={{
                  background: copied ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${copied ? 'rgba(52,211,153,0.35)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '10px', padding: '0.4rem 0.75rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem',
                  color: copied ? '#34d399' : 'var(--muted)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                  transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)', flexShrink: 0,
                  transform: copied ? 'scale(1.05)' : 'scale(1)',
                }}
                onMouseEnter={e => { if (!copied) { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text)' } }}
                onMouseLeave={e => { if (!copied) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--muted)' } }}
              >
                {copied ? <><FiCheck size={13}/> Copied!</> : <><FiCopy size={13}/> Copy</>}
              </button>
            </div>
          </div>

          {/* ═══ Action buttons ═══ */}
          <div style={{ ...stagger(7), display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href={repo.html_url} target="_blank" rel="noreferrer"
              className="magnetic"
              style={{
                flex: 1, minWidth: '180px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                textDecoration: 'none', padding: '0.95rem 1.8rem',
                background: `linear-gradient(135deg, ${lc}, rgba(167,139,250,0.9))`,
                color: '#04060f', borderRadius: '16px', fontWeight: 800, fontSize: '0.9rem',
                boxShadow: `0 12px 40px ${lc}35, 0 0 0 0 ${lc}00`,
                transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)'
                e.currentTarget.style.boxShadow = `0 20px 60px ${lc}45, 0 0 60px ${lc}15`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = `0 12px 40px ${lc}35`
              }}
            >
              {/* Shine effect */}
              <div style={{
                position: 'absolute', top: 0, left: '-100%', width: '200%', height: '100%',
                background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                animation: 'shimmer 3s ease infinite',
                pointerEvents: 'none',
              }}/>
              <FiExternalLink size={16}/> View on GitHub ↗
            </a>
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" rel="noreferrer"
                style={{
                  flex: '0 1 auto', minWidth: '140px',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  textDecoration: 'none', padding: '0.9rem 1.6rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text)', borderRadius: '16px', fontWeight: 600, fontSize: '0.87rem',
                  transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.3)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <FiGlobe size={15}/> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══ Stat Mini Card with animated counter ═══ */
function StatMiniCard({ Icon, label, value, color, glow, visible, delay }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '1rem 0.6rem', borderRadius: '16px', textAlign: 'center',
        background: hov ? `linear-gradient(135deg, ${glow}, rgba(255,255,255,0.03))` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hov ? color + '30' : 'rgba(255,255,255,0.05)'}`,
        transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        transform: hov ? 'translateY(-4px) scale(1.04)' : 'none',
        boxShadow: hov ? `0 12px 30px ${glow}` : 'none',
        cursor: 'default',
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${delay}s` : '0s',
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: '12px', margin: '0 auto 0.55rem',
        background: `${glow}`,
        border: `1px solid ${color}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color, transition: 'all 0.3s',
        boxShadow: hov ? `0 4px 16px ${glow}` : 'none',
      }}>
        <Icon size={15}/>
      </div>
      <div style={{
        fontSize: '1.35rem', fontWeight: 900, color: hov ? color : 'var(--text)',
        fontFamily: 'var(--font-mono)', lineHeight: 1, marginBottom: '0.3rem',
        transition: 'color 0.2s',
      }}>
        <AnimatedCounter value={value}/>
      </div>
      <div style={{
        fontSize: '0.58rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)',
        letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </div>
  )
}

/* ═══ Detail Chip ═══ */
function DetailChip({ icon: Icon, label, value, isLink, href }) {
  const [hov, setHov] = useState(false)
  const Tag = isLink ? 'a' : 'div'
  const linkProps = isLink ? { href, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <Tag
      {...linkProps}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.55rem',
        padding: '0.65rem 0.8rem', borderRadius: '12px',
        background: hov ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hov ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.04)'}`,
        transition: 'all 0.25s', cursor: isLink ? 'pointer' : 'default',
        textDecoration: 'none',
      }}
    >
      <Icon size={13} style={{ color: hov ? 'var(--c1)' : 'var(--muted)', transition: 'color 0.2s', flexShrink: 0 }}/>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--muted)',
          letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.1rem' }}>{label}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem',
          color: hov ? 'var(--text)' : 'var(--muted2)', fontWeight: 600,
          transition: 'color 0.2s', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{value}</div>
      </div>
    </Tag>
  )
}

/* ═══ Micro Badge ═══ */
function MicroBadge({ text, color }) {
  return (
    <span style={{
      padding: '0.12rem 0.5rem', borderRadius: '100px',
      background: `${color}12`, border: `1px solid ${color}25`,
      fontSize: '0.6rem', fontFamily: 'var(--font-mono)',
      color, letterSpacing: '0.04em',
    }}>
      {text}
    </span>
  )
}
