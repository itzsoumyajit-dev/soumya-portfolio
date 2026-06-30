import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineHome, HiHome,
  HiOutlineUser, HiUser,
  HiOutlineChartBar, HiChartBar,
  HiOutlineFolder, HiFolder,
  HiOutlineEnvelope, HiEnvelope 
} from 'react-icons/hi2';

export default function Navbar() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const ids = ['home', 'about', 'stats', 'repos', 'contact'];
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: 0.1 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const links = [
    { id: 'home', label: 'Home', OutlineIcon: HiOutlineHome, SolidIcon: HiHome },
    { id: 'about', label: 'About', OutlineIcon: HiOutlineUser, SolidIcon: HiUser },
    { id: 'stats', label: 'Stats', OutlineIcon: HiOutlineChartBar, SolidIcon: HiChartBar },
    { id: 'repos', label: 'Projects', OutlineIcon: HiOutlineFolder, SolidIcon: HiFolder },
    { id: 'contact', label: 'Contact', OutlineIcon: HiOutlineEnvelope, SolidIcon: HiEnvelope },
  ];

  const handleNavClick = (id) => {
    setActive(id);
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
    }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px 16px',
          borderRadius: '30px',
          background: 'rgba(11, 5, 29, 0.85)', /* Very dark purple/blue */
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid rgba(139, 92, 246, 0.15)', /* Subtle purple border */
          boxShadow: [
            'inset 0 1px 0 0 rgba(255,255,255,0.05)',
            '0 20px 40px rgba(0, 0, 0, 0.5)',
          ].join(', '),
          position: 'relative',
          overflow: 'hidden',
          gap: '8px',
        }}
      >
        {/* Top curved reflection highlight */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '8%',
          right: '8%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Subtle inner light gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '22px',
          background: 'radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {links.map((link) => {
          const isActive = active === link.id;
          const Icon = isActive ? link.SolidIcon : link.OutlineIcon;

          return (
            <div
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '68px',
                height: '52px',
                cursor: 'pointer',
                userSelect: 'none',
                borderRadius: '14px',
              }}
            >
              {/* Active indicator — glowing purple circle */}
              {isActive && (
                <motion.div
                  layoutId="active-nav-indicator"
                  style={{
                    position: 'absolute',
                    top: '4px',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #9333ea 0%, #4f46e5 100%)',
                    boxShadow: '0 0 15px rgba(147, 51, 234, 0.6)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              {/* Icon */}
              <motion.div
                animate={{
                  y: isActive ? -2 : 0,
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{ position: 'relative', zIndex: 2, lineHeight: 0, marginTop: '10px' }}
              >
                <Icon size={20} />
              </motion.div>

              {/* Label — always visible */}
              <span
                style={{
                  position: 'relative',
                  zIndex: 2,
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  marginTop: '8px',
                  marginBottom: '6px',
                  fontFamily: "'Inter', -apple-system, sans-serif",
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  transition: 'color 0.25s ease',
                }}
              >
                {link.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
