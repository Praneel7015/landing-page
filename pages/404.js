import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import linksStyles from '../styles/links.module.css';

export default function Custom404() {
  return (
  <Layout showBackLink={false} showCountdownFooter={false}>
      <Head>
        <title>404 - Page not found</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{
        textAlign: 'center',
        padding: '3rem 0',
      }}>
        <div style={{
          fontSize: '4rem',
          fontWeight: 800,
          lineHeight: 1,
          color: 'var(--text)'
        }}>404</div>
        <p style={{ color: 'var(--muted-text)', marginTop: '0.75rem' }}>
          Sorry, we couldn't find that page.
        </p>
        <div style={{
          marginTop: '1.5rem',
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <Link className={linksStyles.linkButton} href="/">Go Home</Link>
          <Link className={linksStyles.linkButton} href="/blog">View Blog</Link>
        </div>
      </div>
    </Layout>
  );
}