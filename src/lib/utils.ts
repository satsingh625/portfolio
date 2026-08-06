/**
 * Minimal className combiner. Avoids pulling in extra deps for a tiny helper.
 * Accepts strings, arrays, and conditional objects.
 */
type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, boolean | undefined | null>
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat(Infinity as 1)
    .filter(Boolean)
    .map((v) => {
      if (typeof v === 'string' || typeof v === 'number') return String(v);
      if (typeof v === 'object' && v !== null) {
        return Object.entries(v)
          .filter(([, on]) => Boolean(on))
          .map(([k]) => k)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ')
    .trim();
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Turn a lightweight markdown subset into safe HTML for blog rendering. */
export function renderMarkdown(md: string): string {
  const escape = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const lines = md.split('\n');
  const html: string[] = [];
  let inList = false;
  let inCode = false;

  const closeList = () => {
    if (inList) {
      html.push('</ul>');
      inList = false;
    }
  };

  const inline = (text: string) =>
    escape(text)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" rel="noreferrer">$1</a>',
      );

  for (const line of lines) {
    if (line.startsWith('```')) {
      inCode = !inCode;
      html.push(inCode ? '<pre><code>' : '</code></pre>');
      continue;
    }
    if (inCode) {
      html.push(escape(line));
      continue;
    }
    if (line.startsWith('## ')) {
      closeList();
      html.push(`<h2>${inline(line.slice(3))}</h2>`);
    } else if (line.startsWith('### ')) {
      closeList();
      html.push(`<h3>${inline(line.slice(4))}</h3>`);
    } else if (line.startsWith('- ')) {
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${inline(line.slice(2))}</li>`);
    } else if (line.trim() === '') {
      closeList();
    } else {
      closeList();
      html.push(`<p>${inline(line)}</p>`);
    }
  }
  closeList();
  return html.join('\n');
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
