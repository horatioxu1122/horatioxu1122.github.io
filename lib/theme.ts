// Dark / light mode for the Netflix-style pages.
// The visitor's choice is kept in this browser only (localStorage).
// "dark" is the default: the site is designed dark, like Netflix.

export type ThemeChoice = "dark" | "light" | "auto";

export const THEME_KEY = "nf-theme";

export function readThemeChoice(): ThemeChoice {
  try {
    const v = window.localStorage.getItem(THEME_KEY);
    return v === "light" || v === "auto" || v === "dark" ? v : "dark";
  } catch {
    return "dark";
  }
}

export function saveThemeChoice(choice: ThemeChoice): void {
  try {
    window.localStorage.setItem(THEME_KEY, choice);
  } catch {
    // Storage is blocked: the choice lasts until the page closes.
  }
}

/**
 * Runs in <head> before the page draws (app/layout.tsx), so a light-mode
 * visitor never sees a dark flash. Keep it in sync with readThemeChoice().
 */
export const THEME_SCRIPT = `(function(){try{var c=localStorage.getItem('${THEME_KEY}');if(c!=='light'&&c!=='auto')c='dark';var d=c==='auto'?matchMedia('(prefers-color-scheme: dark)').matches:c==='dark';document.documentElement.setAttribute('data-theme',d?'dark':'light');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;
