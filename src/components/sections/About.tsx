import { SectionHeading } from '@/components/ui/SectionHeading';
import { aboutParagraphs } from '@/lib/data';
import { siteConfig } from '@/lib/site.config';

export function About({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="container py-24">
      {withHeading && (
        <SectionHeading eyebrow="About" title="A little background" />
      )}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-2 text-pretty">
          {aboutParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <aside className="space-y-6 md:pl-6">
          <Detail label="Open to" value="Support & observability roles" />
          <Detail label="Focus" value="Monitoring, log analysis & escalation" />
          <Detail label="Based in" value={siteConfig.location} />
          <Detail label="Experience" value="4+ years" />
          <Detail label="Notice" value="Immediate joiner" />
        </aside>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}
