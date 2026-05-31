# AI Implementation Prompt — Praneel Sindhole Portfolio: SEO, Analytics, and Hosting Overhaul

> This is a complete brief for an AI coding agent. Read the whole document before starting. Then execute the phases in order. Do not skip phases. Do not change scope without asking. Commit after each phase as specified. Do not push — the human will push.

---

## 0. How to use this document

You are an AI coding agent (Claude Code, Cursor, Aider, Codex, etc.) working inside the repo at `praneel.sindhole.com`'s source. The human has already reviewed and approved this plan. Your job:

1. Read sections 1 through 6 fully so you have context.
2. Execute Phase 0 (pre-flight) to confirm baseline.
3. For each subsequent phase: read the phase, do the work, run the verification, commit with the prescribed message format, then move on.
4. If something is ambiguous or a phase fails verification: stop, summarise the blocker, ask the human.
5. Print a 3–5 line summary at the end of each phase.

Rules you must not break:
- Never push to the remote. The human pushes.
- Never force-push, never `git reset --hard`, never delete branches.
- Never run `git add .` or `git add -A`. Stage only the files you actually changed in that phase.
- Never skip git hooks (`--no-verify`).
- After every phase, run `pnpm build` (or `npm run build` if pnpm is unavailable). If the build breaks, fix it before committing.
- Assume Vercel as the host from Phase 1 onward. Do not write or preserve any Cloudflare Pages-specific code (no `output: 'export'`, no `_redirects`, no `images.unoptimized`).
- Do not introduce a new CSS framework (no Tailwind etc.). Use existing CSS modules and styled-jsx.
- Do not restructure routing. Pages Router stays.
- Match existing code style (semicolons, single quotes, etc.).

---

## 1. Mission

Make `https://praneel.sindhole.com` the #1 result for branded queries — **"Praneel"**, **"Praneel Sindhole"**, **"Praneel Portfolio"** — and grow organic discovery via the blog. Specifically:

- Hit 95+ on all four Lighthouse categories (Performance, SEO, Best Practices, Accessibility).
- Get Google to render a rich result (knowledge-panel-style card) for "Praneel Sindhole" through correct `Person` JSON-LD with `sameAs` linking to canonical social profiles.
- Get blog posts indexed and ranking on long-tail queries (especially the AWS Cloud Day series — biggest organic-traffic opportunity).
- Capture analytics so future content decisions are data-driven.

---

## 2. Who is the person, and what does the site need to say about him

Use these facts verbatim when filling meta descriptions, structured data, and copy. Do not invent additional facts.

| Field | Value |
|---|---|
| Full name | Praneel Sindhole |
| Location | Bangalore, India |
| Role | Computer Science & Engineering student (3rd year) |
| Leads | MUKTI — his college's open-source club |
| Interests | FOSS, IoT, electronics, cybersecurity, n8n automation, gaming, tennis, gym |
| GitHub | https://github.com/Praneel7015 |
| LinkedIn | https://www.linkedin.com/in/praneel-sindhole/ |
| FOSS United profile | https://fossunited.org/u/praneel_sindhole |
| n8n creator profile | https://n8n.io/creators/praneel7015/ |
| MUKTI (org he leads) | https://mukticommunity.github.io/ |
| Email-style contact | Use the existing `/contact` page link, don't hard-code an email anywhere new |

Tone for copy: first-person, dry humour, technical but accessible. Match the existing voice of `pages/index.js` and `pages/about.js`.

---

## 3. Project snapshot

- **Framework:** Next.js `15.5.18`, React `19.2.6`, Pages Router (not App Router).
- **Styling:** vanilla CSS modules in `styles/` + styled-jsx.
- **Package manager:** pnpm (use `pnpm` commands; fall back to `npm` only if pnpm fails).
- **Node:** `>=18` per `package.json`.
- **Content:** 22 markdown blog posts in `/blog/posts/*.md`, parsed via `gray-matter` + `remark` + `remark-html` in `lib/posts.js`.
- **Projects + client work:** hard-coded arrays in `lib/projects.js` and `lib/clientWork.js`.
- **Pages:** `/`, `/about`, `/blog`, `/blog/posts/[id]`, `/projects`, `/client-work`, `/contact`, `/cal`, `/chatbot`, `/countdown`, `/404`.
- **Components:** `Layout` (in `components/layout.js`) wraps every page and currently sets one global meta description and a broken OG image (`og-image.vercel.app`, which Vercel deprecated).
- **Current host:** Cloudflare Pages with `output: 'export'` (static). This is the active code path in `next.config.js` because `NEXT_EXPORT` is set in the CF Pages build env.
- **Current analytics:** Umami snippet is wired in `pages/_document.js` via `NEXT_PUBLIC_UMAMI_WEBSITE_ID` and `NEXT_PUBLIC_UMAMI_SCRIPT_URL`, **but those env vars are unset for praneel.sindhole.com**. The Umami dashboard already exists for the human's other site (`praneel.tech`); a new website ID will be created there for `praneel.sindhole.com` (human task in Phase 9).
- **Domain situation:**
  - `praneel.sindhole.com` (subdomain) = the target domain. Stay here.
  - `sindhole.com` (apex) = reserved by the human for something else later.
  - `praneel.tech` (old) = from GitHub Student Pack, expiring. Set up 301 redirects to the new domain before it lapses (human task).

---

## 4. Decisions (locked in — do not relitigate)

The human made these calls. The AI agent does not need to ask again:

1. **Domain: stay on `praneel.sindhole.com`.** All canonical URLs use this host.
2. **Hosting: migrating from Cloudflare Pages to Vercel — Vercel is now the assumed target from Phase 1.** Reason: CF Pages forces `output: 'export'`, which blocks dynamic OG images, `getServerSideProps`-style sitemap/RSS, API routes, image optimisation, and the `redirects()` block in `next.config.js`. Vercel is built by the Next.js team, the free Hobby tier covers this site, image optimisation is included, and DX is best-in-class. The CF-Pages-specific branch (`isCloudflare` conditional, `output: 'export'`, `images.unoptimized`, `_redirects` shim) is removed in Phase 1. Vercel project setup is a human task that must happen **before** pushing any of these commits (see Phase -1 below) or accept that the live CF Pages site will fail to build during the transition window.
3. **Analytics stack (three-tool setup):**
   - **Umami** (existing dashboard, new website ID for `praneel.sindhole.com`) — custom events, referrers, durations. Cookieless. Goes live in Phase 6.
   - **Cloudflare Web Analytics** — privacy-friendly free pageview baseline. Beacon JS snippet, works regardless of host (Cloudflare DNS-only is fine; no need to proxy traffic). Goes live in Phase 6.
   - **Vercel Analytics + Speed Insights** — added when the site moves to Vercel in Phase 7. Gives real-user Core Web Vitals tied to deploys.
   - **Google Search Console** + **Bing Webmaster Tools** — mandatory for SEO, both verified (human task, Phase 9).
   - **Skip GA4.** Too much overhead, consent banner risk, marginal value for a personal site.
   - **Skip Plausible.** Redundant with Umami.
   - All three of Umami, CF Web Analytics, and Vercel Analytics are lightweight and cookieless. They produce some overlap (all count pageviews) but each gives data the others don't: Umami = custom events, CF = referrer/country with zero JS overhead, Vercel = real-user vitals.
4. **OG images: build-time generated** with `satori` + `@resvg/resvg-js`. Writes PNGs to `/public/og/*.png` so they work in static export AND on Vercel.
5. **No newsletter signup in v1.** Just provide RSS at `/rss.xml`.
6. **Comments: giscus** (GitHub Discussions backed). Adds living signal to old posts, zero infra.
7. **Code highlighting: `rehype-pretty-code`** (Shiki under the hood). Build-time, no client JS, beautiful output.
8. **Trailing slash: keep `trailingSlash: true`.** All canonical URLs must end with `/` to avoid duplicates.
9. **Site canonical base URL: `https://praneel.sindhole.com`.** Hard-code as a constant in `lib/seo.js`; do not pull from env at this stage.
10. **Brand colours and font:** keep what currently ships. No design redesign in this scope.

---

## 5. Working principles

### Commit conventions

After each phase, commit with this format. Use a HEREDOC for multi-line messages.

```
<type>: <short imperative summary>

- bullet of what changed
- bullet of what changed
- bullet of why if non-obvious
```

`<type>` is one of: `seo`, `blog`, `perf`, `analytics`, `infra`, `chore`, `fix`.

Examples:
- `seo: add per-page meta and Person JSON-LD`
- `blog: expand frontmatter schema and add BlogPosting structured data`
- `analytics: wire umami events for outbound clicks and scroll depth`
- `infra: migrate from Cloudflare Pages static export to Vercel SSR`

Do **not** add `Co-Authored-By` lines or `Generated with Claude Code` footers in commit messages for this repo. The human prefers clean commits.

Stage only files you touched in this phase using explicit paths:

```bash
git add path/to/file1.js path/to/file2.md
git commit -m "$(cat <<'EOF'
seo: ...
EOF
)"
```

### After each phase

1. `pnpm build` — must succeed.
2. `pnpm dev` smoke test if the change is visual (open `localhost:3000`, click around the affected pages).
3. Stage + commit per above.
4. Print a 3–5 line summary: what changed, what files, what to expect, any follow-ups.
5. Move to the next phase.

### When you get stuck

If something fails verification or you're uncertain, stop and write a brief blocker report:
- What you tried
- What the error / unexpected output is
- Two or three options for how to resolve
- Wait for the human to pick

Do not power through with destructive shortcuts.

---

## 6. Phase map at a glance

| Phase | Theme |
|---|---|
| -1 | **Human pre-work**: Vercel project, DNS plan, Cloudflare Web Analytics site, Umami website, giscus repo, Search Console |
| 0 | Pre-flight build check |
| 1 | HTML foundations, per-page meta, Person JSON-LD, **strip Cloudflare Pages config** |
| 2 | Blog frontmatter expansion, per-post meta, BlogPosting JSON-LD |
| 3 | Reading experience: syntax highlighting, heading anchors, TOC, related posts, reading time, giscus |
| 4 | Tag pages, series support (AWS Cloud Day hub), blog index redesign |
| 5 | sitemap.xml, robots.txt, rss.xml, build-time OG image generation, manifest |
| 6 | Umami events + Cloudflare Web Analytics beacon + web-vitals reporting |
| 7 | Vercel Analytics + Speed Insights, DEPLOY.md |
| 8 | Post-migration polish: dynamic OG route (optional), ISR for blog, perf pass |
| 9 | Human verification checklist (DNS swap, sitemap submission, rich-results test, backlinks) |

---

## Phase -1 — Human pre-work (must happen before any code is pushed)

**This is the human's job, not the agent's.** The agent should still print this list at the start of its run so the human sees it before authorising commits to go to remote.

The site is currently on Cloudflare Pages. Phase 1 strips the CF Pages compatibility shim from `next.config.js`. Once the human pushes the Phase 1 commit, the Cloudflare Pages build will fail (no `output: 'export'`, image optimisation enabled). To avoid serving a broken site during transition, the human should complete these steps **before pushing**:

1. **Create the Vercel project.** Sign in at vercel.com, import the `landing-page` GitHub repo. Framework auto-detects as Next.js. Don't add a custom domain yet — let it deploy on the default `*.vercel.app` URL first to confirm green.
2. **Verify a green Vercel build** of the `main` branch as it stands today (still has CF config — Vercel ignores the CF branch and builds the SSR path fine). If this fails, fix the underlying cause before any code work begins.
3. **Cloudflare Web Analytics:** Cloudflare dashboard → Analytics & Logs → Web Analytics → Add site → enter `praneel.sindhole.com` → Manual setup → copy token.
4. **Umami:** in the existing Umami dashboard (same instance that powers `praneel.tech`), add a new website for `praneel.sindhole.com` → copy `data-website-id` and `data-script-url`.
5. **giscus repo:** create empty public GitHub repo `Praneel7015/blog-comments`, enable Discussions in Settings, install the giscus GitHub App (https://github.com/apps/giscus) scoped to just that repo. Visit https://giscus.app/, fill the form (mapping: `pathname`, theme: `preferred_color_scheme`), copy the four `data-*` IDs.
6. **Stash all env values somewhere safe** — you'll paste them into Vercel project Environment Variables once code is ready.

Only after the above is done should the agent's commits get pushed. The agent itself never pushes.

---

## Phase 0 — Pre-flight

**Goal:** confirm clean baseline before touching code.

Steps:
1. `git status` — expect either a clean tree or a known modified file (`lib/clientWork.js` was modified at the start of this engagement; either commit or stash before starting).
2. `pnpm install` — must succeed.
3. `pnpm build` — must succeed. If it fails, stop and report. Do not start Phase 1 with a broken build.
4. `pnpm dev` — start the dev server briefly. Confirm:
   - `/` renders with the hero, status, featured projects, client work, recent posts, find-me chips
   - `/blog/` lists posts
   - `/blog/posts/india-foss-2025/` renders
   - `/about/` renders
   - `/projects/` renders
5. Stop the dev server.

**No commit.** Just confirm green and move on.

---

## Phase 1 — HTML foundations, per-page meta, Person JSON-LD

**Goal:** every page has a unique, keyword-rich `<title>`, a unique meta description, a canonical URL, a working OG image reference, proper `<html lang>`, and the home page emits a `Person` JSON-LD block so Google can build a knowledge-graph entity for "Praneel Sindhole".

### 1.1 Create `lib/seo.js`

New file. Centralised SEO constants and helpers.

```js
// lib/seo.js
export const SITE_URL = 'https://praneel.sindhole.com';
export const SITE_NAME = 'Praneel Sindhole';
export const DEFAULT_TITLE = 'Praneel Sindhole — FOSS, IoT & Cybersecurity Portfolio';
export const DEFAULT_DESCRIPTION =
  'Praneel Sindhole is a Computer Science student in Bangalore who builds FOSS projects, tinkers with IoT and electronics, and leads MUKTI, his college open-source club.';
export const DEFAULT_OG_IMAGE = '/og/default.png';
export const TWITTER_HANDLE = ''; // intentionally blank — no Twitter/X account

export const SOCIAL_PROFILES = {
  github: 'https://github.com/Praneel7015',
  linkedin: 'https://www.linkedin.com/in/praneel-sindhole/',
  fossunited: 'https://fossunited.org/u/praneel_sindhole',
  n8n: 'https://n8n.io/creators/praneel7015/',
  mukti: 'https://mukticommunity.github.io/',
};

export function canonicalUrl(path = '/') {
  const p = path.startsWith('/') ? path : `/${path}`;
  // trailingSlash: true is set in next.config.js — match it.
  const withSlash = p.endsWith('/') ? p : `${p}/`;
  return `${SITE_URL}${withSlash}`;
}

export function absoluteImage(path) {
  if (!path) return `${SITE_URL}${DEFAULT_OG_IMAGE}`;
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Praneel Sindhole',
    url: SITE_URL,
    image: `${SITE_URL}/images/profile.jpg`,
    jobTitle: 'Computer Science & Engineering Student',
    description: DEFAULT_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangalore',
      addressCountry: 'IN',
    },
    knowsAbout: [
      'Free and Open Source Software',
      'IoT',
      'Electronics',
      'Cybersecurity',
      'n8n automation',
      'Linux',
    ],
    sameAs: [
      SOCIAL_PROFILES.github,
      SOCIAL_PROFILES.linkedin,
      SOCIAL_PROFILES.fossunited,
      SOCIAL_PROFILES.n8n,
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'MUKTI',
      url: SOCIAL_PROFILES.mukti,
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    author: {
      '@type': 'Person',
      name: 'Praneel Sindhole',
      url: SITE_URL,
    },
  };
}
```

### 1.2 Create `components/SEO.js`

New file. Drop-in `<SEO />` component used by every page.

```js
// components/SEO.js
import Head from 'next/head';
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  canonicalUrl,
  absoluteImage,
} from '../lib/seo';

export default function SEO({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
  jsonLd,
  noindex = false,
}) {
  const finalTitle = title
    ? `${title} — ${SITE_NAME}`
    : DEFAULT_TITLE;
  const finalDescription = description || DEFAULT_DESCRIPTION;
  const url = canonicalUrl(path);
  const ogImage = absoluteImage(image || DEFAULT_OG_IMAGE);

  return (
    <Head>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article extras */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && Array.isArray(tags) &&
        tags.map((t) => (
          <meta key={t} property="article:tag" content={t} />
        ))}

      {/* JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
}
```

### 1.3 Fix `pages/_document.js`

- Add `lang="en"` to `<Html>`.
- Add `<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />` and the dark equivalent.
- Add `apple-touch-icon` placeholder link (`/apple-touch-icon.png`). The file is created in Phase 5 — leave the link tag in now so the image works when added.

### 1.4 Strip the broken global SEO from `components/layout.js`

In `components/layout.js`:
- Remove the entire `<Head>` block (lines 43–58 currently) — meta description, broken `og-image.vercel.app` URL, og:title, twitter:card. Move favicon and viewport into `pages/_document.js`.
- Each page will now own its `<head>` via the `<SEO />` component.

### 1.5 Update each page to use `<SEO />`

For each of the following, add `import SEO from '../components/SEO';` (adjust relative path) and replace the existing `<Head>` block with `<SEO ... />` using the values below.

**`pages/index.js`** — no `title` prop (uses default), `path="/"`, include `jsonLd={[personJsonLd(), websiteJsonLd()]}` (wrap as one `@graph` array — see snippet below).

```js
// inside pages/index.js
import { personJsonLd, websiteJsonLd } from '../lib/seo';

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [personJsonLd(), websiteJsonLd()],
};

// in JSX:
<SEO path="/" jsonLd={homeJsonLd} />
```

**`pages/about.js`**:
```js
<SEO
  title="About Praneel Sindhole"
  description="About Praneel Sindhole — a Computer Science student in Bangalore who leads MUKTI, builds FOSS projects, and writes about IoT, cybersecurity, and automation."
  path="/about"
/>
```

**`pages/blog/index.js`**:
```js
<SEO
  title="Blog"
  description="Praneel Sindhole's blog — posts on FOSS, AWS, n8n automation, mechanical keyboards, cybersecurity, and learning in public."
  path="/blog"
/>
```

**`pages/projects/index.js`**:
```js
<SEO
  title="Projects"
  description="A list of FOSS, IoT, and web projects built by Praneel Sindhole."
  path="/projects"
/>
```

**`pages/client-work/index.js`** (path may vary, confirm with `git ls-files pages/`):
```js
<SEO
  title="Client Work"
  description="Websites and web apps Praneel Sindhole has shipped for clients."
  path="/client-work"
/>
```

**`pages/contact.js`**:
```js
<SEO
  title="Contact"
  description="Get in touch with Praneel Sindhole."
  path="/contact"
/>
```

**`pages/cal.js`**, **`pages/chatbot.js`**, **`pages/countdown.js`**: add `<SEO noindex />` — these are utility pages, no need to index them.

**`pages/404.js`**: `<SEO title="Not Found" noindex />`.

### 1.6 Update `components/layout.js` heading hierarchy

Currently inner pages render an `<h2>` for the name and the page often has another `<h2>` for content. That gives Google no clear `<h1>` per page.

Change: on non-home pages, render the name as a `<span>` or `<p>` inside the header, **not** as an `<h2>`. The page itself owns the `<h1>`. Update each page that currently uses `headingLg` `<h2>` for the page title to use `<h1>` instead.

Specifically: in `pages/about.js`, change `<h2 className={utilStyles.headingLg}>About Me</h2>` to `<h1 className={utilStyles.headingXl}>About Praneel Sindhole</h1>`. Similar treatment for `pages/blog/index.js` ("Blog — Posts by Praneel Sindhole"), `pages/projects/index.js`, `pages/client-work/index.js`, `pages/contact.js`.

The home page (`pages/index.js`) already has an `<h1>` of Praneel's name from the layout — leave it.

### 1.7 Strip Cloudflare Pages config from `next.config.js`

Replace the entire `next.config.js` with the Vercel-only version. No more `isCloudflare` branch, no `output: 'export'`, no `images.unoptimized`, no `trailingSlash` conditional — `trailingSlash: true` becomes unconditional.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/posts/:id',
        destination: '/blog/posts/:id',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

After this change, the project will no longer build correctly on Cloudflare Pages. That's intentional — the human has already verified the Vercel project is green (Phase -1, step 2) and will flip DNS as part of Phase 9. Until DNS flips, the CF Pages deploy will be stale or broken; the production URL will still serve a correct page once DNS is on Vercel.

Also delete the dead `pages/api/hello.js` placeholder while you're here — it's never used.

### 1.8 Verification

- `pnpm build` succeeds.
- View source on each page (use `curl http://localhost:3000/about/ | grep -i 'title\|description\|canonical'`):
  - Unique `<title>`
  - Unique `<meta name="description">`
  - `<link rel="canonical">` matches `https://praneel.sindhole.com<path>/`
  - `<html lang="en">`
  - Home has a `<script type="application/ld+json">` block with `"@type": "Person"`
- Paste the home-page source into https://search.google.com/test/rich-results — the Person schema should validate. (Human will do this; agent just needs to make the markup valid.)
- One `<h1>` per page.

### 1.9 Commit

```
seo: add per-page meta, canonical URLs, Person JSON-LD; drop Cloudflare Pages config

- introduce lib/seo.js with site constants and JSON-LD helpers
- add components/SEO.js as the single source of truth for page heads
- wire SEO into home, about, blog index, projects, client-work, contact
- noindex utility pages (cal, chatbot, countdown, 404)
- promote page titles to <h1>, add html lang=en, theme-color, apple-touch-icon link
- remove broken og-image.vercel.app reference from global layout
- strip isCloudflare branch and output:'export' from next.config.js (Vercel-only now)
- delete pages/api/hello.js stub
```

---

## Phase 2 — Blog: frontmatter expansion, per-post meta, BlogPosting JSON-LD

**Goal:** every blog post emits a unique title, description, OG tags, canonical, and a `BlogPosting` structured-data block. Frontmatter gains fields the SEO and listing logic can use without rewriting every post immediately.

### 2.1 Extend `lib/posts.js`

Add the following capabilities to `lib/posts.js`:

- Read these frontmatter fields if present: `title`, `date`, `updated`, `description`, `tags`, `cover`, `excerpt`, `series`, `seriesIndex`, `draft`.
- If `draft: true` and `process.env.NODE_ENV === 'production'`, exclude the post from `getSortedPostsData()` and `getAllPostIds()`.
- If `description` is missing, auto-derive one: take the first paragraph of the post body, strip markdown, truncate at ~155 characters at a word boundary, append `…` if truncated.
- If `excerpt` is missing, fall back to `description`.
- Add a `readingTime` field computed as `Math.max(1, Math.round(wordCount / 200))` minutes.
- Add a `wordCount` field.
- Export a new helper `getPostsByTag(tag)` returning sorted posts with that tag.
- Export a new helper `getAllTags()` returning an array of `{ tag, count }`.
- Export a new helper `getPostsInSeries(series)` returning posts in that series sorted by `seriesIndex` then `date`.
- Export a new helper `getRelatedPosts(post, limit = 3)` — posts sharing the most tags, excluding the current one.

Implementation hint: parse the markdown body once when building data, count words from the plain-text version, store `wordCount` and `readingTime` on each post object.

### 2.2 Update `pages/blog/posts/[id].js`

- Use the new `<SEO />` component with `type="article"`, `publishedTime`, `modifiedTime` (defaults to `publishedTime` if `updated` is missing), `tags`, and `image` from `postData.cover` (or generated OG — Phase 5).
- Render a `BlogPosting` JSON-LD block:

```js
const blogPostingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl(`/blog/posts/${postData.id}`) },
  headline: postData.title,
  description: postData.description,
  image: absoluteImage(postData.cover || `/og/${postData.id}.png`),
  datePublished: postData.date,
  dateModified: postData.updated || postData.date,
  author: {
    '@type': 'Person',
    name: 'Praneel Sindhole',
    url: SITE_URL,
  },
  publisher: {
    '@type': 'Person',
    name: 'Praneel Sindhole',
    url: SITE_URL,
  },
  wordCount: postData.wordCount,
  keywords: (postData.tags || []).join(', '),
};
```

- Add a small metadata strip below the `<h1>`: date, reading time, tag chips. Use existing CSS module patterns.
- Add an author footer at the bottom: profile photo, name, two-line bio, link to `/about`.

### 2.3 Curate frontmatter for the existing 22 posts

Open each post in `/blog/posts/*.md` and add:
- `description:` — one sentence, 140–160 characters, written for SERP. Do not fabricate facts beyond what the post already says.
- `tags:` — 2–4 lowercase, hyphenated tags from this controlled vocabulary unless none fit: `aws`, `foss`, `n8n`, `iot`, `electronics`, `cybersecurity`, `linux`, `mechanical-keyboards`, `web-dev`, `student-life`, `mukti`, `gaming`, `personal`.
- `series:` and `seriesIndex:` — only for the AWS Cloud Day posts (`aws-cloud-day-one` through `aws-cloud-day-seven`). Use `series: "aws-cloud-day"` and `seriesIndex: 1..7`. Do not invent series for unrelated posts.
- Leave `cover:` empty for now — Phase 5 generates one automatically.

If a post is genuinely a placeholder (e.g., `india-foss-2025.md` just links elsewhere), still add a short description and at least one tag. Do not change the body text of any post.

### 2.4 Update the blog index card

In `pages/blog/index.js`, render each card with: title, description, date, reading time, tag chips. Use existing `home.module.css` patterns or extend `utils.module.css` if needed.

### 2.5 Verification

- `pnpm build` succeeds.
- `pnpm dev`; visit `/blog/posts/india-foss-2025/`. View source:
  - `<title>` reads `India FOSS 2025 — Praneel Sindhole`
  - Unique description matching frontmatter
  - `og:type` is `article`
  - `<script type="application/ld+json">` contains `"@type":"BlogPosting"` and the right `author.name`.
- Blog index shows description + tag chips on each card.
- Reading time renders on the post page header.

### 2.6 Commit

Commit in two steps to keep the diff reviewable:

**Commit A** (code changes):
```
blog: expand post data model and add BlogPosting structured data

- extend lib/posts.js with description, tags, cover, series, draft, reading time, word count
- add getPostsByTag, getAllTags, getPostsInSeries, getRelatedPosts helpers
- wire SEO component and BlogPosting JSON-LD into the post page
- render description, reading time, and tag chips on the blog index
- add author footer to every post page
```

**Commit B** (content frontmatter):
```
blog: add descriptions, tags, and aws-cloud-day series metadata

- curate frontmatter across 22 posts: description, tags, and series metadata
- mark aws-cloud-day-one..seven with series=aws-cloud-day and ordered seriesIndex
```

---

## Phase 3 — Reading experience

**Goal:** make posts pleasant to read so people stay (dwell time is an SEO signal) and so older posts pull their weight via internal linking.

### 3.1 Upgrade the markdown pipeline

Replace `remark-html` in `lib/posts.js` with a unified pipeline:

- `remark-parse` → `remark-gfm` (tables, strikethrough, task lists) → `remark-rehype` → `rehype-slug` → `rehype-autolink-headings` (with `behavior: 'wrap'`) → `rehype-pretty-code` (Shiki, theme `github-dark-dimmed` or pick a theme that matches the site) → `rehype-stringify`.

Install:
```
pnpm add unified remark-parse remark-gfm remark-rehype rehype-slug rehype-autolink-headings rehype-pretty-code rehype-stringify shiki
```

Pin to versions compatible with Node 18 and Next 15. Verify build.

### 3.2 Generate a table of contents

While processing, also walk the AST to collect h2/h3 headings (`{ depth, text, id }`) and store them on the post as `toc`. Render the TOC on the post page in a sticky sidebar on desktop (>900px), inline collapsed `<details>` on mobile.

### 3.3 Related posts block

At the bottom of every post page (above the author footer), render a "Related posts" section using `getRelatedPosts(post, 3)`. Cards mirror the blog-index card style. Hide if zero matches.

### 3.4 giscus comments

Add a `components/Giscus.js` client component. Mount under the related-posts block. Use these placeholder env vars (human fills in via `.env.local` and Vercel later):

```
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
```

If any of those are unset, render nothing (no broken script tag, no console error). Document the required values in Phase 9.

### 3.5 Verification

- `pnpm build` succeeds.
- Open `/blog/posts/aws-cloud-day-one/` — code blocks have syntax highlighting, headings have clickable anchor icons, TOC sidebar shows on desktop, related posts appear if tags match other posts.
- giscus block: silent if env unset; renders the script with valid props if set.

### 3.6 Commit

```
blog: upgrade markdown pipeline and add reading-experience polish

- switch to unified pipeline with remark-gfm, rehype-slug, rehype-autolink-headings, rehype-pretty-code
- generate TOC from h2/h3 and render sticky sidebar (desktop) / collapsed details (mobile)
- add related posts block based on tag overlap
- add optional giscus comments wired via NEXT_PUBLIC_GISCUS_* env vars
```

---

## Phase 4 — Tag pages, series support, blog index redesign

**Goal:** topic hubs Google can rank, and a series landing page for the AWS Cloud Day run.

### 4.1 Tag pages

Create `pages/blog/tag/[tag]/index.js`:
- `getStaticPaths` returns one path per tag from `getAllTags()`.
- `getStaticProps` returns `getPostsByTag(tag)` plus the human-readable label.
- Page renders `<h1>Posts tagged "{tag}"</h1>`, a one-line intro, the post list.
- `<SEO title={...} description={...} path={...} />` with a unique description like `"Posts by Praneel Sindhole tagged ${tag}: ${posts.length} articles."`.

### 4.2 Series landing page

Create `pages/blog/series/[series]/index.js`:
- `getStaticPaths` returns paths for each unique `series` value (currently just `aws-cloud-day`).
- Page renders an introduction, the ordered list of posts in the series, and a single hero CTA "Start with Day 1".
- For `aws-cloud-day`, write a 100–150 word intro paragraph framing why a CS student picked up AWS, what each day covers, and who the series is for. (Agent: draft this; the human can edit if not happy.)
- `<SEO />` with strong description.

### 4.3 In-post series navigator

On any post where `series` is set, render a "Part X of Y in series 'Y'" badge under the title with prev/next links inside the series, and a link to the series landing page.

### 4.4 Blog index redesign

Restructure `pages/blog/index.js` into sections:
1. **Latest** — 6 most recent posts.
2. **Series** — chip per series with cover + post count, linking to the series page.
3. **By topic** — tag cloud, each tag a chip linking to its tag page, sized by post count.
4. **All posts** — full list, descending by date.

Add a simple client-side tag filter at the top of "All posts" using `useState` only — no library.

### 4.5 Verification

- `pnpm build` produces tag pages and `series/aws-cloud-day/`.
- All links resolve. No 404s.
- View source on `/blog/tag/aws/` — unique title and description.
- View source on `/blog/series/aws-cloud-day/` — unique title and description, JSON-LD if you choose to add a `CollectionPage` schema (optional bonus).

### 4.6 Commit

```
blog: add tag pages, aws-cloud-day series hub, and restructured blog index

- generate /blog/tag/[tag]/ pages from frontmatter tags
- generate /blog/series/[series]/ pages with curated intros
- add in-post series navigator (prev/next + landing link)
- restructure blog index into Latest, Series, By topic, and All posts sections with client-side tag filter
```

---

## Phase 5 — Sitemap, robots, RSS, OG images, redirects

**Goal:** crawlers can find and prioritise everything; every shared link gets a branded preview.

### 5.1 `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://praneel.sindhole.com/sitemap.xml
```

### 5.2 Build-time `sitemap.xml`

Create `scripts/generate-sitemap.mjs`. It runs from a new `prebuild` npm script. It enumerates:
- Static pages: `/`, `/about/`, `/blog/`, `/projects/`, `/client-work/`, `/contact/`
- All blog posts: `/blog/posts/<id>/`
- All tag pages: `/blog/tag/<tag>/`
- All series pages: `/blog/series/<series>/`

For each URL, emit `<url><loc>`, `<lastmod>` (from frontmatter `updated || date` for posts; `new Date().toISOString().split('T')[0]` for static), and `<changefreq>` + `<priority>` sane defaults.

Write to `public/sitemap.xml`. Do **not** commit the generated file — add it to `.gitignore`. Build-time regeneration keeps it fresh.

Update `package.json`:
```json
"scripts": {
  "prebuild": "node scripts/generate-sitemap.mjs && node scripts/generate-rss.mjs && node scripts/generate-og.mjs",
  "build": "next build",
  "dev": "next dev",
  "start": "next start"
}
```

### 5.3 Build-time `rss.xml`

Create `scripts/generate-rss.mjs`. Standard RSS 2.0 feed of the 20 most recent posts, each with title, link, guid, pubDate, description, content:encoded (full HTML body). Author and managing-editor fields set to Praneel. Write to `public/rss.xml` (also gitignored).

Add `<link rel="alternate" type="application/rss+xml" title="Praneel Sindhole — Blog" href="/rss.xml" />` to `<Head>` via `pages/_document.js` so feed readers discover it.

### 5.4 Build-time OG image generation

Create `scripts/generate-og.mjs` using `satori` + `@resvg/resvg-js`.

Install:
```
pnpm add -D satori @resvg/resvg-js
```

Two templates:
- **Site default** → writes `public/og/default.png`. Big "Praneel Sindhole" title, a one-line tagline, brand colour stripe, profile photo circle.
- **Per-post** → for each post in `lib/posts.js`, writes `public/og/<slug>.png`. Title, date, tag chips, a small "praneel.sindhole.com" footer.

Load one or two fonts (e.g., Inter Regular + Inter Bold) by reading TTF/OTF buffers from `node_modules` or a vendored `assets/fonts/` directory. Pin font versions.

Add `public/og/` to `.gitignore`.

When the post page references `image={postData.cover || /og/${postData.id}.png}`, this auto-renders properly.

### 5.5 Apple touch icon + manifest

Create `public/apple-touch-icon.png` (180x180, generated from the profile photo — the agent can output a placeholder if image tooling isn't available; flag for the human to replace).

Create `public/site.webmanifest`:
```json
{
  "name": "Praneel Sindhole",
  "short_name": "Praneel",
  "icons": [
    { "src": "/favicon.ico", "sizes": "any" },
    { "src": "/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/"
}
```

Link both from `pages/_document.js`.

### 5.6 Verification

- `pnpm build` regenerates `public/sitemap.xml`, `public/rss.xml`, and `public/og/*.png` cleanly.
- Visit `http://localhost:3000/sitemap.xml`, `/rss.xml`, `/robots.txt` — all return correct content with correct content-type (XML / plain text).
- Spot-check 3 OG images visually — text not clipped, profile photo present, slug correct.

### 5.7 Commit

```
seo: generate sitemap, RSS, OG images, robots, and manifest

- add scripts/generate-sitemap.mjs, generate-rss.mjs, generate-og.mjs run via prebuild
- add public/robots.txt with sitemap reference
- add site.webmanifest and apple-touch-icon placeholder
- gitignore generated artefacts (sitemap.xml, rss.xml, og/*.png)
- link RSS, manifest, and apple-touch-icon from _document
```

---

## Phase 6 — Analytics: Umami events, Cloudflare Web Analytics, web vitals

**Goal:** know what visitors do, what they click, where they drop off, and what real-user Core Web Vitals look like. Wire two of the three analytics tools in this phase (Umami + Cloudflare Web Analytics). The third (Vercel Analytics) comes online in Phase 7 when the site moves to Vercel.

### 6.1 Wire Umami env vars

Document in `.env.example` (create if it doesn't exist):
```
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
NEXT_PUBLIC_UMAMI_SCRIPT_URL=
```

The Umami snippet in `pages/_document.js` already reads these — leave the existing logic intact.

### 6.2 Wire Cloudflare Web Analytics

Add to `.env.example`:
```
NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN=
```

In `pages/_document.js`, add the CF beacon alongside the existing Umami snippet, gated on the env var:

```js
const cfBeaconToken = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;

// inside <Head>:
{cfBeaconToken && (
  <script
    defer
    src="https://static.cloudflareinsights.com/beacon.min.js"
    data-cf-beacon={`{"token": "${cfBeaconToken}"}`}
  />
)}
```

If the env var is unset, nothing renders — no broken script, no console error. The human will populate the token in Phase 9 after creating the site in the Cloudflare dashboard.

Note: CF Web Analytics works whether the domain is proxied through Cloudflare or DNS-only. Since DNS will move to `cname.vercel-dns.com` (DNS-only) in Phase 7, the JS beacon path is the correct one — do not rely on Cloudflare's automatic injection (that only fires for proxied traffic).

### 6.3 Outbound link tracking

Create `components/OutboundLink.js`:

```js
import { useCallback } from 'react';

export default function OutboundLink({ href, eventName = 'outbound-click', children, ...rest }) {
  const onClick = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (window.umami?.track) {
      window.umami.track(eventName, { href });
    }
  }, [href, eventName]);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
```

Replace the raw `<a target="_blank">` chips in `pages/index.js` "Find me" section and project cards with `<OutboundLink>` so clicks fire Umami events.

### 6.4 Scroll-depth tracking on blog posts

Create `components/ScrollDepth.js` — a client component that fires Umami events at 25/50/75/100% scroll, throttled, fires each milestone at most once per page view. Mount inside `pages/blog/posts/[id].js`.

### 6.5 Theme toggle event

In `components/ThemeToggle.js`, when the user flips themes, fire `umami.track('theme-toggle', { to: nextTheme })`.

### 6.6 Web Vitals → Umami

Install `web-vitals`:
```
pnpm add web-vitals
```

Add a `reportWebVitals` function in `pages/_app.js`:
```js
export function reportWebVitals(metric) {
  if (typeof window === 'undefined') return;
  if (!window.umami?.track) return;
  window.umami.track('web-vitals', {
    name: metric.name,
    value: Math.round(metric.value),
    id: metric.id,
  });
}
```

### 6.7 Verification

- `pnpm build` succeeds.
- `pnpm dev`. Open DevTools Network tab. Set `NEXT_PUBLIC_UMAMI_*` and `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` to test values in `.env.local`. Confirm:
  - Umami script loads.
  - CF Web Analytics beacon (`beacon.min.js`) loads.
  - Click a "Find me" chip → outbound-click event fires to Umami.
  - Scroll a long blog post → scroll-depth events fire at milestones.
  - Toggle theme → theme-toggle event fires.
- If env vars are unset, **nothing breaks** — `window.umami` is just undefined, CF beacon tag doesn't render, all event calls are no-ops.

### 6.8 Commit

```
analytics: wire umami events, cloudflare web analytics, and web-vitals

- add cloudflare web analytics beacon gated on NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN
- new OutboundLink component fires umami.track on outbound clicks
- replace raw outbound anchors on home page with OutboundLink
- add ScrollDepth component reporting 25/50/75/100% milestones on blog posts
- track theme-toggle and web-vitals (LCP/INP/CLS) as umami events
- document NEXT_PUBLIC_UMAMI_* and NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN in .env.example
```

---

## Phase 7 — Vercel Analytics + Speed Insights + DEPLOY.md

**Goal:** wire the third analytics tool (Vercel-native) and document the deployment + DNS flip the human still has to do.

The CF Pages config was already stripped in Phase 1 — there is no code-side migration left.

### 7.1 Install and wire Vercel Analytics + Speed Insights

```
pnpm add @vercel/analytics @vercel/speed-insights
```

In `pages/_app.js`:
```js
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
```

Both packages are no-ops until the project is deployed on Vercel — safe to commit before the DNS flip.

### 7.2 Author `DEPLOY.md`

New file at the repo root summarising the human's deployment steps. The Phase -1 pre-work already created the Vercel project; this doc covers the cutover.

Contents:
- "Production domain" section: paste `praneel.sindhole.com` into Vercel project → Settings → Domains. Vercel prints a CNAME target (`cname.vercel-dns.com`).
- "DNS cutover" section: in Cloudflare DNS for `sindhole.com`, edit the `praneel` CNAME record to point at `cname.vercel-dns.com`. Set proxy status to **DNS only** (grey cloud). Save. SSL/TLS provisioning takes a couple minutes.
- "Environment variables" section: list all five (`NEXT_PUBLIC_UMAMI_WEBSITE_ID`, `NEXT_PUBLIC_UMAMI_SCRIPT_URL`, `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN`, `NEXT_PUBLIC_GISCUS_REPO`, `NEXT_PUBLIC_GISCUS_REPO_ID`, `NEXT_PUBLIC_GISCUS_CATEGORY`, `NEXT_PUBLIC_GISCUS_CATEGORY_ID`) — paste the values gathered in Phase -1 into Vercel project → Settings → Environment Variables → Production + Preview.
- "Verify" section: visit production URL, view-source, confirm `<title>` is right, confirm Umami beacon and CF beacon scripts present, click around.
- "Post-cutover" section: tear down the old Cloudflare Pages project once production has been stable on Vercel for 48 hours.

### 7.3 Verification (local)

- `pnpm build` succeeds.
- `pnpm start` serves at `localhost:3000`. Click around — everything works.
- `/posts/india-foss-2025/` redirects (302 dev, 301 prod) to `/blog/posts/india-foss-2025/`.

### 7.4 Commit

```
analytics: add vercel analytics and speed insights, document deployment

- add @vercel/analytics and @vercel/speed-insights wrappers in _app
- add DEPLOY.md covering domain config, DNS cutover, env vars, and CF Pages teardown
```

---

## Phase 8 — Post-migration polish (optional, time-permitting)

Only do these once Phase 7 is live and stable.

### 8.1 Dynamic OG image route

With Vercel, you can replace build-time OG generation with a runtime `pages/api/og.js` using `@vercel/og`. Means new posts don't require a rebuild to get an OG image. Lower priority since build-time already works.

### 8.2 ISR for blog index

`getStaticProps` with `revalidate: 3600` on the blog index, tag pages, and series pages. Means new posts surface within an hour without a full rebuild.

### 8.3 Performance pass

- Drop the per-second countdown re-render from `components/layout.js`. Default `showCountdownFooter={false}`; mount the live countdown only on `pages/countdown.js`.
- Move from system fonts to `next/font/google` (Inter or similar) for consistent rendering and zero CLS from font swap.
- Audit images: every `<Image>` has explicit `width`/`height`; below-the-fold images have `loading="lazy"` (default) and no `priority`.
- Lighthouse CI run on production — target 95+ across all four categories.

### 8.4 Commit

One commit per item, named per the conventions in section 5.

---

## Phase 9 — Human-only checklist (post-deployment)

After the agent finishes Phases 0–7 (and optionally 8) and the human pushes to remote, complete these. Phase -1 already covered the up-front credential gathering — this phase is about the cutover and post-cutover work.

1. **Push commits** to remote.
2. **Vercel:** confirm preview deploy is green. Add `praneel.sindhole.com` in project Settings → Domains. Paste all six env vars from Phase -1 into Settings → Environment Variables for Production + Preview.
3. **DNS cutover (Cloudflare):** in Cloudflare DNS for `sindhole.com`, edit the `praneel` CNAME to point at `cname.vercel-dns.com`. Set proxy status to **DNS only** (grey cloud) so Vercel handles TLS. Save. Wait ~5 minutes for SSL.
4. **Confirm live.** `curl -I https://praneel.sindhole.com/` → expect 200 from Vercel. View-source on a blog post → expect Umami snippet, CF beacon, and Vercel Analytics script all present.
5. **Old domain `praneel.tech`:** before it expires, set up a 301 redirect to `https://praneel.sindhole.com` covering all paths. If `praneel.tech` is on Cloudflare, the simplest path is a Cloudflare Page Rule or Bulk Redirect ("forwarding URL", 301, "preserve query string", `https://praneel.sindhole.com/$1`). If you let `praneel.tech` lapse without a redirect, you lose any inbound link equity it had.
6. **Tear down Cloudflare Pages project.** Once production has been stable on Vercel for 48 hours, delete the CF Pages project so it doesn't waste your CF dashboard.
7. **Google Search Console:** add `https://praneel.sindhole.com` as a property. Verify via DNS TXT record. Submit `https://praneel.sindhole.com/sitemap.xml`. Also add `sindhole.com` as a Domain property so both subdomains are covered. If you still have `praneel.tech` registered, add that too and submit a "Change of Address" pointing to `praneel.sindhole.com` once the 301 redirect is in place — this preserves whatever link equity Google has accumulated.
8. **Bing Webmaster Tools:** same as above. Bing has a "Import sites from GSC" button — fast path.
9. **Profile back-linking:** edit every profile listed in section 2 so its "website" field points to `https://praneel.sindhole.com`. This is what makes the JSON-LD `sameAs` reciprocal and tells Google to consolidate the entity.
10. **GitHub profile README** at `github.com/Praneel7015` → link prominently to the new domain.
11. **MUKTI site** → add a "Led by Praneel Sindhole — praneel.sindhole.com" credit on its about page.
12. **Cross-post a top blog post** (suggest: `aws-cloud-day-one`) to dev.to with `canonical_url: https://praneel.sindhole.com/blog/posts/aws-cloud-day-one/`. Free backlink, no duplicate-content penalty.
13. **Lighthouse run** on production. Target 95+ across all four categories. If not hit, file follow-ups against Phase 8.3.
14. **Rich-results test** on the home page and one blog post: https://search.google.com/test/rich-results — confirm Person and BlogPosting are picked up cleanly.

---

## Appendix A — File map for the agent

What you should expect to create or touch.

**New files:**
- `lib/seo.js`
- `components/SEO.js`
- `components/OutboundLink.js`
- `components/ScrollDepth.js`
- `components/Giscus.js`
- `pages/blog/tag/[tag]/index.js`
- `pages/blog/series/[series]/index.js`
- `scripts/generate-sitemap.mjs`
- `scripts/generate-rss.mjs`
- `scripts/generate-og.mjs`
- `public/robots.txt`
- `public/site.webmanifest`
- `public/apple-touch-icon.png` (placeholder, human to replace)
- `.env.example`
- `DEPLOY.md`

**Deleted files:**
- `pages/api/hello.js` (Phase 1 — stub, never used)

**Modified files:**
- `pages/_document.js` — `lang="en"`, theme-color, manifest link, apple-touch-icon link, RSS link
- `pages/_app.js` — Vercel Analytics + SpeedInsights (Phase 7), `reportWebVitals`
- `pages/index.js` — `<SEO />` with Person+WebSite JSON-LD, OutboundLink chips
- `pages/about.js` — `<SEO />`, promote h2→h1
- `pages/blog/index.js` — `<SEO />`, redesigned sections, tag filter
- `pages/blog/posts/[id].js` — `<SEO />` with BlogPosting JSON-LD, TOC, related posts, author footer, giscus, scroll depth
- `pages/projects/index.js` — `<SEO />`, promote h2→h1
- `pages/client-work/index.js` — `<SEO />`, promote h2→h1
- `pages/contact.js` — `<SEO />`
- `pages/cal.js`, `pages/chatbot.js`, `pages/countdown.js`, `pages/404.js` — `<SEO noindex />`
- `components/layout.js` — strip global Head, fix heading hierarchy, default countdown to off
- `components/ThemeToggle.js` — fire umami event on toggle
- `lib/posts.js` — full pipeline rewrite (Phase 3) and data-model expansion (Phase 2)
- `next.config.js` — Phase 7 cleanup
- `package.json` — `prebuild` script, new deps
- `.gitignore` — add `public/sitemap.xml`, `public/rss.xml`, `public/og/`
- All `blog/posts/*.md` — frontmatter expansion (Phase 2.3)

---

## Appendix B — Required env vars summary

| Var | Where | Why |
|---|---|---|
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | `.env.local`, Vercel | Umami site id for praneel.sindhole.com (human creates in existing Umami dashboard) |
| `NEXT_PUBLIC_UMAMI_SCRIPT_URL` | `.env.local`, Vercel | Script URL of the existing Umami instance |
| `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` | `.env.local`, Vercel | Token from Cloudflare Web Analytics → Manual setup |
| `NEXT_PUBLIC_GISCUS_REPO` | `.env.local`, Vercel | `Praneel7015/blog-comments` |
| `NEXT_PUBLIC_GISCUS_REPO_ID` | `.env.local`, Vercel | From giscus.app form |
| `NEXT_PUBLIC_GISCUS_CATEGORY` | `.env.local`, Vercel | `Blog Comments` |
| `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | `.env.local`, Vercel | From giscus.app form |

All others (Vercel Analytics, Speed Insights, web-vitals, search-console verification) don't need env vars.

---

## Appendix C — Things explicitly out of scope

So the agent doesn't expand scope:

- No design redesign. Existing CSS modules stay; only minor additions where new sections need styling.
- No App Router migration.
- No TypeScript migration.
- No Tailwind / shadcn / any UI lib.
- No database, no CMS — markdown files remain the source.
- No i18n.
- No newsletter (`Buttondown` / `ConvertKit`) yet.
- No dark-mode redesign — toggle stays as-is.
- No paid analytics tools.
- No image-CDN integration (Cloudflare Images / Cloudinary).

Keep this list in mind when tempted to "while we're here".

---

## Appendix D — Verification cheatsheet

After the full run, the human or agent should verify:

- [ ] `pnpm build` clean
- [ ] `pnpm start` serves and pages render
- [ ] `view-source:/` has unique title, description, canonical, Person JSON-LD
- [ ] `view-source:/blog/posts/<any>/` has unique title, description, canonical, BlogPosting JSON-LD, article meta
- [ ] `/sitemap.xml`, `/rss.xml`, `/robots.txt` resolve with correct content-type
- [ ] OG images exist at `/og/default.png` and `/og/<slug>.png`
- [ ] Pasting a post URL into LinkedIn/Twitter compose box shows the right preview
- [ ] Lighthouse production: ≥95 in all four categories
- [ ] Search Console: sitemap submitted, no critical errors
- [ ] Rich Results Test: Person and BlogPosting both validate
- [ ] Umami dashboard receives a pageview, an outbound click, a scroll-depth event
- [ ] Cloudflare Web Analytics dashboard shows pageview within 5 minutes of first prod visit
- [ ] Vercel Analytics + Speed Insights tabs show data in the Vercel project dashboard

---

## Appendix E — Quick decisions if you hit ambiguity

If something is ambiguous mid-phase and the human isn't around, prefer:

- Static / build-time over runtime.
- Existing dependency over a new one.
- Boring, well-trodden patterns over clever ones.
- One small commit per logical change over a giant commit.
- Skipping a sub-task and reporting it over guessing at intent.

---

End of brief. Start with Phase 0.
