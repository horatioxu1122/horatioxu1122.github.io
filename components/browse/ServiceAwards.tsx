import { display } from "@/components/landing/fonts";
import type { AwardEntry, ServiceCredit } from "@/lib/browse";
import { paletteStyle } from "./palettes";

interface RankedItem {
  id: string;
  /** small label on the tile, e.g. "Program Committee" */
  kicker: string;
  /** big text on the tile */
  name: string;
  /** one plain line under the tile, e.g. "2025, 2026" */
  caption: string;
  /** red badge on the tile */
  badge?: string;
}

/**
 * /browse/service: Service, then Awards, as rows in the style of the Netflix
 * "Top 10" row — big outlined numbers beside tall tiles. Here the numbers are
 * not a ranking: they follow the date, newest first (see creditsData()).
 */
export default function ServiceAwards({
  awards,
  credits,
}: {
  awards: AwardEntry[];
  credits: ServiceCredit[];
}) {
  return (
    <div className="flex flex-col gap-[clamp(1.62rem,2.88vw,2.7rem)]">
      <NumberedRow
        id="service"
        title="Service"
        paletteStart={1}
        items={credits.map((c) => ({
          id: c.id,
          kicker: c.role,
          name: c.name,
          // The details ("2025, 2026"); the years when there are no details.
          caption: c.detail ?? c.years,
        }))}
      />
      <NumberedRow
        id="awards"
        title="Awards"
        paletteStart={0}
        items={awards.map((a) => ({
          id: a.id,
          kicker: "Award",
          name: a.title,
          caption: a.org ? `${a.year} · ${a.org}` : String(a.year),
          badge: "Award",
        }))}
      />
    </div>
  );
}

function NumberedRow({
  id,
  title,
  items,
  paletteStart,
}: {
  id: string;
  title: string;
  items: RankedItem[];
  paletteStart: number;
}) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby={`${id}-title`}>
      <div className="flex items-baseline gap-3 px-[4%]">
        <h2 id={`${id}-title`} className="text-[clamp(1.05rem,1.4vw,1.45rem)] font-bold text-nf-fg-2">
          {title}
        </h2>
      </div>

      {/* items-start: a long caption must not stretch the other items (the tiles stay level) */}
      <ol className="nf-scroller mt-3 flex items-start gap-[clamp(1.25rem,2.5vw,2.5rem)] overflow-x-auto px-[4%] pb-2">
        {items.map((it, i) => (
          <li
            key={it.id}
            className="grid shrink-0 grid-cols-[auto_auto] grid-rows-[auto_auto] gap-x-0"
          >
            {/* big outlined number, half behind the tile (order, not rank) */}
            <span
              aria-hidden="true"
              className="col-start-1 row-start-1 -mr-[0.14em] self-end select-none text-[clamp(7.5rem,12vw,10.5rem)] font-black leading-[0.78] text-nf-bg [-webkit-text-stroke:4px_var(--nf-rank-stroke)] [paint-order:stroke_fill]"
            >
              {i + 1}
            </span>

            <div
              className="@container relative z-10 col-start-2 row-start-1 aspect-[2/3] w-[clamp(7.5rem,11vw,9.5rem)] self-end overflow-hidden rounded-md shadow-lg shadow-black/50"
              style={paletteStyle(paletteStart + i * 2)}
            >
              <span className="absolute inset-x-2.5 top-2.5 line-clamp-2 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/80">
                {it.kicker}
              </span>
              {it.badge ? (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t bg-[#e50914] px-2 pb-0.5 pt-1 text-[0.58rem] font-bold uppercase tracking-wider text-white">
                  {it.badge}
                </span>
              ) : null}
              <span
                className={`${display.className} absolute inset-x-2.5 bottom-6 line-clamp-4 leading-[0.95] text-white [text-shadow:0_2px_6px_rgba(0,0,0,0.5)] ${
                  it.name.length > 18 ? "text-[13cqw]" : "text-[18cqw]"
                }`}
              >
                {it.name}
              </span>
            </div>

            {/* one plain line under the tile: easy to read */}
            <p className="col-start-2 row-start-2 mt-2 w-[clamp(7.5rem,11vw,9.5rem)] text-xs leading-relaxed text-nf-muted-2">
              {it.caption}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
