"use client";

import { useState } from "react";
import { display } from "@/components/landing/fonts";
import type { NewsEntry } from "@/lib/browse";
import { renderInline } from "@/lib/format";

/** How many items show before "Show all". */
const SHOWN = 4;

const link = "text-nf-fg underline decoration-current/40 underline-offset-2 hover:decoration-current";

/**
 * News as a short dated list (like a streaming "New & Hot" page): the day in
 * large type on the left, the sentence on the right. Full sentences do not fit
 * on cards, so they get a list instead.
 */
export default function BrowseNews({ items }: { items: NewsEntry[] }) {
  const [all, setAll] = useState(false);
  if (items.length === 0) return null;
  const visible = all ? items : items.slice(0, SHOWN);

  return (
    // -mt: sit 20% closer to the section above than the usual section gap (see Browse.tsx).
    <section
      id="news"
      aria-labelledby="news-title"
      className="-mt-[clamp(0.324rem,0.576vw,0.54rem)] scroll-mt-24 px-[4%]"
    >
      <h2 id="news-title" className="text-[clamp(1.05rem,1.4vw,1.45rem)] font-bold text-nf-fg-2">
        Latest News
      </h2>
      <ol className="mt-3 flex max-w-3xl flex-col divide-y divide-nf-line">
        {visible.map((n) => (
          <li key={n.id} className="flex items-start gap-5 py-4">
            <div className="w-12 shrink-0 text-center leading-none" aria-label={`${n.month} ${n.day}, ${n.year}`}>
              <div aria-hidden="true" className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-nf-faint">
                {n.month}
              </div>
              <div aria-hidden="true" className={`${display.className} mt-1 text-[2.1rem] text-nf-fg`}>
                {n.day}
              </div>
              <div aria-hidden="true" className="mt-0.5 text-[0.65rem] text-nf-faint">
                {n.year}
              </div>
            </div>
            <p className="pt-1 text-[0.95rem] leading-relaxed text-nf-body">
              {n.isNew ? (
                <span className="mr-2 rounded-sm bg-[#e50914] px-1.5 py-0.5 align-[0.1em] text-[0.6rem] font-bold uppercase tracking-wider text-white">
                  New
                </span>
              ) : null}
              {renderInline(n.text, link)}
            </p>
          </li>
        ))}
      </ol>
      {items.length > SHOWN ? (
        <button
          type="button"
          onClick={() => setAll((a) => !a)}
          aria-expanded={all}
          className="mt-2 rounded border border-nf-line-strong px-4 py-1.5 text-sm text-nf-fg-2 transition-colors hover:border-nf-fg hover:text-nf-fg"
        >
          {all ? "Show less" : `Show all ${items.length}`}
        </button>
      ) : null}
    </section>
  );
}
