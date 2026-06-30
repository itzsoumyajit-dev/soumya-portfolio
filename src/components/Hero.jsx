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
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-20 pb-28">
      
      {/* Removed dark overlay to let the global cinematic background shine through */}

      {/* Dot grid pattern overlay — visible on the right side like the design */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(139, 92, 246, 0.12) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      {/* Subtle Glowing Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div 
          className="absolute w-[70vw] max-w-[700px] h-[70vh] max-h-[700px] rounded-[100%] blur-[120px]"
          style={{ 
            x: mousePos.x * 1.5, 
            y: mousePos.y * 1.5,
            background: 'rgba(110, 70, 220, 0.12)',
          }}
        />
        <motion.div 
          className="absolute w-[50vw] max-w-[500px] h-[50vh] max-h-[500px] rounded-[100%] blur-[100px] animate-blob animation-delay-2000 top-0 right-0 translate-x-1/4 -translate-y-1/4"
          style={{ 
            x: mousePos.x * -1, 
            y: mousePos.y * -1,
            background: 'rgba(130, 80, 245, 0.1)',
          }}
        />
        <motion.div 
          className="absolute w-[40vw] max-w-[400px] h-[40vh] max-h-[400px] rounded-[100%] blur-[90px] animate-blob animation-delay-4000 bottom-0 left-0 -translate-x-1/4 translate-y-1/4"
          style={{ 
            x: mousePos.x * 2, 
            y: mousePos.y * 2,
            background: 'rgba(100, 60, 200, 0.08)',
          }}
        />
      </div>



      {/* --- Main Content --- */}
      <motion.div 
        className="max-w-[1280px] mx-auto px-8 md:px-12 lg:px-16 relative z-10 w-full grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-8 items-center"
      >
        {/* Left Side: Typography */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left xl:pr-12"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 px-5 py-2.5 rounded-full mb-8 shadow-sm" style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            backdropFilter: 'blur(20px)',
          }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px] tracking-[0.2em] text-white/80 uppercase font-semibold">
              Available for new opportunities
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="font-sans text-6xl md:text-8xl lg:text-8xl font-black mb-6 leading-[1.02] tracking-tighter">
            <span className="block text-white">Crafting</span>
            <span className="block relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-400">Digital</span>
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-400 blur-[20px] opacity-50" aria-hidden="true">Digital</span>
            </span>
            <span className="block text-white">Experiences<span className="text-purple-400 font-black">.</span></span>
          </motion.h1>

          {/* Bio */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            I'm <span className="font-semibold italic text-white">{profile.name || profile.login}</span>, a full-stack developer who builds elegant, performant, and scalable web solutions. Let's create something unforgettable.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5">
            <a
              href="#repos"
              className="group relative flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95 text-white"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)',
                boxShadow: '0 0 25px rgba(124, 58, 237, 0.5), 0 8px 20px rgba(124, 58, 237, 0.3)',
                border: '1px solid rgba(167, 139, 250, 0.4)',
              }}
            >
              <span className="relative z-10 font-sans tracking-wide">Explore Projects</span>
              <FiArrowRight className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
            
            <a
              href="/Soumyajit_Saha_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold hover:bg-purple-900/30 transition-colors"
              style={{
                background: 'rgba(11, 5, 29, 0.6)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                boxShadow: '0 0 15px rgba(124, 58, 237, 0.1)',
              }}
            >
              <FiFileText size={18} className="text-purple-300" />
              <span className="font-sans tracking-wide">Resume</span>
            </a>
          </motion.div>
        </motion.div>

        {/* --- Right Side: Bento Grid --- */}
        <motion.div 
          className="hidden lg:grid grid-cols-2 gap-4 w-full h-fit ml-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {/* 1. Main Profile Card (Spans 2 Rows) */}
          <motion.div 
            className="col-span-1 row-span-2 p-6 rounded-3xl z-20 flex flex-col items-center justify-center gap-5 relative overflow-hidden bg-gradient-to-br from-purple-500/15 via-[#100826]/40 to-purple-500/10 backdrop-blur-[60px] backdrop-saturate-200 border border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Glass top reflection */}
            <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" />
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full blur-md opacity-60 animate-pulse-glow" />
              <img
                src={profile.avatar_url || 'https://github.com/identicons/default.png'}
                alt={profile.name || 'Developer'}
                className="relative z-10 w-32 h-32 rounded-full border-2 border-purple-400/50 object-cover bg-background"
              />
              <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#100826] z-20 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            </div>
            <div className="text-center w-full">
              <div className="font-bold text-xl text-white truncate">{profile.name}</div>
              <div className="text-sm text-purple-300 font-mono truncate">@{profile.login}</div>
            </div>
          </motion.div>

          {/* 2. Repositories */}
          <motion.div 
            className="col-span-1 p-5 rounded-3xl z-10 flex flex-col justify-center gap-2 relative overflow-hidden bg-gradient-to-br from-purple-500/15 via-[#100826]/40 to-purple-500/10 backdrop-blur-[60px] backdrop-saturate-200 border border-purple-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)]"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-purple-400 bg-purple-500/20 shadow-[inset_0_0_0_1px_rgba(168,85,247,0.35)]">
                <FiBookOpen size={20} />
              </div>
              <div className="text-xs text-white uppercase tracking-wider font-semibold">Repos</div>
            </div>
            <div className="text-4xl font-bold font-mono tracking-tighter mt-1 text-white">{profile.public_repos}</div>
          </motion.div>

          {/* 3. Followers */}
          <motion.div 
            className="col-span-1 p-5 rounded-3xl z-10 flex flex-col justify-center gap-2 relative overflow-hidden bg-gradient-to-br from-purple-500/15 via-[#100826]/40 to-purple-500/10 backdrop-blur-[60px] backdrop-saturate-200 border border-purple-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)]"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-purple-400 bg-purple-500/20 shadow-[inset_0_0_0_1px_rgba(168,85,247,0.35)]">
                <FiUsers size={20} />
              </div>
              <div className="text-xs text-white uppercase tracking-wider font-semibold">Followers</div>
            </div>
            <div className="text-4xl font-bold font-mono tracking-tighter mt-1 text-white">{profile.followers}</div>
          </motion.div>

          {/* 4. Code Snippet (Spans 2 Columns) */}
          <motion.div 
            className="col-span-2 p-6 rounded-3xl z-10 relative overflow-hidden bg-gradient-to-br from-purple-500/15 via-[#100826]/40 to-purple-500/10 backdrop-blur-[60px] backdrop-saturate-200 border border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" />
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/90" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
              <div className="w-3 h-3 rounded-full bg-green-500/90" />
            </div>
            <pre className="text-sm font-mono leading-relaxed text-purple-100 overflow-hidden">
              <span className="text-purple-400">const</span> <span className="text-purple-300">developer</span> = {'{'} <br/>
              &nbsp;&nbsp;role: <span className="text-emerald-400">'Full Stack'</span>,<br/>
              &nbsp;&nbsp;passion: <span className="text-emerald-400">'UI/UX'</span>,<br/>
              &nbsp;&nbsp;status: <span className="text-emerald-400">'Online'</span><br/>
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
