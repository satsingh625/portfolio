import { About } from '@/components/sections/About';
import { CurrentStatus } from '@/components/sections/CurrentStatus';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Education } from '@/components/sections/Education';
import { ClosingCTA } from '@/components/sections/ClosingCTA';
import { ResumeButton } from '@/components/ui/ResumeButton';
import { SocialButtons } from '@/components/ui/SocialButtons';
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
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <ResumeButton className="w-full sm:w-auto" />
          <SocialButtons />
        </div>
      </div>
      <About withHeading={false} />
      <div className="hairline" />
      <CurrentStatus showAvailability />
      <div className="hairline" />
      <Experience />
      <div className="hairline" />
      <Skills />
      <div className="hairline" />
      <Education />
      <ClosingCTA />
    </>
  );
}
