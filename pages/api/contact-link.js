// Hands out the WhatsApp link only after a Cloudflare Turnstile check and
// only to visitors from allowed countries, so the link (and the number it
// opens) never appears in page HTML, JS bundles or anything a crawler reads.
//
// Server-only env (Vercel project settings, never NEXT_PUBLIC_):
//   TURNSTILE_SECRET_KEY       Turnstile secret for this site
//   CONTACT_WHATSAPP_URL       WhatsApp Business short link (https://wa.me/message/...)
//   CONTACT_ALLOWED_COUNTRIES  comma-separated ISO codes, default "IN"

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const TURNSTILE_ACTION = 'contact-link';

function allowedCountries() {
  return (process.env.CONTACT_ALLOWED_COUNTRIES || 'IN')
    .split(',')
    .map((c) => c.trim().toUpperCase())
    .filter(Boolean);
}

function isAllowedRegion(req) {
  const country = String(req.headers['x-vercel-ip-country'] || '').toUpperCase();
  // Vercel always sets the header in production. Off Vercel (local dev)
  // there is no geo data, so allow it there instead of locking yourself out.
  if (!country) return process.env.VERCEL !== '1';
  return allowedCountries().includes(country);
}

function clientIp(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '');
  return forwarded.split(',')[0].trim() || req.socket?.remoteAddress || '';
}

async function verifyTurnstile(token, ip) {
  const body = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY,
    response: token,
  });
  if (ip) body.set('remoteip', ip);
  try {
    const res = await fetch(SITEVERIFY_URL, { method: 'POST', body });
    if (!res.ok) return false;
    const data = await res.json();
    return data.success === true && (!data.action || data.action === TURNSTILE_ACTION);
  } catch {
    return false;
  }
}

function whatsappLink() {
  const url = process.env.CONTACT_WHATSAPP_URL || '';
  return url.startsWith('https://wa.me/') ? url : null;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method' });
  }

  const { token } = req.body || {};
  if (typeof token !== 'string' || !token) {
    return res.status(400).json({ error: 'bad-request' });
  }

  const url = whatsappLink();
  if (!url || !process.env.TURNSTILE_SECRET_KEY) {
    return res.status(503).json({ error: 'not-configured' });
  }

  if (!isAllowedRegion(req)) {
    return res.status(403).json({ error: 'region' });
  }

  if (!(await verifyTurnstile(token, clientIp(req)))) {
    return res.status(403).json({ error: 'verification' });
  }

  return res.status(200).json({ url });
}
