"use client";

import { useEffect, useRef } from "react";
import { display } from "@/components/landing/fonts";
import type { BrowseItem } from "@/lib/browse";
import { renderInline } from "@/lib/format";
import Blocks from "./Blocks";
import { paletteStyle } from "./palettes";

const link = "text-white underline decoration-white/40 underline-offset-2 hover:decoration-white";

/**
 * The details window for a card. Uses <dialog>, so Escape closes it and the
 * keyboard focus stays inside. A click on the dark backdrop also closes it.
 */
export default function DetailsModal({
  item,
  initials,
  onClose,
}: {
  item: BrowseItem;
  initials: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    // Stop the page behind the window from scrolling.
    const root = document.documentElement;
    const before = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = before;
    };
  }, []);

  const heading = item.title ?? item.poster;
  const long = heading.length > 40;
  const hasBody = item.body.length > 0;
  const facts = item.facts ?? [];

  const factList = facts.length ? (
    <dl className="flex flex-col gap-2.5 text-sm">
      {facts.map((f) => (
        <div key={f.label}>
          <dt className="inline text-[#777]">{f.label}: </dt>
          <dd className="inline text-[#ddd]">{renderInline(f.value, link)}</dd>
        </div>
      ))}
    </dl>
  ) : null;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      aria-labelledby="nf-modal-title"
      className="nf-modal m-auto max-h-[calc(100dvh-3rem)] w-[min(52rem,calc(100vw-1.5rem))] overflow-y-auto rounded-lg bg-[#181818] p-0 text-white shadow-2xl backdrop:bg-black/70"
    >
      <div className="relative min-h-44 md:aspect-[16/6]" style={paletteStyle(item.palette)}>
        <div className="absolute inset-0 bg-linear-to-t from-[#181818] via-[#181818]/20 to-transparent" />
        <button
          type="button"
          aria-label="Close"
          onClick={() => ref.current?.close()}
          className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-[#181818] text-white transition-colors hover:bg-[#2f2f2f] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="absolute inset-x-6 bottom-4 md:inset-x-10">
          <p className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/75">
            {item.original ? (
              <span className={`${display.className} text-xl leading-none tracking-normal text-[#e50914]`}>
                {initials}
              </span>
            ) : null}
            {item.kicker}
          </p>
          <h2
            id="nf-modal-title"
            className={`${display.className} mt-1 leading-[0.95] text-white ${
              // Netflix modal titles are about 32px; at most 40px here (the display font is narrow).
              long ? "text-[clamp(1.5rem,2.6vw,2rem)]" : "text-[clamp(2rem,3.4vw,2.5rem)]"
            }`}
          >
            {heading}
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-6 pb-8 pt-2 md:px-10">
        {item.links?.length ? (
          <div className="flex flex-wrap gap-2.5">
            {item.links.map((l, i) => (
              <a
                key={`${l.href}-${i}`}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={`rounded px-4 py-1.5 text-sm font-semibold transition-colors ${
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

        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#bcbcbc]">
          {item.meta?.map((m) => <span key={m}>{m}</span>)}
          {item.badge ? (
            <span className="rounded-sm border border-white/40 px-1.5 text-xs text-[#e5e5e5]">{item.badge}</span>
          ) : null}
        </p>

        {hasBody && factList ? (
          <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <Blocks blocks={item.body} />
            {factList}
          </div>
        ) : hasBody ? (
          <Blocks blocks={item.body} />
        ) : (
          factList
        )}
      </div>
    </dialog>
  );
}
