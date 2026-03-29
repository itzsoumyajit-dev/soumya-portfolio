import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: 'React / Next.js', level: 95, color: '#61dafb' },
  { name: 'TypeScript',      level: 90, color: '#3178c6' },
  { name: 'Three.js / WebGL',level: 82, color: '#00e5c0' },
  { name: 'GSAP Animations', level: 88, color: '#88ce02' },
  { name: 'Node.js',         level: 85, color: '#68a063' },
  { name: 'CSS / Tailwind',  level: 92, color: '#38bdf8' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-left', {
        scrollTrigger: { trigger: '.about-left', start: 'top 75%' },
        x: -80, opacity: 0, duration: 1.2, ease: 'power4.out',
      })
      gsap.from('.about-right', {
        scrollTrigger: { trigger: '.about-right', start: 'top 75%' },
        x: 80, opacity: 0, duration: 1.2, ease: 'power4.out',
      })
      gsap.from('.skill-bar-fill', {
        scrollTrigger: { trigger: '.skills-wrap', start: 'top 70%' },
        scaleX: 0, duration: 1.5, stagger: 0.1, ease: 'power3.out',
        transformOrigin: 'left center',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="about" style={{
      minHeight: '100vh', padding: '8rem 6vw',
      display: 'flex', alignItems: 'center',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{
        maxWidth: 1200, width: '100%', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem',
      }}>
        {/* Left */}
        <div className="about-left">
          <p style={{
            fontFamily: 'var(--font-mono)', color: 'var(--accent)',
            fontSize: '0.72rem', letterSpacing: '0.2em', marginBottom: '1.5rem',
          }}>
            01 / ABOUT
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 5vw, 5rem)',
            lineHeight: 0.95, color: 'var(--text)',
            letterSpacing: '0.04em', marginBottom: '2rem',
          }}>
            FULL STACK<br/>
            <span style={{ color: 'var(--accent)' }}>ENGINEER</span>
          </h2>
          <p style={{
            color: 'var(--muted2)', lineHeight: 1.85,
            fontSize: '1rem', marginBottom: '1.5rem',
          }}>
            I'm a passionate Full Stack Developer who loves building immersive
            web experiences. I combine clean code with stunning visuals to create
            products that people love using.
          </p>
          <p style={{
            color: 'var(--muted)', lineHeight: 1.85, fontSize: '0.93rem',
          }}>
            Specializing in React, TypeScript, Three.js, and GSAP — I bring
            ideas to life through performant, accessible, and visually rich
            applications.
          </p>

          {/* Tech tags */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem',
          }}>
            {['React','TypeScript','Three.js','GSAP','WebGL','Node.js','Next.js','CSS'].map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                padding: '0.3rem 0.75rem', borderRadius: '4px',
                background: 'rgba(0,229,192,0.08)',
                border: '1px solid rgba(0,229,192,0.2)',
                color: 'var(--accent)', letterSpacing: '0.05em',
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right — skills */}
        <div className="about-right skills-wrap">
          <p style={{
            fontFamily: 'var(--font-mono)', color: 'var(--muted)',
            fontSize: '0.72rem', letterSpacing: '0.15em', marginBottom: '2rem',
          }}>
            EXPERTISE
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {skills.map(s => (
              <div key={s.name}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem' }}>
                    {s.name}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                    color: s.color,
                  }}>
                    {s.level}%
                  </span>
                </div>
                <div style={{
                  height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden',
                }}>
                  <div className="skill-bar-fill" style={{
                    height: '100%', width: `${s.level}%`,
                    background: `linear-gradient(90deg, ${s.color}88, ${s.color})`,
                    borderRadius: 2,
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '3rem',
          }}>
            {[
              { n: '3+',  label: 'Years Experience' },
              { n: '20+', label: 'Projects Built' },
              { n: '15+', label: 'Happy Clients' },
              { n: '∞',   label: 'Lines of Code' },
            ].map(s => (
              <div key={s.label} style={{
                padding: '1.25rem', borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.4rem', color: 'var(--accent)', lineHeight: 1,
                }}>
                  {s.n}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                  color: 'var(--muted)', marginTop: '0.4rem', letterSpacing: '0.06em',
                }}>
                  {s.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
