// This is the page for cal.com Embedded Scheduling uses same style as the rest of the project too
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import linksStyles from '../styles/links.module.css';
import { useState, useRef, useEffect } from 'react';

export default function Cal() {
  const [isLoaded, setIsLoaded] = useState(false);
  const calRef = useRef(null);
  const calUrl = 'process.env.NEXT_PUBLIC_CALCOM'; // Replace with your actual Cal.com URL

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.cal.com/embed.js';
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (isLoaded && window.Cal) {
      window.Cal.createWidget({
        url: calUrl,
        parentElement: calRef.current,
        prefill: {},
        utm: {},
        styles: {
          height: '700px',
          width: '100%',
        },
      });
    }
  }, [isLoaded]);

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Schedule a Meeting</title>
        <meta name="description" content="Schedule a meeting with me using Cal.com embedded scheduling." />
      </Head>
      <section className={utilStyles.headingMd}>
        <p className={linksStyles.description}>
          Use the embedded scheduler below to book a meeting with me at your convenience.
        </p>
        <div ref={calRef} style={{ minHeight: '700px' }}>
          {!isLoaded && <p>Loading scheduler...</p>}
        </div>
      </section>
    </Layout>
  );
}