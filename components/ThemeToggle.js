import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const attr = document.documentElement.getAttribute('data-theme');
    const initial = attr || 'light';
    setTheme(initial);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

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
