/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: 'rgba(var(--background), <alpha-value>)',
        'background-secondary': 'rgba(var(--background-secondary), <alpha-value>)',
        'background-tertiary': 'rgba(var(--background-tertiary), <alpha-value>)',
        text: 'rgba(var(--text-primary), <alpha-value>)',
        'text-secondary': 'rgba(var(--text-secondary), <alpha-value>)',
        'text-tertiary': 'rgba(var(--text-tertiary), <alpha-value>)',
        accent: 'rgba(var(--accent), <alpha-value>)',
        'accent-secondary': 'rgba(var(--accent-secondary), <alpha-value>)',
        'accent-tertiary': 'rgba(var(--accent-tertiary), <alpha-value>)',
        border: 'rgba(var(--border), <alpha-value>)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        blob: 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      }
    },
  },
  plugins: [],
}
