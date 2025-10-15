import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import linksStyles from '../styles/links.module.css';

export default function CalPage() {
  useEffect(() => {
    const scriptSrc = 'https://app.cal.com/embed/embed.js';

    const loadCalScript = () => {
      return new Promise((resolve, reject) => {
        // If already loaded, resolve immediately
        if (window.Cal) {
          resolve();
          return;
        }

        const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
        if (existingScript) {
          existingScript.addEventListener('load', resolve);
          existingScript.addEventListener('error', reject);
          return;
        }

        // Otherwise, create the script tag
        const script = document.createElement('script');
        script.src = scriptSrc;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initCalWidget = () => {
      if (!window.Cal) {
        // Retry after short delay if still not loaded
        setTimeout(initCalWidget, 200);
        return;
      }

      window.Cal.init({ origin: 'https://app.cal.com' });

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      window.Cal.createInlineWidget({
        url: 'https://cal.com/praneels',
        parentElement: document.getElementById('cal-inline-widget'),
        config: {},
        styles: {
          height: '80vh',
          width: '100%',
          minHeight: '600px',
          backgroundColor: prefersDark ? '#111' : '#fff',
          color: prefersDark ? '#fff' : '#000',
          borderRadius: '12px',
          border: prefersDark ? '1px solid #333' : '1px solid #ddd',
          boxShadow: prefersDark
            ? '0 2px 12px rgba(255, 255, 255, 0.1)'
            : '0 2px 12px rgba(0, 0, 0, 0.1)',
        },
      });
    };

    loadCalScript()
      .then(() => initCalWidget())
      .catch((err) => console.error('Failed to load Cal.com script:', err));

    return () => {
      const existing = document.querySelector(`script[src="${scriptSrc}"]`);
      if (existing) existing.remove();
    };
  }, []);

  return (
    <Layout showBackLink={false}>
      <Head>
        <title>{`${siteTitle} Schedule a Meeting`}</title>
        <meta
          name="description"
          content="Schedule a meeting with Praneel using Cal.com embedded scheduling."
        />
      </Head>

      {/* Back Link */}
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

      {/* Cal Widget Section */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Schedule a Meeting</h2>
        <p className={linksStyles.description}>
          Use the embedded scheduler below to book a meeting with me at your convenience.
        </p>

        <div
          id="cal-inline-widget"
          style={{
            width: '100%',
            minHeight: '600px',
            borderRadius: '12px',
            overflow: 'hidden',
            marginTop: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p>Loading scheduler...</p>
        </div>
      </section>

      <style jsx>{`
        #cal-inline-widget {
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        @media (max-width: 768px) {
          #cal-inline-widget {
            height: 90vh !important;
            min-height: 500px;
          }
        }

        @media (prefers-color-scheme: dark) {
          #cal-inline-widget {
            background-color: #111;
            color: #fff;
            border-color: #333;
          }
        }

        @media (prefers-color-scheme: light) {
          #cal-inline-widget {
            background-color: #fff;
            color: #000;
            border-color: #ddd;
          }
        }
      `}</style>
    </Layout>
  );
}
