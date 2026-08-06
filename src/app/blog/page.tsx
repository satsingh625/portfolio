import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getSortedPosts } from '@/content/blog';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Blog',
  description:
    'Writing on incident triage, observability, log analysis, and running calm 24/7 support.',
  path: '/blog',
});

export default function BlogPage() {
  const posts = getSortedPosts();

  return (
    <div className="container py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Writing
      </p>
      <h1 className="mt-3 max-w-2xl text-title font-semibold text-balance">
        Notes on support, observability & incidents.
      </h1>

      <ul className="mt-14 divide-y divide-border border-t border-border">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-3 py-8 transition-opacity sm:flex-row sm:items-baseline sm:justify-between"
            >
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="mt-2 text-muted-foreground text-pretty">
                  {post.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-right font-mono text-xs text-muted-foreground">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <p className="mt-1">{post.readingTime}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
