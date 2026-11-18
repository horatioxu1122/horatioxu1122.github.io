// Card and banner backgrounds. We have no thumbnails, so each card gets a dark
// gradient; neighbouring cards in a row get different ones.

export const PALETTES = [
  "linear-gradient(135deg, #8a1c1c 0%, #1c1917 72%)", // red
  "linear-gradient(135deg, #115e59 0%, #0f172a 72%)", // teal
  "linear-gradient(135deg, #5b21b6 0%, #111827 72%)", // violet
  "linear-gradient(135deg, #92400e 0%, #1c1917 72%)", // amber
  "linear-gradient(135deg, #1d4ed8 0%, #0b1020 72%)", // blue
  "linear-gradient(135deg, #9d174d 0%, #18181b 72%)", // pink
  "linear-gradient(135deg, #3f6212 0%, #111827 72%)", // green
  "linear-gradient(135deg, #475569 0%, #0a0a0a 72%)", // slate
];

/** Soft light in the top-right corner, laid over the gradient. */
const SHINE = "radial-gradient(120% 90% at 85% 0%, rgba(255,255,255,0.14), transparent 55%)";

export function paletteStyle(index: number): React.CSSProperties {
  return { backgroundImage: `${SHINE}, ${PALETTES[index % PALETTES.length]}` };
}
