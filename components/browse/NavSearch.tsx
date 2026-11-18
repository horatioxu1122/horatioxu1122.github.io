"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { buildSearchIndex, searchSite, type SearchEntry } from "@/lib/search";

function SearchIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Search in the top bar, like Netflix: an icon that opens a search box.
 * Results show as you type (publications, research, news, teaching,
 * service, awards, books). Arrow keys move, Enter opens, Escape closes.
 */
export default function NavSearch() {
  const index = useMemo(() => buildSearchIndex(), []);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchSite(index, query), [index, query]);
  const showResults = open && query.trim().length > 0;

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  // Close on a click outside the search box and its results.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  function go(r: SearchEntry) {
    close();
    const [path, hash] = r.href.split("#");
    const here = window.location.pathname.replace(/\/$/, "");
    if (hash && here === path.replace(/\/$/, "")) {
      // Same page: the hash opens the window (or scrolls to the section).
      window.location.hash = hash;
    } else {
      router.push(r.href);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      close();
    } else if (e.key === "ArrowDown" && results.length) {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp" && results.length) {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  }

  return (
    <div ref={box} className="relative flex items-center">
      {open ? (
        <div className="flex animate-[nf-fade-in_0.2s_ease-out] items-center gap-2 border border-nf-fg bg-nf-popover px-2 py-1 text-nf-fg">
          <SearchIcon className="h-4 w-4 shrink-0" />
          <input
            ref={input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Titles, people, topics"
            aria-label="Search the site"
            role="combobox"
            aria-expanded={showResults}
            aria-controls="nf-search-results"
            aria-activedescendant={showResults && results[active] ? `nf-search-${active}` : undefined}
            className="w-[min(15rem,38vw)] bg-transparent text-sm text-nf-fg placeholder:text-nf-faint focus:outline-none"
          />
          <button
            type="button"
            aria-label="Close search"
            onClick={close}
            className="text-nf-muted transition-colors hover:text-nf-fg"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          type="button"
          aria-label="Search"
          onClick={() => setOpen(true)}
          className="grid size-8 place-items-center transition-colors hover:text-nf-muted"
        >
          <SearchIcon />
        </button>
      )}

      {showResults ? (
        <div
          id="nf-search-results"
          role="listbox"
          aria-label="Search results"
          className="fixed inset-x-4 top-16 z-40 max-h-[70vh] overflow-y-auto rounded border border-nf-line bg-nf-popover py-1 shadow-xl backdrop-blur sm:absolute sm:inset-x-auto sm:right-0 sm:top-[calc(100%+0.6rem)] sm:w-[26rem]"
        >
          {results.length ? (
            results.map((r, i) => (
              <button
                key={r.id}
                id={`nf-search-${i}`}
                type="button"
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r)}
                className={`block w-full px-4 py-2.5 text-left transition-colors ${i === active ? "bg-nf-hover" : ""}`}
              >
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#e50914]">{r.type}</span>
                <span className="mt-0.5 line-clamp-2 block text-sm text-nf-fg">{r.title}</span>
                {r.subtitle ? <span className="block truncate text-xs text-nf-faint">{r.subtitle}</span> : null}
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-sm text-nf-muted">No results for &ldquo;{query.trim()}&rdquo;.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
