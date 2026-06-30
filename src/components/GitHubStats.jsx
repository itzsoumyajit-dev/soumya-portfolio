import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiStar, FiGitBranch, FiCode, FiUsers } from 'react-icons/fi';
import { GitHubCalendar } from 'react-github-calendar';

function AnimatedNumber({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && value > 0) {
      const duration = 1500;
      const startTime = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * value));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function GitHubStats({ profile, repos }) {
  if (!profile) return null;

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + (r.forks_count || 0), 0);

  const stats = [
    { icon: FiCode, label: 'Repositories', value: profile.public_repos || 0, gradient: 'from-indigo-500 to-violet-500', stroke: 'stroke-indigo-500', path: 'M0,15 Q10,2 20,12 T40,15 T60,5 T80,18 T100,10' },
    { icon: FiStar, label: 'Total Stars', value: totalStars, gradient: 'from-amber-400 to-orange-500', stroke: 'stroke-amber-400', path: 'M0,18 Q15,5 30,12 T60,18 T85,5 T100,12' },
    { icon: FiGitBranch, label: 'Total Forks', value: totalForks, gradient: 'from-emerald-400 to-teal-500', stroke: 'stroke-emerald-400', path: 'M0,12 Q12,20 25,10 T50,15 T75,5 T100,15' },
    { icon: FiUsers, label: 'Followers', value: profile.followers || 0, gradient: 'from-violet-500 to-pink-500', stroke: 'stroke-pink-500', path: 'M0,10 Q15,18 30,8 T65,18 T85,5 T100,12' },
  ];

  return (
    <section id="stats" className="py-28 md:py-36 relative z-10 overflow-hidden">
      {/* Cinematic Stats Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 bg-gradient-to-t from-transparent via-[#0b0618]/40 to-[#0b0618]/80" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] opacity-30 pointer-events-none bg-purple-600/20 blur-[150px] mix-blend-screen rounded-full" />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8Y2lyY2xlIGN4PSI0IiBjeT0iNCIgcj0iMiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4=')] mix-blend-overlay" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.span variants={fadeUp} custom={0} className="glass-badge inline-block px-4 py-1.5 rounded-full font-mono text-sm text-accent tracking-widest uppercase font-semibold mb-6">
            // analytics
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-display font-bold">
            GitHub <span className="hero-gradient-text">Activity</span>
          </motion.h2>
        </motion.div>

        {/* Stats Grid — Liquid Glass */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center group cursor-default relative overflow-hidden bg-gradient-to-br from-purple-500/15 via-[#100826]/40 to-purple-500/10 backdrop-blur-[60px] backdrop-saturate-200 border border-purple-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)]"
            >
              <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" />
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 relative z-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]`}>
                <stat.icon size={24} />
              </div>
              <div className="text-3xl md:text-4xl font-bold font-mono text-text mb-2 relative z-10">
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="text-[10px] font-mono text-text-tertiary uppercase tracking-widest relative z-10 mb-4">
                {stat.label}
              </div>
              
              {/* Decorative sparkline */}
              <div className="w-full h-8 relative z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500 mt-auto">
                <svg viewBox="0 0 100 20" className={`w-full h-full fill-none ${stat.stroke}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="none">
                  <path d={stat.path} />
                  <path d={stat.path} className="opacity-20" strokeWidth="4" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contribution Calendar — Liquid Glass */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl p-8 md:p-10 flex flex-col items-center relative overflow-hidden bg-gradient-to-br from-purple-500/15 via-[#100826]/40 to-purple-500/10 backdrop-blur-[60px] backdrop-saturate-200 border border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]"
        >
          {/* Glass top reflection */}
          <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" />
          
          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-10 relative z-10 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] flex items-center justify-center text-white shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-1">Contributions in the Last Year</h3>
                <p className="text-sm text-text-tertiary">Every square represents a day. Darker the color, more the contributions.</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#100826]/80 border border-purple-500/20 text-sm text-text-secondary hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Last 12 months
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>

          <div className="w-full max-w-full overflow-x-auto pb-4 relative z-10">
            <div className="min-w-max mx-auto px-4">
              <GitHubCalendar 
                username={import.meta.env.VITE_GITHUB_USERNAME || 'itzsoumyajit-dev'}
                colorScheme="dark"
                theme={{
                  dark: ['#0e0e16', '#6366f130', '#6366f160', '#6366f1a0', '#6366f1']
                }}
                fontSize={12}
                blockSize={13}
                blockMargin={4}
                blockRadius={3}
              />
            </div>
          </div>

          <div className="w-full flex justify-end mt-4 relative z-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#100826]/80 border border-purple-500/20 text-sm font-medium">
              <span className="text-orange-500">🔥</span>
              <span className="text-purple-300">Longest streak:</span>
              <span className="text-white">12 days</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
