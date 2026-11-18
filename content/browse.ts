import type { BrowseContent } from "./types";

// ─────────────────────────────────────────────────────────────
// EDIT ME — the Netflix-style home page at /browse.
// The rows (research, publications, news, teaching, service, reading)
// come from the other content files. These strings only dress up the
// big banner at the top of the page.
// ─────────────────────────────────────────────────────────────

export const browse: BrowseContent = {
  billboard: {
    kicker: "Research Series", // small label above your name
    match: "99% Match", // green text
    season: "Season 3", // third year of the PhD
    rating: "PhD", // the small boxed "rating"
    // The banner's background picture is set per profile: see `banner` in content/landing.ts.
  },
};
