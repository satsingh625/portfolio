'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { education } from '@/lib/data';

export function Education() {
  return (
    <section className="container py-24">
      <SectionHeading eyebrow="Education" title="Academic background" />
      <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
        {education.map((item, i) => (
          <motion.div
            key={`${item.degree}-${item.year}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex flex-col bg-card p-6"
          >
            <GraduationCap className="mb-4 h-5 w-5 text-accent" />
            <h3 className="text-sm font-semibold leading-snug text-pretty">
              {item.degree} · {item.field}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {item.institution}
            </p>
            <div className="mt-auto flex items-center justify-between pt-6">
              <span className="font-mono text-xs text-muted-foreground">
                {item.year}
              </span>
              {item.score && (
                <span className="font-mono text-xs text-muted-foreground">
                  {item.score}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
