import { display } from "@/components/landing/fonts";
import type { AwardEntry, ServiceCredit } from "@/lib/browse";

/**
 * /browse/service: award "trophy" cards first, then service shown like the
 * end credits of a film — centered, role in small capitals, name below.
 */
export default function CreditsRoll({
  awards,
  credits,
}: {
  awards: AwardEntry[];
  credits: ServiceCredit[];
}) {
  return (
    <div className="flex flex-col gap-14">
      {awards.length ? (
        <section aria-labelledby="awards-title" className="px-[4%]">
          <h2 id="awards-title" className="text-[clamp(1.05rem,1.4vw,1.45rem)] font-bold text-[#e5e5e5]">
            Awards
          </h2>
          <ul className="mt-3 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((a) => (
              <li
                key={a.id}
                className="flex items-start gap-4 rounded-md bg-[#181818] p-5 shadow-lg shadow-black/40 ring-1 ring-white/5"
              >
                <svg viewBox="0 0 24 24" className="mt-0.5 h-8 w-8 shrink-0 text-[#e50914]" fill="currentColor" aria-hidden="true">
                  <path d="M7 3h10v2h3v3a4 4 0 0 1-4 4h-.35A5 5 0 0 1 13 14.9V17h3v2H8v-2h3v-2.1A5 5 0 0 1 8.35 12H8a4 4 0 0 1-4-4V5h3V3zm0 4H6v1a2 2 0 0 0 1 1.73V7zm10 0v2.73A2 2 0 0 0 18 8V7h-1zM6 21h12v1H6v-1z" />
                </svg>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#808080]">{a.year}</p>
                  <h3 className="mt-1 font-bold leading-snug text-white">{a.title}</h3>
                  {a.org ? <p className="mt-1 text-sm text-[#bcbcbc]">{a.org}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {credits.length ? (
        <section aria-labelledby="service-title" className="px-[4%]">
          <h2
            id="service-title"
            className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-[#808080]"
          >
            Service
          </h2>
          <ul className="mx-auto mt-4 flex max-w-2xl flex-col items-center gap-10 text-center">
            {credits.map((c) => (
              <li key={c.id}>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-[#808080]">{c.role}</p>
                <p className={`${display.className} mt-2 text-[clamp(1.8rem,3.2vw,2.6rem)] leading-none text-white`}>
                  {c.name}
                </p>
                {c.detail ? <p className="mt-2 text-sm text-[#bcbcbc]">{c.detail}</p> : null}
                <p className="mt-1 text-xs text-[#808080]">{c.years}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
