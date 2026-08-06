'use client';

import { motion } from 'framer-motion';
import { GitFork, Github, Star, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { GitHubActivity as Activity } from '@/types';

export function GitHubActivity() {
  const [data, setData] = useState<Activity | null>(null);
  const [state, setState] = useState<'loading' | 'error' | 'ready'>('loading');

  useEffect(() => {
    let cancelled = false;
    fetch('/api/github')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json: Activity) => {
        if (!cancelled) {
          setData(json);
          setState('ready');
        }
      })
      .catch(() => !cancelled && setState('error'));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="container py-24">
      <SectionHeading
        eyebrow="Open source"
        title="GitHub activity"
        description="Pulled live from the GitHub API — the repositories I've been shipping and maintaining."
      />

      {state === 'error' ? (
        <p className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
          GitHub is unavailable right now. Visit{' '}
          <a
            className="text-foreground underline underline-offset-4"
            href={`https://github.com/${data?.username ?? ''}`}
            target="_blank"
            rel="noreferrer"
          >
            my profile
          </a>{' '}
          directly.
        </p>
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            <Stat
              icon={Github}
              label="Public repos"
              value={data?.publicRepos}
              loading={state === 'loading'}
            />
            <Stat
              icon={Users}
              label="Followers"
              value={data?.followers}
              loading={state === 'loading'}
            />
            <Stat
              icon={Star}
              label="Total stars"
              value={data?.topRepos.reduce(
                (a, r) => a + r.stargazers_count,
                0,
              )}
              loading={state === 'loading'}
              className="col-span-2 sm:col-span-1"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {state === 'loading'
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-32 rounded-lg border border-border shimmer"
                  />
                ))
              : data?.topRepos.slice(0, 4).map((repo, i) => (
                  <motion.a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (i % 2) * 0.05 }}
                    className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/20"
                  >
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium group-hover:text-accent">
                        {repo.name}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
                      {repo.description ?? 'No description provided.'}
                    </p>
                    <div className="mt-4 flex items-center gap-4 font-mono text-xs text-muted-foreground">
                      {repo.language && <span>{repo.language}</span>}
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {repo.stargazers_count}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GitFork className="h-3 w-3" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </motion.a>
                ))}
          </div>
        </>
      )}
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  loading,
  className = '',
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: number;
  loading: boolean;
  className?: string;
}) {
  return (
    <div className={`bg-card p-6 ${className}`}>
      <Icon className="mb-3 h-4 w-4 text-muted-foreground" />
      {loading ? (
        <div className="h-8 w-16 rounded shimmer" />
      ) : (
        <p className="text-3xl font-semibold tabular-nums">{value ?? 0}</p>
      )}
      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
