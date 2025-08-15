import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { getProjects } from '../../lib/projects';
import projectStyles from '../../styles/projects.module.css';

export async function getStaticProps() {
  const projects = getProjects();
  return { props: { projects } };
}

export default function ProjectsPage({ projects }) {
  return (
    <Layout showBackLink={false}>
      <Head>
        <title>{`${siteTitle} Projects`}</title>
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
        <h2 className={utilStyles.headingLg}>Projects</h2>
        <ul className={utilStyles.list}>
          {projects.map((p) => (
            <li key={p.title} className={utilStyles.listItem}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className={projectStyles.projectLink}>
                  {p.title}
                </a>
                {p.description && (
                  <small className={utilStyles.lightText}>
                    {p.description}
                  </small>
                )}
                {Array.isArray(p.tags) && p.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {p.tags.map((t) => (
                      <span key={t} style={{
                        border: '1px solid var(--border)',
                        padding: '2px 8px',
                        borderRadius: 999,
                        fontSize: '0.75rem',
                        color: 'var(--muted-text)'
                      }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
