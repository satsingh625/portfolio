'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Fades and lifts each route's content on navigation. Keyed on pathname so it
 * re-runs per page. Kept subtle to avoid a janky feel on fast navigations.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.main
      key={pathname}
      id="main-content"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen pt-16"
    >
      {children}
    </motion.main>
  );
}
