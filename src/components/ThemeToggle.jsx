export default function ThemeToggle({ theme, toggle }) {
  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label="Toggle theme"
    >
      <div className="theme-toggle-thumb">
        {theme === 'dark' ? '🌙' : '☀️'}
      </div>
    </button>
  )
}
