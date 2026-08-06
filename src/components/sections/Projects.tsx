'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { projects } from '@/lib/data';
import type { Project } from '@/types';

export function Projects({
  featuredOnly = false,
  showHeading = true,
}: {
  featuredOnly?: boolean;
  showHeading?: boolean;
}) {
  const list = featuredOnly ? projects.filter((p) => p.featured) : projects;

  return (
    <section className="container py-24">
      {showHeading && (
        <SectionHeading
          eyebrow="Work"
          title="Selected work"
          description="Representative support and observability work — the situation, what I did, and the outcome it produced."
        />
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {list.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {featuredOnly && (
        <div className="mt-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            See all projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      )}
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.06 }}
      className="group relative flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/20"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          {project.featured && (
            <span className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
              Featured
            </span>
          )}
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {project.year}
        </span>
      </div>

      <p className="flex-1 text-sm text-muted-foreground text-pretty">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      {(project.github || project.demo) && (
        <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-sm">
          {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            Code
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUpRight className="h-4 w-4" />
            Live demo
          </a>
          )}
        </div>
      )}
    </motion.article>
  );
}
