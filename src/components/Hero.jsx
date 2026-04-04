import { useEffect, useState } from 'react'
import { FiMapPin, FiUsers, FiBookOpen, FiArrowDown, FiLink } from 'react-icons/fi'
import HeroScene3D from './HeroScene3D'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero({ profile }) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let i = 0
    const txt = '> Crafting beautiful things on the web.'
    const iv  = setInterval(() => {
      setTyped(txt.slice(0, ++i))
      if (i >= txt.length) clearInterval(iv)
    }, 55)
    return () => clearInterval(iv)
  }, [])

  // Parallax for background elements
  const { scrollY } = useScroll()
  const yHeroBg = useTransform(scrollY, [0, 1000], [0, 200])
  const opacityHeroBg = useTransform(scrollY, [0, 500], [1, 0])

  if (!profile) return null

  // Framer Motion variants for orchestrated entrance
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
  }

  return (
    <section id="home" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '7rem 2rem 5rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Grid Parallax */}
      <motion.div className="grid-bg" style={{ position:'absolute', inset:0, pointerEvents:'none', y: yHeroBg, opacity: opacityHeroBg }} />

      {/* 3D Scene behind content */}
      <motion.div style={{ position:'absolute', inset:0, y: yHeroBg }}>
        <HeroScene3D />
      </motion.div>

      {/* Center glow */}
      <div style={{
        position:'absolute', top:'38%', left:'50%', transform:'translate(-50%,-50%)',
        width:560, height:560,
        background:'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 68%)',
        pointerEvents:'none',
      }}/>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        style={{ maxWidth:'940px', width:'100%', position:'relative', zIndex: 1 }}
      >
        {/* Badge */}
        <motion.div variants={item} style={{ display:'inline-flex', alignItems:'center', gap:'0.55rem',
          marginBottom:'2.2rem' }}>
          <div className="lg lg-pill" style={{ borderRadius:'100px', padding:'0.38rem 1.1rem',
            display:'flex', alignItems:'center', gap:'0.55rem' }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--c4)',
              animation:'pulse-glow 2.2s ease infinite', flexShrink:0 }} />
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--c4)',
              letterSpacing:'0.1em' }}>OPEN TO WORK</span>
          </div>
        </motion.div>

        {/* Layout */}
        <div style={{ display:'flex', gap:'2.5rem', alignItems:'center',
          flexWrap:'wrap-reverse', marginBottom:'2rem' }}>

          {/* Text */}
          <div style={{ flex:1, minWidth:'260px' }}>
            <motion.p variants={item} style={{ fontFamily:'var(--font-mono)', color:'var(--muted)',
              fontSize:'0.73rem', letterSpacing:'0.04em', marginBottom:'0.85rem' }}>
              {typed}<span style={{ animation:'blink 1s infinite', color:'var(--c1)', marginLeft:1 }}>|</span>

              {' '}@{profile.login}
            </motion.p>

            {/* Animated Name */}
            <motion.h1 variants={item} style={{ fontSize:'clamp(2.5rem,7vw,5.2rem)', fontWeight:900,
              lineHeight:1, letterSpacing:'-0.035em', color:'var(--text)', marginBottom:'0.6rem',
              textShadow:'0 0 60px rgba(56,189,248,0.15)' }}>
              <span className="grad-text glow-text">{profile.name || profile.login}</span>
            </motion.h1>
            
            <motion.div variants={item} style={{ display:'flex', alignItems:'center', gap:'0.8rem', marginBottom:'1.8rem' }}>
              <div style={{ width:32, height:2, background:'linear-gradient(90deg,var(--c1),var(--c2))', borderRadius:2 }}/>
              <span style={{ fontFamily:'var(--font-mono)', color:'var(--c1)', fontSize:'0.78rem',
                letterSpacing:'0.08em', fontWeight:500 }}>
                Full Stack Developer
              </span>
            </motion.div>

            {profile.bio && (
              <motion.p variants={item} style={{ color:'var(--muted2)', fontSize:'1rem', lineHeight:1.78,
                maxWidth:'480px', marginBottom:'2rem' }}>
                {profile.bio}
              </motion.p>
            )}

            {/* Meta */}
            <motion.div variants={item} style={{ display:'flex', flexWrap:'wrap', gap:'1rem',
              marginBottom:'2.5rem' }}>
              {[
                profile.location && { icon: FiMapPin, text: profile.location },
                { icon: FiUsers,    text: `${profile.followers} followers` },
                { icon: FiBookOpen, text: `${profile.public_repos} repos` },
                profile.blog && { icon: FiLink, text: 'Website', href: profile.blog },
              ].filter(Boolean).map(({ icon: Icon, text, href }) => (
                href
                  ? <a key={text} href={href} target="_blank" rel="noreferrer"
                      style={{ display:'flex', alignItems:'center', gap:'0.4rem',
                        color:'var(--c1)', fontSize:'0.8rem', fontFamily:'var(--font-mono)',
                        textDecoration:'none' }}>
                      <Icon size={12}/> {text}
                    </a>
                  : <span key={text} style={{ display:'flex', alignItems:'center', gap:'0.4rem',
                      color:'var(--muted)', fontSize:'0.8rem', fontFamily:'var(--font-mono)' }}>
                      <Icon size={12} style={{ color:'var(--c1)' }}/> {text}
                    </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
              <motion.a href={`https://github.com/${profile.login}`} target="_blank" rel="noreferrer"
                className="magnetic"
                whileHover={{ y: -4, scale: 1.03, boxShadow: '0 20px 60px rgba(56,189,248,0.35), 0 0 40px rgba(56,189,248,0.12)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  display:'inline-flex', alignItems:'center', gap:'0.5rem',
                  textDecoration:'none', padding:'0.85rem 2rem',
                  background:'linear-gradient(135deg, var(--c1), var(--c2))',
                  color:'#04060f', borderRadius:'16px', fontWeight:800, fontSize:'0.88rem',
                  boxShadow:'0 8px 32px rgba(56,189,248,0.25), 0 0 0 0 rgba(56,189,248,0)',
                  letterSpacing:'0.01em',
                }}
              >
                View GitHub ↗
              </motion.a>
              <motion.a href="#contact"
                className="lg lg-hover magnetic"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  display:'inline-flex', alignItems:'center', gap:'0.5rem',
                  textDecoration:'none', padding:'0.8rem 1.9rem',
                  borderRadius:'14px', fontWeight:600, fontSize:'0.88rem', color:'var(--text)',
                }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div variants={item} style={{ position:'relative', flexShrink:0 }}>
            {/* Outer orbit ring */}
            <div style={{
              position:'absolute', inset:'-28px', borderRadius:'50%',
              border:'1px dashed rgba(56,189,248,0.18)',
              animation:'spin-slow 25s linear infinite',
            }}/>
            {/* Liquid glass ring with glow animation */}
            <div style={{
              position:'absolute', inset:'-10px', borderRadius:'50%',
              background:'transparent',
              border:'2px solid transparent',
              backgroundImage:'linear-gradient(var(--bg),var(--bg)), linear-gradient(135deg,var(--c1),var(--c2),var(--c3))',
              backgroundOrigin:'border-box', backgroundClip:'padding-box, border-box',
              animation:'glow-pulse 3s ease-in-out infinite',
            }}/>
            <div className="lg" style={{
              borderRadius:'50%', padding:4, width:192, height:192,
              background:'rgba(255,255,255,0.06)',
            }}>
              <img src={profile.avatar_url} alt="avatar" style={{
                width:184, height:184, borderRadius:'50%',
                display:'block', objectFit:'cover',
              }}/>
            </div>
            {/* Glow */}
            <div style={{
              position:'absolute', bottom:-20, left:'50%', transform:'translateX(-50%)',
              width:120, height:24,
              background:'radial-gradient(ellipse, rgba(56,189,248,0.35), transparent 70%)',
              filter:'blur(8px)', pointerEvents:'none',
            }}/>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5, duration: 1.2 }}
          style={{ textAlign:'center', paddingTop:'1rem' }}
        >
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', letterSpacing:'0.12em',
            color:'var(--muted)', marginBottom:'0.4rem' }}>SCROLL</p>
          <FiArrowDown size={13} style={{ color:'var(--muted)', animation:'float 2s ease-in-out infinite' }}/>
        </motion.div>
      </motion.div>
    </section>
  )
}
