import { useState, useRef, useEffect } from 'react'
import { FiCode, FiCoffee, FiGithub, FiAward, FiZap } from 'react-icons/fi'

const SKILLS = [
  { category:'Frontend', icon:'🎨', items:['React','TypeScript','Next.js','Tailwind','Framer'] },
  { category:'Backend',  icon:'⚙️', items:['Node.js','Python','Express','FastAPI','REST'] },
  { category:'Database', icon:'🗄️', items:['PostgreSQL','MongoDB','Redis','MySQL','Firebase'] },
  { category:'DevOps',   icon:'🚀', items:['Docker','Git','CI/CD','Vercel','Linux'] },
]

const TIMELINE = [
  { year:'2024', title:'Open Source Contributor', desc:'Actively contributing to open source on GitHub.', icon:'🌍' },
  { year:'2023', title:'Full Stack Developer',    desc:'Built and shipped multiple full-stack products.', icon:'⚡' },
  { year:'2022', title:'Started Coding Journey',  desc:'Fell in love with programming and the web.', icon:'🌱' },
]

const FACTS = [
  { icon: FiCoffee, label:'Coffee Cups', value:'∞' },
  { icon: FiCode,   label:'Lines of Code', value:'50K+' },
  { icon: FiGithub, label:'Commits',     value:'500+' },
  { icon: FiAward,  label:'Projects',    value:'20+' },
]

function useInView(threshold = 0.15) {
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

export default function About({ profile }) {
  const [sectionRef, sectionVisible] = useInView()
  const [skillsRef, skillsVisible] = useInView()
  const [timelineRef, timelineVisible] = useInView()

  if (!profile) return null

  return (
    <section id="about" className="st-section st-section-dark" style={{ paddingTop: '6rem' }}>
      <div className="st-section-content">

        {/* Narrative intro — big centered text like StringTune */}
        <div ref={sectionRef} style={{
          textAlign: 'center',
          marginBottom: '6rem',
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <p className="st-mono-label" style={{ marginBottom: '2rem' }}>// about.me</p>
          <h2 className="st-big-text" style={{ marginBottom: '2rem' }}>
            The Person<br />
            Behind The <span className="st-accent-text">Code</span>
          </h2>
          <p style={{
            color: '#9A9A9A', fontSize: '1.05rem', lineHeight: 1.8,
            maxWidth: 600, margin: '0 auto',
          }}>
            {profile.bio || `Hi! I'm ${profile.login}, a passionate developer who loves building things for the web.`}
          </p>
        </div>

        {/* Bio + Facts grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          marginBottom: '5rem',
        }} className="two-col-lg">
          {/* Bio card */}
          <div className="st-card" style={{ padding: '2rem' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: 'linear-gradient(90deg, var(--accent), transparent)',
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <img src={profile.avatar_url} alt="avatar" style={{
                width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                border: '2px solid rgba(230,57,70,0.35)',
              }} />
              <div>
                <p className="st-mono-label" style={{ marginBottom: '0.15rem', color: 'var(--accent)' }}>ABOUT ME</p>
                <h3 style={{ fontWeight: 800, fontSize: '1rem' }}>
                  {profile.name || profile.login}
                </h3>
              </div>
            </div>
            <p style={{ color: '#9A9A9A', lineHeight: 1.82, fontSize: '0.87rem', marginBottom: '1rem' }}>
              When I'm not coding, I'm exploring new tech, contributing to open source, or diving into a juicy problem. I believe great software is built with both skill and care.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['Open Source','Problem Solver','Team Player','Fast Learner'].map(t => (
                <span key={t} className="lg-pill" style={{
                  padding: '0.25rem 0.7rem', borderRadius: '100px',
                  fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)',
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Facts grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            {FACTS.map(({ icon: Icon, label, value }, i) => (
              <div key={label} className="st-card" style={{ textAlign: 'center', padding: '1.4rem 1rem' }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '10px', margin: '0 auto 0.7rem',
                  background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)',
                }}>
                  <Icon size={16} />
                </div>
                <div style={{
                  fontSize: '1.5rem', fontWeight: 900,
                  fontFamily: 'var(--font-mono)', marginBottom: '0.2rem', lineHeight: 1,
                }}>{value}</div>
                <div style={{
                  fontSize: '0.62rem', color: '#6B6B6B',
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                }}>{label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills — diamond-inspired cards in grid */}
        <div ref={skillsRef} style={{
          opacity: skillsVisible ? 1 : 0,
          transform: skillsVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <p className="st-mono-label" style={{ marginBottom: '1.5rem' }}>// tech stack</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '5rem',
          }}>
            {SKILLS.map((skill, i) => (
              <SkillCard key={skill.category} {...skill} delay={i * 0.1} />
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} style={{
          opacity: timelineVisible ? 1 : 0,
          transform: timelineVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <p className="st-mono-label" style={{ marginBottom: '1.5rem' }}>// journey</p>
          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: '6px', top: 0, bottom: 0, width: '1px',
              background: 'linear-gradient(180deg, var(--accent), rgba(230,57,70,0.2), transparent)',
            }} />
            {TIMELINE.map(({ year, title, desc, icon }, i) => (
              <div key={year} style={{
                display: 'flex', gap: '1rem', marginBottom: '1.25rem', position: 'relative',
                animation: timelineVisible ? `fadeUp 0.6s ${i * 0.15}s cubic-bezier(0.16,1,0.3,1) both` : 'none',
              }}>
                <div style={{
                  position: 'absolute', left: '-1.7rem', top: '0.35rem',
                  width: 12, height: 12, borderRadius: '50%',
                  background: '#050505', border: '2px solid var(--accent)',
                  boxShadow: '0 0 8px rgba(230,57,70,0.45)', zIndex: 1,
                }} />
                <div className="st-card" style={{ flex: 1, padding: '1.1rem 1.3rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '1rem' }}>{icon}</span>
                    <span className="lg-pill" style={{
                      padding: '0.12rem 0.55rem', borderRadius: '100px',
                      fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '0.65rem',
                    }}>{year}</span>
                    <h4 style={{ fontWeight: 700, fontSize: '0.88rem' }}>{title}</h4>
                  </div>
                  <p style={{ color: '#6B6B6B', fontSize: '0.8rem', lineHeight: 1.65 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillCard({ category, icon, items, delay }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      className="st-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '1.4rem',
        borderColor: hov ? 'rgba(230,57,70,0.3)' : undefined,
        boxShadow: hov ? '0 20px 50px rgba(230,57,70,0.1)' : undefined,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '10px', fontSize: '1rem', flexShrink: 0,
          background: 'rgba(230,57,70,0.08)', border: '1px solid rgba(230,57,70,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{icon}</div>
        <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{category}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        {items.map(item => (
          <span key={item} className="lg-pill" style={{
            padding: '0.22rem 0.65rem', borderRadius: '100px',
            fontSize: '0.71rem', fontFamily: 'var(--font-mono)',
            color: hov ? 'var(--accent)' : '#6B6B6B', transition: 'color 0.2s',
          }}>{item}</span>
        ))}
      </div>
    </div>
  )
}
