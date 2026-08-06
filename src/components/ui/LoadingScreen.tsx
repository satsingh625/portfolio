'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/site.config';

/**
 * A brief, tasteful intro overlay shown on first load. It respects reduced
 * motion by fading rather than animating, and never blocks interaction for
 * more than a moment.
 */
export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 900);
    return () => clearTimeout(t);
  }, []);

  const initials = siteConfig.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.1em' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-2xl font-medium tracking-tight"
          >
            {initials}
            <span className="ml-0.5 inline-block h-5 w-2 translate-y-0.5 bg-accent animate-blink" />
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
