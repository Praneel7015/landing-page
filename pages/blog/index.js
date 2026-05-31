import { useMemo, useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/layout';
import SEO from '../../components/SEO';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import postStyles from '../../styles/post.module.css';
import { getAllSeries, getAllTags, getSortedPostsData } from '../../lib/posts';

const SERIES_LABELS = {
  'aws-cloud-day': 'AWS Cloud Day',
};

function humanize(slug) {
  return slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
}

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
  const series = getAllSeries();
  const tags = getAllTags();

  return {
    props: {
      allPostsData,
      series,
      tags,
    },
  };
}

export default function BlogIndex({ allPostsData = [], series = [], tags = [] }) {
  const [activeTag, setActiveTag] = useState(null);

  const filteredPosts = useMemo(() => {
    if (!activeTag) return allPostsData;
    return allPostsData.filter((p) => p.tags.includes(activeTag));
  }, [allPostsData, activeTag]);

  const latest = allPostsData.slice(0, 6);

  return (
    <Layout showBackLink={false}>
      <SEO
        title="Blog"
        description="Praneel Sindhole's blog - posts on FOSS, AWS, n8n automation, mechanical keyboards, cybersecurity, and learning in public."
        path="/blog"
      />

      <BackToHomeLink style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1 className={utilStyles.headingXl}>Blog</h1>
        <p className={utilStyles.lightText}>
          Posts on FOSS, AWS, n8n, IoT, cybersecurity, and what I&apos;m building.
        </p>

        <div className={postStyles.sectionBlock}>
          <div className={postStyles.sectionHeader}>
            <p className={postStyles.sectionLabel}>Latest</p>
          </div>
          <ul className={postStyles.cardList}>
            {latest.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/posts/${post.id}`} className={postStyles.card}>
                  <p className={postStyles.cardTitle}>{post.title}</p>
                  {post.description && (
                    <p className={postStyles.cardDesc}>{post.description}</p>
                  )}
                  <div className={postStyles.cardMeta}>
                    <Date dateString={post.date} />
                    <span className={postStyles.cardMetaDot} aria-hidden>·</span>
                    <span>{post.readingTime} min read</span>
                    {post.tags.length > 0 && (
                      <>
                        <span className={postStyles.cardMetaDot} aria-hidden>·</span>
                        <span className={postStyles.cardTags}>
                          {post.tags.map((tag) => (
                            <span key={tag} className={postStyles.cardTag}>{tag}</span>
                          ))}
                        </span>
                      </>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {series.length > 0 && (
          <div className={postStyles.sectionBlock}>
            <div className={postStyles.sectionHeader}>
              <p className={postStyles.sectionLabel}>Series</p>
            </div>
            <div className={postStyles.seriesGrid}>
              {series.map(({ series: s, count }) => (
                <Link key={s} href={`/blog/series/${s}`} className={postStyles.seriesGridCard}>
                  <p className={postStyles.cardTitle}>{SERIES_LABELS[s] || humanize(s)}</p>
                  <p className={postStyles.cardDesc}>{count} parts</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {tags.length > 0 && (
          <div className={postStyles.sectionBlock}>
            <div className={postStyles.sectionHeader}>
              <p className={postStyles.sectionLabel}>By topic</p>
            </div>
            <div className={postStyles.tagCloud}>
              {tags.map(({ tag, count }) => (
                <Link key={tag} href={`/blog/tag/${tag}`} className={postStyles.tagCloudChip}>
                  #{tag}
                  <span className={postStyles.tagCloudCount}>{count}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className={postStyles.sectionBlock}>
          <div className={postStyles.sectionHeader}>
            <p className={postStyles.sectionLabel}>All posts</p>
            {activeTag && (
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className={postStyles.viewMore}
                style={{ cursor: 'pointer', background: 'transparent', border: 'none', padding: 0, fontFamily: 'inherit' }}
              >
                Clear filter
              </button>
            )}
          </div>

          <div className={postStyles.filterBar}>
            <span className={postStyles.filterBarLabel}>Filter:</span>
            <button
              type="button"
              className={`${postStyles.filterChip} ${!activeTag ? postStyles.filterChipActive : ''}`}
              onClick={() => setActiveTag(null)}
            >
              all
            </button>
            {tags.map(({ tag }) => (
              <button
                key={tag}
                type="button"
                className={`${postStyles.filterChip} ${activeTag === tag ? postStyles.filterChipActive : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <ul className={postStyles.cardList}>
            {filteredPosts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/posts/${post.id}`} className={postStyles.card}>
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
          </ul>
        </div>
      </section>

      <BackToHomeLink style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }} />
    </Layout>
  );
}
