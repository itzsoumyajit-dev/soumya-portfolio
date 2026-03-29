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
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import ScrollReveal from './components/ScrollReveal'

function Cursor() {
  const dot  = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    let mx=0,my=0,rx=0,ry=0,raf
    const move = (e) => {
      mx=e.clientX; my=e.clientY
      if(dot.current) dot.current.style.transform=`translate(${mx-5}px,${my-5}px)`
    }
    const animate = () => {
      rx += (mx-rx)*0.11; ry += (my-ry)*0.11
      if(ring.current) ring.current.style.transform=`translate(${rx-17}px,${ry-17}px)`
      raf=requestAnimationFrame(animate)
    }
    window.addEventListener('mousemove',move)
    raf=requestAnimationFrame(animate)
    const grow   = () => { if(ring.current){ring.current.style.width='52px';ring.current.style.height='52px';ring.current.style.borderColor='rgba(56,189,248,0.65)'} }
    const shrink = () => { if(ring.current){ring.current.style.width='34px';ring.current.style.height='34px';ring.current.style.borderColor='rgba(56,189,248,0.45)'} }
    document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',grow);el.addEventListener('mouseleave',shrink)})
    return ()=>{ window.removeEventListener('mousemove',move); cancelAnimationFrame(raf) }
  },[])
  return (<><div id="cursor" ref={dot}/><div id="cursor-ring" ref={ring}/></>)
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
          <Cursor/>
          <ParticleBackground theme={theme}/>

          {/* Aurora blobs */}
          <div className="aurora">
            <div className="aurora-blob"/>
            <div className="aurora-blob"/>
            <div className="aurora-blob"/>
            <div className="aurora-blob"/>
          </div>

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
