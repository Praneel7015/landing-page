import { useCallback, useEffect, useRef, useState } from 'react';
import contactStyles from '../styles/contact.module.css';
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
    }
    script.addEventListener('load', () => resolve(window.turnstile));
    script.addEventListener('error', (event) => {
      script.remove();
      reject(event);
    });
    if (!script.isConnected) document.head.appendChild(script);
  });
}

const MESSAGES = {
  region: 'WhatsApp is unavailable in your region. Please use the form below or book a call, and I will get back to you.',
  verification: 'Could not verify this browser. Please try again, or use the form below.',
  widget: 'Browser verification failed. Please try again, or use the form below.',
  'not-configured': 'WhatsApp is unavailable right now. Please use the form below.',
  network: 'Network error. Please check your connection and try again.',
};

// WhatsApp glyph from Simple Icons (CC0), the official WhatsApp logo mark.
function WhatsAppIcon() {
  return (
    <svg className={contactStyles.whatsappIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      />
    </svg>
  );
}

// WhatsApp button whose link comes from /api/contact-link after a Turnstile
// check, so the number is never part of the page.
export default function QuickContact() {
  const widgetRef = useRef(null);
  const widgetId = useRef(null);
  const [token, setToken] = useState('');
  const [pending, setPending] = useState(false);
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
          callback: (value) => {
            setToken(value);
            setError((current) => current === MESSAGES.widget ? '' : current);
          },
          'expired-callback': () => setToken(''),
          'error-callback': () => { setToken(''); setError(MESSAGES.widget); },
        });
      })
      .catch(() => { if (!cancelled) setError(MESSAGES['not-configured']); });
    return () => {
      cancelled = true;
      if (widgetId.current !== null && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, []);

  const openWhatsApp = useCallback(async () => {
    if (!token || pending) return;
    setPending(true);
    setError('');
    try {
      const res = await fetch('/api/contact-link/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        if (window.umami?.track) window.umami.track('quick-contact', { channel: 'whatsapp' });
        window.location.href = data.url;
      } else {
        setError(MESSAGES[data.error] || MESSAGES.verification);
      }
    } catch {
      setError(MESSAGES.network);
    } finally {
      // Tokens are single use, so get a fresh one for the next tap.
      setToken('');
      setPending(false);
      if (widgetId.current !== null && window.turnstile) window.turnstile.reset(widgetId.current);
    }
  }, [token, pending]);

  if (!SITE_KEY) return null;

  return (
    <div className={contactStyles.quickContact}>
      <button
        type="button"
        className={contactStyles.whatsappButton}
        onClick={openWhatsApp}
        disabled={!token || pending}
        aria-busy={pending}
      >
        <WhatsAppIcon />
        <span>{pending ? 'Opening WhatsApp…' : 'Chat on WhatsApp'}</span>
      </button>
      <div ref={widgetRef} className={contactStyles.turnstile} />
      <p role="status" aria-live="polite" className={`${utilStyles.lightText} ${contactStyles.quickContactError}`}>
        {error}
      </p>
    </div>
  );
}
