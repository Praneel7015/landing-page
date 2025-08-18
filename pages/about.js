import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function AboutPage() {
  return (
    <Layout showBackLink={false}>
      <Head>
        <title>{`${siteTitle} About Me`}</title>
      </Head>
      <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>About Me</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p>
            I'm a FOSS enthusiast, cybersecurity learner and linux user. I also  enjoy building things and sometimes writing about things I learn.
            </p><p>
            I lead my College's Open Source Club, MUKTI and Conduct Events Open Source Related.
          </p>
          <p>
            Outside tech, I like to Game, tinker, and contributing to Open- Source communities.
          </p>
          <p>
            Want to connect? Reach out via the links on the home page.
          </p>
        </div>
      </section>
    </Layout>
  );
}
