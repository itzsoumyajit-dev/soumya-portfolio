import { useState, useEffect } from 'react';
import { 
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineChartBar,
  HiOutlineFolder,
  HiOutlineEnvelope
} from 'react-icons/hi2';
import { LimelightNav } from './ui/limelight-nav';

export default function Navbar({ scrollPct }) {
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

  const handleNavClick = (id) => {
    setActive(id);
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const links = [
    { id: 'home', label: 'Home', icon: <HiOutlineHome size={22} /> },
    { id: 'about', label: 'About', icon: <HiOutlineUser size={22} /> },
    { id: 'stats', label: 'Stats', icon: <HiOutlineChartBar size={22} /> },
    { id: 'repos', label: 'Projects', icon: <HiOutlineFolder size={22} /> },
    { id: 'contact', label: 'Contact', icon: <HiOutlineEnvelope size={22} /> },
  ];

  const navItems = links.map(link => ({
    id: link.id,
    label: link.label,
    icon: link.icon,
    onClick: () => handleNavClick(link.id)
  }));

  const activeIndex = Math.max(0, links.findIndex(l => l.id === active));

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
    }}>
      <LimelightNav 
        items={navItems}
        defaultActiveIndex={activeIndex}
        iconContainerClassName="w-16 h-12"
        iconClassName="text-white"
        className="glass-card shadow-2xl rounded-full"
      />
    </div>
  );
}
