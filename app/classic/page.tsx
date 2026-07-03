import type { Metadata } from "next";
import {
  profile,
  news,
  service,
  teaching,
  publicationsByYear,
} from "@/lib/content";
import { renderInline } from "@/lib/format";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.tagline,
};

const link =
  "text-[color:var(--accent)] underline-offset-2 hover:text-[color:var(--accent-hover)] hover:underline";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="section-label">{title}</h2>
      {children}
    </section>
  );
}

export default function ClassicHome() {
  return (
    <div className="flex flex-col gap-12">
      {/* intro: bio + research interests */}
      <section className="flex flex-col gap-4 leading-relaxed">
        {profile.bio.map((p, i) => (
          <p key={i}>{renderInline(p, link)}</p>
        ))}
        <p>
          My research interests lie in{" "}
          <span className="font-medium text-[color:var(--research)]">
            {profile.researchArea ?? "AI"}
          </span>
          , specifically
          focusing on {profile.researchInterests.length} directions:
        </p>
        <ul className="ml-5 flex list-disc flex-col gap-1">
          {profile.researchInterests.map((r, i) => (
            <li key={i}>{r.title}</li>
          ))}
        </ul>
        {profile.researchOverview?.map((p, i) => (
          <p key={i}>{renderInline(p, link)}</p>
        ))}
      </section>

      {/* news */}
      <Section id="news" title="News">
        <ul className="flex flex-col gap-2">
          {news.map((n, i) => (
            <li key={i} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
              <time className="shrink-0 font-mono text-sm text-zinc-500">{n.date}</time>
              <span className="leading-relaxed">{renderInline(n.text, link)}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* publications */}
      <Section id="publications" title="Publications">
        <div className="flex flex-col gap-8">
          {publicationsByYear().map(([year, items]) => (
            <div key={year} className="flex flex-col gap-4">
              <h3 className="font-mono text-sm text-zinc-500">{year}</h3>
              <ol className="flex flex-col gap-5">
                {items.map((p) => (
                  <li key={p.id} className="flex flex-col gap-1">
                    <span className="font-medium leading-snug">{p.title}</span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      {renderInline(p.authors)}
                    </span>
                    <span className="text-sm">
                      <span className="italic">{p.venue}</span>
                      {p.award ? (
                        <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                          ★ {p.award}
                        </span>
                      ) : null}
                    </span>
                    {p.links?.length ? (
                      <span className="flex flex-wrap gap-x-3 text-sm">
                        {p.links.map((l) => (
                          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className={link}>
                            {l.label}
                          </a>
                        ))}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      {/* service */}
      <Section id="service" title="Service">
        <ul className="flex flex-col gap-2">
          {service.map((s, i) => (
            <li key={i} className="flex gap-4">
              <span className="w-20 shrink-0 font-mono text-sm text-zinc-500">{s.year}</span>
              <span>
                <span className="font-medium">{s.role}</span> — {s.venue}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* teaching */}
      <Section id="teaching" title="Teaching">
        <ul className="flex flex-col gap-2">
          {teaching.map((t, i) => (
            <li key={i} className="flex gap-4">
              <span className="w-24 shrink-0 font-mono text-sm text-zinc-500">{t.term}</span>
              <span>
                {t.course}
                <span className="text-zinc-500"> — {t.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
