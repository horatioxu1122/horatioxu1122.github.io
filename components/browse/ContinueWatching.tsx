import Link from "next/link";
import { display } from "@/components/landing/fonts";
import type { ContinueItem } from "@/lib/browse";
import { paletteStyle } from "./palettes";

/**
 * "Continue Watching for <profile>" — the last row on the home page. Each card
 * opens its own page (Teaching, Service & Awards, Reading List). The red bar
 * under each card is the Netflix "partly watched" bar; here it is decoration.
 */
export default function ContinueWatching({
  items,
  viewerName,
}: {
  items: ContinueItem[];
  viewerName: string;
}) {
  if (items.length === 0) return null;

  return (
    <section id="continue" aria-labelledby="continue-title" className="scroll-mt-24">
      <h2
        id="continue-title"
        className="px-[4%] text-[clamp(1.05rem,1.4vw,1.45rem)] font-bold text-nf-fg-2"
      >
        Continue Watching for {viewerName}
      </h2>
      <ul className="nf-scroller flex gap-2 overflow-x-auto px-[4%] py-3">
        {items.map((it) => (
          <li
            key={it.href}
            className="w-[42vw] shrink-0 sm:w-[29.5vw] md:w-[22.5vw] lg:w-[18vw] xl:w-[15vw]"
          >
            <Link
              href={it.href}
              className="group block rounded-md ring-nf-fg transition duration-300 ease-out hover:scale-[1.06] focus:outline-none focus-visible:scale-[1.06] focus-visible:ring-2"
            >
              <span
                className="@container relative block aspect-video overflow-hidden rounded-t-md shadow-lg shadow-black/40"
                style={paletteStyle(it.palette)}
              >
                <span className="absolute left-3 right-3 top-2.5 truncate text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/75">
                  {it.kicker}
                </span>
                {/* play button, shown on hover */}
                <span
                  aria-hidden="true"
                  className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full border-2 border-white/80 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="white">
                    <path d="M7 4.5v15l12-7.5z" />
                  </svg>
                </span>
                <span
                  className={`${display.className} absolute inset-x-3 bottom-2.5 line-clamp-2 text-[12.5cqw] leading-[0.95] text-white [text-shadow:0_2px_6px_rgba(0,0,0,0.5)]`}
                >
                  {it.poster}
                </span>
              </span>
              {/* "partly watched" bar */}
              <span aria-hidden="true" className="block h-1 overflow-hidden rounded-b-md bg-[#5a5a5a]">
                <span className="block h-full bg-[#e50914]" style={{ width: `${Math.round(it.progress * 100)}%` }} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
