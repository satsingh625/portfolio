import type { Metadata } from 'next';
import { siteConfig, social } from './site.config';
import { projects } from './data';

/** Build page-level metadata that inherits sensible defaults from siteConfig. */
export function buildMetadata({
  title,
  description,
  path = '/',
  image = siteConfig.ogImage,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
} = {}): Metadata {
  const pageTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.role}`;
  const desc = description ?? siteConfig.description;
  const url = `${siteConfig.url}${path}`;

  return {
    // The root layout's title template already appends the site name, so pass
    // the bare title through it. Without a title we bypass the template, since
    // pageTitle is the full default.
    title: title ?? { absolute: pageTitle },
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: pageTitle,
      description: desc,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: desc,
      images: [image],
    },
  };
}

/** JSON-LD Person schema for the homepage — improves rich results. */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    email: `mailto:${siteConfig.email}`,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vadodara',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Parul University' },
    // Spelled out rather than reusing siteConfig.keywords: those are lowercase
    // meta keywords, while knowsAbout reads as proper subject names.
    knowsAbout: [
      'Technical Support',
      'Production Support',
      'Observability',
      'Splunk',
      'Dynatrace',
      'Datadog',
      'Incident Management',
      'Linux',
      'SQL',
      'REST API troubleshooting',
    ],
    // Real profile URLs only — these come from site.config, not guessed handles.
    sameAs: [social.linkedin.href, social.github.href],
    // No `worksFor`: the most recent role ended Jun 2026, and claiming current
    // employment there would be inaccurate. Re-add it on the next role.
  };
}

/** JSON-LD list of projects, surfaced as CreativeWork items. */
export function projectsJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.title,
        description: p.description,
        url: p.demo ?? p.github,
        keywords: p.tags.join(', '),
      },
    })),
  };
}

export function blogPostJsonLd(post: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Person', name: siteConfig.name },
    url: `${siteConfig.url}/blog/${post.slug}`,
  };
}
