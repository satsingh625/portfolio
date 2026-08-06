'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Send, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/lib/site.config';
import type { ChatMessage } from '@/types';
import { cn } from '@/lib/utils';

const SUGGESTIONS = [
  'Which monitoring tools do you use?',
  'Tell me about a tough incident you resolved.',
  'Are you open to 24/7 shift rotations?',
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hi! I'm ${siteConfig.name}'s AI assistant. Ask me anything about their experience, skills, or projects.`,
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('open-chatbot', onOpen);
    return () => window.removeEventListener('open-chatbot', onOpen);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || streaming) return;

    const next: ChatMessage[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setStreaming(true);
    setMessages((m) => [...m, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Request failed');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      // Stream tokens into the last (assistant) message.
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: 'assistant', content: acc };
          return copy;
        });
      }
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Something went wrong.';
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: 'assistant',
          content: `Sorry — ${msg} You can reach out via the contact page instead.`,
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        aria-label="Open AI assistant"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-foreground text-background shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[70] flex h-[30rem] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            role="dialog"
            aria-label="AI assistant"
          >
            <header className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-medium">AI Assistant</p>
                <p className="text-xs text-muted-foreground">
                  Answers from the resume
                </p>
              </div>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex',
                    m.role === 'user' ? 'justify-end' : 'justify-start',
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm',
                      m.role === 'user'
                        ? 'bg-foreground text-background'
                        : 'bg-muted text-foreground',
                    )}
                  >
                    {m.content ||
                      (streaming && i === messages.length - 1 ? (
                        <span className="inline-flex gap-1">
                          <Dot /> <Dot delay={0.15} /> <Dot delay={0.3} />
                        </span>
                      ) : (
                        ''
                      ))}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="space-y-1.5 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full rounded-lg border border-border px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:bg-muted"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about experience or projects…"
                aria-label="Message"
                className="h-9 flex-1 rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                aria-label="Send message"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-background transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 0.9, repeat: Infinity, delay }}
    />
  );
}
