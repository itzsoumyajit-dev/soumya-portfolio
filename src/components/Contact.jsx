import { motion } from 'framer-motion';
import { FiGithub, FiSend, FiExternalLink, FiFileText } from 'react-icons/fi';
import { FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

const SOCIALS = [
  {
    label: 'GitHub',
    handle: '@itzsoumyajit-dev',
    href: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME || 'itzsoumyajit-dev'}`,
    Icon: FiGithub,
    gradient: 'from-gray-600 to-gray-800',
  },
  {
    label: 'X (Twitter)',
    handle: '@ItzSoumyajit',
    href: 'https://x.com/ItzSoumyajit',
    Icon: FaTwitter,
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    label: 'LinkedIn',
    handle: 'Soumyajit Saha',
    href: 'https://www.linkedin.com/in/itz-soumyajit-soumyajit-saha-413a79337',
    Icon: FaLinkedin,
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    label: 'Instagram',
    handle: '@soumyaajitt7',
    href: 'https://www.instagram.com/soumyaajitt7/',
    Icon: FaInstagram,
    gradient: 'from-pink-500 via-red-500 to-yellow-500',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function Contact({ profile }) {
  return (
    <section id="contact" className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-20 blur-[120px] pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(var(--accent), 0.4), rgba(var(--accent-secondary), 0.2), transparent)',
      }} />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} custom={0} className="glass-badge inline-block px-4 py-1.5 rounded-full font-mono text-sm text-accent tracking-widest uppercase font-semibold mb-6">
            // contact
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-display font-bold mb-6 leading-[1.1]">
            Let's Build<br />
            <span className="hero-gradient-text">Something Great</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Whether it's a cool project, a freelance opportunity, or just a chat about tech — my inbox is always open.
          </motion.p>
        </motion.div>

        <div className="flex flex-col items-center gap-12">
          {/* Email CTA */}
          <motion.a
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            href={`mailto:${profile?.email || 'soumyajitsaha@example.com'}`}
            className="group relative flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-lg overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(var(--accent), 1), rgba(var(--accent-secondary), 1))',
              color: 'white',
              boxShadow: '0 12px 40px rgba(var(--accent), 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            <FiSend size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
            <span className="relative z-10">Say Hello</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </motion.a>

          {/* Socials — Glass cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {SOCIALS.map(({ label, handle, href, Icon, gradient }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                title={`${label}: ${handle}`}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-card flex items-center gap-3 px-6 py-3 rounded-full group"
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white relative z-10`}>
                  <Icon size={14} />
                </div>
                <span className="text-sm font-medium text-text-secondary group-hover:text-text transition-colors duration-300 relative z-10">
                  {label}
                </span>
                <FiExternalLink size={12} className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10" />
              </motion.a>
            ))}
          </motion.div>

          {/* Resume */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.a
              href="/Soumyajit_Saha_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="glass-badge flex items-center gap-2 px-5 py-2.5 rounded-full text-text-secondary hover:text-accent font-mono text-sm transition-colors duration-300"
            >
              <FiFileText size={16} />
              View Full Resume
            </motion.a>
          </motion.div>
        </div>

        {/* Quote — Glass card */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="glass-card mt-28 rounded-2xl p-8 text-center"
        >
          <p className="font-serif italic text-text-secondary text-lg mb-2 relative z-10">
            "Code is like humor. When you have to explain it, it's bad."
          </p>
          <p className="font-mono text-xs text-text-tertiary tracking-widest uppercase relative z-10">
            — Cory House
          </p>
        </motion.div>
      </div>
    </section>
  );
}
