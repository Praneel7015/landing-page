import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import projectStyles from "../../styles/projects.module.css";
import { getClientWork } from "../../lib/clientWork";

export async function getStaticProps() {
  const clientWork = getClientWork();
  return { props: { clientWork } };
}

export default function ClientWorkPage({ clientWork }) {
  return (
    <Layout showBackLink={false}>
      <Head>
        <title>{`${siteTitle} Client Work`}</title>
      </Head>

      <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
        <Link
          href="/"
          style={{
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "8px 12px",
            textDecoration: "none",
            color: "var(--text)",
          }}
        >
          {"<- Back to home"}
        </Link>
      </div>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Client Work</h2>
        <ul className={utilStyles.list}>
          {clientWork.map((item) => (
            <li key={item.title} className={utilStyles.listItem}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={projectStyles.projectLink}
                >
                  {item.title}
                </a>
                {item.description && (
                  <small className={utilStyles.lightText}>{item.description}</small>
                )}
                {Array.isArray(item.tags) && item.tags.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          border: "1px solid var(--border)",
                          padding: "2px 8px",
                          borderRadius: 999,
                          fontSize: "0.75rem",
                          color: "var(--muted-text)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div style={{ marginTop: "1.5rem", marginBottom: "0.5rem" }}>
        <Link
          href="/"
          style={{
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "8px 12px",
            textDecoration: "none",
            color: "var(--text)",
          }}
        >
          {"<- Back to home"}
        </Link>
      </div>
    </Layout>
  );
}
