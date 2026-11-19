// Shared content types for every page of the site.

export interface SocialLink {
  label: string;
  href: string;
  /** optional short handle, e.g. "@name" */
  handle?: string;
}

export interface ResearchInterest {
  title: string;
  description: string;
}

export interface Profile {
  name: string;
  /** e.g. "Vera" — shown in parentheses */
  nickname?: string;
  /** how to pronounce the name */
  pronunciation?: string;
  /** tooltip shown on hover over the name in the masthead (with a speaker cue) */
  nameNote?: string;
  title: string;
  affiliation: string;
  /** small logo shown next to the affiliation in the masthead, e.g. "/logos/fordham.png" */
  affiliationLogo?: string;
  location?: string;
  /** short one-liner under the name */
  tagline: string;
  /** longer markdown-ish bio paragraphs */
  bio: string[];
  researchInterests: ResearchInterest[];
  /** short phrase for the intro line, e.g. "safety in AI" */
  researchArea?: string;
  /** paragraph(s) expanding on the research directions, shown in the banner's "More Info" window */
  researchOverview?: string[];
  /** message to prospective students; omit to hide */
  callForStudents?: string;
  email: string;
  socials: SocialLink[];
  /** path under /public, e.g. "/cv.pdf" */
  cv?: string;
  /** path under /public, e.g. "/profile.jpg" */
  photo?: string;
}

export interface NewsItem {
  /** ISO date, e.g. "2026-05-01" */
  date: string;
  /** plain text; may contain inline links as [text](url) */
  text: string;
}

export interface PublicationLink {
  label: string; // PDF, Code, Data, Website, arXiv, Slides, Video
  href: string;
}

export interface Publication {
  id: string; // short unique slug
  title: string;
  authors: string; // use **You** to bold your name
  venue: string; // e.g. "USENIX Security 2026"
  year: number;
  links?: PublicationLink[];
  award?: string; // e.g. "Distinguished Paper Award"
  abstract?: string | string[]; // a list shows as separate paragraphs
}

export interface Award {
  year: number;
  title: string;
  org?: string;
}

export interface ServiceItem {
  year: string; // allow ranges like "2024–2025"
  role: string; // e.g. "Program Committee"
  venue: string;
}

export interface TeachingItem {
  term: string; // e.g. "Fall 2025"
  course: string;
  role: string; // e.g. "Teaching Assistant"
  institution?: string;
}

// ── About me page ─────────────────────────────────────────────
// The About page is an ordered list of blocks. Add and reorder them
// freely — text, videos, and titled sections can appear in any order
// and any number of times (e.g. text → videos → text → videos → …).

/** Plain paragraphs (no heading). Inline markdown supported. */
export interface AboutTextBlock {
  type: "text";
  body: string[];
}

/** A row of embedded YouTube players. */
export interface AboutVideosBlock {
  type: "videos";
  /** YouTube share/watch URLs */
  urls: string[];
}

/** A titled block; set `list: true` to render `body` as bullets. */
export interface AboutSectionBlock {
  type: "section";
  title: string;
  body: string[];
  list?: boolean;
}

export type AboutBlock = AboutTextBlock | AboutVideosBlock | AboutSectionBlock;

export interface AboutContent {
  /** ordered content blocks, rendered top to bottom */
  blocks: AboutBlock[];
}

// ── Landing page (name intro + "Who's watching?") ─────────────

/** One tile on the "Who's watching?" screen. All tiles open the same site. */
export interface ViewerProfile {
  name: string;
  /** draw sunglasses on the avatar */
  sunglasses?: boolean;
  /**
   * Background picture (GIF, meme, photo) for the big banner on /browse while
   * this profile is picked. `src` is a path under /public or a full URL.
   * Without it the banner shows a plain red glow.
   */
  banner?: { src: string; alt: string };
}

export interface LandingContent {
  /** big red name in the intro and in the top-left corner */
  wordmark: string;
  profiles: ViewerProfile[];
  /** where a profile tile goes */
  profileHref: string;
  /**
   * How the profile photo is cropped into the square avatar
   * (CSS background-size / background-position). Tuned for profile.jpg.
   */
  avatarCrop: { size: string; position: string };
  /** Sunglasses position over the avatar, in % of the avatar. Tuned for profile.jpg. */
  sunglasses: { left: string; top: string; width: string };
}

// ── Netflix-style home page (/browse) ─────────────────────────

export interface BrowseContent {
  billboard: {
    /** small label above the name, e.g. "Research Series" */
    kicker: string;
    /** green text, e.g. "99% Match" */
    match: string;
    /** e.g. "Season 3" */
    season: string;
    /** small boxed "rating", e.g. "PhD" */
    rating: string;
  };
}

// ── Reading list page ─────────────────────────────────────────
export interface ReadingItem {
  title: string;
  author?: string;
  /** link to the book / paper / article */
  href?: string;
  /** grouping bucket, e.g. "Currently reading", "2026", "Papers" */
  category?: string;
  /** a one-line take; inline markdown supported */
  note?: string;
  /** optional rating out of 5 */
  rating?: number;
}
