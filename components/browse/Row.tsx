"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BrowseItem, BrowseRow } from "@/lib/browse";
import Card from "./Card";

/** A titled row of cards that scrolls sideways. Arrow buttons show on hover (wide screens). */
export default function Row({
  row,
  initials,
  onOpen,
}: {
  row: BrowseRow;
  initials: string;
  onOpen: (item: BrowseItem) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  // Re-check the arrows when the row or the window changes size.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  function page(direction: 1 | -1) {
    const el = scroller.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <section id={row.id} aria-labelledby={`${row.id}-title`} className="group/row relative scroll-mt-24">
      <h2
        id={`${row.id}-title`}
        className="px-[4%] text-[clamp(1.05rem,1.4vw,1.45rem)] font-bold text-nf-fg-2"
      >
        {row.title}
      </h2>
      <div className="relative">
        <div
          ref={scroller}
          onScroll={update}
          className="nf-scroller flex snap-x snap-mandatory scroll-px-[4%] gap-2 overflow-x-auto px-[4%] py-3"
        >
          {row.items.map((item) => (
            <div
              key={item.id}
              className="w-[42vw] shrink-0 snap-start sm:w-[29.5vw] md:w-[22.5vw] lg:w-[18vw] xl:w-[15vw]"
            >
              <Card item={item} initials={initials} onOpen={onOpen} />
            </div>
          ))}
        </div>
        {!edges.start ? (
          <ArrowButton side="left" label={`Scroll ${row.title} left`} onClick={() => page(-1)} />
        ) : null}
        {!edges.end ? (
          <ArrowButton side="right" label={`Scroll ${row.title} right`} onClick={() => page(1)} />
        ) : null}
      </div>
    </section>
  );
}

function ArrowButton({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute inset-y-3 z-20 hidden w-[4%] items-center justify-center bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 focus:opacity-100 group-hover/row:opacity-100 md:flex ${
        side === "left" ? "left-0 rounded-r" : "right-0 rounded-l"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <path d={side === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}
