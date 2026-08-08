import { Github, Linkedin, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { primarySocials } from '@/lib/site.config';
import { cn } from '@/lib/utils';

const icons: Record<string, LucideIcon> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Email: Mail,
};

/**
 * LinkedIn / GitHub / Email as recognisable buttons. LinkedIn is emphasised
 * because it is the primary destination while actively job searching; the other
 * two stay quieter so the group never outweighs the hero's job title.
 *
 * URLs come from site.config — nothing is constructed here.
 */
export function SocialButtons({ className }: { className?: string }) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-2.5', className)}>
      {primarySocials.map((s) => {
        const Icon = icons[s.label];
        const isLinkedIn = s.label === 'LinkedIn';
        const isMail = s.href.startsWith('mailto:');

        return (
          <li key={s.label}>
            <a
              href={s.href}
              // mailto: must open in the same tab or the mail client never fires.
              {...(isMail ? {} : { target: '_blank', rel: 'noreferrer' })}
              aria-label={`${s.label} — ${s.handle}`}
              className={cn(
                'inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors',
                isLinkedIn
                  ? 'border-accent/40 bg-accent/5 text-foreground hover:border-accent hover:bg-accent/10'
                  : 'border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {Icon ? (
                <Icon
                  className={cn('h-4 w-4', isLinkedIn && 'text-accent')}
                  aria-hidden
                />
              ) : null}
              {s.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
