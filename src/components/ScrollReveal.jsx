import { useEffect, useRef, useState } from 'react'

/**
 * ScrollReveal — wraps children in a div that fades/slides in when scrolled into view.
 *
 * Props:
 *  - direction: 'up' | 'down' | 'left' | 'right' (default 'up')
 *  - delay: seconds (default 0)
 *  - duration: seconds (default 0.7)
 *  - distance: px (default 40)
 *  - threshold: 0–1 (default 0.1)
 *  - scale: starting scale (default 1)
 *  - once: only animate once (default true)
 *  - className, style: passed through
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 40,
  threshold = 0.1,
  scale = 1,
  once = true,
  className = '',
  style = {},
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) obs.unobserve(el)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, once])

  const transforms = {
    up:    `translateY(${distance}px)`,
    down:  `translateY(-${distance}px)`,
    left:  `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
  }

  const hiddenTransform = `${transforms[direction] || transforms.up} scale(${scale})`

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) translateX(0) scale(1)' : hiddenTransform,
        transition: `opacity ${duration}s ${delay}s cubic-bezier(0.16,1,0.3,1), transform ${duration}s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  )
}
