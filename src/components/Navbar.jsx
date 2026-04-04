import { useState, useEffect } from 'react'
import { FiGithub } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import { motion, AnimatePresence } from 'framer-motion'

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('home')
  const [hoveredLink, setHoveredLink] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['home','about','stats','repos','languages','certificates','contact']
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.4 }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const links = [
    { id: 'home',      label: 'Home' },
    { id: 'about',     label: 'About' },
    { id: 'stats',     label: 'Stats' },
    { id: 'repos',     label: 'Repos' },
    { id: 'languages', label: 'Stack' },
    { id: 'certificates', label: 'Certificates'},
    { id: 'contact',   label: 'Contact' },
  ]

  const isLight = theme === 'light'
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      style={{
        position: 'fixed', top: 10, left: '50%', zIndex: 100,
        // we omit transform: translateX(-50%) directly in style to prevent framer motion conflict, 
        // we'll apply it using x: "-50%" in framer motion
        x: '-50%',
        width: '90%', maxWidth: '800px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        ...(scrolled ? {
          background: isLight
            ? 'rgba(240,244,255,0.75)'
            : 'rgba(4,6,15,0.75)',
          border: `1px solid ${isLight ? 'rgba(15,23,42,0.1)' : 'rgba(255,255,255,0.09)'}`,
          backdropFilter: 'blur(32px) saturate(200%)',
          WebkitBackdropFilter: 'blur(32px) saturate(200%)',
          borderRadius: '16px',
          padding: '0.55rem 1.25rem',
          boxShadow: isLight
            ? '0 4px 24px rgba(15,23,42,0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
            : '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
        } : { padding: '0.4rem 0' }),
      }}
    >
        {/* Logo */}
        <motion.a href="#home" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: 34, height: 34, borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--c1), var(--c2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', color: 'var(--text)', fontWeight: 700, fontSize: '0.78rem',
            boxShadow: '0 4px 16px rgba(56,189,248,0.35)',
          }}>
            {(USERNAME || 'SP').slice(0,2).toUpperCase()}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)', fontSize: '0.72rem' }}>
            ~/{USERNAME}
          </span>
        </motion.a>

        {/* Right side */}
        <div style={{ display: 'flex', gap: '0.15rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Nav links */}
          <AnimatePresence>
            {links.map(link => (
              <a key={link.id} href={`#${link.id}`}
                onClick={() => setActive(link.id)}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  position: 'relative',
                  textDecoration: 'none',
                  padding: '0.38rem 0.85rem',
                  borderRadius: '10px',
                  fontSize: '0.8rem', fontWeight: 500,
                  letterSpacing: '0.01em',
                  color: active === link.id ? 'var(--c1)' : 'var(--muted2)',
                  transition: 'color 0.2s ease',
                  outline: 'none',
                }}
              >
                {hoveredLink === link.id && active !== link.id && (
                  <motion.div
                    layoutId="nav-hover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.06)',
                      border: '1px solid transparent', // Will adjust based on your original var(--lg-border)
                      borderRadius: '10px', zIndex: -1
                    }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                {active === link.id && (
                  <motion.div
                    layoutId="nav-active"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(56,189,248,0.1)',
                      border: '1px solid rgba(56,189,248,0.2)',
                      borderRadius: '10px', zIndex: -1
                    }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{link.label}</span>
              </a>
            ))}
          </AnimatePresence>

          {/* GitHub */}
          <motion.a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer"
            whileHover={{ 
              y: -1, 
              boxShadow: '0 6px 24px rgba(56,189,248,0.25)',
              background: 'linear-gradient(135deg,rgba(56,189,248,0.22),rgba(167,139,250,0.22))'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              marginLeft: '0.35rem',
              display: 'flex', alignItems: 'center', gap: '0.45rem',
              textDecoration: 'none',
              padding: '0.38rem 0.9rem',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(56,189,248,0.14), rgba(167,139,250,0.14))',
              border: '1px solid rgba(56,189,248,0.22)',
              backdropFilter: 'blur(12px)',
              color: 'var(--c1)', fontSize: '0.78rem', fontWeight: 600,
              boxShadow: '0 2px 12px rgba(56,189,248,0.12)',
            }}
          >
            <FiGithub size={13} /> GitHub
          </motion.a>

          {/* Theme toggle */}
          <div style={{ marginLeft: '0.35rem' }}>
            <ThemeToggle theme={theme} toggle={toggleTheme} />
          </div>
        </div>
    </motion.nav>
  )
}
