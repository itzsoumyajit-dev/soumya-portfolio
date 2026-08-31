import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values to bypass React render cycle for buttery smooth tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring configurations for meteor tail
  const spring1 = { damping: 25, stiffness: 400, mass: 0.5 };
  const spring2 = { damping: 28, stiffness: 300, mass: 0.5 };
  const spring3 = { damping: 31, stiffness: 200, mass: 0.5 };
  const spring4 = { damping: 34, stiffness: 100, mass: 0.5 };
  const spring5 = { damping: 37, stiffness: 50, mass: 0.5 };

  const x1 = useSpring(cursorX, spring1);
  const y1 = useSpring(cursorY, spring1);
  const x2 = useSpring(cursorX, spring2);
  const y2 = useSpring(cursorY, spring2);
  const x3 = useSpring(cursorX, spring3);
  const y3 = useSpring(cursorY, spring3);
  const x4 = useSpring(cursorX, spring4);
  const y4 = useSpring(cursorY, spring4);
  const x5 = useSpring(cursorX, spring5);
  const y5 = useSpring(cursorY, spring5);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || 
        target.closest('a') || 
        target.closest('button') ||
        (target.classList && target.classList.contains('glass-card')) ||
        target.closest('.glass-card')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      {/* Meteor Trails */}
      {[ 
        { x: x5, y: y5, size: 'w-1 h-1', opacity: 0.2, z: 9994 },
        { x: x4, y: y4, size: 'w-1.5 h-1.5', opacity: 0.4, z: 9995 },
        { x: x3, y: y3, size: 'w-2 h-2', opacity: 0.6, z: 9996 },
        { x: x2, y: y2, size: 'w-2.5 h-2.5', opacity: 0.8, z: 9997 },
        { x: x1, y: y1, size: 'w-3 h-3', opacity: 1, z: 9998 },
      ].map((tail, i) => (
        <motion.div
          key={i}
          className={`fixed top-0 left-0 ${tail.size} rounded-full pointer-events-none hidden md:block`}
          style={{
            x: tail.x,
            y: tail.y,
            translateX: '-50%',
            translateY: '-50%',
            backgroundColor: '#A58CFF',
            zIndex: tail.z,
            boxShadow: `0 0 ${4 + i*2}px rgba(165, 140, 255, ${tail.opacity})`
          }}
          animate={{
            opacity: isVisible && !isHovering ? tail.opacity : 0,
            scale: isHovering ? 0 : 1
          }}
          transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.15 } }}
        />
      ))}

      {/* Meteor Head / Hover Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? '48px' : '12px',
          height: isHovering ? '48px' : '12px',
          backgroundColor: isHovering ? 'rgba(165, 140, 255, 0.15)' : '#fff',
          border: isHovering ? '1.5px solid rgba(165, 140, 255, 0.8)' : '0px solid transparent',
          boxShadow: isHovering ? 'none' : '0 0 20px 5px rgba(165, 140, 255, 0.9)',
          opacity: isVisible ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  );
}
