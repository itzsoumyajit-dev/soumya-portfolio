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
    { icon: FiCode, label: 'Repositories', value: profile.public_repos || 0, gradient: 'from-indigo-500 to-violet-500' },
    { icon: FiStar, label: 'Total Stars', value: totalStars, gradient: 'from-amber-400 to-orange-500' },
    { icon: FiGitBranch, label: 'Total Forks', value: totalForks, gradient: 'from-emerald-400 to-teal-500' },
    { icon: FiUsers, label: 'Followers', value: profile.followers || 0, gradient: 'from-violet-500 to-pink-500' },
  ];

  return (
    <section id="stats" className="py-28 md:py-36 relative z-10">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(var(--accent), 0.1) 0%, transparent 60%)',
      }} />

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
              className="glass-card rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center group cursor-default"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 relative z-10`}>
                <stat.icon size={24} />
              </div>
              <div className="text-3xl md:text-4xl font-bold font-mono text-text mb-2 relative z-10">
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="text-[10px] font-mono text-text-tertiary uppercase tracking-widest relative z-10">
                {stat.label}
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
          className="glass-card rounded-3xl p-8 md:p-10 flex flex-col items-center"
        >
          <p className="font-mono text-xs text-text-tertiary tracking-widest uppercase font-semibold mb-8 relative z-10">
            Contributions in the last year
          </p>
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
        </motion.div>
      </div>
    </section>
  );
}
