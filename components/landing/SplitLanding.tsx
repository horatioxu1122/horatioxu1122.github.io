"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { profile } from "@/lib/content";

type Side = "terminal" | "classic";

const HOST = profile.name.split(/\s+/)[0].toLowerCase().replace(/[^a-z0-9]/g, "") || "me";

export default function SplitLanding() {
  const router = useRouter();
  const [hovered, setHovered] = useState<Side | null>(null);
  const [selected, setSelected] = useState<Side | null>(null);
  const prefetched = useRef(false);

  // Prefetch both destinations so the reveal feels instant.
  useEffect(() => {
    if (prefetched.current) return;
    prefetched.current = true;
    router.prefetch("/terminal");
    router.prefetch("/classic");
  }, [router]);

  // After the expand animation, navigate.
  useEffect(() => {
    if (!selected) return;
    const t = setTimeout(() => {
      router.push(selected === "terminal" ? "/terminal" : "/classic");
    }, 480);
    return () => clearTimeout(t);
  }, [selected, router]);

  function choose(side: Side, e: React.MouseEvent) {
    // Let modifier-clicks / middle-clicks open in a new tab normally.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    setSelected(side);
  }

  // flex-grow for each panel given hover/selection state.
  function grow(side: Side): number {
    if (selected) return selected === side ? 1 : 0;
    if (hovered) return hovered === side ? 1.6 : 0.8;
    return 1;
  }

  const reduce = selected !== null;

  return (
    <main
      className="flex h-[100dvh] w-full flex-col overflow-hidden md:flex-row"
      aria-label="Choose how to view this site"
    >
      {/* ── Terminal half ── */}
      <Link
        href="/terminal"
        onClick={(e) => choose("terminal", e)}
        onMouseEnter={() => !reduce && setHovered("terminal")}
        onMouseLeave={() => !reduce && setHovered(null)}
        style={{ flexGrow: grow("terminal") }}
        className="group relative flex flex-1 basis-0 items-center justify-center overflow-hidden bg-[#0b0f0c] text-[#c8f7d4] transition-[flex-grow] duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] focus:outline-none"
      >
        {/* subtle scanline / glow */}
        <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(120%_80%_at_50%_0%,rgba(62,240,142,0.10),transparent_60%)]" />
        <div
          className={`relative flex flex-col items-start gap-5 px-8 transition-all duration-500 ${
            selected === "classic" ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* mini terminal window */}
          <div className="w-[min(78vw,22rem)] rounded-lg border border-[#1f3a2a] bg-black/40 font-mono text-sm shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-[#1f3a2a] px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="px-3 py-3 leading-relaxed">
              <div>
                <span className="text-[#3ef08e]">visitor@{HOST}</span>
                <span className="text-[#5c7a66]">:~$</span> whoami
                <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[#3ef08e]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-2xl font-bold tracking-tight text-[#3ef08e] sm:text-3xl">
              Terminal
            </span>
            <span className="font-mono text-sm text-[#5c7a66]">
              explore via the command line →
            </span>
          </div>
        </div>
      </Link>

      {/* ── Classic half ── */}
      <Link
        href="/classic"
        onClick={(e) => choose("classic", e)}
        onMouseEnter={() => !reduce && setHovered("classic")}
        onMouseLeave={() => !reduce && setHovered(null)}
        style={{ flexGrow: grow("classic") }}
        className="group relative flex flex-1 basis-0 items-center justify-center overflow-hidden border-t border-zinc-200 bg-zinc-50 text-zinc-800 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] focus:outline-none md:border-l md:border-t-0"
      >
        <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(120%_80%_at_50%_0%,rgba(0,0,0,0.05),transparent_60%)]" />
        <div
          className={`relative flex flex-col items-center gap-5 px-8 text-center transition-all duration-500 ${
            selected === "terminal" ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-semibold text-zinc-700 shadow-md ring-1 ring-zinc-200">
            {profile.name
              .replace(/\([^)]*\)/g, " ")
              .split(/\s+/)
              .filter(Boolean)
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </div>
          <span className="text-2xl font-bold tracking-tight sm:text-3xl">{profile.name}</span>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Homepage
            </span>
            <span className="text-sm text-zinc-500">the classic way →</span>
          </div>
        </div>
      </Link>
    </main>
  );
}
