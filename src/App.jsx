import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import { useGitHub } from './hooks/useGitHub'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import GitHubStats from './components/GitHubStats'
import RepoGrid from './components/RepoGrid'
import LanguageChart from './components/LanguageChart'
import Contact from './components/Contact'
import Certificates from './components/Certificates'
import Footer from './components/Footer'

/* ═══════════════════════════════════════════
   CUSTOM CURSOR (StringTune style)
═══════════════════════════════════════════ */
function MagneticCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, rx: 0, ry: 0 })
  const isHovering = useRef(false)

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    let raf

    const move = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX - 5}px,${e.clientY - 5}px)`
      }
    }

    const onMouseDown = () => {
      if (ring.current) {
        ring.current.style.width = '22px'
        ring.current.style.height = '22px'
        ring.current.style.borderColor = 'rgba(230,57,70,0.8)'
      }
    }

    const onMouseUp = () => {
      if (ring.current) {
        ring.current.style.width = isHovering.current ? '48px' : '34px'
        ring.current.style.height = isHovering.current ? '48px' : '34px'
        ring.current.style.borderColor = isHovering.current ? 'rgba(230,57,70,0.6)' : 'rgba(230,57,70,0.4)'
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    const grow = () => {
      isHovering.current = true
      if (ring.current) {
        ring.current.style.width = '48px'
        ring.current.style.height = '48px'
        ring.current.style.borderColor = 'rgba(230,57,70,0.6)'
      }
    }
    const shrink = () => {
      isHovering.current = false
      if (ring.current) {
        ring.current.style.width = '34px'
        ring.current.style.height = '34px'
        ring.current.style.borderColor = 'rgba(230,57,70,0.4)'
      }
    }

    // Delayed setup for interactive elements
    setTimeout(() => {
      const els = document.querySelectorAll('a,button,[role="button"],.nav-btn,.info-btn')
      els.forEach(el => {
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }, 2000)

    const animate = () => {
      const m = mouseRef.current
      m.rx += (m.x - m.rx) * 0.12
      m.ry += (m.y - m.ry) * 0.12
      if (ring.current) {
        const w = parseFloat(ring.current.style.width || 34)
        ring.current.style.transform = `translate(${m.rx - w / 2}px,${m.ry - w / 2}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div id="cursor" ref={dot} />
      <div id="cursor-ring" ref={ring} />
    </>
  )
}

/* ═══════════════════════════════════════════
   LOADING SCREEN (StringTune style)
═══════════════════════════════════════════ */
function LoadingScreen({ isLoaded, onDone }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        if (isLoaded) return Math.min(p + 8, 100)
        return Math.min(p + Math.random() * 3.5, 88)
      })
    }, 60)
    return () => clearInterval(iv)
  }, [isLoaded])

  useEffect(() => {
    if (progress >= 100 && phase === 0) {
      setPhase(1)
      setTimeout(onDone, 900)
    }
  }, [progress, phase, onDone])

  return (
    <div className="st-loading" style={{
      opacity: phase === 1 ? 0 : 1,
      transform: phase === 1 ? 'scale(1.05)' : 'scale(1)',
      transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
      pointerEvents: phase === 1 ? 'none' : 'auto',
    }}>
      <div className="st-loading-logo">⚡</div>

      <div style={{ textAlign: 'center' }}>
        <p className="st-loading-text" style={{ marginBottom: '0.5rem' }}>
          INITIALIZING PORTFOLIO
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          color: '#3A3A3A', letterSpacing: '0.06em',
        }}>
          Fetching data from GitHub API...
        </p>
      </div>

      <div style={{ width: 200 }}>
        <div className="st-loading-bar-wrap">
          <div className="st-loading-bar" style={{ width: `${progress}%` }} />
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#4A4A4A',
          }}>
            {progress < 30 ? 'Connecting...' : progress < 70 ? 'Loading repos...' : progress < 95 ? 'Building UI...' : 'Ready!'}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
            color: 'var(--accent)', fontWeight: 600,
          }}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   ERROR SCREEN
═══════════════════════════════════════════ */
function ErrorScreen({ error }) {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#050505', gap: '1.5rem', padding: '2rem', textAlign: 'center',
    }}>
      <div style={{ fontSize: '3rem' }}>⚠️</div>
      <div>
        <h2 style={{
          color: 'var(--accent)', fontFamily: 'var(--font-mono)',
          marginBottom: '0.75rem', fontSize: '1rem',
        }}>
          Failed to load GitHub data
        </h2>
        <p style={{ color: '#6B6B6B', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{error}</p>
        <p style={{ color: '#4A4A4A', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          Make sure VITE_GITHUB_USERNAME is set in your .env file
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════ */
export default function App() {
  const { profile, repos, languages, loading, error } = useGitHub()
  const [showLoading, setShowLoading] = useState(true)
  const [scrollPct, setScrollPct] = useState(0)
  const [isLightSection, setIsLightSection] = useState(false)
  const handleLoadingDone = useCallback(() => setShowLoading(false), [])

  // Lenis smooth scroll
  useEffect(() => {
    if (showLoading || loading) return
    const lenis = new Lenis({
      lerp: 0.06,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [showLoading, loading])

  // Scroll progress tracker
  useEffect(() => {
    if (showLoading) return
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollPct(Math.min(pct, 100))

      // Detect if we're in the light section (stats area)
      const statsEl = document.getElementById('stats')
      if (statsEl) {
        const rect = statsEl.getBoundingClientRect()
        setIsLightSection(rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showLoading])

  if (error) return <ErrorScreen error={error} />

  return (
    <>
      {showLoading && (
        <LoadingScreen isLoaded={!loading} onDone={handleLoadingDone} />
      )}

      {!loading && (
        <div style={{
          opacity: showLoading ? 0 : 1,
          transition: 'opacity 0.8s 0.2s ease',
        }}>
          <MagneticCursor />
          <Navbar scrollPct={scrollPct} isLightSection={isLightSection} />

          <main>
            <Hero profile={profile} />
            <About profile={profile} />
            <GitHubStats profile={profile} repos={repos} />
            <RepoGrid repos={repos} />
            <LanguageChart languages={languages} />
            <Certificates />
            <Contact profile={profile} />
          </main>

          <Footer />
        </div>
      )}
    </>
  )
}
