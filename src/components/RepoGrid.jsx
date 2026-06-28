import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiGitBranch, FiGithub } from 'react-icons/fi';
import RepoModal from './RepoModal';

const LC = {
  JavaScript:'#f7df1e', TypeScript:'#3178c6', Python:'#3572A5', Rust:'#dea584',
  Go:'#00ADD8', CSS:'#563d7c', HTML:'#e34c26', Java:'#b07219', 'C++':'#f34b7d',
  Ruby:'#701516', Shell:'#89e051', Vue:'#41b883', Svelte:'#ff3e00', Kotlin:'#7f52ff',
  Swift:'#f05138', Dart:'#00B4AB', PHP:'#777BB4', 'C#':'#178600',
};

export default function RepoGrid({ repos }) {
  const [showAll, setShowAll] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const display = showAll ? repos.slice(0, 18) : repos.slice(0, 6);

  return (
    <section id="repos" className="py-28 md:py-36 relative z-10">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 70% 50%, rgba(var(--accent-secondary), 0.06) 0%, transparent 50%)',
      }} />

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
        className="glass-card rounded-3xl p-6 md:p-8 h-full flex flex-col"
      >
        {/* Language Color bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-[2]">
          <div 
            className="h-full transition-all duration-500 opacity-40 group-hover:opacity-100"
            style={{ background: `linear-gradient(90deg, ${lc}, transparent 80%)` }}
          />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-display font-bold text-xl group-hover:text-accent transition-colors duration-300 line-clamp-1">
              {repo.name}
            </h3>
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noreferrer" 
              onClick={(e) => e.stopPropagation()}
              className="glass-badge p-2 rounded-xl hover:bg-accent/20 hover:text-accent transition-all duration-300 text-text-secondary flex-shrink-0"
            >
              <FiGithub size={16} />
            </a>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
            {repo.description || 'No description provided.'}
          </p>

          <div className="mt-auto space-y-4">
            {repo.topics?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {repo.topics.slice(0, 3).map(t => (
                  <span key={t} className="glass-badge px-3 py-1 rounded-full font-mono text-[11px] text-accent font-medium">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-xs font-mono text-text-tertiary pt-4 border-t" style={{ borderColor: 'var(--glass-border)' }}>
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lc, boxShadow: `0 0 8px ${lc}50` }} />
                  {repo.language}
                </span>
              )}
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <FiStar className="text-amber-400" /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <FiGitBranch className="text-violet-400" /> {repo.forks_count}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
