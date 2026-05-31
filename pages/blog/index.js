import Link from 'next/link';
import Layout from '../../components/layout';
import SEO from '../../components/SEO';
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
      <SEO
        title="Blog"
        description="Praneel Sindhole's blog — posts on FOSS, AWS, n8n automation, mechanical keyboards, cybersecurity, and learning in public."
        path="/blog"
      />

      <BackToHomeLink style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1 className={utilStyles.headingXl}>Latest Blogs</h1>
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
