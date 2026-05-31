import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { toString as hastToString } from 'hast-util-to-string';

const postsDirectory = path.join(process.cwd(), 'blog', 'posts');
const isProduction = process.env.NODE_ENV === 'production';

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

function countWords(body) {
  const text = stripMarkdown(body);
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

function collectToc() {
  return (tree, file) => {
    const toc = [];
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'h2' && node.tagName !== 'h3') return;
      const id = node.properties?.id;
      if (!id) return;
      toc.push({
        depth: node.tagName === 'h2' ? 2 : 3,
        id,
        text: hastToString(node),
      });
    });
    file.data.toc = toc;
  };
}

function readPostMeta(fileName) {
  const id = fileName.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const data = matterResult.data;
  const body = matterResult.content;
  const wordCount = countWords(body);
  const readingTime = Math.max(1, Math.round(wordCount / 200));
  const description = data.description || deriveDescription(body);
  const excerpt = data.excerpt || description;
  return {
    id,
    title: data.title || id,
    date: data.date || '',
    updated: data.updated || null,
    description,
    excerpt,
    tags: Array.isArray(data.tags) ? data.tags : [],
    cover: data.cover || null,
    series: data.series || null,
    seriesIndex: typeof data.seriesIndex === 'number' ? data.seriesIndex : null,
    draft: Boolean(data.draft),
    wordCount,
    readingTime,
  };
}

function listAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory).filter((n) => n.endsWith('.md'));
  return fileNames
    .map(readPostMeta)
    .filter((p) => typeof p.date === 'string' && p.date.length > 0)
    .filter((p) => !(isProduction && p.draft));
}

function sortByDateDesc(posts) {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getSortedPostsData() {
  return sortByDateDesc(listAllPosts());
}

export function getAllPostIds() {
  return listAllPosts().map((p) => ({ params: { id: p.id } }));
}

async function processMarkdown(body) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: { className: ['heading-anchor'], 'aria-label': 'Anchor' },
      content: { type: 'text', value: '#' },
    })
    .use(rehypePrettyCode, {
      theme: { dark: 'github-dark-dimmed', light: 'github-light' },
      keepBackground: true,
    })
    .use(collectToc)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(body);
  return { html: String(file), toc: file.data.toc || [] };
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const body = matterResult.content;

  const { html, toc } = await processMarkdown(body);

  const wordCount = countWords(body);
  const readingTime = Math.max(1, Math.round(wordCount / 200));
  const data = matterResult.data;
  const description = data.description || deriveDescription(body);

  return {
    id,
    contentHtml: html,
    toc,
    title: data.title || id,
    date: data.date || '',
    updated: data.updated || null,
    description,
    excerpt: data.excerpt || description,
    tags: Array.isArray(data.tags) ? data.tags : [],
    cover: data.cover || null,
    series: data.series || null,
    seriesIndex: typeof data.seriesIndex === 'number' ? data.seriesIndex : null,
    draft: Boolean(data.draft),
    wordCount,
    readingTime,
  };
}

export function getPostsByTag(tag) {
  return sortByDateDesc(listAllPosts().filter((p) => p.tags.includes(tag)));
}

export function getAllTags() {
  const counts = new Map();
  for (const post of listAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsInSeries(series) {
  return listAllPosts()
    .filter((p) => p.series === series)
    .sort((a, b) => {
      const ai = a.seriesIndex ?? Number.MAX_SAFE_INTEGER;
      const bi = b.seriesIndex ?? Number.MAX_SAFE_INTEGER;
      if (ai !== bi) return ai - bi;
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });
}

export function getAllSeries() {
  const counts = new Map();
  for (const post of listAllPosts()) {
    if (!post.series) continue;
    counts.set(post.series, (counts.get(post.series) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([series, count]) => ({ series, count }))
    .sort((a, b) => b.count - a.count || a.series.localeCompare(b.series));
}

export function getRelatedPosts(post, limit = 3) {
  if (!post || !Array.isArray(post.tags) || post.tags.length === 0) return [];
  const others = listAllPosts().filter((p) => p.id !== post.id);
  const scored = others
    .map((p) => {
      const overlap = p.tags.filter((t) => post.tags.includes(t)).length;
      return { post: p, overlap };
    })
    .filter((s) => s.overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return a.post.date < b.post.date ? 1 : a.post.date > b.post.date ? -1 : 0;
    });
  return scored.slice(0, limit).map((s) => s.post);
}
