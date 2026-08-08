import { FileDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/site.config';

/**
 * Resume CTA, shared by the hero, the closing CTA and the about page so the
 * filename and link behaviour stay identical everywhere.
 *
 * `download` saves the file on desktop; `target="_blank"` (from `external`)
 * keeps mobile browsers that ignore `download` on a sane path — they open the
 * PDF in the built-in viewer instead of navigating away from the page.
 */
export function ResumeButton({
  variant = 'primary',
  size = 'md',
  label = 'Download Resume',
  className,
}: {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
  label?: string;
  className?: string;
}) {
  const filename = `${siteConfig.name.replace(/\s+/g, '-')}-Resume.pdf`;

  return (
    <Button
      href={siteConfig.resumePath}
      external
      download={filename}
      variant={variant}
      size={size}
      className={className}
    >
      <FileDown className="h-4 w-4" aria-hidden />
      {label}
    </Button>
  );
}
