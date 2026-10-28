import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROJECTS, JOURNAL_POSTS } from '../src/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');

const SITE_URL = process.env.VITE_SITE_URL || 'https://maxcnfront.vercel.app';

interface SitemapRoute {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  lastmod?: string;
}

const staticRoutes: SitemapRoute[] = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  { path: '/projects', changefreq: 'weekly', priority: '0.9' },
  { path: '/journal', changefreq: 'daily', priority: '0.9' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.5' },
  { path: '/terms-of-service', changefreq: 'yearly', priority: '0.5' },
];

function generateSitemap(): string {
  const currentDate = new Date().toISOString().split('T')[0];
  const allRoutes: SitemapRoute[] = [...staticRoutes];

  // Add Dynamic Projects
  for (const project of PROJECTS) {
    allRoutes.push({
      path: `/projects/${project.id}`,
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: currentDate,
    });
  }

  // Add Dynamic Journal Posts
  for (const post of JOURNAL_POSTS) {
    allRoutes.push({
      path: `/journal/${post.id}`,
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: currentDate,
    });
  }

  const xmlEntries = allRoutes
    .map((route) => {
      const loc = `${SITE_URL}${route.path}`;
      const lastmod = route.lastmod || currentDate;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlEntries}
</urlset>
`;
}

function generateRobots(): string {
  return `# Mediapartners-Google crawler for AdSense verification and targeting
User-agent: Mediapartners-Google
Allow: /

# Googlebot general crawl rules
User-agent: Googlebot
Allow: /
Disallow: /admin
Disallow: /login
Disallow: /api/

# General crawler access
User-agent: *
Allow: /
Disallow: /admin
Disallow: /login
Disallow: /api/

# Host and Sitemap
Host: ${SITE_URL}
Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function run() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const sitemapXml = generateSitemap();
  const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');
  console.log(`[SEO] sitemap.xml generated with success at: ${sitemapPath}`);

  const robotsTxt = generateRobots();
  const robotsPath = path.join(PUBLIC_DIR, 'robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt, 'utf-8');
  console.log(`[SEO] robots.txt generated with success at: ${robotsPath}`);
}

run();

