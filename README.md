# Personal Website — Netflix-style

A personal academic website with a streaming-service look.
Every page reads from one shared content source, so you edit your info once.

- **Landing** (`/`) — a short red name intro, then a "Who's watching?" screen. Both profiles
  (Horatio and Cooler Horatio) open the same home page; only the avatar in the top bar and the
  banner clip change.
- **Home** (`/browse`) — a big banner with social icons, "View CV" and "More Info", a sideways row
  of research cards, publications as an "episodes" list with full titles, a short dated news list,
  and a "Continue Watching for <profile>" row. Click a research card to open its details window;
  "About me" in the top bar opens the about window.
- **Continue Watching pages** — each with its own layout:
  - `/browse/teaching` — a timeline of terms ("seasons" of each course)
  - `/browse/service` — award cards, then service as end credits
  - `/browse/reading` — a bookshelf of poster tiles, one shelf per category

Built with Next.js (App Router), TypeScript and Tailwind CSS v4, as a static export.

## Edit your content

Everything lives in [`content/`](content/) — these are the only files you normally touch:

| File | What it holds |
|------|---------------|
| `content/profile.ts` | name, title, bio, research interests, socials, email, CV path, photo |
| `content/news.ts` | news items |
| `content/publications.ts` | papers, shown with their full titles (an optional `abstract` shows under each paper) |
| `content/awards.ts` | awards & honors (`/browse/service`) |
| `content/service.ts` | program committees, organizing, etc. (`/browse/service`) |
| `content/teaching.ts` | courses, newest first (`/browse/teaching`) |
| `content/reading.ts` | reading list, grouped by `category` (`/browse/reading`) |
| `content/about.ts` | the "About me" text, videos and sections |
| `content/landing.ts` | intro name, profile names, each profile's banner picture on `/browse`, avatar crop, sunglasses position |
| `content/browse.ts` | the small labels on the home page banner |

Drop a `CV.pdf` and a `profile.jpg` into [`public/`](public/) (paths are set in `content/profile.ts`).

Inline formatting in text fields: `**bold**`, `*italic*`, `[text](url)`.

To rename or reorder the rows on the home page, edit [`lib/browse.ts`](lib/browse.ts).

## Develop

```bash
npm run dev      # http://localhost:3000  (open /?intro to replay the intro)
npm run build    # static export into out/ + type check
npm run lint
```

## Deploy

The site is a static export (`output: "export"` in `next.config.ts`).
Every push to `main` builds it and publishes `out/` to GitHub Pages through
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
