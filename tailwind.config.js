/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg:     'var(--bg)',
        bg2:    'var(--bg2)',
        text:   'var(--text)',
        muted:  'var(--muted)',
        muted2: 'var(--muted2)',
        c1:     'var(--c1)',
        c2:     'var(--c2)',
        c3:     'var(--c3)',
        c4:     'var(--c4)',
        c5:     'var(--c5)',
        'lg-bg':   'var(--lg-bg)',
        'lg-bg-h': 'var(--lg-bg-h)',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
        serif:   ['Playfair Display', 'serif'],
        heading: ['Bebas Neue', 'sans-serif'],
        syne:    ['Syne', 'sans-serif'],
      },
      borderRadius: {
        'r':  '18px',
        'r2': '26px',
        'r3': '36px',
      },
      backdropBlur: {
        'glass': '18px',
      },
      keyframes: {
        // ──── CORE ANIMATIONS ────
        'drift': {
          '0%':   { transform: 'translate(0,0) scale(1) rotate(0deg)' },
          '33%':  { transform: 'translate(80px,50px) scale(1.08) rotate(2deg)' },
          '66%':  { transform: 'translate(-55px,95px) scale(0.94) rotate(-1deg)' },
          '100%': { transform: 'translate(45px,-45px) scale(1.06) rotate(1deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(56,189,248,0.45)' },
          '50%':      { boxShadow: '0 0 0 14px rgba(56,189,248,0)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient-rotate': {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'glow-pulse-ring': {
          '0%, 100%': { filter: 'drop-shadow(0 0 6px rgba(56,189,248,0.3))' },
          '50%':      { filter: 'drop-shadow(0 0 18px rgba(56,189,248,0.5))' },
        },

        // ──── PREMIUM TEXT ANIMATIONS ────
        'text-reveal': {
          '0%':   { opacity: '0', transform: 'translateY(100%) rotateX(-80deg)', filter: 'blur(5px)' },
          '60%':  { opacity: '1', transform: 'translateY(-5%) rotateX(5deg)', filter: 'blur(0px)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotateX(0deg)', filter: 'blur(0px)' },
        },
        'word-slide': {
          '0%':   { opacity: '0', transform: 'translateY(40px) skewY(4deg)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0) skewY(0deg)', filter: 'blur(0px)' },
        },
        'letter-pop': {
          '0%':   { opacity: '0', transform: 'scale(0.3) translateY(20px)' },
          '50%':  { opacity: '1', transform: 'scale(1.1) translateY(-3px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'glitch': {
          '0%, 100%': { clipPath: 'inset(0 0 0 0)', transform: 'translate(0)' },
          '20%':      { clipPath: 'inset(20% 0 30% 0)', transform: 'translate(-3px, 2px)' },
          '40%':      { clipPath: 'inset(50% 0 10% 0)', transform: 'translate(3px, -1px)' },
          '60%':      { clipPath: 'inset(10% 0 40% 0)', transform: 'translate(-2px, 3px)' },
          '80%':      { clipPath: 'inset(60% 0 5% 0)', transform: 'translate(2px, -2px)' },
        },

        // ──── PREMIUM ENTRANCE ANIMATIONS ────
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%':   { opacity: '0', transform: 'translateY(-60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-left': {
          '0%':   { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-right': {
          '0%':   { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'bounce-in': {
          '0%':   { opacity: '0', transform: 'scale(0.3)' },
          '50%':  { opacity: '1', transform: 'scale(1.08)' },
          '70%':  { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        'elastic-in': {
          '0%':   { opacity: '0', transform: 'scale(0.4)' },
          '55%':  { opacity: '1', transform: 'scale(1.08)' },
          '70%':  { transform: 'scale(0.96)' },
          '85%':  { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' },
        },
        'blur-in': {
          '0%':   { opacity: '0', filter: 'blur(12px)', transform: 'scale(1.05)' },
          '100%': { opacity: '1', filter: 'blur(0px)', transform: 'scale(1)' },
        },

        // ──── GRADIENT & GLOW ANIMATIONS ────
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        'gradient-y': {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%':      { backgroundPosition: '50% 100%' },
        },
        'spotlight': {
          '0%':   { opacity: '0', transform: 'translateX(-100%) rotate(-45deg)' },
          '50%':  { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(200%) rotate(-45deg)' },
        },
        'ripple': {
          '0%':   { transform: 'scale(0)', opacity: '0.6' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },

        // ──── ORGANIC / MORPHING ANIMATIONS ────
        'morph': {
          '0%':   { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%':  { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        },
        'blob': {
          '0%, 100%': { borderRadius: '33% 67% 70% 30% / 30% 40% 60% 70%', transform: 'rotate(0deg)' },
          '25%':      { borderRadius: '37% 63% 51% 49% / 37% 65% 35% 63%', transform: 'rotate(90deg)' },
          '50%':      { borderRadius: '54% 46% 38% 62% / 49% 70% 30% 51%', transform: 'rotate(180deg)' },
          '75%':      { borderRadius: '61% 39% 55% 45% / 61% 38% 62% 39%', transform: 'rotate(270deg)' },
        },
        'wave': {
          '0%':   { transform: 'translateX(0) translateY(0)' },
          '25%':  { transform: 'translateX(-5px) translateY(8px)' },
          '50%':  { transform: 'translateX(3px) translateY(-5px)' },
          '75%':  { transform: 'translateX(5px) translateY(5px)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
        },
        'heartbeat': {
          '0%, 100%': { transform: 'scale(1)' },
          '14%':      { transform: 'scale(1.15)' },
          '28%':      { transform: 'scale(1)' },
          '42%':      { transform: 'scale(1.15)' },
          '70%':      { transform: 'scale(1)' },
        },
        'breathe': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%':      { transform: 'scale(1.08)', opacity: '1' },
        },

        // ──── LOADING ANIMATIONS ────
        'progress-fill': {
          '0%':   { width: '0%' },
          '100%': { width: '100%' },
        },
        'skeleton': {
          '0%':    { backgroundPosition: '-200% 0' },
          '100%':  { backgroundPosition: '200% 0' },
        },
        'counter-spin': {
          '0%':   { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },

        // ──── SUBTLE MICRO-INTERACTIONS ────
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%':      { transform: 'translateX(-3px) rotate(-1deg)' },
          '75%':      { transform: 'translateX(3px) rotate(1deg)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%':      { transform: 'rotate(-5deg)' },
          '75%':      { transform: 'rotate(5deg)' },
        },
        'tilt-3d': {
          '0%':   { transform: 'perspective(800px) rotateY(0deg) rotateX(0deg)' },
          '25%':  { transform: 'perspective(800px) rotateY(3deg) rotateX(-2deg)' },
          '50%':  { transform: 'perspective(800px) rotateY(-2deg) rotateX(3deg)' },
          '75%':  { transform: 'perspective(800px) rotateY(2deg) rotateX(-1deg)' },
          '100%': { transform: 'perspective(800px) rotateY(0deg) rotateX(0deg)' },
        },
      },
      animation: {
        'drift':          'drift 26s ease-in-out infinite alternate',
        'float':          'float 3s ease-in-out infinite',
        'shimmer':        'shimmer 4s linear infinite',
        'pulse-glow':     'pulse-glow 2.2s ease infinite',
        'spin-slow':      'spin-slow 12s linear infinite',
        'blink':          'blink 1s infinite',
        'fade-up':        'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'gradient-rotate':'gradient-rotate 6s linear infinite',
        'glow-pulse-ring':'glow-pulse-ring 3s ease-in-out infinite',

        // Text
        'text-reveal':    'text-reveal 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'word-slide':     'word-slide 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'letter-pop':     'letter-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'glitch':         'glitch 0.4s ease-in-out',

        // Entrances
        'slide-up':       'slide-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-down':     'slide-down 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-left':     'slide-left 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-right':    'slide-right 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in':       'scale-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'bounce-in':      'bounce-in 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'elastic-in':     'elastic-in 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'blur-in':        'blur-in 0.8s cubic-bezier(0.16,1,0.3,1) forwards',

        // Gradient / Glow
        'gradient-x':     'gradient-x 6s ease infinite',
        'gradient-y':     'gradient-y 6s ease infinite',
        'spotlight':      'spotlight 3s ease-in-out',
        'ripple':         'ripple 0.6s ease-out forwards',

        // Organic
        'morph':          'morph 8s ease-in-out infinite',
        'blob':           'blob 20s ease-in-out infinite',
        'wave':           'wave 5s ease-in-out infinite',
        'heartbeat':      'heartbeat 1.5s ease infinite',
        'breathe':        'breathe 4s ease-in-out infinite',

        // Loading
        'skeleton':       'skeleton 1.5s ease-in-out infinite',
        'counter-spin':   'counter-spin 0.4s cubic-bezier(0.16,1,0.3,1) forwards',

        // Micro
        'shake':          'shake 0.4s ease-in-out',
        'wiggle':         'wiggle 0.5s ease-in-out',
        'tilt-3d':        'tilt-3d 6s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'expo-out':    'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring':      'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth':      'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
      },
    },
  },
  plugins: [],
}
