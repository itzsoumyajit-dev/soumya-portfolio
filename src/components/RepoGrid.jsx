import { useState } from 'react'
import { FiStar, FiGitBranch, FiExternalLink, FiCircle, FiEye, FiMaximize2 } from 'react-icons/fi'
import { SectionTitle } from './GitHubStats'
import RepoModal from './RepoModal'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const LC = {
  JavaScript:'#f7df1e',TypeScript:'#3178c6',Python:'#3572A5',Rust:'#dea584',
  Go:'#00ADD8',CSS:'#563d7c',HTML:'#e34c26',Java:'#b07219','C++':'#f34b7d',
  Ruby:'#701516',Shell:'#89e051',Vue:'#41b883',Svelte:'#ff3e00',Kotlin:'#7f52ff',
  Swift:'#f05138',Dart:'#00B4AB',PHP:'#777BB4','C#':'#178600',
}

export default function RepoGrid({ repos }) {
  const [showAll, setShowAll] = useState(false)
  const [selectedRepo, setSelectedRepo] = useState(null)
  const display = (showAll ? repos.slice(0,18) : repos.slice(0,6))

  return (
    <section id="repos" style={{ padding:'4rem 2rem 5rem', maxWidth:'1100px', margin:'0 auto' }}>
      <SectionTitle
        tag="// repositories"
        title="Featured Projects"
        subtitle={`${repos.length} public repositories · sorted by stars · click for details`}
      />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:'1.1rem' }}>
        {display.map((repo,i) => <RepoCard key={repo.id} repo={repo} delay={i*0.055} onClick={() => setSelectedRepo(repo)}/>)}
      </div>
      {repos.length > 6 && (
        <div style={{ textAlign:'center', marginTop:'2.5rem' }}>
          <button onClick={() => setShowAll(!showAll)}
            className="lg lg-hover"
            style={{
              background:'transparent', cursor:'pointer',
              borderRadius:'12px', padding:'0.7rem 2rem',
              fontSize:'0.82rem', fontFamily:'var(--font-mono)', color:'var(--c1)',
              letterSpacing:'0.05em',
            }}
          >
            {showAll ? '↑ Show Less' : `↓ Show All ${repos.length} Repos`}
          </button>
        </div>
      )}

      {/* Repo detail modal */}
      {selectedRepo && (
        <RepoModal repo={selectedRepo} onClose={() => setSelectedRepo(null)}/>
      )}
    </section>
  )
}

function RepoCard({ repo, delay, onClick }) {
  const [hov, setHov] = useState(false)
  const lc = LC[repo.language] || '#8494b8'

  // Tilt Effect Variables
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  // Max tilt angle
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["9deg", "-9deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-9deg", "9deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = (mouseX / width) - 0.5
    const yPct = (mouseY / height) - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setHov(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={handleMouseLeave}
      className="lg glow-border"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      style={{
        textDecoration:'none', display:'flex', flexDirection:'column', gap:'0.8rem',
        borderRadius:'20px', padding:'1.4rem',
        border: hov ? '1px solid rgba(56,189,248,0.25)' : '1px solid rgba(255,255,255,0.11)',
        boxShadow: hov ? 'var(--lg-shadow-h), 0 0 40px rgba(56,189,248,0.08)' : 'var(--lg-shadow)',
        rotateX,
        rotateY,
        perspective: 1200,
        transformStyle: "preserve-3d",
        transition:'border 0.4s ease, box-shadow 0.4s ease',
        animation:`fadeUp 0.55s ${delay}s cubic-bezier(0.16,1,0.3,1) both`,
        position:'relative', cursor:'pointer',
      }}
      animate={{
        y: hov ? -8 : 0, 
        scale: hov ? 1.02 : 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Container inside the 3d transformed element to clip the gradients but let the card pop */}
      <div style={{ position:'absolute', inset: 0, borderRadius: '20px', overflow: 'hidden', pointerEvents:'none' }}>
        {/* Language color top bar */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:'2px',
          background:`linear-gradient(90deg, ${lc}, transparent)`,
          opacity: hov ? 1 : 0.5, transition:'opacity 0.3s',
        }}/>
      </div>

      {/* "Click for details" hint */}
      <div style={{
        position:'absolute', top:'0.7rem', right:'0.7rem',
        display:'flex', alignItems:'center', gap:'0.3rem',
        padding:'0.18rem 0.55rem', borderRadius:'100px',
        background: hov ? 'rgba(56,189,248,0.12)' : 'transparent',
        border: hov ? '1px solid rgba(56,189,248,0.2)' : '1px solid transparent',
        opacity: hov ? 1 : 0,
        transform: hov ? 'translateZ(15px) translateY(0)' : 'translateZ(15px) translateY(-4px)',
        transition:'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        pointerEvents:'none',
      }}>
        <FiMaximize2 size={9} style={{ color:'var(--c1)' }}/>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', color:'var(--c1)', letterSpacing:'0.04em' }}>Details</span>
      </div>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', transform: 'translateZ(20px)' }}>
        <span style={{ fontWeight:800, color: hov ? 'var(--text)' : 'rgba(255,255,255,0.85)',
          fontSize:'0.93rem', overflow:'hidden', textOverflow:'ellipsis',
          whiteSpace:'nowrap', flex:1, transition:'color 0.2s' }}>
          {repo.name}
        </span>
        <FiExternalLink size={13} style={{
          color: hov ? 'var(--c1)' : 'var(--muted)', flexShrink:0, marginLeft:'0.6rem',
          transform: hov ? 'translate(2px,-2px)' : 'none', transition:'all 0.2s',
        }}/>
      </div>

      <p style={{ color:'var(--muted2)', fontSize:'0.79rem', lineHeight:1.65, flexGrow:1,
        display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden', transform: 'translateZ(10px)' }}>
        {repo.description || 'No description provided.'}
      </p>

      {repo.topics?.length > 0 && (
        <div style={{ display:'flex', gap:'0.35rem', flexWrap:'wrap', transform: 'translateZ(15px)' }}>
          {repo.topics.slice(0,3).map(t => (
            <span key={t} className="lg-pill" style={{
              padding:'0.18rem 0.6rem', borderRadius:'100px',
              fontSize:'0.67rem', fontFamily:'var(--font-mono)',
              color:'var(--c1)', letterSpacing:'0.02em',
            }}>{t}</span>
          ))}
        </div>
      )}

      <div style={{ display:'flex', gap:'1rem', fontSize:'0.73rem', color:'var(--muted)',
        fontFamily:'var(--font-mono)', paddingTop:'0.75rem',
        borderTop:'1px solid rgba(255,255,255,0.06)', alignItems:'center', transform: 'translateZ(15px)' }}>
        {repo.language && (
          <span style={{ display:'flex', alignItems:'center', gap:'0.3rem', flex:1 }}>
            <FiCircle size={9} style={{ color:lc, fill:lc }}/>{repo.language}
          </span>
        )}
        <span style={{ display:'flex', alignItems:'center', gap:'0.28rem' }}>
          <FiStar size={11} style={{ color:'#fbbf24' }}/>{repo.stargazers_count}
        </span>
        <span style={{ display:'flex', alignItems:'center', gap:'0.28rem' }}>
          <FiGitBranch size={11} style={{ color:'var(--c2)' }}/>{repo.forks_count}
        </span>
        <span style={{ display:'flex', alignItems:'center', gap:'0.28rem' }}>
          <FiEye size={11} style={{ color:'var(--c4)' }}/>{repo.watchers_count}
        </span>
      </div>
    </motion.div>
  )
}
