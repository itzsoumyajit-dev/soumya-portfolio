import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import HeroScene from './HeroScene'

const socials = [
  { label: 'GH',  href: '#', icon: '⌥' },
  { label: 'IN',  href: '#', icon: '⊞' },
  { label: 'X',   href: '#', icon: '✕' },
  { label: 'IG',  href: '#', icon: '◎' },
]

export default function Hero() {
  const heroRef  = useRef<HTMLElement>(null)
  const [role, setRole] = useState('ENGINEER')

  useEffect(() => {
    const roles = ['ENGINEER', 'DEVELOPER', 'CREATOR', 'BUILDER']
    let i = 0
    const iv = setInterval(() => {
      i = (i + 1) % roles.length
      setRole(roles[i])
    }, 2200)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.from('.hero-greeting', { y: 60, opacity: 0, duration: 1, ease: 'power4.out' })
        .from('.hero-name',     { y: 80, opacity: 0, duration: 1, ease: 'power4.out' }, '-=0.6')
        .from('.hero-role-wrap',{ y: 50, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
        .from('.hero-socials',  { x: -30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from('.hero-scroll',   { opacity: 0, duration: 0.6 }, '-=0.2')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} id="home" style={{
      position: 'relative', height: '100vh',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Three.js background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <HeroScene />
      </div>

      {/* Radial glow behind 3D */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw', height: '60vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,100,80,0.18) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        pointerEvents: 'none',
      }} />

      {/* Left — name */}
      <div style={{
        position: 'absolute', left: '5vw', top: '50%', transform: 'translateY(-50%)',
        zIndex: 10,
      }}>
        <p className="hero-greeting" style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
          color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '0.6rem',
        }}>
          Hello! I'm
        </p>

        <div className="hero-name" style={{ position: 'relative' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 8vw, 8rem)',
            lineHeight: 0.9, color: 'var(--text)',
            letterSpacing: '0.04em',
          }}>
            RAJESH<br/>CHITYAL
          </h1>

          {/* Glitch layers */}
          <h1 aria-hidden style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 8vw, 8rem)',
            lineHeight: 0.9, letterSpacing: '0.04em',
            position: 'absolute', inset: 0,
            color: 'var(--accent)', opacity: 0.7,
            animation: 'glitch1 6s infinite',
            pointerEvents: 'none',
          }}>
            RAJESH<br/>CHITYAL
          </h1>
          <h1 aria-hidden style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 8vw, 8rem)',
            lineHeight: 0.9, letterSpacing: '0.04em',
            position: 'absolute', inset: 0,
            color: 'var(--accent3)', opacity: 0.5,
            animation: 'glitch2 6s infinite 0.08s',
            pointerEvents: 'none',
          }}>
            RAJESH<br/>CHITYAL
          </h1>
        </div>
      </div>

      {/* Right — role */}
      <div className="hero-role-wrap" style={{
        position: 'absolute', right: '5vw', top: '50%', transform: 'translateY(-50%)',
        textAlign: 'right', zIndex: 10,
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
          color: 'var(--muted2)', letterSpacing: '0.1em', marginBottom: '0.4rem',
        }}>
          A Full Stack
        </p>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Ghost text (accent) */}
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 6vw, 6.5rem)',
            color: 'var(--accent)', opacity: 0.25,
            letterSpacing: '0.05em', lineHeight: 1,
            position: 'absolute', right: 0, bottom: '60%',
            whiteSpace: 'nowrap',
          }}>
            {role}
          </h2>
          {/* Main role */}
          <h2 key={role} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 6vw, 6.5rem)',
            color: 'var(--text)', letterSpacing: '0.05em', lineHeight: 1,
            whiteSpace: 'nowrap',
            animation: 'fadeUp 0.5s ease forwards',
          }}>
            {role}
          </h2>
        </div>
      </div>

      {/* Left side socials */}
      <div className="hero-socials" style={{
        position: 'absolute', left: '2rem', top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: '1.5rem',
        zIndex: 10,
      }}>
        {socials.map(s => (
          <a key={s.label} href={s.href} data-cursor
            style={{
              width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
              color: 'var(--muted2)', textDecoration: 'none',
              fontSize: '0.85rem', transition: 'all 0.25s',
              backdropFilter: 'blur(8px)',
              background: 'rgba(255,255,255,0.03)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.transform = 'translateX(4px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--muted2)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.transform = 'none'
            }}
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Bottom right — resume */}
      <div className="hero-scroll" style={{
        position: 'absolute', bottom: '2rem', right: '3rem',
        fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
        letterSpacing: '0.15em', color: 'var(--muted)',
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        zIndex: 10,
      }}>
        <span>SCROLL</span>
        <div style={{
          width: 1, height: 40, background: 'linear-gradient(var(--accent), transparent)',
        }} />
      </div>
    </section>
  )
}
