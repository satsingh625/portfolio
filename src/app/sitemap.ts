import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site.config';
import { blogPosts } from '@/content/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = ['', '/about', '/projects', '/blog', '/contact'].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    }),
  );

  const postRoutes = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
