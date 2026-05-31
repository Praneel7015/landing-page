import Link from 'next/link';
import Layout from '../../../../components/layout';
import SEO from '../../../../components/SEO';
import Date from '../../../../components/date';
import utilStyles from '../../../../styles/utils.module.css';
import postStyles from '../../../../styles/post.module.css';
import { getAllTags, getPostsByTag } from '../../../../lib/posts';

export async function getStaticPaths() {
  const tags = getAllTags();
  return {
    paths: tags.map(({ tag }) => ({ params: { tag } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = getPostsByTag(params.tag);
  return {
    props: {
      tag: params.tag,
      posts,
    },
  };
}

export default function TagPage({ tag, posts = [] }) {
  const description = `Posts by Praneel Sindhole tagged ${tag}: ${posts.length} article${posts.length === 1 ? '' : 's'}.`;

  return (
    <Layout showBackLink={false}>
      <SEO
        title={`Posts tagged "${tag}"`}
        description={description}
        path={`/blog/tag/${tag}`}
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
        <h1 className={utilStyles.headingXl}>#{tag}</h1>
        <p className={utilStyles.lightText}>{description}</p>

        <ul className={postStyles.cardList}>
          {posts.map((post) => (
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
      </section>
    </Layout>
  );
}
