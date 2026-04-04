import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * useParallax — tracks scroll position and velocity for parallax effects & motion blur.
 * Returns: { scrollY, velocity, isScrolling }
 * Also sets CSS variables on :root for use in CSS:
 *   --scroll-y, --scroll-velocity, --motion-blur
 */
export function useParallax() {
  const [scrollY, setScrollY] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const lastScroll = useRef(0)
  const lastTime = useRef(Date.now())
  const scrollTimer = useRef(null)
  const rafId = useRef(null)

  useEffect(() => {
    const update = () => {
      const now = Date.now()
      const dt = Math.max(now - lastTime.current, 1)
      const currentScroll = window.scrollY
      const rawVelocity = Math.abs(currentScroll - lastScroll.current) / dt

      // Smooth velocity
      const smoothVelocity = Math.min(rawVelocity * 1000, 5000) // cap at 5000px/s
      setScrollY(currentScroll)
      setVelocity(smoothVelocity)
      setIsScrolling(true)

      // Set CSS variables for CSS-based parallax & blur
      const root = document.documentElement
      root.style.setProperty('--scroll-y', `${currentScroll}px`)
      root.style.setProperty('--scroll-velocity', smoothVelocity.toFixed(0))
      root.style.setProperty('--motion-blur', `${Math.min(smoothVelocity / 800, 3).toFixed(1)}px`)

      lastScroll.current = currentScroll
      lastTime.current = now

      // Clear scrolling state after pause
      clearTimeout(scrollTimer.current)
      scrollTimer.current = setTimeout(() => {
        setVelocity(0)
        setIsScrolling(false)
        root.style.setProperty('--scroll-velocity', '0')
        root.style.setProperty('--motion-blur', '0px')
      }, 150)
    }

    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId.current)
      clearTimeout(scrollTimer.current)
    }
  }, [])

  return { scrollY, velocity, isScrolling }
}

/**
 * useMouseParallax — tracks mouse position for parallax tilt effects.
 * Returns: { x, y } normalized from -1 to 1
 */
export function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let tX = 0, tY = 0, cX = 0, cY = 0, raf

    const onMove = (e) => {
      tX = (e.clientX / window.innerWidth) * 2 - 1
      tY = (e.clientY / window.innerHeight) * 2 - 1
    }

    const animate = () => {
      cX += (tX - cX) * 0.06
      cY += (tY - cY) * 0.06
      setPos({ x: cX, y: cY })
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return pos
}
