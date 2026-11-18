import { useEffect, useRef } from "react";
import { display } from "@/components/landing/fonts";
import type { BillboardData } from "@/lib/browse";
import BannerSocials from "./BannerSocials";

type Banner = { src: string; alt: string };

/** Video files play as a silent loop (much smaller than the same clip as a GIF). */
const isVideo = (src: string) => /\.(mp4|webm)(\?|#|$)/i.test(src);

/**
 * The big banner at the top of the home page, with "View CV" and "More Info".
 * The background is the current profile's `banner` picture (content/landing.ts),
 * darkened on the left so the text stays readable; without one, a soft red glow.
 * The banner grows with its content and keeps room for the fixed top bar.
 */
export default function Billboard({
  data,
  banner,
  onMore,
}: {
  data: BillboardData;
  banner?: Banner;
  onMore: () => void;
}) {
  return (
    <section id="top" className="relative overflow-hidden">
      {banner ? (
        <>
          {/* key: fade the new picture in when the profile changes */}
          <BannerMedia key={banner.src} banner={banner} />
          {/* Dark on the left (under the text), clear on the right. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(77deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.72)_35%,rgba(0,0,0,0.35)_60%,rgba(0,0,0,0.1)_85%)]"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(70%_80%_at_85%_20%,rgba(229,9,20,0.22),transparent_70%),radial-gradient(50%_60%_at_10%_100%,rgba(229,9,20,0.08),transparent_70%)]"
        />
      )}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-[#141414] to-transparent" />

      <div className="relative z-10 flex min-h-[min(72vh,48rem)] flex-col justify-end px-[4%] pb-[4.76vh] pt-28 md:pt-32">
        <div className="md:max-w-[46rem]">
          <p className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[#e5e5e5] md:text-xs">
            <span className={`${display.className} text-2xl leading-none tracking-normal text-[#e50914]`}>
              {data.initials}
            </span>
            {data.kicker}
          </p>
          <h1 className={`${display.className} mt-2 text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.85] text-white`}>
            {data.name}
          </h1>
          {/* Netflix sizes: details line 14px, match 14px bold */}
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#e5e5e5]">
            <span className="font-bold text-[#46d369]">{data.match}</span>
            <span>{data.season}</span>
            <span className="rounded-sm border border-white/40 px-1.5 text-xs">{data.rating}</span>
            <span className="text-[#bcbcbc]">
              {data.title} · {data.affiliation}
            </span>
          </p>
          <p className="mt-3 max-w-xl text-[clamp(1rem,1.2vw,1.1rem)] leading-snug text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.45)]">
            {data.tagline}
          </p>
          <BannerSocials />
          <div className="mt-6 flex flex-wrap gap-3">
            {data.cv ? (
              <a
                href={data.cv}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded bg-white px-5 py-2 font-bold text-black transition-colors hover:bg-white/80 md:px-6"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M7 4.5v15l12-7.5z" />
                </svg>
                View CV
              </a>
            ) : null}
            <button
              type="button"
              onClick={onMore}
              className="inline-flex items-center gap-2 rounded bg-[rgba(109,109,110,0.7)] px-5 py-2 font-bold text-white transition-colors hover:bg-[rgba(109,109,110,0.45)] md:px-6"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="9.5" />
                <path d="M12 11v6M12 7.5v.5" strokeLinecap="round" />
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The banner picture: an image/GIF, or a silent looping video (paused for "reduce motion"). */
function BannerMedia({ banner }: { banner: Banner }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (v && window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.pause();
  }, []);

  const className = "nf-banner-in absolute inset-0 h-full w-full object-cover object-[70%_35%]";

  if (isVideo(banner.src)) {
    return (
      <video
        ref={video}
        src={banner.src}
        aria-label={banner.alt}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={banner.src} alt={banner.alt} className={className} />;
}
