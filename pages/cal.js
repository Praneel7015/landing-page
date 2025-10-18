import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function CalPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])
  
  return (
    <Layout showBackLink={false}>
      <Head>
        <title>{`${siteTitle} Schedule a Meeting`}</title>
        <meta
          name="description"
          content="Schedule a meeting with Praneel using Cal.com embedded scheduling."
        />
      </Head>

      <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
        <Link
          href="/"
          style={{
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '8px 12px',
            textDecoration: 'none',
            color: 'var(--text)',
          }}
        >
          ← Back to home
        </Link>
      </div>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Schedule a Meeting</h2>
        <p style={{ color: 'var(--muted-text)', marginBottom: '1rem' }}>
          Use the scheduler below to book a meeting with me at your convenience.
        </p>

        <div
          style={{
            width: '100%',
            minHeight: '640px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            background: 'var(--bg)',
          }}
        >
          <Cal 
            namespace="30min"
            calLink="praneels/30min"
            style={{width:"100%",height:"100%",overflow:"scroll"}}
            config={{"layout":"month_view"}}
          />
        </div>
      </section>
    </Layout>
  );
}
