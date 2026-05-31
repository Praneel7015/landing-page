import { Html, Head, Main, NextScript } from 'next/document';

const setInitialTheme = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();`;

const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const umamiScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
const cfBeaconToken = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico?v=20250815" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <meta name="google-site-verification" content="XUQFhDYJvHd-CbWXZPBBLvTFJTotgwvpN3lG5-HwsYA" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Praneel Sindhole - Blog"
          href="/rss.xml"
        />
        {umamiWebsiteId && umamiScriptUrl && (
          <script
            defer
            src={umamiScriptUrl}
            data-website-id={umamiWebsiteId}
          />
        )}
        {cfBeaconToken && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${cfBeaconToken}"}`}
          />
        )}
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
