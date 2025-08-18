import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { useEffect, useState } from 'react';

const TARGET_UTC = Date.UTC(2026, 7, 22, 11, 30, 0); // 22 Aug 2026, 17:00 IST == 11:30 UTC

function pad2(n) {
  return String(n).padStart(2, '0');
}

function getTimeParts() {
  const now = Date.now();
  let diff = Math.max(0, TARGET_UTC - now);

  const dayMs = 24 * 60 * 60 * 1000;
  const hourMs = 60 * 60 * 1000;
  const minMs = 60 * 1000;

  const days = Math.floor(diff / dayMs);
  diff -= days * dayMs;
  const hours = Math.floor(diff / hourMs);
  diff -= hours * hourMs;
  const minutes = Math.floor(diff / minMs);
  diff -= minutes * minMs;
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, done: TARGET_UTC - now <= 0 };
}

export default function CountdownPage() {
  const [{ days, hours, minutes, seconds, done }, setParts] = useState(getTimeParts());

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => {
      setParts(getTimeParts());
    }, 1000);
    return () => clearInterval(id);
  }, [done]);

  return (
    <Layout showBackLink={false} showCountdownFooter={false}>
      <Head>
        <title>{`${siteTitle} Countdown`}</title>
        <meta name="description" content="Countdown to 22 Aug 2026, 5:00 PM IST" />
      </Head>

      <section className={utilStyles.headingMd} style={{ textAlign: 'center' }}>
        <h2 className={utilStyles.headingLg}>Site Blows Up In</h2>
      </section>

      <section style={{ marginTop: '1rem', textAlign: 'center' }}>
        <div aria-label="Countdown" style={{
          fontWeight: 800,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: '4rem'
        }}>
          {days}:{pad2(hours)}:{pad2(minutes)}:{pad2(seconds)}
        </div>
        <div style={{ color: 'var(--muted-text)', marginTop: '0.25rem' }}>DD:HH:MM:SS</div>
      </section>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <Link href="/" style={{
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '8px 12px',
          textDecoration: 'none',
          color: 'var(--text)'
        }}>
          ← Back to home
        </Link>
      </div>
    </Layout>
  );
}
