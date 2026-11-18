import { display } from "@/components/landing/fonts";
import type { PaperEntry } from "@/lib/browse";
import { renderInline } from "@/lib/format";
import { paletteStyle } from "./palettes";

const link = "text-white underline decoration-white/40 underline-offset-2 hover:decoration-white";

/**
 * Publications as an "episodes" list, like the episode list of a series on a
 * streaming site: number, small tile, full title, then the details below.
 * Paper titles stay exactly as published, so readers can recognize and search them.
 */
export default function BrowseEpisodes({
  items,
  initials,
}: {
  items: PaperEntry[];
  initials: string;
}) {
  if (items.length === 0) return null;

  return (
    <section id="publications" aria-labelledby="publications-title" className="scroll-mt-24 px-[4%]">
      <div className="flex max-w-4xl items-baseline justify-between gap-4">
        <h2
          id="publications-title"
          className="text-[clamp(1.05rem,1.4vw,1.45rem)] font-bold text-[#e5e5e5]"
        >
          Publications
        </h2>
        <span className="text-sm text-[#808080]">
          {items.length} {items.length === 1 ? "paper" : "papers"}
        </span>
      </div>

      <ol className="mt-2 flex max-w-4xl flex-col divide-y divide-white/10 border-t border-white/10">
        {items.map((p) => (
          <li key={p.id} className="flex items-start gap-4 py-5 md:gap-6">
            {/* episode number */}
            <span
              aria-hidden="true"
              className={`${display.className} hidden w-6 shrink-0 pt-5 text-center text-3xl leading-none text-[#808080] sm:block`}
            >
              {p.number}
            </span>

            {/* small tile with the venue, like an episode thumbnail */}
            <div
              aria-hidden="true"
              className="relative aspect-video w-24 shrink-0 overflow-hidden rounded sm:w-32 md:w-40"
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
            </div>

            {/* title, authors, venue, links */}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-semibold leading-snug text-white">{p.title}</h3>
                {/* phones: the venue line below already starts with the year */}
                <span className="hidden shrink-0 text-sm text-[#bcbcbc] sm:inline">{p.year}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-[#bcbcbc]">{renderInline(p.authors, link)}</p>
              <p className="text-sm italic leading-relaxed text-[#808080]">{p.venue}</p>
              {p.award ? <p className="mt-1 text-sm text-[#e5e5e5]">★ {p.award}</p> : null}
              {p.abstract ? (
                <p className="mt-2 text-sm leading-relaxed text-[#d2d2d2]">{renderInline(p.abstract, link)}</p>
              ) : null}
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
                          ? "bg-white text-black hover:bg-white/80"
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
    </section>
  );
}
