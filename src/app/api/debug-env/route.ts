/**
 * TEMPORARY diagnostic endpoint. Reports whether the contact-form environment
 * variables are visible to this deployment — names, presence and lengths only.
 *
 * It never returns a value, so no secret can leak through it. Even so, DELETE
 * THIS FILE once the contact form is confirmed working: a public endpoint
 * describing your configuration is not something to leave running.
 */

// Must not be prerendered — a static route would capture build-time env and
// report stale results.
export const dynamic = 'force-dynamic';

const EXPECTED = [
  'RESEND_API_KEY',
  'CONTACT_TO_EMAIL',
  'CONTACT_FROM_EMAIL',
  'NEXT_PUBLIC_SITE_URL',
] as const;

export function GET(): Response {
  const checks = Object.fromEntries(
    EXPECTED.map((name) => {
      const raw = process.env[name];
      if (raw === undefined) return [name, { present: false }];
      return [
        name,
        {
          present: true,
          length: raw.length,
          // The failure mode Vercel does not protect you from: dotenv trims
          // surrounding whitespace locally, Vercel stores it verbatim.
          hasSurroundingWhitespace: raw !== raw.trim(),
          isEmpty: raw.trim() === '',
        },
      ];
    }),
  );

  return Response.json({
    // Which Vercel environment actually served this request.
    vercelEnv: process.env.VERCEL_ENV ?? '(not on Vercel)',
    nodeEnv: process.env.NODE_ENV,
    checks,
    // Surfaces typos: a var named RESEND_KEY or CONTACT_EMAIL shows up here
    // even though the expected-name check above reports it missing.
    similarlyNamedVars: Object.keys(process.env)
      .filter((k) => /RESEND|CONTACT|SITE_URL/i.test(k))
      .sort(),
  });
}
