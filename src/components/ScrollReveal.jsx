import { useRef, useEffect, useState } from 'react'

export default function ScrollReveal({ children, direction = 'up', delay = 0, duration = 0.8, distance = 40 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const transforms = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) translateX(0)' : transforms[direction],
        transition: `opacity ${duration}s ${delay}s cubic-bezier(0.16,1,0.3,1), transform ${duration}s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
