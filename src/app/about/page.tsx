import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Education } from '@/components/sections/Education';
import { Button } from '@/components/ui/Button';
import { FileDown } from 'lucide-react';
import { siteConfig } from '@/lib/site.config';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About',
  description: `About ${siteConfig.name} — background, skills, experience, and education.`,
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <div className="container pt-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          About
        </p>
        <h1 className="mt-3 max-w-2xl text-title font-semibold text-balance">
          Support engineer who turns noisy incidents into clean, evidenced resolutions.
        </h1>
        <div className="mt-6">
          <Button href={siteConfig.resumePath} external variant="secondary">
            <FileDown className="h-4 w-4" />
            Download resume
          </Button>
        </div>
      </div>
      <About withHeading={false} />
      <div className="hairline" />
      <Skills />
      <div className="hairline" />
      <Experience />
      <div className="hairline" />
      <Education />
    </>
  );
}
