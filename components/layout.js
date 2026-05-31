import Image from 'next/image';
import styles from '../styles/layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const name = 'Praneel Sindhole';

export default function Layout({ children, home, showBackLink = true, compactHeader = false, backLinkExtra = null }) {
  return (
    <div className={styles.container}>
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
            <Link href="/" aria-label="Home">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt={name}
              />
            </Link>
            <p className={utilStyles.headingLg} style={{ margin: '1rem 0' }}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </p>
          </>
        )}
      </header>
      <main>{children}</main>
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
