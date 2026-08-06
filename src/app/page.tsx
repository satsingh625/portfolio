import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Education } from '@/components/sections/Education';
import { Terminal } from '@/components/sections/Terminal';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ path: '/' });

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="hairline" />
      <About />
      <div className="hairline" />
      <Skills />
      <div className="hairline" />
      <Projects featuredOnly />
      <div className="hairline" />
      <Experience />
      <div className="hairline" />
      <Education />
      <div className="hairline" />
      <Terminal />
    </>
  );
}
