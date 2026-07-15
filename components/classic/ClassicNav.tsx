"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { profile } from "@/lib/content";

const LINKS = [
  { href: "/classic", label: "Home" },
  { href: "/classic/about", label: "About me" },
  { href: "/classic/reading", label: "Reading list" },
  { href: "/classic/projects", label: "Projects" },
];

export default function ClassicNav() {
  const pathname = usePathname();

  return (
    <nav className="sans sticky top-0 z-10 border-b border-zinc-200/70 bg-white/85 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/85">
      <div className="mx-auto flex max-w-[860px] items-center gap-6 px-6 py-3 text-[0.95rem]">
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "font-semibold text-[color:var(--nav)]"
                  : "text-zinc-700 transition-colors hover:text-[color:var(--nav)] dark:text-zinc-300"
              }
            >
              {l.label}
            </Link>
          );
        })}
        {profile.cv ? (
          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-700 transition-colors hover:text-[color:var(--nav)] dark:text-zinc-300"
          >
            CV
          </a>
        ) : null}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/terminal"
            className="rounded-md border border-zinc-300 px-3 py-1 font-mono text-xs hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            $ open terminal
          </Link>
        </div>
      </div>
    </nav>
  );
}
