'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { careerTransition, experience } from '@/lib/data';

export function Experience() {
  return (
    <section className="container py-24">
      <SectionHeading
        eyebrow="Experience"
        title="Where I have worked"
        description="Four-plus years across observability tooling and US healthcare SaaS support — with a throughline of resolving production issues and making the next one faster to fix."
      />

      <ol className="relative border-l border-border">
        {/* Current transition period. Rendered ahead of the roles so the
            timeline reads continuously, but visually quieter than a job: hollow
            node, muted heading, no stack badges. */}
        <motion.li
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="relative ml-6 pb-12"
        >
          <span
            aria-hidden
            className="absolute -left-[1.85rem] top-1.5 h-3 w-3 rounded-full border-2 border-border bg-background"
          />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-mono text-sm uppercase tracking-[0.14em] text-muted-foreground">
              {careerTransition.label}
            </h3>
            <p className="font-mono text-xs text-muted-foreground">
              {careerTransition.start} — {careerTransition.end}
            </p>
          </div>
          <p className="mt-2.5 max-w-2xl text-sm text-muted-foreground text-pretty">
            {careerTransition.summary}
          </p>
        </motion.li>

        {experience.map((job, i) => (
          <motion.li
            key={`${job.company}-${job.start}`}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="relative ml-6 pb-12 last:pb-0"
          >
            {/* Timeline node */}
            <span
              aria-hidden
              className="absolute -left-[1.85rem] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-foreground"
            />

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-semibold">
                {job.role}{' '}
                <span className="text-muted-foreground">· {job.company}</span>
              </h3>
              <p className="font-mono text-xs text-muted-foreground">
                {job.start} — {job.end}
              </p>
            </div>
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">
              {job.location}
            </p>

            <p className="mt-3 text-muted-foreground text-pretty">
              {job.summary}
            </p>

            <ul className="mt-4 space-y-2">
              {job.highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-2.5 text-sm text-muted-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  <span className="text-pretty">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.stack.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
