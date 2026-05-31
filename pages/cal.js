import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/SEO';
import utilStyles from '../styles/utils.module.css';

const Cal = dynamic(() => import('@calcom/embed-react').then((m) => m.default), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      minHeight: '640px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--muted-text)',
      fontSize: '0.9rem',
    }}>
      Loading calendar…
    </div>
  ),
});

export default function CalPage() {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTheme = () => {
      const t = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(t);
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    import('@calcom/embed-react').then(({ getCalApi }) => {
      (async () => {
        const cal = await getCalApi({ namespace: '30min' });
        cal('ui', { hideEventTypeDetails: false, layout: 'month_view', theme });
      })();
    });
  }, [theme, mounted]);

  return (
    <Layout showBackLink={false}>
      <SEO title="Schedule a Meeting" path="/cal" noindex />

      <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
        <Link
          href="/"
          style={{
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '8px 12px',
            textDecoration: 'none',
            color: 'var(--text)',
          }}
        >
          ← Back to home
        </Link>
      </div>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1 className={utilStyles.headingXl}>Schedule a Meeting</h1>

        <div
          style={{
            width: '100%',
            minHeight: '640px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            background: 'var(--bg)',
          }}
        >
          {mounted && (
            <Cal
              namespace="30min"
              calLink="praneels/30min"
              style={{ width: '100%', height: '100%', overflow: 'scroll' }}
              config={{ layout: 'month_view', theme }}
            />
          )}
        </div>
      </section>
    </Layout>
  );
}
