import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
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
