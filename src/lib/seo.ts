import type { Metadata } from 'next';
import { siteConfig } from './site.config';
import { projects } from './data';
import { experience } from './data';

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
    title: pageTitle,
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
    email: `mailto:${siteConfig.email}`,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location,
    },
    sameAs: [
      `https://github.com/${siteConfig.githubUsername}`,
      'https://linkedin.com/in/satyam-singh',
    ],
    worksFor: {
      '@type': 'Organization',
      name: experience[0]?.company ?? '',
    },
    knowsAbout: siteConfig.keywords,
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
