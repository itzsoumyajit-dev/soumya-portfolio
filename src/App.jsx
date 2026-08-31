import { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { useGitHub } from './hooks/useGitHub';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import GitHubStats from './components/GitHubStats';
import RepoGrid from './components/RepoGrid';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CinematicBackground from './components/CinematicBackground';
import { motion, AnimatePresence } from 'framer-motion';

function CinematicLoader() {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordFade, setWordFade] = useState(true);

  const welcomeWords = [
    { text: "Welcome", lang: "EN" },
    { text: "স্বাগতম", lang: "BN" },
    { text: "स्वागत है", lang: "HI" },
    { text: "Bienvenue", lang: "FR" },
    { text: "ようこそ", lang: "JP" },
    { text: "환영합니다", lang: "KR" },
    { text: "欢迎", lang: "CN" },
    { text: "Добро пожаловать", lang: "RU" },


  ];

  // Progress counter
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = p < 30 ? Math.random() * 8 + 2
          : p < 70 ? Math.random() * 12 + 5
            : Math.random() * 6 + 2;
        return Math.min(Math.round(p + increment), 100);
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Word cycling
  useEffect(() => {
    if (wordIndex >= welcomeWords.length - 1) return;
    const interval = setInterval(() => {
      setWordFade(false);
      setTimeout(() => {
        setWordIndex(prev => Math.min(prev + 1, welcomeWords.length - 1));
        setWordFade(true);
      }, 200);
    }, 400);
    return () => clearInterval(interval);
  }, [wordIndex]);

  // Generate particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 3,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  // SVG progress ring
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: 'rgb(var(--background))' }}
    >
      {/* === Animated Aurora Blobs === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(var(--accent), 0.25) 0%, transparent 70%)',
            filter: 'blur(80px)',
            top: '20%', left: '15%',
          }}
          animate={{
            x: [0, 80, -40, 60, 0],
            y: [0, -60, 40, -20, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(var(--accent-secondary), 0.2) 0%, transparent 70%)',
            filter: 'blur(80px)',
            bottom: '10%', right: '10%',
          }}
          animate={{
            x: [0, -70, 50, -30, 0],
            y: [0, 50, -30, 60, 0],
            scale: [1, 0.9, 1.15, 0.95, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 300, height: 300,
            background: 'radial-gradient(circle, rgba(var(--accent-tertiary), 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 40, -60, 20, 0],
            y: [0, -40, 20, -50, 0],
            scale: [0.8, 1.1, 0.9, 1.2, 0.8],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* === Floating Particles === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: `rgba(var(--accent), ${p.opacity})`,
              boxShadow: `0 0 ${p.size * 3}px rgba(var(--accent), ${p.opacity * 0.5})`,
            }}
            animate={{
              y: [0, -30, 10, -20, 0],
              x: [0, 15, -10, 5, 0],
              opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.5, p.opacity * 1.2, p.opacity],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* === Fine Grid Overlay === */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(var(--accent), 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--accent), 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* === Central Content === */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Welcome Word Cycling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 h-16 flex flex-col items-center justify-center"
        >
          <span
            className="text-4xl sm:text-5xl font-display font-bold tracking-tight transition-all duration-300"
            style={{
              opacity: wordFade ? 1 : 0,
              transform: wordFade ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.95)',
              background: 'linear-gradient(135deg, rgba(var(--accent), 1), rgba(var(--accent-secondary), 1), rgba(var(--accent-tertiary), 1))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {welcomeWords[wordIndex].text}
          </span>
          <motion.span
            className="text-[10px] font-mono tracking-[0.4em] uppercase mt-2"
            style={{ color: 'rgba(var(--text-tertiary), 0.6)' }}
            animate={{ opacity: wordFade ? 0.6 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {welcomeWords[wordIndex].lang}
          </motion.span>
        </motion.div>

        {/* Circular Progress Ring with Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
          className="relative flex items-center justify-center mb-12"
          style={{ width: 180, height: 180 }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 200, height: 200,
              border: '1px solid rgba(var(--accent), 0.08)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* SVG Progress Ring */}
          <svg
            className="absolute"
            width="180" height="180"
            viewBox="0 0 180 180"
            style={{ transform: 'rotate(-90deg)' }}
          >
            {/* Track */}
            <circle
              cx="90" cy="90" r={radius}
              fill="none"
              stroke="rgba(var(--border), 0.3)"
              strokeWidth="1.5"
            />
            {/* Progress arc */}
            <motion.circle
              cx="90" cy="90" r={radius}
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ filter: 'drop-shadow(0 0 6px rgba(var(--accent), 0.4))' }}
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(var(--accent), 1)" />
                <stop offset="50%" stopColor="rgba(var(--accent-secondary), 1)" />
                <stop offset="100%" stopColor="rgba(var(--accent-tertiary), 1)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Dashed outer orbit */}
          <motion.div
            className="absolute rounded-full border border-dashed"
            style={{
              width: 210, height: 210,
              borderColor: 'rgba(var(--accent-secondary), 0.12)',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          {/* Orbiting dot */}
          <motion.div
            className="absolute"
            style={{ width: 210, height: 210 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute rounded-full"
              style={{
                width: 6, height: 6,
                top: -3, left: '50%', marginLeft: -3,
                background: 'rgba(var(--accent), 0.9)',
                boxShadow: '0 0 12px rgba(var(--accent), 0.6), 0 0 24px rgba(var(--accent), 0.3)',
              }}
            />
          </motion.div>

          {/* Center Logo */}
          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              className="text-5xl font-black tracking-tighter font-display"
              style={{
                background: 'linear-gradient(135deg, rgba(var(--accent), 1), rgba(var(--accent-secondary), 1))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              S.
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Percentage display */}
          <div className="flex items-center gap-3">
            <motion.div
              className="w-8 h-[1px]"
              style={{ background: 'rgba(var(--accent), 0.3)' }}
              animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span
              className="text-2xl font-mono font-light tracking-widest"
              style={{ color: 'rgba(var(--accent), 0.9)' }}
            >
              {String(Math.min(progress, 100)).padStart(3, '0')}
            </span>
            <motion.div
              className="w-8 h-[1px]"
              style={{ background: 'rgba(var(--accent), 0.3)' }}
              animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>

          {/* Status text */}
          <div className="flex items-center gap-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'rgba(var(--accent), 0.8)' }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.span
              className="text-[10px] font-mono uppercase tracking-[0.3em]"
              style={{ color: 'rgba(var(--text-tertiary), 0.5)' }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {progress < 40 ? 'Loading Assets' : progress < 80 ? 'Building Experience' : 'Almost Ready'}
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* === Corner Decorations === */}
      <div className="absolute top-6 left-6 flex items-center gap-2 opacity-30">
        <div className="w-4 h-[1px]" style={{ background: 'rgba(var(--accent), 0.5)' }} />
        <span className="text-[9px] font-mono tracking-widest" style={{ color: 'rgba(var(--text-tertiary), 1)' }}>
          SOUMYAJIT.DEV
        </span>
      </div>
      <div className="absolute bottom-6 right-6 opacity-30">
        <span className="text-[9px] font-mono tracking-widest" style={{ color: 'rgba(var(--text-tertiary), 1)' }}>
          PORTFOLIO 2026
        </span>
      </div>
      <div className="absolute top-6 right-6 opacity-20">
        <motion.div
          className="w-3 h-3 border rounded-full"
          style={{ borderColor: 'rgba(var(--accent), 0.5)' }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
      <div className="absolute bottom-6 left-6 opacity-20">
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ background: 'rgba(var(--accent), 0.5)' }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ErrorScreen({ error }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
      <div className="text-6xl mb-6">⚠️</div>
      <h2 className="text-xl font-mono text-accent mb-2">Failed to load GitHub data</h2>
      <p className="text-text-secondary font-mono text-sm mb-2">{error}</p>
      <p className="text-text-tertiary text-xs font-mono">Make sure VITE_GITHUB_USERNAME is set.</p>
    </div>
  );
}

export default function App() {
  const { profile, repos, loading, error } = useGitHub();
  const [showLoading, setShowLoading] = useState(true);
  const [scrollPct, setScrollPct] = useState(0);

  // Smooth scroll
  useEffect(() => {
    if (showLoading || loading) return;
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [showLoading, loading]);

  // Scroll tracker
  useEffect(() => {
    if (showLoading) return;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPct(Math.min(pct, 100));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showLoading]);

  useEffect(() => {
    // Wait a minimum time for the cinematic loader to run before hiding it
    if (!loading) {
      setTimeout(() => setShowLoading(false), 2000); // 2 second minimum loading time
    }
  }, [loading]);

  if (error) return <ErrorScreen error={error} />;

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {showLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100]"
          >
            <CinematicLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {!showLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <CinematicBackground />
          <Navbar scrollPct={scrollPct} />

          <main className="overflow-hidden">
            <Hero profile={profile} />
            <About profile={profile} />
            <GitHubStats profile={profile} repos={repos} />
            <RepoGrid repos={repos} />
            <Certificates />
            <Contact profile={profile} />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}
