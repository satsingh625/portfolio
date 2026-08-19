'use client';

import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ResumeButton } from '@/components/ui/ResumeButton';
import { SocialButtons } from '@/components/ui/SocialButtons';
import { siteConfig } from '@/lib/site.config';

export function Hero() {
  const reduce = useReducedMotion();
  const role = siteConfig.role;
  const words = role.split(' ');

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.06,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };
  // Staggered per word rather than per character: the role is long enough that
  // per-character inline-blocks would let it wrap mid-word on narrow screens.
  //
  // `hidden` must NOT depend on `reduce`: it is the `initial` state, so it is
  // serialised into the SSR'd HTML, where the motion preference is unknowable.
  // Branching here made the style attribute disagree with the client on
  // reduced-motion machines and broke hydration. The preference belongs in the
  // transition below, which only ever runs after hydration.
  const word = {
    hidden: { opacity: 0, y: '0.5em' },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative overflow-hidden">
      {/* Ambient background: hairline grid fading into a soft accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid [background-size:44px_44px] [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)] opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 glow"
      />

      <div className="container flex min-h-[calc(100vh-4rem)] flex-col justify-center py-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm text-muted-foreground"
        >
          {siteConfig.name}
        </motion.p>

        {/* Professional identity leads: the role is the largest element here. */}
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-4 max-w-4xl text-hero font-semibold text-balance"
          aria-label={role}
        >
          {words.map((w, i) => (
            // The separating space is a sibling text node, not inside the
            // inline-block: CSS trims trailing whitespace inside one, which
            // would run the words together.
            <Fragment key={i}>
              <motion.span variants={word} className="inline-block" aria-hidden>
                {w}
              </motion.span>
              {i < words.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-5 max-w-2xl font-mono text-xs uppercase tracking-[0.1em] text-accent sm:text-sm sm:tracking-[0.16em]"
        >
          {siteConfig.specialisms.join(' · ')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-7 max-w-2xl text-lg text-muted-foreground text-pretty"
        >
          {siteConfig.tagline}
        </motion.p>

        {/* Secondary by design: small, muted, and below the summary. */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 flex items-center gap-2 font-mono text-xs text-muted-foreground"
        >
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-green-500"
          />
          {siteConfig.availability} · {siteConfig.location} ·{' '}
          {siteConfig.relocation.short}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <ResumeButton className="w-full sm:w-auto" />
          <SocialButtons />
        </motion.div>
      </div>
    </section>
  );
}
