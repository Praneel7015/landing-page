# Deployment — Praneel Sindhole Portfolio

The site is deployed on **Vercel** at `https://praneel.sindhole.com`. Source of truth: this GitHub repo. Each push to `main` triggers a production deploy.

This document covers:
1. First-time setup
2. DNS cutover (Cloudflare → Vercel)
3. Environment variables
4. Verification
5. Post-cutover cleanup (Cloudflare Pages teardown)
6. Adding new analytics / external service env vars later

---

## 1. First-time setup (one-off)

1. Sign in at https://vercel.com with the GitHub account that owns this repo.
2. **Add New → Project → Import** the `landing-page` repo.
3. Framework preset: **Next.js** (auto-detected). Leave build/output settings on defaults.
4. **Do not** assign the production domain yet. Click Deploy and let it deploy to the default `*.vercel.app` URL first.
5. Once the preview is green, paste the production URL into a browser and click through `/`, `/blog/`, a post, `/projects/`, `/contact/`. Expect everything to render.

If the build fails, fix the underlying issue before going further. Do not flip DNS until the Vercel build is reliably green.

---

## 2. DNS cutover (Cloudflare → Vercel)

Run this when you're satisfied with the preview deploys.

### 2a. Vercel side

1. Vercel project → **Settings → Domains**.
2. Add `praneel.sindhole.com`.
3. Vercel prints either an A record or (more common for subdomains) a CNAME target like `cname.vercel-dns.com`.

### 2b. Cloudflare side

1. Cloudflare dashboard → `sindhole.com` zone → **DNS → Records**.
2. Find the existing `praneel` record. It currently points at Cloudflare Pages.
3. **Edit** it:
   - Type: `CNAME`
   - Name: `praneel`
   - Target: `cname.vercel-dns.com`
   - Proxy status: **DNS only** (grey cloud, not orange). Vercel handles TLS and edge — Cloudflare's proxy interferes.
4. Save. Propagation usually completes within 5 minutes. Vercel auto-issues a Let's Encrypt cert.

### 2c. Confirm

```
curl -I https://praneel.sindhole.com/
```

Expect `HTTP/2 200` and a `server: Vercel` (or similar) header. View source on any blog post and confirm `<link rel="canonical" href="https://praneel.sindhole.com/blog/posts/.../">` is correct.

---

## 3. Environment variables

All of these go in **Vercel project → Settings → Environment Variables**. Set each for **Production** and **Preview** (the same value works for both). They start with `NEXT_PUBLIC_` so Next.js exposes them to the browser at build time.

| Variable | Source | Purpose |
|---|---|---|
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami dashboard → Websites → praneel.sindhole.com → Edit → Website ID | Umami site identifier |
| `NEXT_PUBLIC_UMAMI_SCRIPT_URL` | Umami dashboard → tracking code → script src | Umami tracker URL |
| `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` | Cloudflare → Analytics & Logs → Web Analytics → praneel.sindhole.com → Manual setup → token | Cloudflare beacon token |
| `NEXT_PUBLIC_GISCUS_REPO` | `Praneel7015/blog-comments` | giscus repo |
| `NEXT_PUBLIC_GISCUS_REPO_ID` | https://giscus.app form | giscus repo ID |
| `NEXT_PUBLIC_GISCUS_CATEGORY` | `Blog Comments` | giscus category |
| `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | https://giscus.app form | giscus category ID |
| `NEXT_PUBLIC_CONTACT_LAMBDA_URL` | existing AWS Lambda Function URL | contact form endpoint |
| `NEXT_PUBLIC_CHATBOT_ENDPOINT` | existing chatbot endpoint | /chatbot page |

After setting env vars, trigger a **redeploy** from the Vercel dashboard (Deployments → latest → ⋯ → Redeploy) so the new values are baked in.

If an env var is missing, the code degrades gracefully — Umami/CF beacons just don't render, giscus block is hidden, contact form shows "endpoint not configured." Nothing crashes.

---

## 4. Verification checklist

After the first production deploy on `praneel.sindhole.com`:

- [ ] `curl -I https://praneel.sindhole.com/` returns 200
- [ ] View-source on `/` shows: `<html lang="en">`, unique `<title>`, `<link rel="canonical">`, `<script type="application/ld+json">` with `"@type":"Person"`
- [ ] View-source on a blog post shows BlogPosting JSON-LD with correct `datePublished`, `author`, `wordCount`
- [ ] `https://praneel.sindhole.com/sitemap.xml` resolves with valid XML
- [ ] `https://praneel.sindhole.com/rss.xml` resolves
- [ ] `https://praneel.sindhole.com/robots.txt` resolves
- [ ] Paste a post URL into LinkedIn / X compose → preview renders with title + description + image
- [ ] Network tab: `script.umami.is` (or your Umami host) loads
- [ ] Network tab: `static.cloudflareinsights.com/beacon.min.js` loads
- [ ] Network tab: `/_vercel/insights/script.js` loads (Vercel Analytics)
- [ ] Click an outbound "Find me" chip → Umami dashboard shows an `outbound-click` event within ~30s
- [ ] Scroll to bottom of a long post → `scroll-depth` events at 25/50/75/100% in Umami
- [ ] Toggle theme → `theme-toggle` event in Umami
- [ ] Search Console: add `https://praneel.sindhole.com` property, verify, submit `/sitemap.xml`
- [ ] Bing Webmaster Tools: same
- [ ] Run https://search.google.com/test/rich-results on home page → Person validates
- [ ] Run rich-results test on a blog post → BlogPosting validates
- [ ] Lighthouse: 95+ across Performance, SEO, Best Practices, Accessibility

---

## 5. Post-cutover cleanup

Once production has been stable on Vercel for **48 hours**:

1. Cloudflare dashboard → **Pages** → delete the old `landing-page` Pages project.
2. Old domain `praneel.tech`: set up a 301 redirect to `https://praneel.sindhole.com` covering all paths. If `praneel.tech` is on Cloudflare, the simplest path is a **Bulk Redirect** rule: source `https://praneel.tech/*`, target `https://praneel.sindhole.com/$1`, status 301, preserve query string. Do this **before** the domain expires.
3. Search Console: add the old `praneel.tech` property if it isn't already, then submit a **Change of Address** pointing to `praneel.sindhole.com`. This preserves whatever link equity Google has accumulated.

---

## 6. Adding new env vars later

Edit `.env.example` to document the new variable. Add it in Vercel → Settings → Environment Variables. Trigger a redeploy. Reference it in code via `process.env.NEXT_PUBLIC_NAME` — and gate the related feature so a missing value doesn't crash the build.

---

## Quick reference

- Vercel project: https://vercel.com/dashboard
- Cloudflare DNS for sindhole.com: https://dash.cloudflare.com/?to=/:account/sindhole.com/dns
- Umami dashboard: (existing instance — same host as for `praneel.tech`)
- Cloudflare Web Analytics: Cloudflare dashboard → Analytics & Logs → Web Analytics
- Vercel Analytics + Speed Insights: visible inside the Vercel project dashboard
- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters
- Rich Results Test: https://search.google.com/test/rich-results
