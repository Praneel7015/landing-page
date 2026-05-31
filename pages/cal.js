/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";
import Layout from '../components/layout';
import SEO from '../components/SEO';
import utilStyles from '../styles/utils.module.css';

export default function CalPage() {
  const [theme, setTheme] = useState('light');

  // Listen for theme changes (data-theme on <html>)
  useEffect(() => {
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
    (async function () {
      const cal = await getCalApi({ namespace: '30min' });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view', theme });
    })();
  }, [theme]);

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
          <Cal 
            namespace="30min"
            calLink="praneels/30min"
            style={{width:"100%",height:"100%",overflow:"scroll"}}
            config={{ layout: 'month_view', theme }}
          />
        </div>
      </section>
    </Layout>
  );
}
