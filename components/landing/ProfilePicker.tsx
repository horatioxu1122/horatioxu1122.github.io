"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { landing } from "@/lib/content";
import { saveViewer } from "@/lib/viewer";
import ProfileAvatar from "./ProfileAvatar";
import Wordmark from "./Wordmark";

/** Length of the exit animation before the next page opens. Matches .nf-picker-out. */
const LEAVE_MS = 320;

/**
 * "Who's watching?" screen. Every profile opens the same page; the pick only
 * changes the avatar in the top bar and the banner picture on /browse.
 */
export default function ProfilePicker({ active }: { active: boolean }) {
  const router = useRouter();
  const [target, setTarget] = useState<string | null>(null);

  // Prefetch the home page so the page change feels instant.
  useEffect(() => {
    router.prefetch(landing.profileHref);
  }, [router]);

  // Play the exit animation, then open the page.
  useEffect(() => {
    if (!target) return;
    const t = setTimeout(() => router.push(target), LEAVE_MS);
    return () => clearTimeout(t);
  }, [target, router]);

  function go(href: string, e: React.MouseEvent) {
    // Let modifier-clicks and middle-clicks open a new tab as usual.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setTarget(href);
  }

  const motion = !active ? "opacity-0" : target ? "nf-picker-out" : "nf-picker-in";

  return (
    <div inert={!active || target !== null} className={`flex min-h-[100dvh] flex-col ${motion}`}>
      <header className="px-[4%] pt-5 sm:pt-7">
        <Wordmark text={landing.wordmark} className="text-[clamp(1.6rem,2.8vw,2.6rem)]" />
      </header>

      <section className="flex flex-1 flex-col items-center justify-center gap-[clamp(1.5rem,3vw,2.75rem)] px-4 pb-20">
        <h1 className="text-center text-[clamp(1.75rem,3.5vw,3.5rem)] font-medium tracking-tight text-white">
          Who&rsquo;s watching?
        </h1>

        <ul className="flex flex-wrap justify-center gap-[clamp(1rem,2vw,2rem)]">
          {landing.profiles.map((viewer, i) => (
            <li key={viewer.name}>
              <Link
                href={landing.profileHref}
                onClick={(e) => {
                  saveViewer(i);
                  go(landing.profileHref, e);
                }}
                className="group flex flex-col items-center gap-3 focus:outline-none"
              >
                <ProfileAvatar
                  viewer={viewer}
                  className="w-[clamp(84px,10vw,180px)] rounded-md ring-[3px] ring-transparent transition-shadow group-hover:ring-white group-focus-visible:ring-white"
                />
                <span className="text-[clamp(0.95rem,1.3vw,1.3rem)] text-[#808080] transition-colors group-hover:text-white group-focus-visible:text-white">
                  {viewer.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
