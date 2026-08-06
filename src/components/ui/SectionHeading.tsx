'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Consistent section header with an eyebrow label. The eyebrow uses a numbered
 * marker only when a section index genuinely reads as a sequence.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4 }}
        className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-title font-semibold text-balance"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-lg text-muted-foreground text-pretty"
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
