import {
  about,
  awards,
  browse,
  landing,
  news,
  profile,
  publications,
  reading,
  readingByCategory,
  service,
  teaching,
} from "@/lib/content";
import type { AboutBlock, ReadingItem, TeachingItem } from "@/lib/content";
import { PALETTES } from "@/components/browse/palettes";

// Turns the content files into the Netflix-style pages:
// - /browse: a row of research cards, publications as an "episodes" list
//   (full titles), a short dated news list, and "Continue Watching" cards.
// - /browse/teaching, /browse/service, /browse/reading: the pages behind
//   the "Continue Watching" cards (see the builders at the end of this file).
// To rename the row, change its `title` below. To add rows, add to ROWS.

export interface BrowseLink {
  label: string;
  href: string;
}

/** One card in a row, and the details window that opens when it is clicked. */
export interface BrowseItem {
  id: string;
  /** big text on the card — keep it to a few words */
  poster: string;
  /** heading in the details window, if it differs from `poster` */
  title?: string;
  /** small label above the poster */
  kicker?: string;
  /** background gradient, an index into PALETTES */
  palette: number;
  /** red corner badge, e.g. "New" */
  badge?: string;
  /** show the owner's red initials in the corner, like a streaming "original" */
  original?: boolean;
  /** grey details in the details window, e.g. the year */
  meta?: string[];
  /** main text of the details window (same blocks as the About page) */
  body: AboutBlock[];
  /** "Label: value" lines; values may use inline markdown */
  facts?: { label: string; value: string }[];
  /** buttons at the top of the details window */
  links?: BrowseLink[];
}

export interface BrowseRow {
  id: string;
  title: string;
  /** short label for the top navigation */
  nav: string;
  items: BrowseItem[];
}

/** One "episode" in the publications list. */
export interface PaperEntry {
  id: string;
  /** 1 = newest */
  number: number;
  /** full title, exactly as published */
  title: string;
  /** inline markdown; your name in **bold** */
  authors: string;
  /** "AIxB" */
  venueShort: string;
  /** "2025 IEEE International Conference on AI x Business (AIxB)" */
  venue: string;
  year: number;
  links: BrowseLink[];
  /** e.g. "Best Paper Award" */
  award?: string;
  /** the abstract, one string for each paragraph (empty if there is none) */
  abstract: string[];
  /** red "New" badge on the newest paper */
  isNew: boolean;
  /** tile gradient, an index into PALETTES */
  palette: number;
  /** the details window for this paper (abstract, authors, venue, links) */
  detail: BrowseItem;
}

/** One line of the news list. */
export interface NewsEntry {
  id: string;
  /** "12" */
  day: string;
  /** "Aug" */
  month: string;
  /** "2025" */
  year: string;
  /** inline markdown, links allowed */
  text: string;
  /** red "New" badge */
  isNew: boolean;
}

export interface BillboardData {
  name: string;
  initials: string;
  kicker: string;
  match: string;
  season: string;
  rating: string;
  title: string;
  affiliation: string;
  tagline: string;
  cv?: string;
}

/** How many of the newest news items get the "New" badge. */
const NEW_NEWS = 2;

/** Neighbouring cards (and rows) start on different colors. */
function palette(row: number, index: number): number {
  return (row * 3 + index) % PALETTES.length;
}

/** "2025 IEEE … Conference (AIxB)" → "AIxB". */
function venueShort(venue: string): string {
  const m = /\(([^()]+)\)\s*$/.exec(venue);
  return m ? m[1] : venue.split(/\s+/).slice(0, 2).join(" ");
}

/** "Jingyan Xu" → "JX". */
export function initialsOf(text: string): string {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function researchRow(r: number): BrowseRow {
  return {
    id: "research",
    title: "Research Directions",
    nav: "Research",
    items: profile.researchInterests.map(
      (ri, i): BrowseItem => ({
        id: `research-${i}`,
        poster: ri.title,
        kicker: "Research",
        palette: palette(r, i),
        body: [{ type: "text", body: [ri.description] }],
      }),
    ),
  };
}

const ROWS = [researchRow];

/** How many papers /browse shows; with more, a "See all" button links to /browse/publications. */
export const HOME_PAPERS = 10;

/** Publications in the order of content/publications.ts (newest first), numbered like episodes. */
export function paperEntries(): PaperEntry[] {
  return publications.map((p, i) => {
    const short = venueShort(p.venue);
    const pal = (i + 3) % PALETTES.length;
    const badge = p.award ? "Award" : i === 0 ? "New" : undefined;
    // One string or a list of paragraphs in content/publications.ts.
    const paragraphs = p.abstract === undefined ? [] : ([] as string[]).concat(p.abstract);
    return {
      id: p.id,
      number: i + 1,
      title: p.title,
      authors: p.authors,
      venueShort: short,
      venue: p.venue,
      year: p.year,
      links: p.links ?? [],
      award: p.award,
      abstract: paragraphs,
      isNew: i === 0,
      palette: pal,
      detail: {
        id: `pub-${p.id}`,
        poster: p.title,
        kicker: `${short} ${p.year}`,
        original: true,
        badge,
        palette: pal,
        meta: [String(p.year), short],
        body: paragraphs.length ? [{ type: "section", title: "Abstract", body: paragraphs }] : [],
        facts: [
          { label: "Authors", value: p.authors },
          { label: "Venue", value: p.venue },
          ...(p.award ? [{ label: "Award", value: p.award }] : []),
        ],
        links: p.links,
      },
    };
  });
}

/** News, newest first, split into day / month / year for the list. */
function newsEntries(): NewsEntry[] {
  return [...news]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((n, i) => {
      const d = new Date(`${n.date}T00:00:00Z`);
      const valid = !Number.isNaN(d.getTime());
      return {
        id: `news-${i}-${n.date}`,
        day: valid ? String(d.getUTCDate()) : "",
        month: valid ? d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }) : n.date,
        year: valid ? String(d.getUTCFullYear()) : "",
        text: n.text,
        isNew: i < NEW_NEWS,
      };
    });
}

/** The banner's "More Info" window: bio, research overview and contact. */
function overviewItem(): BrowseItem {
  return {
    id: "overview",
    poster: landing.wordmark,
    kicker: browse.billboard.kicker,
    original: true,
    palette: 0,
    meta: [profile.title, profile.affiliation],
    body: [
      { type: "text", body: [...profile.bio, ...(profile.researchOverview ?? [])] },
      {
        type: "section",
        title: "Research interests",
        list: true,
        body: profile.researchInterests.map((ri) => `**${ri.title}** — ${ri.description}`),
      },
    ],
    facts: [
      { label: "Affiliation", value: profile.affiliation },
      ...(profile.location ? [{ label: "Location", value: profile.location }] : []),
      { label: "Email", value: `[${profile.email}](mailto:${profile.email})` },
    ],
    links: [
      ...(profile.cv ? [{ label: "CV", href: profile.cv }] : []),
      ...profile.socials.map((s) => ({ label: s.label, href: s.href })),
    ],
  };
}

/** The "About me" window, opened from the top navigation. */
function aboutItem(): BrowseItem {
  return {
    id: "about",
    poster: "About Me",
    kicker: "Behind the Scenes",
    palette: 4,
    body: about.blocks,
  };
}

export function buildBrowse() {
  const initials = initialsOf(landing.wordmark);
  const billboard: BillboardData = {
    name: landing.wordmark,
    initials,
    ...browse.billboard,
    title: profile.title,
    affiliation: profile.affiliation,
    tagline: profile.tagline,
    cv: profile.cv,
  };
  return {
    rows: ROWS.map((build, r) => build(r)).filter((row) => row.items.length > 0),
    papers: paperEntries(),
    news: newsEntries(),
    continueItems: continueItems(),
    overview: overviewItem(),
    about: aboutItem(),
    billboard,
  };
}

// ── "Continue Watching" and the pages behind it ─────────────────

/** One card in the "Continue Watching" row. */
export interface ContinueItem {
  href: string;
  poster: string;
  /** small label, e.g. "6 terms" */
  kicker: string;
  palette: number;
  /** red "partly watched" bar, 0–1 (decoration) */
  progress: number;
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

/** Cards for the pages that have content; a page with no content gets no card. */
function continueItems(): ContinueItem[] {
  const items: ContinueItem[] = [];
  if (teaching.length) {
    items.push({
      href: "/browse/teaching",
      poster: "Teaching",
      kicker: plural(teaching.length, "term"),
      palette: 2,
      progress: 0.65,
    });
  }
  if (service.length + awards.length) {
    items.push({
      href: "/browse/service",
      poster: "Service & Awards",
      kicker: plural(service.length + awards.length, "credit"),
      palette: 3,
      progress: 0.4,
    });
  }
  if (reading.length) {
    items.push({
      href: "/browse/reading",
      poster: "Reading List",
      kicker: plural(reading.length, "book"),
      palette: 5,
      progress: 0.8,
    });
  }
  return items;
}

/** One term on the /browse/teaching timeline. */
export interface TeachingEntry {
  id: string;
  term: string;
  course: string;
  role: string;
  institution?: string;
  /** "Season" of this course, counted from its first term (S1 = oldest) */
  season: number;
  /** true when the role is not an assistant role (e.g. Co-Lecturer) */
  lead: boolean;
}

/** Teaching, newest first (as in content/teaching.ts), with a season number per course. */
export function teachingTimeline() {
  const seasons = new Map<TeachingItem, number>();
  const counts = new Map<string, number>();
  for (const t of [...teaching].reverse()) {
    const n = (counts.get(t.course) ?? 0) + 1;
    counts.set(t.course, n);
    seasons.set(t, n);
  }
  const entries: TeachingEntry[] = teaching.map((t, i) => ({
    id: `teaching-${i}`,
    term: t.term,
    course: t.course,
    role: t.role,
    institution: t.institution,
    season: seasons.get(t) ?? 1,
    lead: !/assistant/i.test(t.role),
  }));
  const span = teaching.length
    ? teaching.length === 1
      ? teaching[0].term
      : `${teaching[teaching.length - 1].term} – ${teaching[0].term}`
    : "";
  return {
    entries,
    meta: [plural(counts.size, "course"), plural(teaching.length, "term"), span].filter(Boolean),
  };
}

/** One credit on /browse/service: "ICTAI: 2025, 2026" → name "ICTAI", detail "2025, 2026". */
export interface ServiceCredit {
  id: string;
  role: string;
  name: string;
  detail?: string;
  years: string;
}

export interface AwardEntry {
  id: string;
  title: string;
  org?: string;
  year: number;
}

/** "2023-2025" → [2023, 2025]; "2025" → [2025, 2025]. Missing years sort last. */
function yearSpan(text: string): [number, number] {
  const years = (text.match(/\d{4}/g) ?? []).map(Number);
  return years.length ? [Math.min(...years), Math.max(...years)] : [0, 0];
}

/** Newest first: the latest end year first; on a tie, the later start first. */
function byNewest(a: string, b: string): number {
  const [aStart, aEnd] = yearSpan(a);
  const [bStart, bEnd] = yearSpan(b);
  return bEnd - aEnd || bStart - aStart;
}

/** Service and awards, each sorted newest first (the numbers on the page follow this order). */
export function creditsData() {
  const sortedService = [...service].sort((a, b) => byNewest(a.year, b.year));
  const sortedAwards = [...awards].sort((a, b) => b.year - a.year);
  const credits: ServiceCredit[] = sortedService.map((s, i) => {
    const [name, ...rest] = s.venue.split(":");
    return {
      id: `service-${i}`,
      role: s.role,
      name: name.trim(),
      detail: rest.join(":").trim() || undefined,
      years: s.year,
    };
  });
  const awardList: AwardEntry[] = sortedAwards.map((a, i) => ({
    id: `award-${i}`,
    title: a.title,
    org: a.org,
    year: a.year,
  }));
  return { awards: awardList, credits };
}

/** One book on the /browse/reading shelf. */
export interface ShelfBook {
  id: string;
  title: string;
  author?: string;
  href?: string;
  note?: string;
  /** rating out of 5 → "% Match" */
  match?: number;
  /** "Now" for "Currently reading" */
  badge?: string;
  palette: number;
}

/** Books grouped by category, in the order of content/reading.ts. */
export function readingShelf() {
  const groups = readingByCategory().map(([category, items], g) => ({
    category,
    books: items.map(
      (b: ReadingItem, i): ShelfBook => ({
        id: `book-${g}-${i}`,
        title: b.title,
        author: b.author,
        href: b.href,
        note: b.note,
        match: b.rating ? Math.round((b.rating / 5) * 100) : undefined,
        badge: category.toLowerCase() === "currently reading" ? "Now" : undefined,
        palette: palette(g, i),
      }),
    ),
  }));
  return {
    groups,
    meta: [plural(reading.length, "book"), plural(groups.length, "shelf", "shelves")],
  };
}
