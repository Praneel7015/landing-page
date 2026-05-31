import Link from 'next/link';
import Layout from '../../../../components/layout';
import SEO from '../../../../components/SEO';
import Date from '../../../../components/date';
import utilStyles from '../../../../styles/utils.module.css';
import postStyles from '../../../../styles/post.module.css';
import { getAllSeries, getPostsInSeries } from '../../../../lib/posts';

const SERIES_META = {
  'aws-cloud-day': {
    label: 'AWS Cloud Day',
    intro:
      'I joined AWS Builder Challenge #2 as a Computer Science student who had barely touched the AWS console. Over seven days I went from creating my first IAM admin user to shipping a Next.js site through S3, CloudFront, GitHub-integrated Amplify, and a Lambda + SNS contact form. Each post is a journal entry: what worked, what broke, what I had to redo. Read in order if you want the full arc, or jump to any day for the specific service.',
    description:
      'A seven-part journal of AWS Builder Challenge #2: from IAM and S3 through CloudFront, Amplify, and Lambda + SNS, by a CS student building in public.',
  },
};

function humanizeSeriesId(id) {
  return id.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
}

export async function getStaticPaths() {
  const series = getAllSeries();
  return {
    paths: series.map(({ series: s }) => ({ params: { series: s } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = getPostsInSeries(params.series);
  return {
    props: {
      series: params.series,
      posts,
    },
  };
}

export default function SeriesPage({ series, posts = [] }) {
  const meta = SERIES_META[series] || {
    label: humanizeSeriesId(series),
    intro: `A ${posts.length}-part series by Praneel Sindhole.`,
    description: `A ${posts.length}-part series by Praneel Sindhole.`,
  };

  return (
    <Layout showBackLink={false}>
      <SEO
        title={meta.label}
        description={meta.description}
        path={`/blog/series/${series}`}
      />

      <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
        <Link href="/blog" style={{
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '8px 12px',
          textDecoration: 'none',
          color: 'var(--text)'
        }}>
          ← All posts
        </Link>
      </div>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <p className={postStyles.seriesEyebrow}>Series · {posts.length} parts</p>
        <h1 className={utilStyles.headingXl}>{meta.label}</h1>
        <p className={postStyles.seriesIntro}>{meta.intro}</p>

        {posts[0] && (
          <Link href={`/blog/posts/${posts[0].id}`} className={postStyles.seriesCta}>
            Start with Part 1 →
          </Link>
        )}

        <ol className={postStyles.seriesList}>
          {posts.map((post) => (
            <li key={post.id} className={postStyles.seriesItem}>
              <span className={postStyles.seriesIndex}>
                {post.seriesIndex ?? '·'}
              </span>
              <Link href={`/blog/posts/${post.id}`} className={postStyles.seriesLink}>
                <p className={postStyles.cardTitle}>{post.title}</p>
                {post.description && (
                  <p className={postStyles.cardDesc}>{post.description}</p>
                )}
                <div className={postStyles.cardMeta}>
                  <Date dateString={post.date} />
                  <span className={postStyles.cardMetaDot} aria-hidden>·</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </Layout>
  );
}
