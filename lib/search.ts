import { awards, news, profile, publications, reading, service, teaching } from "@/lib/content";
import { stripInline } from "@/lib/format";

// Site search for the top bar (BrowseNav). Everything is built from
// content/*.ts at load time; searching happens in the browser, as you type.

export type SearchType = "Publication" | "Research" | "News" | "Teaching" | "Service" | "Award" | "Book";

export interface SearchEntry {
  id: string;
  type: SearchType;
  title: string;
  /** one short grey line under the title */
  subtitle?: string;
  /** where a click goes; "/browse#pub-…" and "/browse#research-…" open a window */
  href: string;
  /** lower-case text that the query is matched against */
  haystack: string;
  /** lower-case title, for ranking title matches first */
  titleKey: string;
}

function entry(e: Omit<SearchEntry, "haystack" | "titleKey">, ...extra: (string | undefined)[]): SearchEntry {
  const parts = [e.title, e.subtitle, ...extra].filter(Boolean).map((s) => stripInline(s as string));
  return { ...e, haystack: parts.join(" ").toLowerCase(), titleKey: e.title.toLowerCase() };
}

/** Every searchable thing on the site. */
export function buildSearchIndex(): SearchEntry[] {
  return [
    ...publications.map((p) =>
      entry(
        {
          id: `pub-${p.id}`,
          type: "Publication",
          title: p.title,
          subtitle: `${p.venue}`,
          href: `/browse#pub-${p.id}`,
        },
        p.authors,
        ...([] as string[]).concat(p.abstract ?? []),
        String(p.year),
      ),
    ),
    ...profile.researchInterests.map((r, i) =>
      entry(
        { id: `research-${i}`, type: "Research", title: r.title, href: `/browse#research-${i}` },
        r.description,
      ),
    ),
    ...news.map((n, i) =>
      entry({
        id: `news-${i}`,
        type: "News",
        title: stripInline(n.text),
        subtitle: n.date,
        href: "/browse#news",
      }),
    ),
    ...teaching.map((t, i) =>
      entry(
        {
          id: `teaching-${i}`,
          type: "Teaching",
          title: t.course,
          subtitle: `${t.term} · ${t.role}`,
          href: "/browse/teaching",
        },
        t.institution,
      ),
    ),
    ...service.map((s, i) =>
      entry({
        id: `service-${i}`,
        type: "Service",
        title: s.venue.split(":")[0].trim(),
        subtitle: `${s.role} · ${s.year}`,
        href: "/browse/service",
      }, s.venue),
    ),
    ...awards.map((a, i) =>
      entry(
        { id: `award-${i}`, type: "Award", title: a.title, subtitle: `${a.year}`, href: "/browse/service" },
        a.org,
      ),
    ),
    ...reading.map((b, i) =>
      entry(
        { id: `book-${i}`, type: "Book", title: b.title, subtitle: b.author, href: "/browse/reading" },
        b.category,
        b.note,
      ),
    ),
  ];
}

/**
 * Entries that contain every word of the query (any order, any case).
 * Title matches come first; at most `limit` results.
 */
export function searchSite(index: SearchEntry[], query: string, limit = 8): SearchEntry[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  return index
    .filter((e) => words.every((w) => e.haystack.includes(w)))
    .map((e) => ({ e, score: words.filter((w) => e.titleKey.includes(w)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.e);
}
