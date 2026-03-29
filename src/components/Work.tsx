import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    num: '01',
    title: 'IMMERSIVE 3D SHOP',
    tags: ['Three.js', 'React', 'WebGL'],
    desc: 'A fully interactive 3D product showcase with physically-based rendering and real-time lighting.',
    accent: '#00e5c0',
    year: '2024',
  },
  {
    num: '02',
    title: 'GSAP ANIMATION STUDIO',
    tags: ['GSAP', 'TypeScript', 'CSS'],
    desc: 'A creative animation platform with timeline-based visual scripting and export capabilities.',
    accent: '#ff4d6d',
    year: '2024',
  },
  {
    num: '03',
    title: 'AI DASHBOARD',
    tags: ['Next.js', 'Node.js', 'TypeScript'],
    desc: 'Real-time AI analytics dashboard with WebSocket streams, D3 charts, and ML model insights.',
    accent: '#7b5ea7',
    year: '2023',
  },
  {
    num: '04',
    title: 'WEBGL PARTICLE WORLD',
    tags: ['WebGL', 'GLSL', 'JavaScript'],
    desc: 'Custom GLSL shader simulation of 500K particles responding to audio frequencies in real time.',
    accent: '#fbbf24',
    year: '2023',
  },
]

export default function Work() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-title', {
        scrollTrigger: { trigger: '.work-title', start: 'top 80%' },
        y: 60, opacity: 0, duration: 1, ease: 'power4.out',
      })
      gsap.from('.project-card', {
        scrollTrigger: { trigger: '.projects-grid', start: 'top 70%' },
        y: 80, opacity: 0, duration: 1,
        stagger: 0.15, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="work" style={{
      padding: '8rem 6vw',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div className="work-title" style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: '4rem',
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)', color: 'var(--accent)',
              fontSize: '0.72rem', letterSpacing: '0.2em', marginBottom: '1rem',
            }}>
              02 / WORK
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              lineHeight: 0.95, color: 'var(--text)', letterSpacing: '0.04em',
            }}>
              SELECTED<br/>
              <span style={{ color: 'var(--accent)' }}>PROJECTS</span>
            </h2>
          </div>
          <p style={{
            fontFamily: 'var(--font-mono)', color: 'var(--muted)',
            fontSize: '0.72rem', letterSpacing: '0.1em', maxWidth: 240,
            textAlign: 'right',
          }}>
            A SELECTION OF MY RECENT WORK IN WEB DEVELOPMENT & CREATIVE CODING
          </p>
        </div>

        {/* Marquee strip */}
        <div style={{
          overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '0.75rem 0', marginBottom: '4rem',
        }}>
          <div style={{
            display: 'flex', gap: '3rem', whiteSpace: 'nowrap',
            animation: 'marquee 18s linear infinite',
            width: 'max-content',
          }}>
            {[...Array(2)].map((_, i) =>
              ['REACT', 'TYPESCRIPT', 'THREE.JS', 'GSAP', 'WEBGL', 'NODE.JS', 'NEXT.JS', 'CSS3'].map(t => (
                <span key={`${t}-${i}`} style={{
                  fontFamily: 'var(--font-display)', fontSize: '0.85rem',
                  color: 'var(--muted)', letterSpacing: '0.15em',
                }}>
                  {t} <span style={{ color: 'var(--accent)', opacity: 0.4 }}>·</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* Projects */}
        <div className="projects-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '1.5rem',
        }}>
          {projects.map(p => (
            <ProjectCard key={p.num} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ num, title, tags, desc, accent, year }: {
  num: string; title: string; tags: string[]; desc: string; accent: string; year: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} className="project-card" data-cursor
      style={{
        padding: '2.5rem',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.background = 'rgba(255,255,255,0.05)'
        el.style.borderColor = `${accent}40`
        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = `0 24px 60px ${accent}15`
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.background = 'rgba(255,255,255,0.025)'
        el.style.borderColor = 'rgba(255,255,255,0.07)'
        el.style.transform = 'none'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Top color bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, ${accent}, transparent)`,
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
          color: accent, letterSpacing: '0.1em',
        }}>
          {num}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
          color: 'var(--muted)', letterSpacing: '0.08em',
        }}>
          {year}
        </span>
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.8rem', color: 'var(--text)',
        letterSpacing: '0.05em', marginBottom: '1rem',
        lineHeight: 1,
      }}>
        {title}
      </h3>

      <p style={{
        color: 'var(--muted2)', fontSize: '0.88rem', lineHeight: 1.7,
        marginBottom: '1.5rem',
      }}>
        {desc}
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {tags.map(t => (
          <span key={t} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            padding: '0.2rem 0.6rem', borderRadius: '3px',
            background: `${accent}12`,
            border: `1px solid ${accent}25`,
            color: accent, letterSpacing: '0.05em',
          }}>{t}</span>
        ))}
      </div>

      <div style={{
        display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
          color: accent, letterSpacing: '0.1em',
        }}>
          VIEW PROJECT ↗
        </span>
      </div>
    </div>
  )
}
