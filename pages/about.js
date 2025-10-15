import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import linksStyles from '../styles/links.module.css';

export default function CalPage() {
  useEffect(() => {
    // Load Cal.com embed script dynamically
    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;

    script.onload = () => {
      if (window.Cal) {
        window.Cal.init({ origin: 'https://app.cal.com' });

        // Detect system theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        window.Cal.createInlineWidget({
          url: 'https://cal.com/praneels', // Your Cal.com username
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
      }
    };

    document.body.appendChild(script);

    return () => {
      const existing = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
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

      {/* Back link (matches your About page style) */}
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
        <h2 className={utilStyles.headingLg}>Schedule a Meeting</h2>
        <p className={linksStyles.description}>
          Use the embedded scheduler below to book a meeting with me at your convenience.
        </p>

        {/* Cal.com Inline Embed Container */}
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

      {/* Styling for responsiveness and theme transitions */}
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
