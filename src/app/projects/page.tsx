import { Projects } from '@/components/sections/Projects';
import { buildMetadata, projectsJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Work',
  description:
    'Selected support and observability work — monitoring dashboards, triage playbooks, automation, and incident diagnostics.',
  path: '/projects',
});

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd()) }}
      />
      <div className="container pt-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Work
        </p>
        <h1 className="mt-3 max-w-2xl text-title font-semibold text-balance">
          Problems I have owned end to end.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground text-pretty">
          A few representative pieces of support and observability work — each a
          real situation, the action I took, and the result it produced.
        </p>
      </div>
      <Projects showHeading={false} />
    </>
  );
}
