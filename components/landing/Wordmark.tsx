import { display } from "./fonts";

/**
 * The red name logo. Letters near the two ends are taller than the letters
 * in the middle, so the word looks printed on a curved banner.
 */
export default function Wordmark({ text, className = "" }: { text: string; className?: string }) {
  const chars = [...text.toUpperCase()];
  const mid = (chars.length - 1) / 2;

  return (
    <span
      role="img"
      aria-label={text}
      className={`${display.className} inline-flex select-none items-center whitespace-nowrap leading-none tracking-[0.03em] text-[#e50914] [text-shadow:0_0.04em_0.12em_rgba(0,0,0,0.55)] ${className}`}
    >
      {chars.map((c, i) => {
        const d = mid > 0 ? Math.abs(i - mid) / mid : 0; // 0 in the middle, 1 at the ends
        return (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block"
            style={{ transform: `scaleY(${(1 + 0.28 * d * d).toFixed(3)})` }}
          >
            {c === " " ? " " : c}
          </span>
        );
      })}
    </span>
  );
}
