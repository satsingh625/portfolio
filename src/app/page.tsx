import { Hero } from '@/components/sections/Hero';
import { ImpactMetrics } from '@/components/sections/ImpactMetrics';
import { CurrentStatus } from '@/components/sections/CurrentStatus';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Education } from '@/components/sections/Education';
import { Terminal } from '@/components/sections/Terminal';
import { ClosingCTA } from '@/components/sections/ClosingCTA';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ path: '/' });

/**
 * Ordered by what a recruiter needs first: identity, then evidence, then
 * availability, then the detail behind it all. The terminal stays near the
 * bottom as a personality beat before the closing CTA.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="hairline" />
      <ImpactMetrics />
      <div className="hairline" />
      <CurrentStatus />
      <div className="hairline" />
      <About />
      <div className="hairline" />
      <Experience />
      <div className="hairline" />
      <Projects featuredOnly />
      <div className="hairline" />
      <Skills />
      <div className="hairline" />
      <Education />
      <div className="hairline" />
      <Terminal />
      <ClosingCTA />
    </>
  );
}
