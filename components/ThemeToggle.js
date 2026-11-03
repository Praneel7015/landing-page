import { useDocumentTheme } from '../lib/useDocumentTheme';

export default function ThemeToggle() {
  const theme = useDocumentTheme();

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
    if (window.umami?.track) {
      window.umami.track('theme-toggle', { to: next });
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        background: 'transparent',
        border: `1px solid var(--border)`,
        color: 'var(--text)',
        padding: '6px 10px',
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: 600,
      }}
    >
      {theme === 'light' ? 'Dark mode' : 'Light mode'}
    </button>
  );
}
