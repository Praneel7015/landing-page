import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const SITE_URL = 'https://praneel.sindhole.com';
const projectRoot = process.cwd();
const postsDir = path.join(projectRoot, 'blog', 'posts');
const publicDir = path.join(projectRoot, 'public');

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about/', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/', priority: '0.9', changefreq: 'weekly' },
  { path: '/projects/', priority: '0.7', changefreq: 'monthly' },
  { path: '/client-work/', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact/', priority: '0.6', changefreq: 'yearly' },
];

const NOINDEX_ROUTES = new Set(['/cal/', '/chatbot/', '/countdown/', '/404/']);

function listPosts() {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  return files
    .map((file) => {
      const id = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
      const parsed = matter(raw);
      const d = parsed.data;
      if (d.draft) return null;
      const date = typeof d.date === 'string' ? d.date : '';
      if (!date) return null;
      return {
        id,
        date,
        updated: d.updated || date,
        tags: Array.isArray(d.tags) ? d.tags : [],
        series: d.series || null,
      };
    })
    .filter(Boolean);
}

function urlEntry(loc, lastmod, changefreq, priority) {
  return [
    '  <url>',
    `    <loc>${SITE_URL}${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod.slice(0, 10)}</lastmod>` : null,
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
    priority ? `    <priority>${priority}</priority>` : null,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n');
}

function main() {
  const posts = listPosts();
  const now = new Date().toISOString().slice(0, 10);

  const tags = new Set();
  const series = new Set();
  for (const post of posts) {
    for (const tag of post.tags) tags.add(tag);
    if (post.series) series.add(post.series);
  }

  const entries = [];

  for (const route of STATIC_ROUTES) {
    if (NOINDEX_ROUTES.has(route.path)) continue;
    entries.push(urlEntry(route.path, now, route.changefreq, route.priority));
  }

  for (const post of posts) {
    entries.push(urlEntry(`/blog/posts/${post.id}/`, post.updated, 'monthly', '0.8'));
  }

  for (const tag of tags) {
    entries.push(urlEntry(`/blog/tag/${tag}/`, now, 'weekly', '0.6'));
  }

  for (const s of series) {
    entries.push(urlEntry(`/blog/series/${s}/`, now, 'monthly', '0.7'));
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries.join('\n'),
    '</urlset>',
    '',
  ].join('\n');

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
  console.log(`[sitemap] wrote public/sitemap.xml (${entries.length} URLs)`);
}

main();
