import Link from "next/link";
import { display } from "@/components/landing/fonts";
import { initialsOf } from "@/lib/browse";
import { landing } from "@/lib/content";

/** The short banner at the top of a "Continue Watching" page. */
export default function PageHero({
  kicker,
  title,
  meta,
  description,
}: {
  kicker: string;
  title: string;
  meta: string[];
  description?: string;
}) {
  return (
    <section id="top" className="relative overflow-hidden px-[4%] pb-10 pt-28 md:pt-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_90%_at_85%_0%,rgba(229,9,20,0.18),transparent_70%)]"
      />
      <div className="relative max-w-3xl">
        <Link href="/browse" className="text-sm text-nf-muted transition-colors hover:text-nf-fg">
          ← Home
        </Link>
        <p className="mt-6 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-nf-fg-2 md:text-xs">
          <span className={`${display.className} text-2xl leading-none tracking-normal text-[#e50914]`}>
            {initialsOf(landing.wordmark)}
          </span>
          {kicker}
        </p>
        <h1 className={`${display.className} mt-2 text-[clamp(2.75rem,6vw,5rem)] leading-[0.9] text-nf-fg`}>
          {title}
        </h1>
        {meta.length ? (
          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-nf-muted">
            {meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </p>
        ) : null}
        {description ? (
          <p className="mt-3 max-w-xl text-[clamp(1rem,1.2vw,1.1rem)] leading-snug text-nf-fg">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
