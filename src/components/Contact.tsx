import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content', {
        scrollTrigger: { trigger: '.contact-content', start: 'top 75%' },
        y: 80, opacity: 0, duration: 1.2, ease: 'power4.out',
      })
      gsap.from('.contact-link', {
        scrollTrigger: { trigger: '.contact-links', start: 'top 80%' },
        y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="contact" style={{
      padding: '8rem 6vw 6rem',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      minHeight: '70vh', display: 'flex', alignItems: 'center',
    }}>
      <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto' }}>
        <div className="contact-content" style={{ maxWidth: 700 }}>
          <p style={{
            fontFamily: 'var(--font-mono)', color: 'var(--accent)',
            fontSize: '0.72rem', letterSpacing: '0.2em', marginBottom: '1.5rem',
          }}>
            03 / CONTACT
          </p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 7vw, 7rem)',
            lineHeight: 0.9, color: 'var(--text)',
            letterSpacing: '0.03em', marginBottom: '2rem',
          }}>
            LET'S BUILD<br />
            <span style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              SOMETHING
            </span><br />
            GREAT
          </h2>

          <p style={{
            color: 'var(--muted2)', fontSize: '1rem', lineHeight: 1.8,
            marginBottom: '3rem', maxWidth: 480,
          }}>
            Have a project in mind? Want to collaborate? Or just want to say hi?
            My inbox is always open — I'll get back to you within 24 hours.
          </p>

          <a href="mailto:rajeshchittyal21@gmail.com" data-cursor
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              fontFamily: 'var(--font-display)', fontSize: '1.1rem',
              letterSpacing: '0.1em', color: '#000',
              background: 'var(--accent)',
              padding: '1rem 2.5rem', borderRadius: '6px',
              textDecoration: 'none',
              transition: 'all 0.28s ease',
              boxShadow: '0 8px 32px rgba(0,229,192,0.3)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,229,192,0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,229,192,0.3)'
            }}
          >
            SAY HELLO ↗
          </a>
        </div>

        {/* Social links row */}
        <div className="contact-links" style={{
          display: 'flex', gap: '2rem', marginTop: '5rem',
          flexWrap: 'wrap', alignItems: 'center',
        }}>
          {[
            { label: 'GITHUB', href: '#' },
            { label: 'LINKEDIN', href: '#' },
            { label: 'X', href: '#' },
            { label: 'INSTAGRAM', href: '#' },
            { label: 'RESUME', href: '#' },
          ].map(s => (
            <a key={s.label} href={s.href} data-cursor
              className="contact-link"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                letterSpacing: '0.15em', color: 'var(--muted)',
                textDecoration: 'none', transition: 'color 0.2s',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '2px',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
