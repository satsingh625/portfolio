'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/lib/site.config';
import {
  careerTransition,
  education,
  experience,
  projects,
  skillGroups,
  targetRoles,
} from '@/lib/data';
import { socialLinks } from '@/lib/site.config';

interface Line {
  type: 'input' | 'output';
  text: string;
}

const PROMPT = 'visitor@satyam:~$';

export function Terminal() {
  const [history, setHistory] = useState<Line[]>([
    { type: 'output', text: `Welcome. Type "help" to see available commands.` },
  ]);
  const [value, setValue] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [history]);

  const commands: Record<string, () => string> = {
    help: () =>
      [
        'Available commands:',
        '  about        Who I am',
        '  status       Current availability & target roles',
        '  skills       Languages & tools',
        '  projects     Selected work',
        '  experience   Work history',
        '  education    Degrees',
        '  contact      How to reach me',
        '  resume       Download my resume',
        '  social       Links',
        '  clear        Clear the screen',
      ].join('\n'),
    about: () =>
      `${siteConfig.name} — ${siteConfig.role} based in ${siteConfig.location}.\n${siteConfig.tagline}`,
    whoami: () => siteConfig.name,
    status: () =>
      [
        `${siteConfig.availability} · ${siteConfig.location}`,
        '',
        careerTransition.summary,
        '',
        'Targeting:',
        ...targetRoles.map((r) => `  • ${r}`),
        '',
        `Location:   ${siteConfig.relocation.openTo}`,
        `Work mode:  ${siteConfig.relocation.workMode}`,
      ].join('\n'),
    ls: () =>
      'about  status  skills  projects  experience  education  contact  resume  social',
    skills: () =>
      skillGroups
        .map((g) => `${g.category.padEnd(14)} ${g.items.join(', ')}`)
        .join('\n'),
    projects: () =>
      projects
        .map(
          (p) =>
            `• ${p.title} (${p.year}) — ${p.description}${p.github ? `\n  ${p.github}` : ''}`,
        )
        .join('\n'),
    experience: () =>
      experience
        .map((e) => `${e.start}–${e.end}  ${e.role} @ ${e.company}`)
        .join('\n'),
    education: () =>
      education
        .map(
          (e) =>
            `• ${e.degree}, ${e.field} — ${e.institution} (${e.year})${e.score ? `, ${e.score}` : ''}`,
        )
        .join('\n'),
    contact: () => `Email: ${siteConfig.email}\nOr use the contact page.`,
    social: () =>
      socialLinks.map((l) => `${(l.label + ':').padEnd(10)} ${l.handle}`).join('\n'),
    resume: () => {
      if (typeof window !== 'undefined')
        window.open(siteConfig.resumePath, '_blank');
      return 'Opening resume.pdf …';
    },
    echo: () => '',
    clear: () => '__CLEAR__',
  };

  function run(raw: string) {
    const trimmed = raw.trim();
    const [name, ...args] = trimmed.split(' ');
    const next: Line[] = [...history, { type: 'input', text: trimmed }];

    if (trimmed === '') {
      setHistory(next);
      return;
    }

    setCmdHistory((h) => [...h, trimmed]);
    setHistIndex(-1);

    const key = (name ?? '').toLowerCase();
    if (key === 'clear') {
      setHistory([]);
      return;
    }
    if (key === 'echo') {
      setHistory([...next, { type: 'output', text: args.join(' ') }]);
      return;
    }

    const handler = commands[key];
    const output = handler
      ? handler()
      : `command not found: ${key}. Type "help".`;

    setHistory([...next, { type: 'output', text: output }]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      run(value);
      setValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const idx =
        histIndex === -1 ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(idx);
      setValue(cmdHistory[idx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIndex === -1) return;
      const idx = histIndex + 1;
      if (idx >= cmdHistory.length) {
        setHistIndex(-1);
        setValue('');
      } else {
        setHistIndex(idx);
        setValue(cmdHistory[idx] ?? '');
      }
    }
  }

  return (
    <section className="container py-24">
      <SectionHeading
        eyebrow="Terminal"
        title="Prefer a command line?"
        description="This one is real — try help, status, or projects."
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-lg border border-border bg-[#0c0c0c] font-mono text-sm shadow-xl"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-xs text-white/40">bash — portfolio</span>
        </div>

        <div
          ref={bodyRef}
          className="h-72 space-y-1 overflow-y-auto p-4 text-white/90"
        >
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap leading-relaxed">
              {line.type === 'input' ? (
                <span>
                  <span className="text-[#27c93f]">{PROMPT}</span>{' '}
                  <span>{line.text}</span>
                </span>
              ) : (
                <span className="text-white/70">{line.text}</span>
              )}
            </div>
          ))}

          <div className="flex items-center">
            <span className="shrink-0 text-[#27c93f]">{PROMPT}</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
              className="ml-2 w-full bg-transparent text-white outline-none"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
