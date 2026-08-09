import { siteConfig } from '@/lib/site.config';

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  // Honeypot field — real users leave this empty.
  company?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request): Promise<Response> {
  let data: ContactPayload;
  try {
    data = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Spam trap: bots fill hidden fields.
  if (data.company) {
    return Response.json({ ok: true });
  }

  const name = (data.name ?? '').trim();
  const email = (data.email ?? '').trim();
  const message = (data.message ?? '').trim();

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email.';
  if (message.length < 10)
    errors.message = 'Message should be at least 10 characters.';

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 422 });
  }

  // If a Resend key is configured, send an email. Otherwise log for local dev.
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
  // Resend's shared sender works without domain verification. Once a domain is
  // verified, set CONTACT_FROM_EMAIL to an address on it for better deliverability.
  const from =
    process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>';

  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `New message from ${name}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      });
      if (!res.ok) {
        // Log the provider's reason. Resend explains rejections in the body
        // (bad key, unverified sender, restricted recipient) and without this
        // every failure looks identical in the logs.
        const detail = await res.text().catch(() => '<unreadable body>');
        console.error(
          `[contact] Resend rejected the send (HTTP ${res.status}):`,
          detail,
        );
        throw new Error('email provider error');
      }
    } catch {
      return Response.json(
        { error: 'Could not send your message. Please email me directly.' },
        { status: 502 },
      );
    }
  } else if (process.env.NODE_ENV === 'production') {
    // Never report success for a message that went nowhere. Locally the console
    // log below is a useful fallback; in production it is a silent drop.
    console.error(
      '[contact] RESEND_API_KEY is not set — submission dropped, sender was told it failed.',
    );
    return Response.json(
      {
        error:
          'The contact form is unavailable right now. Please email me directly.',
      },
      { status: 503 },
    );
  } else {
    console.info('[contact] submission (no email provider configured):', {
      name,
      email,
      message,
    });
  }

  return Response.json({ ok: true });
}
