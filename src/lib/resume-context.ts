import { siteConfig } from './site.config';
import { aboutParagraphs, education, experience, projects, skillGroups } from './data';

/**
 * Assembles a single plain-text knowledge base from the structured portfolio
 * data. This is injected into the chatbot's system prompt so it can answer
 * questions about the resume and work without any external database.
 */
export function buildResumeContext(): string {
  const skills = skillGroups
    .map((g) => `${g.category}: ${g.items.join(', ')}`)
    .join('\n');

  const exp = experience
    .map(
      (e) =>
        `- ${e.role} at ${e.company} (${e.start}–${e.end}, ${e.location}).\n  ${e.summary}\n  Highlights: ${e.highlights.join(' ')}\n  Tools: ${e.stack.join(', ')}`,
    )
    .join('\n');

  const work = projects
    .map(
      (p) =>
        `- ${p.title} (${p.year}): ${p.description} ${p.longDescription} Tags: ${p.tags.join(', ')}.`,
    )
    .join('\n');

  const edu = education
    .map(
      (e) =>
        `- ${e.degree}, ${e.field}, ${e.institution} (${e.year})${e.score ? `, ${e.score}` : ''}`,
    )
    .join('\n');

  return `
NAME: ${siteConfig.name}
ROLE: ${siteConfig.role}
LOCATION: ${siteConfig.location}
CONTACT: ${siteConfig.email} | ${siteConfig.phone}
AVAILABILITY: ${siteConfig.availability}. Open to 24/7 follow-the-sun rotations, weekend and holiday coverage for maintenance windows or major incidents. Notice period: immediate.

ABOUT:
${aboutParagraphs.join('\n')}

SKILLS:
${skills}

EXPERIENCE:
${exp}

SELECTED WORK:
${work}

EDUCATION:
${edu}
`.trim();
}
