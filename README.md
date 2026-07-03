# Personal Website — terminal + classic

A terminal-first personal/academic website with a "classic" webpage fallback.
Both views read from one shared content source, so you only edit your info once.

- **Terminal** (`/`) — interactive CLI: `help`, `about`, `publications`, `cat pub <id>`, `news`, `awards`, `service`, `teaching`, `contact`, `cv`, `theme`, `gui`.
- **Classic** (`/classic`) — a normal scrollable academic page (about, research, news, publications, awards, service, teaching).

Built with Next.js (App Router), TypeScript, and Tailwind CSS v4.

## Edit your content

Everything lives in [`content/`](content/) — these are the only files you normally touch:

| File | What it holds |
|------|---------------|
| `content/profile.ts` | name, title, bio, research interests, socials, email, CV path, photo |
| `content/news.ts` | news items (newest first) |
| `content/publications.ts` | papers; `id` is used by `cat pub <id>` in the terminal |
| `content/awards.ts` | awards & honors |
| `content/service.ts` | program committees, reviewing, etc. |
| `content/teaching.ts` | courses |

Drop a `cv.pdf` and a square `profile.jpg` into [`public/`](public/) (paths are set in `content/profile.ts`).

Inline formatting in `bio`, `news`, and `authors`: `**bold**`, `*italic*`, `[text](url)`.

## Develop

```bash
npm run dev      # http://localhost:3000
npm run build    # production build + type check
npm run lint
```

## Customize the terminal

- Commands: [`components/terminal/commands.tsx`](components/terminal/commands.tsx)
- Behavior (history, tab-complete, themes): [`components/terminal/Terminal.tsx`](components/terminal/Terminal.tsx)
- Color themes (`matrix`, `amber`, `mono`, `dracula`, `light`): the `.term-root[data-theme=…]` blocks in [`app/globals.css`](app/globals.css). Switch live with `theme <name>`.

## Deploy

**Vercel (recommended):** push to GitHub, import the repo at vercel.com — zero config.

**GitHub Pages (static export):** add `output: "export"` to `next.config.ts`, run `npm run build`, and publish the generated `out/` directory.
