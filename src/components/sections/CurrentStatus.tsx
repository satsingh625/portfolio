'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { careerTransition, targetRoles } from '@/lib/data';
import { ResumeButton } from '@/components/ui/ResumeButton';
import { siteConfig } from '@/lib/site.config';

/**
 * Current status + target roles in one section. Framed as an active search with
 * a productive transition period — the point is to answer "what are you looking
 * for and when can you start?" before a recruiter has to ask.
 */
export function CurrentStatus() {
  return (
    <section className="container py-24" aria-labelledby="status-heading">
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Current status
          </p>
          <h2
            id="status-heading"
            className="mt-3 text-title font-semibold text-balance"
          >
            Open to opportunities
          </h2>

          <p className="mt-5 max-w-2xl text-lg text-muted-foreground text-pretty">
            Currently in a career transition and actively exploring
            opportunities in Technical Support, Production Support and
            Observability. I&rsquo;m using this time to deepen my technical
            skills, build practical projects, and stay current with modern tools
            and practices.
          </p>

          <ul className="mt-7 space-y-2.5">
            {careerTransition.focus.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 text-sm text-muted-foreground"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden
                />
                <span className="text-pretty">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ResumeButton variant="secondary" className="w-full sm:w-auto" />
            <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-green-500"
              />
              {siteConfig.availability}
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="rounded-lg border border-border bg-card p-6 lg:col-span-2"
        >
          <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Roles I&rsquo;m targeting
          </h3>
          <ul className="mt-5 space-y-3">
            {targetRoles.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-sm">
                <span
                  aria-hidden
                  className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                />
                <span className="text-foreground text-pretty">{r}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground text-pretty">
            Open to follow-the-sun shift rotations, weekends and holiday
            coverage for maintenance windows or major incidents.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
