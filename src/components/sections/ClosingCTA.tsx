'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ResumeButton } from '@/components/ui/ResumeButton';
import { SocialButtons } from '@/components/ui/SocialButtons';

/**
 * Closing CTA for recruiters who read to the end of the home page. Deliberately
 * the last thing on the page, and deliberately explicit about what I'm looking
 * for so no one has to hunt for the contact route.
 */
export function ClosingCTA() {
  return (
    <section
      className="relative overflow-hidden border-t border-border"
      aria-labelledby="closing-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid [background-size:44px_44px] [mask-image:radial-gradient(70%_60%_at_50%_100%,black,transparent)] opacity-40"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="container py-24 text-center"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Let&rsquo;s connect
        </p>
        <h2
          id="closing-heading"
          className="mx-auto mt-4 max-w-3xl text-title font-semibold text-balance"
        >
          Let&rsquo;s solve production problems together.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground text-pretty">
          Currently exploring Technical Support, Production Support and
          Observability opportunities.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
            <ResumeButton className="w-full sm:w-auto" />
            <SocialButtons className="justify-center" />
          </div>

          <Link
            href="/contact"
            className="group mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Or send me a message
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
