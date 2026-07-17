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

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden">
      {/* Background glow for loader */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[400px] h-[400px] bg-accent rounded-full blur-[100px] animate-pulse-glow" />
      </div>

      <div className="relative z-10 w-full max-w-md px-8 flex flex-col items-center">
        {/* Animated Logo/Icon */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 relative flex items-center justify-center w-24 h-24"
        >
          <div className="text-5xl font-black hero-gradient-text tracking-tighter">S.</div>
          <motion.div 
            className="absolute -inset-4 border border-accent/40 rounded-full"
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
          <motion.div 
            className="absolute -inset-8 border border-accent-secondary/20 rounded-full border-dashed"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          />
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-border relative overflow-hidden mb-4">
          <motion.div 
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-accent to-accent-secondary"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>

        {/* Loading Text & Percentage */}
        <div className="w-full flex justify-between items-center text-xs font-mono uppercase tracking-widest text-text-secondary">
          <motion.span 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Initializing Experience
          </motion.span>
          <span className="text-accent">{Math.min(progress, 100)}%</span>
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
