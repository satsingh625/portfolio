import Link from 'next/link';
import { navItems, siteConfig, socialLinks } from '@/lib/site.config';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <p className="font-mono text-sm font-semibold">
              {siteConfig.name.split(' ')[0]}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground text-pretty">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <nav aria-label="Footer">
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Pages
              </p>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Connect
              </p>
              <ul className="space-y-2">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
