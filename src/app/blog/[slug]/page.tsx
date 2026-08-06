import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { blogPosts, getPostBySlug } from '@/content/blog';
import { Badge } from '@/components/ui/Badge';
import { formatDate, renderMarkdown } from '@/lib/utils';
import { blogPostJsonLd, buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return buildMetadata({ title: 'Not found' });
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="container-tight py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostJsonLd(post)),
        }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All posts
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="mt-4 text-title font-semibold text-balance">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">
          {post.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </header>

      <div className="hairline my-10" />

      <div
        className="prose-portfolio"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
      />
    </article>
  );
}
