import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiMapPin, FiUsers, FiBookOpen, FiFileText, FiArrowRight, FiGithub, FiTerminal, FiCode, FiActivity } from 'react-icons/fi';

export default function Hero({ profile }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!profile) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-20">
      
      {/* --- Premium Dynamic Background --- */}
      <div className="absolute inset-0 z-0 bg-background" />
      
      {/* Radial fading grid texture */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] dark:opacity-[0.08]"
        style={{
          backgroundImage: 'linear-gradient(to right, rgb(var(--text-primary)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--text-primary)) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 100%)',
        }}
      />
      
      {/* Subtle Glowing Orbs (No mix-blend issues) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div 
          className="absolute w-[80vw] max-w-[800px] h-[80vh] max-h-[800px] rounded-[100%] bg-accent/10 dark:bg-accent/20 blur-[100px] animate-blob"
          style={{ x: mousePos.x * 1.5, y: mousePos.y * 1.5 }}
        />
        <motion.div 
          className="absolute w-[60vw] max-w-[600px] h-[60vh] max-h-[600px] rounded-[100%] bg-accent-secondary/15 dark:bg-accent-secondary/25 blur-[120px] animate-blob animation-delay-2000 top-0 right-0 translate-x-1/4 -translate-y-1/4"
          style={{ x: mousePos.x * -1, y: mousePos.y * -1 }}
        />
        <motion.div 
          className="absolute w-[50vw] max-w-[500px] h-[50vh] max-h-[500px] rounded-[100%] bg-accent-tertiary/15 dark:bg-accent-tertiary/25 blur-[90px] animate-blob animation-delay-4000 bottom-0 left-0 -translate-x-1/4 translate-y-1/4"
          style={{ x: mousePos.x * 2, y: mousePos.y * 2 }}
        />
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />

      {/* --- Main Content --- */}
      <motion.div 
        style={{ opacity }}
        className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-8 items-center"
      >
        {/* Left Side: Typography */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left xl:pr-12"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="glass-badge flex items-center gap-3 px-4 py-2 rounded-full mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px] tracking-[0.2em] text-text-secondary uppercase font-semibold">
              Available for new opportunities
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-8xl font-black mb-6 leading-[1.02] tracking-tighter">
            <span className="block text-text">Crafting</span>
            <span className="block hero-gradient-text pb-1 drop-shadow-sm">Digital</span>
            <span className="block text-text">Experiences.</span>
          </motion.h1>

          {/* Bio */}
          <motion.p variants={itemVariants} className="text-text-secondary text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light">
            I'm <span className="font-medium text-text">{profile.name || profile.login}</span>, a full-stack developer who builds elegant, performant, and scalable web solutions. Let's create something unforgettable.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5">
            <a
              href="#repos"
              className="group relative flex items-center gap-3 px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95"
            >
              {/* Premium Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-secondary to-accent bg-[length:200%_auto] animate-shimmer" />
              <div className="absolute inset-[1px] rounded-full bg-background/10 backdrop-blur-sm group-hover:bg-transparent transition-colors duration-500" />
              
              <span className="relative z-10 font-sans tracking-wide text-white drop-shadow-md">Explore Projects</span>
              <FiArrowRight className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300 text-white" />
            </a>
            
            <a
              href="/Soumyajit_Saha_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button flex items-center gap-2 px-8 py-4 rounded-full text-text font-semibold hover:text-accent transition-colors"
            >
              <FiFileText size={18} />
              <span className="font-sans tracking-wide">Resume</span>
            </a>
          </motion.div>
        </motion.div>

        {/* --- Right Side: Structured Bento Grid --- */}
        <motion.div 
          className="hidden lg:grid grid-cols-2 gap-4 w-full h-fit ml-auto"
          style={{ y: y1 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {/* 1. Main Profile Card (Spans 2 Rows) */}
          <motion.div 
            className="col-span-1 row-span-2 glass-card p-6 rounded-3xl z-20 flex flex-col items-center justify-center gap-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-accent via-accent-secondary to-accent-tertiary rounded-full blur-md opacity-40 animate-pulse-glow" />
              <img
                src={profile.avatar_url || 'https://github.com/identicons/default.png'}
                alt={profile.name || 'Developer'}
                className="relative z-10 w-32 h-32 rounded-full border-[3px] border-background object-cover bg-background"
              />
              <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-400 border-[3px] border-background z-20" />
            </div>
            <div className="text-center w-full">
              <div className="font-bold text-xl text-text truncate">{profile.name}</div>
              <div className="text-sm text-text-tertiary font-mono truncate">@{profile.login}</div>
            </div>
          </motion.div>

          {/* 2. Repositories */}
          <motion.div 
            className="col-span-1 glass-card p-5 rounded-3xl z-10 flex flex-col justify-center shadow-lg gap-2"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent ring-1 ring-accent/20">
                <FiBookOpen size={20} />
              </div>
              <div className="text-xs text-text-tertiary uppercase tracking-wider font-semibold">Repos</div>
            </div>
            <div className="text-4xl font-bold font-mono tracking-tighter mt-1">{profile.public_repos}</div>
          </motion.div>

          {/* 3. Followers */}
          <motion.div 
            className="col-span-1 glass-card p-5 rounded-3xl z-10 flex flex-col justify-center shadow-lg gap-2"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-tertiary/10 flex items-center justify-center text-accent-tertiary ring-1 ring-accent-tertiary/20">
                <FiUsers size={20} />
              </div>
              <div className="text-xs text-text-tertiary uppercase tracking-wider font-semibold">Followers</div>
            </div>
            <div className="text-4xl font-bold font-mono tracking-tighter mt-1">{profile.followers}</div>
          </motion.div>

          {/* 4. Code Snippet (Spans 2 Columns) */}
          <motion.div 
            className="col-span-2 glass-card p-6 rounded-3xl z-10 shadow-lg"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/90" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/90" />
            </div>
            <pre className="text-xs md:text-sm font-mono leading-relaxed text-text-primary overflow-hidden">
              <span className="text-accent-secondary">const</span> <span className="text-accent-tertiary">developer</span> = {'{'} <br/>
              &nbsp;&nbsp;role: <span className="text-emerald-500">'Full Stack'</span>,<br/>
              &nbsp;&nbsp;passion: <span className="text-emerald-500">'UI/UX'</span>,<br/>
              &nbsp;&nbsp;status: <span className="text-emerald-500">'Online'</span><br/>
              {'}'};
            </pre>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
      >
        <span className="text-text-tertiary text-[9px] font-mono tracking-[0.3em] uppercase font-bold">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-text-tertiary/20 flex items-start justify-center pt-1.5 backdrop-blur-sm"
        >
          <div className="w-1 h-1.5 rounded-full bg-accent/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
