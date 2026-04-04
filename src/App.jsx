import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import { useGitHub } from './hooks/useGitHub'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import GitHubStats from './components/GitHubStats'
import RepoGrid from './components/RepoGrid'
import LanguageChart from './components/LanguageChart'
import Contact from './components/Contact'
import Certificates from './components/Certificates'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import ScrollReveal from './components/ScrollReveal'
import LiquidBackground from './components/LiquidBackground'

/* ═══════════════════════════════════════════
   PREMIUM MAGNETIC CURSOR WITH TRAIL
═══════════════════════════════════════════ */
function MagneticCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const trailCanvas = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, rx: 0, ry: 0 })
  const trailPoints = useRef([])
  const isHovering = useRef(false)
  const isClicking = useRef(false)

  useEffect(() => {
    const canvas = trailCanvas.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H
    let raf

    const TRAIL_LENGTH = 22
    const TRAIL_COLORS = [
      'rgba(56,189,248,', // sky
      'rgba(167,139,250,', // violet
      'rgba(244,114,182,', // pink
      'rgba(52,211,153,',  // emerald
    ]

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
    }
    window.addEventListener('resize', onResize)

    const move = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY

      // Add trail point
      trailPoints.current.push({
        x: e.clientX, y: e.clientY,
        life: 1, size: Math.random() * 3 + 1.5,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5,
        color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)],
      })
      if (trailPoints.current.length > 80) trailPoints.current.shift()

      // Move dot instantly
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX - 5}px,${e.clientY - 5}px)`
      }
    }

    const onMouseDown = () => {
      isClicking.current = true
      if (ring.current) {
        ring.current.style.width = '22px'
        ring.current.style.height = '22px'
        ring.current.style.borderColor = 'rgba(56,189,248,0.8)'
        ring.current.style.borderWidth = '2.5px'
      }
      if (dot.current) {
        dot.current.style.transform = `translate(${mouseRef.current.x - 5}px,${mouseRef.current.y - 5}px) scale(0.6)`
      }
      // Burst particles on click
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8
        trailPoints.current.push({
          x: mouseRef.current.x, y: mouseRef.current.y,
          life: 1, size: Math.random() * 4 + 2,
          vx: Math.cos(angle) * (2 + Math.random() * 2),
          vy: Math.sin(angle) * (2 + Math.random() * 2),
          color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)],
        })
      }
    }

    const onMouseUp = () => {
      isClicking.current = false
      if (ring.current) {
        ring.current.style.width = isHovering.current ? '52px' : '34px'
        ring.current.style.height = isHovering.current ? '52px' : '34px'
        ring.current.style.borderColor = isHovering.current ? 'rgba(56,189,248,0.65)' : 'rgba(56,189,248,0.4)'
        ring.current.style.borderWidth = '1.5px'
      }
      if (dot.current) {
        dot.current.style.transform = `translate(${mouseRef.current.x - 5}px,${mouseRef.current.y - 5}px) scale(1)`
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    // Magnetic + hover effects on interactive elements
    const grow = () => {
      isHovering.current = true
      if (ring.current && !isClicking.current) {
        ring.current.style.width = '52px'
        ring.current.style.height = '52px'
        ring.current.style.borderColor = 'rgba(56,189,248,0.65)'
      }
      if (dot.current) {
        dot.current.style.background = 'var(--c2)'
        dot.current.style.boxShadow = '0 0 12px rgba(167,139,250,0.6)'
      }
    }
    const shrink = () => {
      isHovering.current = false
      if (ring.current && !isClicking.current) {
        ring.current.style.width = '34px'
        ring.current.style.height = '34px'
        ring.current.style.borderColor = 'rgba(56,189,248,0.4)'
      }
      if (dot.current) {
        dot.current.style.background = 'var(--c1)'
        dot.current.style.boxShadow = 'none'
      }
    }

    const interactiveEls = document.querySelectorAll('a,button,[role="button"],.lg-hover,.glow-border')
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    // Animation loop
    const animate = () => {
      const m = mouseRef.current
      m.rx += (m.x - m.rx) * 0.1
      m.ry += (m.y - m.ry) * 0.1

      if (ring.current) {
        const ringW = parseFloat(ring.current.style.width || 34)
        ring.current.style.transform = `translate(${m.rx - ringW / 2}px,${m.ry - ringW / 2}px)`
      }

      // Draw trail particles
      ctx.clearRect(0, 0, W, H)
      const points = trailPoints.current
      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.02 // gravity
        p.vx *= 0.98 // friction
        p.life -= 0.025

        if (p.life <= 0) {
          points.splice(i, 1)
          continue
        }

        const alpha = p.life * 0.6
        // Glow
        ctx.save()
        ctx.globalAlpha = alpha * 0.4
        ctx.fillStyle = `${p.color}1)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fill()
        // Core
        ctx.globalAlpha = alpha
        ctx.fillStyle = `${p.color}1)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  }, [])

  return (
    <>
      <canvas
        ref={trailCanvas}
        style={{
          position: 'fixed', inset: 0, width: '100%', height: '100%',
          zIndex: 9997, pointerEvents: 'none',
        }}
      />
      <div id="cursor" ref={dot} />
      <div id="cursor-ring" ref={ring} />
    </>
  )
}

/* ═══════════════════════════════════════════
   PREMIUM CINEMATIC LOADING SCREEN
═══════════════════════════════════════════ */
function LoadingScreen({ isLoaded, onDone }) {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0) // 0=loading, 1=fading

  // Simulate smooth progress bar
  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        if (isLoaded) return Math.min(p + 8, 100)
        return Math.min(p + Math.random() * 3.5, 88) // slow climb to 88% until loaded
      })
    }, 60)
    return () => clearInterval(iv)
  }, [isLoaded])

  // Trigger exit animation when progress hits 100
  useEffect(() => {
    if (progress >= 100 && phase === 0) {
      setPhase(1)
      setTimeout(onDone, 1200)
    }
  }, [progress, phase, onDone])

  return (
    <div ref={ref} style={{
      position:'fixed', inset:0, zIndex:9999,
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      background:'var(--bg)', gap:'2.5rem',
      opacity: phase === 1 ? 0 : 1,
      transform: phase === 1 ? 'scale(1.08)' : 'scale(1)',
      transition:'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
      pointerEvents: phase === 1 ? 'none' : 'auto',
    }}>
      {/* Background grid lines */}
      <div style={{
        position:'absolute', inset:0, opacity:0.04,
        backgroundImage:'linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)',
        backgroundSize:'80px 80px',
      }}/>

      {/* Floating orbs */}
      <div style={{ position:'absolute', top:'20%', left:'25%', width:200, height:200, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(56,189,248,0.08), transparent 70%)',
        animation:'drift 18s ease-in-out infinite alternate', filter:'blur(40px)' }}/>
      <div style={{ position:'absolute', bottom:'20%', right:'20%', width:260, height:260, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(167,139,250,0.08), transparent 70%)',
        animation:'drift 22s ease-in-out infinite alternate-reverse', filter:'blur(50px)' }}/>

      {/* Animated logo */}
      <div style={{
        width:80, height:80, borderRadius:'22px', position:'relative',
        background:'linear-gradient(135deg,rgba(56,189,248,0.12),rgba(167,139,250,0.12))',
        border:'1px solid rgba(56,189,248,0.25)',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'2.2rem',
        animation:'float 3s ease-in-out infinite, pulse-glow 2.5s ease infinite',
        boxShadow:'0 20px 60px rgba(56,189,248,0.15)',
      }}>
        ⚡
        {/* Spinning ring around logo */}
        <div style={{
          position:'absolute', inset:'-8px', borderRadius:'26px',
          border:'1px dashed rgba(56,189,248,0.25)',
          animation:'spin-slow 12s linear infinite',
        }}/>
      </div>

      {/* Text */}
      <div style={{ textAlign:'center', position:'relative' }}>
        <p style={{
          fontFamily:'var(--font-mono)', color:'var(--c1)', fontSize:'0.72rem',
          letterSpacing:'0.22em', marginBottom:'0.6rem', textTransform:'uppercase',
          animation:'fadeUp 0.8s 0.2s both',
        }}>INITIALIZING PORTFOLIO</p>
        <p style={{
          fontFamily:'var(--font-mono)', color:'var(--muted)', fontSize:'0.65rem',
          letterSpacing:'0.08em',
          animation:'fadeUp 0.8s 0.4s both',
        }}>Fetching data from GitHub API...</p>
      </div>

      {/* Progress bar */}
      <div style={{
        width:'280px', position:'relative',
        animation:'fadeUp 0.8s 0.5s both',
      }}>
        <div style={{
          width:'100%', height:'3px', background:'rgba(255,255,255,0.06)',
          borderRadius:'100px', overflow:'hidden',
        }}>
          <div style={{
            height:'100%', borderRadius:'100px',
            background:'linear-gradient(90deg,var(--c1),var(--c2),var(--c3))',
            backgroundSize:'200% auto',
            width:`${progress}%`,
            transition:'width 0.15s ease-out',
            animation:'shimmer 2s linear infinite',
          }}/>
        </div>
        <div style={{
          display:'flex', justifyContent:'space-between', marginTop:'0.5rem',
        }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem',
            color:'var(--muted)', letterSpacing:'0.05em' }}>
            {progress < 30 ? 'Connecting...' : progress < 70 ? 'Loading repos...' : progress < 95 ? 'Building UI...' : 'Ready!'}
          </span>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem',
            color:'var(--c1)', letterSpacing:'0.05em', fontWeight:600 }}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  )
}

function ErrorScreen({ error }) {
  return (
    <div style={{ minHeight:'100vh',display:'flex',flexDirection:'column',
      alignItems:'center',justifyContent:'center',
      background:'var(--bg)',gap:'1.5rem',padding:'2rem',textAlign:'center' }}>
      <div style={{ fontSize:'3rem' }}>⚠️</div>
      <div>
        <h2 style={{ color:'var(--c3)',fontFamily:'var(--font-mono)',marginBottom:'0.75rem',fontSize:'1rem' }}>
          Failed to load GitHub data
        </h2>
        <p style={{ color:'var(--muted)',fontFamily:'var(--font-mono)',fontSize:'0.8rem',marginBottom:'0.5rem' }}>{error}</p>
        <p style={{ color:'var(--muted)',fontSize:'0.75rem',fontFamily:'var(--font-mono)',opacity:0.6 }}>
          Make sure VITE_GITHUB_USERNAME is set in your .env file
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const { profile, repos, languages, loading, error } = useGitHub()
  const { theme, toggle } = useTheme()
  const [showLoading, setShowLoading] = useState(true)
  const handleLoadingDone = useCallback(() => setShowLoading(false), [])

  // Lenis smooth scroll
  useEffect(() => {
    if (showLoading || loading) return
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [showLoading, loading])

  if (error) return <ErrorScreen error={error}/>

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
          <MagneticCursor/>
          <ParticleBackground theme={theme}/>

          <LiquidBackground />

          <Navbar theme={theme} toggleTheme={toggle}/>

          <main>
            <ScrollReveal direction="up" duration={0.9} distance={50}>
              <Hero profile={profile}/>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1} duration={0.8} distance={45}>
              <About profile={profile}/>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.05} duration={0.8} distance={40}>
              <GitHubStats profile={profile} repos={repos}/>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.05} duration={0.8} distance={40}>
              <RepoGrid repos={repos}/>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.1} duration={0.9} distance={50}>
              <LanguageChart languages={languages}/>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1} duration={0.9} distance={45}>
              <Certificates />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1} duration={0.9} distance={45}>
              <Contact profile={profile}/>
            </ScrollReveal>
          </main>

          <ScrollReveal direction="up" delay={0.1} duration={0.6} distance={25}>
            <Footer theme={theme}/>
          </ScrollReveal>
        </div>
      )}
    </>
  )
}
