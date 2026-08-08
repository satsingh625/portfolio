import type { NavItem, SocialLink } from '@/types';

/**
 * Central site configuration. Edit this file to personalise the whole site —
 * name, socials, navigation, and default SEO all read from here.
 */
export const siteConfig = {
  name: 'Satyam Singh',
  role: 'Technical Support Engineer',
  /** Specialisations shown directly beneath the role in the hero. */
  specialisms: ['Observability', 'Production Support', 'Incident Management'],
  tagline:
    '4+ years troubleshooting production platforms across healthcare SaaS and observability environments, with a focus on incident resolution, log analysis, monitoring, and clean technical escalations.',
  description:
    'Satyam Singh is a Technical Support & Observability Engineer with 4+ years across US healthcare SaaS and enterprise observability tooling — Splunk, Dynatrace, Datadog, Linux, SQL, and API troubleshooting.',
  // Falls back to a sensible default in dev; set NEXT_PUBLIC_SITE_URL in prod.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://satyam-singh.vercel.app',
  email: 'imsats625@gmail.com',
  phone: '+91 90336 10625',
  location: 'Vadodara, India',
  // Availability is a real signal for support roles, but it stays secondary to
  // the job title in the hero — see Hero.tsx.
  availability: 'Available immediately',
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

/**
 * Socials are declared individually so components can reference a specific
 * channel (the hero and closing CTA lead with LinkedIn) without re-typing URLs
 * or doing fragile lookups by label.
 */
export const social = {
  email: {
    label: 'Email',
    href: 'mailto:imsats625@gmail.com',
    handle: 'imsats625@gmail.com',
  },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/satyam-singh-13b096134/',
    handle: 'in/satyam-singh-13b096134',
  },
  github: {
    label: 'GitHub',
    href: 'https://github.com/satsingh625',
    handle: '@satsingh625',
  },
  phone: {
    label: 'Phone',
    href: 'tel:+919033610625',
    handle: '+91 90336 10625',
  },
} satisfies Record<string, SocialLink>;

export const socialLinks: SocialLink[] = [
  social.email,
  social.linkedin,
  social.github,
  social.phone,
];

/**
 * Recruiter-facing order: LinkedIn first while actively job searching, then
 * GitHub, then email. Phone is intentionally left to the contact page.
 */
export const primarySocials: SocialLink[] = [
  social.linkedin,
  social.github,
  social.email,
];
