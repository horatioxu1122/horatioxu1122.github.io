"use client";

import { useCallback, useEffect, useRef } from "react";
import Wordmark from "./Wordmark";

/** Safety net if `animationend` never fires. The animation itself is 2.4 s (.nf-intro). */
const MAX_INTRO_MS = 3500;

/**
 * Full-screen name intro: the red name fades in, holds, then zooms past the
 * viewer. A click, Enter, Space, Escape or the "Skip Intro" button ends it early.
 */
export default function Intro({ text, onDone }: { text: string; onDone: () => void }) {
  const finished = useRef(false);
  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    onDone();
  }, [onDone]);

  useEffect(() => {
    const timer = setTimeout(finish, MAX_INTRO_MS);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [finish]);

  return (
    <div
      className="fixed inset-0 z-20 flex cursor-pointer items-center justify-center overflow-hidden bg-[#141414]"
      onClick={finish}
    >
      <div className="nf-intro" onAnimationEnd={finish}>
        <Wordmark text={text} className="text-[clamp(3.5rem,15vw,11rem)]" />
      </div>
      <button
        type="button"
        onClick={finish}
        className="absolute bottom-[8%] right-[4%] rounded border border-white/70 bg-black/40 px-5 py-2 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-white hover:text-black focus:outline-none focus-visible:bg-white focus-visible:text-black"
      >
        Skip Intro
      </button>
    </div>
  );
}
