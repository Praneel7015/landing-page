import Image from 'next/image';
import Link from 'next/link';
import Date from '../../../components/date';
import Layout from '../../../components/layout';
import SEO from '../../../components/SEO';
import Giscus from '../../../components/Giscus';
import { getAllPostIds, getPostData, getRelatedPosts } from '../../../lib/posts';
import { SITE_URL, canonicalUrl, absoluteImage } from '../../../lib/seo';
import utilStyles from '../../../styles/utils.module.css';
import postStyles from '../../../styles/post.module.css';

export default function Post({ postData, relatedPosts = [] }) {
  const url = canonicalUrl(`/blog/posts/${postData.id}`);
  const ogImage = absoluteImage(postData.cover || `/og/${postData.id}.png`);

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: postData.title,
    description: postData.description,
    image: ogImage,
    datePublished: postData.date,
    dateModified: postData.updated || postData.date,
    author: {
      '@type': 'Person',
      name: 'Praneel Sindhole',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Praneel Sindhole',
      url: SITE_URL,
    },
    wordCount: postData.wordCount,
    keywords: (postData.tags || []).join(', '),
  };

  const toc = Array.isArray(postData.toc) ? postData.toc : [];

  return (
    <Layout showBackLink={false}>
      <SEO
        title={postData.title}
        description={postData.description}
        path={`/blog/posts/${postData.id}`}
        image={postData.cover || `/og/${postData.id}.png`}
        type="article"
        publishedTime={postData.date}
        modifiedTime={postData.updated || postData.date}
        tags={postData.tags}
        jsonLd={blogPostingJsonLd}
      />

      <div style={{ marginTop: '0.5rem', marginBottom: '0.75rem' }}>
        <Link href="/blog" style={{
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '8px 12px',
          textDecoration: 'none',
          color: 'var(--text)'
        }}>
          ← Back to blog
        </Link>
      </div>

      <div className={postStyles.postLayout}>
        <article className={postStyles.postBody}>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={postStyles.metaRow}>
            <span className={utilStyles.lightText}>
              <Date dateString={postData.date} />
            </span>
            <span className={postStyles.metaDot} aria-hidden>·</span>
            <span className={utilStyles.lightText}>{postData.readingTime} min read</span>
            {postData.updated && postData.updated !== postData.date && (
              <>
                <span className={postStyles.metaDot} aria-hidden>·</span>
                <span className={utilStyles.lightText}>
                  Updated <Date dateString={postData.updated} />
                </span>
              </>
            )}
          </div>
          {Array.isArray(postData.tags) && postData.tags.length > 0 && (
            <div className={postStyles.tagRow}>
              {postData.tags.map((tag) => (
                <Link key={tag} href={`/blog/tag/${tag}`} className={postStyles.tagChip}>
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {toc.length > 2 && (
            <details className={postStyles.tocMobile}>
              <summary>On this page</summary>
              <ul className={postStyles.tocList}>
                {toc.map((h) => (
                  <li key={h.id} className={h.depth === 3 ? postStyles.tocItemSub : postStyles.tocItem}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          <div className="markdown" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>

        {toc.length > 2 && (
          <aside className={postStyles.tocSidebar} aria-label="Table of contents">
            <p className={postStyles.tocHeader}>On this page</p>
            <ul className={postStyles.tocList}>
              {toc.map((h) => (
                <li key={h.id} className={h.depth === 3 ? postStyles.tocItemSub : postStyles.tocItem}>
                  <a href={`#${h.id}`}>{h.text}</a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>

      {relatedPosts.length > 0 && (
        <section className={postStyles.relatedSection} aria-labelledby="related-heading">
          <h2 id="related-heading" className={postStyles.relatedHeading}>Related posts</h2>
          <ul className={postStyles.cardList}>
            {relatedPosts.map((p) => (
              <li key={p.id}>
                <Link href={`/blog/posts/${p.id}`} className={postStyles.card}>
                  <p className={postStyles.cardTitle}>{p.title}</p>
                  {p.description && <p className={postStyles.cardDesc}>{p.description}</p>}
                  <div className={postStyles.cardMeta}>
                    <Date dateString={p.date} />
                    <span className={postStyles.cardMetaDot} aria-hidden>·</span>
                    <span>{p.readingTime} min read</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className={postStyles.authorFooter}>
        <Image
          src="/images/profile.jpg"
          alt="Praneel Sindhole"
          width={56}
          height={56}
          className={utilStyles.borderCircle}
        />
        <div className={postStyles.authorMeta}>
          <p className={postStyles.authorName}>Praneel Sindhole</p>
          <p className={postStyles.authorBio}>
            CS student in Bangalore. FOSS, IoT, and cybersecurity. Lead at MUKTI.
          </p>
          <Link href="/about" className={postStyles.authorLink}>More about me →</Link>
        </div>
      </footer>

      <Giscus />

      <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
        <Link href="/blog" style={{
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '8px 12px',
          textDecoration: 'none',
          color: 'var(--text)'
        }}>
          ← Back to blog
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  const relatedPosts = getRelatedPosts(postData, 3);
  return {
    props: {
      postData,
      relatedPosts,
    },
  };
}
