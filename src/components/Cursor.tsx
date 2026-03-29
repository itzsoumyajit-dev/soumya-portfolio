import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, raf: number

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
      }
    }

    const tick = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      if (ring.current) {
        ring.current.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', move)
    raf = requestAnimationFrame(tick)

    const onEnter = () => {
      if (ring.current) {
        ring.current.style.width = '54px'
        ring.current.style.height = '54px'
        ring.current.style.borderColor = 'rgba(0,229,192,0.8)'
        ring.current.style.mixBlendMode = 'difference'
      }
    }
    const onLeave = () => {
      if (ring.current) {
        ring.current.style.width = '32px'
        ring.current.style.height = '32px'
        ring.current.style.borderColor = 'rgba(0,229,192,0.5)'
        ring.current.style.mixBlendMode = 'normal'
      }
    }

    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div id="cursor-dot"  ref={dot} />
      <div id="cursor-ring" ref={ring} />
    </>
  )
}
