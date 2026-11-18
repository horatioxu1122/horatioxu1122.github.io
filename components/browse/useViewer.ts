"use client";

import { useEffect, useState } from "react";
import { landing } from "@/lib/content";
import { loadViewer, saveViewer } from "@/lib/viewer";

/**
 * The picked "Who's watching?" profile (an index into landing.profiles).
 * The static HTML cannot read sessionStorage, so it loads after mount
 * (profile 0 until then). `switchViewer` picks another profile and saves it.
 */
export function useViewer() {
  const [viewer, setViewer] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setViewer(loadViewer(landing.profiles.length)));
    return () => cancelAnimationFrame(id);
  }, []);

  function switchViewer(index: number) {
    saveViewer(index);
    setViewer(index);
  }

  return { viewer, switchViewer };
}
