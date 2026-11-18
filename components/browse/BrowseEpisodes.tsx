"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { display } from "@/components/landing/fonts";
import type { BrowseItem, PaperEntry } from "@/lib/browse";
import { renderInline } from "@/lib/format";
import DetailsModal from "./DetailsModal";
import { paletteStyle } from "./palettes";

const link = "text-nf-fg underline decoration-current/40 underline-offset-2 hover:decoration-current";

/**
 * Publications as an "episodes" list, like the episode list of a series on a
 * streaming site: number, small tile, full title, then the details below.
 * Paper titles stay exactly as published, so readers can recognize and search them.
 *
 * Hover a row: it lights up and the tile grows, like a Netflix episode.
 * Click it: a details window opens with the abstract (DetailsModal).
 * `limit` shows only the newest papers; with more, a "See all" link appears.
 * A link to "#pub-<id>" (from search) opens that paper's window.
 */
export default function BrowseEpisodes({
  items,
  initials,
  limit,
  seeAllHref,
  heading = true,
}: {
  items: PaperEntry[];
  initials: string;
  limit?: number;
  seeAllHref?: string;
  /** false on /browse/publications, where the page banner is the heading */
  heading?: boolean;
}) {
  const [open, setOpen] = useState<BrowseItem | null>(null);
  const shown = limit ? items.slice(0, limit) : items;
  const hasMore = shown.length < items.length;

  // Open a paper's window from a "#pub-<id>" link (search results use these).
  useEffect(() => {
    const fromHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const hit = items.find((p) => p.detail.id === hash);
      if (hit) {
        setOpen(hit.detail);
        history.replaceState(null, "", window.location.pathname);
      }
    };
    const id = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <section id="publications" aria-labelledby={heading ? "publications-title" : undefined} className="scroll-mt-24 px-[4%]">
      {heading ? (
        <div className="flex max-w-4xl items-baseline justify-between gap-4">
          <h2 id="publications-title" className="text-[clamp(1.05rem,1.4vw,1.45rem)] font-bold text-nf-fg-2">
            Publications
          </h2>
          <span className="text-sm text-nf-faint">
            {items.length} {items.length === 1 ? "paper" : "papers"}
          </span>
        </div>
      ) : null}

      <ol className="mt-2 flex max-w-4xl flex-col divide-y divide-nf-line border-t border-nf-line">
        {shown.map((p) => (
          <li
            key={p.id}
            onClick={(e) => {
              // The link buttons keep working; anywhere else opens the window.
              if (!(e.target as HTMLElement).closest("a")) setOpen(p.detail);
            }}
            className="group -mx-3 flex cursor-pointer items-start gap-4 rounded-md px-3 py-5 transition-colors hover:bg-nf-hover md:gap-6"
          >
            {/* episode number */}
            <span
              aria-hidden="true"
              className={`${display.className} hidden w-6 shrink-0 pt-5 text-center text-3xl leading-none text-nf-faint sm:block`}
            >
              {p.number}
            </span>

            {/* small tile with the venue, like an episode thumbnail; it grows on hover */}
            <div
              aria-hidden="true"
              className="relative aspect-video w-24 shrink-0 overflow-hidden rounded shadow-md shadow-black/30 transition-transform duration-300 ease-out group-hover:scale-[1.08] sm:w-32 md:w-40"
              style={paletteStyle(p.palette)}
            >
              <span className={`${display.className} absolute left-2 top-1.5 text-sm leading-none text-[#e50914] md:text-base`}>
                {initials}
              </span>
              {p.isNew || p.award ? (
                <span className="absolute right-1.5 top-0 rounded-b bg-[#e50914] px-1 pb-0.5 pt-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-white">
                  {p.award ? "Award" : "New"}
                </span>
              ) : null}
              <span className={`${display.className} absolute bottom-1.5 left-2 right-2 text-lg leading-none text-white md:text-2xl`}>
                {p.venueShort}
              </span>
              {/* "open" icon, shown on hover */}
              <span className="absolute inset-0 grid place-items-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="grid size-9 place-items-center rounded-full border-2 border-white bg-black/40">
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="white">
                    <path d="M7 4.5v15l12-7.5z" />
                  </svg>
                </span>
              </span>
            </div>

            {/* title, authors, venue, links */}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-semibold leading-snug text-nf-fg">
                  {/* the button makes the row reachable by keyboard */}
                  <button
                    type="button"
                    onClick={() => setOpen(p.detail)}
                    className="text-left underline-offset-2 hover:underline focus:outline-none focus-visible:underline"
                  >
                    {p.title}
                  </button>
                </h3>
                {/* phones: the venue line below already starts with the year */}
                <span className="hidden shrink-0 text-sm text-nf-muted sm:inline">{p.year}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-nf-muted">{renderInline(p.authors, link)}</p>
              <p className="text-sm italic leading-relaxed text-nf-faint">{p.venue}</p>
              {p.award ? <p className="mt-1 text-sm text-nf-fg-2">★ {p.award}</p> : null}
              {p.links.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.links.map((l, i) => (
                    <a
                      key={`${l.href}-${i}`}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`rounded px-3 py-1 text-xs font-semibold transition-colors ${
                        i === 0
                          ? "bg-nf-inverse-bg text-nf-inverse-fg hover:opacity-80"
                          : "bg-[rgba(109,109,110,0.7)] text-white hover:bg-[rgba(109,109,110,0.45)]"
                      }`}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      {hasMore && seeAllHref ? (
        <Link
          href={seeAllHref}
          className="mt-3 inline-block rounded border border-nf-line-strong px-4 py-1.5 text-sm text-nf-fg-2 transition-colors hover:border-nf-fg hover:text-nf-fg"
        >
          See all {items.length} publications
        </Link>
      ) : null}

      {open ? (
        <DetailsModal key={open.id} item={open} initials={initials} onClose={() => setOpen(null)} />
      ) : null}
    </section>
  );
}
