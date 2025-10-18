import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

const EMBED_SRC = 'https://app.cal.com/embed/embed.js';
const DEFAULT_CAL_LINK = 'praneels';

function ensureCalScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Cal embed requires a browser environment.'));
      return;
    }

    if (window.Cal) {
      resolve(window.Cal);
      return;
    }

    const scriptId = 'cal-embed-script';
    let script = document.getElementById(scriptId);

    const handleLoad = () => {
      cleanup();
      if (window.Cal) {
        resolve(window.Cal);
      } else {
        reject(new Error('Cal embed script loaded but window.Cal is undefined.'));
      }
    };

    const handleError = () => {
      cleanup();
      reject(new Error('Failed to load Cal embed script.'));
    };

    const cleanup = () => {
      if (script) {
        script.removeEventListener('load', handleLoad);
        script.removeEventListener('error', handleError);
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = EMBED_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });
  });
}

export default function CalPage() {
  const calLink = useMemo(() => {
    const fromEnv = process.env.NEXT_PUBLIC_CAL_LINK;
    return (typeof fromEnv === 'string' && fromEnv.trim().length > 0)
      ? fromEnv.trim().replace(/^https?:\/\//, '')
      : DEFAULT_CAL_LINK;
  }, []);

  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const initializedRef = useRef(false);

  useEffect(() => {
    let isCancelled = false;

    if (!calLink) {
      setStatus('error');
      setError('Cal.com link is not configured.');
      return () => {};
    }

    ensureCalScript()
      .then((cal) => {
        if (isCancelled || initializedRef.current) return;

        cal('init', {
          origin: 'https://cal.com',
          attribution: { shouldIncludeBranding: false },
        });

        cal('inline', {
          elementOrSelector: '#cal-inline-widget',
          calLink,
          config: {
            layout: 'month_view',
          },
          styles: {
            branding: {
              brandColor: '#0070f3',
            },
          },
        });

        initializedRef.current = true;
        if (!isCancelled) {
          setStatus('ready');
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setStatus('error');
          setError(err.message || 'Failed to load scheduler.');
        }
      });

    return () => {
      isCancelled = true;
      const container = document.getElementById('cal-inline-widget');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [calLink]);

  return (
    <Layout showBackLink={false}>
      <Head>
        <title>{`${siteTitle} Schedule a Meeting`}</title>
        <meta
          name="description"
          content="Schedule a meeting with Praneel using Cal.com embedded scheduling."
        />
      </Head>

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
        <p style={{ color: 'var(--muted-text)', marginBottom: '1rem' }}>
          Use the embedded scheduler below to book a meeting with me at your convenience.
        </p>

        {status === 'error' ? (
          <div
            role="alert"
            style={{
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '16px',
              marginTop: '1.5rem',
              color: 'var(--error-text)',
              backgroundColor: 'var(--error-bg)',
            }}
          >
            {error}
          </div>
        ) : (
          <div
            id="cal-inline-widget"
            style={{
              width: '100%',
              minHeight: '640px',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              marginTop: '1.5rem',
              overflow: 'hidden',
              background: 'var(--bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {status === 'loading' && <p style={{ color: 'var(--muted-text)' }}>Loading scheduler…</p>}
          </div>
        )}
      </section>
    </Layout>
  );
}
