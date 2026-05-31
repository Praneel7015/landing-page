import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const SITE_URL = 'https://praneel.sindhole.com';
const FEED_TITLE = 'Praneel Sindhole — Blog';
const FEED_DESCRIPTION =
  "Posts on FOSS, AWS, n8n automation, IoT, cybersecurity, and what I'm building.";
const AUTHOR = 'Praneel Sindhole';

const projectRoot = process.cwd();
const postsDir = path.join(projectRoot, 'blog', 'posts');
const publicDir = path.join(projectRoot, 'public');

function stripMarkdown(md) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~>]+/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function deriveDescription(body, max = 155) {
  const firstPara = body.split(/\n\s*\n/).find((p) => p.trim().length > 0) || '';
  const text = stripMarkdown(firstPara);
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  const safe = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${safe.trimEnd()}…`;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function rfc822(date) {
  return new Date(`${date}T12:00:00Z`).toUTCString();
}

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
        title: d.title || id,
        date,
        description: d.description || deriveDescription(parsed.content),
        tags: Array.isArray(d.tags) ? d.tags : [],
      };
    })
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .slice(0, 20);
}

function main() {
  const posts = listPosts();
  const now = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/blog/posts/${post.id}/`;
      const categories = post.tags
        .map((t) => `      <category>${escapeXml(t)}</category>`)
        .join('\n');
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${rfc822(post.date)}</pubDate>`,
        `      <description>${escapeXml(post.description)}</description>`,
        `      <author>noreply@praneel.sindhole.com (${AUTHOR})</author>`,
        categories || null,
        '    </item>',
      ]
        .filter((line) => line !== null)
        .join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(FEED_TITLE)}</title>`,
    `    <link>${SITE_URL}/</link>`,
    `    <description>${escapeXml(FEED_DESCRIPTION)}</description>`,
    '    <language>en</language>',
    `    <lastBuildDate>${now}</lastBuildDate>`,
    `    <managingEditor>noreply@praneel.sindhole.com (${AUTHOR})</managingEditor>`,
    `    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');

  fs.writeFileSync(path.join(publicDir, 'rss.xml'), xml, 'utf8');
  console.log(`[rss] wrote public/rss.xml (${posts.length} items)`);
}

main();
