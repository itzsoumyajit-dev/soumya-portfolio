import { motion } from 'framer-motion';
import { FiExternalLink, FiAward, FiCpu, FiCloud, FiPackage } from 'react-icons/fi';
import {
  SiGoogle,
  SiPython,
} from 'react-icons/si';

const certificates = [
  {
    num: '01',
    title: 'Google Cybersecurity',
    provider: 'Google',
    desc: 'Professional Certificate verifying cybersecurity skills, covering topics from networking to security protocols.',
    year: '2026',
    link: '/GOOGLE.pdf',
    icon: SiGoogle,
    gradient: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59,130,246,0.35)',
  },
  {
    num: '02',
    title: 'Career Essentials in Generative AI',
    provider: 'Microsoft & LinkedIn',
    desc: 'Essential skills in Generative AI, including core concepts, applications, and ethical considerations in AI deployment.',
    year: '2026',
    link: '/GenAI_Microsoft_LinkedIn.pdf',
    icon: FiCpu,
    gradient: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16,185,129,0.35)',
  },
  {
    num: '03',
    title: 'AWS Certificate',
    provider: 'Amazon Web Services',
    desc: 'Official AWS Certification demonstrating cloud expertise and foundational knowledge of AWS services.',
    year: '2026',
    link: '/aws.pdf',
    icon: FiCloud,
    gradient: 'from-orange-500 to-amber-500',
    glowColor: 'rgba(249,115,22,0.35)',
  },
  {
    num: '04',
    title: 'Amazon Certificate',
    provider: 'Amazon',
    desc: 'Official learning certificate from Amazon demonstrating continued professional development.',
    year: '2026',
    link: '/Amazon.pdf',
    icon: FiPackage,
    gradient: 'from-yellow-500 to-orange-500',
    glowColor: 'rgba(234,179,8,0.35)',
  },
  {
    num: '05',
    title: 'Python Certification',
    provider: 'Microsoft India',
    desc: 'Official Python certification demonstrating programming proficiency and foundational concepts.',
    year: '2026',
    link: '/certificate_Python_Microsoft_India.pdf',
    icon: SiPython,
    gradient: 'from-indigo-500 to-violet-500',
    glowColor: 'rgba(99,102,241,0.35)',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Certificates() {
  return (
    <section id="certificates" className="py-28 md:py-36 relative z-10 overflow-hidden">
      {/* Section Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-black/10 backdrop-blur-[2px]" />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-gradient-to-b from-transparent via-[#0b0618]/30 to-[#0b0618]/50" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="glass-badge inline-block px-4 py-1.5 rounded-full font-mono text-sm text-accent tracking-widest uppercase font-semibold mb-6"
          >
            // achievements
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Professional<br />
            <span className="hero-gradient-text">Certificates</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Industry-recognized certifications that validate my expertise across cloud, AI, cybersecurity, and development.
          </motion.p>
        </motion.div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {certificates.map((cert, i) => (
            <CertCard key={cert.num} {...cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ num, title, provider, desc, year, link, icon: Icon, gradient, glowColor, index }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group block rounded-3xl p-6 md:p-7 relative overflow-hidden no-underline
        bg-gradient-to-br from-purple-500/15 via-[#100826]/40 to-purple-500/10
        backdrop-blur-[60px] backdrop-saturate-200
        border border-purple-500/30
        shadow-[0_15px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)]
        hover:border-purple-400/50
        hover:shadow-[0_25px_60px_rgba(0,0,0,0.35),0_0_40px_var(--cert-glow),inset_0_1px_0_rgba(255,255,255,0.15)]
        transition-shadow duration-500 cursor-pointer"
      style={{ '--cert-glow': glowColor, textDecoration: 'none', color: 'inherit' }}
    >
      {/* Glass reflections */}
      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" />

      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
        }}
      />

      {/* Header: Icon + Title */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex items-center gap-4">
          <div
            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shrink-0 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500`}
          >
            <Icon size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="text-[0.95rem] font-bold truncate text-text">{title}</h3>
            <span className="font-mono text-[0.68rem] text-text-tertiary tracking-wider uppercase">
              {provider} · {year}
            </span>
          </div>
        </div>
        <FiExternalLink
          size={15}
          className="text-text-tertiary group-hover:text-accent shrink-0 mt-1 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>

      {/* Description */}
      <p className="text-text-secondary text-[0.82rem] leading-[1.7] line-clamp-3 mb-5">
        {desc}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <span className="font-mono text-[0.65rem] text-text-tertiary/60">{num}.</span>
        <span
          className="glass-badge px-4 py-1.5 rounded-full font-mono text-[0.68rem] text-accent font-medium
            group-hover:bg-gradient-to-r group-hover:from-accent/20 group-hover:to-accent-secondary/20
            group-hover:border-accent/40
            transition-all duration-300"
        >
          View Credential ↗
        </span>
      </div>
    </motion.a>
  );
}
