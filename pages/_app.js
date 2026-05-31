import '../styles/global.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export function reportWebVitals(metric) {
  if (typeof window === 'undefined') return;
  if (!window.umami?.track) return;
  window.umami.track('web-vitals', {
    name: metric.name,
    value: Math.round(metric.value),
    id: metric.id,
  });
}
