'use client';

import { motion } from 'framer-motion';
import { impactMetrics, supportLifecycle } from '@/lib/data';

/**
 * "Impact at a glance" — scannable evidence directly under the hero. Kept to
 * plain type on hairline borders rather than a stats dashboard: the numbers
 * should read as facts, not as a product metrics panel.
 */
export function ImpactMetrics() {
  return (
    <section className="container py-16" aria-labelledby="impact-heading">
      <h2
        id="impact-heading"
        className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
      >
        Impact at a glance
      </h2>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-9 sm:gap-x-8 lg:grid-cols-4">
        {impactMetrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="flex flex-col border-t border-border pt-4"
          >
            {/* DOM order is label → value → detail so it reads naturally to a
                screen reader; `order` puts the number first visually. */}
            <dt className="order-2 mt-2 text-sm font-medium text-foreground text-pretty">
              {m.label}
            </dt>
            <dd className="order-1 font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {m.value}
            </dd>
            <dd className="order-3 mt-1.5 text-xs text-muted-foreground text-pretty">
              {m.detail}
            </dd>
          </motion.div>
        ))}
      </dl>

      {/* How the work actually flows — a compact strip, not a diagram. */}
      <motion.ol
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-14 flex flex-wrap items-center gap-x-2 gap-y-2 rounded-lg border border-border bg-card px-5 py-4 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground sm:text-xs"
        aria-label="How I work through an issue"
      >
        {supportLifecycle.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden className="text-border">
                →
              </span>
            )}
            <span className={i === 0 ? 'text-foreground' : undefined}>
              {step}
            </span>
          </li>
        ))}
      </motion.ol>
    </section>
  );
}
