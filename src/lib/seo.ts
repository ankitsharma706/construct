import React, { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOMetadata {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  ogImage?: string;
  ogImageAlt?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  schemaType?: 'Organization' | 'Article' | 'WebSite' | 'FAQPage' | 'ProfessionalService';
  additionalSchema?: Record<string, any>;
}

export const SITE_CONFIG = {
  name: 'CONSTRUCT',
  legalName: 'CONSTRUCT Infrastructure & Structural Engineering Private Limited',
  url: 'https://maxcnfront.vercel.app',
  defaultTitle: 'CONSTRUCT | Structural Engineering & Architectural Design',
  titleTemplate: '%s | CONSTRUCT Engineering',
  defaultDescription:
    'CONSTRUCT is a premier structural engineering and architectural design firm delivering enduring bridges, commercial headquarters, and resilient smart city infrastructure.',
  defaultImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
  defaultImageAlt: 'CONSTRUCT Structural Engineering Landmark High-Rise',
  twitterHandle: '@construct_eng',
  contact: {
    address: 'Bandra Kurla Complex, Mumbai, Maharashtra 400051, India',
    telephone: '+91 98765 43210',
    email: 'projects@construct.com',
  },
  socials: [
    'https://www.linkedin.com/company/construct-engineering',
    'https://twitter.com/construct_eng',
    'https://www.instagram.com/construct_infra',
  ],
};

/**
 * Format page title according to brand template
 */
export function formatTitle(title?: string): string {
  if (!title) return SITE_CONFIG.defaultTitle;
  if (title.includes('CONSTRUCT')) return title;
  return SITE_CONFIG.titleTemplate.replace('%s', title);
}

/**
 * Resolve canonical URL cleanly
 */
export function resolveCanonicalUrl(pathnameOrUrl?: string): string {
  if (!pathnameOrUrl) return SITE_CONFIG.url;
  if (pathnameOrUrl.startsWith('http://') || pathnameOrUrl.startsWith('https://')) {
    return pathnameOrUrl;
  }
  const cleanPath = pathnameOrUrl.startsWith('/') ? pathnameOrUrl : `/${pathnameOrUrl}`;
  return `${SITE_CONFIG.url}${cleanPath}`;
}

/**
 * Safe JSON-LD Sanitizer to prevent XSS injection
 */
export function sanitizeJsonLd(data: Record<string, any>): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

/**
 * Schema.org Organization Schema
 */
export function generateOrganizationSchema(): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/favicon.png`,
    image: SITE_CONFIG.defaultImage,
    description: SITE_CONFIG.defaultDescription,
    telephone: SITE_CONFIG.contact.telephone,
    email: SITE_CONFIG.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bandra Kurla Complex',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400051',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.0657,
      longitude: 72.8687,
    },
    sameAs: SITE_CONFIG.socials,
    priceRange: '₹₹₹₹',
  };
}

/**
 * Schema.org WebSite Schema
 */
export function generateWebSiteSchema(): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.defaultDescription,
    publisher: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

/**
 * Schema.org BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: resolveCanonicalUrl(item.url),
    })),
  };
}

/**
 * Schema.org Article / BlogPosting Schema
 */
export function generateArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    description,
    image: [image || SITE_CONFIG.defaultImage],
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || datePublished || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: author || 'CONSTRUCT Engineering Team',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/favicon.png`,
      },
    },
    inLanguage: 'en-US',
  };
}

/**
 * Schema.org FAQPage Schema
 */
export function generateFAQSchema(faqs: FAQItem[]): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * React Component for Dynamic Head Injection and Sanitized Structured Data
 */
export function SEOHead({
  title,
  description = SITE_CONFIG.defaultDescription,
  canonical,
  keywords,
  ogType = 'website',
  ogImage = SITE_CONFIG.defaultImage,
  ogImageAlt = SITE_CONFIG.defaultImageAlt,
  twitterCard = 'summary_large_image',
  noindex = false,
  publishedTime,
  modifiedTime,
  author,
  breadcrumbs,
  faqs,
  additionalSchema,
}: SEOMetadata) {
  const fullTitle = formatTitle(title);
  const canonicalUrl = resolveCanonicalUrl(canonical);

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to set or update meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Helper to set link tags (e.g. canonical)
    const setLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Basic SEO
    setMeta('description', description);
    if (keywords && keywords.length > 0) {
      setMeta('keywords', keywords.join(', '));
    }
    setMeta(
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    // Canonical
    setLink('canonical', canonicalUrl);

    // OpenGraph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:site_name', SITE_CONFIG.name, true);
    setMeta('og:type', ogType, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:image:alt', ogImageAlt, true);

    if (publishedTime) {
      setMeta('article:published_time', publishedTime, true);
    }
    if (modifiedTime) {
      setMeta('article:modified_time', modifiedTime, true);
    }
    if (author) {
      setMeta('article:author', author, true);
    }

    // Twitter Card
    setMeta('twitter:card', twitterCard);
    setMeta('twitter:site', SITE_CONFIG.twitterHandle);
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // Inject JSON-LD Structured Data
    const schemas: Record<string, any>[] = [
      generateOrganizationSchema(),
      generateWebSiteSchema(),
    ];

    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push(generateBreadcrumbSchema(breadcrumbs));
    }

    if (faqs && faqs.length > 0) {
      schemas.push(generateFAQSchema(faqs));
    }

    if (ogType === 'article') {
      schemas.push(
        generateArticleSchema({
          title: fullTitle,
          description,
          url: canonicalUrl,
          image: ogImage,
          datePublished: publishedTime,
          dateModified: modifiedTime,
          author,
        })
      );
    }

    if (additionalSchema) {
      schemas.push(additionalSchema);
    }

    let scriptTag = document.getElementById('seo-dynamic-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'seo-dynamic-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = sanitizeJsonLd({
      '@context': 'https://schema.org',
      '@graph': schemas,
    });
  }, [
    fullTitle,
    description,
    canonicalUrl,
    keywords,
    ogType,
    ogImage,
    ogImageAlt,
    twitterCard,
    noindex,
    publishedTime,
    modifiedTime,
    author,
    breadcrumbs,
    faqs,
    additionalSchema,
  ]);

  return null;
}

