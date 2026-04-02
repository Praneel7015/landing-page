import Link from 'next/link';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import homeStyles from '../styles/home.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSortedPostsData } from '../lib/posts';
import { getProjects } from '../lib/projects';
import Date from '../components/date';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const allProjects = getProjects();
  return {
    props: {
      recentPosts: allPostsData.slice(0, 4),
      featuredProjects: allProjects.slice(0, 3),
    },
  };
}

export default function Home({ recentPosts, featuredProjects }) {
  const router = useRouter();
  useEffect(() => {
    router.prefetch('/blog').catch(() => {});
    router.prefetch('/projects').catch(() => {});
    router.prefetch('/about').catch(() => {});
    router.prefetch('/contact').catch(() => {});
  }, [router]);

  return (
    <Layout home>
      <Head>
        <title>{`${siteTitle} Landing Page`}</title>
      </Head>

      {/* Hero — centered */}
      <section className={homeStyles.hero}>
        <p className={homeStyles.heroTag}>Bangalore, India</p>
        <p className={homeStyles.heroBio}>
          I build <strong>FOSS</strong> projects, tinker with{' '}
          <strong>IoT &amp; Electronics</strong>, and care about{' '}
          <strong>Cybersecurity</strong>. I lead{' '}
          <a href="https://mukticommunity.github.io/" className={homeStyles.heroBioLink}>
            MUKTI
          </a>
          , my College's Open-Source Club, and spend way too much time automating
          things.
        </p>
      </section>

      {/* Status */}
      <div className={homeStyles.statusBar}>
        <span className={homeStyles.statusText}>
           Computer Science & Engg · Currently <strong>Procastinating</strong>
        </span>
      </div>

      {/* Site navigation links */}
      <section className={homeStyles.section}>
        <div className={homeStyles.linksGrid}>
          <Link className={homeStyles.chip} href="/blog">Blog</Link>
          <Link className={homeStyles.chip} href="/projects">Projects</Link>
          <Link className={homeStyles.chip} href="/contact">Contact</Link>
          <Link className={homeStyles.chip} href="/about">About</Link>
        </div>
      </section>

      {/* Featured projects */}
      <section className={homeStyles.section}>
        <div className={homeStyles.sectionHeader}>
          <span className={homeStyles.sectionLabel}>Latest Work</span>
          <Link href="/projects" className={homeStyles.viewMore}>All Projects →</Link>
        </div>
        <div className={homeStyles.projectGrid}>
          {featuredProjects.map((p) => (
            <a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={homeStyles.projectCard}
            >
              <p className={homeStyles.projectName}>{p.title}</p>
              <p className={homeStyles.projectDesc}>{p.description}</p>
              {Array.isArray(p.tags) && p.tags.length > 0 && (
                <div className={homeStyles.projectTags}>
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className={homeStyles.projectTag}>{t}</span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* Recent posts */}
      <section className={homeStyles.section}>
        <div className={homeStyles.sectionHeader}>
          <span className={homeStyles.sectionLabel}>Recent Posts</span>
          <Link href="/blog" className={homeStyles.viewMore}>All Posts →</Link>
        </div>
        <ul className={homeStyles.postList}>
          {recentPosts.map(({ id, date, title }) => (
            <li key={id} className={homeStyles.postItem}>
              <Link href={`/blog/posts/${id}`} className={homeStyles.postTitle}>
                {title}
              </Link>
              <span className={homeStyles.postDate}>
                <Date dateString={date} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* External / find me links */}
      <section className={homeStyles.section}>
        <div className={homeStyles.sectionHeader}>
          <span className={homeStyles.sectionLabel}>Find me</span>
           <Link href="/chatbot" className={homeStyles.viewMore}>Surprise Me →</Link>
        </div>
        <div className={homeStyles.linksGrid}>
          <a className={homeStyles.chip} href="https://github.com/Praneel7015" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className={homeStyles.chip} href="https://www.linkedin.com/in/praneel-sindhole/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className={homeStyles.chip} href="https://mukticommunity.github.io/" target="_blank" rel="noopener noreferrer">MUKTI</a>
          <a className={homeStyles.chip} href="https://fossunited.org/u/praneel_sindhole" target="_blank" rel="noopener noreferrer">FOSS United</a>
          <a className={homeStyles.chip} href="https://n8n.io/creators/praneel7015/" target="_blank" rel="noopener noreferrer">n8n</a>
          <a className={homeStyles.chip} href="https://www.gaming.praneel.tech" target="_blank" rel="noopener noreferrer">Gamer?</a>
        </div>
      </section>
    </Layout>
  );
}
