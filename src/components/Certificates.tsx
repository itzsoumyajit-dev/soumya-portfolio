import React, { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
// @ts-ignore
import { SectionTitle } from './GitHubStats'
import { FiExternalLink, FiAward } from 'react-icons/fi'

const certificates = [
  {
    num: '01',
    title: 'Google Cybersecurity',
    provider: 'Google',
    desc: 'Professional Certificate verifying cybersecurity skills, covering topics from networking to security protocols.',
    color: '#38bdf8', // c1 color
    year: '2026',
    link: '/GOOGLE.pdf'
  },
  {
    num: '02',
    title: 'Career Essentials in Generative AI',
    provider: 'Microsoft & LinkedIn',
    desc: 'Essential skills in Generative AI, including core concepts, applications, and ethical considerations in AI deployment.',
    color: '#a78bfa', // c2 color
    year: '2026',
    link: '/GenAI_Microsoft_LinkedIn.pdf'
  },
  {
    num: '03',
    title: 'AWS Certificate',
    provider: 'Amazon Web Services',
    desc: 'Official AWS Certification demonstrating cloud expertise and foundational knowledge of AWS services.',
    color: '#f59e0b', // orange color
    year: '2026',
    link: '/aws.pdf'
  },
  {
    num: '04',
    title: 'Amazon Certificate',
    provider: 'Amazon',
    desc: 'Official learning certificate from Amazon demonstrating continued professional development.',
    color: '#10b981', // emerald color
    year: '2026',
    link: '/Amazon.pdf'
  }
]

export default function Certificates() {
  return (
    <section id="certificates" style={{ padding: '4rem 2rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <SectionTitle
        tag="// achievements"
        title="Professional Certificates"
        subtitle="Credentials, courses, and learning milestones."
      />

      <div className="certs-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
        gap: '1.2rem',
      }}>
        {certificates.map((cert, i) => (
          <CertificateCard key={cert.num} delay={i * 0.1} {...cert} />
        ))}
      </div>
    </section>
  )
}

interface CertProps {
  title: string;
  provider: string;
  desc: string;
  color: string;
  year: string;
  link: string;
  delay: number;
}

function CertificateCard({ title, provider, desc, color, year, link, delay }: CertProps) {
  const [hov, setHov] = useState(false)

  // Tilt Effect Variables
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={handleMouseLeave}
      className="lg glow-border"
      style={{
        textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem',
        borderRadius: '20px', padding: '1.4rem',
        border: hov ? `1px solid ${color}40` : '1px solid rgba(255,255,255,0.11)',
        boxShadow: hov ? `var(--lg-shadow-h), 0 0 40px ${color}15` : 'var(--lg-shadow)',
        rotateX,
        rotateY,
        perspective: 1200,
        transformStyle: "preserve-3d",
        transition: 'border 0.4s ease, box-shadow 0.4s ease',
        animation: `fadeUp 0.55s ${delay}s cubic-bezier(0.16,1,0.3,1) both`,
        position: 'relative', cursor: 'pointer',
      }}
      animate={{
        y: hov ? -6 : 0,
        scale: hov ? 1.02 : 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div style={{ position: 'absolute', inset: 0, borderRadius: '20px', overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Top bar color */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: `linear-gradient(90deg, ${color}, transparent)`,
          opacity: hov ? 1 : 0.6, transition: 'opacity 0.3s',
        }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', transform: 'translateZ(20px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: 38, height: 38, borderRadius: '12px',
            background: `linear-gradient(135deg, ${color}20, ${color}05)`,
            border: `1px solid ${color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: color, flexShrink: 0
          }}>
            <FiAward size={18} />
          </div>
          <div>
            <h3 style={{
              color: hov ? 'var(--text)' : 'rgba(255,255,255,0.85)',
              fontSize: '1rem', fontWeight: 800, transition: 'color 0.2s', margin: 0,
              display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden'
            }}>
              {title}
            </h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.05em' }}>
              {provider} · {year}
            </span>
          </div>
        </div>
        <FiExternalLink size={14} style={{
          color: hov ? color : 'var(--muted)', flexShrink: 0, marginLeft: '0.6rem',
          transform: hov ? 'translate(2px,-2px)' : 'none', transition: 'all 0.2s',
        }} />
      </div>

      <p style={{
        color: 'var(--muted2)', fontSize: '0.82rem', lineHeight: 1.65, flexGrow: 1, marginTop: '0.4rem',
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        transform: 'translateZ(10px)'
      }}>
        {desc}
      </p>

      <div style={{
        display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem', transform: 'translateZ(15px)'
      }}>
        <span className="lg-pill" style={{
          padding: '0.25rem 0.8rem', borderRadius: '100px',
          fontSize: '0.68rem', fontFamily: 'var(--font-mono)',
          color: hov ? '#fff' : color,
          background: hov ? color : 'transparent',
          border: hov ? `1px solid ${color}` : `1px solid ${color}40`,
          letterSpacing: '0.05em', transition: 'all 0.3s'
        }}>
          View Credential ↗
        </span>
      </div>
    </motion.a>
  )
}
