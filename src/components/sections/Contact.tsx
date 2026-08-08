'use client';

import { motion } from 'framer-motion';
import { Check, Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ResumeButton } from '@/components/ui/ResumeButton';
import { SocialButtons } from '@/components/ui/SocialButtons';
import { socialLinks } from '@/lib/site.config';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});
    setServerError('');

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: String(fd.get('message') ?? ''),
      company: String(fd.get('company') ?? ''), // honeypot
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 422) {
        const data = await res.json();
        setErrors(data.errors ?? {});
        setStatus('idle');
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Something went wrong.');
      }
      setStatus('success');
      form.reset();
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Something went wrong.',
      );
      setStatus('error');
    }
  }

  return (
    <section className="container py-24">
      <SectionHeading
        eyebrow="Let's connect"
        title="Let's solve production problems together."
        description="Currently exploring Technical Support, Production Support and Observability opportunities. Have a role or a question? Drop me a line and I'll get back to you."
      />

      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <SocialButtons />

          <div className="mt-4">
            <ResumeButton variant="secondary" className="w-full sm:w-auto" />
          </div>

          <p className="mt-8 text-sm text-muted-foreground text-pretty">
            The fastest way to reach me is email or LinkedIn. Every channel
            below is checked daily.
          </p>
          <ul className="mt-5 space-y-3">
            {socialLinks.map((s) => {
              // mailto:/tel: must stay in the same tab to hand off to the OS.
              const inPlace =
                s.href.startsWith('mailto:') || s.href.startsWith('tel:');
              return (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(inPlace
                    ? {}
                    : { target: '_blank', rel: 'noreferrer' })}
                  className="group flex items-center justify-between border-b border-border py-2 text-sm"
                >
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-mono text-foreground transition-colors group-hover:text-accent">
                    {s.handle}
                  </span>
                </a>
              </li>
              );
            })}
          </ul>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="space-y-4 md:col-span-3"
          noValidate
        >
          {/* Honeypot: hidden from users, catches bots */}
          <div className="hidden" aria-hidden>
            <label>
              Company
              <input name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <Field label="Name" name="name" error={errors.name}>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="input"
              placeholder="Ada Lovelace"
            />
          </Field>

          <Field label="Email" name="email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="input"
              placeholder="ada@example.com"
            />
          </Field>

          <Field label="Message" name="message" error={errors.message}>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="input resize-none"
              placeholder="Tell me about your project…"
            />
          </Field>

          {serverError && (
            <p className="text-sm text-red-500" role="alert">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting' || status === 'success'}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity disabled:opacity-60"
          >
            {status === 'submitting' && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {status === 'success' && <Check className="h-4 w-4" />}
            {status === 'idle' || status === 'error' ? (
              <Send className="h-4 w-4" />
            ) : null}
            {status === 'success'
              ? 'Message sent'
              : status === 'submitting'
                ? 'Sending…'
                : 'Send message'}
          </button>

          {status === 'success' && (
            <p className="text-sm text-muted-foreground">
              Thanks — I’ll be in touch soon.
            </p>
          )}
        </motion.form>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid hsl(var(--input));
          background: hsl(var(--background));
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s;
        }
        :global(.input:focus-visible) {
          border-color: hsl(var(--ring));
          box-shadow: 0 0 0 3px hsl(var(--ring) / 0.15);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
