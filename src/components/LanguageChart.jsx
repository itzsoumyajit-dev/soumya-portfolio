import { useRef, useState, useEffect } from 'react'
import { SectionTitle } from './GitHubStats'

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

export default function LanguageChart({ languages }) {
  const [sectionRef, sectionVisible] = useInView()
  const total = Object.values(languages).reduce((a,b) => a+b, 0)
  if (!total) return null

  const sorted = Object.entries(languages)
    .sort(([,a],[,b]) => b - a)
    .slice(0, 8)

  return (
    <section id="languages" className="st-section st-section-dark" style={{ paddingTop: '2rem' }}>
      <div className="st-section-content">
        <div ref={sectionRef} style={{
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <p className="st-mono-label" style={{ marginBottom: '1rem' }}>// languages</p>
          <h3 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            marginBottom: '2.5rem',
          }}>
            Code <span className="st-accent-text">Distribution</span>
          </h3>

          {/* Language bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sorted.map(([lang, bytes], i) => {
              const pct = ((bytes / total) * 100).toFixed(1)
              const color = LC[lang] || '#6B6B6B'
              return (
                <div key={lang} style={{
                  animation: sectionVisible ? `fadeUp 0.5s ${i * 0.08}s cubic-bezier(0.16,1,0.3,1) both` : 'none',
                }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: '0.4rem',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: color, flexShrink: 0,
                      }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{lang}</span>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#6B6B6B',
                    }}>
                      {pct}%
                    </span>
                  </div>
                  <div style={{
                    width: '100%', height: '4px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '4px', overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: sectionVisible ? `${pct}%` : '0%',
                      background: color,
                      borderRadius: '4px',
                      transition: `width 1s ${i * 0.1}s cubic-bezier(0.16,1,0.3,1)`,
                    }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
