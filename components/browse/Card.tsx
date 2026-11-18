import { display } from "@/components/landing/fonts";
import type { BrowseItem } from "@/lib/browse";
import { paletteStyle } from "./palettes";

/** A 16:9 tile in a row. Click it to open the details window. */
export default function Card({
  item,
  initials,
  onOpen,
}: {
  item: BrowseItem;
  initials: string;
  onOpen: (item: BrowseItem) => void;
}) {
  const long = item.poster.length > 32;
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={item.kicker ? `${item.poster} (${item.kicker})` : item.poster}
      className="@container relative block aspect-video w-full overflow-hidden rounded-md text-left shadow-lg shadow-black/40 ring-nf-fg transition duration-300 ease-out hover:z-10 hover:scale-[1.06] focus:outline-none focus-visible:z-10 focus-visible:scale-[1.06] focus-visible:ring-2"
      style={paletteStyle(item.palette)}
    >
      <span className="absolute left-3 right-14 top-2.5 flex items-center gap-1.5 truncate text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/75">
        {item.original ? (
          <span className={`${display.className} text-[1.05rem] leading-none tracking-normal text-[#e50914]`}>
            {initials}
          </span>
        ) : null}
        <span className="truncate">{item.kicker}</span>
      </span>
      {item.badge ? (
        <span className="absolute right-2.5 top-0 rounded-b bg-[#e50914] px-1.5 pb-0.5 pt-1 text-[0.58rem] font-bold uppercase tracking-wider text-white">
          {item.badge}
        </span>
      ) : null}
      <span
        className={`${display.className} absolute inset-x-3 bottom-2.5 line-clamp-3 leading-[0.95] text-white [text-shadow:0_2px_6px_rgba(0,0,0,0.5)] ${
          // Sized from the card width (cqw), so the text fits on phones and wide screens alike.
          long ? "text-[9cqw]" : "text-[12.5cqw]"
        }`}
      >
        {item.poster}
      </span>
    </button>
  );
}
