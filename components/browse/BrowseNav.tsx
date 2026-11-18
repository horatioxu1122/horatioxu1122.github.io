"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Wordmark from "@/components/landing/Wordmark";
import ProfileAvatar from "@/components/landing/ProfileAvatar";
import { landing, profile } from "@/lib/content";
import NavSearch from "./NavSearch";
import { useTheme } from "./useTheme";

const navLink = "transition-colors hover:text-nf-muted";

/** "#news" stays on the page; "/browse#news" is a link to another page. */
function NavAnchor({
  href,
  className,
  current,
  children,
}: {
  href: string;
  className: string;
  current?: boolean;
  children: React.ReactNode;
}) {
  const ariaCurrent = current ? "location" : undefined;
  return href.startsWith("/") ? (
    <Link href={href} className={className} aria-current={ariaCurrent}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className} aria-current={ariaCurrent}>
      {children}
    </a>
  );
}

/** An on/off switch for the profile menu (red when on, like vicflix). */
function Switch({ label, on, onChange }: { label: string; on: boolean; onChange: (on: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left"
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-[#e50914]" : "bg-nf-line-strong"}`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-[1.375rem]" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}

/**
 * Top bar: name logo, section links, "About me", search, and the profile menu
 * (other profile, Dark mode / Auto switches, CV).
 *
 * On the home page (`overDark`), the bar sits over the dark banner, so it
 * stays dark until you scroll; then it turns to the page color. On the
 * sub-pages it uses the page colors from the start.
 *
 * On the home page, links are "#section" anchors, the section on screen is
 * highlighted, and "About me" opens a window (`onAbout`). On the sub-pages,
 * links go back to the home page (`/browse#…`), there is no highlight, and
 * "About me" is a link (`aboutHref`).
 */
export default function BrowseNav({
  links,
  viewer,
  onSwitch,
  onAbout,
  aboutHref = "/browse#about",
  logoHref = "#top",
  highlight = true,
  overDark = false,
}: {
  links: { href: string; label: string }[];
  viewer: number;
  onSwitch: (index: number) => void;
  onAbout?: () => void;
  aboutHref?: string;
  logoHref?: string;
  highlight?: boolean;
  overDark?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // The section on screen; its link is bold, like the current tab on Netflix.
  const [active, setActive] = useState(links[0]?.href ?? "");
  const menu = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  // A stable key for the effect below (the `links` array is new on every render).
  const hrefs = links.map((l) => l.href).join(" ");

  useEffect(() => {
    const ids = hrefs.split(" ");
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      // The current section is the last one whose top has passed just under the bar.
      let current = ids[0];
      for (const href of ids) {
        const el = href.startsWith("#") ? document.getElementById(href.slice(1)) : null;
        if (el && el.getBoundingClientRect().top <= 120) current = href;
      }
      // At the very bottom, the last section counts even if it is short.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? ids[ids.length - 1] : current);
    };
    const id = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, [hrefs]);

  // Close the profile menu on an outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!menu.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = landing.profiles[viewer] ?? landing.profiles[0];
  // Over the dark banner, the bar is dark in both modes.
  const forceDark = overDark && !scrolled;

  const linkItems = (
    <>
      {links.map((l) => {
        const isActive = highlight && active === l.href;
        return (
          <li key={l.href} className="shrink-0">
            <NavAnchor href={l.href} current={isActive} className={isActive ? "font-bold text-nf-fg" : navLink}>
              {l.label}
            </NavAnchor>
          </li>
        );
      })}
      <li className="shrink-0">
        {onAbout ? (
          <button type="button" onClick={onAbout} className={navLink}>
            About me
          </button>
        ) : (
          <NavAnchor href={aboutHref} className={navLink}>
            About me
          </NavAnchor>
        )}
      </li>
    </>
  );

  return (
    <header
      data-theme={forceDark ? "dark" : undefined}
      className={`fixed inset-x-0 top-0 z-30 text-nf-fg-2 transition-colors duration-500 ${
        scrolled ? "bg-nf-bg" : overDark ? "bg-linear-to-b from-black/75 to-transparent" : "bg-transparent"
      }`}
    >
      {/* Netflix: logo about 93 × 25px, about 25px before the first link. */}
      <nav aria-label="Main" className="flex h-16 items-center gap-6 px-[4%] md:h-[4.25rem]">
        <NavAnchor href={logoHref} className="shrink-0">
          <Wordmark text={landing.wordmark} className="text-[clamp(1.25rem,1.72vw,1.6rem)]" />
        </NavAnchor>
        <ul className="hidden items-center gap-5 text-sm md:flex">{linkItems}</ul>

        <div className="ml-auto flex items-center gap-4 text-sm sm:gap-5">
          <NavSearch />

          {profile.cv ? (
            <a href={profile.cv} target="_blank" rel="noreferrer" className={`hidden sm:inline ${navLink}`}>
              CV
            </a>
          ) : null}

          {current ? (
            <div ref={menu} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label={`Profile menu (${current.name})`}
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2"
              >
                <ProfileAvatar viewer={current} className="w-8 rounded" />
                <svg
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </button>

              {open ? (
                <div
                  role="menu"
                  className="absolute right-0 top-[calc(100%+0.9rem)] w-60 rounded border border-nf-line bg-nf-popover py-2 text-sm text-nf-fg shadow-xl backdrop-blur"
                >
                  {landing.profiles.map((p, i) =>
                    i === viewer ? null : (
                      <button
                        key={p.name}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          onSwitch(i);
                          setOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2 text-left hover:underline"
                      >
                        <ProfileAvatar viewer={p} className="w-8 rounded" />
                        {p.name}
                      </button>
                    ),
                  )}
                  <Link role="menuitem" href="/" className="block px-4 py-2 hover:underline">
                    Back to profiles
                  </Link>

                  <div className="my-2 border-t border-nf-line" />
                  {/* Dark mode / Auto (Auto follows the device setting) */}
                  <Switch label="Dark mode" on={theme.dark} onChange={theme.setDark} />
                  <Switch label="Auto" on={theme.auto} onChange={theme.setAuto} />

                  {profile.cv ? (
                    <>
                      <div className="my-2 border-t border-nf-line" />
                      <a
                        role="menuitem"
                        href={profile.cv}
                        target="_blank"
                        rel="noreferrer"
                        className="block px-4 py-2 hover:underline"
                      >
                        CV (PDF)
                      </a>
                    </>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </nav>

      {/* On small screens the section links sit in a sideways strip under the bar. */}
      <ul className="nf-scroller flex gap-5 overflow-x-auto px-[4%] pb-2.5 text-sm md:hidden">{linkItems}</ul>
    </header>
  );
}
