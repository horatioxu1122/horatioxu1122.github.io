"use client";

import { useEffect, useState } from "react";
import { readThemeChoice, saveThemeChoice, type ThemeChoice } from "@/lib/theme";

/**
 * The visitor's dark/light choice for the profile menu switches.
 * `dark` is what the page shows now (with Auto it follows the device).
 */
export function useTheme() {
  const [choice, setChoice] = useState<ThemeChoice>("dark");
  const [systemDark, setSystemDark] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const id = requestAnimationFrame(() => {
      setChoice(readThemeChoice());
      setSystemDark(mq.matches);
      setReady(true);
    });
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => {
      cancelAnimationFrame(id);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  const auto = choice === "auto";
  const dark = auto ? systemDark : choice === "dark";

  // Apply the result to <html data-theme>. Wait until the saved choice is
  // loaded, so the page does not switch back and forth on load.
  useEffect(() => {
    if (ready) document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [ready, dark]);

  function choose(next: ThemeChoice) {
    setChoice(next);
    saveThemeChoice(next);
  }

  return {
    dark,
    auto,
    /** The "Dark mode" switch. Using it turns Auto off. */
    setDark: (on: boolean) => choose(on ? "dark" : "light"),
    /** The "Auto" switch. Turning it off keeps the current look. */
    setAuto: (on: boolean) => choose(on ? "auto" : dark ? "dark" : "light"),
  };
}
