import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useEffect, useState } from 'react';

const name = 'Praneel';
export const siteTitle = "Praneel's";

const TARGET_UTC = Date.UTC(2026, 7, 22, 11, 30, 0); // 22 Aug 2026, 17:00 IST = 11:30 UTC

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
  const seconds = Math.floor(diff / 1000);
  return { days, hours, minutes, seconds };
}

export default function Layout({ children, home, showBackLink = true, showCountdownFooter = true, compactHeader = false, backLinkExtra = null }) {
  const [parts, setParts] = useState(getTimeParts());
  useEffect(() => {
    if (!showCountdownFooter) return;
    const id = setInterval(() => setParts(getTimeParts()), 1000);
    return () => clearInterval(id);
  }, [showCountdownFooter]);
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico?v=20250815" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="My personal blog website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <div style={{ alignSelf: 'flex-end' }}>
          <ThemeToggle />
        </div>
        {compactHeader ? null : home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt={name}
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {showCountdownFooter && (
        <div style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <span
            aria-label="/countdown"
            suppressHydrationWarning
            style={{
              color: 'var(--text)',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              fontWeight: 700,
              fontSize: '1.25rem'
            }}
          >
            {parts.days}:{pad2(parts.hours)}:{pad2(parts.minutes)}:{pad2(parts.seconds)}
          </span>
        </div>
      )}
      {!home && showBackLink && (
        <div className={styles.backToHome}>
          <Link
            href="/"
            style={{
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '8px 12px',
              textDecoration: 'none',
              color: 'var(--text)'
            }}
          >
            ← Back to home
          </Link>
          {backLinkExtra}
        </div>
      )}
    </div>
  );
}
