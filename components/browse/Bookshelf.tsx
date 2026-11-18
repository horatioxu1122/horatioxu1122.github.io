import { display } from "@/components/landing/fonts";
import type { ShelfBook } from "@/lib/browse";
import ClampNote from "./ClampNote";
import { paletteStyle } from "./palettes";

/**
 * /browse/reading: a bookshelf — tall 2:3 "poster" tiles in a grid, one shelf
 * per category. A rating shows as a green "% Match", like on Netflix.
 */
export default function Bookshelf({
  groups,
}: {
  groups: { category: string; books: ShelfBook[] }[];
}) {
  return (
    <div className="flex flex-col gap-12">
      {groups.map((g) => (
        <section key={g.category} aria-label={g.category} className="px-[4%]">
          <h2 className="text-[clamp(1.05rem,1.4vw,1.45rem)] font-bold text-nf-fg-2">{g.category}</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {g.books.map((b) => (
              <li key={b.id} className="flex flex-col">
                <div
                  className="@container relative aspect-[2/3] overflow-hidden rounded-md shadow-lg shadow-black/40"
                  style={paletteStyle(b.palette)}
                >
                  {b.author ? (
                    <span className="absolute inset-x-3 top-3 line-clamp-2 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/75">
                      {b.author}
                    </span>
                  ) : null}
                  {b.badge ? (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t bg-[#e50914] px-2 pb-0.5 pt-1 text-[0.58rem] font-bold uppercase tracking-wider text-white">
                      {b.badge}
                    </span>
                  ) : null}
                  <span
                    className={`${display.className} absolute inset-x-3 bottom-6 line-clamp-5 leading-[0.95] text-white [text-shadow:0_2px_6px_rgba(0,0,0,0.5)] ${
                      b.title.length > 28 ? "text-[11cqw]" : "text-[15cqw]"
                    }`}
                  >
                    {b.title}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  {b.match !== undefined ? (
                    <span className="font-bold text-[#46d369]">{b.match}% Match</span>
                  ) : null}
                  {b.href ? (
                    <a
                      href={b.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-nf-fg-2 underline decoration-current/40 underline-offset-2 hover:decoration-current"
                    >
                      Open ↗
                    </a>
                  ) : null}
                </div>
                {b.note ? <ClampNote text={b.note} /> : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
