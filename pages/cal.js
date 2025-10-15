// pages/cal.js or pages/cal.tsx
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import linksStyles from '../styles/links.module.css';
import { useState, useRef, useEffect } from 'react';

export default function Cal() {
  const [isLoaded, setIsLoaded] = useState(false);
  const calRef = useRef(null);
  const calUrl = process.env.NEXT_PUBLIC_CALCOM;

  useEffect(() => {
    if (!calUrl) {
      console.error('Missing NEXT_PUBLIC_CALCOM environment variable.');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.cal.com/embed.js';
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);
  }, [calUrl]);

  useEffect(() => {
    if (isLoaded && window.Cal && calRef.current) {
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
  }, [isLoaded, calUrl]);

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
