import Link from 'next/link';
import Layout from '../components/layout';
import SEO from '../components/SEO';
import utilStyles from '../styles/utils.module.css';
import linksStyles from '../styles/links.module.css';


export default function AboutPage() {
  return (
    <Layout showBackLink={false}>
      <SEO
        title="About Praneel Sindhole"
        description="About Praneel Sindhole - a Computer Science student in Bangalore who leads MUKTI, builds FOSS projects, and writes about IoT, cybersecurity, and automation."
        path="/about"
      />
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
        <h1 className={utilStyles.headingXl}>About Praneel Sindhole</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p>
            Hi, I'm Praneel. I'm a Computer Science and Engineering student in my third year, with a strong interest in free and open-source technology.
          <br/>
          <br/>
            My main areas of focus are IoT and electronics, programming for FOSS projects, and cybersecurity. What drives me is the idea of building projects and products that people actually use and that make a positive impact.
          <br/>
          <br/>
            I currently lead my college's FOSS club, Mukti!, where we organize events and seminars around open-source technology. Feel free to check out our work.
          <br/>
          <br/>
            Beyond tech, I enjoy playing video games, Tennis, and other sports. I also spend alot of my free time at the gym.
          <br/>
          <br/>
            If you'd like to get in touch, just click the contact button below!
          </p>
          <div style={{
          marginTop: '1.5rem',
          display: 'flex',
          gap: '10px',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}>
                    <Link className={linksStyles.linkButton} href="/contact" prefetch>
            Contact
          </Link>
        </div>
        </div>
      </section>
    </Layout>
  );
}