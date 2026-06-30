import { motion } from 'framer-motion';
import { FiMail, FiSend, FiMapPin, FiUser, FiTag, FiEdit2 } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function Contact({ profile }) {
  return (
    <section id="contact" className="py-28 md:py-36 relative overflow-hidden bg-gradient-to-b from-transparent to-black/60">
      {/* Cinematic Contact Background Layers */}
      
      {/* Edge Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
      
      {/* Soft Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20 blur-[150px] pointer-events-none bg-purple-500/20 mix-blend-screen" />
      
      {/* Purple Fog */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] opacity-40 pointer-events-none bg-gradient-to-t from-[#0b0618] to-transparent" />
      
      {/* Tiny Stars / Particles overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjZmZmIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjAuNSIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4=')] mix-blend-screen" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} custom={0} className="glass-badge inline-block px-4 py-1.5 rounded-full font-mono text-sm text-accent tracking-widest uppercase font-semibold mb-6">
            // contact.me
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-display font-bold mb-4">
            Let's <span className="hero-gradient-text">Connect</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-text-secondary text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0b0618]/80 border border-purple-500/20 rounded-3xl p-8 md:p-10 flex flex-col"
          >
            <h3 className="text-2xl font-medium text-white mb-1">Let's build something</h3>
            <h3 className="text-3xl font-bold text-purple-400 mb-6 font-display tracking-wide">amazing together</h3>
            
            {/* Squiggly line */}
            <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="mb-10 opacity-70">
              <path d="M0 10 Q 5 0, 10 10 T 20 10 T 30 10 T 40 10 T 50 10" stroke="#a78bfa" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M0 15 Q 5 5, 10 15 T 20 15 T 30 15 T 40 15 T 50 15" stroke="#a78bfa" strokeWidth="2" fill="none" strokeLinecap="round" className="opacity-50" />
            </svg>

            <div className="space-y-8 mt-auto">
              {/* Email */}
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#1a103c] border border-purple-500/20 flex items-center justify-center text-purple-300 shrink-0">
                  <FiMail size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Email</h4>
                  <a href={`mailto:${profile?.email || 'soumyajit.dev@gmail.com'}`} className="text-text-tertiary text-sm hover:text-purple-400 transition-colors">
                    {profile?.email || 'soumyajit.dev@gmail.com'}
                  </a>
                </div>
              </div>

              {/* Telegram */}
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#1a103c] border border-purple-500/20 flex items-center justify-center text-purple-300 shrink-0">
                  <FiSend size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Telegram</h4>
                  <a href="https://t.me/itzsoumyajit_dev" target="_blank" rel="noreferrer" className="text-text-tertiary text-sm hover:text-purple-400 transition-colors">
                    @itzsoumyajit_dev
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#1a103c] border border-purple-500/20 flex items-center justify-center text-purple-300 shrink-0">
                  <FaLinkedin size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">LinkedIn</h4>
                  <a href="https://linkedin.com/in/itzsoumyajit-dev" target="_blank" rel="noreferrer" className="text-text-tertiary text-sm hover:text-purple-400 transition-colors">
                    linkedin.com/in/itzsoumyajit-dev
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#1a103c] border border-purple-500/20 flex items-center justify-center text-purple-300 shrink-0">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Location</h4>
                  <p className="text-text-tertiary text-sm">
                    {profile?.location || 'India'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form (Glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl p-8 md:p-10 relative overflow-hidden bg-gradient-to-br from-purple-500/15 via-[#100826]/40 to-purple-500/10 backdrop-blur-[60px] backdrop-saturate-200 border border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col"
          >
            {/* Glass top reflection */}
            <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-white">Send me a message</h3>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                </span>
              </div>
              <p className="text-text-secondary text-sm mb-8">I'll get back to you as soon as possible.</p>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-tertiary group-focus-within:text-purple-400 transition-colors">
                      <FiUser size={16} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full bg-[#100826]/50 border border-purple-500/20 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-text-tertiary focus:outline-none focus:border-purple-500/50 focus:bg-[#100826]/80 transition-all"
                    />
                  </div>
                  {/* Email Input */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-tertiary group-focus-within:text-purple-400 transition-colors">
                      <FiMail size={16} />
                    </div>
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full bg-[#100826]/50 border border-purple-500/20 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-text-tertiary focus:outline-none focus:border-purple-500/50 focus:bg-[#100826]/80 transition-all"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-tertiary group-focus-within:text-purple-400 transition-colors">
                    <FiTag size={16} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    className="w-full bg-[#100826]/50 border border-purple-500/20 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-text-tertiary focus:outline-none focus:border-purple-500/50 focus:bg-[#100826]/80 transition-all"
                  />
                </div>

                {/* Message Input */}
                <div className="relative group">
                  <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-text-tertiary group-focus-within:text-purple-400 transition-colors">
                    <FiEdit2 size={16} />
                  </div>
                  <textarea 
                    placeholder="Your Message" 
                    rows={4}
                    className="w-full bg-[#100826]/50 border border-purple-500/20 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-text-tertiary focus:outline-none focus:border-purple-500/50 focus:bg-[#100826]/80 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 text-white font-medium text-sm hover:bg-purple-500 transition-colors shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] active:scale-[0.98]"
                >
                  Send Message <FiSend size={16} />
                </button>
              </form>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
