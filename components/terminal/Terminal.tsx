"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { profile } from "@/lib/content";
import {
  Banner,
  resolveCommand,
  allCommandNames,
  SECTIONS,
  type CommandContext,
} from "./commands";

const THEMES = ["matrix", "amber", "mono", "dracula", "light"];
const USER = "visitor";
const HOST = profile.name.split(/\s+/)[0].toLowerCase().replace(/[^a-z0-9]/g, "") || "me";

interface HistoryEntry {
  id: number;
  cwd: string;
  input: string;
  output: React.ReactNode;
}

export default function Terminal() {
  const router = useRouter();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [theme, setThemeState] = useState("matrix");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [maximized, setMaximized] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const counter = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Restore theme from localStorage.
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("term-theme") : null;
    if (saved && THEMES.includes(saved)) setThemeState(saved);
  }, []);

  const setTheme = useCallback((name: string) => {
    setThemeState(name);
    try {
      localStorage.setItem("term-theme", name);
    } catch {}
  }, []);

  // Keep the view pinned to the newest output.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [entries]);

  const navigate = useCallback(
    (path: string) => {
      if (/^https?:|^mailto:/.test(path) || /\.(pdf|png|jpg|jpeg|svg)$/i.test(path)) {
        window.open(path, "_blank", "noopener,noreferrer");
      } else {
        router.push(path);
      }
    },
    [router],
  );

  const runLine = useCallback(
    (raw: string) => {
      const line = raw.trim();
      if (line === "") {
        setEntries((e) => [...e, { id: counter.current++, cwd, input: "", output: null }]);
        return;
      }
      setCmdHistory((h) => [...h, line]);
      setHistIndex(-1);

      const [name, ...args] = line.split(/\s+/);
      const cmd = resolveCommand(name);

      let output: React.ReactNode = null;
      if (!cmd) {
        output = (
          <span className="text-[color:var(--term-muted)]">
            {`command not found: ${name}. Type `}
            <span className="text-[color:var(--term-accent)]">help</span>
            {" to see options."}
          </span>
        );
      } else if (cmd.name === "clear") {
        setEntries([]);
        return;
      } else {
        const ctx: CommandContext = {
          args,
          cwd,
          setCwd,
          clear: () => setEntries([]),
          navigate,
          setTheme,
          themes: THEMES,
          run: () => null,
        };
        output = cmd.run(ctx) ?? null;
      }

      setEntries((e) => [...e, { id: counter.current++, cwd, input: line, output }]);
    },
    [cwd, navigate, setTheme],
  );

  const completion = useCallback((value: string): string | null => {
    const parts = value.split(/\s+/);
    const pool = parts.length <= 1 ? allCommandNames() : ["pub", ...SECTIONS];
    const frag = parts[parts.length - 1];
    if (!frag) return null;
    const matches = pool.filter((c) => c.startsWith(frag));
    if (matches.length === 1) {
      parts[parts.length - 1] = matches[0];
      return parts.join(" ");
    }
    return null;
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runLine(input);
      setInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const completed = completion(input);
      if (completed) setInput(completed);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const next = histIndex < 0 ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setInput(cmdHistory[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex < 0) return;
      const next = histIndex + 1;
      if (next >= cmdHistory.length) {
        setHistIndex(-1);
        setInput("");
      } else {
        setHistIndex(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  const Prompt = ({ at }: { at: string }) => (
    <span className="shrink-0 select-none">
      <span className="text-[color:var(--term-prompt)]">
        {USER}@{HOST}
      </span>
      <span className="text-[color:var(--term-muted)]">:</span>
      <span className="text-[color:var(--term-link)]">{at}</span>
      <span className="text-[color:var(--term-muted)]">$ </span>
    </span>
  );

  const focusInput = () => inputRef.current?.focus();
  const banner = useMemo(() => <Banner />, []);

  const windowSize = maximized
    ? "h-[100dvh] max-w-none rounded-none"
    : minimized
      ? "h-auto max-w-[880px] rounded-xl"
      : "h-[82vh] max-h-[680px] max-w-[880px] rounded-xl";

  return (
    <div
      data-theme={theme}
      className={`term-root relative flex min-h-[100dvh] w-full items-center justify-center bg-[color:var(--term-bg)] font-mono text-sm text-[color:var(--term-fg)] ${
        maximized ? "p-0" : "p-3 sm:p-6"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/20" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-60 [background:radial-gradient(120%_70%_at_50%_0%,rgba(62,240,142,0.05),transparent_60%)]" />

      {/* terminal window */}
      <div
        onClick={focusInput}
        className={`relative z-10 flex w-full flex-col overflow-hidden border border-[color:var(--term-muted)]/30 bg-[color:var(--term-bg)] shadow-2xl ${windowSize}`}
      >
        {/* title bar */}
        <div className="flex shrink-0 items-center gap-2 border-b border-[color:var(--term-muted)]/30 px-4 py-2.5 text-xs">
          <div className="group flex items-center gap-2">
            <button
              type="button"
              aria-label="Close terminal"
              title="Close — back to start"
              onClick={(e) => {
                e.stopPropagation();
                router.push("/");
              }}
              className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f56] text-[8px] font-bold leading-none text-black/55 transition hover:brightness-90"
            >
              <span className="opacity-0 transition-opacity group-hover:opacity-100">✕</span>
            </button>
            <button
              type="button"
              aria-label="Minimize terminal"
              title="Minimize"
              onClick={(e) => {
                e.stopPropagation();
                setMinimized((m) => !m);
              }}
              className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ffbd2e] text-[11px] font-bold leading-none text-black/55 transition hover:brightness-90"
            >
              <span className="-mt-[3px] opacity-0 transition-opacity group-hover:opacity-100">
                –
              </span>
            </button>
            <button
              type="button"
              aria-label="Maximize terminal"
              title="Maximize"
              onClick={(e) => {
                e.stopPropagation();
                setMinimized(false);
                setMaximized((m) => !m);
              }}
              className="flex h-3 w-3 items-center justify-center rounded-full bg-[#27c93f] text-[9px] font-bold leading-none text-black/55 transition hover:brightness-90"
            >
              <span className="opacity-0 transition-opacity group-hover:opacity-100">+</span>
            </button>
          </div>
          <span className="ml-2 truncate text-[color:var(--term-muted)]">
            {USER}@{HOST}: ~
          </span>
          <Link
            href="/classic"
            onClick={(e) => e.stopPropagation()}
            className="ml-auto shrink-0 text-[color:var(--term-link)] underline underline-offset-2 hover:no-underline"
          >
            switch to classic view →
          </Link>
        </div>

        {/* scrollback */}
        {!minimized ? (
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 leading-relaxed">
            {entries.length === 0 ? <div className="mb-2">{banner}</div> : null}
            {entries.map((entry) => (
              <div key={entry.id} className="mb-2">
                {entry.input !== "" ? (
                  <div className="flex">
                    <Prompt at={entry.cwd} />
                    <span className="whitespace-pre-wrap break-words">{entry.input}</span>
                  </div>
                ) : null}
                {entry.output ? <div className="mt-1">{entry.output}</div> : null}
              </div>
            ))}

            {/* live input line */}
            <div className="flex">
              <Prompt at={cwd} />
              <input
                ref={inputRef}
                autoFocus
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="flex-1 border-none bg-transparent text-[color:var(--term-fg)] caret-[color:var(--term-accent)] outline-none"
                aria-label="terminal input"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
