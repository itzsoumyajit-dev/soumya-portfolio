import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiGitBranch, FiGithub, FiCode, FiImage, FiHeart, FiMessageSquare } from 'react-icons/fi';
import RepoModal from './RepoModal';

const LC = {
  JavaScript:'#f7df1e', TypeScript:'#3178c6', Python:'#3572A5', Rust:'#dea584',
  Go:'#00ADD8', CSS:'#563d7c', HTML:'#e34c26', Java:'#b07219', 'C++':'#f34b7d',
  Ruby:'#701516', Shell:'#89e051', Vue:'#41b883', Svelte:'#ff3e00', Kotlin:'#7f52ff',
  Swift:'#f05138', Dart:'#00B4AB', PHP:'#777BB4', 'C#':'#178600',
};

function getRepoIcon(name) {
  const n = name.toLowerCase();
  if (n.includes('image')) return <FiImage size={20} />;
  if (n.includes('medical') || n.includes('health')) return <FiHeart size={20} />;
  if (n.includes('chat') || n.includes('gpt')) return <FiMessageSquare size={20} />;
  if (n.includes('translator')) return <span className="font-bold text-lg">A文</span>;
  return <FiCode size={20} />;
}

export default function RepoGrid({ repos }) {
  const [showAll, setShowAll] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const display = showAll ? repos.slice(0, 18) : repos.slice(0, 6);

  return (
    <section id="repos" className="py-28 md:py-36 relative z-10 overflow-hidden">
      {/* Cinematic Projects Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60 bg-gradient-to-b from-[#0b0618]/80 via-[#100826]/70 to-[#0b0618]/90 backdrop-blur-[2px]" />
      
      {/* Soft Fog & Lighting */}
      <div className="absolute top-1/4 left-0 w-full h-[300px] opacity-20 pointer-events-none bg-purple-600/30 blur-[100px] mix-blend-screen" />
      <div className="absolute bottom-1/4 right-0 w-full h-[400px] opacity-10 pointer-events-none bg-indigo-500/20 blur-[120px] mix-blend-screen" />
      
      {/* Floating abstract rings local to this section */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full border-[1px] border-purple-500/10 opacity-20" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] rounded-full border-[1px] border-indigo-500/5 opacity-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="glass-badge inline-block px-4 py-1.5 rounded-full font-mono text-sm text-accent tracking-widest uppercase font-semibold mb-6">
            // repositories
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Featured <span className="hero-gradient-text">Projects</span>
          </h2>
          <p className="text-text-secondary text-lg">
            {repos.length} public repositories · sorted by stars
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence>
            {display.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} delay={i * 0.08} onClick={() => setSelectedRepo(repo)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {repos.length > 6 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAll(!showAll)}
              className="glass-button px-8 py-4 rounded-full text-accent font-mono text-sm"
            >
              {showAll ? '↑ Show Less' : `↓ Show All ${repos.length} Repos`}
            </motion.button>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedRepo && (
            <RepoModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function RepoCard({ repo, delay, onClick }) {
  const lc = LC[repo.language] || '#71717a';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
      transition={{ duration: 0.6, delay: delay % 0.5, ease: [0.16, 1, 0.3, 1] }}
      layout
      onClick={onClick}
      className="group cursor-pointer h-full"
    >
      <motion.div 
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="rounded-3xl p-6 md:p-8 h-full flex flex-col relative overflow-hidden bg-gradient-to-br from-purple-500/15 via-[#100826]/40 to-purple-500/10 backdrop-blur-[60px] backdrop-saturate-200 border border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)]"
      >
        {/* Glass top reflection */}
        <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" />

        {/* Content Wrapper (above reflections) */}
        <div className="relative z-10 flex flex-col h-full">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-300">
                {getRepoIcon(repo.name)}
              </div>
              <h3 className="font-display font-bold text-xl text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-1">
                {repo.name}
              </h3>
            </div>
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noreferrer" 
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 rounded-full bg-[#100826]/50 border border-purple-500/20 flex items-center justify-center text-white hover:bg-purple-500 hover:border-purple-500 transition-all duration-300 shrink-0"
            >
              <FiGithub size={18} />
            </a>
          </div>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
            {repo.description || 'No description provided.'}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {repo.language && (
              <span className="glass-badge px-3 py-1.5 rounded-xl font-mono text-[11px] text-accent font-medium flex items-center gap-1.5 bg-[#100826]/50 border border-purple-500/20">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lc, boxShadow: `0 0 8px ${lc}80` }} />
                {repo.language}
              </span>
            )}
            {repo.topics?.slice(0, 3).map(t => (
              <span key={t} className="glass-badge px-3 py-1.5 rounded-xl font-mono text-[11px] text-accent font-medium bg-[#100826]/50 border border-purple-500/20">
                {t}
              </span>
            ))}
          </div>

          {/* Footer Stats */}
          <div className="mt-auto flex items-center gap-5 text-xs font-mono text-text-tertiary">
            <span className="flex items-center gap-1.5 text-amber-400">
              <FiStar size={14} /> <span className="text-text-secondary">{repo.stargazers_count}</span>
            </span>
            <span className="flex items-center gap-1.5 text-text-tertiary">
              <FiGitBranch size={14} /> <span className="text-text-secondary">{repo.forks_count}</span>
            </span>
          </div>
          
        </div>
      </motion.div>
    </motion.div>
  );
}
