import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CinematicBackground() {
  const { scrollY } = useScroll();
  
  // Use a spring to make the scroll transition feel incredibly smooth (ease-in-out feel)
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    mass: 1
  });

  // Map 0 to 800px (roughly one viewport height, i.e., scrolling past hero)
  const blur = useTransform(smoothScrollY, [0, 800], [0, 12]);
  const scale = useTransform(smoothScrollY, [0, 800], [1, 1.08]);
  const brightness = useTransform(smoothScrollY, [0, 800], [100, 82]);
  const saturation = useTransform(smoothScrollY, [0, 800], [100, 90]);
  const opacity = useTransform(smoothScrollY, [0, 800], [1, 0.75]);
  
  // Generate random particles
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Generate 30 random particles for ambient depth
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 2, // 2px to 8px
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 40 + 40, // 40s to 80s
      delay: Math.random() * -20,
      glow: Math.random() > 0.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0b0618] pointer-events-none">
      
      {/* Dynamic Master Layer */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{
          scale,
          opacity,
          filter: useTransform(
            [blur, brightness, saturation],
            ([b, br, s]) => `blur(${b}px) brightness(${br}%) saturate(${s}%)`
          )
        }}
      >
        {/* Base Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />

        {/* Ambient Purple Glow */}
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-indigo-600/20 rounded-full blur-[100px] mix-blend-screen" />

        {/* Floating Abstract Shapes */}
        
        {/* Sphere 1 */}
        <motion.div
          animate={{
            y: ['-10%', '10%', '-10%'],
            x: ['-5%', '5%', '-5%'],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[15%] right-[15%] w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/30 to-indigo-900/40 blur-[4px] shadow-[inset_0_0_50px_rgba(168,85,247,0.5)] border border-purple-500/10"
        />

        {/* Ring 1 */}
        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[20%] left-[10%] w-96 h-96 rounded-full border border-purple-500/20 opacity-50 shadow-[0_0_30px_rgba(168,85,247,0.1)]"
        />
        
        {/* Ring 2 (Inner) */}
        <motion.div
          animate={{
            rotate: [360, 180, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[23%] left-[13%] w-72 h-72 rounded-full border-2 border-dashed border-indigo-500/10 opacity-30"
        />

        {/* Cube-like shape */}
        <motion.div
          animate={{
            y: ['0%', '15%', '0%'],
            rotate: [0, 45, 90],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[40%] left-[5%] w-32 h-32 bg-gradient-to-tr from-purple-900/40 to-transparent backdrop-blur-xl border border-white/5 rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        />

        {/* Floating Particles System */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            animate={{
              y: ['0vh', '-100vh'],
              opacity: [0, 0.8, 0],
              scale: [1, Math.random() + 1, 1]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear'
            }}
            className={`absolute rounded-full ${p.glow ? 'bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.8)]' : 'bg-white/40'}`}
            style={{
              left: `${p.x}vw`,
              top: `${p.y}vh`,
              width: p.size,
              height: p.size,
              filter: `blur(${p.size > 4 ? 2 : 0}px)`
            }}
          />
        ))}

      </motion.div>
    </div>
  );
}
