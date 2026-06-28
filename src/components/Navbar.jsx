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
          padding: '8px 12px',
          borderRadius: '22px',
          /* Transparent frosted glass */
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          /* Liquid glass border */
          border: '1px solid var(--glass-border)',
          /* Premium shadow layers */
          boxShadow: [
            'inset 0 1px 0 0 var(--glass-highlight)',
            'inset 0 -1px 0 0 rgba(0, 0, 0, 0.05)',
            '0 12px 40px var(--glass-shadow)',
          ].join(', '),
          position: 'relative',
          overflow: 'hidden',
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
              {/* Active indicator — frosted highlight pill */}
              {isActive && (
                <motion.div
                  layoutId="liquid-glass-pill"
                  style={{
                    position: 'absolute',
                    inset: '3px',
                    borderRadius: '12px',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.12), 0 2px 6px rgba(0,0,0,0.1)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 28,
                    mass: 0.5,
                  }}
                />
              )}

              {/* Icon */}
              <motion.div
                animate={{
                  scale: isActive ? 1.08 : 1,
                  color: isActive ? 'rgb(var(--text-primary))' : 'rgb(var(--text-tertiary))',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{ position: 'relative', zIndex: 2, lineHeight: 0 }}
              >
                <Icon size={21} />
              </motion.div>

              {/* Label — always visible */}
              <span
                style={{
                  position: 'relative',
                  zIndex: 2,
                  fontSize: '9.5px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  marginTop: '3px',
                  fontFamily: "'Inter', -apple-system, sans-serif",
                  color: isActive ? 'rgb(var(--text-primary))' : 'rgb(var(--text-tertiary))',
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
