import { useCallback, useEffect, useRef, useState } from 'react';
import linksStyles from '../styles/links.module.css';
import utilStyles from '../styles/utils.module.css';

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  return new Promise((resolve, reject) => {
    let script = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener('load', () => resolve(window.turnstile));
    script.addEventListener('error', reject);
  });
}

const MESSAGES = {
  region: 'Direct WhatsApp and calls are open to clients in India. Please use the form below or book a call, and I will get back to you.',
  verification: 'Could not verify this browser. Please try again, or use the form below.',
  'not-configured': 'Direct contact is unavailable right now. Please use the form below.',
  network: 'Network error. Please check your connection and try again.',
};

// WhatsApp and call buttons whose links come from /api/contact-link after a
// Turnstile check, so the number is never part of the page.
export default function QuickContact() {
  const widgetRef = useRef(null);
  const widgetId = useRef(null);
  const [token, setToken] = useState('');
  const [pending, setPending] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!SITE_KEY) return undefined;
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !widgetRef.current || widgetId.current !== null) return;
        widgetId.current = turnstile.render(widgetRef.current, {
          sitekey: SITE_KEY,
          action: 'contact-link',
          appearance: 'interaction-only',
          callback: setToken,
          'expired-callback': () => setToken(''),
          'error-callback': () => setToken(''),
        });
      })
      .catch(() => setError(MESSAGES['not-configured']));
    return () => {
      cancelled = true;
      if (widgetId.current !== null && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, []);

  const open = useCallback(
    async (channel) => {
      if (!token || pending) return;
      setPending(channel);
      setError('');
      try {
        const res = await fetch('/api/contact-link/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ channel, token }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.url) {
          if (window.umami?.track) window.umami.track('quick-contact', { channel });
          window.location.href = data.url;
        } else {
          setError(MESSAGES[data.error] || MESSAGES.verification);
        }
      } catch {
        setError(MESSAGES.network);
      } finally {
        // Tokens are single use, so get a fresh one for the next tap.
        setToken('');
        setPending('');
        if (widgetId.current !== null && window.turnstile) window.turnstile.reset(widgetId.current);
      }
    },
    [token, pending]
  );

  if (!SITE_KEY) return null;

  const ready = Boolean(token) && !pending;

  return (
    <div style={{ marginTop: 12 }}>
      <p className={utilStyles.lightText} style={{ margin: '0 0 10px' }}>
        Prefer WhatsApp or a quick call?
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button
          type="button"
          className={linksStyles.linkButton}
          onClick={() => open('whatsapp')}
          disabled={!ready}
          aria-busy={pending === 'whatsapp'}
          style={{ fontFamily: 'inherit', opacity: ready ? 1 : 0.7, cursor: ready ? 'pointer' : 'wait' }}
        >
          {pending === 'whatsapp' ? 'Opening…' : 'WhatsApp me'}
        </button>
        <button
          type="button"
          className={linksStyles.linkButton}
          onClick={() => open('call')}
          disabled={!ready}
          aria-busy={pending === 'call'}
          style={{ fontFamily: 'inherit', opacity: ready ? 1 : 0.7, cursor: ready ? 'pointer' : 'wait' }}
        >
          {pending === 'call' ? 'Opening…' : 'Call me'}
        </button>
      </div>
      <div ref={widgetRef} style={{ marginTop: 8 }} />
      <p role="status" aria-live="polite" className={utilStyles.lightText} style={{ margin: error ? '8px 0 0' : 0 }}>
        {error}
      </p>
    </div>
  );
}
