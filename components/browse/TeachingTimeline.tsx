import { display } from "@/components/landing/fonts";
import type { TeachingEntry } from "@/lib/browse";

/**
 * /browse/teaching: a vertical timeline, newest term first. Each term is a
 * "season" of its course (S1 = the first time). Lead roles get a red dot.
 */
export default function TeachingTimeline({ entries }: { entries: TeachingEntry[] }) {
  return (
    <ol className="relative mx-[4%] max-w-3xl border-l border-white/15 pl-8">
      {entries.map((e) => (
        <li key={e.id} className="relative pb-9 last:pb-2">
          <span
            aria-hidden="true"
            className={`absolute -left-[calc(2rem+7px)] top-1 size-3.5 rounded-full ring-4 ring-[#141414] ${
              e.lead ? "bg-[#e50914]" : "bg-[#808080]"
            }`}
          />
          <p className={`${display.className} text-[1.7rem] leading-none text-white`}>{e.term}</p>
          <h3 className="mt-2 flex flex-wrap items-center gap-2 text-base font-bold text-white">
            {e.course}
            <span className="rounded-sm border border-white/40 px-1.5 text-xs font-normal text-[#e5e5e5]">
              S{e.season}
            </span>
            {e.lead ? (
              <span className="rounded-sm bg-[#e50914] px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white">
                Lead
              </span>
            ) : null}
          </h3>
          <p className="mt-1 text-sm text-[#bcbcbc]">
            {e.role}
            {e.institution ? <span className="text-[#808080]"> · {e.institution}</span> : null}
          </p>
        </li>
      ))}
    </ol>
  );
}
