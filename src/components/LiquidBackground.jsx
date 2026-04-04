import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LiquidBackground() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  // We use Framer Motion to animate borderRadius to create a squishy, liquid morphing effect.
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: -5, pointerEvents: 'none', overflow: 'hidden',
      background: 'var(--bg)', // Base fallback
      transition: 'background 0.5s ease'
    }}>
      {/* 
        A backdrop layer to heavily blue and blend the underlying morphing blobs.
        This provides the smooth "liquid" gradient effect, avoiding sharp edges.
      */}
      <div style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        filter: 'blur(80px) saturate(150%)',
        opacity: 0.65, // Adjust overall vibrancy with opacity
        mixBlendMode: 'normal'
      }}>
        
        {/* Sky Blue Liquid Blob */}
        <motion.div
          animate={{
            x: ['0vw', '15vw', '-10vw', '0vw'],
            y: ['0vh', '-10vh', '15vh', '0vh'],
            rotate: [0, 90, 180, 360],
            borderRadius: [
              '30% 70% 70% 30% / 30% 30% 70% 70%',
              '50% 50% 40% 60% / 50% 60% 40% 50%',
              '40% 60% 50% 50% / 40% 50% 60% 50%',
              '30% 70% 70% 30% / 30% 30% 70% 70%'
            ]
          }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          style={{
            position: 'absolute', top: '-15%', left: '-10%', width: '55vw', height: '55vw',
            background: 'var(--c1)', 
            transformOrigin: 'center center',
            mixBlendMode: 'screen'
          }}
        />

        {/* Violet Liquid Blob */}
        <motion.div
          animate={{
            x: ['0vw', '-20vw', '10vw', '0vw'],
            y: ['0vh', '15vh', '-10vh', '0vh'],
            rotate: [0, -90, -180, -360],
            borderRadius: [
              '60% 40% 40% 60% / 40% 60% 60% 40%',
              '40% 60% 60% 40% / 60% 40% 50% 50%',
              '50% 50% 30% 70% / 50% 50% 40% 60%',
              '60% 40% 40% 60% / 40% 60% 60% 40%'
            ]
          }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
          style={{
            position: 'absolute', top: '10%', right: '-15%', width: '65vw', height: '65vw',
            background: 'var(--c2)',
            transformOrigin: '40% 60%',
            mixBlendMode: 'screen'
          }}
        />

        {/* Pink Liquid Blob */}
        <motion.div
          animate={{
            x: ['0vw', '25vw', '-15vw', '0vw'],
            y: ['0vh', '20vh', '-5vh', '0vh'],
            rotate: [0, 45, 180, 360],
            borderRadius: [
              '40% 60% 70% 30% / 40% 50% 60% 50%',
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '50% 50% 50% 50% / 30% 70% 40% 60%',
              '40% 60% 70% 30% / 40% 50% 60% 50%'
            ]
          }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          style={{
            position: 'absolute', bottom: '-20%', left: '10%', width: '50vw', height: '50vw',
            background: 'var(--c3)',
            transformOrigin: 'center center',
            mixBlendMode: 'screen'
          }}
        />

        {/* Emerald Liquid Blob */}
        <motion.div
          animate={{
            x: ['0vw', '-15vw', '20vw', '0vw'],
            y: ['0vh', '-25vh', '15vh', '0vh'],
            rotate: [360, 180, 90, 0],
            borderRadius: [
              '50% 50% 20% 80% / 25% 80% 20% 75%',
              '30% 70% 50% 50% / 40% 50% 60% 50%',
              '60% 40% 60% 40% / 60% 40% 50% 50%',
              '50% 50% 20% 80% / 25% 80% 20% 75%'
            ]
          }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          style={{
            position: 'absolute', bottom: '0%', right: '5%', width: '45vw', height: '45vw',
            background: 'var(--c4)',
            transformOrigin: '60% 40%',
            mixBlendMode: 'screen'
          }}
        />
        
        {/* Core Amber Accent Blob to add depth to the liquid */}
        <motion.div
          animate={{
            x: ['0vw', '10vw', '-15vw', '0vw'],
            y: ['0vh', '15vh', '20vh', '0vh'],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 120, 240, 360]
          }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          style={{
            position: 'absolute', top: '35%', left: '30%', width: '35vw', height: '35vw',
            background: 'var(--c5)',
            borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%',
            transformOrigin: 'center center',
            mixBlendMode: 'screen',
            opacity: 0.8
          }}
        />
      </div>

      {/* 
        A subtle noise overlay is usually requested for premium web designs.
        A very light SVG noise ensures the liquid gradient doesn't look like cheap banding.
      */}
      <div style={{
        position: 'absolute', inset: 0, 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        opacity: 0.15,
        mixBlendMode: 'overlay',
        pointerEvents: 'none'
      }}></div>
    </div>
  )
}
