'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  FileDown,
  Github,
  Home,
  Mail,
  MessageSquare,
  Moon,
  Search,
  Sparkles,
  Sun,
  User,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { siteConfig, socialLinks } from '@/lib/site.config';
import { cn } from '@/lib/utils';

interface Command {
  id: string;
  label: string;
  hint?: string;
  group: 'Navigation' | 'Actions' | 'Social';
  icon: React.ComponentType<{ className?: string }>;
  perform: () => void;
  keywords?: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActive(0);
  }, []);

  const commands: Command[] = useMemo(() => {
    const go = (href: string) => () => {
      router.push(href);
      close();
    };
    const nav: Command[] = [
      { id: 'home', label: 'Home', group: 'Navigation', icon: Home, perform: go('/') },
      { id: 'about', label: 'About', group: 'Navigation', icon: User, perform: go('/about') },
      { id: 'projects', label: 'Projects', group: 'Navigation', icon: Sparkles, perform: go('/projects') },
      { id: 'blog', label: 'Blog', group: 'Navigation', icon: ArrowRight, perform: go('/blog') },
      { id: 'contact', label: 'Contact', group: 'Navigation', icon: Mail, perform: go('/contact') },
    ];
    const actions: Command[] = [
      {
        id: 'chat',
        label: 'Ask the AI assistant',
        hint: 'about my resume & projects',
        group: 'Actions',
        icon: MessageSquare,
        keywords: 'chatbot ai question resume',
        perform: () => {
          window.dispatchEvent(new CustomEvent('open-chatbot'));
          close();
        },
      },
      {
        id: 'resume',
        label: 'Download resume',
        group: 'Actions',
        icon: FileDown,
        keywords: 'cv pdf',
        perform: () => {
          window.open(siteConfig.resumePath, '_blank');
          close();
        },
      },
      {
        id: 'theme',
        label: `Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`,
        group: 'Actions',
        icon: resolvedTheme === 'dark' ? Sun : Moon,
        keywords: 'theme dark light toggle appearance',
        perform: () => {
          setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
          close();
        },
      },
    ];
    const social: Command[] = socialLinks.map((s) => ({
      id: s.label.toLowerCase(),
      label: s.label,
      hint: s.handle,
      group: 'Social',
      icon: s.label === 'GitHub' ? Github : Mail,
      keywords: s.handle,
      perform: () => {
        window.open(s.href, '_blank');
        close();
      },
    }));
    return [...nav, ...actions, ...social];
  }, [router, close, resolvedTheme, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint ?? ''} ${c.keywords ?? ''}`
        .toLowerCase()
        .includes(q),
    );
  }, [commands, query]);

  // Open on Ctrl/⌘+K, or via custom event; close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        close();
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-command-palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-command-palette', onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 20);
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[active]?.perform();
    }
  };

  const groups = ['Navigation', 'Actions', 'Social'] as const;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            onKeyDown={onListKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                aria-label="Search commands"
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
                ESC
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No results for “{query}”.
                </p>
              ) : (
                groups.map((group) => {
                  const items = filtered.filter((c) => c.group === group);
                  if (items.length === 0) return null;
                  return (
                    <div key={group} className="mb-1">
                      <p className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {group}
                      </p>
                      {items.map((cmd) => {
                        const idx = filtered.indexOf(cmd);
                        const Icon = cmd.icon;
                        return (
                          <button
                            key={cmd.id}
                            onMouseEnter={() => setActive(idx)}
                            onClick={cmd.perform}
                            className={cn(
                              'flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors',
                              active === idx
                                ? 'bg-muted text-foreground'
                                : 'text-muted-foreground',
                            )}
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span className="text-foreground">{cmd.label}</span>
                            {cmd.hint ? (
                              <span className="truncate text-xs text-muted-foreground">
                                {cmd.hint}
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
