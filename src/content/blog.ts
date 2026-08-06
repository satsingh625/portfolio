import type { BlogPost } from '@/types';

/**
 * Blog content. Each post uses a lightweight markdown-ish string that the
 * blog renderer turns into styled HTML. Swap this for MDX or a CMS later
 * without changing the page components — they only depend on the BlogPost type.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'triaging-a-production-incident',
    title: 'Triaging a production incident: alert to resolution',
    description:
      'The repeatable path I follow from a fired alert to a verified fix or a clean escalation.',
    date: '2026-03-10',
    readingTime: '7 min read',
    tags: ['Incident Management', 'Observability'],
    content: `## The goal is evidence, not heroics

When an alert fires at 3 a.m., the worst thing you can do is start guessing. The job is to move from "something is wrong" to "here is exactly what is wrong, and here is the proof" as quickly as possible. Everything below is in service of that.

## Confirm the blast radius first

Before touching anything, I answer three questions: is this one customer or many, is it degraded or fully down, and when did it start. The monitoring dashboard usually answers all three in under a minute — a spike in error rate lined up against a deploy marker tells a very clear story.

## Read the logs like a timeline

Logs are most useful when you stop reading them as text and start reading them as a sequence. I anchor on the first bad event, not the loudest one. The error a user reports is often three hops downstream of the real cause.

- Find the earliest anomaly, not the noisiest.
- Correlate the log timestamp against the metric that moved.
- Note what is *normal* so the abnormal stands out.

## Reproduce, then escalate with a package

If it needs engineering, they should never have to redo my investigation. A good escalation is a small package: the reproduction steps, the relevant log lines, the timeline, and the impact. Half the resolution time is often just handing over clean evidence.

## Close the loop

A fix is not done until the affected client hears it from a human. Verify the fix in the same dashboard that caught the problem, then tell the customer in language that matches who they are — technical for the technical, plain for everyone else.`,
  },
  {
    slug: 'reading-logs-like-a-detective',
    title: 'Reading logs like a detective',
    description:
      'A practical SPL-and-Linux workflow for turning a wall of log lines into a root cause.',
    date: '2026-01-22',
    readingTime: '6 min read',
    tags: ['Splunk', 'Linux', 'Log Analysis'],
    content: `## Logs are a crime scene, not a novel

You do not read them front to back. You look for the moment the story changed. The skill is knowing where to stand so the important line finds you.

## Narrow before you widen

In Splunk I start narrow — a single trace or request id — and widen only when I need context. Searching everything first buries the signal. A tight time window plus one strong filter beats a broad query every time.

- Start from a known-bad request, then expand outward.
- Filter by status, host, or endpoint before by keyword.
- Let the dashboard show you *rate of change*, not just totals.

## Bring the host into it

Application logs tell you what the code saw; the host tells you what the machine felt. A quick pass with \`grep\`, \`journalctl\`, and a look at resource pressure often explains an error the app logs only hint at. The two views together are far stronger than either alone.

## Automate the boring 80%

Any investigation step I do twice becomes a small Bash script — collect the last N minutes of logs, pull the health check, grep for the usual suspects. The script does not solve the incident, but it means every investigation starts from evidence instead of from scratch.

## Write down what the logs could not tell you

The gaps are as useful as the hits. If I could not find the answer because a service logged nothing useful, that is a finding — and usually the first line of the next runbook.`,
  },
  {
    slug: 'runbooks-your-oncall-self-will-thank-you-for',
    title: 'Runbooks your on-call self will thank you for',
    description:
      'How writing triage guides into the knowledge base makes the whole team faster.',
    date: '2025-11-14',
    readingTime: '5 min read',
    tags: ['Documentation', 'Support', 'Mentoring'],
    content: `## The knowledge base is a force multiplier

Every recurring issue you resolve is worth writing down once and reusing forever. The runbook I write today is a junior engineer's confidence at 2 a.m. tomorrow — and my own memory six months from now.

## Write for the tired reader

A runbook is not documentation of how the system works. It is a set of instructions for someone stressed, half-awake, and mid-incident. That changes how you write it.

- Lead with symptoms, so people find it by what they see.
- Give the check, the likely cause, and the fix — in that order.
- Say when to stop and escalate, and to whom.

## Keep it honest about uncertainty

The best runbooks admit what they do not cover. "If the error is X, do Y; if it is anything else, escalate with these logs" is more useful than false confidence. It tells the reader exactly where the map ends.

## Measure it by ramp time

I know a runbook is good when a newer engineer resolves the issue without pinging me. That is the whole point: turning hard-won incident knowledge into a repeatable path, so senior time goes to genuinely novel problems and time-to-triage keeps dropping.`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getSortedPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
