'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Command, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navItems, siteConfig } from '@/lib/site.config';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMobileOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <nav className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight"
          aria-label={`${siteConfig.name} — home`}
        >
          {siteConfig.name.split(' ')[0]}
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'relative rounded-md px-3 py-2 text-sm transition-colors',
                  isActive(item.href)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-px h-px bg-foreground"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent('open-command-palette'))
            }
            aria-label="Open command palette"
            className="hidden items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted sm:inline-flex"
          >
            <Command className="h-3.5 w-3.5" />
            <span className="font-mono">K</span>
          </button>

          <ThemeToggle />

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <ul className="container flex flex-col py-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block rounded-md px-3 py-2.5 text-sm transition-colors',
                      isActive(item.href)
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
