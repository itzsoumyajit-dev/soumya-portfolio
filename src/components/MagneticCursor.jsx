import { useEffect, useRef } from 'react'

export default function MagneticCursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window) return

    let mx = 0, my = 0, rx = 0, ry = 0, raf

    const move = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
      }
    }

    const tick = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ring.current) {
        ring.current.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', move)
    raf = requestAnimationFrame(tick)

    /* Magnetic hover effect on interactive elements */
    const interactives = document.querySelectorAll('a, button, [data-cursor]')

    const onEnter = () => {
      if (ring.current) {
        ring.current.style.width = '60px'
        ring.current.style.height = '60px'
        ring.current.style.borderColor = 'var(--c1)'
        ring.current.style.background = 'rgba(0, 229, 192, 0.06)'
        ring.current.style.mixBlendMode = 'difference'
      }
      if (dot.current) {
        dot.current.style.opacity = '0.5'
        dot.current.style.transform += ' scale(0.5)'
      }
    }
    const onLeave = () => {
      if (ring.current) {
        ring.current.style.width = '40px'
        ring.current.style.height = '40px'
        ring.current.style.borderColor = 'rgba(0, 229, 192, 0.4)'
        ring.current.style.background = 'transparent'
        ring.current.style.mixBlendMode = 'normal'
      }
      if (dot.current) {
        dot.current.style.opacity = '1'
      }
    }

    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dot}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--c1, #00e5c0)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'opacity 0.2s ease',
          mixBlendMode: 'difference',
        }}
      />
      {/* Ring */}
      <div
        ref={ring}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(0, 229, 192, 0.4)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease',
          background: 'transparent',
        }}
      />
    </>
  )
}
