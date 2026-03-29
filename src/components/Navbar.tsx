import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const links = ['ABOUT', 'WORK', 'CONTACT']

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-item', {
        y: -30, opacity: 0, duration: 0.8,
        stagger: 0.1, ease: 'power3.out', delay: 0.5,
      })
    }, navRef)
    return () => ctx.revert()
  }, [])

  return (
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '1.8rem 3rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <div className="nav-item" style={{
        fontFamily: 'var(--font-display)', fontSize: '1.6rem',
        color: 'var(--text)', letterSpacing: '0.1em',
        cursor: 'default',
      }}>
        RC
      </div>

      {/* Email */}
      <div className="nav-item" style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
        color: 'var(--muted2)', letterSpacing: '0.08em',
      }}>
        rajeshchittyal21@gmail.com
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {links.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`}
            className="nav-item"
            data-cursor
            style={{
              fontFamily: 'var(--font-body)', fontSize: '0.8rem',
              fontWeight: 600, letterSpacing: '0.12em',
              color: 'var(--muted2)', textDecoration: 'none',
              transition: 'color 0.25s',
              position: 'relative',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted2)')}
          >
            {link}
          </a>
        ))}

        {/* Resume button */}
        <a href="#" data-cursor
          className="nav-item"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
            letterSpacing: '0.1em', color: 'var(--accent)',
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem',
            border: '1px solid rgba(0,229,192,0.3)', padding: '0.4rem 1rem', borderRadius: '4px',
            transition: 'all 0.25s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0,229,192,0.1)'
            e.currentTarget.style.borderColor = 'var(--accent)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'rgba(0,229,192,0.3)'
          }}
        >
          RESUME ↗
        </a>
      </div>
    </nav>
  )
}
