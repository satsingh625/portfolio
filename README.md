# Portfolio

A production-ready personal portfolio for **Satyam Singh — Technical Support & Observability Engineer**, built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Minimalist and precise, with a design language inspired by Apple and Vercel: monochrome base, hairline borders, generous whitespace, Geist typography, and restrained motion.

## Features

- **Responsive layout** with a mobile menu and fluid type scale
- **Dark / light mode** via `next-themes` and CSS-variable design tokens (flash-free)
- **Animated hero** with a staggered name reveal and ambient grid + glow
- **About, skills, experience timeline, selected work, education**
- **Selected work** as situation → action → result case studies (optional GitHub/demo links)
- **Resume download** (`/resume.pdf`)
- **Blog** with a lightweight markdown renderer and per-post SEO
- **Contact form** with client + server validation, honeypot spam trap, and optional email delivery
- **GitHub activity** component pulled live from the GitHub REST API (included but not mounted on the homepage by default — add it once your GitHub has public repos)
- **Command palette** (`Ctrl`/`⌘` + `K`) for navigation and actions
- **Interactive terminal** section with real commands (`help`, `projects`, `skills`, …)
- **Smooth page transitions** and a tasteful first-load animation
- **SEO**: per-page metadata, Open Graph + Twitter cards, `sitemap.xml`, `robots.txt`, web manifest, and JSON-LD structured data (Person, ItemList, BlogPosting)
- **Accessibility**: skip link, visible keyboard focus, ARIA labels, semantic landmarks, and full `prefers-reduced-motion` support
- **Performance**: `next/font`, static generation, security headers — built to score 95+ on Lighthouse

## Tech stack

| Area        | Choice                                   |
| ----------- | ---------------------------------------- |
| Framework   | Next.js 15 (App Router, RSC)             |
| Language    | TypeScript (strict)                      |
| Styling     | Tailwind CSS + semantic CSS variables    |
| Animation   | Framer Motion                            |
| Icons       | lucide-react                             |
| Theme       | next-themes                              |
| Deployment  | Vercel                                   |

## Getting started

### Prerequisites

- Node.js **18.18+** (20+ recommended)
- npm, pnpm, or yarn

### Install & run

```bash
npm install
cp .env.example .env.local   # fill in the values you want
npm run dev
```

Open <http://localhost:3000>.

### Scripts

```bash
npm run dev        # start the dev server
npm run build      # production build
npm run start      # run the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run format     # prettier
```

## Configuration

### 1. Make it yours

Almost everything is data-driven. Edit these files:

- `src/lib/site.config.ts` — name, role, tagline, email, socials, nav, GitHub username
- `src/lib/data.ts` — skills, experience, selected work, education, about copy
- `src/content/blog.ts` — blog posts
- `public/resume.pdf` — replace with your resume
- `public/og.png`, `public/icon.png`, `public/favicon.svg` — replace the brand marks

Because the pages, command palette, and SEO structured data all read from the same data, changing it in one place updates the whole site.

### 2. Environment variables

Copy `.env.example` to `.env.local` and set what you need. Everything degrades gracefully when unset.

| Variable                      | Required | Purpose                                                                 |
| ----------------------------- | :------: | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_GITHUB_USERNAME` |    –     | Username for the GitHub activity section (defaults to config value).    |
| `GITHUB_TOKEN`                |    –     | Optional PAT to raise GitHub API rate limits.                           |
| `CONTACT_TO_EMAIL`            |    –     | Where contact submissions are sent.                                     |
| `RESEND_API_KEY`              |    –     | Enables real email delivery via Resend. If unset, submissions are logged. |
| `NEXT_PUBLIC_SITE_URL`        |    ✓\*   | Canonical URL for metadata, sitemap, and Open Graph. \*Set in production. |

### 3. GitHub activity section (optional)

The `GitHubActivity` component (`src/components/sections/GitHubActivity.tsx`) fetches live stats from the GitHub API. It's intentionally left off the homepage and work page so the site never shows an empty section. Once your GitHub profile has public repositories worth showing, import it into `src/app/page.tsx` and set `NEXT_PUBLIC_GITHUB_USERNAME`.

### 4. Contact form email (optional)

The `/api/contact` route validates input and, if `RESEND_API_KEY` is set, sends mail via [Resend](https://resend.com). Otherwise it logs submissions to the server console — handy for local development. Swap in any provider by editing that one route.

## Project structure

```
src/
├── app/                      # App Router: pages, layouts, API routes, SEO files
│   ├── api/
│   │   ├── contact/route.ts  # validated contact endpoint
│   │   └── github/route.ts   # cached GitHub activity
│   ├── blog/[slug]/page.tsx  # dynamic blog post (SSG)
│   ├── about | projects | blog | contact
│   ├── layout.tsx            # fonts, metadata, providers, global widgets
│   ├── sitemap.ts | robots.ts | manifest.ts
│   ├── loading.tsx | error.tsx | not-found.tsx
│   └── globals.css           # design tokens + prose styles
├── components/
│   ├── layout/               # Navbar, Footer, PageTransition
│   ├── sections/             # Hero, About, Skills, Experience, Projects, …
│   ├── ui/                   # Button, Badge, Card, CommandPalette, …
│   └── providers/            # ThemeProvider
├── content/blog.ts           # blog data
├── hooks/                    # useMounted, useHotkey
├── lib/                      # site config, data, seo, github, utils
└── types/                    # shared TypeScript types
```

## Design system

Colors are defined once as HSL CSS variables in `globals.css` for both themes, then exposed to Tailwind as semantic tokens (`bg-background`, `text-muted-foreground`, `border-border`, `bg-accent`, …). Components never hard-code a color — reskinning the whole site is a matter of editing the `:root` and `.dark` blocks. To change the accent, edit `--accent` / `--ring`.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import it at <https://vercel.com/new>.
3. Add your environment variables in **Project → Settings → Environment Variables** (at minimum `NEXT_PUBLIC_SITE_URL`).
4. Deploy. Vercel auto-detects Next.js — no extra build config needed. `vercel.json` adds security headers and cache rules.

### Deploy from the CLI

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

Any other Node host works too: run `npm run build` then `npm run start`.

## Accessibility & performance notes

- All interactive elements are keyboard reachable with visible focus rings.
- `prefers-reduced-motion` disables non-essential animation globally and in Framer Motion.
- Images/fonts are optimized via `next/font` and Next's image pipeline.
- GitHub data is cached for an hour.
- Run `npx lighthouse http://localhost:3000 --view` against a production build (`npm run build && npm run start`) to verify scores.

## License

MIT — use it, fork it, make it yours.
