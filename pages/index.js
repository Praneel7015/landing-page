import Link from 'next/link';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import linksStyles from '../styles/links.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
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
      <section className={utilStyles.headingMd}>
        <p>Hi, I'm Praneel.<br/> A FOSS Enthusiast and Cyber Security Lover, I also write Blogs! </p>
      </section>
      <section className={utilStyles.headingMd}>
        <div className={linksStyles.container}>
          <Link className={linksStyles.linkButton} href="/blog" prefetch>
            Blog Page
          </Link>
          <Link className={linksStyles.linkButton} href="/about" prefetch>
            About
          </Link>
          <Link className={linksStyles.linkButton} href="/projects" prefetch>
            Projects
          </Link>
          <a className={linksStyles.linkButton} href="https://github.com/Praneel7015">Github</a>
          <a className={linksStyles.linkButton} href="https://www.linkedin.com/in/praneel-sindhole/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className={linksStyles.linkButton} href="https://mukticommunity.github.io/">MUKTI</a>
          <Link className={linksStyles.linkButton} href="/contact" prefetch>
            Contact
          </Link>
        </div>
      </section>
    </Layout>
  );
}
