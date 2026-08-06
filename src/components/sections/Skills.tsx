'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { skillGroups } from '@/lib/data';

export function Skills() {
  return (
    <section className="container py-24">
      <SectionHeading
        eyebrow="Skills"
        title="Tools I reach for"
        description="A support-and-observability toolkit — monitoring stacks, log analysis, scripting, and the databases and APIs behind production issues."
      />
      <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: gi * 0.05 }}
            className="bg-card p-6"
          >
            <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {group.category}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border bg-background px-2.5 py-1 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
