'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig, socialLinks } from '@/lib/site.config';

export function Hero() {
  const reduce = useReducedMotion();
  const name = siteConfig.name;

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.03, delayChildren: 0.1 },
    },
  };
  const letter = {
    hidden: { opacity: 0, y: reduce ? 0 : '0.6em' },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
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
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-2 font-mono text-sm text-muted-foreground"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
          Available to join immediately · {siteConfig.location}
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="text-display font-semibold text-balance"
          aria-label={name}
        >
          {name.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={letter}
              className="inline-block"
              aria-hidden
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty sm:text-xl"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button href="/projects">
            View projects
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              window.dispatchEvent(new CustomEvent('open-chatbot'))
            }
          >
            <MessageSquare className="h-4 w-4" />
            Ask my AI
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground"
        >
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
