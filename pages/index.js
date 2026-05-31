import Link from 'next/link';
import Layout from '../components/layout';
import SEO from '../components/SEO';
import OutboundLink from '../components/OutboundLink';
import { personJsonLd, websiteJsonLd } from '../lib/seo';
import homeStyles from '../styles/home.module.css';
import { getSortedPostsData } from '../lib/posts';
import { getProjects } from '../lib/projects';
import { getClientWork } from '../lib/clientWork';
import Date from '../components/date';

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [personJsonLd(), websiteJsonLd()],
};

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const allProjects = getProjects();
  const allClientWork = getClientWork();

  return {
    props: {
      recentPosts: allPostsData.slice(0, 4),
      featuredProjects: allProjects.slice(0, 3),
      featuredClientWork: allClientWork.slice(0, 3),
    },
  };
}

export default function Home({ recentPosts = [], featuredProjects = [], featuredClientWork = [] }) {
  return (
    <Layout home>
      <SEO path="/" jsonLd={homeJsonLd} />

      {/* Hero - centered */}
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
          Computer Science & Engg - Currently <strong>Procastinating</strong>
        </span>
      </div>

      {/* Site navigation links */}
      <section className={homeStyles.section}>
        <div className={homeStyles.linksGrid}>
          <Link className={homeStyles.chip} href="/blog">Blog</Link>
          <Link className={homeStyles.chip} href="/projects">Projects</Link>
          <Link className={homeStyles.chip} href="/client-work">Client Work</Link>
          <Link className={homeStyles.chip} href="/contact">Contact</Link>
          <Link className={homeStyles.chip} href="/about">About</Link>
        </div>
      </section>

      {/* Featured projects */}
      <section className={homeStyles.section}>
        <div className={homeStyles.sectionHeader}>
          <span className={homeStyles.sectionLabel}>Latest Work</span>
          <Link href="/projects" className={homeStyles.viewMore}>All Projects -&gt;</Link>
        </div>
        <div className={homeStyles.projectGrid}>
          {featuredProjects.map((project) => (
            <OutboundLink
              key={project.title}
              href={project.url}
              eventName="project-click"
              className={homeStyles.projectCard}
            >
              <p className={homeStyles.projectName}>{project.title}</p>
              <p className={homeStyles.projectDesc}>{project.description}</p>
              {Array.isArray(project.tags) && project.tags.length > 0 && (
                <div className={homeStyles.projectTags}>
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className={homeStyles.projectTag}>{tag}</span>
                  ))}
                </div>
              )}
            </OutboundLink>
          ))}
        </div>
      </section>

      {/* Client work preview */}
      <section className={homeStyles.section}>
        <div className={homeStyles.sectionHeader}>
          <span className={homeStyles.sectionLabel}>Client Work</span>
          <Link href="/client-work" className={homeStyles.viewMore}>View All -&gt;</Link>
        </div>
        <div className={homeStyles.projectGrid}>
          {featuredClientWork.map((work) => (
            <OutboundLink
              key={work.title}
              href={work.url}
              eventName="client-work-click"
              className={homeStyles.projectCard}
            >
              <p className={homeStyles.projectName}>{work.title}</p>
              <p className={homeStyles.projectDesc}>{work.description}</p>
              {Array.isArray(work.tags) && work.tags.length > 0 && (
                <div className={homeStyles.projectTags}>
                  {work.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className={homeStyles.projectTag}>{tag}</span>
                  ))}
                </div>
              )}
            </OutboundLink>
          ))}
        </div>
      </section>

      {/* Recent posts */}
      <section className={homeStyles.section}>
        <div className={homeStyles.sectionHeader}>
          <span className={homeStyles.sectionLabel}>Recent Posts</span>
          <Link href="/blog" className={homeStyles.viewMore}>All Posts -&gt;</Link>
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
          <Link href="/chatbot" className={homeStyles.viewMore}>Surprise Me -&gt;</Link>
        </div>
        <div className={homeStyles.linksGrid}>
          <OutboundLink className={homeStyles.chip} href="https://github.com/Praneel7015" eventName="find-me-click">GitHub</OutboundLink>
          <OutboundLink className={homeStyles.chip} href="https://www.linkedin.com/in/praneel-sindhole/" eventName="find-me-click">LinkedIn</OutboundLink>
          <OutboundLink className={homeStyles.chip} href="https://mukticommunity.github.io/" eventName="find-me-click">MUKTI</OutboundLink>
          <OutboundLink className={homeStyles.chip} href="https://fossunited.org/u/praneel_sindhole" eventName="find-me-click">FOSS United</OutboundLink>
          <OutboundLink className={homeStyles.chip} href="https://n8n.io/creators/praneel7015/" eventName="find-me-click">n8n</OutboundLink>
          <OutboundLink className={homeStyles.chip} href="https://www.gaming.praneel.tech" eventName="find-me-click">Gamer?</OutboundLink>
        </div>
      </section>
    </Layout>
  );
}
