import { motion } from 'framer-motion';
import { FiCode, FiCoffee, FiGithub, FiAward } from 'react-icons/fi';

const TIMELINE = [
  { year: '2024', title: 'Open Source Contributor', desc: 'Actively contributing to open source on GitHub.', icon: '🌍' },
  { year: '2023', title: 'Full Stack Developer', desc: 'Built and shipped multiple full-stack products.', icon: '⚡' },
  { year: '2022', title: 'Started Coding Journey', desc: 'Fell in love with programming and the web.', icon: '🌱' },
];

const FACTS = [
  { icon: FiCoffee, label: 'Coffee Cups', value: '∞', gradient: 'from-amber-500 to-orange-500' },
  { icon: FiCode, label: 'Lines of Code', value: '50K+', gradient: 'from-indigo-500 to-violet-500' },
  { icon: FiGithub, label: 'Commits', value: '500+', gradient: 'from-emerald-500 to-teal-500' },
  { icon: FiAward, label: 'Projects', value: '20+', gradient: 'from-violet-500 to-pink-500' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function About({ profile }) {
  if (!profile) return null;

  return (
    <section id="about" className="py-28 md:py-36 relative z-10">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 20% 50%, rgba(var(--accent), 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(var(--accent-secondary), 0.06) 0%, transparent 50%)',
      }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.span variants={fadeUp} custom={0} className="glass-badge inline-block px-4 py-1.5 rounded-full font-mono text-sm text-accent tracking-widest uppercase font-semibold mb-6">
            // about.me
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-display font-bold mb-6">
            The Person<br />
            Behind The <span className="hero-gradient-text">Code</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            {profile.bio || `Hi! I'm ${profile.login}, a passionate developer who loves building things for the web.`}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 mb-24">
          {/* Bio Card — Liquid Glass */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 glass-card rounded-3xl p-8 md:p-10 group"
          >
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500" style={{
                  background: 'linear-gradient(135deg, rgba(var(--accent), 0.6), rgba(var(--accent-secondary), 0.4))',
                }} />
                <img
                  src={profile.avatar_url}
                  alt="avatar"
                  className="w-16 h-16 rounded-2xl border border-white/20 relative z-10 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <p className="font-mono text-xs text-accent tracking-widest uppercase font-semibold mb-1">About Me</p>
                <h3 className="text-2xl font-bold font-display">{profile.name || profile.login}</h3>
              </div>
            </div>
            
            <p className="text-text-secondary text-lg leading-[1.8] mb-8">
              When I'm not coding, I'm exploring new tech, contributing to open source, or diving into a juicy problem. I believe great software is built with both skill and care.
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {['Open Source', 'Problem Solver', 'Team Player', 'Fast Learner'].map((tag) => (
                <motion.span 
                  key={tag}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="glass-badge px-4 py-1.5 rounded-full font-mono text-xs text-accent font-medium cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Facts Grid — Liquid Glass */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {FACTS.map((fact) => (
              <motion.div 
                key={fact.label}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-card rounded-3xl p-6 flex flex-col items-center justify-center text-center group cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${fact.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500`}>
                  <fact.icon size={20} />
                </div>
                <div className="text-3xl font-bold font-mono text-text mb-1">{fact.value}</div>
                <div className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider">{fact.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Timeline — Liquid Glass */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="glass-badge inline-block px-4 py-1.5 rounded-full font-mono text-sm text-accent tracking-widest uppercase font-semibold mb-10">
            // journey
          </span>
          <div className="relative pl-8 md:pl-10 max-w-4xl">
            <div className="absolute left-0 top-0 bottom-0 w-px" style={{
              background: 'linear-gradient(to bottom, rgba(var(--accent), 0.6), rgba(var(--accent-secondary), 0.3), transparent)',
            }} />
            
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <div className="absolute -left-8 md:-left-10 top-1.5 w-3 h-3 rounded-full bg-background border-2 border-accent -translate-x-[5.5px]" style={{
                    boxShadow: '0 0 12px rgba(var(--accent), 0.5)',
                  }} />
                  <motion.div 
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="glass-card rounded-2xl p-6 cursor-default"
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-xl">{item.icon}</span>
                      <span className="glass-badge px-3 py-1 rounded-full font-mono text-xs text-accent font-semibold">
                        {item.year}
                      </span>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
