import type { NavItem, SocialLink } from '@/types';

/**
 * Central site configuration. Edit this file to personalise the whole site —
 * name, socials, navigation, and default SEO all read from here.
 */
export const siteConfig = {
  name: 'Satyam Singh',
  role: 'Technical Support Engineer',
  tagline:
    'I keep production platforms healthy — log analysis, monitoring dashboards, and clean escalations across 24/7 support environments.',
  description:
    'Satyam Singh is a Technical Support & Observability Engineer with 4+ years across US healthcare SaaS and enterprise observability tooling — Splunk, Dynatrace, Datadog, Linux, SQL, and API troubleshooting.',
  // Falls back to a sensible default in dev; set NEXT_PUBLIC_SITE_URL in prod.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://satyam-singh.vercel.app',
  email: 'imsats625@gmail.com',
  phone: '+91 90336 10625',
  location: 'Ahmedabad, India',
  // Availability is a strong signal for support roles — surfaced in the hero.
  availability: 'Open to support & observability roles · Immediate joiner',
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'satyam-singh',
  resumePath: '/resume.pdf',
  ogImage: '/og.png',
  keywords: [
    'technical support engineer',
    'observability engineer',
    'application support',
    'Splunk',
    'Dynatrace',
    'Datadog',
    'incident management',
    'escalation management',
    'Linux',
    'SQL',
    'API troubleshooting',
  ],
} as const;

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const socialLinks: SocialLink[] = [
  { label: 'Email', href: 'mailto:imsats625@gmail.com', handle: 'imsats625@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/satyam-singh', handle: 'in/satyam-singh' },
  { label: 'GitHub', href: 'https://github.com/satyam-singh', handle: '@satyam-singh' },
  { label: 'Phone', href: 'tel:+919033610625', handle: '+91 90336 10625' },
];
