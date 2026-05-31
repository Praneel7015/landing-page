import { useEffect, useRef } from 'react';

const MILESTONES = [25, 50, 75, 100];

export default function ScrollDepth({ slug }) {
  const fired = useRef(new Set());
  const ticking = useRef(false);

  useEffect(() => {
    fired.current = new Set();

    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        ticking.current = false;
        const doc = document.documentElement;
        const total = doc.scrollHeight - doc.clientHeight;
        if (total <= 0) return;
        const pct = Math.min(100, Math.round((window.scrollY / total) * 100));
        for (const m of MILESTONES) {
          if (pct >= m && !fired.current.has(m)) {
            fired.current.add(m);
            if (window.umami?.track) {
              window.umami.track('scroll-depth', { milestone: m, slug });
            }
          }
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  return null;
}
