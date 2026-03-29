export default function Footer() {
  return (
    <footer style={{
      padding: '2rem 6vw',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '1rem',
    }}>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
        color: 'var(--muted)', letterSpacing: '0.08em',
      }}>
        © {new Date().getFullYear()} RC — Built with React, TypeScript, Three.js & GSAP
      </p>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
        color: 'var(--muted)', letterSpacing: '0.08em',
      }}>
        DESIGNED & DEVELOPED BY RAJESH CHITYAL
      </p>
    </footer>
  )
}
