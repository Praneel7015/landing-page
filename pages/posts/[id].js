import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css';
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Link from 'next/link';


export default function Post({ postData }) {
    return (
                <Layout showBackLink={false}>
        <Head>
            <title>{postData.title}</title>
        </Head>
                <div style={{
                    marginTop: '0.5rem',
                    marginBottom: '0.75rem'
                }}>
                    <Link href="/blog" style={{
                        border: '1px solid var(--border)',
                        borderRadius: 10,
                        padding: '8px 12px',
                        textDecoration: 'none',
                        color: 'var(--text)'
                    }}>← Back to blog</Link>
                </div>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
                <div style={{
                    marginTop: '1rem',
                    marginBottom: '0.5rem'
                }}>
                    <Link href="/blog" style={{
                        border: '1px solid var(--border)',
                        borderRadius: 10,
                        padding: '8px 12px',
                        textDecoration: 'none',
                        color: 'var(--text)'
                    }}>← Back to blog</Link>
                </div>
    </Layout>
  );
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return{
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const postData =  await getPostData(params.id);
    return{
        props:{
            postData,
        },
    };
    
}