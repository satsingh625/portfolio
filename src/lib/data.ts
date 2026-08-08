import type {
  EducationItem,
  ExperienceItem,
  Project,
  SkillGroup,
} from '@/types';

/**
 * Portfolio content. This is intentionally plain data so it can be consumed by
 * pages, the command palette, and SEO structured data alike.
 */

export const skillGroups: SkillGroup[] = [
  {
    category: 'Support & ITSM',
    items: [
      'Ticket lifecycle',
      'SLA adherence',
      'Incident management',
      'Problem management',
      'Escalation management',
      'Root-cause investigation',
      'Post-incident reviews',
      'KB authoring',
      'Mentoring',
    ],
  },
  {
    category: 'Monitoring & Observability',
    items: [
      'Splunk (SPL, dashboards)',
      'Dynatrace (DPL)',
      'Datadog (monitors, alerts)',
      'Application log analysis',
      'Diagnostic tooling',
    ],
  },
  {
    category: 'Scripting & Programming',
    items: ['Python', 'Bash', 'SQL (JOINs, stored procedures, DML)'],
  },
  {
    category: 'OS & Infrastructure',
    items: [
      'Linux administration',
      'Docker',
      'Networking fundamentals',
      'AWS (networking & data concepts)',
    ],
  },
  {
    category: 'APIs & Integrations',
    items: [
      'RESTful API troubleshooting',
      'Third-party integration diagnosis',
      'HTTP request/response analysis',
    ],
  },
  {
    category: 'Collaboration & Comms',
    items: [
      'Confluence-style KB',
      'Slack',
      'ITSM ticketing',
      'Excel',
      'Phone / email / chat support',
      'Cross-region handovers',
    ],
  },
  {
    category: 'Languages',
    items: ['English', 'Hindi', 'Gujarati'],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: 'Observability Engineer',
    company: 'Crest Data Systems',
    location: 'Ahmedabad, India',
    start: 'Aug 2025',
    end: 'Jun 2026',
    summary:
      'Promoted from E3 Technical Support after consistently owning escalated cases end to end and building cross-stack monitoring that surfaced degradation before it reached customers.',
    highlights: [
      'Built dashboards across Splunk, Dynatrace and Datadog that flagged service degradation before it hit customers.',
      'Investigated production incidents from application logs and monitoring data, then escalated to engineering and third-party vendors with reproducible evidence, verified fixes and closed the loop with clients.',
      'Wrote solution-based resolution and triage guides into the team knowledge base, giving newer engineers a repeatable path and cutting time-to-triage on recurring issues.',
      'Administered Linux hosts, wrote Bash scripts for health checks and log automation, ran Docker-based services and queried service logs with SQL during investigations.',
    ],
    stack: ['Splunk', 'Dynatrace', 'Datadog', 'Linux', 'Bash', 'Docker', 'SQL'],
  },
  {
    role: 'Support & Implementation Analyst — US Healthcare',
    company: 'Meditab Software Inc.',
    location: 'Ahmedabad, India',
    start: 'Dec 2022',
    end: 'Jul 2025',
    summary:
      'Client-facing L2 support across a 24/7 production environment covering US time zones — tickets, phone and chat with billing operations and clinical users under tight SLAs.',
    highlights: [
      'Resolved 68% of escalated Tier-2 cases without further escalation by combining application log review, SQL queries and RESTful API diagnostics.',
      'Diagnosed third-party API integration failures behind billing and reporting gaps, packaged findings for engineering, and communicated status to technical and non-technical stakeholders through resolution.',
      'Ran multi-table SQL JOINs, stored procedures and DML operations to trace data discrepancies, verify record accuracy and generate audit-ready reports during compliance reviews.',
      'Mentored newer analysts on billing-investigation and ticket-handling workflows, and pitched process changes to the product team that reduced repeat-case volume.',
    ],
    stack: ['SQL', 'REST APIs', 'Log analysis', 'ITSM', 'US Healthcare'],
  },
  {
    role: 'Development & Support Engineer',
    company: 'Jekson Vision',
    location: 'Ahmedabad, India',
    start: 'Jul 2019',
    end: 'Jul 2020',
    summary:
      'Supported customers across India on hardware and software issues, and contributed to proof-of-concept builds alongside cross-functional engineering teams.',
    highlights: [
      'Handled customer hardware and software issues end to end across India.',
      'Contributed to proof-of-concept builds with cross-functional engineering teams.',
    ],
    stack: ['Support', 'Hardware', 'Software', 'POC builds'],
  },
];

/**
 * "Selected Work" — situation → action → result stories drawn from real
 * experience rather than shipped side-projects. Add `github`/`demo` links once
 * you publish scripts or dashboards you can share publicly.
 */
export const projects: Project[] = [
  {
    slug: 'cross-stack-observability',
    title: 'Cross-Stack Observability Dashboards',
    description:
      'Splunk, Dynatrace and Datadog dashboards that surfaced service degradation before customers noticed.',
    longDescription:
      'Designed and maintained monitoring across three observability stacks — Splunk (SPL, dashboards), Dynatrace (DPL patterns) and Datadog (monitors and alerts). The dashboards correlated application logs with service metrics so on-call could catch degradation early, triage faster, and escalate with reproducible evidence instead of guesswork.',
    tags: ['Splunk', 'Dynatrace', 'Datadog', 'Monitoring'],
    featured: true,
    year: 2025,
  },
  {
    slug: 'triage-playbooks',
    title: 'Tier-2 Triage & Resolution Playbooks',
    description:
      'Knowledge-base runbooks that gave newer engineers a repeatable path and cut time-to-triage on recurring issues.',
    longDescription:
      'Authored solution-based resolution and triage guides in the team knowledge base, turning hard-won incident knowledge into a repeatable path for recurring tickets. New engineers ramped faster and time-to-triage on similar cases dropped, freeing senior engineers for genuinely novel problems.',
    tags: ['Knowledge Base', 'Incident Management', 'Mentoring'],
    featured: true,
    year: 2025,
  },
  {
    slug: 'linux-log-automation',
    title: 'Linux Health-Checks & Log Automation',
    description:
      'Bash scripts for host health checks and log automation on Linux, backing faster incident investigation.',
    longDescription:
      'Administered Linux hosts and wrote Bash scripts to automate health checks and log collection, alongside Docker-based services. During incidents these scripts trimmed the manual steps between "alert fired" and "root cause found", so investigations started from evidence rather than from scratch.',
    tags: ['Linux', 'Bash', 'Docker', 'Automation'],
    featured: true,
    year: 2025,
  },
  {
    slug: 'billing-api-diagnostics',
    title: 'Billing & Third-Party API Diagnostics',
    description:
      'Root-caused third-party API integration failures behind billing and reporting gaps in a US healthcare platform.',
    longDescription:
      'On a 24/7 US healthcare SaaS, diagnosed integration failures behind billing and reporting gaps by analysing HTTP request/response flows and application logs. Packaged reproducible findings for engineering and kept both technical contacts and non-technical stakeholders informed through to resolution.',
    tags: ['REST APIs', 'Log analysis', 'US Healthcare'],
    featured: false,
    year: 2024,
  },
  {
    slug: 'sql-data-integrity',
    title: 'SQL Data-Integrity & Audit Reporting',
    description:
      'Multi-table SQL JOINs, stored procedures and DML to trace discrepancies and generate audit-ready reports.',
    longDescription:
      'Used multi-table JOINs, stored procedures and DML operations to trace data discrepancies, verify record accuracy and produce audit-ready reports during compliance reviews — the kind of careful, evidence-first data work that billing and clinical teams could trust.',
    tags: ['SQL', 'Data Integrity', 'Compliance'],
    featured: false,
    year: 2024,
  },
];

export const education: EducationItem[] = [
  {
    degree: 'MBA',
    field: 'Information Technology',
    institution: 'Parul University',
    year: '2023',
    score: 'CGPA 7.51',
  },
  {
    degree: 'B.Tech',
    field: 'Information Technology',
    institution: 'Parul University',
    year: '2019',
    score: 'CGPA 6.77',
  },
];

export const aboutParagraphs: string[] = [
  'I am a Technical Support Engineer with 4+ years troubleshooting production platforms in 24/7 environments — across US healthcare SaaS and enterprise observability tooling. I like working client-reported issues end to end: reviewing application logs, monitoring dashboards and API diagnostics, then driving each case to resolution or a clean escalation backed by reproducible evidence.',
  'Most of my day-to-day sits where support meets observability. I build dashboards across Splunk, Dynatrace and Datadog, script health checks and log automation in Bash, and query service data with SQL to trace discrepancies. I also mentor junior analysts on triage and investigation workflows, and write the knowledge-base guides that make the next incident faster to resolve.',
  'I am a confident communicator with clients over phone, email and chat, comfortable translating between technical and non-technical audiences. I am open to follow-the-sun shift rotations, weekends and holiday coverage for maintenance windows or major incidents — and available to join immediately.',
];
