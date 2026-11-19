import fs from 'node:fs';
import path from 'node:path';
import { JOURNAL_POSTS as STATIC_JOURNAL_POSTS, PROJECTS as STATIC_PROJECTS } from '../src/constants.js';
import { JournalPost, Project } from '../src/types.js';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SITE_URL = (process.env.VITE_SITE_URL || 'https://maxcnfront.vercel.app').replace(/\/+$/, '');
const SITE_NAME = 'CONSTRUCT';
const ADSENSE_PUBLISHER_ID = process.env.VITE_ADSENSE_PUBLISHER_ID || 'ca-pub-4318712038607459';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200';
const sourceHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
const stylesheets = sourceHtml.match(/<link[^>]+rel="stylesheet"[^>]*>/g)?.join('\n') || '';
const appScript = sourceHtml.match(/<script[^>]+type="module"[^>]+src="[^"]+"[^>]*><\/script>/g)?.join('\n') || '';

interface FirestoreValue {
  stringValue?: string;
  booleanValue?: boolean;
  integerValue?: string;
  doubleValue?: number;
  timestampValue?: string;
  arrayValue?: { values?: FirestoreValue[] };
  mapValue?: { fields?: Record<string, FirestoreValue> };
  nullValue?: null;
}

interface FirestoreDocument {
  name: string;
  fields: Record<string, FirestoreValue>;
}

interface FirestoreRead<T> {
  records: T[];
  succeeded: boolean;
}

function decodeFirestoreValue(value: FirestoreValue): unknown {
  if ('stringValue' in value) return value.stringValue;
  if ('booleanValue' in value) return value.booleanValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return value.doubleValue;
  if ('timestampValue' in value) return value.timestampValue;
  if ('arrayValue' in value) return (value.arrayValue?.values || []).map(decodeFirestoreValue);
  if ('mapValue' in value) return Object.fromEntries(
    Object.entries(value.mapValue?.fields || {}).map(([key, item]) => [key, decodeFirestoreValue(item)]),
  );
  if ('nullValue' in value) return null;
  return undefined;
}

async function fetchPublishedRecords<T>(
  collectionId: string,
  isRecord: (record: unknown) => record is T,
): Promise<FirestoreRead<T>> {
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
  const apiKey = process.env.VITE_FIREBASE_API_KEY;
  if (!projectId || !apiKey) return { records: [], succeeded: false };

  const endpoint = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents:runQuery?key=${encodeURIComponent(apiKey)}`;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId }],
          where: {
            fieldFilter: {
              field: { fieldPath: 'published' },
              op: 'EQUAL',
              value: { booleanValue: true },
            },
          },
          limit: 500,
        },
      }),
    });
    if (!response.ok) {
      console.error(`[SEO] Firestore prerender read for ${collectionId} returned HTTP ${response.status}; using checked-in content.`);
      return { records: [], succeeded: false };
    }

    const rows = await response.json() as Array<{ document?: FirestoreDocument }>;
    const records = rows.flatMap(({ document }) => {
      if (!document) return [];
      const fields = Object.fromEntries(
        Object.entries(document.fields).map(([key, value]) => [key, decodeFirestoreValue(value)]),
      );
      const record = {
        ...fields,
        id: document.name.split('/').pop() || '',
      };
      return isRecord(record) ? [record] : [];
    });
    return { records, succeeded: true };
  } catch {
    console.error(`[SEO] Firestore prerender read for ${collectionId} failed; using checked-in content.`);
    return { records: [], succeeded: false };
  }
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

const isProject = (value: unknown): value is Project => {
  if (!isObjectRecord(value)) return false;
  const record = value;
  return (
  typeof record.id === 'string' &&
  typeof record.title === 'string' &&
  typeof record.location === 'string' &&
  typeof record.cost === 'string' &&
  typeof record.year === 'string' &&
  typeof record.category === 'string' &&
  typeof record.description === 'string' &&
  Array.isArray(record.images) &&
  record.images.length > 0 &&
  record.images.every((image) => typeof image === 'string')
  );
};

const isJournalPost = (value: unknown): value is JournalPost => {
  if (!isObjectRecord(value)) return false;
  const record = value;
  return (
  typeof record.id === 'string' &&
  typeof record.title === 'string' &&
  typeof record.category === 'string' &&
  typeof record.excerpt === 'string' &&
  typeof record.date === 'string' &&
  typeof record.author === 'string' &&
  typeof record.image === 'string' &&
  typeof record.readTime === 'string' &&
  Array.isArray(record.sections) &&
  record.sections.every((section) =>
    typeof section === 'object' &&
    section !== null &&
    'title' in section &&
    typeof section.title === 'string' &&
    'content' in section &&
    typeof section.content === 'string')
  );
};

const [projectRead, articleRead] = await Promise.all([
  fetchPublishedRecords('projects', isProject),
  fetchPublishedRecords('journal', isJournalPost),
]);
const projectRecords = new Map((projectRead.succeeded ? [] : STATIC_PROJECTS).map((project) => [project.id, project]));
projectRead.records.forEach((project) => projectRecords.set(project.id, project));
const articleRecords = new Map((articleRead.succeeded ? [] : STATIC_JOURNAL_POSTS).map((post) => [post.id, post]));
articleRead.records.forEach((post) => articleRecords.set(post.id, post));
const projects = Array.from(projectRecords.values());
const journalPosts = Array.from(articleRecords.values());

interface Page {
  path: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  article?: JournalPost;
}

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const absoluteUrl = (route: string) => `${SITE_URL}${route === '/' ? '/' : route}`;

function responsiveImageAttributes(url: string): string {
  if (!url.includes('images.unsplash.com')) return '';
  const baseUrl = url.split('?')[0];
  const srcSet = [480, 800, 1200, 1600]
    .map((width) => `${baseUrl}?auto=format&fit=crop&q=80&w=${width} ${width}w`)
    .join(', ');
  return `srcset="${escapeHtml(srcSet)}" sizes="(max-width: 768px) 100vw, 80vw"`;
}

function renderProject(project: Project): string {
  const sections = (project.sections || []).map((section) => `
    <section>
      <h2>${escapeHtml(section.title)}</h2>
      ${section.subtitle ? `<h3>${escapeHtml(section.subtitle)}</h3>` : ''}
      ${section.description ? `<p>${escapeHtml(section.description)}</p>` : ''}
      ${(section.images || []).map((image) => `<img src="${escapeHtml(image)}" ${responsiveImageAttributes(image)} alt="${escapeHtml(`${project.title}: ${section.title}`)}" width="1600" height="900" loading="lazy" decoding="async">`).join('\n')}
    </section>`).join('\n');

  return `<main>
    <nav aria-label="Breadcrumb"><a href="/projects">Projects</a> / ${escapeHtml(project.title)}</nav>
    <article>
      <header><h1>${escapeHtml(project.title)}</h1><p>${escapeHtml(project.location)} · ${escapeHtml(project.category)} · ${escapeHtml(project.year)}</p></header>
      <p>${escapeHtml(project.description)}</p>
      ${project.images[0] ? `<img src="${escapeHtml(project.images[0])}" ${responsiveImageAttributes(project.images[0])} alt="${escapeHtml(project.title)}" width="1600" height="900" fetchpriority="high" decoding="async">` : ''}
      ${sections}
      ${project.conclusion || project.outcome ? `<section><h2>Outcome</h2><p>${escapeHtml(project.conclusion || project.outcome || '')}</p></section>` : ''}
    </article>
  </main>`;
}

function renderJournalPost(post: JournalPost): string {
  return `<main>
    <nav aria-label="Breadcrumb"><a href="/journal">Journal</a> / ${escapeHtml(post.title)}</nav>
    <article>
      <header><p>${escapeHtml(post.category)} · ${escapeHtml(post.date)} · ${escapeHtml(post.readTime)}</p><h1>${escapeHtml(post.title)}</h1><p>${escapeHtml(post.excerpt)}</p><p>By ${escapeHtml(post.author)}</p></header>
      <img src="${escapeHtml(post.image)}" ${responsiveImageAttributes(post.image)} alt="${escapeHtml(post.title)}" width="1600" height="900" fetchpriority="high" decoding="async">
      ${(post.sections || []).map((section) => `<section><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.content)}</p>${section.image ? `<img src="${escapeHtml(section.image)}" ${responsiveImageAttributes(section.image)} alt="${escapeHtml(section.title)}" width="1200" height="675" loading="lazy" decoding="async">` : ''}</section>`).join('\n')}
      ${post.conclusion ? `<section><h2>Conclusion</h2><p>${escapeHtml(post.conclusion)}</p></section>` : ''}
    </article>
  </main>`;
}

const pages: Page[] = [
  {
    path: '/',
    title: 'Structural Engineering & Architectural Design',
    description: 'CONSTRUCT is a multidisciplinary engineering and architectural practice specializing in commercial buildings, seismic resilience, foundations, and sustainable infrastructure.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
    content: `<main><article><h1>Structural Engineering &amp; Architectural Design</h1><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&amp;fit=crop&amp;q=80&amp;w=1200" ${responsiveImageAttributes('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab')} alt="Modern infrastructure" width="1600" height="900" fetchpriority="high" decoding="async"><p>CONSTRUCT is a multidisciplinary engineering and architectural practice specializing in high-performance commercial buildings, seismic resilience, geotechnical foundations, and sustainable infrastructure.</p><h2>Featured Projects</h2><ul>${projects.slice(0, 5).map((project) => `<li><a href="/projects/${encodeURIComponent(project.id)}">${escapeHtml(project.title)}</a> — ${escapeHtml(project.description)}</li>`).join('')}</ul><p><a href="/projects">Browse all projects</a> · <a href="/journal">Read the engineering journal</a></p></article></main>`,
  },
  { path: '/projects', title: 'Infrastructure & Architectural Projects Portfolio', description: 'Explore CONSTRUCT completed commercial towers, technology campuses, deep foundations, and industrial facilities.', content: `<main><h1>Landmark Projects</h1><p>Explore engineering projects, locations, categories, and technical case studies.</p><div>${projects.map((project) => `<article><h2><a href="/projects/${encodeURIComponent(project.id)}">${escapeHtml(project.title)}</a></h2><p>${escapeHtml(project.location)} · ${escapeHtml(project.category)}</p><p>${escapeHtml(project.description)}</p></article>`).join('')}</div></main>` },
  { path: '/journal', title: 'Engineering Journal & Architectural Research', description: 'Engineering articles covering materials, seismic engineering, digital twins, and responsive building systems.', content: `<main><h1>Engineering Journal</h1><p>Research and case studies from the CONSTRUCT engineering journal.</p><div>${journalPosts.map((post) => `<article><h2><a href="/journal/${encodeURIComponent(post.id)}">${escapeHtml(post.title)}</a></h2><p>${escapeHtml(post.category)} · ${escapeHtml(post.date)} · ${escapeHtml(post.readTime)}</p><p>${escapeHtml(post.excerpt)}</p></article>`).join('')}</div></main>` },
  { path: '/about', title: 'About CONSTRUCT', description: 'Learn about the CONSTRUCT engineering and architectural practice, its services, and approach to resilient infrastructure.', content: '<main><h1>About CONSTRUCT</h1><p>CONSTRUCT is an engineering and architectural practice working across structural design, infrastructure, and the built environment.</p><p>Our work brings together technical analysis, design collaboration, and project delivery.</p></main>' },
  { path: '/services', title: 'Engineering Services', description: 'Structural engineering, architectural design, geotechnical consultation, and infrastructure project services from CONSTRUCT.', content: '<main><h1>Engineering Services</h1><p>CONSTRUCT provides structural engineering, architectural design, infrastructure, and engineering consulting services.</p><p><a href="/contact">Contact our team about a project</a>.</p></main>' },
  { path: '/contact', title: 'Contact CONSTRUCT', description: 'Contact CONSTRUCT about architectural design, structural engineering review, or infrastructure inquiries.', content: '<main><h1>Contact CONSTRUCT</h1><p>Contact our engineering team to discuss your project scope, design, or structural review requirements.</p><p>Email: <a href="mailto:projects@construct.com">projects@construct.com</a> · Phone: +91 98765 43210</p></main>' },
  { path: '/privacy-policy', title: 'Privacy Policy', description: 'Privacy and data handling information for the CONSTRUCT website, including advertising and user privacy choices.', content: '<main><article><h1>Privacy Policy</h1><p>This policy explains how CONSTRUCT handles information submitted through contact forms and information used to operate this website.</p><h2>Advertising and consent</h2><p>Where configured, Google Funding Choices provides the consent flow for advertising. You can reopen consent preferences from the site footer. Advertising remains disabled until the configured CMP exposes a valid consent signal.</p><h2>Contact</h2><p>For privacy requests, contact <a href="mailto:projects@construct.com">projects@construct.com</a>.</p></article></main>' },
  { path: '/terms-of-service', title: 'Terms of Service', description: 'Terms governing access to and use of the CONSTRUCT website and its content.', content: '<main><article><h1>Terms of Service</h1><p>Use of this website is subject to applicable law. Website content is provided for general informational purposes and is not a substitute for project-specific professional engineering advice.</p><p>Contact <a href="/contact">CONSTRUCT</a> for project-specific questions.</p></article></main>' },
  { path: '/login', title: 'Vault Access', description: 'Restricted CONSTRUCT administrator sign-in.', content: '<main><h1>Restricted Access</h1><p>Administrator authentication is required to access the control dashboard.</p></main>', noindex: true },
  { path: '/admin', title: 'Control Tower', description: 'Restricted CONSTRUCT administrator dashboard.', content: '<main><h1>Control Tower</h1><p>This administrative area requires authentication.</p></main>', noindex: true },
];

pages.push(...projects.map((project) => ({
  path: `/projects/${project.id}`,
  title: `${project.title} | ${project.location}`,
  description: project.description,
  content: renderProject(project),
  image: project.images[0],
})));

pages.push(...journalPosts.map((post) => ({
  path: `/journal/${post.id}`,
  title: post.title,
  description: post.excerpt,
  content: renderJournalPost(post),
  image: post.image,
  type: 'article' as const,
  article: post,
})));

function renderPage(page: Page): string {
  const canonical = absoluteUrl(page.path);
  const title = page.title.includes(SITE_NAME) ? page.title : `${page.title} | ${SITE_NAME}`;
  const image = page.image || DEFAULT_IMAGE;
  const robots = page.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
  const articleSchema = page.article ? [{
    '@type': 'Article',
    headline: page.article.title,
    description: page.article.excerpt,
    image: [page.article.image],
    datePublished: page.article.date,
    author: { '@type': 'Person', name: page.article.author },
    mainEntityOfPage: canonical,
    publisher: { '@id': `${SITE_URL}/#organization` },
  }] : [];
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL },
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: SITE_NAME, url: SITE_URL, publisher: { '@id': `${SITE_URL}/#organization` } },
      ...articleSchema,
    ],
  }).replace(/</g, '\\u003c');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}">
    <meta name="robots" content="${robots}">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <meta name="google-adsense-account" content="${escapeHtml(ADSENSE_PUBLISHER_ID)}">
    <meta property="og:type" content="${page.type || 'website'}">
    <meta property="og:url" content="${escapeHtml(canonical)}">
    <meta property="og:site_name" content="${SITE_NAME}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(page.description)}">
    <meta property="og:image" content="${escapeHtml(image)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(page.description)}">
    <meta name="twitter:image" content="${escapeHtml(image)}">
    <link rel="icon" type="image/png" href="/favicon.png">
    ${page.path === '/' ? `<link rel="preload" as="image" href="${escapeHtml(image)}" ${responsiveImageAttributes(image)} fetchpriority="high">` : ''}
    ${stylesheets}
    <script id="seo-dynamic-jsonld" type="application/ld+json">${schema}</script>
  </head>
  <body>
    <div id="root">
      <header><nav aria-label="Main navigation"><a href="/">CONSTRUCT</a><a href="/projects">Projects</a><a href="/services">Services</a><a href="/about">About</a><a href="/journal">Journal</a><a href="/contact">Contact</a></nav></header>
      ${page.content}
      <footer><nav aria-label="Legal"><a href="/privacy-policy">Privacy Policy</a><a href="/terms-of-service">Terms of Service</a><a href="/contact">Contact</a></nav></footer>
    </div>
    ${appScript}
  </body>
</html>`;
}

for (const page of pages) {
  const outputPath = page.path === '/'
    ? path.join(DIST_DIR, 'index.html')
    : path.join(DIST_DIR, page.path.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, renderPage(page), 'utf8');
}

const notFoundPage: Page = {
  path: '/404',
  title: 'Page Not Found',
  description: 'The requested page could not be found.',
  noindex: true,
  content: '<main><h1>Page Not Found</h1><p>The page you requested does not exist.</p><p><a href="/">Return to the CONSTRUCT homepage</a>.</p></main>',
};
fs.writeFileSync(path.join(DIST_DIR, '404.html'), renderPage(notFoundPage), 'utf8');

const sitemapPaths = [
  '/', '/about', '/services', '/projects', '/journal', '/contact',
  '/privacy-policy', '/terms-of-service',
  ...projects.map((project) => `/projects/${project.id}`),
  ...journalPosts.map((post) => `/journal/${post.id}`),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths.map((route) => `  <url><loc>${escapeHtml(absoluteUrl(route))}</loc></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap, 'utf8');
console.log(`[SEO] Prerendered ${pages.length} known routes and a 404 document.`);
