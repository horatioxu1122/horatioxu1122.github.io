// Which "Who's watching?" profile the visitor picked. Kept for this visit only.
// Every profile shows the same pages; only the avatar in the top-right changes.

const VIEWER_KEY = "landing-viewer";

export function saveViewer(index: number): void {
  try {
    window.sessionStorage.setItem(VIEWER_KEY, String(index));
  } catch {
    // Storage is blocked: the first profile is shown instead.
  }
}

/** Index of the picked profile, or 0 if none was picked (or the value is out of range). */
export function loadViewer(count: number): number {
  try {
    const n = Number(window.sessionStorage.getItem(VIEWER_KEY));
    return Number.isInteger(n) && n >= 0 && n < count ? n : 0;
  } catch {
    return 0;
  }
}
