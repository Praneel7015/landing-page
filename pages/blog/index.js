import Link from 'next/link';
import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { getSortedPostsData } from '../../lib/posts';
import Date from '../../components/date';

const backLinkStyles = {
  border: '1px solid var(--border)',
  borderRadius: 10,
  padding: '8px 12px',
  textDecoration: 'none',
  color: 'var(--text)',
};

function BackToHomeLink({ style }) {
  return (
    <div style={style}>
      <Link href="/" style={backLinkStyles}>
        &lt;- Back to home
      </Link>
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function BlogIndex({ allPostsData = [] }) {
  return (
    <Layout showBackLink={false}>
      <Head>
        <title>{`${siteTitle} Blog`}</title>
      </Head>

      <BackToHomeLink style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Latest Blogs</h2>
        <ul className={utilStyles.list} style={{ listStyle: 'none', padding: 0 }}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/blog/posts/${id}`} style={{ color: 'var(--text)' }}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>

      <BackToHomeLink style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }} />
    </Layout>
  );
}
