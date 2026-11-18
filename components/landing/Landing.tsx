"use client";

import { useCallback, useEffect, useState } from "react";
import { landing } from "@/lib/content";
import Intro from "./Intro";
import ProfilePicker from "./ProfilePicker";

type Phase = "loading" | "intro" | "picker";

const INTRO_SEEN_KEY = "landing-intro-seen";

/** Play the intro once per browser session. "/?intro" always plays it (handy for testing). */
function shouldPlayIntro(): boolean {
  try {
    if (new URLSearchParams(window.location.search).has("intro")) return true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return window.sessionStorage.getItem(INTRO_SEEN_KEY) !== "1";
  } catch {
    return false;
  }
}

/** Landing page: name intro, then the "Who's watching?" screen. */
export default function Landing() {
  // The static HTML cannot read sessionStorage, so decide after mount.
  // Until then the screen is plain dark, the same color as both phases.
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const id = requestAnimationFrame(() => setPhase(shouldPlayIntro() ? "intro" : "picker"));
    return () => cancelAnimationFrame(id);
  }, []);

  const endIntro = useCallback(() => {
    try {
      window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Storage is blocked: the intro will simply play again next time.
    }
    setPhase("picker");
  }, []);

  return (
    <main className="nf-page min-h-[100dvh] w-full bg-[#141414] text-white">
      <ProfilePicker active={phase === "picker"} />
      {phase === "intro" ? <Intro text={landing.wordmark} onDone={endIntro} /> : null}
    </main>
  );
}
